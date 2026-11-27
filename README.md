# juandelmazovazquez.github.io

Personal website of **Juan del Mazo Vázquez**: Junior Business Analyst at Bankinter, computer engineer and MSc in Big Data Analytics. Bilingual (English / Spanish), light and dark themes, no framework and no tracking.

- Main site: https://juandelmazovazquez.vercel.app
- Mirror (GitHub Pages): https://juandelmazovazquez.github.io

Both serve the same build; every page declares the Vercel URL as canonical.

## How it works

`build.mjs` is a dependency-free Node script. It reads all text from `src/content.mjs` (one object per language) and writes static HTML to `dist/`:

- `/` (English, default) and `/es/` (Spanish), linked with `hreflang`
- `sitemap.xml`, `robots.txt`, `404.html`
- assets from `public/` (styles, script, self-hosted Newsreader font, favicons, Open Graph images per language)
- the CV PDFs from `cv/`

```bash
node build.mjs              # build into dist/
python -m http.server -d dist 4321   # preview at http://127.0.0.1:4321
```

To change any text, edit `src/content.mjs` and rebuild.

## Brand

`brand/` holds the visual identity: the JdM monogram (letters drawn as paths from Newsreader Italic, so it needs no font), a motif of a data grid with a route that reaches a decision, and the palette. `brand/brand.mjs` is shared with the site build, which draws the hero from the same motif.

```bash
node brand/build-brand.mjs                              # SVG sources in brand/
NODE_PATH=/path/to/node_modules node brand/export.cjs   # PNGs in brand/png/ (needs Playwright)
```

The export also copies the Open Graph images and favicons to `public/`. Files in `brand/png/`: Open Graph (1200×630, EN and ES), LinkedIn banner (1584×396), X banner (1500×500), GitHub README header (light and dark), monogram and icons.

## CV

`cv/cv-en.tex` and `cv/cv-es.tex` share `cv/preamble.tex` (based on Jake Gutierrez's resume template, MIT). The compiled PDFs are committed so the site build does not need LaTeX:

```bash
cd cv && pdflatex cv-en.tex && pdflatex cv-es.tex
```

## Deployment

- **GitHub Pages**: `.github/workflows/pages.yml` builds and deploys on every push to `main`.
- **Vercel**: the project is linked to this repository; `vercel.json` sets the build command and output directory, so every push to `main` deploys to production.

## Licence

Code under the MIT licence (see `LICENSE`). Text, CV and images © Juan del Mazo Vázquez. Newsreader font under the SIL Open Font License 1.1.
