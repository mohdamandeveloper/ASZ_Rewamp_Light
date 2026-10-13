import logoMega from '../assets/images/logo-mega2.webp';
import caseNgo from '../assets/images/case-ngo3.webp';
import shentonLobby from '../assets/images/shenton-lobby.webp';

const CaseStudies = [
  {
    slug: 'mega-adventure-park',
    category: 'product',
    client: 'Mega Adventure Park',
    industry: 'Leisure & Entertainment',
    service: 'Product & Application Engineering',
    image: { src: logoMega, bg: '#FFFFFF', size: '80% auto', label: 'Mega Adventure Park logo' },
    card: {
      sub: 'Self-service media commerce for an adventure park',
      value: '35%',
      label: 'higher purchase conversion',
    },
    teaser: 'From manual sales to self-service.',
    teaserStat: { value: '35%', label: 'higher media purchase conversion' },
    hero: {
      line1: 'Self-service media commerce',
      accent: 'for adventure photos and videos.',
      text: 'A centralized platform that lets guests browse, buy, and instantly receive their adventure photos and videos, while the park manages pricing, promotions, and staff sales in one place.',
    },
    stats: [
      { value: '35%', label: 'Higher media purchase conversion' },
      { value: '25%', label: 'More media sales revenue' },
      { value: '2x', label: 'Visitor volume, no added staff' },
    ],
    challenge: {
      text: 'Mega Adventure Park offers zip lines, rope courses, jumps, and family experiences. Guests bought their adventure photos and videos through manual, staff-led interactions. As visitor numbers grew, this limited convenience for guests, reduced opportunities for promotions, and gave managers little visibility into sales performance.',
      bullets: [
        'Photo and video sales relied on manual, staff-led interactions',
        'Limited room for promotions, discounts, and upselling',
        'Little visibility into staff-driven sales and commissions',
      ],
    },
    solution: {
      text: 'We designed and implemented a centralized media commerce platform that covers the full guest journey, from activity to purchase and delivery. Guests browse, select, and buy their photos and videos through self-service kiosks and digital channels. The park manages pricing, promotions, and discounts centrally, and tracks staff sales and commissions in one place.',
      chips: ['Self-service kiosks', 'Digital media delivery', 'Promotions & pricing engine', 'Staff sales & commission tracking'],
    },
    impact: [
      { value: '35%', text: 'higher guest media purchase conversion' },
      { value: '60%', text: 'faster photo and video selection and checkout' },
      { value: '70%', text: 'faster digital delivery, near-instant after purchase' },
      { value: '25%', text: 'more media sales revenue through targeted promotions and upselling' },
      { value: '50%', text: 'less manual processing through automation and self-service kiosks' },
      { value: '100%', text: 'visibility into staff sales performance and commissions' },
      { value: '20%', text: 'uplift in campaign-driven sales' },
      { value: '2x', text: 'visitor volume supported without additional staff' },
    ],
  },
  {
    slug: 'faith-based-organization',
    category: 'enterprise',
    client: 'A growing faith-based organization',
    industry: 'Non-Profit & Community',
    service: 'Enterprise Systems & ERP',
    image: { src: caseNgo, bg: '#0B0B0C', size: 'cover' },
    card: {
      sub: 'Centralized ERP for a faith-based organization',
      value: '90%',
      label: 'less administrative effort',
    },
    teaser: 'From disconnected systems to one source of truth.',
    teaserStat: { value: '90%', label: 'less manual administration' },
    hero: {
      line1: 'One ERP platform for members,',
      accent: 'donations, and finance.',
      text: 'A single source of truth that replaced disconnected systems, automated day-to-day administration, and gave leadership accurate, up-to-date information.',
    },
    stats: [
      { value: '90%', label: 'Less manual administration' },
      { value: '95%+', label: 'Data accuracy and completeness' },
      { value: '70%', label: 'Faster report preparation' },
    ],
    challenge: {
      text: 'A growing faith-based organization managed member records, family information, visitors, donations, and finances across several disconnected systems. Data was often duplicated or incomplete and hard to reconcile, creating heavy administrative overhead. As the organization expanded, manual processes became difficult to manage and scale.',
      bullets: [
        'Member, donation, and finance data spread across disconnected systems',
        'Duplicated, incomplete records and manual reconciliation',
        'Limited visibility as the organization grew',
      ],
    },
    solution: {
      text: 'We implemented a centralized ERP platform that brings membership, family records, visitor tracking, donations, campaigns, and financial reporting into one system. Working closely with stakeholders, we mapped existing workflows and consolidated them into a single source of truth, automating administration and reconciliation.',
      chips: ['ERP implementation', 'Membership & family records', 'Donations & campaigns', 'Financial reporting'],
    },
    impact: [
      { value: '100%', text: 'of member, visitor, donation, and financial data in one platform' },
      { value: '90%', text: 'less manual administration and reconciliation' },
      { value: '95%+', text: 'improvement in data accuracy and record completeness' },
      { value: '70%', text: 'faster report preparation for financial and operational decisions' },
      { value: '2x', text: 'organizational growth supported without added administrative overhead' },
    ],
  },
  {
    slug: '78-shenton-way',
    category: 'security',
    client: '78 Shenton Way',
    industry: 'Commercial Real Estate',
    service: 'Smart Security Systems',
    image: { src: shentonLobby, bg: '#0B0B0C', size: 'cover' },
    card: {
      sub: 'Visitor Management System for 78 Shenton Way',
      value: '60%',
      label: 'faster visitor processing',
    },
    teaser: 'From manual sign-ins to automated access.',
    teaserStat: { value: '60%', label: 'faster visitor processing' },
    hero: {
      line1: 'Secure, self-service visitor access',
      accent: 'for a high-security tower.',
      text: 'A centralized Visitor Management System for 78 Shenton Way that automates check-in, permit validation, and access card issuance, with full audit visibility for security teams.',
    },
    stats: [
      { value: '60%', label: 'Faster visitor processing' },
      { value: '75%', label: 'Less manual administration' },
      { value: '100%', label: 'Centralized audit visibility' },
    ],
    challenge: {
      text: 'Managing visitors and contractors in a high-security commercial tower needed a more controlled, efficient, and compliant process. Manual registration, permit checks, access card issuance, and record keeping created bottlenecks, added administrative workload, and introduced security and compliance risk as volumes grew.',
      bullets: [
        'Manual registration, permit checks, and access card issuance',
        'Bottlenecks and growing administrative workload',
        'Security and compliance risk as volumes increased',
      ],
    },
    solution: {
      text: 'We designed and implemented a centralized Visitor Management System covering the full visitor and contractor journey. Self-service and staff-assisted workflows simplify check-in, automate permit validation, and manage access card issuance. Every visitor follows the same compliance rules, and security teams get real-time visibility and control from one platform.',
      chips: ['Visitor & contractor check-in', 'Automated permit validation', 'Access card issuance', 'Central audit trail'],
    },
    impact: [
      { value: '60%', text: 'faster visitor and contractor check-in' },
      { value: '75%', text: 'less manual registration and access management' },
      { value: '100%', text: 'centralized tracking of visitor, contractor, and access records' },
      { value: 'Auto', text: 'permit validation and policy enforcement' },
      { value: 'Stronger', text: 'access control, auditability, and security governance' },
      { value: 'Scalable', text: 'platform for growth without added administrative overhead' },
    ],
  },
];

export const caseHref = (slug) => `/case-study/${slug}`;
export const getCase = (slug) => CaseStudies.find((c) => c.slug === slug);

export default CaseStudies;