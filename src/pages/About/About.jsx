import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, useTranslation } from '../../Context/LanguageContext';
import './About.scss';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
// Index = pin order on the map. Country / city / address text lives in
// the locale files (about_offices, same order).
const OFFICES = [
    { key: 'singapore', hq: true, x: 61.68, y: 52.7, side: 'left' },
    { key: 'bangalore', x: 48.82, y: 41.86, side: 'left' },
    { key: 'dubai', x: 37.88, y: 34.19, side: 'right' },
    { key: 'sydney', x: 84.91, y: 95.2, side: 'right' },
];
const CARD_ORDER = [0, 2, 3, 1]; // Singapore, Dubai, Sydney, Bangalore

// Labels live in the locale files (about_stats, same order)
const STATS = [
    { target: 15, offset: true },
    { target: 20, offset: false },
    { target: 80, offset: true },
];

// Title / text live in the locale files (about_values_items, same order)
const VALUES = [
    {
        a: '#FF6B35',
        icon: (<><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M12 21v-1" /><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" /></>),
    },
    {
        a: '#2DD4BF',
        icon: (<><path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" /><circle cx="10" cy="8" r="3.2" /><path d="M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.38M15 4.92a3.2 3.2 0 0 1 0 6.16" /></>),
    },
    {
        a: '#A855F7',
        icon: (<path d="M12 3.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.65l5.9-.85z" />),
    },
    {
        a: '#38BDF8',
        icon: (<><path d="M5 19c0-8 5-13 14-14 0 9-4 14-11 14-1.2 0-2.2-.2-3-.6" /><path d="M5 19c2-4 5-7 9-9" /></>),
    },
];

const Arrow = ({ size = 16 }) => (
    <svg className="rtl-flip" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

/* ------------------------------------------------------------------ */
export default function About() {
    const t = useTranslation();
    const { isRTL } = useLanguage();
    const offices = t.about_offices;
    const statLabels = t.about_stats;
    const values = t.about_values_items;
    const panels = t.about_why_panels;
    const statsRef = useRef(null);
    const [p, setP] = useState(1);         // stats count-up progress
    const [loc, setLoc] = useState(0);     // highlighted office
    const [panel, setPanel] = useState(2); // open "Why ASZ" panel
    const [picked, setPicked] = useState(null); // office chosen by clicking a map pin
    const [tick, setTick] = useState(0);        // bumps on every pin click so the flash replays
    const cardRefs = useRef([]);

    /* Map pin click: scroll to that office card and highlight it */
    const pickOffice = (i) => {
        setLoc(i);
        setPicked(i);
        setTick((n) => n + 1);
        const el = cardRefs.current[i];
        if (!el) return;
        const still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        el.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'center' });
        el.focus({ preventScroll: true });
    };

    // Hovering / focusing a different card means the reader is browsing again, so drop the pinned highlight
    const hoverCard = (i) => {
        setLoc(i);
        setPicked((p) => (p === i ? p : null));
    };

    /* Stats: count up once when scrolled into view */
    useEffect(() => {
        const still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        const el = statsRef.current;
        if (still || !el || !('IntersectionObserver' in window)) return undefined;

        let raf;
        const start = () => {
            const t0 = performance.now();
            let last = 0;
            setP(0);
            const tick = () => {
                const now = performance.now();
                const k = Math.min(1, (now - t0) / 2000);
                if (now - last > 30 || k === 1) { last = now; setP(1 - Math.pow(1 - k, 3)); }
                if (k < 1) raf = requestAnimationFrame(tick);
            };
            tick();
        };
        const io = new IntersectionObserver((es) => {
            if (es.some((e) => e.isIntersecting)) { start(); io.disconnect(); }
        }, { threshold: 0.3 });
        io.observe(el);
        return () => { io.disconnect(); cancelAnimationFrame(raf); };
    }, []);

    return (
        <main className="about">
            {/* 1 HERO with map + 2 LOCATIONS */}
            <section id="top" className="a-hero">
                <div className="a-hero__frame" aria-hidden="true" />

                <div className="wrap a-hero__wrap">
                    <div className="pill up"><span className="live dot" />{t.about_hero_pill}</div>
                    <h1 className="up">
                        <span>{t.about_hero_line1}</span><br />
                        <span className="ac">{t.about_hero_line2}</span>
                    </h1>
                    <p className="up">{t.about_hero_text}</p>
                    <div className="a-hero__cta up">
                        <Link className="btn btn-ac" to="/service">{t.about_hero_cta} <Arrow /></Link>
                    </div>
                </div>

                <div className="maphold up">
                    <div className="maphold__mask" aria-hidden="true"><div className="mapdots" /></div>
                    {OFFICES.map((o, i) => (
                        <button
                            key={o.key}
                            type="button"
                            className={`pin${loc === i ? ' is-on' : ''}${picked === i ? ' is-picked' : ''}`}
                            style={{ left: `${o.x}%`, top: `${o.y}%` }}
                            aria-label={`${offices[i].city}, ${offices[i].country}`}
                            onClick={() => pickOffice(i)}
                            onMouseEnter={() => setLoc(i)}
                            onMouseLeave={() => setLoc(picked ?? 0)}
                            onFocus={() => setLoc(i)}
                            onBlur={() => setLoc(picked ?? 0)}
                        >
                            <span className="ring" aria-hidden="true" />
                            <span className="core" aria-hidden="true" />
                            <span className={`lab lab--${o.side}`} aria-hidden="true">{offices[i].city}</span>
                        </button>
                    ))}
                </div>

                <div className="wrap sec a-loc" onMouseLeave={() => setLoc(picked ?? 0)}>
                    <div className="split rv a-loc__head">
                        <div>
                            <div className="eyebrow">{t.about_loc_eyebrow}</div>
                            <h2 className="h2">{t.about_loc_title}<br /><span className="ac">{t.about_loc_accent}</span></h2>
                        </div>
                        <p>{t.about_loc_text}</p>
                    </div>
                    <div className="g4p rv">
                        {CARD_ORDER.map((i) => {
                            const o = OFFICES[i];
                            return (
                                <div
                                    key={o.key}
                                    ref={(el) => { cardRefs.current[i] = el; }}
                                    className={`ofc${loc === i ? ' is-on' : ''}${picked === i ? ' is-picked' : ''}`}
                                    tabIndex={0}
                                    onMouseEnter={() => hoverCard(i)}
                                    onFocus={() => hoverCard(i)}
                                >
                                    {picked === i && <span className="ofc__flash" key={tick} aria-hidden="true" />}
                                    <div className="ofc__country">{offices[i].country}</div>
                                    <div className="ofc__city">{offices[i].city}</div>
                                    {o.hq ? <span className="ofc__badge ofc__badge--hq">{t.about_badge_hq}</span> : ''}
                                    {/* <span className={`ofc__badge${o.hq ? ' ofc__badge--hq' : ''}`}>{o.hq ? t.about_badge_hq : t.about_badge_branch}</span> */}
                                    <p>{offices[i].addr}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3 AT A GLANCE */}
            <section id="asz-stats" className="a-stats" ref={statsRef}>
                <div className="a-stats__rings" aria-hidden="true">
                    <span className="orb1" />
                    <span className="orb2" />
                    <span className="spin-mid" />
                </div>
                <div className="wrap statwrap a-stats__wrap">
                    <div className="g3w">
                        {STATS.map((s, i) => (
                            <div className={`wstat rvs${s.offset ? ' wstat--down' : ''}`} key={s.target}>
                                <div className="wstat__num" dir="ltr">{Math.round(s.target * p)}<span className="ac">+</span></div>
                                <div className="wstat__label">{statLabels[i]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4 WHO WE ARE */}
            <section className="a-who">
                <div className="wrap sec a-who__wrap">
                    <div className="g12">
                        <div className="a-who__title rvl">
                            <div className="eyebrow">{t.about_who_eyebrow}</div>
                            <h2 className="h2">{t.about_who_title}<br /><span className="ac">{t.about_who_accent}</span></h2>
                            <Link className="tlink" to="/service">{t.about_who_link} <Arrow /></Link>
                        </div>
                        <div className="a-who__copy rvr">
                            <p>{t.about_who_p1}</p>
                            <p>{t.about_who_p2}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5 CORE VALUES */}
            <section className="a-values" style={{ background: 'rgb(243, 243, 242)' }}>
                <div className="wrap sec a-values__wrap">
                    <div className="split rv a-values__head">
                        <div>
                            <div className="eyebrow">{t.about_values_eyebrow}</div>
                            <h2 className="h2">{t.about_values_title} <span className="ac">{t.about_values_accent}</span></h2>
                        </div>
                        {/* <p>Four principles that stay constant no matter what we're building or who we're building it for: for our clients, our products, and our own team.</p> */}
                    </div>
                    <div className="g4p">
                        {VALUES.map((v, i) => (
                            <article className="vcard rvs" tabIndex={0} key={v.a} style={{ '--a': v.a }}>
                                <div className="vcard__top">
                                    <span className="vbadge">
                                        <span>
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{v.icon}</svg>
                                        </span>
                                    </span>
                                    <span className="vcard__num">{`0${i + 1}`}</span>
                                </div>
                                <h3>{values[i].title}</h3>
                                <p>{values[i].text}</p>
                                <div className="vrule" />
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6 WHY ASZ */}
            <section className="a-why">
                <div className="wrap sec a-why__wrap">
                    <div className="a-why__head rv">
                        <div className="a-why__eyebrow"><span className="a-why__eyebrow-dot" />{t.about_why_eyebrow}</div>
                        <h2 className="h2">{t.about_why_title}<br /><span className="ac">{t.about_why_accent}</span></h2>
                    </div>

                    <div className="ptrack rvs">
                        {panels.map((q, i) => {
                            const on = i === panel;
                            const num = `0${i + 1}`;
                            // Same per-state values as about.html (inline, so open/closed never depends on CSS selector matching)
                            const st = {
                                bg: { filter: on ? 'brightness(.56) saturate(.9)' : 'brightness(.62) saturate(.75)' },
                                ov: { background: on ? 'linear-gradient(rgba(8,12,24,.16) 0%, rgba(8,12,24,.55) 56%, rgba(8,12,24,.95) 100%)' : 'linear-gradient(rgba(8,12,24,.42) 0%, rgba(8,12,24,.52) 100%)' },
                                stripe: { width: on ? '100%' : '0%' },
                                content: { opacity: on ? 1 : 0, transform: on ? 'translateX(0)' : `translateX(${isRTL ? 20 : -20}px)`, pointerEvents: on ? 'auto' : 'none' },
                                div: { transform: on ? 'scaleX(1)' : 'scaleX(0)' },
                                btn: { opacity: on ? 0 : 1, pointerEvents: on ? 'none' : 'auto' },
                            };
                            return (
                                <div className={`panel${on ? ' is-open' : ''}`} key={q.title}>
                                    <div className={`pbg pp${i + 1}`} aria-hidden="true" style={st.bg} />
                                    <div className="pov" aria-hidden="true" style={st.ov} />
                                    <span className="pstripe" aria-hidden="true" style={st.stripe} />
                                    <div className="pcontent" style={st.content}>
                                        <div className="pcontent__kicker" dir="ltr"><span className="live dot dot--sm" />{num} / {`0${panels.length}`}</div>
                                        <div className="pdiv" style={st.div} />
                                        <h3><span className="ac">{num}</span> {q.title}</h3>
                                        <p>{q.text}</p>
                                        <Link className="pcta" to="/contact" tabIndex={on ? 0 : -1}>{t.about_why_cta} <Arrow /></Link>
                                    </div>
                                    <button className="pbtn" type="button" aria-expanded={on} tabIndex={on ? -1 : 0} onClick={() => setPanel(i)} style={st.btn}>
                                        <span className="vd" />
                                        <span className="vt">{q.title}</span>
                                        <span className="plus">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                                        </span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 7 READY TO BUILD (CTA) */}
            <section id="contact" className="a-cta">
                <div className="wrap sec a-cta__wrap rv">
                    <div className="eyebrow">{t.about_cta_eyebrow}</div>
                    <h2 className="h2">{t.about_cta_title} <span className="ac">{t.about_cta_accent}</span></h2>
                    <p>{t.about_cta_text}</p>
                    <div className="a-cta__actions">
                        <Link to="/contact" className="btn btn-ac a-cta__btn">{t.about_cta_primary} <Arrow /></Link>
                        <Link className="btn a-cta__ghost" to="/service">{t.about_cta_secondary}</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}