const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.route("**/*", (route) => {
    const url = route.request().url();
    if (/\.(mp4|webm|mov|m3u8|ts)(\?|$)/i.test(url)) return route.abort();
    return route.continue();
  });
  await page.goto("https://labneo-2026.vercel.app/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3000);
  try {
    await page
      .getByRole("button", { name: /понятно|принять|согласен|ok/i })
      .first()
      .click({ timeout: 3000 });
  } catch {}
  try {
    await page.getByText(/понятно/i).first().click({ timeout: 2000 });
  } catch {}
  await page.waitForTimeout(800);
  await page.screenshot({
    path: "D:/daniil_orunov/public/cases/labneo.jpg",
    type: "jpeg",
    quality: 88,
    fullPage: false,
  });
  await browser.close();
  console.log("done");
})();