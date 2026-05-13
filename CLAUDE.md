# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal academic website for Leiming Yu, deployed to GitHub Pages at <https://leimingyu.github.io/>. The repo root **is** the published site — pushing to `master` deploys.

Three files do all the work: `index.html` (all content, ~820 lines), `styles.css` (~790 lines), `script.js` (~140 lines). No build, no dependencies beyond Google Fonts.

## Run locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Bilingual content model (EN / 中文)

Every translatable string is duplicated in two sibling `<span>`s:

```html
<span class="i18n-en">News</span><span class="i18n-zh">最新动态</span>
```

Visibility is pure CSS — `styles.css:2-5` hides the inactive language via `html[lang="en"] .i18n-zh` / `html[lang="zh"] .i18n-en`. `script.js` only flips `<html lang>`, persists the choice in `localStorage`, and swaps `document.title` from the `I18N_META` map in `script.js:2-11`. **When adding new content, always add both spans** — forgetting one leaves a blank in the other language. Strings that appear only in JS (e.g. `<title>`, back-to-top `aria-label`) must be added to `I18N_META`.

Whole paragraphs use sibling `<p class="i18n-en">` / `<p class="i18n-zh">` blocks instead of inline spans.

## Filters (publications, talks)

Filterable lists use a `data-type` attribute on each `<li>` and filter buttons with `data-filter`. `script.js:88-120` toggles a `.hidden` class on items whose `data-type` doesn't match. Valid `data-type` values:

- Publications: `journal`, `conference`, `workshop`
- Talks: `talk`, `poster`

Adding a new filter category means adding both a button (in `index.html`) and the matching `data-type` on each `<li>`.

## Email obfuscation

The email address is never present in HTML source. Anchors carry `data-email-user` and `data-email-domain`; `script.js:66-86` assembles `user@domain` only at click time. Two CSS classes route the behavior:

- `a.email-link` — scroll to `#contact` *and* open `mailto:`
- `a.email-send` — `mailto:` only (used inside the Contact section)

Don't put a plain `mailto:` link anywhere or this is defeated.

## Section anchors and nav highlighting

Nav links point at `#bio`, `#cv`, `#news`, `#awards`, `#publications`, `#projects`, `#talks`, `#teaching`, `#contact`. `script.js:122-142` uses `IntersectionObserver` with `rootMargin: '-40% 0px -55% 0px'` to highlight the current section. New top-level `<section id="...">` blocks should also get a matching nav `<a>` to participate in highlighting.

## Design tokens

All colors, fonts, and the `--maxw: 880px` content width live in `:root` at `styles.css:40-56`, with a dark-mode override block immediately after (`@media (prefers-color-scheme: dark)`). Prefer editing tokens over hardcoding values.

## Static assets

- `profile.png` — header portrait (has Gravatar fallback via `onerror` in `index.html`)
- `files/LeimingYu_resume.pdf` — linked as "CV" from the header; the link is an **absolute** `https://leimingyu.github.io/...` URL, so local previews of that link hit the live site
- `files/certs/`, `files/posters/`, `files/reviews/` — additional linked PDFs
