# User Dashboard – Expanded PRD (v2)

## 🧭 Overview
The **User Dashboard** serves as the user’s personalized hub — combining design management, AI creativity tools, and a marketplace for curated decor. It allows users to **manage projects, collaborate with designers, use AI tools to refine ideas, and purchase curated items**, all in one unified experience.

---

## 🎯 Goals
- Centralize everything related to a user’s interior design experience.
- Empower users with **AI-assisted design tools** that guide early decision-making.
- Streamline **project management**, **purchases**, and **designer communication**.
- Build an ecosystem that encourages **repeat engagement** and **subscription retention**.

---

## 👥 Users
- **Clients** – homeowners or renters using the platform for design help.
- **Designers** – professionals managing client projects.
- **Admins** – oversee user activity, manage AI tools, and moderate marketplace content.

---

## 🧩 Core Features

### 1. Overview Page
The “home” of the dashboard with key summary data and quick actions.
**Features:**
- Subscription plan summary (tier, renewal date, upgrade button).
- Active projects snapshot (with progress rings).
- Design boards preview (e.g., “Modern Kitchen Moodboard”).
- Saved items gallery (latest furniture or decor saves).
- “Member since” + profile progress completion bar.
- Quick CTA: “Start New Project,” “Use AI Tools,” or “Shop Marketplace.”

---

### 2. AI Design Tools
A creative sandbox powered by AI to make design inspiration accessible.
**Submodules:**
- **Style Quiz:** Determines aesthetic preferences (Modern, Boho, Mid-Century, etc.).
- **Photo Analyzer:** Users upload a room photo to get style insights or suggestions.
- **Color Matcher:** Extracts hex codes and palette recommendations from photos or links.
- *(Future)* **AI Room Generator:** Visualizes design ideas with AI-rendered mockups.

---

### 3. My Projects
The operational heart of the dashboard.
**Features:**
- Project cards with:
  - Thumbnail (before/after or moodboard).
  - Progress bar (e.g., 45% Complete).
  - Assigned designer name and status tag (Consultation / Design / Revision / Complete).
- “View Details” button → project detail view:
  - Task list
  - Chat thread
  - Files and deliverables
  - Revision requests

---

### 4. Marketplace
Integrated e-commerce experience connecting users to purchasable items.
**Features:**
- Product listings: furniture, decor, lighting, art.
- Filtering by room, style, price, or color.
- “Shop the Look” (items from specific design boards or AI recommendations).
- Affiliate or in-house checkout system.
- “Save to Board” or “Add to Cart” buttons.

---

### 5. Settings
**Features:**
- Personal info (name, email, password).
- Billing and payment info.
- Notification preferences.
- Design preference profile (color palette, style keywords, budget range).
- Option to delete or export account data.

---

## 💡 New Suggested Additions

### 6. Inbox / Notifications
- Message center for:
  - Designer communications
  - Project updates
  - Payment confirmations
  - AI tool results notifications
- Push and email toggle options.

---

### 7. Design Boards (Expanded)
Currently part of the overview, but should evolve into a standalone section.
**Features:**
- Custom boards (e.g., “Living Room 2025,” “Dream Office”).
- Add images, moodboard templates, AI-generated visuals, or saved products.
- Shareable board links for collaboration or external inspiration.

---

### 8. Analytics & Insights
- Dashboard metrics for power users or designers:
  - Average project completion time
  - Favorite color schemes
  - Most-purchased decor types
- AI-generated “Design Recommendations” for future projects or upgrades.

---

### 9. Community / Inspiration Feed
*(Optional for later release)*
- A social-style feed where users can view public boards or featured designs.
- Ability to follow designers or share AI creations.
- Moderated, with like/comment functionality.

---

### 10. Help & Support
- Knowledge base + FAQ.
- AI chat assistant (powered by your own model or an API).
- Ticket submission for technical or billing issues.

---

## 🧠 Technical Requirements
- **Framework:** Next.js + Tailwind + shadcn/ui.
- **Database:** Supabase or Firebase.
- **Authentication:** NextAuth (OAuth, magic link).
- **AI Features:** OpenAI API + Replicate or Stability AI for image generation.
- **Payments:** Stripe integration.
- **E-Commerce:** Snipcart or Shopify API.
- **Hosting:** Vercel.

---

## 🎨 UI / UX Notes
- Maintain a **luxury minimalist aesthetic** — soft beige background, black or blush text.
- Strong use of **cards** and **modular layout** for AI tools, projects, and marketplace.
- Consistent UI motion (Framer Motion for micro animations).
- Reuse shadcn/ui components for structure: Cards, Tabs, Dropdowns, Progress Bars.

---

## 🧪 Acceptance Criteria
- [ ] Users can navigate between all modules from the sidebar.
- [ ] Projects show progress and designer details.
- [ ] AI tools generate results with clear visual output.
- [ ] Marketplace integrates with real or test checkout.
- [ ] Data persists per authenticated user session.

---

## 🚀 Future Roadmap
- Launch mobile app companion.
- Add AR room visualization.
- Enable multi-designer collaboration per project.
- Introduce tiered AI tools (Pro / Premium).
- Offer subscription upsell via design recommendations.
