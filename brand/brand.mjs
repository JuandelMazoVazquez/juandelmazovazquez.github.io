// Brand primitives shared by the site build and the brand asset generator.
import { readFileSync } from 'node:fs';

const glyphs = JSON.parse(readFileSync(new URL('./src/monogram-glyphs.json', import.meta.url), 'utf8'));

export const palette = {
  paper: '#f6f4ef',
  surface: '#fffdf8',
  ink: '#16181b',
  muted: '#5b5f66',
  line: '#dcd7cc',
  green: '#1f5d50',
  clay: '#b0532a',
  night: '#101214',
  nightSurface: '#171a1d',
  nightInk: '#ebe8e1',
  nightMuted: '#9da2a8',
  nightLine: '#2b3035',
  mint: '#7cc3ac',
  clayLight: '#e08b60',
};

const f = (n) => (Math.round(n * 10) / 10).toString();

// Letter offsets in font units (2000 upm): J and d overlap a little, as in a hand-set italic.
const LETTERS = [
  ['J', 0],
  ['d', -170],
  ['M', -60],
];

// Bounding box of an absolute path (M, L, H, V, Q, C, Z), control points included.
function bbox(d) {
  const xs = [];
  const ys = [];
  let x = 0;
  let y = 0;
  for (const [, cmd, args] of d.matchAll(/([MLHVQCZ])([^MLHVQCZ]*)/g)) {
    const n = (args.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
    if (cmd === 'H') n.forEach((v) => xs.push((x = v)) && ys.push(y));
    else if (cmd === 'V') n.forEach((v) => ys.push((y = v)) && xs.push(x));
    else for (let i = 0; i + 1 < n.length; i += 2) xs.push((x = n[i])), ys.push((y = n[i + 1]));
  }
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}

function monogramLayout() {
  let x = 0;
  const parts = [];
  for (const [ch, kern] of LETTERS) {
    x += kern;
    const g = glyphs.glyphs[ch];
    const [x0, y0, x1, y1] = bbox(g.d);
    parts.push({ d: g.d, x, box: [x + x0, y0, x + x1, y1] });
    x += g.adv;
  }
  const box = [
    Math.min(...parts.map((p) => p.box[0])),
    Math.min(...parts.map((p) => p.box[1])),
    Math.max(...parts.map((p) => p.box[2])),
    Math.max(...parts.map((p) => p.box[3])),
  ];
  return { parts, box };
}

// "JdM" letters as paths, scaled to `width` and centred on (cx, cy).
export function monogramLetters({ cx, cy, width, fill }) {
  const { parts, box } = monogramLayout();
  const s = width / (box[2] - box[0]);
  const tx = cx - ((box[0] + box[2]) / 2) * s;
  const ty = cy - ((box[1] + box[3]) / 2) * s;
  const paths = parts.map((p) => `<path transform="translate(${f(p.x)} 0)" d="${p.d}"/>`).join('');
  return `<g fill="${fill}" transform="translate(${f(tx)} ${f(ty)}) scale(${s.toFixed(5)})">${paths}</g>`;
}

// The mark: a rounded tile with the monogram and the clay "decision" node.
export function markGroup({ x = 0, y = 0, size = 64, bg = palette.green, fg = palette.paper, node = palette.clayLight, withNode = true, radius = 0.2 }) {
  const r = size * radius;
  const k = size / 64;
  // Without the node (favicon) the letters take the whole tile so they stay legible at 16 px.
  const width = withNode ? 0.74 : 0.86;
  return `<g transform="translate(${f(x)} ${f(y)})">
  <rect width="${f(size)}" height="${f(size)}" rx="${f(r)}" fill="${bg}"/>
  ${monogramLetters({ cx: size * (withNode ? 0.48 : 0.5), cy: size * 0.5, width: size * width, fill: fg })}
  ${withNode ? `<circle cx="${f(52 * k)}" cy="${f(51 * k)}" r="${f(3.6 * k)}" fill="${node}"/>` : ''}
</g>`;
}

export function markSvg({ size = 64, withNode = true, radius = 0.2 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${markGroup({ size, withNode, radius })}</svg>\n`;
}

function roundedPath(pts, r) {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[i + 1];
    const l1 = Math.hypot(cx - px, cy - py);
    const l2 = Math.hypot(nx - cx, ny - cy);
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const ax = cx + ((px - cx) / l1) * rr;
    const ay = cy + ((py - cy) / l1) * rr;
    const bx = cx + ((nx - cx) / l2) * rr;
    const by = cy + ((ny - cy) / l2) * rr;
    d += ` L${f(ax)} ${f(ay)} Q${f(cx)} ${f(cy)} ${f(bx)} ${f(by)}`;
  }
  const last = pts[pts.length - 1];
  return `${d} L${f(last[0])} ${f(last[1])}`;
}

function gridPointsAlong(route) {
  const out = [];
  for (let i = 1; i < route.length; i++) {
    const [ax, ay] = route[i - 1];
    const [bx, by] = route[i];
    const steps = Math.max(Math.abs(bx - ax), Math.abs(by - ay));
    for (let s = i === 1 ? 1 : 0; s < steps; s++) out.push([ax + ((bx - ax) * s) / steps, ay + ((by - ay) * s) / steps]);
  }
  return out;
}

// Motif: a grid of data points, a route that reaches a decision (diamond), takes one branch
// to a node (the outcome) and leaves the other as a dashed option not taken.
// Grid coordinates are integers; `colors` holds explicit fills, or `classes` lets CSS theme it.
export function motif({ cols, rows, gap, x = 0, y = 0, route, chosen, alt, colors, classes = false, animate = false }) {
  const P = ([c, r]) => [x + c * gap, y + r * gap];
  const attr = (role, fallback) => (classes ? `class="m-${role}"` : fallback);
  const c = colors ?? {};
  const branch = route[route.length - 1];
  const main = [...route, ...chosen.slice(1)];
  const onMain = new Set(gridPointsAlong(main).map(([a, b]) => `${a},${b}`));
  const end = main[main.length - 1];
  const altEnd = alt[alt.length - 1];
  const skip = new Set([...onMain, `${branch[0]},${branch[1]}`, `${end[0]},${end[1]}`, `${main[0][0]},${main[0][1]}`, `${altEnd[0]},${altEnd[1]}`]);

  const dots = [];
  for (let r = 0; r < rows; r++)
    for (let col = 0; col < cols; col++) {
      if (skip.has(`${col},${r}`)) continue;
      const [px, py] = P([col, r]);
      dots.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(gap * 0.055)}"/>`);
    }
  const hot = [...onMain]
    .map((k) => k.split(',').map(Number))
    .filter(([a, b]) => !(a === main[0][0] && b === main[0][1]))
    .map((p) => {
      const [px, py] = P(p);
      return `<circle cx="${f(px)}" cy="${f(py)}" r="${f(gap * 0.085)}"/>`;
    });
  const [sx, sy] = P(main[0]);
  const [bx, by] = P(branch);
  const [ex, ey] = P(end);
  const [ax, ay] = P(altEnd);
  const dm = gap * 0.17;
  const sw = Math.max(1.5, gap * 0.05);
  const anim = animate ? ' pathLength="1"' : '';

  return `<g ${attr('dots', `fill="${c.dot}"`)}>${dots.join('')}</g>
<path ${attr('alt', `stroke="${c.alt}"`)} fill="none" stroke-width="${f(sw * 0.8)}" stroke-linecap="round" stroke-dasharray="${f(sw * 0.4)} ${f(sw * 2.4)}" d="${roundedPath(alt.map(P), gap * 0.4)}"/>
<circle ${attr('alt-end', `stroke="${c.alt}" fill="${c.bg}"`)} cx="${f(ax)}" cy="${f(ay)}" r="${f(gap * 0.1)}" stroke-width="${f(sw * 0.8)}"/>
<path ${attr('path', `stroke="${c.path}"`)} fill="none" stroke-width="${f(sw)}" stroke-linecap="round" stroke-linejoin="round" d="${roundedPath(main.map(P), gap * 0.4)}"${anim}/>
<g ${attr('hot', `fill="${c.path}"`)}>${hot.join('')}</g>
<circle ${attr('start', `fill="${c.path}"`)} cx="${f(sx)}" cy="${f(sy)}" r="${f(gap * 0.11)}"/>
<path ${attr('diamond', `fill="${c.bg}" stroke="${c.path}"`)} stroke-width="${f(sw)}" stroke-linejoin="round" d="M${f(bx)} ${f(by - dm)} L${f(bx + dm)} ${f(by)} L${f(bx)} ${f(by + dm)} L${f(bx - dm)} ${f(by)} Z"/>
<circle ${attr('ring', `fill="${c.node}"`)} cx="${f(ex)}" cy="${f(ey)}" r="${f(gap * 0.32)}" opacity="0.18"/>
<circle ${attr('node', `fill="${c.node}"`)} cx="${f(ex)}" cy="${f(ey)}" r="${f(gap * 0.15)}"/>`;
}

// Layout used on the site hero and the brand sheet.
export const heroMotif = {
  cols: 9,
  rows: 6,
  route: [[0, 4], [2, 4], [2, 2], [5, 2]],
  chosen: [[5, 2], [5, 1], [8, 1]],
  alt: [[5, 2], [5, 4], [7, 4]],
};
