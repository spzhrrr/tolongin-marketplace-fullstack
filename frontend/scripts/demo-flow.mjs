#!/usr/bin/env node
/**
 * Human-paced demo walkthrough for screen recording.
 *
 * Usage (from frontend/):
 *   npm run demo:walkthrough              # visible browser, full demo
 *   npm run demo:walkthrough -- --flow discover
 *   DEMO_HEADLESS=1 npm run demo:walkthrough
 *
 * Record video: start OBS / Win+G before running this script.
 */

import puppeteer from "puppeteer";
import {
  FRONTEND_URL,
  API_URL,
  VIEWPORT,
  SLOW_MO,
  PAUSE_MS,
  ACCOUNTS,
  DEMO_FLOWS,
} from "./demo-config.mjs";

const args = process.argv.slice(2);
const flowFilter = getArg(args, "--flow");
const headless = process.env.DEMO_HEADLESS === "1";

function getArg(argv, flag) {
  const i = argv.indexOf(flag);
  if (i === -1) return null;
  return argv[i + 1] || null;
}

function hash(path) {
  return `${FRONTEND_URL}/#${path}`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
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
  await sleep(PAUSE_MS);
}

async function login(page, accountKey) {
  const creds = ACCOUNTS[accountKey];
  if (!creds) throw new Error(`Unknown account: ${accountKey}`);

  console.log(`\n🔐 Login: ${creds.label}`);
  await page.goto(hash("/login"), { waitUntil: "networkidle2", timeout: 30000 });
  await page.evaluate(() => localStorage.removeItem("tolongin_state"));
  await page.goto(hash("/login"), { waitUntil: "networkidle2", timeout: 30000 });
  await page.waitForSelector("#email", { timeout: 15000 });
  await page.click("#email", { clickCount: 3 });
  await page.type("#email", creds.email, { delay: 35 });
  await page.click("#password", { clickCount: 3 });
  await page.type("#password", creds.password, { delay: 35 });
  await page.click('[data-testid="login-submit-btn"]');
  await page.waitForFunction(() => !location.hash.startsWith("#/login"), { timeout: 20000 });
  await waitReady(page);
}

async function logout(page) {
  await page.evaluate(() => localStorage.removeItem("tolongin_state"));
}

async function goto(page, path) {
  await page.goto(hash(path), { waitUntil: "networkidle2", timeout: 30000 });
  await waitReady(page);
}

async function openFirstService(page) {
  const link = await page.$('a[href*="#/services/"]');
  if (!link) throw new Error("No service card found");
  await link.click();
  await waitReady(page);
}

async function openFirstJob(page) {
  const link = await page.$('a[href*="#/jobs/"]:not([href="#/jobs"])');
  if (!link) throw new Error("No job card found");
  await link.click();
  await waitReady(page);
}

async function orderService(page) {
  const btn = await page.$('[data-testid="order-btn"], #btn-order, .btn-order-service');
  const fallback = await page.evaluateHandle(() =>
    [...document.querySelectorAll("button, a.btn")].find((el) =>
      /pesan|order|beli/i.test(el.textContent || ""),
    ),
  );
  const target = btn || fallback.asElement();
  if (!target) {
    console.log("   ⏭️  Order button not found — skip");
    return;
  }
  await target.click();
  await sleep(800);
  const confirm = await page.$("#mc-confirm");
  if (confirm) {
    await confirm.click();
    await waitReady(page);
  }
}

async function payEscrow(page) {
  const payBtn = await page.evaluateHandle(() =>
    [...document.querySelectorAll("button")].find((el) =>
      /bayar|pembayaran|escrow/i.test(el.textContent || ""),
    ),
  );
  const el = payBtn.asElement();
  if (!el) {
    console.log("   ⏭️  Pay button not found — skip");
    return;
  }
  await el.click();
  await sleep(900);
  const ok = await page.$("#pay-ok");
  if (ok) {
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
  if (!token) return goto(page, "/orders");

  const res = await fetch(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  const orders = Array.isArray(data) ? data : data.data || [];
  const waiting = orders.find((o) => String(o.status).toUpperCase() === "WAITING_REVIEW");
  if (waiting?.id) {
    await goto(page, `/orders/${waiting.id}`);
  } else {
    console.log("   ⏭️  No WAITING_REVIEW order — showing orders list");
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
  console.log(`\n${"═".repeat(56)}`);
  console.log(`▶ ${flow.title}`);
  console.log(`${"═".repeat(56)}`);

  if (flow.role) {
    await logout(page);
    await login(page, flow.role);
  } else {
    await logout(page);
  }

  for (const step of flow.steps) {
    console.log(`   • ${step.note || step.path || step.action}`);
    if (step.path) {
      await goto(page, step.path);
    } else if (step.action) {
      const fn = ACTIONS[step.action];
      if (!fn) throw new Error(`Unknown action: ${step.action}`);
      await fn(page);
    }
    await sleep(step.pause || PAUSE_MS);
  }
}

async function main() {
  console.log("🎬 Tolongin demo walkthrough");
  console.log(`   Frontend: ${FRONTEND_URL}`);
  console.log(`   Headless: ${headless}`);
  console.log(`   Tip: mulai OBS / Win+G sebelum script jalan\n`);

  await fetch(`${API_URL}/categories`, { signal: AbortSignal.timeout(5000) }).catch(() => {
    console.error("❌ Backend tidak jalan di", API_URL);
    process.exit(1);
  });

  const flows = flowFilter
    ? DEMO_FLOWS.filter((f) => f.id === flowFilter)
    : DEMO_FLOWS;

  if (!flows.length) {
    console.error(`❌ Flow tidak ditemukan: ${flowFilter}`);
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless,
    slowMo: SLOW_MO,
    defaultViewport: VIEWPORT,
    args: ["--window-size=1366,768", "--no-sandbox"],
  });

  const page = await browser.newPage();

  try {
    for (const flow of flows) {
      await runFlow(page, flow);
    }
    console.log("\n✅ Demo walkthrough selesai");
    if (!headless) {
      console.log("   Browser tetap terbuka 5 detik…");
      await sleep(5000);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
