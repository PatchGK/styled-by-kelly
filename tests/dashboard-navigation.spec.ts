import { test, expect } from "@playwright/test"

const storageStatePath = process.env.PLAYWRIGHT_STORAGE_STATE

const NAV_ROUTES: Array<{
  label: string
  path: string
  heading: RegExp
}> = [
  { label: "Overview", path: "/dashboard", heading: /Welcome back/i },
  { label: "AI Design Tools", path: "/dashboard/ai-tools", heading: /AI Design Tools/i },
  { label: "My Projects", path: "/dashboard/projects", heading: /My Projects/i },
  { label: "Marketplace", path: "/dashboard/marketplace", heading: /Services Marketplace/i },
  { label: "Design Boards", path: "/dashboard/boards", heading: /Design Boards/i },
  { label: "Inbox", path: "/dashboard/inbox", heading: /Inbox/i },
  { label: "Analytics & Insights", path: "/dashboard/analytics", heading: /Analytics & Insights/i },
  { label: "Help & Support", path: "/dashboard/support", heading: /Help & Support/i },
  { label: "Settings", path: "/dashboard/settings", heading: /^Settings$/i },
]

test.describe("Dashboard shell navigation", () => {
  test.skip(
    !storageStatePath,
    "Set PLAYWRIGHT_STORAGE_STATE to a Playwright storageState JSON that contains an authenticated session.",
  )

  if (storageStatePath) {
    test.use({ storageState: storageStatePath })
  }

  test("users can move between primary sections via sidebar", async ({ page }) => {
    await page.goto("/dashboard")

    for (const route of NAV_ROUTES) {
      const navigationLink = page.getByRole("link", { name: new RegExp(route.label, "i") }).first()
      await navigationLink.click()
      await expect(page).toHaveURL(new RegExp(`${route.path}(?:$|\\/)`))
      await expect(page.getByRole("heading", { name: route.heading })).toBeVisible()
    }
  })

  test("mobile menu exposes navigation links", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Mobile viewport smoke test only runs on Chromium for speed.")
    await page.setViewportSize({ width: 390, height: 844 })

    await page.goto("/dashboard")
    await page.getByRole("button", { name: /open navigation/i }).click()
    await expect(page.getByRole("link", { name: /Design Boards/i })).toBeVisible()
    await page.getByRole("link", { name: /Design Boards/i }).click()
    await expect(page).toHaveURL(/\/dashboard\/boards/)
    await expect(page.getByRole("heading", { name: /Design Boards/i })).toBeVisible()
  })
})

