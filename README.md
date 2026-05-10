# Leiming Yu — Personal Website

A bilingual (English / 中文) personal academic site for **Leiming Yu, Ph.D.** — GPU
researcher at Qualcomm's Graphics Research team. The site presents his bio,
CV, news, publications, projects, talks, teaching, and contact info.

Live (current production version): <https://leimingyu.github.io/>

## Features

- **Single-page layout** with sticky in-page navigation
- **Bilingual** — switchable between English and 中文 with one click; choice
  persists across visits via `localStorage`, auto-detects from browser language
  on first visit
- **Academic-classic design** — serif typography (Source Serif 4), restrained
  crimson accent, dark-mode aware (`prefers-color-scheme`)
- **Publication list** with type filters (All · Journal · Conference · Workshop)
- **Talks list** with format filters (All · Talks · Posters), color-coded tags
- **News feed** with category tags (Service / Position / Publication / Milestone)
- **Email obfuscation** — address is never present in the page source; assembled
  in JavaScript at click time
- **Back-to-top** button that fades in past 400 px scroll
- **Fully responsive** — collapses cleanly on mobile, photo and headers reflow
- **Accessible** — semantic landmarks, `aria-label`s, focus styles, skip link
- **Zero build step** — plain HTML / CSS / JS, deployable to any static host

## File structure

```
.
├── index.html       # Main page (all content sections)
├── styles.css       # All styles
├── script.js        # Language toggle, filters, back-to-top, email obfuscation
├── profile.png      # Portrait shown in the header
└── README.md
```

The site is intentionally a single page. Sections live under in-page anchors
(`#bio`, `#cv`, `#news`, `#awards`, `#publications`, `#projects`, `#talks`,
`#teaching`, `#contact`).

## Tech stack

- HTML5 + modern CSS (grid, flexbox, custom properties, `@media`
  `prefers-color-scheme`)
- Vanilla JavaScript — no frameworks, no build tools, no dependencies beyond
  Google Fonts (Source Serif 4 / Inter / JetBrains Mono)
- Hosted as static files — works on GitHub Pages, Netlify, Vercel, S3, or
  `python -m http.server`

## Run it locally

```sh
cd /path/to/5.10.2026_website
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

Any static-file server works (`npx serve`, `caddy file-server`, etc.). There
is no build step.

## Deploy

Drop the files onto any static host:

- **GitHub Pages** — push to `leimingyu.github.io` repo, enable Pages on `main`
- **Netlify / Vercel** — drag-and-drop the folder, or connect the repo
- **Custom domain** — point an `A` / `CNAME` record at your host

The PDF resume linked from the site is hosted separately at
`https://leimingyu.github.io/files/LeimingYu_resume.pdf`.

## Customizing

The site is structured so most edits are one-place changes.

### Adding a news item

In `index.html`, locate `<section id="news">` and add a new `<li class="news-item">`
to the top of the list. Each item has a date, a category tag, and an English
+ Chinese body:

```html
<li class="news-item">
  <span class="when">
    <span class="i18n-en">May 2026</span>
    <span class="i18n-zh">2026 年 5 月</span>
  </span>
  <div class="news-body">
    <span class="tag tag-pub">
      <span class="i18n-en">Publication</span><span class="i18n-zh">发表</span>
    </span>
    <p>
      <span class="i18n-en">English version of the news.</span>
      <span class="i18n-zh">新闻的中文版。</span>
    </p>
  </div>
</li>
```

Available tag classes: `tag-service`, `tag-position`, `tag-pub`, `tag-milestone`.

### Adding a publication

In `<section id="publications">`, add an `<li class="pub" data-type="...">`
where `data-type` is one of `journal`, `conference`, or `workshop` (this
controls which filter shows it). Publication titles and venues stay in English.

### Swapping the profile photo

Replace `profile.png` with your own square portrait (recommended 320×320 or
larger). Filename can stay the same, or update the `<img src=...>` in
`index.html`.

### Color / typography

All design tokens live at the top of `styles.css`:

```css
:root {
  --accent: #8b1d1d;       /* deep crimson */
  --serif: "Source Serif 4", ...;
  --sans:  "Inter", ...;
  --mono:  "JetBrains Mono", ...;
  /* ... */
}
```

Dark-mode tokens override automatically via
`@media (prefers-color-scheme: dark)`.

### Adding translations

For an existing element, wrap each language in a sibling span:

```html
<h2><span class="i18n-en">News</span><span class="i18n-zh">最新动态</span></h2>
```

The CSS rule `html[lang="..."] .i18n-...` handles showing/hiding. No JS change
needed.

## License

Content (text, photo, CV) is © Leiming Yu, all rights reserved. The HTML / CSS
/ JS scaffolding is unlicensed — feel free to fork the structure for your own
personal site, but please replace the content with your own.

## Contact

The site itself has an obfuscated email link in the Contact section. Or reach
out via [GitHub](https://github.com/leimingyu) /
[LinkedIn](https://linkedin.com/in/leimingyu).
