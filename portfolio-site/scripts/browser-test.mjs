import { chromium } from "playwright-core";

const origin = "http://127.0.0.1:4173/";
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const results = [];
const consoleErrors = [];

function check(name, condition, detail = "") {
  results.push({ name, passed: Boolean(condition), detail });
}

const browser = await chromium.launch({
  executablePath: chrome,
  headless: true,
});

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 1 });
  desktop.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  desktop.on("pageerror", (error) => consoleErrors.push(error.message));
  desktop.on("response", (response) => {
    if (response.status() >= 400) consoleErrors.push(`${response.status()} ${response.url()}`);
  });

  await desktop.goto(origin, { waitUntil: "networkidle" });
  check("homepage heading", (await desktop.locator("h1").innerText()).toLowerCase().includes("muhammad"));
  check("three featured project tabs", (await desktop.locator(".project-tab").count()) === 3);

  await desktop.getByRole("tab", { name: /UMG/ }).click();
  check("UMG tab interaction", await desktop.getByRole("heading", { name: "Shipping-ready interfaces" }).isVisible());

  await desktop.getByRole("tab", { name: /MULTIPLAYER/ }).click();
  check("Multiplayer tab interaction", await desktop.getByRole("heading", { name: "Synchronized worlds at scale" }).isVisible());

  await desktop.getByRole("tab", { name: /SPLAT/ }).click();
  await desktop.getByRole("link", { name: /Read case study/ }).click();
  await desktop.waitForURL(/#directsplat$/);
  const caseHeading = desktop.locator(".case-hero h1");
  await caseHeading.waitFor({ state: "visible" });
  check("DirectSplat case study route", (await caseHeading.innerText()).replace(/\s+/g, " ").includes("DIRECT SPLAT"));
  await desktop.screenshot({ path: "qa/implementation-directsplat.png", fullPage: false });

  await desktop.getByRole("link", { name: /Back to portfolio/ }).click();
  await desktop.waitForURL(/#work$/);
  const workHeading = desktop.locator("#work h2");
  await workHeading.waitFor({ state: "visible" });
  check("case study return path", (await workHeading.innerText()).toLowerCase().includes("selected projects"));

  const cvResponse = await desktop.request.get(`${origin}Muhammad-Hassan-CV.pdf`);
  check("downloadable CV", cvResponse.ok(), `status ${cvResponse.status()}`);

  await desktop.mouse.move(1, 1);
  await desktop.waitForTimeout(220);
  await desktop.screenshot({ path: "qa/implementation-desktop-v3.png", fullPage: false });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  mobile.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(`mobile: ${message.text()}`);
  });
  mobile.on("pageerror", (error) => consoleErrors.push(`mobile: ${error.message}`));
  await mobile.goto(origin, { waitUntil: "networkidle" });
  const menu = mobile.getByRole("button", { name: "Open navigation" });
  await menu.click();
  check("mobile navigation opens", await mobile.getByRole("navigation", { name: "Primary navigation" }).isVisible());
  await mobile.getByRole("link", { name: "Projects" }).click();
  check("mobile navigation closes", !(await mobile.getByRole("navigation", { name: "Primary navigation" }).isVisible()));
  const overflow = await mobile.evaluate(() => ({
    page: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
    offenders: [...document.querySelectorAll("body *")]
      .filter((element) => element.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 8)
      .map((element) => ({
        tag: element.tagName,
        className: element.className,
        right: Math.round(element.getBoundingClientRect().right),
      })),
  }));
  check("mobile has no horizontal overflow", overflow.page <= overflow.viewport, JSON.stringify(overflow));
  await mobile.screenshot({ path: "qa/implementation-mobile.png", fullPage: true });

  check("browser console", consoleErrors.length === 0, consoleErrors.join(" | "));
  console.log(JSON.stringify({ results, consoleErrors }, null, 2));
  if (results.some((result) => !result.passed)) process.exitCode = 1;
} finally {
  await browser.close();
}
