# Design: Blog → Projects Reframe + Site Restyle

**Date:** 2026-07-21
**Status:** Approved pending user review

## Goal

Two related changes to jucamohedano.github.io:

1. **Reframe the "Blog" as "Projects"** — the posts are project/experience
   write-ups, not blog articles, and the current site has two doors into the
   same content (nav "Blog" → `/blog/`, nav "Projects" → homepage anchor).
2. **Restyle the site** toward the aesthetic of mufeezamjad.com (adapted, not
   cloned): Red Hat Display type, narrow centered column, round-photo header
   with pill nav, a "currently working on" callout, and a system-adaptive
   theme with a corner toggle.

No new libraries or frameworks. Plain Jekyll + CSS, as today.

## Part 1 — Structure: Blog → Projects

### Canonical Projects page
- New `projects/index.html`: heading **"Projects"**, one-line intro describing
  project and experience write-ups (replacing "Welcome to my blog…"), and the
  existing Liquid loop over `site.posts` with dates, reading time, and
  excerpts. All 4 posts appear.
- `blog/index.html` becomes a meta-refresh redirect (plus fallback link) to
  `/projects/` so old links to `/blog/` still work. No plugin needed.

### URLs
- Post permalink pattern `/blog/:year/:month/:day/:title/` in `_config.yml`
  stays **unchanged** — every existing post URL keeps working. Only the
  listing page moves.

### Navigation (`_layouts/default.html`)
- Remove the "Blog" link. "Projects" points to `/projects/` (not `/#projects`).
- Final nav: **Home · Projects · CV · GitHub**.

### Homepage (`index.md`)
- Keep the full Projects section, and add the missing entry for the NEURA
  Robotics internship write-up, framed as an experience write-up.
- Trim the dangling bio fragment "Recently did some work on LLMs training and"
  (the preceding sentence already covers GRPO post-training and data-manifold
  exploration). No other bio content changes.

### Post content fix
- `_posts/2023-06-30-neura-robotics-internship.md`: delete the placeholder
  caption note "(You should replace this with an actual image of the MiPA
  robot)". Nothing else in the post changes.

## Part 2 — Restyle

### Typography
- Replace the currently-loaded-but-unused **Inter** Google Fonts link with
  **Red Hat Display** (variable weights incl. italics), and set it as the
  `body` font-family (with system-sans fallbacks). Headings inherit it.

### Layout
- Content column narrows from 980px to **~660px**, centered. Applies site-wide
  (home, projects listing, posts).

### Header
- Centered header replacing the current left-aligned title + link row:
  round profile photo → name (h1) → **pill-style tab nav** with a visible
  active state for the current page (Home / Projects; CV and GitHub are plain
  external items in the same pill row). The pill nav wraps gracefully on small
  screens, so the hamburger menu and its JS are removed.

### Homepage callout
- The "currently working on" sentence (GRPO post-training, data-manifold
  exploration) moves into a subtle **accent-colored callout box** — inspired
  by the reference's green box but in this site's own accent color (derived
  from the existing link-blue family so light/dark themes both work).

### Theme behavior
- **System-adaptive by default:** with no stored preference, the theme follows
  `prefers-color-scheme`, and live-updates if the OS setting changes.
- **Manual override:** a small fixed icon button (sun/moon) in the
  **bottom-left corner** replaces the current top-right slider switch.
  Clicking it overrides the system theme and persists the choice in
  `localStorage`.
- **No flash of wrong theme:** a tiny inline script in `<head>` sets
  `data-theme` from localStorage/system before first paint. Without JS, a
  CSS `prefers-color-scheme` fallback keeps colors correct.

### Kept as-is
- Dark/light CSS-variable architecture, Font Awesome icons for contact links,
  Jekyll plugins, post layout structure, all post content (except the caption
  fix above).

## Error handling / edge cases
- `/blog/` redirect must not break the RSS feed: `jekyll-feed` serves
  `/feed.xml` independently — unaffected.
- Pill nav active state falls back to no highlight on pages that aren't Home
  or Projects (e.g. individual posts) rather than mishighlighting.

## Testing
- `bundle exec jekyll serve` locally; verify: homepage renders (bio, callout,
  projects list with 4 entries, contact), `/projects/` lists all 4 posts,
  `/blog/` redirects, an individual post URL still resolves, nav active
  states correct on Home and Projects, theme follows system setting, toggle
  overrides + persists, no theme flash on reload.
- Implementation will use the `frontend-design` skill for the visual work.
