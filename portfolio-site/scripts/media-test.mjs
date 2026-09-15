import { chromium } from "playwright-core";

const origin = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", headless: true });
const errors = [];
const results = [];
const check = (name, passed) => {
  results.push({ name, passed: Boolean(passed) });
  if (!passed) throw new Error(name);
};

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1024 } });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
  await page.getByRole("tab", { name: "SPLAT", exact: true }).click();
  check("Highlights keeps a single image", await page.locator(".project-panel > img").count() === 1 && await page.locator(".project-panel .directsplat-media").count() === 0);
  const gallery = page.locator(".project-card .directsplat-media");
  await gallery.scrollIntoViewIfNeeded();
  const video = gallery.locator("video");
  await page.waitForFunction(() => {
    const video = document.querySelector(".project-card video");
    return video?.readyState >= 2 && !video.paused && video.currentTime > 0.1;
  });
  check("12-second muted inline autoplay video", await video.evaluate((v) => v.duration >= 10 && v.duration <= 15 && v.muted && v.loop && v.playsInline));
  await video.evaluate((v) => { v.currentTime = v.duration - 0.25; });
  await page.waitForTimeout(900);
  check("video actually loops", await video.evaluate((v) => v.currentTime < 2 && !v.paused));
  check("only two plain arrows", await gallery.locator(".directsplat-media__controls").evaluate((controls) => controls.querySelectorAll("button").length === 2 && controls.textContent.trim() === "" && getComputedStyle(controls).backgroundColor === "rgba(0, 0, 0, 0)" && [...controls.querySelectorAll("button")].every((button) => getComputedStyle(button).backgroundColor === "rgba(0, 0, 0, 0)")));
  await page.screenshot({ path: "qa/directsplat-video-desktop.png" });
  await gallery.getByRole("button", { name: "Next DirectSplat media" }).click();
  await gallery.locator("img").evaluate((img) => img.decode());
  check("existing image retained", await gallery.locator("img").evaluate((img) => img.src.includes("project-splat-v2.png") && img.complete));
  await gallery.focus();
  await page.keyboard.press("ArrowLeft");
  check("keyboard media navigation", await gallery.locator("video").count() === 1);
  check("archive gallery", await page.locator(".project-card .directsplat-media").count() === 1);
  await page.getByRole("link", { name: /Read case study/ }).click();
  await page.locator(".case-hero video").waitFor();
  check("case-study gallery", await page.locator(".case-hero .directsplat-media").count() === 1);

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  mobile.on("pageerror", (error) => errors.push(error.message));
  await mobile.goto(origin, { waitUntil: "networkidle" });
  await mobile.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
  check("mobile Highlights has no gallery", await mobile.locator(".project-panel .directsplat-media").count() === 0);
  const mobileGallery = mobile.locator(".project-card .directsplat-media");
  await mobileGallery.scrollIntoViewIfNeeded();
  const box = await mobileGallery.boundingBox();
  const session = await mobile.context().newCDPSession(mobile);
  const y = box.y + box.height * 0.75;
  const swipe = async (from, to) => {
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: from, y }] });
    for (let i = 1; i <= 8; i++) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: from + (to - from) * i / 8, y }] });
    }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  };
  await swipe(box.x + box.width - 30, box.x + 30);
  check("mobile swipe left shows image", await mobileGallery.locator("img").count() === 1);
  await swipe(box.x + 30, box.x + box.width - 30);
  check("mobile swipe right shows video", await mobileGallery.locator("video").count() === 1);
  check("no mobile overflow", await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
  await mobile.screenshot({ path: "qa/directsplat-video-mobile.png" });

  const reduced = await browser.newPage({ reducedMotion: "reduce" });
  await reduced.goto(`${origin}#directsplat`, { waitUntil: "networkidle" });
  check("reduced motion starts paused", await reduced.locator(".case-hero video").evaluate((v) => v.paused && !v.autoplay));
  check("no JavaScript errors", errors.length === 0);
} finally {
  console.log(JSON.stringify({ results, errors }, null, 2));
  await browser.close();
}
