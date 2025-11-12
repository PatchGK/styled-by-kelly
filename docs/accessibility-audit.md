## Accessibility Smoke Test — Sprint 1

Date: November 12, 2025  
Scope: Marketing pages (`/`, `/pricing`, `/about`, `/services`, `/contact`, `/blog`, `/privacy`, `/terms`) and auth pages (`/login`, `/signup`, `/forgot-password`)

### ✅ Strengths
- Semantic structure: landmarks (`header`, `main`, `footer`) present across marketing pages.
- Text alternatives: hero, card, and placeholder imagery include descriptive `alt` text.
- Forms: labels are associated with inputs; validation errors announced via text with `aria-invalid`.
- Keyboard navigation: primary CTAs and navigation links reachable in logical order.

### ⚠️ Issues & Follow-ups
1. **Mobile menu toggle lacks ARIA state**  
   - `SiteHeader` hamburger button should expose `aria-expanded` and `aria-controls` to convey menu state.
2. **Color contrast to verify**  
   - The OKLCH `--accent` color may not meet WCAG AA when used for foreground text. Plan to measure and adjust in Sprint 2.
3. **Link focus outlines**  
   - Links wrapped in `Button asChild` rely on Tailwind defaults; confirm focus ring visibility on dark backgrounds.
4. **Journal card headings**  
   - Entire card is not a single link; consider wrapping card in anchor for larger target or adding `aria-label`.

### Next Steps
- Address the above issues in early Sprint 2 along with planned navigation enhancements.
- Integrate automated checks (e.g., Playwright Axe) once Supabase auth is in place to cover logged-in flows.

