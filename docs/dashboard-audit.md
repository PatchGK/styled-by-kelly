## Dashboard Gap Analysis

_Date:_ 2025-11-13  
_Context:_ Compares the current `/dashboard` implementation against the capabilities defined in `PRD_Dashboard.md` to guide the replacement initiative.

### Current Implementation Snapshot
- **Shell:** Sidebar-only layout (`DashboardNav`) with minimal styling, no top-level context/header.
- **Routes Present:** `overview (/)`, `ai-tools`, `projects`, `marketplace`, `settings`, `admin/services`, `book/[slug]`.
- **Data Sources:** Mix of hard-coded placeholder data and limited Supabase reads (projects, services). No unified data-fetch layer.
- **AI Tools:** Static forms/components wired locally; no persisted history.
- **Marketplace:** Basic Supabase-driven catalog and booking flow, but limited merchandising modules.
- **Collaboration:** No notifications, inbox, analytics, or design board experiences.
- **Testing:** Navigation exercised manually; Playwright coverage focuses on auth and booking flows.

### Desired Experience (per PRD_Dashboard.md)
- **Unified Shell:** Luxury minimalist aesthetic, sidebar + top-bar, quick actions, responsive navigation, overview metrics.
- **Overview:** Subscription summary, project progress rings, design board previews, saved items, AI highlights, profile completeness.
- **AI Tools:** Style quiz, photo analyzer, color matcher (persisted results), roadmap for AI room generator; surfaced insights on overview.
- **Projects:** Rich detail view (tasks, chat, files, revisions), progress indicators, designer assignments.
- **Marketplace:** Filterable catalog, “Shop the Look,” save-to-board/cart, Stripe/Snipcart integration.
- **New Sections:** Inbox/notifications, standalone design boards, analytics/insights, help & support.
- **Collaboration & Community:** Shared boards, potential community feed, shareable links.
- **Instrumentation:** Framer Motion micro-interactions, analytics, toasts, accessibility polish.

### Key Gaps & Opportunities
- **Shell & Navigation:** Missing top-bar, quick actions, responsive behavior, and links to new sections (`/boards`, `/inbox`, `/analytics`, `/support`).
- **Data Modeling:** Lacks tables for boards, notifications, AI outputs, analytics snapshots, project tasks/chat threads.
- **Overview Content:** Needs dynamic cards fed by Supabase + AI, saved product carousels, profile progress indicator.
- **AI History & Persistence:** Capture outputs, connect to projects and boards, expose error handling & rate limiting.
- **Projects Detail:** Introduce nested route for project detail, task CRUD, designer collaboration threads.
- **Inbox & Notifications:** Build feed sourced from project/AI/marketplace events with read/unread state.
- **Design Boards:** CRUD experience, media uploads, product pinning, share links.
- **Analytics & Insights:** Charts for completion times, favorite palettes/products, AI recommendations.
- **Support Experience:** Knowledge base access, ticket submission, AI assistant integration.
- **Testing & QA:** Introduce automated coverage for dashboard navigation, snapshots for shell layout, and component-level stories.

### Immediate Next Steps (Sprint D1 Scope)
1. Establish new navigation architecture (sidebar + top-bar) referencing the desired sections.
2. Create placeholders for new routes to unblock content work.
3. Capture Storybook stories for layout/nav to prevent regressions.
4. Add automated navigation smoke test ensuring routes render and placeholders mount.

