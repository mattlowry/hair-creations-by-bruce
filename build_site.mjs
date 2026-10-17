import fs from 'node:fs';
import path from 'node:path';
import { SERVICES, PRICING_CATEGORIES } from './data_services.mjs';
import { LOCATIONS, GUIDES } from './data_locations_guides.mjs';

const ROOT_DIR = '/Users/matthewlong/Coding Projects/BruceHairSalon';
const SITE_URL = 'https://haircreationsbybruce.com';
const GMB_SHARE_URL = 'https://share.google/ScWClGImdYNKcHbtd';
const GOOGLE_MAPS_URL = 'https://goo.gl/maps/mfuqkS9FENGV3swc8';
const TODAY_ISO = '2026-10-17';

const CHEVRON_SVG = `<svg class="nav-chevron" aria-hidden="true" viewBox="0 0 12 12"><path d="M2.5 4.5L6 8L9.5 4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/**
 * Compute relative path from a page at `fromRelPath` (e.g. 'services/hair-extensions.html')
 * to a root-relative path `targetRootPath` (e.g. '/assets/css/styles.css' or '/index.html')
 */
function toRel(fromRelPath, targetRootPath) {
  if (
    targetRootPath.startsWith('http://') ||
    targetRootPath.startsWith('https://') ||
    targetRootPath.startsWith('mailto:') ||
    targetRootPath.startsWith('tel:') ||
    targetRootPath.startsWith('#')
  ) {
    return targetRootPath;
  }
  const [cleanTarget, hashPart] = targetRootPath.split('#');
  const fromDir = path.dirname(fromRelPath);
  const targetClean = cleanTarget.replace(/^\//, '');
  let rel = path.relative(fromDir === '.' ? '' : fromDir, targetClean);
  if (!rel) rel = path.basename(targetClean);
  rel = rel.split(path.sep).join('/');
  return hashPart ? `${rel}#${hashPart}` : rel;
}

function renderLayout({
  relPath,
  title,
  metaDescription,
  canonicalPath,
  ogImage = '/assets/images/hero-salon.jpg',
  breadcrumbs = [],
  extraJsonLd = [],
  bodyHtml
}) {
  const canonicalUrl = `${SITE_URL}/${canonicalPath === 'index.html' ? '' : canonicalPath}`;
  const ogImageUrl = `${SITE_URL}${ogImage}`;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['HairSalon', 'LocalBusiness'],
    '@id': `${SITE_URL}/#salon`,
    name: 'Hair Creations by Bruce',
    alternateName: 'Bruce @ Salon Dyanne — McLean House',
    description:
      'Independent Hair Salon, Color & Hair Extension Studio in McLean, VA with over 30 years of experience. Specializing in Remy hair extensions, Micro-Links, Micro-Fusion, Wella/Goldwell color, Brazilian Blowouts, Men’s Hair Systems & Toupees, Women’s Wigs, and In-Home/Facility visits.',
    url: `${SITE_URL}/`,
    telephone: '+1-571-213-3667',
    email: 'Sambru703@aol.com',
    priceRange: '$$',
    logo: `${SITE_URL}/assets/images/logo-emblem.jpg`,
    image: `${SITE_URL}/assets/images/hero-salon.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6800 Fleetwood Rd, Suite 106',
      addressLocality: 'McLean',
      addressRegion: 'VA',
      postalCode: '22101',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.9339,
      longitude: -77.1773
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '06:00',
        closes: '15:00'
      }
    ],
    paymentAccepted: 'Cash, Credit Card, Visa, MasterCard, American Express, Discover',
    areaServed: LOCATIONS.map((l) => ({
      '@type': 'Place',
      name: l.city
    })),
    sameAs: [GMB_SHARE_URL, GOOGLE_MAPS_URL]
  };

  const breadcrumbSchema =
    breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`
            },
            ...breadcrumbs.map((b, idx) => ({
              '@type': 'ListItem',
              position: idx + 2,
              name: b.label,
              item: `${SITE_URL}/${b.path === 'index.html' ? '' : b.path}`
            }))
          ]
        }
      : null;

  const allSchemas = [localBusinessSchema, ...(breadcrumbSchema ? [breadcrumbSchema] : []), ...extraJsonLd];

  const serviceLinksCol1 = SERVICES.slice(0, 7)
    .map((s) => `<li><a href="${toRel(relPath, `/services/${s.slug}.html`)}"><span>${s.shortTitle}</span></a></li>`)
    .join('\n');
  const serviceLinksCol2 = SERVICES.slice(7)
    .map((s) => `<li><a href="${toRel(relPath, `/services/${s.slug}.html`)}"><span>${s.shortTitle}</span></a></li>`)
    .join('\n');

  const locationLinks = LOCATIONS.map(
    (l) => `<li><a href="${toRel(relPath, `/locations/${l.slug}.html`)}">${l.city}</a></li>`
  ).join('\n');

  const guideLinks = [
    ...GUIDES.map((g) => `<li><a href="${toRel(relPath, `/guides/${g.slug}.html`)}">${g.shortTitle}</a></li>`),
    `<li><a href="${toRel(relPath, '/faq.html')}">Frequently Asked Questions</a></li>`
  ].join('\n');

  const breadcrumbsHtml =
    breadcrumbs.length > 0
      ? `<nav class="breadcrumbs" aria-label="Breadcrumb">
          <div class="container">
            <ol class="breadcrumb-list">
              <li><a href="${toRel(relPath, '/index.html')}">Home</a></li>
              ${breadcrumbs
                .map((b, i) =>
                  i === breadcrumbs.length - 1
                    ? `<li aria-current="page"><strong>${b.label}</strong></li>`
                    : `<li><a href="${toRel(relPath, `/${b.path}`)}">${b.label}</a></li>`
                )
                .join('')}
            </ol>
          </div>
        </nav>`
      : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${metaDescription.replace(/"/g, '&quot;')}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" type="image/png" href="${toRel(relPath, '/assets/images/favicon.png')}" />

  <!-- Preserved Search Console & Bing Verification Tokens from Original Domain -->
  <meta name="verify-v1" content="tOQf5ptsygEO2AEmrBvIQ2Vu2ywaOsI7cbP2m7M6GvU=" />
  <meta name="msvalidate.01" content="56788CEB12CDC90C5139E09CF7E0B12F" />

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />
  <meta property="og:site_name" content="Hair Creations by Bruce" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:description" content="${metaDescription.replace(/"/g, '&quot;')}" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:locale" content="en_US" />

  <!-- Google Fonts: Cormorant Garamond & Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="${toRel(relPath, '/assets/css/styles.css')}" />

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
${JSON.stringify(allSchemas, null, 2)}
  </script>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Minimalist Architectural Utility Ribbon -->
  <div class="utility-ribbon">
    <div class="container utility-ribbon-inner">
      <div class="utility-group">
        <span><span class="utility-dot" aria-hidden="true"></span>McLean House Suite 106 &middot; 6800 Fleetwood Rd, McLean, VA</span>
      </div>
      <div class="utility-group utility-hide-tablet">
        <span>Mon&ndash;Sat 6:00 AM &ndash; 3:00 PM &middot; By Appointment</span>
      </div>
      <div class="utility-group utility-hide-mobile">
        <span>LGBTQ+ Friendly</span>
        <span class="utility-sep" aria-hidden="true">|</span>
        <a href="${toRel(relPath, '/services/home-facility-mobile-hairstylist.html')}">In-Home &amp; Facility Concierge</a>
        <span class="utility-sep" aria-hidden="true">|</span>
        <a href="${GMB_SHARE_URL}" target="_blank" rel="noopener">Google Profile &#8599;</a>
      </div>
    </div>
  </div>

  <!-- Sleek Glassmorphic Editorial Header (Spacious 3-Zone Layout) -->
  <header class="site-header">
    <div class="container header-inner">
      <a href="${toRel(relPath, '/index.html')}" class="brand-logo" aria-label="Hair Creations by Bruce — Home">
        <img src="${toRel(relPath, '/assets/images/logo-medallion.png')}" alt="" class="brand-medallion" width="54" height="54" />
        <span class="brand-text">
          <span class="brand-name">Hair Creations by Bruce</span>
          <span class="brand-sub">McLean, Virginia &middot; Salon Dyanne</span>
        </span>
      </a>

      <button type="button" id="mobile-menu-btn" class="mobile-menu-toggle" aria-expanded="false" aria-controls="main-nav">
        <span aria-hidden="true">☰</span> Menu
      </button>

      <nav id="main-nav" class="main-nav" aria-label="Main Navigation">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="${toRel(relPath, '/services.html')}" class="nav-link"${relPath === 'services.html' || relPath.startsWith('services/') ? ' aria-current="page"' : ''}>
              Services ${CHEVRON_SVG}
            </a>
            <div class="nav-dropdown-menu mega-menu" role="region" aria-label="Salon Services Submenu">
              <div>
                <span class="dropdown-col-label">Extensions &amp; Color Atelier</span>
                <ul style="list-style:none; margin:0; padding:0;">
                  ${serviceLinksCol1}
                </ul>
              </div>
              <div>
                <span class="dropdown-col-label">Cuts, Systems &amp; Smoothing</span>
                <ul style="list-style:none; margin:0; padding:0;">
                  ${serviceLinksCol2}
                </ul>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a href="${toRel(relPath, '/pricing.html')}" class="nav-link"${relPath === 'pricing.html' ? ' aria-current="page"' : ''}>Pricing</a>
          </li>
          <li class="nav-item">
            <a href="${toRel(relPath, '/gallery.html')}" class="nav-link"${relPath === 'gallery.html' ? ' aria-current="page"' : ''}>Lookbook</a>
          </li>
          <li class="nav-item">
            <a href="${toRel(relPath, '/about.html')}" class="nav-link"${relPath === 'about.html' ? ' aria-current="page"' : ''}>About Bruce</a>
          </li>
          <li class="nav-item">
            <a href="${toRel(relPath, '/locations/mclean-va.html')}" class="nav-link"${relPath.startsWith('locations/') ? ' aria-current="page"' : ''}>
              Locations ${CHEVRON_SVG}
            </a>
            <ul class="nav-dropdown-menu">
              <li><span class="dropdown-col-label">Northern VA &amp; DC Metro</span></li>
              ${locationLinks}
            </ul>
          </li>
          <li class="nav-item">
            <a href="${toRel(relPath, '/faq.html')}" class="nav-link"${relPath === 'faq.html' || relPath.startsWith('guides/') ? ' aria-current="page"' : ''}>
              Guides &amp; FAQ ${CHEVRON_SVG}
            </a>
            <ul class="nav-dropdown-menu">
              <li><span class="dropdown-col-label">Client Resources</span></li>
              ${guideLinks}
            </ul>
          </li>
          <li class="nav-item">
            <a href="${toRel(relPath, '/contact.html')}" class="nav-link"${relPath === 'contact.html' ? ' aria-current="page"' : ''}>Contact</a>
          </li>
        </ul>
      </nav>

      <div class="header-cta">
        <a href="tel:+15712133667" class="header-phone-link">(571) 213-3667</a>
        <a href="${toRel(relPath, '/contact.html')}" class="btn btn-primary btn-sm">Book Consultation</a>
      </div>
    </div>
  </header>

  ${breadcrumbsHtml}

  <main id="main-content">
    ${bodyHtml}
  </main>

  <!-- Global Call-To-Action Banner -->
  <section class="section-sm bg-dark-luxury">
    <div class="container" style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:2rem;">
      <div style="max-width:44rem;">
        <span class="eyebrow">Private Studio &amp; Complimentary Extension Consultations</span>
        <h2 style="margin-bottom:0.6rem;">Experience Unhurried, Master-Level Hair Care in McLean</h2>
        <p style="margin-bottom:0;">
          Book your one-on-one session with Bruce at <strong>McLean House Suite 106 (Bruce @ Salon Dyanne)</strong>, open Monday through Saturday from 6:00 AM to 3:00 PM, or inquire about private in-home &amp; senior facility visits.
        </p>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:0.85rem;">
        <a href="tel:+15712133667" class="btn btn-light">Call (571) 213-3667</a>
        <a href="${toRel(relPath, '/contact.html')}" class="btn btn-outline-light">Request Appointment</a>
      </div>
    </div>
  </section>

  <!-- Comprehensive SEO Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div style="display:flex; align-items:center; gap:0.85rem; margin-bottom:1rem;">
            <img src="${toRel(relPath, '/assets/images/logo-emblem.jpg')}" alt="Hair Creations by Bruce Crest" width="52" height="52" loading="lazy" style="border-radius:50%; border:1px solid rgba(212,180,140,0.4);" />
            <h3 style="margin-bottom:0;">Hair Creations by Bruce</h3>
          </div>
          <p>
            <strong>Bruce @ Salon Dyanne</strong><br />
            McLean House Condo Building<br />
            6800 Fleetwood Rd, Suite 106<br />
            McLean, VA 22101
          </p>
          <p>
            <strong>Phone:</strong> <a href="tel:+15712133667" style="color:#fff;">(571) 213-3667</a><br />
            <strong>Email:</strong> <a href="mailto:Sambru703@aol.com?subject=Inquiry%20from%20HairCreationsByBruce.com" style="color:#fff;">Sambru703@aol.com</a><br />
            <strong>Hours:</strong> Mon–Sat: 6:00 AM – 3:00 PM (By Appointment)
          </p>
          <p style="font-size:0.84rem; margin-top:1rem;">
            ✦ LGBTQ+ Friendly &amp; Human Rights Advocate<br />
            ✦ All Major Credit Cards Accepted<br />
            ✦ Available for Home &amp; Senior Facilities
          </p>
          <div style="display:flex; flex-wrap:wrap; gap:0.6rem; margin-top:1.15rem;">
            <a href="${GMB_SHARE_URL}" target="_blank" rel="noopener" class="btn btn-outline-light btn-sm">Google Business Profile &#8599;</a>
            <a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener" class="btn btn-outline-light btn-sm">McLean Directions &#8599;</a>
          </div>
        </div>

        <div>
          <h4>Extensions &amp; Hair Replacement</h4>
          <ul class="footer-links">
            <li><a href="${toRel(relPath, '/services/hair-extensions.html')}">Hair Extensions Overview</a></li>
            <li><a href="${toRel(relPath, '/services/microlink-weft-extensions.html')}">Micro-Links &amp; Beaded Wefts</a></li>
            <li><a href="${toRel(relPath, '/services/microfusion-keratin-extensions.html')}">Micro-Fusion Keratin Bonds</a></li>
            <li><a href="${toRel(relPath, '/services/extension-removal-maintenance.html')}">Extension Removal &amp; Tightening</a></li>
            <li><a href="${toRel(relPath, '/services/mens-hair-systems-toupees.html')}">Men's Hair Systems &amp; Toupees</a></li>
            <li><a href="${toRel(relPath, '/services/womens-wigs-hairpieces.html')}">Women's Wigs &amp; Custom Sew-Ins</a></li>
            <li><a href="${toRel(relPath, '/guides/byoh-bring-your-own-hair-policy.html')}">Bring Your Own Hair (BYOH) Policy</a></li>
            <li><a href="${toRel(relPath, '/guides/hair-extension-care-guide.html')}">Extension Aftercare Guide</a></li>
          </ul>
        </div>

        <div>
          <h4>Color, Cuts &amp; Smoothing</h4>
          <ul class="footer-links">
            <li><a href="${toRel(relPath, '/services/hair-coloring.html')}">Custom Hair Coloring (Wella/Goldwell)</a></li>
            <li><a href="${toRel(relPath, '/services/non-peroxide-hair-color.html')}">Non-Peroxide &amp; Ammonia-Free Color</a></li>
            <li><a href="${toRel(relPath, '/services/balayage-highlights-ombre.html')}">Balayage, Foil &amp; Cap Highlights</a></li>
            <li><a href="${toRel(relPath, '/services/womens-haircuts-blowouts.html')}">Women's Haircuts &amp; Blowouts</a></li>
            <li><a href="${toRel(relPath, '/services/mens-haircuts-grooming.html')}">Men's Cuts, Color &amp; Waxing</a></li>
            <li><a href="${toRel(relPath, '/services/brazilian-blowout-keratin.html')}">Brazilian Blowout &amp; Keratin</a></li>
            <li><a href="${toRel(relPath, '/services/perms-spiral-waves-crimping.html')}">Perms, Spiral Waves &amp; Crimping</a></li>
            <li><a href="${toRel(relPath, '/services/home-facility-mobile-hairstylist.html')}">Home Visits, Valet &amp; Silver Cleaning</a></li>
          </ul>
        </div>

        <div>
          <h4>Northern VA &amp; DC Service Areas</h4>
          <ul class="footer-links">
            ${LOCATIONS.map((l) => `<li><a href="${toRel(relPath, `/locations/${l.slug}.html`)}">${l.city}</a></li>`).join('\n            ')}
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          &copy; 2008–2026 <strong>Hair Creations by Bruce</strong> (Bruce @ Salon Dyanne). All Rights Reserved.
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:1.35rem;">
          <a href="${toRel(relPath, '/pricing.html')}" style="color:var(--ink-on-dark-muted); text-decoration:none;">Price Menu</a>
          <a href="${toRel(relPath, '/gallery.html')}" style="color:var(--ink-on-dark-muted); text-decoration:none;">Lookbook</a>
          <a href="${toRel(relPath, '/faq.html')}" style="color:var(--ink-on-dark-muted); text-decoration:none;">FAQ</a>
          <a href="${toRel(relPath, '/contact.html')}" style="color:var(--ink-on-dark-muted); text-decoration:none;">Contact &amp; Directions</a>
          <a href="${toRel(relPath, '/sitemap.xml')}" style="color:var(--ink-on-dark-muted); text-decoration:none;">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="${toRel(relPath, '/assets/js/main.js')}" defer></script>
</body>
</html>`;
}

// ============================================================================
// Page Builders
// ============================================================================

const generatedPages = [];

function writePage(relPath, html) {
  const fullPath = path.join(ROOT_DIR, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, html, 'utf8');
  generatedPages.push(relPath);
}

// 1. HOMEPAGE (`index.html`) — Zero duplicate images across the entire page!
function buildHomePage() {
  const relPath = 'index.html';
  const serviceCardsHtml = SERVICES.map(
    (s) => `
      <article class="card">
        <div class="card-media">
          <img src="${toRel(relPath, s.heroImage)}" alt="${s.heroAlt}" loading="lazy" width="640" height="400" />
          <span class="card-badge">${s.priceLabel}</span>
        </div>
        <div class="card-body">
          <h3><a href="${toRel(relPath, `/services/${s.slug}.html`)}" style="text-decoration:none; color:inherit;">${s.shortTitle}</a></h3>
          <p>${s.lead.slice(0, 145)}...</p>
          <div class="card-footer">
            <span class="price-pill">${s.priceLabel}</span>
            <a href="${toRel(relPath, `/services/${s.slug}.html`)}" style="font-weight:700; text-decoration:none;">Explore &rarr;</a>
          </div>
        </div>
      </article>`
  ).join('\n');

  const pricingSummaryHtml = PRICING_CATEGORIES.map(
    (cat) => `
      <div class="pricing-category">
        <h3>${cat.title}</h3>
        <p style="font-size:0.88rem; color:var(--ink-muted); margin-bottom:1.25rem;">${cat.subtitle}</p>
        <ul class="price-list">
          ${cat.items
            .map(
              (item) => `
            <li class="price-row">
              <div>
                <a href="${toRel(relPath, item.link)}" class="price-service-name">${item.name}</a>
                <span class="price-service-desc">${item.desc}</span>
              </div>
              <span class="price-amount">${item.price}</span>
            </li>`
            )
            .join('')}
        </ul>
      </div>`
  ).join('\n');

  const bodyHtml = `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">McLean’s Private Color, Cut &amp; Extension Atelier</span>
          <h1>Bespoke Hair Extensions, Custom Color &amp; Tailored Cuts in McLean, VA</h1>
          <p class="lead-text">
            Welcome to <strong>Hair Creations by Bruce</strong> (<em>Bruce @ Salon Dyanne</em> in the McLean House Condo Building). With over 30 years of experience in McLean and Fairfax, Bruce delivers unhurried, one-on-one Remy hair extensions, dimensional Wella &amp; Goldwell color, Brazilian Blowouts, men’s hair replacement systems, and precision cuts—starting at <strong>6:00 AM Monday through Saturday</strong>.
          </p>
          <div class="hero-actions">
            <a href="tel:+15712133667" class="btn btn-primary">Call (571) 213-3667</a>
            <a href="${toRel(relPath, '/pricing.html')}" class="btn btn-secondary">View 2026 Price Menu</a>
            <a href="${GMB_SHARE_URL}" target="_blank" rel="noopener" class="btn btn-secondary">Google Profile &#8599;</a>
          </div>
          <div class="trust-strip">
            <div class="trust-item">
              <strong>30+ Years</strong>
              <span>Master Stylist in McLean &amp; Fairfax</span>
            </div>
            <div class="trust-item">
              <strong>6am – 3pm</strong>
              <span>Mon–Sat Private Morning Hours</span>
            </div>
            <div class="trust-item">
              <strong>BYOH Welcome</strong>
              <span>Bring Your Own Extensions or Hair System</span>
            </div>
            <div class="trust-item">
              <strong>Studio &amp; Mobile</strong>
              <span>McLean Suite 106 + Home/Facility Visits</span>
            </div>
          </div>
        </div>

        <div class="hero-media">
          <div class="hero-image-frame">
            <img src="${toRel(relPath, '/assets/images/hero-salon.jpg')}" alt="Private luxury styling suite at Hair Creations by Bruce in McLean, Virginia" fetchpriority="high" width="960" height="720" />
          </div>
          <div class="hero-floating-card">
            <div>
              <strong style="display:block; color:var(--ink-primary); font-size:0.92rem;">6800 Fleetwood Rd, Suite 106 &middot; McLean, VA 22101</strong>
              <span style="font-size:0.8125rem; color:var(--ink-muted);">McLean House Condo Building &middot; Free Consultation on Extensions &amp; Systems</span>
            </div>
            <a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Directions &#8599;</a>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section (Preserves legacy #About anchor; uses 2 dedicated non-duplicate studio photos!) -->
    <section id="About" class="section bg-elevated">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">The Independent Studio Difference</span>
          <h2>One-on-One Craftsmanship Without the Big-Salon Markup</h2>
          <p>
            As an independent master stylist at <strong>Salon Dyanne inside the McLean House Condo Building</strong>, Bruce offers something increasingly rare in Northern Virginia: dedicated one-on-one appointments where the master stylist personally handles every step of your haircut, color formulation, extension placement, or hair replacement system.
          </p>
          <p>
            From Brazilian Blowouts, Keratin Smoothing Treatments, and Non-Peroxide Gentle Colors to Copper &amp; Acrylic Micro-Link Extensions, Women’s Wig Sew-Ins, and Men’s Toupee Maintenance, Bruce serves discerning clients across McLean, Tysons Corner, Arlington, Vienna, Great Falls, Falls Church, Fairfax, Reston, Oakton, Washington DC, and Montgomery County.
          </p>
          <ul class="check-list">
            <li><strong>LGBTQ+ Friendly &amp; Inclusive Sanctuary:</strong> A welcoming, private, judgment-free studio environment for every guest.</li>
            <li><strong>Four World-Class Color Houses:</strong> Custom-formulated with Wella Color, Goldwell Colors, L’Oréal Professionnel, and Redken.</li>
            <li><strong>Bring Your Own Hair (BYOH) Friendly:</strong> Have your own Remy hair extensions, wefts, wig, or men’s hairpiece? Bring it in and Bruce will professionally install, blend, and finish it.</li>
            <li><strong>Available for Home &amp; Senior Facilities:</strong> Compassionate mobile visits for homebound clients and senior communities—plus Men’s Personal Valet Services &amp; Expert Sterling Silver Cleaning.</li>
          </ul>
          <div style="display:flex; flex-wrap:wrap; gap:0.85rem;">
            <a href="${toRel(relPath, '/about.html')}" class="btn btn-primary">Read Bruce’s Story</a>
            <a href="${toRel(relPath, '/contact.html')}" class="btn btn-secondary">Schedule a Free Consultation</a>
          </div>
        </div>
        <div class="grid-2">
          <div class="card">
            <div class="card-media">
              <img src="${toRel(relPath, '/assets/images/studio-craftsmanship.jpg')}" alt="Precision scissor cutting and hair artistry at Hair Creations by Bruce" loading="lazy" width="600" height="400" />
            </div>
            <div class="card-body">
              <h3>30+ Years of Precision</h3>
              <p>Every cut, color formula, micro-link bead, and hair system cut-in is executed personally by Bruce—never passed to an assistant.</p>
            </div>
          </div>
          <div class="card">
            <div class="card-media">
              <img src="${toRel(relPath, '/assets/images/about-studio-detail.jpg')}" alt="Minimalist travertine and brass styling console in McLean VA" loading="lazy" width="600" height="400" />
            </div>
            <div class="card-body">
              <h3>Calm Morning Sanctuary</h3>
              <p>Open Monday–Saturday from 6:00 AM to 3:00 PM at McLean House Suite 106 with convenient surface parking steps from the door.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Complete Services Showcase (Preserves legacy #Services anchor; 14 cards with 14 distinct photos!) -->
    <section id="Services" class="section">
      <div class="container">
        <div style="max-width:48rem; margin-bottom:2.75rem;">
          <span class="eyebrow">14 Specialized Salon &amp; Concierge Services</span>
          <h2>Complete Hair Care for Women &amp; Men in McLean, VA</h2>
          <p class="lead-text">
            Hair Creations by Bruce operates strictly by appointment so your session receives undivided focus. Explore our 14 dedicated service pages below for detailed process breakdowns, aftercare advice, and current McLean studio pricing.
          </p>
        </div>
        <div class="grid-3">
          ${serviceCardsHtml}
        </div>
      </div>
    </section>

    <!-- Featured Hair Extensions Studio Spotlight (Preserves legacy #extensions anchor; uses dedicated spotlight-extensions-atelier.jpg!) -->
    <section id="extensions" class="section bg-secondary">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">McLean Hair Extension &amp; Replacement Atelier</span>
          <h2>Remy Hair Extensions, Micro-Links &amp; Non-Surgical Hair Systems</h2>
          <p class="lead-text">
            Whether you want seamless length, damage-free density for fine sides, festive tinsel accents, or an undetectable men’s hair replacement system, Bruce tailors every attachment method to protect your natural hair.
          </p>
          <ul class="check-list">
            <li><strong>Weft Extensions with Micro-Links</strong> — Maximum fullness with zero heat or glue</li>
            <li><strong>Micro-Links (Copper &amp; Acrylic) &amp; Micro-Fusion</strong> — Strand-by-strand 360° natural movement</li>
            <li><strong>All Colors &amp; 4 Signature Textures</strong> — Straight, Curly, Deep Curl, and Italian Wave</li>
            <li><strong>Bring Your Own Hair (BYOH)</strong> — "If you have your own hair, bring it and I will put it in!"</li>
            <li><strong>Men’s &amp; Women’s Hair Systems</strong> — All bases serviced (lace, thin skin, poly, tape/glue, sew-ins)</li>
          </ul>
          <div style="display:flex; flex-wrap:wrap; gap:0.85rem;">
            <a href="${toRel(relPath, '/services/hair-extensions.html')}" class="btn btn-primary">Explore Extensions Studio</a>
            <a href="${toRel(relPath, '/services/mens-hair-systems-toupees.html')}" class="btn btn-secondary">Men’s Hair Systems &amp; Toupees</a>
          </div>
        </div>
        <div>
          <div class="hero-image-frame">
            <img src="${toRel(relPath, '/assets/images/spotlight-extensions-atelier.jpg')}" alt="100% Remy human hair extension bundles in blonde, espresso, caramel, and auburn on a travertine table" loading="lazy" width="800" height="600" />
          </div>
        </div>
      </div>
    </section>

    <!-- Full Transparent Pricing Section -->
    <section id="Pricing" class="section bg-elevated">
      <div class="container">
        <div style="max-width:48rem; margin-bottom:2.75rem;">
          <span class="eyebrow">Transparent McLean Studio Pricing</span>
          <h2>Color, Cut, Extension &amp; Hair System Menu</h2>
          <p class="lead-text">
            Fair, straightforward Northern Virginia pricing with no hidden tier fees. All full-head extension and custom hair replacement services include a complimentary consultation for an exact quote. We accept all major credit cards.
          </p>
        </div>
        <div class="grid-2">
          ${pricingSummaryHtml}
        </div>
      </div>
    </section>

    <!-- Northern Virginia & DC Metro Locations Served -->
    <section class="section">
      <div class="container">
        <div style="max-width:48rem; margin-bottom:2rem;">
          <span class="eyebrow">Serving the Entire DC Metro Region</span>
          <h2>Convenient to McLean, Tysons, Arlington, Vienna &amp; Beyond</h2>
          <p class="lead-text">
            Located at <strong>6800 Fleetwood Road, Suite 106, McLean, VA 22101</strong> (with easy surface parking and early 6:00 AM appointments), our studio serves clients across Northern Virginia, Washington DC, and Maryland:
          </p>
        </div>
        <ul class="location-pills">
          ${LOCATIONS.map((l) => `<li><a href="${toRel(relPath, `/locations/${l.slug}.html`)}">${l.city} &rarr;</a></li>`).join('\n          ')}
        </ul>
      </div>
    </section>
  `;

  writePage(
    relPath,
    renderLayout({
      relPath,
      title: 'Hair Creations by Bruce | Hair Salon, Color & Extensions in McLean, VA',
      metaDescription:
        'Hair Creations by Bruce in McLean, VA (6800 Fleetwood Rd Suite 106). Over 30 years experience in precision haircuts ($45–$85), Wella/Goldwell color, Remy hair extensions, Brazilian Blowouts & men’s hair systems. Open 6am–3pm Mon–Sat.',
      canonicalPath: 'index.html',
      bodyHtml
    })
  );
}

// 2. ABOUT PAGE (`about.html`)
function buildAboutPage() {
  const relPath = 'about.html';
  const bodyHtml = `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Established McLean Master Stylist</span>
          <h1>Meet Bruce: Over Three Decades of Craftsmanship &amp; Care</h1>
          <p class="lead-text">
            Operating out of <strong>Salon Dyanne in the McLean House Condo Building (6800 Fleetwood Rd, Suite 106)</strong>, Bruce has spent more than 30 years helping women and men across McLean, Fairfax, and the greater Washington, DC region look and feel their best.
          </p>
          <div class="hero-actions">
            <a href="tel:+15712133667" class="btn btn-primary">Call Bruce: (571) 213-3667</a>
            <a href="${toRel(relPath, '/contact.html')}" class="btn btn-secondary">Visit McLean House Suite 106</a>
          </div>
        </div>
        <div class="hero-media">
          <div class="hero-image-frame">
            <img src="${toRel(relPath, '/assets/images/studio-craftsmanship.jpg')}" alt="Precision scissor haircutting craftsmanship at Hair Creations by Bruce in McLean Virginia" fetchpriority="high" width="800" height="600" />
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-elevated">
      <div class="container content-layout">
        <article class="prose">
          <h2>Why Clients Stay with Bruce for Decades</h2>
          <p>
            In an era of high-turnover chain salons and impersonal booking apps, <strong>Hair Creations by Bruce</strong> stands apart for personal continuity and technical versatility. When you book an appointment with Bruce, you are never double-booked or handed off to a junior assistant. Every consultation, color formulation, foil placement, extension bead, and razor cut is performed by Bruce himself.
          </p>
          <p>
            Whether you need an executive men’s haircut at 6:00 AM before heading into Tysons or Capitol Hill, a full head of Italian Wave Remy hair extensions, a gentle Non-Peroxide color refresh for a sensitive scalp, or confidential maintenance on a lace or thin-skin men’s hairpiece, Bruce brings patience, honesty, and deep technical mastery to the chair.
          </p>

          <div class="callout-box">
            <h3>Proudly LGBTQ+ Friendly &amp; Human Rights Advocate</h3>
            <p style="margin-bottom:0;">
              Hair Creations by Bruce has proudly displayed its commitment to human rights and LGBTQ+ inclusion for decades. Every guest is welcomed into a warm, respectful, and private studio environment.
            </p>
          </div>

          <h2>Unmatched Range: From Studio Artistry to In-Home Concierge Care</h2>
          <p>
            Bruce’s career spans the full spectrum of classical and modern hairdressing:
          </p>
          <ul class="check-list">
            <li><strong>Multi-Brand Master Colorist:</strong> Experienced with Wella Color, Goldwell Colors, L’Oréal Professionnel, Redken, and Non-Peroxide color systems.</li>
            <li><strong>Extension &amp; Hairpiece Authority:</strong> Skilled in Copper &amp; Acrylic Micro-Links, Beaded Wefts, Micro-Fusion Keratin Bonds, Women’s Wig Sew-Ins, and Men’s Non-Surgical Hair Systems of all base designs.</li>
            <li><strong>Early Bird Schedule (Mon–Sat 6:00 AM – 3:00 PM):</strong> Ideal for busy Northern Virginia professionals who prefer quiet morning appointments.</li>
            <li><strong>Home, Senior Facility &amp; Hospital Visits:</strong> Bringing compassionate haircare directly to homebound clients and senior residences across McLean and Fairfax County.</li>
            <li><strong>Men’s Personal Valet &amp; Expert Sterling Silver Cleaner:</strong> A unique old-world specialty—restoring fine sterling silver tea services, flatware, and heirlooms alongside personal valet services.</li>
          </ul>
        </article>

        <aside class="sidebar-sticky">
          <div class="sidebar-card">
            <h3>Studio Quick Facts</h3>
            <p><strong>Location:</strong><br />Bruce @ Salon Dyanne<br />McLean House Condo Building<br />6800 Fleetwood Rd, Suite 106<br />McLean, VA 22101</p>
            <p><strong>Hours:</strong><br />Monday – Saturday: 6:00 AM – 3:00 PM<br /><em>By Appointment Only</em></p>
            <p><strong>Phone:</strong> <a href="tel:+15712133667">(571) 213-3667</a><br /><strong>Email:</strong> <a href="mailto:Sambru703@aol.com">Sambru703@aol.com</a></p>
            <p><strong>Languages Spoken:</strong> English</p>
            <p><strong>Payments:</strong> All Major Credit Cards Accepted</p>
            <a href="${GMB_SHARE_URL}" target="_blank" rel="noopener" class="btn btn-primary" style="width:100%;">View Google Profile &#8599;</a>
          </div>
        </aside>
      </div>
    </section>
  `;

  writePage(
    relPath,
    renderLayout({
      relPath,
      title: 'About Bruce | 30+ Years Hair Stylist & Extension Specialist in McLean, VA',
      metaDescription:
        'Learn about Bruce at Hair Creations by Bruce (Salon Dyanne, McLean House Suite 106, McLean VA). Over 30 years of experience in extensions, color, men’s hair systems, and home visits.',
      canonicalPath: relPath,
      ogImage: '/assets/images/studio-craftsmanship.jpg',
      breadcrumbs: [{ label: 'About Bruce', path: relPath }],
      bodyHtml
    })
  );
}

// 3. SERVICES DIRECTORY PAGE (`services.html`)
function buildServicesDirectoryPage() {
  const relPath = 'services.html';
  const cardsHtml = SERVICES.map(
    (s, idx) => `
      <article class="card" data-filter-category="${s.category}">
        <div class="card-media">
          <img src="${toRel(relPath, s.heroImage)}" alt="${s.heroAlt}" ${idx === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} width="640" height="400" />
          <span class="card-badge">${s.priceLabel}</span>
        </div>
        <div class="card-body">
          <h2 style="font-size:1.45rem; margin-bottom:0.5rem;"><a href="${toRel(relPath, `/services/${s.slug}.html`)}" style="text-decoration:none; color:inherit;">${s.shortTitle}</a></h2>
          <p>${s.lead}</p>
          <ul class="check-list" style="font-size:0.88rem;">
            ${s.highlights.slice(0, 2).map((h) => `<li>${h}</li>`).join('')}
          </ul>
          <div class="card-footer">
            <span class="price-pill">${s.priceLabel}</span>
            <a href="${toRel(relPath, `/services/${s.slug}.html`)}" style="font-weight:700; text-decoration:none;">Full Details &rarr;</a>
          </div>
        </div>
      </article>`
  ).join('\n');

  const bodyHtml = `
    <section class="section">
      <div class="container">
        <span class="eyebrow">Complete Service Menu &amp; Specialties</span>
        <h1>Hair Salon, Color, Extension &amp; Replacement Services in McLean, VA</h1>
        <p class="lead-text">
          Filter our 14 specialized services below or select any service for an in-depth guide, FAQs, and current McLean studio pricing.
        </p>

        <div class="filter-bar" role="toolbar" aria-label="Filter services by category">
          <button type="button" class="filter-btn" data-filter-btn="all" aria-pressed="true">All Services (14)</button>
          <button type="button" class="filter-btn" data-filter-btn="extensions" aria-pressed="false">Extensions &amp; Wigs (5)</button>
          <button type="button" class="filter-btn" data-filter-btn="color" aria-pressed="false">Color &amp; Highlights (3)</button>
          <button type="button" class="filter-btn" data-filter-btn="mens" aria-pressed="false">Men's Cuts &amp; Systems (2)</button>
          <button type="button" class="filter-btn" data-filter-btn="cuts" aria-pressed="false">Women's Cuts &amp; Blowouts (1)</button>
          <button type="button" class="filter-btn" data-filter-btn="smoothing" aria-pressed="false">Keratin &amp; Perms (2)</button>
          <button type="button" class="filter-btn" data-filter-btn="concierge" aria-pressed="false">Home Visits &amp; Valet (1)</button>
        </div>

        <div class="grid-3">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;

  writePage(
    relPath,
    renderLayout({
      relPath,
      title: 'Our Services | Hair Extensions, Color, Cuts & Men’s Hair Systems in McLean, VA',
      metaDescription:
        'Explore all 14 hair salon services at Hair Creations by Bruce in McLean, VA: Remy hair extensions, Micro-Links, Micro-Fusion, Wella/Goldwell color, Brazilian Blowouts, perms, wigs & men’s hair systems.',
      canonicalPath: relPath,
      breadcrumbs: [{ label: 'Services', path: relPath }],
      bodyHtml
    })
  );
}

// 4. PRICING PAGE (`pricing.html`)
function buildPricingPage() {
  const relPath = 'pricing.html';
  const categoriesHtml = PRICING_CATEGORIES.map(
    (cat) => `
      <div class="pricing-category">
        <h2>${cat.title}</h2>
        <p style="color:var(--ink-muted); margin-bottom:1.25rem; font-size:0.9rem;">${cat.subtitle}</p>
        <ul class="price-list">
          ${cat.items
            .map(
              (item) => `
            <li class="price-row">
              <div>
                <a href="${toRel(relPath, item.link)}" class="price-service-name">${item.name}</a>
                <span class="price-service-desc">${item.desc}</span>
              </div>
              <span class="price-amount">${item.price}</span>
            </li>`
            )
            .join('')}
        </ul>
      </div>`
  ).join('\n');

  const bodyHtml = `
    <section class="section">
      <div class="container">
        <span class="eyebrow">2026 McLean Studio Price Guide</span>
        <h1>Transparent Salon Pricing &amp; Free Extension Consultations</h1>
        <p class="lead-text">
          At Hair Creations by Bruce, we believe in honest, straightforward Northern Virginia pricing. Below is our current studio menu at <strong>McLean House Suite 106 (6800 Fleetwood Rd, McLean, VA)</strong>. For full-head extensions, custom hair systems, and corrective color, we provide a complimentary consultation so you receive an exact quote before we begin.
        </p>

        <div class="grid-2" style="margin-top:2.5rem;">
          ${categoriesHtml}
        </div>

        <div class="callout-box" style="margin-top:3rem;">
          <h3>Bring Your Own Hair (BYOH) &amp; Consultation Policy</h3>
          <p style="margin-bottom:0.5rem;">
            <strong>Have your own extensions or hairpiece?</strong> If you already have your own 100% Remy hair bundles, wefts, micro-link tips, women’s wig, or men’s toupee/hair system, bring it with you and Bruce will professionally install, blend, and style it!
          </p>
          <p style="margin-bottom:0;">
            <strong>Payment Methods:</strong> For your convenience, we accept all major credit cards (Visa, MasterCard, American Express, Discover) as well as cash. Appointments appreciated: call <a href="tel:+15712133667">(571) 213-3667</a>.
          </p>
        </div>
      </div>
    </section>
  `;

  writePage(
    relPath,
    renderLayout({
      relPath,
      title: 'Salon Price List | Haircuts, Color, Extensions & Men’s Hair Systems in McLean, VA',
      metaDescription:
        'Updated 2026 price list for Hair Creations by Bruce in McLean, VA. Men’s Haircuts ($45), Women’s Cut & Finish ($85), Single Color ($110+), Cut & Color ($165+), Brazilian Blowout ($250+), Toupee Maintenance ($95).',
      canonicalPath: relPath,
      breadcrumbs: [{ label: 'Pricing', path: relPath }],
      bodyHtml
    })
  );
}

// 5. GALLERY PAGE (`gallery.html`) — 18 100% unique high-resolution photographs!
function buildGalleryPage() {
  const relPath = 'gallery.html';
  const galleryItems = [
    {
      img: '/assets/images/hero-salon.jpg',
      title: 'Private Suite at McLean House (Suite 106)',
      cat: 'studio',
      desc: 'Calm, sunlit one-on-one styling suite at 6800 Fleetwood Rd, McLean, VA.'
    },
    {
      img: '/assets/images/service-extensions.jpg',
      title: '100% Remy Hair Extensions — Italian Wave',
      cat: 'extensions',
      desc: 'Seamless volume and length custom color-matched in chestnut and honey caramel.'
    },
    {
      img: '/assets/images/service-microfusion.jpg',
      title: 'Micro-Fusion Golden Blonde Extensions',
      cat: 'extensions',
      desc: 'Strand-by-strand invisible keratin bonds with natural 360-degree movement.'
    },
    {
      img: '/assets/images/spotlight-extensions-atelier.jpg',
      title: 'Custom Color-Matched Remy Hair Bundles',
      cat: 'extensions',
      desc: 'Straight, Curly, Deep Curl, and Italian Wave textures—order custom or Bring Your Own Hair (BYOH).'
    },
    {
      img: '/assets/images/service-balayage.jpg',
      title: 'Sun-Kissed Dimensional Balayage & Gloss',
      cat: 'color',
      desc: 'Hand-painted highlights formulated with Wella and Redken Shades EQ gloss ($225+).'
    },
    {
      img: '/assets/images/gallery-ombre-waves.jpg',
      title: 'Espresso-to-Bronze Ombré Waves',
      cat: 'color',
      desc: 'Seamless root-melt ombré transition with mirror-like conditioning shine.'
    },
    {
      img: '/assets/images/service-mens-cut.jpg',
      title: "Executive Men's Scissor Cut & Gray Blending",
      cat: 'mens',
      desc: 'Precision tailored cut ($45) paired with natural demi-permanent temple blending ($75).'
    },
    {
      img: '/assets/images/service-keratin-blowout.jpg',
      title: 'Brazilian Blowout Mirror-Shine Finish',
      cat: 'smoothing',
      desc: '12 weeks of humidity-proof smoothness and effortless daily styling ($250+).'
    },
    {
      img: '/assets/images/service-mens-system.jpg',
      title: "Undetectable Men's Hair Replacement System",
      cat: 'mens',
      desc: 'Custom skin/lace hair system applied and razor-blended into natural sides ($125–$165).'
    },
    {
      img: '/assets/images/service-microlinks.jpg',
      title: 'Copper & Acrylic Micro-Link Weft Installation',
      cat: 'extensions',
      desc: 'Zero-heat, zero-glue beaded extension craftsmanship with $95/hr tightening maintenance.'
    },
    {
      img: '/assets/images/service-extension-maintenance.jpg',
      title: 'Extension Removal & Restorative Scalp Ritual',
      cat: 'extensions',
      desc: 'Safe, damage-free extension removal ($85+), detangling, and deep conditioning.'
    },
    {
      img: '/assets/images/service-non-peroxide-color.jpg',
      title: 'Non-Peroxide Luminous Auburn Color',
      cat: 'color',
      desc: 'Gentle, ammonia-free and peroxide-free vibrant color safe for sensitive scalps ($125+).'
    },
    {
      img: '/assets/images/service-womens-cut.jpg',
      title: "Women's Layered Haircut & Signature Blowout",
      cat: 'cuts',
      desc: 'Face-framing layers and bouncy round-brush finish ($85).'
    },
    {
      img: '/assets/images/studio-craftsmanship.jpg',
      title: 'Bespoke Scissor & Razor Cutting Artistry',
      cat: 'cuts',
      desc: 'Over 30 years of master haircutting tailored to your natural growth pattern.'
    },
    {
      img: '/assets/images/service-wigs-systems.jpg',
      title: "Custom Women's Wigs, Toppers & Sew-Ins",
      cat: 'extensions',
      desc: 'Dignified, private fitting, hairline customization, and secure attachment ($120+).'
    },
    {
      img: '/assets/images/service-spiral-perm.jpg',
      title: 'Hydrated Spiral Perm & Defined Curls',
      cat: 'smoothing',
      desc: 'Springy, conditioned spiral waves and permanent texture styling ($165+).'
    },
    {
      img: '/assets/images/color-bar-products.jpg',
      title: 'Wella, Goldwell, L’Oréal & Redken Color Bar',
      cat: 'color',
      desc: 'Four premier professional color houses custom-mixed for your hair structure.'
    },
    {
      img: '/assets/images/about-studio-detail.jpg',
      title: 'Sunlit Travertine & Brass Atelier Details',
      cat: 'studio',
      desc: 'Quiet, private morning appointments from 6:00 AM to 3:00 PM Monday–Saturday.'
    },
    {
      img: '/assets/images/service-mobile-concierge.jpg',
      title: 'In-Home & Senior Facility Concierge Visits',
      cat: 'studio',
      desc: 'Bringing salon haircuts, styling, and grooming directly to McLean & NoVA homes.'
    }
  ];

  const bodyHtml = `
    <section class="section">
      <div class="container">
        <span class="eyebrow">Salon Lookbook &amp; Studio Portfolio</span>
        <h1>Hair Extensions, Color, Cuts &amp; Hair Systems Lookbook</h1>
        <p class="lead-text">
          Explore signature looks and studio highlights from <strong>Hair Creations by Bruce</strong> in McLean, Virginia. Filter by service category below:
        </p>

        <div class="filter-bar" role="toolbar" aria-label="Filter gallery images">
          <button type="button" class="filter-btn" data-filter-btn="all" aria-pressed="true">All Photos (${galleryItems.length})</button>
          <button type="button" class="filter-btn" data-filter-btn="extensions" aria-pressed="false">Extensions &amp; Wigs</button>
          <button type="button" class="filter-btn" data-filter-btn="color" aria-pressed="false">Color &amp; Balayage</button>
          <button type="button" class="filter-btn" data-filter-btn="cuts" aria-pressed="false">Women's Cuts</button>
          <button type="button" class="filter-btn" data-filter-btn="mens" aria-pressed="false">Men's Cuts &amp; Systems</button>
          <button type="button" class="filter-btn" data-filter-btn="smoothing" aria-pressed="false">Keratin &amp; Perms</button>
          <button type="button" class="filter-btn" data-filter-btn="studio" aria-pressed="false">McLean Studio &amp; Concierge</button>
        </div>

        <div class="grid-3">
          ${galleryItems
            .map(
              (item, idx) => `
            <figure class="card" style="margin:0;" data-filter-category="${item.cat}">
              <div class="card-media">
                <img src="${toRel(relPath, item.img)}" alt="${item.title} — ${item.desc}" ${idx === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} width="640" height="400" />
              </div>
              <figcaption class="card-body">
                <h2 style="font-size:1.3rem; margin-bottom:0.4rem;">${item.title}</h2>
                <p style="margin-bottom:0; font-size:0.9rem;">${item.desc}</p>
              </figcaption>
            </figure>`
            )
            .join('\n')}
        </div>
      </div>
    </section>
  `;

  writePage(
    relPath,
    renderLayout({
      relPath,
      title: 'Lookbook & Photo Gallery | Hair Creations by Bruce in McLean, VA',
      metaDescription:
        'Browse photos of Remy hair extensions, micro-links, balayage highlights, Brazilian Blowouts, men’s hair replacement systems, and our private McLean House studio.',
      canonicalPath: relPath,
      breadcrumbs: [{ label: 'Lookbook', path: relPath }],
      bodyHtml
    })
  );
}

// 6. CONTACT & BOOKING PAGE (`contact.html`)
function buildContactPage() {
  const relPath = 'contact.html';
  const bodyHtml = `
    <section class="section">
      <div class="container">
        <span class="eyebrow">Appointments Only &middot; Mon–Sat 6:00 AM – 3:00 PM</span>
        <h1>Contact Bruce &amp; Request an Appointment in McLean, VA</h1>
        <p class="lead-text">
          Have a question about hair extensions, color matching, men’s hair systems, or in-home visits? Call Bruce directly at <a href="tel:+15712133667"><strong>(571) 213-3667</strong></a>, email <a href="mailto:Sambru703@aol.com"><strong>Sambru703@aol.com</strong></a>, or use the quick request builder below.
        </p>

        <div class="content-layout" style="margin-top:2.5rem;">
          <div class="pricing-category">
            <h2>Request an Appointment or Free Consultation</h2>
            <p style="color:var(--ink-muted); font-size:0.92rem;">
              Fill out your preferences below to generate a pre-formatted appointment request email directly to Bruce, or call <a href="tel:+15712133667">(571) 213-3667</a> for immediate scheduling.
            </p>
            <form id="appointment-request-form">
              <div class="grid-2" style="gap:1rem;">
                <div class="form-group">
                  <label class="form-label" for="clientName">Your Name *</label>
                  <input class="form-control" type="text" id="clientName" name="clientName" required placeholder="Jane Doe" />
                </div>
                <div class="form-group">
                  <label class="form-label" for="clientPhone">Phone Number *</label>
                  <input class="form-control" type="tel" id="clientPhone" name="clientPhone" required placeholder="(703) 555-0199" />
                </div>
              </div>

              <div class="grid-2" style="gap:1rem;">
                <div class="form-group">
                  <label class="form-label" for="serviceType">Interested Service *</label>
                  <select class="form-control" id="serviceType" name="serviceType">
                    <option value="Free Hair Extensions Consultation">Free Hair Extensions Consultation</option>
                    <option value="Bring Your Own Hair (BYOH) Extension Install ($250+)">Bring Your Own Hair (BYOH) Extension Install ($250+)</option>
                    <option value="Micro-Link Tightening Maintenance ($95/hr)">Micro-Link Tightening Maintenance ($95/hr)</option>
                    <option value="Haircut & Custom Color Finish ($165+)">Haircut &amp; Custom Color Finish ($165+)</option>
                    <option value="Women's Single-Process Color Only ($110+)">Women's Single-Process Color Only ($110+)</option>
                    <option value="Balayage / Full Highlights & Finish ($225+)">Balayage / Full Highlights &amp; Finish ($225+)</option>
                    <option value="Partial Highlights & Finish ($145+)">Partial Highlights &amp; Finish ($145+)</option>
                    <option value="Non-Peroxide Gentle Hair Color ($125+)">Non-Peroxide Gentle Hair Color ($125+)</option>
                    <option value="Women's Haircut & Blowout ($85)">Women's Haircut &amp; Blowout ($85)</option>
                    <option value="Shampoo & Signature Blowout ($55)">Shampoo &amp; Signature Blowout ($55)</option>
                    <option value="Men's Precision Haircut ($45)">Men's Precision Haircut ($45)</option>
                    <option value="Men's Gray Blending Color & Finish ($75)">Men's Gray Blending Color &amp; Finish ($75)</option>
                    <option value="Men's Hair System Application w/ Cut ($125–$165)">Men's Hair System Application w/ Cut ($125–$165)</option>
                    <option value="Men's Toupee Maintenance ($95)">Men's Toupee Maintenance ($95)</option>
                    <option value="Women's Wig Fitting / Custom Sew-In ($120+)">Women's Wig Fitting / Custom Sew-In ($120+)</option>
                    <option value="Brazilian Blowout / Keratin Smoothing ($250+)">Brazilian Blowout / Keratin Smoothing ($250+)</option>
                    <option value="Perm / Spiral Waves with Finish ($165+)">Perm / Spiral Waves with Finish ($165+)</option>
                    <option value="In-Home / Senior Facility Visit">In-Home / Senior Facility Visit</option>
                    <option value="Men's Valet / Sterling Silver Cleaning">Men's Valet / Sterling Silver Cleaning</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label" for="visitType">Appointment Location</label>
                  <select class="form-control" id="visitType" name="visitType">
                    <option value="In-Studio (McLean House Suite 106)">In-Studio (McLean House Suite 106)</option>
                    <option value="In-Home / Residence Visit">In-Home / Residence Visit</option>
                    <option value="Senior Living / Assisted Living / Hospital">Senior Living / Assisted Living / Hospital</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="preferredDay">Preferred Day &amp; Morning Window (Mon–Sat, 6:00 AM – 3:00 PM)</label>
                <input class="form-control" type="text" id="preferredDay" name="preferredDay" placeholder="e.g., Tuesday or Thursday around 7:30 AM" />
              </div>

              <div class="form-group">
                <label class="form-label" for="notes">Questions or Hair Details (Optional)</label>
                <textarea class="form-control" id="notes" name="notes" rows="3" placeholder="Tell Bruce about your hair goals, current color, or whether you are bringing your own hair..."></textarea>
              </div>

              <button type="submit" class="btn btn-primary">Send Appointment Request to Bruce</button>
              <div id="booking-form-status" class="callout-box" hidden style="margin-top:1rem; margin-bottom:0;"></div>
            </form>
          </div>

          <aside>
            <div class="sidebar-card">
              <h3>Studio Address &amp; Directions</h3>
              <p>
                <strong>Hair Creations by Bruce</strong><br />
                Bruce @ Salon Dyanne<br />
                <strong>McLean House Condo Building</strong><br />
                6800 Fleetwood Rd, Suite 106<br />
                McLean, VA 22101
              </p>
              <p>
                <strong>Phone:</strong> <a href="tel:+15712133667">(571) 213-3667</a><br />
                <strong>Email:</strong> <a href="mailto:Sambru703@aol.com">Sambru703@aol.com</a>
              </p>
              <p>
                <strong>Studio Hours:</strong><br />
                Monday – Saturday: 6:00 AM – 3:00 PM<br />
                Sunday: Closed<br />
                <em>Appointments Only</em>
              </p>
              <div style="display:flex; flex-direction:column; gap:0.65rem; margin-top:1.25rem;">
                <a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener" class="btn btn-primary">Open in Google Maps &#8599;</a>
                <a href="${GMB_SHARE_URL}" target="_blank" rel="noopener" class="btn btn-secondary">View Google Business Profile &#8599;</a>
              </div>
            </div>

            <div class="sidebar-card">
              <h3>Parking &amp; Arrival at McLean House</h3>
              <p style="margin-bottom:0;">
                The <strong>McLean House Condo Building</strong> is located at 6800 Fleetwood Road, just off Old Dominion Drive and Chain Bridge Road in downtown McLean. Convenient visitor parking is available at the building, and Suite 106 (Salon Dyanne) provides easy ground-floor access.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;

  writePage(
    relPath,
    renderLayout({
      relPath,
      title: 'Contact & Directions | Hair Creations by Bruce in McLean, VA (6800 Fleetwood Rd)',
      metaDescription:
        'Book an appointment with Hair Creations by Bruce at McLean House (6800 Fleetwood Rd Suite 106, McLean, VA 22101). Call (571) 213-3667 or email Sambru703@aol.com. Open Mon–Sat 6am–3pm.',
      canonicalPath: relPath,
      breadcrumbs: [{ label: 'Contact & Directions', path: relPath }],
      bodyHtml
    })
  );
}

// 7. INDIVIDUAL SERVICE PAGES (14 Pages in `services/*.html`)
function buildServiceDetailPages() {
  SERVICES.forEach((service) => {
    const relPath = `services/${service.slug}.html`;
    const relatedServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.metaDescription,
      provider: {
        '@id': `${SITE_URL}/#salon`
      },
      areaServed: {
        '@type': 'City',
        name: 'McLean, VA'
      }
    };

    const faqSchema =
      service.faqs && service.faqs.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: service.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.a
              }
            }))
          }
        : null;

    const bodyHtml = `
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <span class="eyebrow">${service.priceLabel} &middot; McLean House Suite 106</span>
            <h1>${service.title}</h1>
            <p class="lead-text">${service.lead}</p>
            <div class="hero-actions">
              <a href="tel:+15712133667" class="btn btn-primary">Call (571) 213-3667 to Book</a>
              <a href="${toRel(relPath, '/contact.html')}" class="btn btn-secondary">Request Appointment Online</a>
            </div>
          </div>
          <div class="hero-media">
            <div class="hero-image-frame">
              <img src="${toRel(relPath, service.heroImage)}" alt="${service.heroAlt}" fetchpriority="high" width="800" height="600" />
            </div>
          </div>
        </div>
      </section>

      <section class="section bg-elevated">
        <div class="container content-layout">
          <article class="prose">
            <h2>Key Highlights of Our ${service.shortTitle} Service</h2>
            <ul class="check-list">
              ${service.highlights.map((h) => `<li>${h}</li>`).join('\n              ')}
            </ul>

            ${service.sections
              .map(
                (sec) => `
              <h2>${sec.heading}</h2>
              ${sec.body.map((p) => `<p>${p}</p>`).join('\n              ')}
            `
              )
              .join('\n')}

            <div class="callout-box">
              <h3>Book Your ${service.shortTitle} Appointment in McLean</h3>
              <p style="margin-bottom:0;">
                Bruce operates by appointment Monday through Saturday from <strong>6:00 AM to 3:00 PM</strong> at <strong>6800 Fleetwood Rd, Suite 106, McLean, VA 22101</strong> (and is available for home &amp; facility visits). Call <a href="tel:+15712133667">(571) 213-3667</a> or email <a href="mailto:Sambru703@aol.com">Sambru703@aol.com</a>.
              </p>
            </div>

            ${
              service.faqs && service.faqs.length > 0
                ? `
              <h2 style="margin-top:2.5rem;">Frequently Asked Questions</h2>
              <div class="faq-list">
                ${service.faqs
                  .map(
                    (f) => `
                  <details class="faq-item" open>
                    <summary>${f.q}</summary>
                    <div class="faq-answer"><p style="margin:0;">${f.a}</p></div>
                  </details>`
                  )
                  .join('')}
              </div>`
                : ''
            }
          </article>

          <aside class="sidebar-sticky">
            <div class="sidebar-card">
              <h3>Service Summary</h3>
              <p><strong>Service:</strong> ${service.shortTitle}</p>
              <p><strong>Pricing:</strong> <span class="price-pill">${service.priceLabel}</span></p>
              <p><strong>Studio:</strong> Bruce @ Salon Dyanne, McLean House Suite 106</p>
              <p><strong>Hours:</strong> Mon–Sat 6:00 AM – 3:00 PM</p>
              <a href="tel:+15712133667" class="btn btn-primary" style="width:100%; margin-bottom:0.65rem;">Call (571) 213-3667</a>
              <a href="${toRel(relPath, '/pricing.html')}" class="btn btn-secondary" style="width:100%;">Full Salon Price Menu</a>
            </div>

            <div class="sidebar-card">
              <h4>Explore Related Services</h4>
              <ul class="footer-links" style="color:var(--ink-primary);">
                ${relatedServices
                  .map(
                    (rs) =>
                      `<li style="margin-bottom:0.6rem;"><a href="${toRel(relPath, `/services/${rs.slug}.html`)}" style="color:var(--ink-primary); font-weight:600;">${rs.shortTitle} (${rs.priceLabel}) &rarr;</a></li>`
                  )
                  .join('\n                ')}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    `;

    writePage(
      relPath,
      renderLayout({
        relPath,
        title: `${service.title} | Hair Creations by Bruce`,
        metaDescription: service.metaDescription,
        canonicalPath: relPath,
        ogImage: service.heroImage,
        breadcrumbs: [
          { label: 'Services', path: 'services.html' },
          { label: service.shortTitle, path: relPath }
        ],
        extraJsonLd: [serviceSchema, ...(faqSchema ? [faqSchema] : [])],
        bodyHtml
      })
    );
  });
}

// 8. LOCATION PAGES (10 Pages in `locations/*.html`)
function buildLocationPages() {
  LOCATIONS.forEach((loc) => {
    const relPath = `locations/${loc.slug}.html`;
    const otherLocations = LOCATIONS.filter((l) => l.slug !== loc.slug);

    const bodyHtml = `
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <span class="eyebrow">${loc.driveTime}</span>
            <h1>Hair Salon, Color &amp; Extensions Serving ${loc.city}</h1>
            <p class="lead-text">${loc.lead}</p>
            <div class="hero-actions">
              <a href="tel:+15712133667" class="btn btn-primary">Call (571) 213-3667</a>
              <a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener" class="btn btn-secondary">Directions to McLean Studio &#8599;</a>
            </div>
          </div>
          <div class="hero-media">
            <div class="hero-image-frame">
              <img src="${toRel(relPath, loc.heroImage)}" alt="Hair Creations by Bruce serving clients in ${loc.city}" fetchpriority="high" width="800" height="600" />
            </div>
          </div>
        </div>
      </section>

      <section class="section bg-elevated">
        <div class="container content-layout">
          <article class="prose">
            <h2>Why Clients from ${loc.shortName} Choose Hair Creations by Bruce</h2>
            ${loc.localContext.map((p) => `<p>${p}</p>`).join('\n            ')}

            <div class="callout-box">
              <h3>Easy Driving Route from ${loc.shortName} to 6800 Fleetwood Rd</h3>
              <p style="margin-bottom:0.5rem;"><strong>Route:</strong> ${loc.routeSummary}</p>
              <p style="margin-bottom:0;"><strong>Neighborhoods Served:</strong> ${loc.neighborhoods}</p>
            </div>

            <h2>Popular Salon &amp; Mobile Services for ${loc.shortName} Residents</h2>
            <ul class="check-list">
              <li><a href="${toRel(relPath, '/services/hair-extensions.html')}"><strong>100% Remy Hair Extensions &amp; BYOH Installation:</strong></a> Micro-Links, Wefts, and Micro-Fusion bonds in Straight, Curly, Deep Curl, and Italian Wave.</li>
              <li><a href="${toRel(relPath, '/services/hair-coloring.html')}"><strong>Custom Wella, Goldwell, L’Oréal &amp; Redken Color:</strong></a> Single-process color ($110+), Cut &amp; Color Finish ($165+), and Non-Peroxide gentle color ($125+).</li>
              <li><a href="${toRel(relPath, '/services/balayage-highlights-ombre.html')}"><strong>Balayage &amp; Dimensional Highlights:</strong></a> Partial highlights ($145+) and full-head hand-painted balayage or foils ($225+).</li>
              <li><a href="${toRel(relPath, '/services/mens-hair-systems-toupees.html')}"><strong>Confidential Men’s Hair Systems &amp; Toupees:</strong></a> Application with cut-in ($125–$165) and $95 maintenance visits—bring your own unit or order custom.</li>
              <li><a href="${toRel(relPath, '/services/mens-haircuts-grooming.html')}"><strong>Men’s Precision Haircuts ($45) &amp; Women’s Cut + Blowout ($85):</strong></a> Open at 6:00 AM Mon–Sat for effortless pre-commute scheduling.</li>
              <li><a href="${toRel(relPath, '/services/home-facility-mobile-hairstylist.html')}"><strong>In-Home &amp; Assisted Living Visits in ${loc.shortName}:</strong></a> Mobile haircare, Men’s Personal Valet Services, and Expert Sterling Silver Cleaning.</li>
            </ul>
          </article>

          <aside class="sidebar-sticky">
            <div class="sidebar-card">
              <h3>Visit Our McLean Studio</h3>
              <p>
                <strong>Hair Creations by Bruce</strong><br />
                Bruce @ Salon Dyanne<br />
                McLean House Condo Building<br />
                6800 Fleetwood Rd, Suite 106<br />
                McLean, VA 22101
              </p>
              <p><strong>Hours:</strong> Mon–Sat 6:00 AM – 3:00 PM</p>
              <p><strong>Phone:</strong> <a href="tel:+15712133667">(571) 213-3667</a></p>
              <a href="${toRel(relPath, '/contact.html')}" class="btn btn-primary" style="width:100%;">Request Appointment</a>
            </div>

            <div class="sidebar-card">
              <h4>Other Nearby Communities</h4>
              <ul class="footer-links">
                ${otherLocations
                  .map(
                    (ol) =>
                      `<li style="margin-bottom:0.45rem;"><a href="${toRel(relPath, `/locations/${ol.slug}.html`)}" style="color:var(--ink-primary); font-weight:600;">${ol.city} &rarr;</a></li>`
                  )
                  .join('\n                ')}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    `;

    writePage(
      relPath,
      renderLayout({
        relPath,
        title: `Hair Salon & Extension Studio Serving ${loc.city} | Hair Creations by Bruce`,
        metaDescription: loc.metaDescription,
        canonicalPath: relPath,
        ogImage: loc.heroImage,
        breadcrumbs: [
          { label: 'Service Areas', path: 'locations/mclean-va.html' },
          { label: loc.city, path: relPath }
        ],
        bodyHtml
      })
    );
  });
}

// 9. CLIENT GUIDE PAGES (4 Pages in `guides/*.html`) + FAQ PAGE (`faq.html`)
function buildGuideAndFaqPages() {
  GUIDES.forEach((guide) => {
    const relPath = `guides/${guide.slug}.html`;
    const bodyHtml = `
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <span class="eyebrow">Client Education Guide &middot; ${guide.readTime}</span>
            <h1>${guide.title}</h1>
            <p class="lead-text">${guide.lead}</p>
            <div class="hero-actions">
              <a href="tel:+15712133667" class="btn btn-primary">Ask Bruce a Question: (571) 213-3667</a>
              <a href="${toRel(relPath, '/services.html')}" class="btn btn-secondary">Explore Salon Services</a>
            </div>
          </div>
          <div class="hero-media">
            <div class="hero-image-frame">
              <img src="${toRel(relPath, guide.heroImage)}" alt="${guide.title}" fetchpriority="high" width="800" height="600" />
            </div>
          </div>
        </div>
      </section>

      <section class="section bg-elevated">
        <div class="container content-layout">
          <article class="prose">
            ${guide.sections
              .map(
                (sec) => `
              <h2>${sec.heading}</h2>
              ${sec.body.map((p) => `<p>${p}</p>`).join('\n              ')}
            `
              )
              .join('\n')}

            <div class="callout-box">
              <h3>Have Questions About Your Specific Hair Type?</h3>
              <p style="margin-bottom:0;">
                Every client’s hair texture and lifestyle are unique. Call Bruce at <a href="tel:+15712133667">(571) 213-3667</a> or stop by <strong>McLean House Suite 106 (6800 Fleetwood Rd, McLean, VA)</strong> for a complimentary consultation.
              </p>
            </div>
          </article>

          <aside class="sidebar-sticky">
            <div class="sidebar-card">
              <h3>More Client Guides</h3>
              <ul class="footer-links">
                ${GUIDES.map(
                  (g) =>
                    `<li style="margin-bottom:0.6rem;"><a href="${toRel(relPath, `/guides/${g.slug}.html`)}" style="color:var(--ink-primary); font-weight:600;">${g.shortTitle} &rarr;</a></li>`
                ).join('\n                ')}
                <li><a href="${toRel(relPath, '/faq.html')}" style="color:var(--ink-primary); font-weight:600;">Frequently Asked Questions &rarr;</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    `;

    writePage(
      relPath,
      renderLayout({
        relPath,
        title: `${guide.title} | Hair Creations by Bruce McLean, VA`,
        metaDescription: guide.metaDescription,
        canonicalPath: relPath,
        ogImage: guide.heroImage,
        breadcrumbs: [
          { label: 'Guides & FAQ', path: 'faq.html' },
          { label: guide.shortTitle, path: relPath }
        ],
        bodyHtml
      })
    );
  });

  // 35th Page: FAQ Page (`faq.html`)
  const faqRelPath = 'faq.html';
  const allFaqs = [
    {
      q: 'Where is Hair Creations by Bruce located and where do I park?',
      a: 'We are located inside the McLean House Condo Building (Bruce @ Salon Dyanne) at 6800 Fleetwood Rd, Suite 106, McLean, VA 22101. Convenient surface visitor parking is available right at the building in downtown McLean.'
    },
    {
      q: 'What are Bruce’s hours and do I need an appointment?',
      a: 'Bruce operates by appointment only Monday through Saturday from 6:00 AM to 3:00 PM. Our early 6:00 AM opening is ideal for executives, commuters, and clients who want a quiet morning appointment before work.'
    },
    {
      q: 'Can I bring my own hair extensions or men’s hair system for Bruce to install?',
      a: 'Yes! "If you have your own hair, bring it and I will put it in." Bruce installs client-supplied 100% Remy extensions (BYOH installation starting at $250+), women’s wigs ($120+), and men’s hair replacement systems of all base types ($125–$165 with cut-in).'
    },
    {
      q: 'What professional hair color brands do you use?',
      a: 'We formulate with Wella Color, Goldwell Colors, L’Oréal Professionnel, and Redken—plus gentle Non-Peroxide and Ammonia-Free color options for sensitive scalps.'
    },
    {
      q: 'Do you travel to private homes, senior living facilities, or hospitals?',
      a: 'Yes, Bruce is available for in-home, assisted living, nursing facility, and hospital haircare visits throughout McLean and Northern Virginia, and also provides Men’s Personal Valet Services and Expert Sterling Silver Cleaning.'
    },
    {
      q: 'What forms of payment do you accept?',
      a: 'For your convenience, we accept all major credit cards (Visa, MasterCard, American Express, Discover) as well as cash.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  const faqBodyHtml = `
    <section class="section">
      <div class="container">
        <span class="eyebrow">Answers to Common Client Questions</span>
        <h1>Frequently Asked Questions &amp; First-Visit Guide</h1>
        <p class="lead-text">
          Everything you need to know before your appointment at <strong>Hair Creations by Bruce</strong> in McLean, Virginia.
        </p>

        <div class="content-layout" style="margin-top:2.25rem;">
          <div class="faq-list">
            ${allFaqs
              .map(
                (f) => `
              <details class="faq-item" open>
                <summary>${f.q}</summary>
                <div class="faq-answer"><p style="margin:0;">${f.a}</p></div>
              </details>`
              )
              .join('\n')}
          </div>

          <aside class="sidebar-sticky">
            <div class="sidebar-card">
              <h3>In-Depth Client Guides</h3>
              <ul class="footer-links">
                ${GUIDES.map(
                  (g) =>
                    `<li style="margin-bottom:0.65rem;"><a href="${toRel(faqRelPath, `/guides/${g.slug}.html`)}" style="color:var(--ink-primary); font-weight:600;">${g.title} &rarr;</a></li>`
                ).join('\n                ')}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;

  writePage(
    faqRelPath,
    renderLayout({
      relPath: faqRelPath,
      title: 'Frequently Asked Questions | Hair Creations by Bruce in McLean, VA',
      metaDescription:
        'FAQs about Hair Creations by Bruce in McLean, VA: parking at 6800 Fleetwood Rd Suite 106, 6:00 AM hours, Bring Your Own Hair (BYOH) extensions, men’s hair systems, and pricing.',
      canonicalPath: faqRelPath,
      breadcrumbs: [{ label: 'FAQ', path: faqRelPath }],
      extraJsonLd: [faqSchema],
      bodyHtml: faqBodyHtml
    })
  );
}

// 10. 404 Page (`404.html`), `sitemap.xml`, and `robots.txt`
function buildAuxiliaryFiles() {
  const relPath = '404.html';
  const bodyHtml = `
    <section class="section">
      <div class="container" style="text-align:center; max-width:42rem;">
        <span class="eyebrow">Page Not Found</span>
        <h1>Let’s Get You Back to Great Hair</h1>
        <p class="lead-text">
          The page you were looking for may have moved during our website upgrade. Use the links below to explore our McLean salon services, pricing, or contact info:
        </p>
        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:0.85rem; margin-top:2rem;">
          <a href="${toRel(relPath, '/index.html')}" class="btn btn-primary">Return to Homepage</a>
          <a href="${toRel(relPath, '/services.html')}" class="btn btn-secondary">Browse All 14 Services</a>
          <a href="${toRel(relPath, '/pricing.html')}" class="btn btn-secondary">View Price Menu</a>
          <a href="${toRel(relPath, '/contact.html')}" class="btn btn-secondary">Contact Bruce</a>
        </div>
      </div>
    </section>
  `;

  fs.writeFileSync(
    path.join(ROOT_DIR, relPath),
    renderLayout({
      relPath,
      title: 'Page Not Found | Hair Creations by Bruce in McLean, VA',
      metaDescription: 'Return to Hair Creations by Bruce in McLean, VA for haircuts, color, extensions, and hair replacement systems.',
      canonicalPath: '404.html',
      bodyHtml
    }),
    'utf8'
  );

  // Build XML Sitemap for all 35 canonical content pages
  const urlsXml = generatedPages
    .map((p) => {
      const loc = p === 'index.html' ? `${SITE_URL}/` : `${SITE_URL}/${p}`;
      const priority = p === 'index.html' ? '1.0' : p.includes('/') ? '0.8' : '0.9';
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY_ISO}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;
  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsTxt, 'utf8');
}

// Run all builders
buildHomePage();
buildAboutPage();
buildServicesDirectoryPage();
buildPricingPage();
buildGalleryPage();
buildContactPage();
buildServiceDetailPages();
buildLocationPages();
buildGuideAndFaqPages();
buildAuxiliaryFiles();

console.log(`Successfully rebuilt ${generatedPages.length} canonical HTML pages (+ 404.html, sitemap.xml, robots.txt)!`);
