import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/images/asz-logo2.webp';
import { useLanguage, useTranslation, LANGUAGES } from '../../Context/LanguageContext';
import './Header.scss';

// ---- Route map: adjust these to match your router ----
const ROUTES = {
  home: '/home',
  about: '/about',
  services: '/service',
  products: '/products',
  work: '/work',
};

// Static part of each service item (route + icon). Text comes from `t` in getServiceItems().
const SERVICE_META = [
  {
    id: 'ai-intelligence',
    to: '/service/ai-intelligence',
    icon: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16v4M17 18h4',
  },
  {
    id: 'smart-security',
    to: '/service/smart-security',
    icon: 'M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6zM9 12l2 2 4-4',
  },
  {
    id: 'enterprise-erp',
    to: '/service/enterprise-erp',
    icon: 'M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5',
  },
  {
    id: 'product-application',
    to: '/service/product-application',
    icon: 'M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16',
  },
  {
    id: 'digital-transformation',
    to: '/service/digital-transformation',
    icon: 'M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9.5 4.25 4.25 0 0 1 17.5 18z',
  },
  {
    id: 'technology-talent',
    to: '/service/technology-talent',
    icon: 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 19v-1a4 4 0 0 0-3-3.87M15.5 4.13a3 3 0 0 1 0 5.74',
  },
];

/* ─── DROPDOWN DATA ─────────────────────────────────────────── */
/* Built from `t` so labels re-render in the active language. URLs stay fixed.
   Text lives in Context/Translation.js → hdr_service_items (same order as SERVICE_META). */
const getServiceItems = (t) =>
  SERVICE_META.map((m, i) => ({
    ...m,
    title: t.hdr_service_items[i].title,
    desc: t.hdr_service_items[i].desc,
  }));

// Product names are brand names, so they stay in Latin. The tag line + description come from
// `t.hdr_product_items` (Context/Translation.js), same order as PRODUCT_META.
// `img` picks the thumbnail (see $img-* in Header.scss).
const PRODUCT_META = [
  { to: '/products#cordon', n: '01', title: 'Cordon', img: 'cordon' },
  { to: '/products#mediq', n: '02', title: 'MEDIQ', img: 'mediq' },
  { to: '/products#jobscout', n: '03', title: 'JobScout', img: 'jobscout' },
  { to: '/products#safin', n: '04', title: 'Safin', img: 'safin' },
];

const getProductItems = (t) =>
  PRODUCT_META.map((m, i) => ({
    ...m,
    tag: t.hdr_product_items[i].tag,
    desc: t.hdr_product_items[i].desc,
  }));

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

const Chevron = () => (
  <svg className="chev" width="12" height="12" strokeWidth="2.4" {...svgProps}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ArrowUpRight = ({ size }) => (
  <svg className="rtl-flip" width={size} height={size} strokeWidth="1.8" {...svgProps}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const ArrowRight = ({ size }) => (
  <svg className="rtl-flip" width={size} height={size} strokeWidth="2" {...svgProps}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// The active / hovered link is marked by the sliding pill (see useNavPill in Header()).
const renderLabel = (label, withChevron) => (
  <>
    {label}
    {withChevron && <Chevron />}
  </>
);

// Drop-downs open on hover / focus-within (pure CSS). After a click on any link inside,
// "is-closed" suppresses that so the panel shuts right away; it re-arms on the next
// hover or keyboard focus.
const useDropdown = (base) => {
  const [closed, setClosed] = useState(false);
  return {
    className: base + (closed ? ' is-closed' : ''),
    onClick: (e) => {
      if (!e.target.closest('a')) return;
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      setClosed(true);
    },
    onMouseEnter: () => setClosed(false),
    onMouseLeave: () => setClosed(false),
    onFocus: () => setClosed(false),
  };
};

/* ─── LANGUAGE SELECTOR ─────────────────────────────────────── */
function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const { language: selected, setLanguage: setSelected } = useLanguage();
  const t = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="btn_language" ref={ref}>
      <button
        type="button"
        className="language_selector"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.language_label}: ${selected.label}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="language_selector__flag" aria-hidden="true">{selected.flag}</span>
        <span>{selected.label}</span>
        <svg
          className="language_selector__chev"
          width="12" height="12" strokeWidth="2.4" {...svgProps}
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

        {open && (
          <div
            className="lang-dropdown"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={selected.code === lang.code}
                onClick={() => { setSelected(lang); setOpen(false); }}
                className={`lang-dropdown__item${selected.code === lang.code ? ' active' : ''}`}
              >
                <span style={{ fontSize: 18 }} aria-hidden="true">{lang.flag}</span>
                <span style={{ fontWeight: 500 }}>{lang.label}</span>
                <span style={{ marginInlineStart: 'auto', fontSize: 11, opacity: 0.5 }}>{lang.code}</span>
              </button>
            ))}
          </div>
        )}
    </div>
  );
}

/* ─── MOBILE MENU ───────────────────────────────────────────── */
// Same menu as the phone menu in index.html: a full-screen sheet under the nav bar.
// The burger in the bar turns into an X while it is open (see .nav__burger).
// - Tapping the label of Services / Products navigates to that page.
// - Tapping the chevron only expands / collapses the sub-menu (white box of links).
// - The language picker and the CTA sit at the bottom of the sheet.
function MobileNav({ open, onClose, t, serviceItems, productItems }) {
  const [expanded, setExpanded] = useState({}); // { services: bool, products: bool }
  const [langOpen, setLangOpen] = useState(false);
  const { language: selected, setLanguage } = useLanguage();

  // Collapse the sub-menus once the close animation is done, so the next open starts clean
  useEffect(() => {
    if (open) return undefined;
    const id = setTimeout(() => {
      setExpanded({});
      setLangOpen(false);
    }, 450);
    return () => clearTimeout(id);
  }, [open]);

  // Escape to close, lock page scroll while open, auto-close if the screen grows to desktop
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    const onResize = () => { if (window.innerWidth > 1100) onClose(); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, onClose]);

  const toggle = (key) => setExpanded((cur) => ({ ...cur, [key]: !cur[key] }));

  const renderGroup = (key, label, to, links, allLabel) => {
    const isOpen = !!expanded[key];
    return (
      <div className="mnav__grp">
        <div className={'mnav__row mnav__row--grp' + (isOpen ? ' is-open' : '')}>
          <NavLink className="mnav__link" to={to} onClick={onClose}>
            {label}
          </NavLink>
          <button
            type="button"
            className="mnav__tog"
            aria-expanded={isOpen}
            aria-controls={`mnav-sub-${key}`}
            aria-label={label}
            onClick={() => toggle(key)}
          >
            <svg className="mnav__chev" width="18" height="18" strokeWidth="2.2" {...svgProps}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
        <div id={`mnav-sub-${key}`} className={'mnav__subwrap' + (isOpen ? ' is-open' : '')}>
          <div className="mnav__subin">
            <div className="mnav__sub">
              {links}
              <Link className="mnav__all" to={to} onClick={onClose}>
                {allLabel} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="mobile-nav" className={'mnav__panel' + (open ? ' is-open' : '')} aria-hidden={!open}>
      <NavLink className="mnav__row" to={ROUTES.home} onClick={onClose}>{t.hdr_home}</NavLink>
      <NavLink className="mnav__row" to={ROUTES.about} onClick={onClose}>{t.hdr_about}</NavLink>

      {renderGroup(
        'services',
        t.hdr_services,
        ROUTES.services,
        serviceItems.map((s) => (
          <Link key={s.to} className="mnav__sitem" to={s.to} onClick={onClose}>
            <span className="mnav__ic">
              <svg width="18" height="18" strokeWidth="1.7" {...svgProps}>
                <path d={s.icon} />
              </svg>
            </span>
            <span className="mnav__t">{s.title}</span>
            <span className="mnav__go"><ArrowUpRight size={16} /></span>
          </Link>
        )),
        t.hdr_view_all_services
      )}

      {renderGroup(
        'products',
        t.hdr_products,
        ROUTES.products,
        productItems.map((p) => (
          <Link key={p.to} className="mnav__sitem" to={p.to} onClick={onClose}>
            <span className="mnav__ic mnav__ic--thumb">
              <span className={`mnav__timg mnav__timg--${p.img}`} aria-hidden="true" />
            </span>
            <span className="mnav__t">{p.title}</span>
            <span className="mnav__go"><ArrowUpRight size={16} /></span>
          </Link>
        )),
        t.hdr_view_all_products
      )}

      <NavLink className="mnav__row" to={ROUTES.work} onClick={onClose}>{t.hdr_work}</NavLink>

      <div className="mnav__foot">
        <button
          type="button"
          className="mnav__langbtn"
          aria-expanded={langOpen}
          aria-label={`${t.language_label || 'Language'}: ${selected.label}`}
          onClick={() => setLangOpen((o) => !o)}
        >
          {t.language_label || 'Language'}
          <span>{`${String(selected.code).toUpperCase()} · ${selected.label}`}</span>
        </button>

        {langOpen && (
          <div className="mnav__langlist" role="listbox">
            {LANGUAGES.map((lang) => {
              const on = selected.code === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={on}
                  className={'mnav__lopt' + (on ? ' on' : '')}
                  onClick={() => { setLanguage(lang); setLangOpen(false); }}
                >
                  <span>
                    <span aria-hidden="true">{lang.flag}</span>
                    {lang.label}
                  </span>
                  {on && (
                    <svg width="14" height="14" strokeWidth="2.4" {...svgProps}>
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}

        <Link className="mnav__cta" to="/contact" onClick={onClose}>
          {t.hdr_cta}
          <svg className="rtl-flip" width="16" height="16" strokeWidth="2" {...svgProps}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const t = useTranslation();
  const serviceItems = getServiceItems(t);
  const productItems = getProductItems(t);
  const services = useDropdown('sdd');
  const products = useDropdown('pdd');

  const { language } = useLanguage();
  const linksRef = useRef(null);
  const pillRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const [navSolid, setNavSolid] = useState(false);
  useEffect(() => {
    if (menuOpen) { setNavSolid(true); return undefined; }
    const id = setTimeout(() => setNavSolid(false), 450);
    return () => clearTimeout(id);
  }, [menuOpen]);
  const { pathname } = useLocation();
  useEffect(() => { setMenuOpen(false); }, [pathname]); // also covers browser back / forward

  // Sliding orange pill: follows the hovered / focused link, and rests on the active route
  // (NavLink sets aria-current="page" on it). Re-measured on route, language and resize,
  // because translated labels change the link widths.
  useEffect(() => {
    const box = linksRef.current;
    const pill = pillRef.current;
    if (!box || !pill) return undefined;

    const links = Array.from(box.querySelectorAll('.navlink'));
    const activeLink = () => links.find((a) => a.getAttribute('aria-current') === 'page') || null;
    let current = null;

    const go = (el) => {
      current = el;
      links.forEach((a) => {
        if (a === el) a.setAttribute('data-on', '');
        else a.removeAttribute('data-on');
      });
      if (!el) { pill.style.opacity = '0'; return; }
      const r = el.getBoundingClientRect();
      const p = box.getBoundingClientRect();
      pill.style.width = `${r.width}px`;
      pill.style.transform = `translateX(${r.left - p.left}px)`;
      pill.style.opacity = '1';
    };
    const rest = () => go(activeLink());
    const onFocusOut = (e) => { if (!box.contains(e.relatedTarget)) rest(); };
    const fix = () => go(current);

    const bound = links.map((a) => {
      const on = () => go(a);
      a.addEventListener('mouseenter', on);
      a.addEventListener('focus', on);
      return [a, on];
    });
    box.addEventListener('mouseleave', rest);
    box.addEventListener('focusout', onFocusOut);
    window.addEventListener('resize', fix);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fix);
    const t1 = setTimeout(fix, 60);
    const t2 = setTimeout(fix, 700);
    rest();

    return () => {
      bound.forEach(([a, on]) => {
        a.removeEventListener('mouseenter', on);
        a.removeEventListener('focus', on);
      });
      box.removeEventListener('mouseleave', rest);
      box.removeEventListener('focusout', onFocusOut);
      window.removeEventListener('resize', fix);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, language.code]);

  return (
    <header className="site-header">
      <nav className={'nav' + (menuOpen || navSolid ? ' nav--menu-open' : '')} aria-label={t.hdr_main}>
        <Link className="nav__brand" to="/" aria-label={t.hdr_home_aria} onClick={closeMenu}>
          <img src={logo} alt="ASZ" />
        </Link>

        <div className="nav__links" ref={linksRef}>
          <span className="npill" ref={pillRef} aria-hidden="true" />
          <NavLink className="navlink" to={ROUTES.home}>
            {renderLabel(t.hdr_home)}
          </NavLink>
          <NavLink className="navlink" to={ROUTES.about}>
            {renderLabel(t.hdr_about)}
          </NavLink>

          {/* Services drop-down */}
          <div {...services}>
            <NavLink className="navlink" to={ROUTES.services}>
              {renderLabel(t.hdr_services, true)}
            </NavLink>
            <div className="sddpanel">
              <div className="sddbox">
                {serviceItems.map((s) => (
                  <Link key={s.to} className="sitem" to={s.to}>
                    <span className="ic">
                      <svg width="20" height="20" strokeWidth="1.7" {...svgProps}>
                        <path d={s.icon} />
                      </svg>
                    </span>
                    <span>
                      <span className="t">{s.title}</span>
                      <span className="d">{s.desc}</span>
                    </span>
                    <span className="go"><ArrowUpRight size={16} /></span>
                  </Link>
                ))}
                <Link className="sall" to={ROUTES.services}>
                  {t.hdr_view_all_services} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Products drop-down */}
          <div {...products}>
            <NavLink className="navlink" to={ROUTES.products}>
              {renderLabel(t.hdr_products, true)}
            </NavLink>
            <div className="pddpanel">
              <div className="pddbox">
                {productItems.map((p) => (
                  <Link key={p.to} className="pitem" to={p.to}>
                    <span className="thumb dark">
                      <span className={`pimg pimg--${p.img}`} aria-hidden="true" />
                    </span>
                    <span className="go"><ArrowUpRight size={13} /></span>
                    <span className="n">{`${p.n} · ${p.tag}`}</span>
                    <span className="t">{p.title}</span>
                    <span className="d">{p.desc}</span>
                  </Link>
                ))}
                <Link className="pitem pall" to={ROUTES.products}>
                  <span className="t">{t.hdr_view_all_products}</span>
                  <span className="pgo"><ArrowRight size={16} /></span>
                </Link>
              </div>
            </div>
          </div>

          <NavLink className="navlink" to={ROUTES.work}>
            {renderLabel(t.hdr_work)}
          </NavLink>
        </div>

        <div className="nav__end">
          <LanguageSelector />
          <Link to={'/contact'} className="btn btn-ac nav__cta">
            {t.hdr_cta}
            <svg className="rtl-flip" width="14" height="14" strokeWidth="2" {...svgProps}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          {/* Mobile only: opens / closes the menu (hamburger turns into an X) */}
          <button
            type="button"
            className={'nav__burger' + (menuOpen ? ' is-open' : '')}
            aria-label={menuOpen ? (t.hdr_close_menu || 'Close menu') : (t.hdr_open_menu || 'Open menu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg className="nav__burger-ic nav__burger-ic--menu" width="20" height="20" strokeWidth="2" {...svgProps}>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg className="nav__burger-ic nav__burger-ic--close" width="20" height="20" strokeWidth="2.2" {...svgProps}>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Full-screen phone menu (rendered inside the nav, like index.html) */}
        <MobileNav
          open={menuOpen}
          onClose={closeMenu}
          t={t}
          serviceItems={serviceItems}
          productItems={productItems}
        />
      </nav>
    </header>
  );
}