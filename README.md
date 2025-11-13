## StyledByKelly Web App

Next.js 16 + Tailwind CSS application delivering the StyledByKelly membership experience: marketing site, AI-powered dashboard, subscriptions, and local service marketplace.

---

## 1. Prerequisites

- Node.js 20.x
- npm 10.x (or pnpm / yarn if preferred)
- Supabase, Stripe, OpenAI, and Resend/Postmark accounts for API keys

---

## 2. Environment Variables

1. Copy the template file and fill in your secrets:

   ```bash
   cp env.example .env.local
   ```

2. Update the values for Supabase, Stripe, OpenAI, email provider, and analytics before running the app.

---

## 3. Install & Run

```bash
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

---

## 4. Code Quality

- **Lint:** `npm run lint`
- **Format (check):** `npm run format`
- **Format (write):** `npm run format:fix`
- **Playwright (install binaries once):** `npx playwright install`
- **E2E (headless):** `npm run test:e2e`
- **E2E (headed):** `npm run test:e2e:headed`

Prettier is configured with a 100 character print width and no semicolons to match the design system guidance.

---

## 5. Project Structure Highlights

- `app/` – App Router pages, including marketing routes and authenticated dashboard
- `components/` – Shared UI primitives (shadcn/ui) and higher-level layout components
- `lib/` – Utility helpers
- `public/` – Static assets

---

## 6. Next Steps

Refer to `SPRINT_PLAN.md` for the active product roadmap, sprint planning, and outstanding tasks.

---

### Testing Notes

- The auth smoke tests currently validate route guards and form rendering. A skipped test is included for the full sign-in redirect flow; enable it once Supabase email/password login is wired up and the `SUPABASE_SERVICE_ROLE_KEY` environment variable is available for seeding test users.
