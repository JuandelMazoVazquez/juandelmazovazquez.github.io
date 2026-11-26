import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { content, contact, SITE_URL } from './src/content.mjs';

const OUT = 'dist';
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Deterministic pseudo-random walk so the hero chart is identical on every build.
function leadLagPaths() {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) - 0.5;
  const n = 64;
  const lag = 6;
  const lead = [];
  let v = 0;
  for (let i = 0; i < n + lag; i++) lead.push((v += rand() * 2.2 + 0.04));
  const lagged = lead.map((_, i) => (i < lag ? lead[0] : lead[i - lag] + rand() * 0.5 - 0.6));
  const all = [...lead, ...lagged];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const W = 600;
  const H = 220;
  const toPath = (arr) =>
    arr
      .slice(lag)
      .map((y, i) => `${i ? 'L' : 'M'}${((i / (n - 1)) * W).toFixed(1)} ${(H - 12 - ((y - min) / (max - min)) * (H - 24)).toFixed(1)}`)
      .join(' ');
  return { a: toPath(lead), b: toPath(lagged), W, H };
}

const icons = {
  github:
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>',
  arrow: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M4.5 11.5l7-7M6 4.5h5.5V10"/></svg>',
  download: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M8 2v8.5M4.5 7.2 8 10.7l3.5-3.5M3 13.5h10"/></svg>',
  sun: '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',
  moon: '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
};

function personJsonLd(c) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Juan del Mazo Vázquez',
    url: SITE_URL + c.path,
    jobTitle: 'Junior Business Analyst',
    worksFor: { '@type': 'Organization', name: 'Bankinter' },
    address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Universidad Carlos III de Madrid' },
      { '@type': 'CollegeOrUniversity', name: 'Universidad Politécnica de Madrid' },
      { '@type': 'CollegeOrUniversity', name: 'University of Bristol' },
    ],
    email: 'mailto:' + contact.email,
    sameAs: [contact.linkedin, contact.github],
    knowsLanguage: ['es', 'en'],
  });
}

function page(c, other) {
  const { a, b, W, H } = leadLagPaths();
  const cvSelf = `/cv/juan-del-mazo-cv-${c.lang}.pdf`;
  const cvOther = `/cv/juan-del-mazo-cv-${other.lang}.pdf`;
  const navItems = Object.entries(c.nav)
    .map(([id, label]) => `<li><a href="#${id}">${esc(label)}</a></li>`)
    .join('');

  const experience = c.experience.items
    .map(
      (e) => `
        <li class="tl-item${e.end ? '' : ' is-current'}">
          <div class="tl-when"><span>${esc(e.start)}</span> <span>–</span> <span>${esc(e.end ?? c.ui.present)}</span></div>
          <div class="tl-body">
            <h3>${esc(e.role)} <span class="at">· ${esc(e.org)}</span></h3>
            <p class="tl-place">${esc(e.place)}</p>
            <ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
          </div>
        </li>`,
    )
    .join('');

  const projects = c.projects.items
    .map(
      (p, i) => `
        <article class="card${i < 2 ? ' card-feature' : ''}">
          <p class="card-tag">${esc(p.tag)}</p>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.body)}</p>
          <ul class="chips" aria-label="Stack">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
          <p class="card-links">
            ${p.repo ? `<a href="${p.repo}" rel="noopener" aria-label="${esc(c.ui.code)}: ${esc(p.title)}">${icons.github}<span>${esc(c.ui.code)}</span></a>` : `<span class="muted">${esc(c.ui.private)}</span>`}
            ${p.demo ? `<a href="${p.demo}" rel="noopener" aria-label="${esc(c.ui.demo)}: ${esc(p.title)}">${icons.arrow}<span>${esc(c.ui.demo)}</span></a> <span class="muted small">${esc(p.demoNote)}</span>` : ''}
          </p>
        </article>`,
    )
    .join('');

  const education = c.education.items
    .map(
      (e) => `
        <li>
          <p class="edu-years">${esc(e.years)}</p>
          <h3>${esc(e.title)}</h3>
          <p class="edu-org">${esc(e.org)}</p>
          <p class="muted">${esc(e.note)}</p>
        </li>`,
    )
    .join('');

  const awards = c.education.awards
    .map(([t, u, y]) => `<li><span>${esc(t)}</span> <span class="muted">${esc(u)} · ${esc(y)}</span></li>`)
    .join('');

  const stack = c.stack.groups
    .map(([g, items]) => `<div class="stack-row"><h3>${esc(g)}</h3><ul class="chips">${items.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>`)
    .join('');

  const url = SITE_URL + c.path;
  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.title)}</title>
<meta name="description" content="${esc(c.description)}">
<meta name="author" content="Juan del Mazo Vázquez">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${SITE_URL}/">
<link rel="alternate" hreflang="es" href="${SITE_URL}/es/">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
<meta property="og:type" content="profile">
<meta property="og:title" content="${esc(c.title)}">
<meta property="og:description" content="${esc(c.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Juan del Mazo Vázquez">
<meta property="og:locale" content="${c.locale}">
<meta property="og:locale:alternate" content="${other.locale}">
<meta property="profile:first_name" content="Juan">
<meta property="profile:last_name" content="del Mazo Vázquez">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f6f4ef" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#101214" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/newsreader.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css">
<script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<script type="application/ld+json">${personJsonLd(c)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(c.ui.skip)}</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="monogram" href="${c.path}" aria-label="Juan del Mazo Vázquez">JdM</a>
    <nav aria-label="${c.lang === 'es' ? 'Principal' : 'Main'}"><ul>${navItems}</ul></nav>
    <div class="header-actions">
      <a class="lang" href="${other.path}" hreflang="${other.lang}" lang="${other.lang}" aria-label="${esc(c.ui.langSwitchLabel)}">${other.lang.toUpperCase()}</a>
      <button class="theme-toggle" type="button" aria-label="${esc(c.ui.theme)}">${icons.sun}${icons.moon}</button>
    </div>
  </div>
</header>

<main id="main">
  <section class="hero wrap" aria-labelledby="hero-title">
    <div class="hero-text">
      <p class="kicker"><span class="dot" aria-hidden="true"></span>${esc(c.hero.kicker)}</p>
      <h1 id="hero-title"><span class="name">Juan del Mazo Vázquez</span> <span class="lead">${esc(c.hero.lead[0])} <em>${esc(c.hero.lead[1])}</em></span></h1>
      <p class="value">${esc(c.hero.value)}</p>
      <p class="hero-actions">
        <a class="btn btn-primary" href="${cvSelf}" download>${icons.download}<span>${esc(c.ui.cv)}</span></a>
        <a class="btn" href="#projects">${esc(c.nav.projects)}</a>
        <a class="text-link" href="${cvOther}" download hreflang="${other.lang}">${esc(c.ui.cvOther)} (PDF)</a>
      </p>
    </div>
    <figure class="hero-chart">
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(c.hero.chart)}">
        <g class="grid">${[1, 2, 3].map((k) => `<line x1="0" x2="${W}" y1="${(H / 4) * k}" y2="${(H / 4) * k}"/>`).join('')}</g>
        <path class="series series-a" d="${a}" pathLength="1"/>
        <path class="series series-b" d="${b}" pathLength="1"/>
      </svg>
      <figcaption><span class="key key-a">lead</span> <span class="key key-b">lag</span> <span class="muted">t → t + 6</span></figcaption>
    </figure>
  </section>

  <section id="about" class="section wrap" aria-labelledby="about-h">
    <h2 id="about-h"><span class="num" aria-hidden="true">01</span>${esc(c.about.heading)}</h2>
    <div class="prose">${c.about.body.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
  </section>

  <section id="experience" class="section wrap" aria-labelledby="exp-h">
    <h2 id="exp-h"><span class="num" aria-hidden="true">02</span>${esc(c.experience.heading)}</h2>
    <ol class="timeline">${experience}</ol>
  </section>

  <section id="projects" class="section wrap" aria-labelledby="proj-h">
    <h2 id="proj-h"><span class="num" aria-hidden="true">03</span>${esc(c.projects.heading)}</h2>
    <p class="section-intro">${esc(c.projects.intro)}</p>
    <div class="cards">${projects}</div>
  </section>

  <section id="education" class="section wrap" aria-labelledby="edu-h">
    <h2 id="edu-h"><span class="num" aria-hidden="true">04</span>${esc(c.education.heading)}</h2>
    <ol class="edu">${education}</ol>
    <div class="edu-extra">
      <div>
        <h3>${esc(c.ui.awards)}</h3>
        <p class="muted">${esc(c.education.awardsIntro)}</p>
        <ul class="awards">${awards}</ul>
      </div>
      <div>
        <h3>${esc(c.education.otherHeading)}</h3>
        <ul class="plain">${c.education.other.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
      </div>
    </div>
  </section>

  <section id="stack" class="section wrap" aria-labelledby="stack-h">
    <h2 id="stack-h"><span class="num" aria-hidden="true">05</span>${esc(c.stack.heading)}</h2>
    <div class="stack">${stack}
      <div class="stack-row"><h3>${esc(c.stack.areasHeading)}</h3><p>${c.stack.areas.map(esc).join(' · ')}</p></div>
      <div class="stack-row"><h3>${esc(c.stack.languagesHeading)}</h3><p>${esc(c.stack.languages)}</p></div>
    </div>
  </section>

  <section id="contact" class="section wrap" aria-labelledby="contact-h">
    <h2 id="contact-h"><span class="num" aria-hidden="true">06</span>${esc(c.contactSection.heading)}</h2>
    <p class="section-intro">${esc(c.contactSection.body)}</p>
    <dl class="contact">
      <div><dt>${esc(c.contactSection.email)}</dt><dd><a href="mailto:${contact.email}">${contact.email}</a></dd></div>
      <div><dt>${esc(c.contactSection.phone)}</dt><dd><a href="${contact.phoneHref}">${esc(contact.phone)}</a></dd></div>
      <div><dt>${esc(c.contactSection.linkedin)}</dt><dd><a href="${contact.linkedin}" rel="me noopener">in/juan-del-mazo</a></dd></div>
      <div><dt>${esc(c.contactSection.github)}</dt><dd><a href="${contact.github}" rel="me noopener">JuandelMazoVazquez</a></dd></div>
    </dl>
    <p class="hero-actions"><a class="btn btn-primary" href="${cvSelf}" download>${icons.download}<span>${esc(c.ui.cv)}</span></a></p>
  </section>
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>© ${BUILD_DATE.slice(0, 4)} Juan del Mazo Vázquez · ${esc(c.ui.footer)}</p>
    <p><a href="${contact.github}/juandelmazovazquez.github.io" rel="noopener">${esc(c.ui.code)}</a></p>
  </div>
</footer>
<script src="/main.js" defer></script>
</body>
</html>
`;
}

function notFound() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Not found · Juan del Mazo Vázquez</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<main id="main" class="wrap notfound">
  <p class="kicker">404</p>
  <h1>This page does not exist.<br><em>Esta página no existe.</em></h1>
  <p><a class="btn btn-primary" href="/">Home</a> <a class="btn" href="/es/">Inicio</a></p>
</main>
</body>
</html>
`;
}

function sitemap() {
  const urls = ['/', '/es/']
    .map(
      (p) => `  <url>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}/es/"/>
  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

mkdirSync(OUT, { recursive: true });
for (const entry of readdirSync(OUT)) rmSync(`${OUT}/${entry}`, { recursive: true, force: true });
mkdirSync(`${OUT}/es`, { recursive: true });
cpSync('public', OUT, { recursive: true });
mkdirSync(`${OUT}/cv`, { recursive: true });
cpSync('cv/cv-en.pdf', `${OUT}/cv/juan-del-mazo-cv-en.pdf`);
cpSync('cv/cv-es.pdf', `${OUT}/cv/juan-del-mazo-cv-es.pdf`);
writeFileSync(`${OUT}/index.html`, page(content.en, content.es));
writeFileSync(`${OUT}/es/index.html`, page(content.es, content.en));
writeFileSync(`${OUT}/404.html`, notFound());
writeFileSync(`${OUT}/sitemap.xml`, sitemap());
writeFileSync(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
writeFileSync(`${OUT}/.nojekyll`, '');
console.log(`Built ${OUT}/ (${BUILD_DATE})`);
