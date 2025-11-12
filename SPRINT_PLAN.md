## Sprint Plan

This plan tracks weekly sprints on the path to the StyledByKelly MVP, aligned with the product vision in `PRD (1).md`. Update the checklist as tasks are delivered.

---

### Sprint 1 – Foundation & Auth Prep
- [ ] Audit Tailwind theme tokens against PRD brand guide; note adjustments.
- [ ] Review `components/ui` primitives for missing states (loading/empty).
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
- [ ] Configure Supabase project, auth providers, and env wiring.
- [ ] Implement Supabase client/session provider; guard `/dashboard/*` routes.
- [ ] Replace hard-coded user data with session-derived values (fallback for demo mode).
- [ ] Create `profiles` table + migrations; wire settings form to update/profile fields.
- [ ] Add toast feedback and optimistic updates via `sonner`.
- [ ] Write Playwright smoke tests (login, redirect, logout).
- [ ] Perform manual cross-device testing; note defects.

### Sprint 3 – Subscription & Payments
- [ ] Define Stripe products/prices for Starter/Plus/Pro/Elite tiers.
- [ ] Implement checkout & billing portal API routes; hook pricing CTAs to endpoints.
- [ ] Surface live subscription data in dashboard overview and settings badge.
- [ ] Create webhook endpoint syncing Stripe events to Supabase `subscriptions`.
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
- [ ] Model Supabase tables for services, bookings, provider availability; seed catalog.
- [ ] Replace static marketplace arrays with Supabase queries; add filters/detail pages.
- [ ] Build booking form with validation, time slot selection, and location capture.
- [ ] Implement booking server action + confirmation emails (Resend/Postmark).
- [ ] Create internal `/dashboard/admin/services` view for managing bookings.
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


