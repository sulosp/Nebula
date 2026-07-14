import { chromium } from "playwright";

const errors = [];

const browser = await chromium.launch();
const page = await browser.newPage();
page.on("pageerror", (e) => errors.push(`PAGE: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`CONSOLE: ${m.text()}`);
});

await page.goto("http://localhost:3012", { waitUntil: "networkidle", timeout: 120000 });
await page.waitForTimeout(5000);

const canvas = await page.locator("canvas").count();
const loading = await page.getByText("Initializing canvas").count();
const bodyText = await page.locator("body").innerText();

console.log(JSON.stringify({ canvas, loading, errors, bodyPreview: bodyText.slice(0, 300) }, null, 2));
await browser.close();
