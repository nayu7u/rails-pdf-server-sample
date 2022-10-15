import playwright from "playwright"

const browser = await playwright.chromium.launch({ headless: true })
const context = await browser.newContext()
const page = await context.newPage()
const url = "https://playwright.dev/docs/api/class-page#page-pdf"
await page.goto(url, { waitUntil: "networkidle"})
await page.pdf({ format: "A4", path: "output/test.pdf"})
