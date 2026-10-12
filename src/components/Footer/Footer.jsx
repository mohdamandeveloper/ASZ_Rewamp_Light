import { Link } from 'react-router-dom';
import { useTranslation } from '../../Context/LanguageContext';
import logo from '../../assets/images/asz-logo2.png';
import './Footer.scss';

// Internal routes use <Link>, in-page anchors and external links use <a>
const A = ({ href, ...p }) => (href.startsWith('/') ? <Link to={href} {...p} /> : <a href={href} {...p} />);

// Edit hrefs to match your router. Labels come from `t` (Context/Translation.js).
const COMPANY_HREFS = ['/', '/about', '/products', '/work', '/contact'];

// Same order as `t.hdr_service_items`
const SERVICE_HREFS = [
  '/service/ai-intelligence',
  '/service/smart-security',
  '/service/enterprise-erp',
  '/service/product-application',
  '/service/digital-transformation',
  '/service/technology-talent',
];

// Footer order is Singapore, Dubai, Sydney, Bangalore. `office` is the index of the matching
// entry in `t.about_offices` (city + address are shared with the About page);
// the label ("Head Office"…) comes from `t.ftr_office_labels` at the same position as here.
const OFFICES = [{ office: 0 }, { office: 2 }, { office: 3 }, { office: 1 }];

export default function Footer() {
  const t = useTranslation();
  const company = [
    t.footer_link_home,
    t.footer_link_about,
    t.hdr_products,
    t.hdr_work,
    t.footer_link_contact,
  ].map((label, i) => ({ label, href: COMPANY_HREFS[i] }));
  const services = SERVICE_HREFS.map((href, i) => ({ href, label: t.hdr_service_items[i].title }));

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="g12">
          <div className="site-footer__about">
            <div className="site-footer__brand">
              <img src={logo} alt="ASZ" />
              {/* <span>Technologies</span> */}
            </div>
            <p>{t.ftr_about}</p>
            <div className="site-footer__contact">
              <a className="flink flink--sm" href="mailto:info@asztechnologies.com" dir="ltr">info@asztechnologies.com</a>
              {/* <a className="flink flink--sm" href="tel:+919740703030" dir="ltr">+91 97407 03030</a> */}
            </div>
          </div>

          <div className="site-footer__col site-footer__col--company">
            <div className="site-footer__title">{t.footer_company_heading}</div>
            {company.map((l) => (
              <A key={l.label} className="flink" href={l.href}>{l.label}</A>
            ))}
          </div>

          <div className="site-footer__col site-footer__col--services">
            <div className="site-footer__title">{t.footer_services_heading}</div>
            {services.map((s) => (
              <A key={s.label} className="flink flink--block" href={s.href}>{s.label}</A>
            ))}
          </div>

          <div className="site-footer__offices">
            <div className="site-footer__title site-footer__title--offices">{t.ftr_offices_heading}</div>
            <div className="site-footer__offgrid">
              {OFFICES.map((o, i) => {
                const loc = t.about_offices[o.office];
                return (
                  <div key={o.office}>
                    <div className="site-footer__label">{t.ftr_office_labels[i]}</div>
                    <div className="site-footer__city">{loc.city}</div>
                    {loc.addr}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>{t.ftr_copyright}</span>
          <span className="site-footer__legal">
            <a className="flink" href="#top">{t.footer_terms}</a>
            <a className="flink" href="#top">{t.footer_privacy}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}