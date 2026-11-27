// Writes the brand SVG sources into brand/. Run from the repo root: node brand/build-brand.mjs
// Text uses the self-hosted Newsreader through /public/fonts, so the SVGs render with the right
// typeface when served from the repo root (brand/export.cjs does that to produce the PNGs).
import { writeFileSync } from 'node:fs';
import { markGroup, markSvg, motif, heroMotif, palette as p } from './brand.mjs';

const fonts = `<style>
@font-face{font-family:'Newsreader';src:url('/public/fonts/newsreader.woff2') format('woff2');font-weight:300 700;font-style:normal}
@font-face{font-family:'Newsreader';src:url('/public/fonts/newsreader-italic.woff2') format('woff2');font-weight:300 700;font-style:italic}
.serif{font-family:'Newsreader',Georgia,serif}
.mono{font-family:'Cascadia Mono',Consolas,ui-monospace,monospace}
</style>`;

const light = { bg: p.paper, ink: p.ink, muted: p.muted, accent: p.green, dot: p.line, path: p.green, alt: '#b9b3a6', node: p.clay };
const dark = { bg: p.night, ink: p.nightInk, muted: p.nightMuted, accent: p.mint, dot: p.nightLine, path: p.mint, alt: '#4a5158', node: p.clayLight };

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">\n${fonts}\n${body}\n</svg>\n`;

const files = {};

files['favicon.svg'] = markSvg({ size: 64, withNode: false });
files['monogram.svg'] = markSvg({ size: 512 });
files['apple-touch-icon.svg'] = markSvg({ size: 180, radius: 0 });

files['motif.svg'] = svg(
  640,
  440,
  `<rect width="640" height="440" fill="${p.paper}"/>
${motif({ ...heroMotif, gap: 70, x: 40, y: 45, colors: light })}`,
);

const og = (lang) => {
  const t = lang === 'en'
    ? { tag: 'Analyst by profession, engineer by training.', role: 'Junior Business Analyst · Bankinter · Madrid' }
    : { tag: 'Analista de profesión, ingeniero de formación.', role: 'Junior Business Analyst en Bankinter · Madrid' };
  const c = light;
  return svg(
    1200,
    630,
    `<rect width="1200" height="630" fill="${c.bg}"/>
${markGroup({ x: 80, y: 72, size: 72 })}
${motif({ cols: 8, rows: 4, gap: 52, x: 752, y: 86, route: [[0, 3], [2, 3], [2, 1], [4, 1]], chosen: [[4, 1], [4, 0], [7, 0]], alt: [[4, 1], [4, 3], [6, 3]], colors: c })}
<text class="serif" x="80" y="372" font-size="84" font-weight="500" letter-spacing="-1.5" fill="${c.ink}">Juan del Mazo Vázquez</text>
<text class="serif" x="82" y="440" font-size="44" font-style="italic" fill="${c.accent}">${t.tag}</text>
<line x1="80" x2="1120" y1="508" y2="508" stroke="${p.line}" stroke-width="1.5"/>
<text class="mono" x="80" y="558" font-size="21" fill="${c.muted}">${t.role}</text>
<text class="mono" x="1120" y="558" font-size="21" fill="${c.muted}" text-anchor="end">juandelmazovazquez.vercel.app</text>`,
  );
};
files['og-en.svg'] = og('en');
files['og-es.svg'] = og('es');

// Profile photos cover the lower-left corner on LinkedIn and X: the motif sits in the
// upper middle and the text is right-aligned, both clear of that area.
files['linkedin-banner.svg'] = svg(
  1584,
  396,
  `<rect width="1584" height="396" fill="${dark.bg}"/>
${motif({ cols: 9, rows: 5, gap: 52, x: 400, y: 70, route: [[0, 4], [2, 4], [2, 2], [5, 2]], chosen: [[5, 2], [5, 0], [8, 0]], alt: [[5, 2], [5, 4], [7, 4]], colors: dark })}
<text class="serif" x="1500" y="164" font-size="60" font-weight="500" letter-spacing="-0.8" fill="${dark.ink}" text-anchor="end">Analyst by profession,</text>
<text class="serif" x="1500" y="234" font-size="60" font-style="italic" fill="${dark.accent}" text-anchor="end">engineer by training.</text>
<text class="mono" x="1500" y="300" font-size="22" fill="${dark.muted}" text-anchor="end">Data · Business · Software</text>`,
);

files['x-banner.svg'] = svg(
  1500,
  500,
  `<rect width="1500" height="500" fill="${dark.bg}"/>
${motif({ cols: 8, rows: 6, gap: 56, x: 380, y: 80, route: [[0, 5], [2, 5], [2, 3], [4, 3]], chosen: [[4, 3], [4, 1], [7, 1]], alt: [[4, 3], [4, 5], [6, 5]], colors: dark })}
<text class="serif" x="1420" y="212" font-size="62" font-weight="500" letter-spacing="-0.8" fill="${dark.ink}" text-anchor="end">Analyst by profession,</text>
<text class="serif" x="1420" y="284" font-size="62" font-style="italic" fill="${dark.accent}" text-anchor="end">engineer by training.</text>
<text class="mono" x="1420" y="352" font-size="22" fill="${dark.muted}" text-anchor="end">Data · Business · Software</text>`,
);

const ghHeader = (c, mode) =>
  svg(
    1280,
    300,
    `<rect width="1280" height="300" rx="16" fill="${c.bg}"/>
${markGroup({ x: 64, y: 64, size: 56, ...(mode === 'dark' ? { bg: p.mint, fg: p.night, node: p.clay } : {}) })}
<text class="serif" x="64" y="186" font-size="58" font-weight="500" letter-spacing="-1" fill="${c.ink}">Juan del Mazo Vázquez</text>
<text class="serif" x="66" y="238" font-size="32" font-style="italic" fill="${c.accent}">Analyst by profession, engineer by training.</text>
${motif({ cols: 8, rows: 4, gap: 50, x: 860, y: 70, route: [[0, 3], [2, 3], [2, 1], [4, 1]], chosen: [[4, 1], [4, 0], [7, 0]], alt: [[4, 1], [4, 3], [6, 3]], colors: c })}`,
  );
files['github-header-light.svg'] = ghHeader(light, 'light');
files['github-header-dark.svg'] = ghHeader(dark, 'dark');

for (const [name, body] of Object.entries(files)) writeFileSync(new URL(`./${name}`, import.meta.url), body);
console.log(`Brand SVGs: ${Object.keys(files).join(', ')}`);
