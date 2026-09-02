import { chromium } from "playwright";

const errors = [];

const browser = await chromium.launch();
const page = await browser.newPage();
page.on("pageerror", (e) => errors.push(`PAGE: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`CONSOLE: ${m.text()}`);
});

await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 120000 });
await page.getByText("Website templates you can actually ship").waitFor({ timeout: 30000 });
await page.getByRole("link", { name: "Browse templates" }).click();
await page.getByRole("heading", { name: "Templates" }).waitFor({ timeout: 15000 });
await page.getByRole("link", { name: /Farinha/ }).first().click();
await page.getByRole("button", { name: /Add to cart/i }).waitFor({ timeout: 15000 });

const title = await page.getByRole("heading", { name: "Farinha" }).count();
console.log(JSON.stringify({ title, errors }, null, 2));
await browser.close();
if (errors.length > 0 || title === 0) process.exit(1);
