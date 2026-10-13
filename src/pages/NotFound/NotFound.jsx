import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useTranslation } from '../../Context/LanguageContext';
import './NotFound.scss';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */
const ORB_COLOR = '#FFC08F'; // keep in sync with --orb (same as Home)
const ACCENT = '#F2440F';    // keep in sync with --ac  (same as Home)

// Fallback copy. To translate, add these keys to your locale files
// (nf_pill, nf_line1, nf_line2, nf_text, nf_home, nf_back, nf_try, nf_requested,
//  nf_link_services, nf_link_products, nf_link_work, nf_link_about, nf_link_contact).
const FALLBACK = {
  nf_pill: 'Error 404',
  nf_line1: 'Page not',
  nf_line2: 'found.',
  nf_text: 'The page you are looking for does not exist, was moved, or the link is incorrect. Let us get you back on track.',
  nf_home: 'Back to home',
  nf_back: 'Go back',
  nf_try: 'Or try one of these',
  nf_requested: 'Requested',
  nf_link_services: 'Services',
  nf_link_products: 'Products',
  nf_link_work: 'Work',
  nf_link_about: 'About',
  nf_link_contact: 'Contact',
};

const QUICK_LINKS = [
  { to: '/service', key: 'nf_link_services' },
  { to: '/products', key: 'nf_link_products' },
  { to: '/work', key: 'nf_link_work' },
  { to: '/about', key: 'nf_link_about' },
  { to: '/contact', key: 'nf_link_contact' },
];

/* Small shared bits (same arrow as Home) ----------------------------- */
const Arrow = ({ size = 16 }) => (
  <svg className="rtl-flip" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* Orb helpers (same particle sphere as the Home hero) ---------------- */
const hex = (h) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(h || '');
  const n = m ? parseInt(m[1], 16) : 0xf2440f;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const makePoints = () => {
  const pts = [];
  const N = 1800;
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = ga * i;
    const kind = Math.random();
    let r;
    if (kind < 0.7) r = 1 + (Math.random() - 0.5) * 0.05;
    else if (kind < 0.85) r = 0.35 + Math.random() * 0.6;
    else r = 1.06 + Math.pow(Math.random(), 2) * 0.42;
    pts.push({ x: Math.cos(th) * rad, y, z: Math.sin(th) * rad, r, s: Math.random() * 100, k: kind });
  }
  return pts;
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function NotFound() {
  const t = useTranslation() || {};
  const tr = (key) => t[key] || FALLBACK[key];
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const orbRef = useRef(null);

  // Tab title + keep the 404 out of search indexes
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `404 | ${tr('nf_line1')} ${tr('nf_line2')}`;
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Go back if there is history to go back to, otherwise home
  const goBack = () => (window.history.state && window.history.state.idx > 0 ? navigate(-1) : navigate('/'));

  /* Hero orb (canvas particle sphere) -------------------------------- */
  useEffect(() => {
    const c = orbRef.current;
    if (!c) return undefined;
    const still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const t0 = performance.now();
    const pts = makePoints();
    const col = hex(ORB_COLOR);
    const sk = hex(ACCENT);
    const [cr, cg, cb] = col;
    const lr = Math.round(cr + (255 - cr) * 0.86);
    const lg = Math.round(cg + (255 - cg) * 0.86);
    const lb = Math.round(cb + (255 - cb) * 0.84);
    let mx = 0, my = 0, tx = 0, ty = 0, raf;

    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    };
    window.addEventListener('pointermove', onMove);

    const draw = () => {
      const rect = c.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = Math.round(rect.width * dpr);
      const H = Math.round(rect.height * dpr);
      if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
      const ctx = c.getContext('2d');
      const t = (performance.now() - t0) / 1000;
      let intro = still ? 1 : Math.min(1, t / 2.2);
      intro = 1 - Math.pow(1 - intro, 3);
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;

      const cx = W / 2, cy = H / 2;
      const R = Math.min(W, H) * 0.3 * (0.55 + 0.45 * intro);
      const ay = t * 0.22 + mx * 0.6;
      const ax = 0.28 + my * 0.35;
      const ca = Math.cos(ay), sa = Math.sin(ay), cx2 = Math.cos(ax), sx2 = Math.sin(ax);

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < pts.length; i++) {
        const q = pts[i];
        let rr = q.r * (1 + Math.sin(t * 1.3 + q.s) * 0.014);
        if (q.k >= 0.85) rr = 1 + (rr - 1) * intro + Math.sin(t * 0.6 + q.s) * 0.02;
        const x = q.x * rr, y = q.y * rr, z = q.z * rr;
        const X = x * ca - z * sa, Z = x * sa + z * ca;
        const Y = y * cx2 - Z * sx2, Z2 = y * sx2 + Z * cx2;
        const per = 1 / (1 - Z2 * 0.24);
        const px = cx + X * R * per, py = cy + Y * R * per;
        const front = (Z2 / Math.max(rr, 1) + 1) / 2;
        const tw = 0.75 + 0.25 * Math.sin(t * 2.1 + q.s * 3);
        const size = (0.5 + front * 1.5) * dpr * (q.k >= 0.85 ? 1.15 : 1);
        const alpha = (0.1 + front * 0.82) * tw * intro * (q.k >= 0.7 && q.k < 0.85 ? 0.45 : 1);
        if (front > 0.66) ctx.fillStyle = `rgba(${lr},${lg},${lb},${alpha.toFixed(3)})`;
        else ctx.fillStyle = `rgba(${cr},${cg},${cb},${(alpha * 0.85).toFixed(3)})`;
        if (i % 9 === 0) ctx.fillStyle = `rgba(${sk[0]},${sk[1]},${sk[2]},${Math.min(1, alpha * 1.15).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(px, py, size, 0, 6.2832); ctx.fill();
      }

      for (let k = 0; k < 150; k++) {
        const a = k * 0.71 + t * (0.3 + (k % 5) * 0.014);
        const rd = R * (1.2 + (k % 11) * 0.016);
        const ox = Math.cos(a) * rd, oz = Math.sin(a) * rd, oy = Math.sin(a * 2 + k) * R * 0.02;
        const tilt = 0.36 + my * 0.2;
        const sy = oy * Math.cos(tilt) - oz * Math.sin(tilt);
        const sz = oy * Math.sin(tilt) + oz * Math.cos(tilt);
        const f = (sz / rd + 1) / 2;
        ctx.fillStyle = `rgba(${lr},${lg},${lb},${((0.1 + f * 0.5) * intro).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(cx + ox + mx * 6 * dpr, cy + sy, (0.5 + f * 1.1) * dpr, 0, 6.2832); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = () => { draw(); if (!still) raf = requestAnimationFrame(loop); };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  /* ---------------------------------------------------------------- */
  return (
    <main className="notfound">
      <section className="nf-hero">
        <div className="nf-hero__grid-lines" aria-hidden="true" />
        <div className="nf-hero__frame" aria-hidden="true" />

        <div className="nf-wrap">
          <div className="nf-grid">
            <div className="nf-copy">
              <div className="nf-pill nf-up"><span className="nf-dot" />{tr('nf_pill')}</div>
              <h1 className="nf-up">
                <span className="nf-nw">{tr('nf_line1')}</span><br />
                <span className="nf-ac nf-nw">{tr('nf_line2')}</span>
              </h1>
              <p className="nf-up">{tr('nf_text')}</p>
              <div className="nf-requested nf-up" dir="ltr">
                <span>{tr('nf_requested')}</span>
                <code>{pathname}{search}</code>
              </div>
              <div className="nf-actions nf-up">
                <Link to="/" className="nf-btn nf-btn--ac">{tr('nf_home')} <Arrow size={15} /></Link>
                <button type="button" className="nf-btn nf-btn--ghost" onClick={goBack}>{tr('nf_back')}</button>
              </div>
            </div>

            <div className="nf-orb nf-fadein">
              <div className="nf-orb__glow nf-breathe" aria-hidden="true" />
              <canvas ref={orbRef} aria-hidden="true" />
              <div className="nf-orb__num" aria-hidden="true" dir="ltr">404</div>
            </div>
          </div>

          <nav className="nf-links nf-up" aria-label={tr('nf_try')}>
            <span className="nf-links__label">{tr('nf_try')}</span>
            {QUICK_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="nf-links__item">{tr(l.key)}</Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}