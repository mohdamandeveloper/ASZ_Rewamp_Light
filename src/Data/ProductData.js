import prodCordon from '../assets/images/prod-cordon3.webp';
import prodMediq from '../assets/images/prod-mediq3.webp';
import prodJobscout from '../assets/images/prod-jobscout3.webp';
import prodSafin from '../assets/images/prod-safin3.webp';

// Single source of truth for the Products listing and the product detail pages.
// Order must match `prod_items` in Context/Translation.js.
//   detail     -> has a /products/:slug page (listing button goes there)
//   external   -> listing button opens `url` in a new tab
//   comingSoon -> shows a "Coming soon" badge (listing + detail page)
// Product names are brand names, so they stay in Latin in every language.
export const PRODUCTS = [
  { id: 'cordon', slug: 'cordon', name: 'Cordon', image: prodCordon, detail: true, comingSoon: false },
  { id: 'mediq', slug: 'mediq', name: 'MEDIQ', image: prodMediq, detail: true, comingSoon: true },
  { id: 'jobscout', slug: 'jobscout', name: 'JobScout', image: prodJobscout, detail: false, external: true, url: 'https://jobsscout.in/', comingSoon: false },
  { id: 'safin', slug: 'safin', name: 'Safin', image: prodSafin, detail: false, external: true, url: 'https://safinwater.com/', comingSoon: false },
];

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);