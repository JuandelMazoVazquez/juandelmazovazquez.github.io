// Exports the brand SVGs to PNG with Playwright's Chromium and copies the web assets to public/.
// Playwright is not a dependency of this repo; point NODE_PATH at any node_modules that has it:
//   node brand/build-brand.mjs && NODE_PATH=/path/to/node_modules node brand/export.cjs
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const types = { '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.html': 'text/html' };

// [source svg, output png, width, height]. Icons go through an <img> to be scaled;
// SVGs with text are opened directly so they can load the web font.
const direct = [
  ['og-en.svg', 'og-en.png', 1200, 630],
  ['og-es.svg', 'og-es.png', 1200, 630],
  ['linkedin-banner.svg', 'linkedin-banner.png', 1584, 396],
  ['x-banner.svg', 'x-banner.png', 1500, 500],
  ['github-header-light.svg', 'github-header-light.png', 1280, 300],
  ['github-header-dark.svg', 'github-header-dark.png', 1280, 300],
  ['motif.svg', 'motif.png', 640, 440],
];
const icons = [
  ['monogram.svg', 'monogram-512.png', 512],
  ['favicon.svg', 'favicon-32.png', 32],
  ['apple-touch-icon.svg', 'apple-touch-icon.png', 180],
];

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/__icon') {
    const size = Number(url.searchParams.get('size'));
    const src = encodeURI(url.searchParams.get('src'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!doctype html><style>html,body{margin:0;background:transparent}</style><img src="/brand/${src}" width="${size}" height="${size}">`);
    return;
  }
  const file = path.join(ROOT, decodeURIComponent(url.pathname));
  if (!file.startsWith(ROOT) || !fs.existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const out = path.join(ROOT, 'brand', 'png');
  fs.mkdirSync(out, { recursive: true });

  for (const [src, png, w, h] of direct) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto(`${base}/brand/${src}`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(out, png), omitBackground: true });
  }
  for (const [src, png, size] of icons) {
    await page.setViewportSize({ width: size, height: size });
    await page.goto(`${base}/__icon?src=${encodeURIComponent(src)}&size=${size}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(out, png), omitBackground: true });
  }
  await browser.close();
  server.close();

  const pub = path.join(ROOT, 'public');
  for (const f of ['og-en.png', 'og-es.png', 'favicon-32.png', 'apple-touch-icon.png']) fs.copyFileSync(path.join(out, f), path.join(pub, f));
  fs.copyFileSync(path.join(ROOT, 'brand', 'favicon.svg'), path.join(pub, 'favicon.svg'));
  console.log(`PNGs in brand/png/ and web assets copied to public/`);
})();
