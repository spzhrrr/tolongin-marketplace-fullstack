#!/usr/bin/env node
/**
 * Automatic demo video recorder (Playwright).
 * Output: demo-output/tolongin-demo.mp4 (+ .webm intermediate)
 *
 * Usage: npm run demo:record
 *        npm run demo:record -- --flow discover
 */

import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import os from "os";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import {
  FRONTEND_URL,
  API_URL,
  VIEWPORT,
  PAUSE_MS,
  ACCOUNTS,
  DEMO_FLOWS,
} from "./demo-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..", "..");
const OUTPUT_DIR = path.join(REPO_ROOT, "demo-output");
const VIDEO_DIR = path.join(OUTPUT_DIR, "videos");

const args = process.argv.slice(2);
const flowFilter = getArg(args, "--flow") || process.env.DEMO_FLOW || null;

function getArg(argv, flag) {
  const i = argv.indexOf(flag);
  if (i === -1) return null;
  return argv[i + 1] || null;
}

function hash(routePath) {
  return `${FRONTEND_URL}/#${routePath}`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function locatePlaywrightFfmpeg() {
  const roots = [
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    path.join(os.homedir(), "AppData", "Local", "ms-playwright"),
  ].filter(Boolean);

  for (const root of roots) {
    try {
      for (const name of fs.readdirSync(root)) {
        if (!name.startsWith("ffmpeg-")) continue;
        const win = path.join(root, name, "ffmpeg-win64.exe");
        if (fs.existsSync(win)) return win;
        const mac = path.join(root, name, "ffmpeg-mac");
        if (fs.existsSync(mac)) return mac;
        const linux = path.join(root, name, "ffmpeg-linux");
        if (fs.existsSync(linux)) return linux;
      }
    } catch {
      /* try next root */
    }
  }
  return null;
}

async function waitReady(page) {
  await page
    .waitForFunction(
      () => {
        const spinners = document.querySelectorAll(".spinner");
        return spinners.length === 0 || [...spinners].every((el) => !el.offsetParent);
      },
      { timeout: 25000 },
    )
    .catch(() => {});
  await sleep(Math.min(PAUSE_MS, 1800));
}

async function logout(page) {
  try {
    await page.goto(FRONTEND_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("tolongin_state"));
  } catch {
    /* not on app origin yet */
  }
}

async function login(page, accountKey) {
  const creds = ACCOUNTS[accountKey];
  if (!creds) throw new Error(`Unknown account: ${accountKey}`);

  console.log(`   🔐 Login: ${creds.label}`);
  await page.goto(hash("/login"), { waitUntil: "networkidle", timeout: 30000 });
  await logout(page);
  await page.goto(hash("/login"), { waitUntil: "networkidle", timeout: 30000 });
  await page.locator("#email").fill(creds.email);
  await page.locator("#password").fill(creds.password);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await page.waitForFunction(() => !location.hash.startsWith("#/login"), { timeout: 20000 });
  await waitReady(page);
}

async function goto(page, routePath) {
  await page.goto(hash(routePath), { waitUntil: "networkidle", timeout: 30000 });
  await waitReady(page);
}

async function openFirstService(page) {
  const link = page.locator("a.service-card, a[href*=\"#/services/\"]").first();
  await link.waitFor({ state: "visible", timeout: 15000 });
  await link.click();
  await waitReady(page);
}

async function openFirstJob(page) {
  const link = page.locator("a.job-card").first();
  await link.waitFor({ state: "visible", timeout: 15000 });
  await link.click();
  await waitReady(page);
}

async function orderService(page) {
  const btn = page.locator("#order-btn");
  if (!(await btn.count())) {
    console.log("   ⏭️  Order button not found");
    return;
  }
  await btn.click();
  await sleep(700);
  const confirm = page.locator("#mc-confirm");
  if (await confirm.count()) {
    await confirm.click();
    await waitReady(page);
  }
}

async function payEscrow(page) {
  const payBtn = page.getByRole("button", { name: /bayar|pembayaran|escrow/i }).first();
  if (!(await payBtn.count())) {
    console.log("   ⏭️  Pay button not found");
    return;
  }
  await payBtn.click();
  await sleep(800);
  const ok = page.locator("#pay-ok");
  if (await ok.count()) {
    await ok.click();
    await waitReady(page);
  }
}

async function openWaitingReviewOrder(page) {
  const token = await page.evaluate(() => {
    try {
      return JSON.parse(localStorage.getItem("tolongin_state") || "{}")?.token;
    } catch {
      return null;
    }
  });
  if (!token) {
    await goto(page, "/orders");
    return;
  }
  const res = await fetch(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  const orders = Array.isArray(data) ? data : data.data || [];
  const waiting = orders.find((o) => String(o.status).toUpperCase() === "WAITING_REVIEW");
  if (waiting?.id) {
    await goto(page, `/orders/${waiting.id}`);
  } else {
    console.log("   ⏭️  No WAITING_REVIEW order");
    await goto(page, "/orders");
  }
}

const ACTIONS = {
  openFirstService,
  openFirstJob,
  orderService,
  payEscrow,
  openWaitingReviewOrder,
};

async function runFlow(page, flow) {
  console.log(`\n▶ ${flow.title}`);
  if (flow.role) {
    await logout(page);
    await login(page, flow.role);
  } else {
    await logout(page);
    await goto(page, "/");
  }

  for (const step of flow.steps) {
    console.log(`   • ${step.note || step.path || step.action}`);
    if (step.path) {
      await goto(page, step.path);
    } else if (step.action) {
      await ACTIONS[step.action](page);
    }
    await sleep(step.pause || PAUSE_MS);
  }
}

function convertToMp4(webmPath, mp4Path) {
  let ffmpeg = null;
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    ffmpeg = "ffmpeg";
  } catch {
    ffmpeg = locatePlaywrightFfmpeg();
  }
  if (!ffmpeg) return false;

  try {
    execFileSync(
      ffmpeg,
      ["-y", "-i", webmPath, "-c:v", "libx264", "-pix_fmt", "yuv420p", mp4Path],
      { stdio: "inherit" },
    );
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log("🎥 Tolongin auto demo recorder\n");

  await fetch(`${API_URL}/categories`, { signal: AbortSignal.timeout(8000) }).catch(() => {
    console.error("❌ Backend tidak jalan:", API_URL);
    process.exit(1);
  });

  fs.mkdirSync(VIDEO_DIR, { recursive: true });

  const flows = flowFilter ? DEMO_FLOWS.filter((f) => f.id === flowFilter) : DEMO_FLOWS;
  if (!flows.length) {
    console.error("❌ Flow tidak ditemukan:", flowFilter);
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: {
      dir: VIDEO_DIR,
      size: VIEWPORT,
    },
  });
  const page = await context.newPage();

  let video;
  let demoError = null;
  try {
    for (const flow of flows) {
      await runFlow(page, flow);
    }
    await sleep(1500);
  } catch (err) {
    demoError = err;
    console.error("❌ Demo error:", err.message);
  } finally {
    video = page.video();
    await context.close();
    await browser.close();
  }

  if (!video) {
    console.error("❌ Tidak ada video terekam");
    process.exit(1);
  }

  const webmPath = path.join(OUTPUT_DIR, "tolongin-demo.webm");
  const mp4Path = path.join(OUTPUT_DIR, "tolongin-demo.mp4");

  try {
    await video.saveAs(webmPath);
  } catch {
    const tempPath = await video.path().catch(() => null);
    if (tempPath && fs.existsSync(tempPath)) {
      fs.copyFileSync(tempPath, webmPath);
    } else {
      console.error("❌ Gagal menyimpan video");
      process.exit(1);
    }
  }

  console.log(`\n✅ WebM: ${webmPath}`);

  if (convertToMp4(webmPath, mp4Path)) {
    console.log(`✅ MP4:  ${mp4Path}`);
  } else {
    console.log(`✅ Video siap (.webm) — putar di VLC/Chrome`);
    console.log(`   Untuk MP4: winget install Gyan.FFmpeg lalu jalankan ulang demo:record`);
  }

  if (demoError) process.exit(1);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
