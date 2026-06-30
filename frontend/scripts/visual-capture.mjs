#!/usr/bin/env node
/**
 * Capture full-page screenshots for AI visual UI/UX review.
 * Run from frontend/: npm run visual:capture
 */

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { VISUAL_ROUTES, CREDENTIALS } from "./visual-routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..", "..");
const OUTPUT_ROOT = path.join(REPO_ROOT, "visual-review");

const FRONTEND_URL = process.env.VISUAL_FRONTEND_URL || "http://localhost:3000";
const API_URL = process.env.VISUAL_API_URL || "http://localhost:8001/api";
const VIEWPORT = parseViewport(process.env.VISUAL_VIEWPORT || "1366x768");
const WAIT_MS = Number(process.env.VISUAL_WAIT_MS || 2000);

const args = process.argv.slice(2);
const roleFilter = getArg(args, "--role");

function getArg(argv, flag) {
  const i = argv.indexOf(flag);
  if (i === -1) return null;
  return argv[i + 1] || null;
}

function parseViewport(s) {
  const [w, h] = s.split("x").map(Number);
  return { width: w || 1366, height: h || 768 };
}

function hashUrl(routePath) {
  return `${FRONTEND_URL}/#${routePath}`;
}

async function checkServer(url, label) {
  try {
    await fetch(url, { signal: AbortSignal.timeout(5000) });
    return true;
  } catch {
    console.error(`❌ ${label} not reachable: ${url}`);
    console.error("   Start backend (:8001) and frontend (:3000) first.");
    process.exit(1);
  }
}

async function fetchSampleIds() {
  const ids = { service: null, job: null, user: null };
  try {
    const [svcRes, jobRes] = await Promise.all([
      fetch(`${API_URL}/services?limit=1`),
      fetch(`${API_URL}/jobs?limit=1&status=OPEN`),
    ]);
    const svcJson = await svcRes.json();
    const jobJson = await jobRes.json();
    const services = Array.isArray(svcJson) ? svcJson : svcJson.data || [];
    const jobs = Array.isArray(jobJson) ? jobJson : jobJson.data || [];
    if (services[0]?.id) ids.service = services[0].id;
    if (jobs[0]?.id) ids.job = jobs[0].id;
    if (services[0]?.sellerId) ids.user = services[0].sellerId;
    else if (jobs[0]?.buyerId) ids.user = jobs[0].buyerId;
  } catch (err) {
    console.warn("⚠️  Could not fetch sample IDs:", err.message);
  }
  return ids;
}

function resolvePath(route, ids) {
  if (!route.dynamic) return route.path;
  const id = ids[route.dynamic];
  if (!id) return null;
  return route.path.replace(":id", encodeURIComponent(id));
}

async function waitForPageReady(page) {
  await page
    .waitForFunction(
      () => {
        const spinners = document.querySelectorAll(".spinner");
        return spinners.length === 0 || [...spinners].every((el) => !el.offsetParent);
      },
      { timeout: 20000 },
    )
    .catch(() => {});
  await new Promise((r) => setTimeout(r, WAIT_MS));
}

async function loginAs(page, role) {
  const creds = CREDENTIALS[role];
  if (!creds) return;

  await page.goto(hashUrl("/login"), { waitUntil: "networkidle2", timeout: 30000 });
  await page.evaluate(() => localStorage.removeItem("tolongin_state"));
  await page.goto(hashUrl("/login"), { waitUntil: "networkidle2", timeout: 30000 });
  await page.waitForSelector("#email", { timeout: 10000 });

  await page.click("#email", { clickCount: 3 });
  await page.type("#email", creds.email);
  await page.click("#password", { clickCount: 3 });
  await page.type("#password", creds.password);
  await page.click('[data-testid="login-submit-btn"]');

  await page.waitForFunction(() => !location.hash.startsWith("#/login"), {
    timeout: 20000,
  });
  await waitForPageReady(page);
  console.log(`   ✅ Logged in as ${role}`);
}

async function captureRoute(page, route, resolvedPath) {
  await page.goto(hashUrl(resolvedPath), { waitUntil: "networkidle2", timeout: 30000 });
  await waitForPageReady(page);

  const dir = path.join(OUTPUT_ROOT, route.role);
  fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `${route.name}.png`);
  await page.screenshot({ path: filePath, fullPage: true });

  return {
    name: route.name,
    role: route.role,
    path: resolvedPath,
    url: hashUrl(resolvedPath),
    file: path.relative(REPO_ROOT, filePath).replace(/\\/g, "/"),
    viewport: `${VIEWPORT.width}x${VIEWPORT.height}`,
    capturedAt: new Date().toISOString(),
  };
}

function routesForRole(role) {
  if (!roleFilter || roleFilter === "all") {
    return VISUAL_ROUTES.filter((r) => r.role === role);
  }
  if (roleFilter === role) return VISUAL_ROUTES.filter((r) => r.role === role);
  return [];
}

async function main() {
  console.log("📸 Tolongin visual capture\n");
  console.log(`   Frontend: ${FRONTEND_URL}`);
  console.log(`   API:      ${API_URL}`);
  console.log(`   Output:   ${OUTPUT_ROOT}\n`);

  await checkServer(FRONTEND_URL, "Frontend");
  await checkServer(`${API_URL}/categories`, "Backend API");

  fs.mkdirSync(OUTPUT_ROOT, { recursive: true });

  const ids = await fetchSampleIds();
  console.log("   Sample IDs:", ids, "\n");

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: VIEWPORT,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const manifest = {
    forAgent:
      "Visual UI/UX reference. Read shots[].file PNGs with Read tool. Regenerate: cd frontend && npm run visual:capture",
    generatedAt: new Date().toISOString(),
    frontendUrl: FRONTEND_URL,
    apiUrl: API_URL,
    viewport: `${VIEWPORT.width}x${VIEWPORT.height}`,
    shots: [],
    errors: [],
  };

  const page = await browser.newPage();

  try {
    if (!roleFilter || roleFilter === "all" || roleFilter === "public") {
      console.log("🌐 Public pages\n");
      for (const route of routesForRole("public")) {
        const resolved = resolvePath(route, ids);
        if (!resolved) {
          manifest.errors.push({ route: route.name, reason: `missing ${route.dynamic} id` });
          console.log(`   ⏭️  ${route.name} (skipped)`);
          continue;
        }
        try {
          console.log(`   📄 ${route.name}`);
          manifest.shots.push(await captureRoute(page, route, resolved));
          console.log(`      ✅ ${manifest.shots.at(-1).file}`);
        } catch (err) {
          manifest.errors.push({ route: route.name, reason: err.message });
          console.log(`      ❌ ${err.message}`);
        }
      }
    }

    for (const role of ["buyer", "seller", "admin"]) {
      if (roleFilter && roleFilter !== "all" && roleFilter !== role) continue;
      const routes = routesForRole(role);
      if (!routes.length) continue;

      console.log(`\n🔐 ${role} pages\n`);
      await loginAs(page, role);

      for (const route of routes) {
        const resolved = resolvePath(route, ids);
        if (!resolved) {
          manifest.errors.push({ route: route.name, reason: `missing ${route.dynamic} id` });
          continue;
        }
        try {
          console.log(`   📄 ${route.name}`);
          manifest.shots.push(await captureRoute(page, route, resolved));
          console.log(`      ✅ ${manifest.shots.at(-1).file}`);
        } catch (err) {
          manifest.errors.push({ route: route.name, reason: err.message });
          console.log(`      ❌ ${err.message}`);
        }
      }
    }

    const manifestPath = path.join(OUTPUT_ROOT, "manifest.json");
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    console.log(`\n✅ Done — ${manifest.shots.length} screenshots`);
    console.log(`📋 ${path.relative(REPO_ROOT, manifestPath)}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
