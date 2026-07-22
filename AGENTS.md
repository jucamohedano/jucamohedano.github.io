# AGENTS.md

Guidance for coding agents working in this repository.

## What this is

Juan Camacho Mohedano's personal site (jucamohedano.github.io): a hand-rolled Jekyll site deployed by classic GitHub Pages. The posts in `_posts/` are project write-ups, not blog articles — the site presents them as "Projects".

## Critical constraint: no local builds

This machine has Ruby 2.7; the `github-pages` gem chain needs Ruby 3+, and docker is permission-denied. **Never run `bundle` or `jekyll` here.** Verify changes statically instead:

- grep the source files for what you changed, with expected-count checks (e.g. `grep -c "max-width: 800px" css/styles.css` → `1`)
- re-read any Liquid you write character-by-character — no build or browser will catch a typo before it deploys

The real build happens server-side when `main` is pushed (GitHub's own gem set, Jekyll 3.9-era). Check the live site after merging.

## Workflow

Branch from up-to-date `main` → commit → `git push -u origin <branch>` → `gh pr create`. Do not commit to `main` directly; deployment is automatic on push to `main`.

## Architecture

One layout shell, one stylesheet, one script — no theme, no framework.

- `_layouts/default.html` — the shell. In order: an inline pre-paint script in `<head>` that sets `data-theme` before first paint (keep it above the stylesheet links; the `<html>` tag must NOT hardcode `data-theme`), the centered header whose pill-nav active state is Liquid (`page.url == "/"` and `"/projects/"`; post pages get no active pill), and the fixed bottom-left theme toggle button right after `<body>`.
- `js/script.js` — theme logic (manual toggle persists to `localStorage('theme')`; OS changes are followed live only when nothing is stored; `localStorage` calls are try/catch-wrapped and `matchMedia.addEventListener` is guarded for old Safari), plus fade-in, smooth scroll, and the image lightbox. Loaded at end of body with no defer.
- `css/styles.css` — the single stylesheet. Theming is CSS variables defined in THREE blocks that must stay in exact parity: `:root` (light), `[data-theme="dark"]`, and the no-JS fallback `@media (prefers-color-scheme: dark) { html:not([data-theme]) { ... } }`. **Any new variable must be added to all three.** Layout: 1320px container; post articles are capped at a centered 800px via `.post`.

## Content model

- `/projects/` (`projects/index.html`) is the canonical listing; `blog/index.html` is only a meta-refresh redirect to it.
- Post permalinks are `/blog/:year/:month/:day/:title/` — never change the `permalink:` line in `_config.yml`; external links depend on it.
- Post front matter `image:` sets the thumbnail on `/projects/`. `reading_time:` still exists in older posts but is never rendered.
- The homepage `index.md` has a manually maintained project list (newest first) — a new post must also be added there — plus the `now-box` "Currently" callout in the bio.
- `docs/`, `AGENTS.md`, and `CLAUDE.md` are excluded from the built site in `_config.yml`; keep internal material in `docs/` or the exclude list.

## Adding a project write-up

1. Create `_posts/YYYY-MM-DD-slug.md` with front matter: `layout: post`, `title`, `date`, `excerpt_separator: <!--more-->`, `categories`, `tags`, and `image:` (the thumbnail).
2. Put `<!--more-->` after the intro paragraph — everything above it becomes the excerpt on `/projects/`.
3. Add an entry at the TOP of the homepage `index.md` project list.
4. Figures: `![alt](/assets/images/...)` followed by an italic `*caption*` line on the next line; attribute third-party figures in the caption. Process images with ImageMagick (`convert`/`mogrify`): ≤1000px wide, alpha flattened to white, ideally under ~150KB.

## Content rules

- **No emojis anywhere on the site.** When sweeping, grep the full Unicode ranges (U+1F000-1FAFF, U+2300-23FF, U+2600-27BF, U+2B00-2BFF, U+FE0F, U+200D) — a narrow pattern has missed U+23F1 before.
- The homepage bio wording is verbatim-intentional, including the "Genuinly" spelling — never correct its spelling, grammar, or tone.
- Posts are first-person and conversational; match the voice of the existing write-ups.
