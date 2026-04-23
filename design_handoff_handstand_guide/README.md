# Handoff: Handstand Fundamentals Guide Page

## Overview
A password-protected guide page for ammarbass.com. Students receive a password via Instagram/DM, visit a URL on the site, enter the password, optionally provide their email, then view a multi-section educational guide. A "Download PDF" button triggers browser print. There is also a coaching upsell section at the bottom.

## About the Design Files
The files in this bundle (`Handstand Guide.html` + `guide-content.jsx`) are **high-fidelity design references built in HTML/React** — not production code to ship directly. The task is to **recreate this design within the existing ammarbass.com codebase**, using its established framework, routing, and component patterns.

## Fidelity
**High-fidelity.** The HTML prototype reflects final intended colours, typography, spacing, interactions, and copy. Recreate as close to pixel-perfect as possible using the site's existing toolchain.

---

## Page Flow

```
/guide  →  Password Gate  →  Email Capture (optional/skippable)  →  Guide  →  Download PDF
```

1. **Password Gate** — full-screen centred form. User enters a password (currently `handstand2026`, should be env-configurable). Wrong password shakes the input. Correct password advances to email step.
2. **Email Capture** — full-screen centred form. User enters email (stored/sent wherever the site's email system goes — Mailchimp, Notion, webhook, etc.). Has a "Skip" link. Submitting or skipping advances to the guide.
3. **Guide** — full scrollable page with sticky header. "Download PDF" button triggers `window.print()`.
4. **Session persistence** — gate state stored in `sessionStorage` under key `guide_stage` so a page refresh doesn't reset the user back to the password screen.

---

## Screens / Views

### 1. Password Gate
- Full viewport, centred vertically and horizontally
- Background: `oklch(97% 0.012 78)` (warm cream, same as guide body)
- Small "Ammar Bass" label at top in `Cormorant Garamond`, muted
- Title: "Handstand Fundamentals" in Cormorant Garamond 42px, weight 300, italic on second word
- Subtitle: "Enter the password you received to access this guide." DM Sans 14px, weight 300, muted
- Password input: centred, `letter-spacing: 0.1em`, border turns red on wrong attempt
- Shake animation on wrong attempt (CSS keyframe, 400ms)
- "Access Guide" button: full-width, terracotta accent background

### 2. Email Capture
- Same layout as password gate
- Heading: "Before you begin" — Cormorant Garamond 36px
- Subtitle: "Leave your email so I can send you updates and additional resources."
- Email input + "Continue to Guide" button + "Skip" text link below

### 3. Guide — Sticky Header
- Fixed top bar, transparent when at top of page, transitions to cream with border on scroll
- Left: "Ammar Bass" in Cormorant Garamond 16px
- Right: "Download PDF" button — ghost style, terracotta accent border + text, triggers `window.print()`
- Hidden in print media

### 4. Guide — Cover Section
- Full viewport height
- Background: `oklch(93% 0.025 78)` — warm cream, slightly deeper than body
- Centred content in a box with terracotta top + bottom border lines (1px)
- Eyebrow: "Ammar Bass · 2026" — DM Sans 11px, uppercase, letter-spacing 0.25em, terracotta
- Title: "Handstand Fundamentals Guide" — Cormorant Garamond, weight 300, 48–80px responsive, "Guide" in italic
- Subtitle: "A structured approach to building your inversion practice" — DM Sans 15px, weight 300, muted
- Footer: "ammar@ammarbass.com · @ammarbass" — DM Sans 11px, uppercase, very muted

### 5. Guide — Section 01: The Foundation
- Max-width 860px container, 40px horizontal padding
- Section header: muted "01" label + "The Foundation" h2 + subtitle paragraph
- Three equal-width cards in a row (CSS grid, 3 columns, 20px gap):
  - Each card: white bg, 1px border, 8px radius, 28px 24px padding
  - Number "01/02/03" in terracotta, Cormorant Garamond 11px uppercase
  - Label in Cormorant Garamond 26px
  - Description in DM Sans 13.5px, weight 300, muted
- Below cards: two-column text grid ("Consistency Over Intensity" | "Your Timeline")
- Below that: a "Start at the wall" callout box — warm sand bg, left border in warm stone colour

### 6. Guide — Section 02: The 7 Fundamentals
- 7 rows, each a two-column grid: large muted number (left, 72px wide) + content (right)
- Number: Cormorant Garamond 52px, weight 300, very light colour
- Name: Cormorant Garamond 24px
- Key principle: DM Sans 14px, weight 500, terracotta accent colour
- Detail: DM Sans 13.5px, weight 300, muted, line-height 1.75
- Rows separated by 1px top border
- Closing callout box (same neutral sand style as "Start at the wall")

### 7. Guide — Section 03: Key Muscles & Movements
- Two-column grid: "Stretch" (left) | "Develop" (right)
- Stretch items have sage green dots (`oklch(52% 0.07 148)`)
- Develop column split into "Pushers" and "Pullers" sub-headers
  - Pushers: terracotta dots (Serratus Anterior, Rotator Cuff, Trapezius)
  - Pullers: sage green dots (Rhomboids)
- Joint Stacking callout: warm sand background, rounded 8px, explains alignment reduces effort
- Scapular Movements: two pair-cards (Forward/Back, Up/Down) — goal movements highlighted with terracotta tint + accent circle with ↑ icon
- Humeral Movements: same pair-card design (Rotation pair, Flexion pair)
- Note text below each pair group
- Muscle Quick Reference: 3-column table, alternating row backgrounds, headers in uppercase
- Self-Assessment: 2-column grid of question/answer cards

### 8. Guide — Section 04: Practice Blueprint
- Daily structure: 4 rows, two-column layout (time/phase left, description right)
- Common Pitfalls: full-width list with × markers
- Closing quote block: warm sand bg, italic Cormorant Garamond quote

### 9. Guide — Section 05: Private Coaching
- Terracotta top border (2px)
- Two-column grid: headline/intro left, two offering cards right
  - Cards: warm sand background, 8px radius
- Closing CTA strip: terracotta-tinted background, "Ready to go deeper?" left, email/site links right

---

## Design Tokens

### Colours (oklch)
```
--bg:              oklch(97% 0.012 78)   /* page background — warm cream */
--bg-cover:        oklch(93% 0.025 78)   /* cover section */
--bg-warm:         oklch(93% 0.018 78)   /* callout / card backgrounds */
--bg-card:         oklch(99% 0.006 75)   /* white-ish card bg */
--bg-accent-tint:  oklch(95% 0.03 38)    /* goal-highlighted rows */
--text:            oklch(17% 0.015 55)   /* primary text */
--text-muted:      oklch(42% 0.012 65)   /* body text */
--text-dim:        oklch(55% 0.012 65)   /* captions */
--text-label:      oklch(60% 0.015 65)   /* section labels */
--accent:          oklch(56% 0.1 38)     /* terracotta — primary accent */
--accent-sage:     oklch(52% 0.07 148)   /* sage green — stretch / pullers */
--border:          oklch(88% 0.018 78)   /* standard border */
--border-light:    oklch(90% 0.015 78)   /* row dividers */
--callout-border:  oklch(72% 0.03 68)    /* neutral callout left-border */
```

### Typography
```
Headings:  Cormorant Garamond (Google Font) — weights 300, 400, 500; italic variant
Body:      DM Sans (Google Font) — weights 300, 400, 500; optical size 9..40
```

### Spacing
- Section padding: 80px top/bottom
- Container max-width: 860px, 40px horizontal padding
- Card padding: 28px 24px (standard) / 14px 16px (compact)
- Grid gaps: 20–32px

### Border Radius
- Cards: 8px
- Buttons: 6px
- Compact cards: 6px

---

## Password Configuration
The password should be stored as an environment variable (e.g. `GUIDE_PASSWORD`) and checked server-side if possible, or at minimum configurable without a code change. Currently hardcoded as `"handstand2026"` in the prototype.

## Email Collection
Currently stores emails in `localStorage`. Should be wired to the site's email collection system (Mailchimp, ConvertKit, a Notion database, or a simple webhook). The email capture is optional — users can skip.

## Print / PDF
The "Download PDF" button calls `window.print()`. Print CSS hides the header, footer, tweaks panel, and any no-print elements. Sections use `break-before: page` / `break-after: page` for multi-page output.

## Assets
- Google Fonts: Cormorant Garamond, DM Sans — loaded via `<link>` from Google Fonts CDN
- No images currently (placeholder spaces left for future handstand photography)
- No icons

## Files in This Bundle
| File | Purpose |
|---|---|
| `Handstand Guide.html` | Full prototype — password gate, email capture, and guide. Open in browser to review. |
| `guide-content.jsx` | React components for all guide sections. Contains all copy and layout. |
| `README.md` | This document |

## Notes for Implementation
- The guide page URL should be something like `/guide` or `/handstand-guide`
- Consider adding basic server-side password protection (HTTP Basic Auth or a simple token check) so the content isn't publicly crawlable
- The email capture ideally sends to a list Ammar can export — keep it simple
- The PDF export works best in Chrome/Safari; test page breaks before going live
- Future enhancement: replace placeholder areas with real handstand photography
