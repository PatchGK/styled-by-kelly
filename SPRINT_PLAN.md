## Sprint Plan

This plan tracks weekly sprints on the path to the StyledByKelly MVP, aligned with the product vision in `PRD (1).md`. Update the checklist as tasks are delivered.

---

### Sprint 1 – Foundation & Auth Prep
- [X ] Audit Tailwind theme tokens against PRD brand guide; note adjustments.
- [ X] Review `components/ui` primitives for missing states (loading/empty).
- [x] Add stub pages for `/about`, `/services`, `/contact`, `/blog`, `/privacy`, `/terms`, `/signup`, `/login`.  
  _Result:_ Marketing routes now render lifestyle-aligned content with placeholders for imagery; auth routes will be upgraded in Sprint 1 Task 4.
- [x] Update marketing copy/CTAs to match PRD language.  
  _Result:_ Hero CTA now invites membership start, navigation includes journal content, and messaging emphasizes ongoing relationships and local services.
- [x] Create `app/(auth)/layout.tsx` and static forms for login, signup, forgot password using React Hook Form + Zod stubs.  
  _Result:_ New auth layout presents brand story panel; forms use React Hook Form + Zod with client-side validation and placeholder submission handlers.
- [x] Integrate Prettier (if absent) and ensure ESLint config matches project conventions.  
  _Result:_ Added Prettier config, ignore file, and npm scripts (`format`, `format:fix`) alongside existing ESLint setup.
- [x] Add `.env.example` listing Supabase, Stripe, OpenAI, Resend keys; document dev setup in root `README`.  
  _Result:_ Created `env.example` (copy to `.env.local`) with required secrets and refreshed `README.md` with setup/run instructions.
- [x] Run accessibility smoke test on marketing pages; capture findings.  
  _Result:_ Documented notes in `docs/accessibility-audit.md` (mobile menu ARIA state, accent contrast follow-up, focus ring verification, journal card targets).

### Sprint 2 – Authentication & User Session
- [x] Configure Supabase project, auth providers, and env wiring.
- [x] Implement Supabase client/session provider; guard `/dashboard/*` routes.
- [x] Replace hard-coded user data with session-derived values (fallback for demo mode).
- [x] Create `profiles` table + migrations; wire settings form to update/profile fields.
- [x] Add toast feedback and optimistic updates via `sonner`.
- [x] Write Playwright smoke tests (login, redirect, logout).
- [x] Perform manual cross-device testing; note defects.

### Sprint 3 – Subscription & Payments
- [x] Define Stripe products/prices for Starter/Plus/Pro/Elite tiers.
- [x] Implement checkout & billing portal API routes; hook pricing CTAs to endpoints.
- [x] Surface live subscription data in dashboard overview and settings badge.
- [x] Create webhook endpoint syncing Stripe events to Supabase `subscriptions`.
- [ ] Add unit tests for billing utilities and webhook handler.
- [ ] Validate Stripe flows with test cards for each tier.

### Sprint 4 – AI Tooling MVP
- [ ] Set up OpenAI client + rate-limited server actions; secure API keys.
- [ ] Integrate Cloudinary or Supabase Storage for photo uploads with signed URLs.
- [ ] Replace static quiz results with AI-generated summaries; persist quiz outcomes.
- [ ] Connect photo analysis to OpenAI vision model; store recommendations linked to projects.
- [ ] Generate dynamic palettes in Color Matcher; enable saving palettes.
- [ ] Show latest AI outputs on dashboard overview (recent quiz, analysis, palette).
- [ ] Add integration tests mocking OpenAI responses.

### Sprint 5 – Marketplace & Add-On Services
- [x] Model Supabase tables for services, bookings, provider availability; seed catalog.
- [x] Replace static marketplace arrays with Supabase queries; add filters/detail pages.
- [x] Build booking form with validation, time slot selection, and location capture.
- [x] Implement booking server action + confirmation emails (Resend/Postmark).
- [x] Create internal `/dashboard/admin/services` view for managing bookings.
- [ ] Write end-to-end test covering booking flow and email trigger.

### Sprint 6 – Community & Communications Foundations
- [ ] Integrate Resend/Postmark for newsletters; add subscription forms (site + dashboard).
- [ ] Build `/inspiration` page and dashboard feed backed by dynamic content.
- [ ] Add `community_posts` table and read-only community feed stub with feature flag.
- [ ] Instrument analytics (PostHog or Simple Analytics) capturing key events.
- [ ] Run performance (Lighthouse) and accessibility regression checks.
- [ ] Update docs: onboarding, product overview, roadmap, launch checklist.

---

### Ongoing / Every Sprint
- [ ] Groom backlog and prepare next sprint goals.
- [ ] Maintain changelog and retro notes.
- [ ] Expand automated test coverage for new features.
- [ ] Ensure copy and visuals align with brand tone (“Warm, lifestyle-driven”).

---

## Dashboard Replacement Initiative

This multi-sprint plan refactors the existing dashboard in `app/dashboard` to match the experience defined in `PRD_Dashboard.md`, while building on the current Next.js + Supabase architecture.

### Sprint D1 – Information Architecture & Layout Foundations
- [x] Audit current dashboard routes/components; capture gaps vs. PRD in `docs/dashboard-audit.md`.  
  _Result:_ `docs/dashboard-audit.md` now documents current vs. desired modules and prioritised gaps.
- [x] Refactor `app/dashboard/layout.tsx` to centralize sidebar/top-nav structure and support new sections (Overview, AI Tools, Projects, Marketplace, Boards, Inbox, Analytics, Support, Settings).  
  _Result:_ Introduced `DashboardShell` with responsive sidebar + top bar and unified padding.
- [x] Update `components/dashboard-nav.tsx` with revised navigation config and icons; add typed route metadata.  
  _Result:_ Navigation is sectioned, mobile-friendly, and exports typed metadata for reuse.
- [x] Create placeholder routes for missing modules (`app/dashboard/inbox`, `.../boards`, `.../analytics`, `.../support`) with loading/empty states.  
  _Result:_ Placeholder pages and skeleton loaders unblock future feature work.
- [x] Add Storybook stories (or Chromatic snapshots) for shared dashboard shell components to lock in layout regressions.  
  _Result:_ Storybook configured with `DashboardShell`/`DashboardTopBar` stories for visual regression.
- [x] Write Cypress/Playwright smoke test covering navigation between all dashboard sections.  
  _Result:_ Added `tests/dashboard-navigation.spec.ts` exercising sidebar + mobile navigation (auth storage required).

### Sprint D2 – Data Modeling & API Surface
- [x] Design Supabase schemas for `design_boards`, `board_items`, `notifications`, `ai_outputs`, and `project_tasks`; produce migrations + types.  
  _Result:_ Added `20251113143000_create_dashboard_core.sql` with enums, tables, triggers, and RLS policies.
- [x] Create server actions/queries in `lib/supabase/dashboard.ts` for fetching overview data (subscription, projects, AI outputs, saved items).  
  _Result:_ New module returns typed dashboard summaries for projects, boards, AI outputs, notifications, and saved items.
- [ ] Add row-level security rules/tests ensuring per-user isolation for new tables.
- [x] Seed realistic dashboard data via `supabase/seed` to support design/dev in non-production environments.  
  _Result:_ Seed script populates demo project, board, items, AI palette, task, and notification records.
- [x] Expose typed hooks/providers (e.g., `useDashboardData`) to share caching between routes (SWR/React Query).  
  _Result:_ `useDashboardData` hook delivers cached client overview data aligned with server fetchers.

### Sprint D3 – Overview & Settings Revamp
- [ ] Replace `app/dashboard/page.tsx` content with card-based Overview (subscription summary, project progress, AI highlights, saved items).
- [ ] Build reusable card components in `components/dashboard/` (e.g., `subscription-card.tsx`, `progress-grid.tsx`, `saved-items-carousel.tsx`).
- [ ] Surface real Supabase data in Overview via server actions + suspense boundaries.
- [ ] Upgrade `app/dashboard/settings/page.tsx` to include notification toggles, design preference form, and billing summary.
- [ ] Integrate `sonner` to provide inline toasts for key settings updates.
- [ ] Add unit tests for utility formatters (dates, currency, progress) used across Overview/Settings.

### Sprint D4 – AI Tools Integration
- [ ] Wire `app/dashboard/ai-tools/page.tsx` to real OpenAI-powered flows (style quiz summarizer, photo analysis, color matcher) using existing `components/ai-tools/*`.
- [ ] Persist AI tool submissions/results to Supabase `ai_outputs` with user/project linkage.
- [ ] Add history panel showing latest AI results and quick-save actions to design boards.
- [ ] Implement rate limiting + error boundaries around AI actions; log failures to monitoring.
- [ ] Create integration tests mocking OpenAI responses to validate happy/error paths.
- [ ] Surface latest AI outputs in Overview via condensed card.

### Sprint D5 – Projects & Collaboration Enhancements
- [ ] Expand `app/dashboard/projects/page.tsx` to display project cards with progress, status tags, assigned designer.
- [ ] Add dynamic project detail route (`app/dashboard/projects/[id]/page.tsx`) with tasks, chat thread placeholder, files, revision requests.
- [ ] Implement task CRUD server actions with optimistic updates and toasts.
- [ ] Introduce `notifications` feed tied to project events (task assigned, revision requested) and render in new Inbox route.
- [ ] Backfill historical project events into Supabase for demo data; verify RLS policies.
- [ ] Write Playwright scenario covering project detail interactions (task update + notification display).

### Sprint D6 – Marketplace, Boards & Support Polish
- [ ] Upgrade marketplace grid (`app/dashboard/marketplace`) with filters (room, style, price, color) and tie to Supabase queries.
- [ ] Implement “Shop the Look” module linking marketplace items to design boards.
- [ ] Build full Design Boards experience (`app/dashboard/boards`) with board CRUD, image uploads (Supabase Storage), and saved product pins.
- [ ] Add Help & Support center with knowledge base links + ticket submission form (Resend/Postmark email).
- [ ] Instrument analytics events for key dashboard interactions (AI tool run, project update, marketplace add-to-cart).
- [ ] Run accessibility + performance regression audits; document findings and fixes.


