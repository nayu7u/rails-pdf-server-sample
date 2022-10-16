const playwright = require("playwright")
const express = require("express")
const app = express()
const port = 3001
const crypto = require("crypto")

app.get("/", async (req, res, next) => {
  const browser = await playwright.chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()
  const url = "https://playwright.dev/docs/api/class-page#page-pdf"
  await page.goto(url, { waitUntil: "networkidle" })
  const path = `output/${crypto.randomUUID()}.pdf`
  await page.pdf({ format: "A4", path: path })
  res.status(200).json({ path: path})
})

app.listen(port)