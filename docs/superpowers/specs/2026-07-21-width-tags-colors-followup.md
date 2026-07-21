# Follow-up: Width, Photo, Tags, Reading Palette

**Date:** 2026-07-21 (after PR #1 merged)

User-requested follow-up, choices confirmed in conversation:

- **Width:** container doubled literally, 660px → 1320px (user chose full double over a capped-prose hybrid).
- **Profile photo:** header photo 96px → 140px (mobile 72px → 100px).
- **Tags:** the "Tags:" block removed from `_layouts/post.html`; `.post-tags`/`.post-tag` CSS deleted. Front matter `tags:` stays (harmless, used by SEO plugin).
- **Reading palette** (post pages, both themes + no-JS fallback):
  - `h2`/`h3` in `var(--accent)`
  - `strong` in `var(--heading-color)`
  - inline code (`p code`, `li code`) in new `--code-accent` (light `#b3255e`, dark `#f27da2`)
  - blockquote left border in `var(--accent)`

Verification: static greps only (no local builds — see plan amendment in
`2026-07-21-projects-reframe-and-restyle.md`), live check after merge.
