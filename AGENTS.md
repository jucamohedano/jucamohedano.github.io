# AGENTS.md

Guidance for coding agents working in this repository.

## What this is

Juan Camacho Mohedano's personal site (jucamohedano.github.io): a hand-rolled Jekyll site deployed by classic GitHub Pages. The posts in `_posts/` are project write-ups, not blog articles — the site presents them as "Projects".

## Critical constraint: no local builds

This machine has Ruby 2.7; the `github-pages` gem chain needs Ruby 3+, and docker is permission-denied. **Never run `bundle` or `jekyll` here.** Verify changes statically instead:

- grep the source files for what you changed, with expected-count checks (e.g. `grep -c "max-width: 700px" css/styles.css` → `1`)
- re-read any Liquid you write character-by-character — no build or browser will catch a typo before it deploys

The real build happens server-side when `main` is pushed (GitHub's own gem set, Jekyll 3.9-era). Check the live site after merging.

## Workflow

Branch from up-to-date `main` → commit → `git push -u origin <branch>` → `gh pr create`. Do not commit to `main` directly; deployment is automatic on push to `main`.

## Architecture

One layout shell, one stylesheet, one script — no theme, no framework.

- `_layouts/default.html` — the shell. In order: an inline pre-paint script in `<head>` that sets `data-theme` before first paint (keep it above the stylesheet links; the `<html>` tag must NOT hardcode `data-theme`), the fixed bottom-left theme toggle button right after `<body>`, then the full-bleed top bar `.site-header` (site name with the first name bold on the left, a plain lowercase text nav on the right whose active state is Liquid: `page.url == "/"` and `"/projects/"`; post pages get no active item), the `.container` wrapping `<main>`, and a full-bleed footer.
- `js/script.js` — theme logic (manual toggle persists to `localStorage('theme')`; OS changes are followed live only when nothing is stored; `localStorage` calls are try/catch-wrapped and `matchMedia.addEventListener` is guarded for old Safari), plus fade-in, smooth scroll, and the image lightbox. Loaded at end of body with no defer.
- `css/styles.css` — the single stylesheet. Theming is CSS variables defined in THREE blocks that must stay in exact parity: `:root` (light), `[data-theme="dark"]`, and the no-JS fallback `@media (prefers-color-scheme: dark) { html:not([data-theme]) { ... } }`. **Any new variable must be added to all three.** Visual language follows alexzhang13.github.io: Roboto (300/400/500/700 + 400 italic), large headings at weight 300, body at 400, flat rows with 1px dividers, orange accent in light mode and teal in dark. Layout: 900px container; post articles are capped at 700px (18px body copy, ~88 characters per line), left-aligned with the header, via `.post`; `.figure-svg.wide` breaks out to the full 860px on wide screens.

## Content model

- `/projects/` (`projects/index.html`) is the canonical listing; `blog/index.html` is only a meta-refresh redirect to it.
- Post permalinks are `/blog/:year/:month/:day/:title/` — never change the `permalink:` line in `_config.yml`; external links depend on it.
- `/projects/` is a text-only list (no thumbnails). Post front matter `image:` is still read by `jekyll-seo-tag` for social previews. `reading_time:` still exists in older posts but is never rendered.
- The homepage `index.md` has a manually maintained project list (newest first) — a new post must also be added there — plus the right-floated profile photo at the top of the bio.
- `docs/`, `AGENTS.md`, and `CLAUDE.md` are excluded from the built site in `_config.yml`; keep internal material in `docs/` or the exclude list.

## Adding a project write-up

1. Create `_posts/YYYY-MM-DD-slug.md` with front matter: `layout: post`, `title`, `date`, `excerpt_separator: <!--more-->`, `categories`, `tags`, and `image:` (the social-preview image).
2. Put `<!--more-->` after the intro paragraph — everything above it becomes the excerpt on `/projects/`.
3. Add an entry at the TOP of the homepage `index.md` project list.
4. Figures: `![alt](/assets/images/...)` followed by an italic `*caption*` line on the next line; attribute third-party figures in the caption. Process images with ImageMagick (`convert`/`mogrify`): alpha flattened to white, `-strip`, then `optipng -o2`. **Export at ~1400-1800px wide, not at the display size.** Post content renders at 700px and clicking a figure opens it in the lightbox at up to 96vw, so anything under ~1200px has nothing extra to show and the lightbox looks broken. Use `-colors 220` on photographic figures to keep them under ~300KB.

## Content rules

- **No emojis anywhere on the site.** When sweeping, grep the full Unicode ranges (U+1F000-1FAFF, U+2300-23FF, U+2600-27BF, U+2B00-2BFF, U+FE0F, U+200D) — a narrow pattern has missed U+23F1 before.
- The homepage bio wording is verbatim-intentional, including the "Genuinly" spelling — never correct its spelling, grammar, or tone.
- Posts are first-person and conversational; match the voice of the existing write-ups.
