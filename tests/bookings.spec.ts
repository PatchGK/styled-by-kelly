import { test, expect } from "@playwright/test"

test.describe("Service booking flow", () => {
  test("requires auth before booking", async ({ page }) => {
    await page.goto("/dashboard/book/single-room-design")
    // unauthenticated users should be redirected to login
    await expect(page).toHaveURL(/\/login/)
  })

  test("submitting booking form fails when missing location for in-person service", async ({ page }) => {
    test.skip(true, "Requires Supabase auth session seeding; implement when test auth utilities are ready.")
  })
})

