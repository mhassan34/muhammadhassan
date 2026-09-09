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
  check("pixel developer accent", (await desktop.locator(".pixel-developer img").count()) === 1);
  await desktop.screenshot({ path: "qa/implementation-home-v4.png", fullPage: false });
  check("four featured project tabs", (await desktop.locator(".project-tab").count()) === 4);

  await desktop.getByRole("tab", { name: /UMG/ }).click();
  check("UMG tab interaction", await desktop.getByRole("heading", { name: "Squad-ready UI and online systems" }).isVisible());

  await desktop.getByRole("tab", { name: /MULTIPLAYER/ }).click();
  check("Multiplayer tab interaction", await desktop.getByRole("heading", { name: "Synchronized worlds at scale" }).isVisible());

  await desktop.getByRole("tab", { name: /C\+\+ \/ BLUEPRINTS/ }).click();
  check("C++ and Blueprints highlight", await desktop.getByRole("heading", { name: "Systems designers can extend" }).isVisible());

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
  check("case study return path", (await workHeading.innerText()).toLowerCase().includes("highlights"));
  check("ten detailed project cards", (await desktop.locator(".project-card").count()) === 10);
  check("project archive heading simplified", await desktop.getByRole("heading", { name: "Projects", exact: true }).isVisible());
  const archiveLeft = await desktop.locator("#project-archive").evaluate((element) => element.getBoundingClientRect().left);
  const archiveHeadingLeft = await desktop.getByRole("heading", { name: "Projects", exact: true }).evaluate((element) => element.getBoundingClientRect().left);
  check("project archive heading left aligned", Math.abs(archiveLeft - archiveHeadingLeft) < 2, `${archiveLeft} / ${archiveHeadingLeft}`);
  check("Invasion squad multiplayer copy", (await desktop.getByText(/squad-based shooter/i).count()) > 0);
  check("advanced motion matching title", (await desktop.getByRole("heading", { name: "Advanced Motion Matching Setup" }).count()) === 1);
  check("section numbering removed", (await desktop.locator(".section-index").count()) === 0);
  check("expertise panel numbering removed", (await desktop.locator(".expertise-grid article > span").count()) === 0);
  check("recruiter proof removed", (await desktop.getByText("Recruiter proof", { exact: true }).count()) === 0);
  check("old recruiter explanation removed", (await desktop.getByText(/Responsibilities, systems, and technical decisions/).count()) === 0);
  check("Moshpit experience expanded", (await desktop.locator(".experience-list article").first().locator("li").count()) === 5);
  check("Fiverr remains concise", (await desktop.locator(".experience-list article").nth(2).locator("li").count()) === 0);
  check("six expanded expertise areas", (await desktop.locator(".expertise-grid article").count()) === 6);
  check("education removed", (await desktop.locator(".education-line").count()) === 0);
  check("Behance CTA kept after project details", (await desktop.locator(".behance-cta a").count()) === 1);
  check("Upwork profile kept", (await desktop.locator('a[href*="upwork.com/freelancers/~0199e6bef182cf00b6"]').count()) === 1);

  await desktop.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
  await desktop.locator("#project-archive").evaluate((element) => element.scrollIntoView({ block: "start" }));
  await desktop.waitForTimeout(500);
  await desktop.screenshot({ path: "qa/implementation-project-archive.png", fullPage: false });
  await desktop.locator("#experience").evaluate((element) => element.scrollIntoView({ block: "start" }));
  await desktop.waitForTimeout(250);
  await desktop.screenshot({ path: "qa/implementation-experience.png", fullPage: false });
  await desktop.locator("#expertise").evaluate((element) => element.scrollIntoView({ block: "start" }));
  await desktop.waitForTimeout(250);
  await desktop.screenshot({ path: "qa/implementation-expertise.png", fullPage: false });

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
