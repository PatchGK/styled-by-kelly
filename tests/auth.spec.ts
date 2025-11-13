import { test, expect } from "@playwright/test"

test.describe("Authentication guard", () => {
  test("unauthenticated users are redirected from dashboard to login", async ({ page }) => {
    const response = await page.goto("/dashboard")
    expect(response?.status()).toBe(200)
    await expect(page).toHaveURL(/\/login(\?|$)/)
    await expect(page.url()).toContain("redirect_to=%2Fdashboard")
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible()
  })

  test("login page renders auth form inputs", async ({ page }) => {
    await page.goto("/login")
    await expect(page.getByLabel("Email")).toBeVisible()
    await expect(page.getByLabel("Password")).toBeVisible()
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible()
  })

  test.skip("authenticated users visiting login are redirected to dashboard", async ({ page }) => {
    test.skip(
      !process.env.SUPABASE_SERVICE_ROLE_KEY,
      "Requires Supabase service role key to seed and log in a test user.",
    )
    // TODO: Implement once Supabase email/password sign-in is wired up.
    // Steps:
    // 1. Use admin API to create a disposable test user.
    // 2. Sign in via Supabase auth and set session cookies in Playwright context.
    // 3. Navigate to /login and assert redirect to /dashboard.
  })
})

