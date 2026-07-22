# tldraw figures

How the tldraw-style figures on this site are generated — **no npm install required**.

## The technique

tldraw is a React canvas SDK, normally used interactively. To generate a static
figure from it, run it in a headless browser and use its SVG export:

1. A single HTML file imports tldraw from a CDN, so nothing needs installing:
   ```html
   <link rel="stylesheet" href="https://esm.sh/tldraw@3/tldraw.css">
   ```
   ```js
   const React    = await import('https://esm.sh/react@18');
   const ReactDOM = await import('https://esm.sh/react-dom@18/client');
   const tl       = await import('https://esm.sh/tldraw@3?deps=react@18,react-dom@18');
   ```
2. Render `<Tldraw onMount={...}>` and build the scene with `editor.createShapes([...])`.
3. Export with `await editor.getSvgString(ids, { background: true, padding: 40, scale: 1 })`,
   which resolves to `{ svg: string }`.
4. Write that string into a DOM node's `textContent`, then read it out of headless
   Chrome. **`textContent`, not a textarea's `value`** — `--dump-dom` serializes the
   DOM, and a textarea's value is a property that never appears there.

```bash
google-chrome --headless --disable-gpu --virtual-time-budget=40000 \
  --dump-dom docs/tldraw/ranking-flip.html > /tmp/dump.html
# then extract the <div id="svgout"> contents and HTML-unescape it
```

## tldraw v3 API notes (things that cost time)

- `geo` shapes take **no `text` prop**. Text is a separate `text` shape.
- Text uses `richText`, built with `tl.toRichText('...')` — not a plain string.
- Text shapes auto-wrap at a default width. Pass `w` **and** `autoSize: false`, or
  long headings silently wrap and overlap whatever is below them.
- `arrow` shapes take `start`/`end` as `{x, y}` objects; set `arrowheadStart`/
  `arrowheadEnd` to `'none'` for plain connector lines.
- Fonts: `'draw' | 'sans' | 'serif' | 'mono'`. The reference look is a serif title
  with mono figures.

## Output format

The exported SVG embeds three full font files, so it lands around 437 KB. Rendering
that SVG to a 2600px-wide PNG gives the same figure at **71 KB**, which is what ships
in `assets/images/`. The SVG is kept here as the reproducible source.

Figures are exported at 2600px so they still have detail to show when clicked open
in the lightbox — see the figure guidance in `AGENTS.md`.
