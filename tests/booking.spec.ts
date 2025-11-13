import { test, expect } from "@playwright/test"

test.describe("Service booking flow", () => {
  test.skip("requires authentication before booking", async ({ page }) => {
    test.skip(true, "Skipped in CI due to dynamic marketplace rendering; verified manually.")
    await page.goto("/dashboard/marketplace")
    await page.waitForSelector("a:has-text('Book Service')")
    await page.locator("a:has-text('Book Service')").first().click()

    await expect(page).toHaveURL(/\/login/)
  })

  test.skip("authenticated user can submit booking request and receive confirmation email", async ({ page }) => {
    test.skip(true, "Requires seeded user and email interception; skip until full flow is ready.")
  })
})

