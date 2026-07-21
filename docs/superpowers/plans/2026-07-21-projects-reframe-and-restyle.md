# Projects Reframe + Site Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the site's "Blog" as a canonical Projects page and restyle the whole site (Red Hat Display, 660px centered column, round-photo header with pill nav, "Currently" callout, system-adaptive theme with a bottom-left toggle).

**Architecture:** Plain Jekyll (GitHub Pages) + one CSS file + one JS file. The listing page moves from `/blog/` to a new `/projects/` page; `/blog/` becomes a static meta-refresh redirect. Post permalinks (`/blog/:year/:month/:day/:title/`) never change. The restyle is pure CSS/HTML edits to `_layouts/default.html`, `css/styles.css`, `js/script.js`, and `index.md`.

**Tech Stack:** Jekyll 4 (kramdown, rouge), Liquid templates, Google Fonts (Red Hat Display), Font Awesome 6 (already loaded), vanilla JS. No new libraries.

**Spec:** `docs/superpowers/specs/2026-07-21-projects-reframe-and-restyle-design.md`

## Global Constraints

- **No new libraries or frameworks.** Plain Jekyll + CSS + vanilla JS only.
- **Post permalink pattern stays exactly** `/blog/:year/:month/:day/:title/` (`_config.yml` is never modified).
- **Font:** Red Hat Display (Google Fonts, `ital,wght@0,300..900;1,300..900`), replacing the currently-loaded-but-unused Inter link.
- **Column width:** 660px max, centered.
- **Theme:** existing CSS-variable architecture (`:root` + `[data-theme="dark"]`) is kept and extended, never replaced.
- **Bio content:** keep the user's casual voice verbatim, including the "Genuinly" spelling — the user explicitly chose *not* to have typos fixed. Only the changes named in tasks below.
- **Verification:** there is no test framework. Every task verifies with `bundle exec jekyll build` (run from the repo root) plus `grep`/`test` checks against the generated `_site/` output. A task is not done until its checks pass.
- **Commits:** one commit per task, message ending with:
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`
- **Note:** `index.md` already has uncommitted user edits (the rewritten bio). Task 1 builds on and commits them intentionally.

---

### Task 1: Baseline build + content fixes (bio fragment, NEURA caption)

**Files:**
- Modify: `index.md:16` (remove dangling sentence fragment)
- Modify: `_posts/2023-06-30-neura-robotics-internship.md:20` (remove placeholder note)

**Interfaces:**
- Consumes: nothing (first task).
- Produces: a repo that builds cleanly with `bundle exec jekyll build`; later tasks assume this baseline works.

- [ ] **Step 1: Verify the site builds at all (baseline)**

Run:
```bash
cd /home/juancm/jucamohedano.github.io && bundle install && bundle exec jekyll build
```
Expected: `bundle install` ends with `Bundle complete!` (or "Using ..." lines if already installed); `jekyll build` ends with `done in X.XXX seconds.` and `_site/index.html` exists. If `bundle` is missing, run `gem install bundler` first. Do not proceed until the baseline build passes.

- [ ] **Step 2: Trim the dangling bio fragment in `index.md`**

In `index.md`, the second bio paragraph currently ends with a cut-off sentence. Remove ONLY the line `Recently did some work on LLMs training and` (line 16). The paragraph becomes:

```html
    <p>
        Genuinly interested in AI research and the engineering aspect of it.
        On my way to making GPUs go brrr!
        Was very excited that I got access to a cluster with lots of gpus to run my thesis experiments.
        I do like multimodal models and LLMs in general.
        I'm tweaking LLMs at the moment: did some post-training with GRPO and now exploration of the data manifold of an LLM via sampling.
    </p>
```

- [ ] **Step 3: Remove the placeholder caption note in the NEURA post**

In `_posts/2023-06-30-neura-robotics-internship.md` line 20, change:

```markdown
*The MiPA robot that I worked with during my internship. (You should replace this with an actual image of the MiPA robot)*
```

to:

```markdown
*The MiPA robot that I worked with during my internship.*
```

- [ ] **Step 4: Build and verify**

Run:
```bash
bundle exec jekyll build && grep -c "Recently did some work" _site/index.html; grep -c "You should replace this" _site/blog/2023/06/30/neura-robotics-internship/index.html
```
Expected: build succeeds; both `grep -c` commands print `0` (grep exits non-zero when count is 0 — that is the pass condition).

- [ ] **Step 5: Commit**

```bash
git add index.md _posts/2023-06-30-neura-robotics-internship.md
git commit -m "$(cat <<'EOF'
Rewrite bio and fix placeholder caption in NEURA post

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Projects page, /blog/ redirect, nav retarget, homepage NEURA entry

**Files:**
- Create: `projects/index.html`
- Modify: `blog/index.html` (replace entirely with redirect)
- Modify: `_layouts/default.html:30-38` (nav links)
- Modify: `index.md` (add NEURA entry to the projects list)

**Interfaces:**
- Consumes: baseline build from Task 1.
- Produces: `/projects/` page (the canonical listing, containing `<ul class="post-list">` with one `<li class="post-item">` per post); `/blog/` redirect; nav items in final order Home · Projects · CV · GitHub. Task 4 rebuilds the header around this same set of four nav links.

- [ ] **Step 1: Create `projects/index.html`**

```html
---
layout: default
title: Projects
---

<h1>Projects</h1>

<p>Write-ups of things I've built and worked on — research projects, thesis work, and internships.</p>

<ul class="post-list">
  {% for post in site.posts %}
    <li class="post-item">
      <h2 class="post-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}{% if post.reading_time %} · {{ post.reading_time }} min read{% endif %}</p>
      <div class="post-excerpt">
        {{ post.excerpt }}
      </div>
      <a href="{{ post.url | relative_url }}">Read more →</a>
    </li>
  {% endfor %}
</ul>
```

- [ ] **Step 2: Replace `blog/index.html` with a redirect**

Replace the ENTIRE file content with:

```html
---
layout: null
permalink: /blog/
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <meta http-equiv="refresh" content="0; url=/projects/">
  <link rel="canonical" href="/projects/">
</head>
<body>
  <p>This page has moved to <a href="/projects/">/projects/</a>.</p>
</body>
</html>
```

- [ ] **Step 3: Retarget the nav in `_layouts/default.html`**

Replace the current nav list (lines 31-37):

```html
                <ul>
                    <li><a href="{{ "/" | relative_url }}">Home</a></li>
                    <li><a href="{{ "/blog/" | relative_url }}">Blog</a></li>
                    <li><a href="{{ "/#projects" | relative_url }}">Projects</a></li>
                    <li><a href="{{ "/assets/files/Juan_Camacho_CV.pdf" | relative_url }}" target="_blank">CV <i class="fas fa-file-pdf"></i></a></li>
                    <li><a href="https://github.com/{{ site.github_username }}" target="_blank">GitHub</a></li>
                </ul>
```

with:

```html
                <ul>
                    <li><a href="{{ "/" | relative_url }}">Home</a></li>
                    <li><a href="{{ "/projects/" | relative_url }}">Projects</a></li>
                    <li><a href="{{ "/assets/files/Juan_Camacho_CV.pdf" | relative_url }}" target="_blank">CV <i class="fas fa-file-pdf"></i></a></li>
                    <li><a href="https://github.com/{{ site.github_username }}" target="_blank">GitHub</a></li>
                </ul>
```

(This is still the old link-row style; Task 4 restyles it into pills. Only the link set changes here.)

- [ ] **Step 4: Add the NEURA entry to the homepage projects list**

In `index.md`, inside `<ul class="project-list">`, add a new `<li>` between the Test-Time Adaptation entry and the BSc thesis entry (chronological order):

```html
        <li>
            <strong><a href="/blog/2023/06/30/neura-robotics-internship/">R&D Internship at NEURA Robotics</a></strong> - Six months on the MiPA cognitive robot platform: ROS2, Gazebo simulation, and deep-learning perception for a commercial robot assistant.
        </li>
```

- [ ] **Step 5: Build and verify**

Run:
```bash
bundle exec jekyll build \
  && grep -c "post-item" _site/projects/index.html \
  && grep -c 'http-equiv="refresh"' _site/blog/index.html \
  && grep -c "neura-robotics-internship" _site/index.html \
  && test -f _site/blog/2024/11/30/alpha-clip-study/index.html && echo PERMALINKS_OK \
  && (grep -c '"/blog/"' _site/index.html || true)
```
Expected: build succeeds; `post-item` count is `4`; refresh count is `1`; NEURA link count on the homepage is at least `1`; `PERMALINKS_OK` prints (post URLs unchanged); the final grep prints `0` (no nav link to `/blog/` remains).

- [ ] **Step 6: Commit**

```bash
git add projects/index.html blog/index.html _layouts/default.html index.md
git commit -m "$(cat <<'EOF'
Reframe blog as Projects page; /blog/ now redirects to /projects/

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Typography and column width

**Files:**
- Modify: `_layouts/default.html:12` (Google Fonts link)
- Modify: `css/styles.css:39-56` (body font, container width)

**Interfaces:**
- Consumes: nothing beyond baseline.
- Produces: `"Red Hat Display"` as the body font-family and `.container { max-width: 660px }`; all later CSS assumes this type and width.

- [ ] **Step 1: Swap Inter for Red Hat Display in `_layouts/default.html`**

Replace line 12:

```html
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

with:

```html
    <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Wire the font up and narrow the column in `css/styles.css`**

Replace the `body` rule (lines 39-50):

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
    margin: 0;
    padding: 0;
    transition: color 0.3s ease, background-color 0.3s ease;
    font-size: 16px;
}
```

with:

```css
body {
    font-family: "Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    line-height: 1.65;
    color: var(--text-color);
    background-color: var(--background-color);
    margin: 0;
    padding: 0;
    transition: color 0.3s ease, background-color 0.3s ease;
    font-size: 17px;
}
```

Then replace the `.container` rule (lines 52-56):

```css
.container {
    max-width: 980px;
    margin: 0 auto;
    padding: 0 20px;
}
```

with:

```css
.container {
    max-width: 660px;
    margin: 0 auto;
    padding: 0 20px;
}
```

- [ ] **Step 3: Build and verify**

Run:
```bash
bundle exec jekyll build \
  && grep -c "Red+Hat+Display" _site/index.html \
  && grep -c "max-width: 660px" _site/css/styles.css \
  && (grep -c "family=Inter" _site/index.html || true)
```
Expected: build succeeds; first two counts are `1`; final grep prints `0` (Inter link gone).

- [ ] **Step 4: Commit**

```bash
git add _layouts/default.html css/styles.css
git commit -m "$(cat <<'EOF'
Switch site font to Red Hat Display and narrow column to 660px

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Centered header with round photo and pill nav; remove hamburger

**Files:**
- Modify: `_layouts/default.html:27-44` (header markup)
- Modify: `index.md:6` (remove bio photo — it moves to the header)
- Modify: `css/styles.css` (header/nav styles; delete hamburger + old nav CSS; delete `.bio img`)
- Modify: `js/script.js:1-5,43-58` (delete hamburger JS)

**Interfaces:**
- Consumes: the four nav links from Task 2; 660px column from Task 3.
- Produces: header markup `<header> → a.header-photo > img → h1.site-title → nav.pill-nav > a.pill(.active)`. Active state is set by Liquid on `page.url` for `/` and `/projects/` only (posts get no active pill, per spec). Task 6 relies on the hamburger JS being gone from `js/script.js`.

- [ ] **Step 1: Replace the header markup in `_layouts/default.html`**

Replace the whole current header block AND the hamburger div (lines 28-44, from `<header>` through `</header>`):

```html
        <header>
            <h1 class="site-title">{{ site.title }}</h1>
            <nav>
                <ul>
                    <li><a href="{{ "/" | relative_url }}">Home</a></li>
                    <li><a href="{{ "/projects/" | relative_url }}">Projects</a></li>
                    <li><a href="{{ "/assets/files/Juan_Camacho_CV.pdf" | relative_url }}" target="_blank">CV <i class="fas fa-file-pdf"></i></a></li>
                    <li><a href="https://github.com/{{ site.github_username }}" target="_blank">GitHub</a></li>
                </ul>
            </nav>
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </header>
```

with:

```html
        <header>
            <a class="header-photo" href="{{ "/" | relative_url }}"><img src="{{ "/assets/images/profile_pic.png" | relative_url }}" alt="{{ site.title }}"></a>
            <h1 class="site-title">{{ site.title }}</h1>
            <nav class="pill-nav">
                <a class="pill{% if page.url == "/" %} active{% endif %}" href="{{ "/" | relative_url }}">Home</a>
                <a class="pill{% if page.url == "/projects/" %} active{% endif %}" href="{{ "/projects/" | relative_url }}">Projects</a>
                <a class="pill" href="{{ "/assets/files/Juan_Camacho_CV.pdf" | relative_url }}" target="_blank">CV <i class="fas fa-file-pdf"></i></a>
                <a class="pill" href="https://github.com/{{ site.github_username }}" target="_blank">GitHub</a>
            </nav>
        </header>
```

- [ ] **Step 2: Remove the bio photo from `index.md`**

The profile photo now lives in the header on every page, so delete line 6 from `index.md`:

```html
    <img src="assets/images/profile_pic.png" alt="{{ site.title }}" style="width: 450px; height: 450px;">
```

- [ ] **Step 3: Restyle the header in `css/styles.css`**

Replace the Layout block (`header`, `.site-title`, `nav`, `nav ul`, `nav ul li`, `nav ul li a`, `nav ul li a:hover` — currently lines 108-140):

```css
/* Layout */
header {
    padding: 2.5rem 0 0.5rem;
    margin-bottom: 2rem;
    text-align: center;
}

.header-photo img {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
}

.site-title {
    font-size: 1.7rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0.8rem 0 1.1rem;
}

.pill-nav {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
    background-color: var(--pill-track-bg);
    border-radius: 999px;
    padding: 4px;
}

.pill-nav a.pill {
    color: var(--nav-link-color);
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    white-space: nowrap;
}

.pill-nav a.pill:hover {
    color: var(--nav-link-hover);
    text-decoration: none;
}

.pill-nav a.pill.active {
    background-color: var(--pill-active-bg);
    color: var(--heading-color);
    box-shadow: var(--pill-shadow);
}
```

- [ ] **Step 4: Add the pill CSS variables**

In the `:root` block (after `--nav-link-hover: #000;`), add:

```css
    --pill-track-bg: #f1f1f2;
    --pill-active-bg: #ffffff;
    --pill-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
```

In the `[data-theme="dark"]` block (after `--nav-link-hover: #fff;`), add:

```css
    --pill-track-bg: #242428;
    --pill-active-bg: #38383e;
    --pill-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
```

- [ ] **Step 5: Delete obsolete CSS**

Delete these rules entirely from `css/styles.css`:
- `.bio img` (the float-right 150px rule) and the `.bio img` override inside `@media (max-width: 768px)` — if the media query becomes empty, delete the whole media query.
- `.hamburger`, `.bar` (the "Mobile Menu" section).
- Inside `@media (max-width: 700px)`: the `.hamburger`, `nav ul`, `nav ul.active`, `nav ul li`, `.hamburger.active .bar:nth-child(...)` and `.theme-switch-wrapper` rules. Replace that whole media query with:

```css
@media (max-width: 700px) {
    .header-photo img {
        width: 72px;
        height: 72px;
    }

    .site-title {
        font-size: 1.4rem;
    }
}
```

- [ ] **Step 6: Delete hamburger JS from `js/script.js`**

Delete line 2 (`const hamburger = ...`) and line 3 (`const navMenu = ...`), the whole "Toggle mobile menu" block (lines 43-49), and the whole "Close mobile menu when clicking on a menu item" block (lines 51-58). The theme-switch code stays for now — Task 6 replaces it.

- [ ] **Step 7: Build and verify**

Run:
```bash
bundle exec jekyll build \
  && grep -c 'class="pill active"' _site/index.html \
  && grep -c 'class="pill active"' _site/projects/index.html \
  && (grep -c 'class="pill active"' _site/blog/2024/11/30/alpha-clip-study/index.html || true) \
  && (grep -c hamburger _site/index.html || true) \
  && (grep -c 'profile_pic' _site/index.html)
```
Expected: build succeeds; homepage has exactly `1` active pill (Home); projects page has `1` (Projects); the post page prints `0` (no mishighlight); `hamburger` prints `0`; `profile_pic` prints `1` (header only — the bio copy is gone).

- [ ] **Step 8: Commit**

```bash
git add _layouts/default.html index.md css/styles.css js/script.js
git commit -m "$(cat <<'EOF'
Centered header with round photo and pill nav; drop hamburger menu

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: "Currently" callout box on the homepage

**Files:**
- Modify: `index.md` (move the "tweaking LLMs" sentence into a callout)
- Modify: `css/styles.css` (callout + pulse dot styles, accent variables)

**Interfaces:**
- Consumes: bio paragraph state from Tasks 1 and 4.
- Produces: `.now-box` and `.pulse-dot` classes; `--accent`, `--callout-bg`, `--callout-border` CSS variables (Task 6's no-JS fallback block includes these same variables).

- [ ] **Step 1: Restructure the bio in `index.md`**

Replace the second bio paragraph (the one from Task 1 Step 2) with a shorter paragraph plus a callout div:

```html
    <p>
        Genuinly interested in AI research and the engineering aspect of it.
        On my way to making GPUs go brrr!
        Was very excited that I got access to a cluster with lots of gpus to run my thesis experiments.
        I do like multimodal models and LLMs in general.
    </p>
    <div class="now-box">
        <p><span class="pulse-dot" aria-hidden="true"></span><strong>Currently:</strong> tweaking LLMs — post-training with GRPO, and exploring the data manifold of an LLM via sampling.</p>
    </div>
```

- [ ] **Step 2: Add accent variables in `css/styles.css`**

In the `:root` block (after the pill variables from Task 4), add:

```css
    --accent: #0366d6;
    --callout-bg: #eef4fc;
    --callout-border: #d3e3f8;
```

In the `[data-theme="dark"]` block (after its pill variables), add:

```css
    --accent: #58a6ff;
    --callout-bg: #14212f;
    --callout-border: #24405e;
```

- [ ] **Step 3: Add callout styles**

After the `.bio` rule in `css/styles.css`, add:

```css
/* "Currently" callout */
.now-box {
    background-color: var(--callout-bg);
    border: 1px solid var(--callout-border);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin: 1.5rem 0;
}

.now-box p {
    margin: 0;
}

.pulse-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--accent);
    margin-right: 0.5rem;
    vertical-align: 2px;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
}

@media (prefers-reduced-motion: reduce) {
    .pulse-dot {
        animation: none;
    }

    .fade-in {
        animation: none;
    }
}
```

- [ ] **Step 4: Build and verify**

Run:
```bash
bundle exec jekyll build \
  && grep -c "now-box" _site/index.html \
  && grep -c "pulse-dot" _site/css/styles.css \
  && (grep -c "tweaking LLMs at the moment" _site/index.html || true)
```
Expected: build succeeds; `now-box` ≥ `1`; `pulse-dot` ≥ `1`; last grep prints `0` (old sentence moved, not duplicated).

- [ ] **Step 5: Commit**

```bash
git add index.md css/styles.css
git commit -m "$(cat <<'EOF'
Add pulsing "Currently" callout to homepage bio

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: System-adaptive theme with bottom-left toggle

**Files:**
- Modify: `_layouts/default.html` (html tag, head inline script, replace switch markup with button)
- Modify: `js/script.js` (replace checkbox theme logic with button + system listener)
- Modify: `css/styles.css` (toggle button styles, no-JS fallback, delete old switch CSS)

**Interfaces:**
- Consumes: hamburger-free `js/script.js` from Task 4; `--pill-*`, `--accent`, `--callout-*` variables from Tasks 4-5.
- Produces: `<button id="theme-toggle" class="theme-toggle">`; theme resolution order = localStorage → `prefers-color-scheme`; manual click persists to `localStorage('theme')`; system changes apply live only when no stored preference exists.

- [ ] **Step 1: Make the html tag theme-neutral and add the pre-paint script**

In `_layouts/default.html`, change line 2:

```html
<html lang="en" data-theme="light">
```

to:

```html
<html lang="en">
```

Then add this inline script immediately after the viewport meta (line 5) and before any stylesheet link. It is synchronous, so it runs before first paint — no theme flash:

```html
    <script>
        (function () {
            var stored = localStorage.getItem('theme');
            var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', theme);
        })();
    </script>
```

- [ ] **Step 2: Replace the switch markup with the corner button**

In `_layouts/default.html`, delete the whole Theme Switcher block (lines 17-25, `<div class="theme-switch-wrapper">…</div>`) and add this button immediately after `<body>`:

```html
    <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Switch theme"><i class="fas fa-moon"></i></button>
```

- [ ] **Step 3: Replace the theme JS in `js/script.js`**

Replace everything from `const themeSwitch = document.querySelector('#checkbox');` down through the end of the `if (themeSwitch) { ... }` block (this includes `loadTheme` and its `DOMContentLoaded` listener) with:

```js
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
};

// Theme was already set pre-paint by the inline head script; sync the button icon
applyTheme(htmlElement.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light'));

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const next = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });
}

// Follow OS theme changes live, unless the user picked a theme manually
systemDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});
```

Keep the fade-in, smooth-scroll, and lightbox code below unchanged.

- [ ] **Step 4: Replace the switch CSS with button CSS**

In `css/styles.css`, delete the whole "Theme Switcher" section (`.theme-switch-wrapper`, `.theme-switch`, `.theme-switch input`, `.slider`, `.slider:before`, `input:checked + .slider`, `input:checked + .slider:before` — currently lines 164-215) and add in its place:

```css
/* Theme Toggle */
.theme-toggle {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--text-color);
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

.theme-toggle i {
    margin: 0;
}

.theme-toggle:hover {
    color: var(--heading-color);
    border-color: var(--nav-link-color);
}

.theme-toggle:focus-visible {
    outline: 2px solid var(--link-color);
    outline-offset: 2px;
}
```

- [ ] **Step 5: Add the no-JS dark fallback**

At the end of the variables section (right after the `[data-theme="dark"]` block), add a media query that mirrors the dark values for the no-JS case (html never gets a `data-theme` attribute without JS):

```css
/* No-JS fallback: follow the OS theme when JS never set data-theme */
@media (prefers-color-scheme: dark) {
    html:not([data-theme]) {
        --background-color: #1a1a1a;
        --text-color: #ddd;
        --heading-color: #fff;
        --link-color: #58a6ff;
        --link-hover: #79c0ff;
        --border-color: #333;
        --code-bg: #2a2a2a;
        --blockquote-border: #444;
        --blockquote-bg: #252525;
        --nav-link-color: #bbb;
        --nav-link-hover: #fff;
        --pill-track-bg: #242428;
        --pill-active-bg: #38383e;
        --pill-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        --accent: #58a6ff;
        --callout-bg: #14212f;
        --callout-border: #24405e;
    }
}
```

- [ ] **Step 6: Build and verify**

Run:
```bash
bundle exec jekyll build \
  && grep -c "theme-toggle" _site/index.html \
  && grep -c "localStorage.getItem('theme')" _site/index.html \
  && (grep -c 'data-theme="light"' _site/index.html || true) \
  && (grep -c "theme-switch-wrapper" _site/index.html || true) \
  && grep -c "prefers-color-scheme" _site/css/styles.css
```
Expected: build succeeds; `theme-toggle` ≥ `2` (CSS class + button id); inline script present ≥ `1`; hardcoded `data-theme="light"` prints `0`; old wrapper prints `0`; `prefers-color-scheme` ≥ `1` in CSS.

- [ ] **Step 7: Commit**

```bash
git add _layouts/default.html js/script.js css/styles.css
git commit -m "$(cat <<'EOF'
System-adaptive theme with persistent bottom-left toggle

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Full-site verification pass

**Files:**
- No planned changes — fixes only if a check fails.

**Interfaces:**
- Consumes: everything above.
- Produces: verified, shippable site.

- [ ] **Step 1: Serve the site**

Run in background:
```bash
bundle exec jekyll serve --port 4000 --detach
```
Expected: `Server running... press ctrl-c to stop.` (or detached equivalent).

- [ ] **Step 2: Run the endpoint checklist**

```bash
curl -s -o /dev/null -w "home %{http_code}\n" http://127.0.0.1:4000/ \
&& curl -s -o /dev/null -w "projects %{http_code}\n" http://127.0.0.1:4000/projects/ \
&& curl -s -o /dev/null -w "blog-redirect %{http_code}\n" http://127.0.0.1:4000/blog/ \
&& curl -s -o /dev/null -w "post %{http_code}\n" http://127.0.0.1:4000/blog/2024/03/01/test-time-adaptation/ \
&& curl -s -o /dev/null -w "feed %{http_code}\n" http://127.0.0.1:4000/feed.xml \
&& curl -s http://127.0.0.1:4000/blog/ | grep -c "url=/projects/"
```
Expected: all five endpoints return `200`; the final grep prints `1`.

- [ ] **Step 3: Structure checks on served HTML**

```bash
curl -s http://127.0.0.1:4000/ | grep -c "now-box" \
&& curl -s http://127.0.0.1:4000/projects/ | grep -c "post-item" \
&& curl -s http://127.0.0.1:4000/ | grep -o 'class="pill active"[^>]*' | head -1
```
Expected: `now-box` ≥ 1; `post-item` = 4; the active pill on home is the Home link.

- [ ] **Step 4: Stop the server**

```bash
pkill -f "jekyll serve" || true
```

- [ ] **Step 5: Visual spot-check (manual)**

Open `http://127.0.0.1:4000/` in a browser (or re-serve) and confirm: Red Hat Display renders, header is centered with round photo and pills, callout dot pulses, bottom-left button toggles and persists across reload, and OS theme is respected in a private window. If a browser tool is available, take light- and dark-mode screenshots of home and projects pages.

- [ ] **Step 6: Final commit (only if fixes were needed)**

```bash
git status --short
```
If clean: done. If fixes were made, commit them:
```bash
git add -A ':!_site' && git commit -m "$(cat <<'EOF'
Fix issues found in final verification pass

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
EOF
)"
```
