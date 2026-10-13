import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from '../../Context/LanguageContext';
import './ComingSoon.scss';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
// One page, two documents. `type` comes from the route in main.jsx.
// Fallback copy is English; to translate, add the same keys to your locale files
// (cs_pill, cs_privacy_line1/2/text, cs_terms_line1/2/text, cs_status, cs_home,
//  cs_contact, cs_also, cs_privacy_name, cs_terms_name).
const FALLBACK = {
  cs_pill: 'Coming soon',
  cs_privacy_line1: 'Privacy',
  cs_privacy_line2: 'Policy.',
  cs_privacy_text: 'We are finalising how we explain what data we collect, why we collect it, and how we protect it. The full policy will be published here shortly.',
  cs_terms_line1: 'Terms &',
  cs_terms_line2: 'Conditions.',
  cs_terms_text: 'We are putting the finishing touches on the terms that govern the use of our website, services and products. They will be published here shortly.',
  cs_status: 'Drafting in progress',
  cs_home: 'Back to home',
  cs_contact: 'Contact us',
  cs_also: 'Also see',
  cs_privacy_name: 'Privacy Policy',
  cs_terms_name: 'Terms & Conditions',
};

const DOCS = {
  privacy: {
    key: 'privacy',
    other: { to: '/terms-and-conditions', name: 'cs_terms_name' },
    // shield
    icon: 'M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6zM9 12l2.2 2.2L15.5 10',
  },
  terms: {
    key: 'terms',
    other: { to: '/privacy-policy', name: 'cs_privacy_name' },
    // document with lines
    icon: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  },
};

const Arrow = ({ size = 16 }) => (
  <svg className="rtl-flip" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ------------------------------------------------------------------ */
export default function ComingSoon({ type = 'privacy' }) {
  const t = useTranslation() || {};
  const tr = (key) => t[key] || FALLBACK[key];
  const doc = DOCS[type] || DOCS.privacy;
  const line1 = tr(`cs_${doc.key}_line1`);
  const line2 = tr(`cs_${doc.key}_line2`);

  useEffect(() => {
    const prev = document.title;
    document.title = `${line1} ${line2} | ${tr('cs_pill')}`;
    return () => { document.title = prev; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <main className="comingsoon">
      <section className="cs-hero">
        <div className="cs-hero__grid-lines" aria-hidden="true" />
        <div className="cs-hero__frame" aria-hidden="true" />

        <div className="cs-wrap">
          <div className="cs-grid">
            <div className="cs-copy">
              <div className="cs-pill cs-up"><span className="cs-dot" />{tr('cs_pill')}</div>
              <h1 className="cs-up">
                <span className="cs-nw">{line1}</span><br />
                <span className="cs-ac cs-nw">{line2}</span>
              </h1>
              <p className="cs-up">{tr(`cs_${doc.key}_text`)}</p>
              <div className="cs-actions cs-up">
                <Link to="/" className="cs-btn cs-btn--ac">{tr('cs_home')} <Arrow size={15} /></Link>
                <Link to="/contact" className="cs-btn cs-btn--ghost">{tr('cs_contact')}</Link>
              </div>
            </div>

            {/* <div className="cs-visual cs-fadein" aria-hidden="true">
              <div className="cs-visual__glow cs-breathe" />
              <div className="cs-doc cs-floaty">
                <div className="cs-doc__in">
                  <div className="cs-doc__top">
                    <span className="cs-doc__icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={doc.icon} /></svg>
                    </span>
                    <span className="cs-doc__title">{line1} {line2.replace('.', '')}</span>
                    <span className="cs-doc__status"><span className="cs-dot cs-dot--sm" />{tr('cs_status')}</span>
                  </div>
                  <div className="cs-doc__body">
                    <span className="cs-line cs-line--h" />
                    <span className="cs-line" />
                    <span className="cs-line cs-line--s" />
                    <span className="cs-gap" />
                    <span className="cs-line cs-line--h cs-line--m" />
                    <span className="cs-line" />
                    <span className="cs-line" />
                    <span className="cs-line cs-line--s" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <nav className="cs-links cs-up" aria-label={tr('cs_also')}>
            <span className="cs-links__label">{tr('cs_also')}</span>
            <Link to={doc.other.to} className="cs-links__item">{tr(doc.other.name)} <Arrow size={14} /></Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
