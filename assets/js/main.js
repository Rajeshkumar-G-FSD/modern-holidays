/* ==========================================================================
   MODERN HOLIDAYS — Site behaviour
   Shared header/footer, SVG icons, content renderers, filters, forms and
   interactions. Requires data.js to be loaded first.
   ========================================================================== */
(function () {
  'use strict';

  const D = window.MH_DATA;
  const C = D.contact;
  const root = document.documentElement;
  root.classList.add('js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page || '';
  const FALLBACK_IMG = D.U(D.IMG.beach, 1200);

  /* ---------- SVG icon set (24px line icons) ---------- */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M15 3.5h-2.2A3.8 3.8 0 0 0 9 7.3V10H6.5v3.5H9V21h3.5v-7.5H15l.6-3.5h-3.1V7.6c0-.6.4-1 1-1H15z"/>',
    whatsapp: '<path d="M4 20l1.2-3.9A8.3 8.3 0 1 1 8.3 19z"/><path d="M9.2 8.3c.2-.4.5-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.5.9 1.4 1.8 2.4 2.3.2.1.4.1.5 0l.6-.7c.2-.2.3-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .6-.3 1.3-.9 1.6-.6.3-1.4.4-2.3.1a8.3 8.3 0 0 1-4.6-4.2c-.5-1.2-.4-2.2.0-2.9z" fill="currentColor" stroke="none"/>',
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    'arrow-up': '<path d="M12 19V5M6 11l6-6 6 6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    headset: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M19 20c0 1.2-1.2 2-3 2h-2.5"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.3 7.5 9.5 4.3-1.2 7.5-5 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
    wallet: '<path d="M5 7V6a2 2 0 0 1 2-2h11v3"/><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M21 11h-4a2 2 0 0 0 0 4h4"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    plane: '<path d="M21 15.5v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0v5l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-4.5z"/>',
    hotel: '<path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
    passport: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3.5"/><path d="M8.5 10h7M12 6.5c1.3 1.2 1.3 5.8 0 7M12 6.5c-1.3 1.2-1.3 5.8 0 7M9 17h6"/>',
    rings: '<circle cx="9" cy="14.5" r="5"/><circle cx="15" cy="14.5" r="5"/><path d="m10 4 2 3 2-3"/>',
    route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M7 7l10 10M17 7 7 17"/>',
    umbrella: '<path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z"/><path d="M12 12v7a2 2 0 0 0 4 0"/>',
    mountain: '<path d="m3 20 6.5-11 4 6.5 2.5-3.5L21 20z"/><circle cx="17" cy="6" r="2"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    sparkles: '<path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/>',
    map: '<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10M10 20v-5h4v5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 4 2.5 20h19z"/><path d="M12 10v4M12 17h.01"/>',
    utensils: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3.5 4-3.5 8h3.5"/>',
    car: '<path d="M5 16v-5l2-5h10l2 5v5"/><path d="M3 11h18v6H3zM6 17v3M18 17v3"/><circle cx="7.5" cy="14" r=".8" fill="currentColor"/><circle cx="16.5" cy="14" r=".8" fill="currentColor"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
    send: '<path d="M21 3 3 10.5l7 3 3 7z"/><path d="m10 13.5 4-4"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    handshake: '<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2"/><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2 2 0 0 0-2.8 0l-.9.9a1.4 1.4 0 0 1-2-2L11.7 6.7a4 4 0 0 1 4.5-.7l.8.4H21v8h-2M3 6.5h4l4.5 4.5M3 14.5h2l4 4a1.4 1.4 0 0 0 2-2"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>'
  };
  const ico = (name, cls = '') => `<span class="icon ${cls}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg></span>`;
  const hydrateIcons = (scope = document) => $$('i[data-icon]', scope).forEach(el => { el.outerHTML = ico(el.dataset.icon, el.className); });

  /* ---------- Inline SVG logo (inline so web fonts apply) ---------- */
  const logo = uid => `<svg viewBox="0 0 260 56" role="img" aria-label="Modern Holidays"><defs><linearGradient id="lg-${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F1D9A4"/><stop offset="1" stop-color="#C99A4B"/></linearGradient></defs><g fill="none" stroke="url(#lg-${uid})" stroke-width="2.2" stroke-linecap="round"><circle cx="28" cy="28" r="20"/><path d="M8 28h40M28 8c7 6 7 34 0 40M28 8c-7 6-7 34 0 40" stroke-opacity=".55"/><path d="M4 40c14 4 34-2 48-24"/></g><path d="M52.5 13.5l-9 3.2 3.3 1.6-1.4 4 3-2.4 3.2 1.2z" fill="url(#lg-${uid})"/><text x="64" y="27" font-family="Outfit, sans-serif" font-weight="800" font-size="19" letter-spacing="2.4" fill="#fff">MODERN</text><text x="64" y="45" font-family="Outfit, sans-serif" font-weight="500" font-size="12.5" letter-spacing="5.6" fill="#E5C784">HOLIDAYS</text></svg>`;

  const waLink = text => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text || 'Hello Modern Holidays, I would like to plan a holiday.')}`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.mapQuery)}`;
  const waveSVG = () => `<svg class="wave" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true"><path class="w2" d="M0 70c180-50 360-60 560-20s420 70 620 30 220-60 260-70v140H0z"/><path d="M0 100c220-60 430-70 640-30s400 60 560 30c120-22 200-50 240-60v110H0z"/></svg>`;

  /* ---------- Navigation model ---------- */
  const NAV = [
    { key: 'home', href: 'index.html', label: 'Home' },
    { key: 'about', href: 'about.html', label: 'About Us' },
    { key: 'destinations', href: 'destinations.html', label: 'Destinations',
      sub: D.continents.map(c => ({ href: `destinations.html?continent=${c.id}`, label: c.name, icon: 'pin' })).concat([{ href: 'destinations.html', label: 'All Destinations', icon: 'arrow-right', feature: true }]) },
    { key: 'packages', href: 'packages.html', label: 'Holiday Packages', sub: [
      { href: 'packages.html?scope=international', label: 'International Holidays', icon: 'globe' },
      { href: 'packages.html?scope=domestic', label: 'Domestic Holidays', icon: 'home' },
      { href: 'packages.html?type=Honeymoon', label: 'Honeymoon Packages', icon: 'rings' },
      { href: 'packages.html?type=Family', label: 'Family Holidays', icon: 'users' },
      { href: 'packages.html', label: 'View All Packages', icon: 'arrow-right', feature: true }] },
    { key: 'services', href: 'services.html', label: 'Services', sub: [{ href: 'visa.html', label: 'Visa Assistance', icon: 'passport', feature: true }]
      .concat(D.services.filter(s => s.id !== 'visa').map(s => ({ href: `services.html#${s.id}`, label: s.title, icon: s.icon }))) },
    { key: 'blog', href: 'blog.html', label: 'Travel Blog' },
    { key: 'contact', href: 'contact.html', label: 'Contact Us' }
  ];
  const activeKey = { package: 'packages', article: 'blog', visa: 'services', destination: 'destinations' }[page] || page;
  const planHref = document.getElementById('planner') ? '#planner' : 'contact.html#enquiry';

  function renderHeader() {
    const items = NAV.map(n => {
      const cur = n.key === activeKey ? ' aria-current="page"' : '';
      if (!n.sub) return `<li class="nav-item"><div class="nav-row"><a class="nav-link" href="${n.href}"${cur}>${n.label}</a></div></li>`;
      return `<li class="nav-item has-sub"><div class="nav-row"><a class="nav-link" href="${n.href}"${cur}>${n.label}</a><button class="sub-toggle" aria-expanded="false" aria-label="Show ${n.label} menu">${ico('chevron-down')}</button></div>
        <ul class="sub-menu">${n.sub.map(s => `<li><a href="${s.href}" class="${s.feature ? 'sub-feature' : ''}">${ico(s.icon)}${s.label}</a></li>`).join('')}</ul></li>`;
    }).join('');

    const drawerItems = NAV.map(n => {
      const cur = n.key === activeKey ? ' aria-current="page"' : '';
      if (!n.sub) return `<div class="drawer-item"><a class="drawer-link" href="${n.href}"${cur}>${n.label}</a></div>`;
      return `<div class="drawer-item"><button class="drawer-link" aria-expanded="false"${cur}>${n.label}${ico('chevron-down')}</button>
        <div class="drawer-sub"><a href="${n.href}">Overview</a>${n.sub.map(s => `<a href="${s.href}">${s.label}</a>`).join('')}</div></div>`;
    }).join('');

    const html = `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" id="siteHeader">
  <div class="container header-inner">
    <a class="brand" href="index.html" aria-label="Modern Holidays — Home">${logo('h')}</a>
    <nav class="main-nav" aria-label="Main navigation"><ul>${items}</ul></nav>
    <div class="header-actions">
      <button class="icon-btn" type="button" data-search-open aria-label="Search destinations, packages and articles">${ico('search')}</button>
      <a class="icon-btn social-icon" href="${C.instagram}" aria-label="Modern Holidays on Instagram" target="_blank" rel="noopener">${ico('instagram')}</a>
      <a class="icon-btn social-icon" href="${C.facebook}" aria-label="Modern Holidays on Facebook" target="_blank" rel="noopener">${ico('facebook')}</a>
      <a class="icon-btn wa-icon" href="${waLink()}" aria-label="Enquire on WhatsApp" target="_blank" rel="noopener">${ico('whatsapp')}</a>
      <a class="btn btn-gold btn-plan" href="${planHref}">Plan My Trip</a>
      <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">${ico('menu')}</button>
    </div>
  </div>
</header>
<div class="drawer-backdrop" data-drawer-close></div>
<aside class="drawer" id="drawer" aria-label="Mobile menu">
  <div class="drawer-head"><a href="index.html" aria-label="Home">${logo('d')}</a><button class="icon-btn" type="button" data-drawer-close aria-label="Close menu">${ico('close')}</button></div>
  <nav aria-label="Mobile navigation">${drawerItems}</nav>
  <div class="drawer-foot">
    <a class="btn btn-gold btn-block" href="${planHref}" data-drawer-close>Plan My Trip</a>
    <a class="btn btn-wa btn-block" href="${waLink()}" target="_blank" rel="noopener">${ico('whatsapp')} WhatsApp Us</a>
    <a class="btn btn-ghost btn-block" href="tel:${C.phoneTel}">${ico('phone')} ${C.phoneDisplay}</a>
  </div>
</aside>
<div class="search-overlay" id="searchOverlay" role="dialog" aria-modal="true" aria-label="Search">
  <button class="icon-btn search-close" type="button" data-search-close aria-label="Close search">${ico('close')}</button>
  <div class="search-box">
    <label class="search-field">${ico('search')}<span class="sr-only">Search</span><input type="search" id="searchInput" placeholder="Where would you like to go?" autocomplete="off"></label>
    <div class="search-results" id="searchResults" aria-live="polite"></div>
    <p class="search-hint">Try “Bali”, “honeymoon”, “Switzerland” or “visa”.</p>
  </div>
</div>`;
    const slot = document.getElementById('site-header');
    if (slot) slot.outerHTML = html;
  }

  function renderFooter() {
    const year = new Date().getFullYear();
    const html = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" aria-label="Modern Holidays — Home">${logo('f')}</a>
        <p class="tagline">Explore More. Experience Beyond.</p>
        <p>International and domestic holidays, visa assistance and thoughtfully planned journeys — from Erode to every corner of the world.</p>
        <div class="socials">
          <a href="${C.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${ico('instagram')}</a>
          <a href="${C.facebook}" aria-label="Facebook" target="_blank" rel="noopener">${ico('facebook')}</a>
          <a href="${waLink()}" aria-label="WhatsApp" target="_blank" rel="noopener">${ico('whatsapp')}</a>
        </div>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul class="footer-links">
          <li><a href="index.html">Home</a></li><li><a href="about.html">About Us</a></li>
          <li><a href="destinations.html">Destinations</a></li><li><a href="packages.html">Holiday Packages</a></li>
          <li><a href="blog.html">Travel Blog</a></li><li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4>Services</h4>
        <ul class="footer-links">
          <li><a href="services.html#international">International Tours</a></li><li><a href="services.html#domestic">Domestic Tours</a></li>
          <li><a href="services.html#flights">Flights</a></li><li><a href="services.html#hotels">Hotels</a></li>
          <li><a href="visa.html">Visa Assistance</a></li><li><a href="services.html#custom">Customized Holidays</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul class="footer-contact">
          <li>${ico('pin')}<a href="${mapsLink}" target="_blank" rel="noopener">${C.addressLines.join(' ')}</a></li>
          <li>${ico('phone')}<a href="tel:${C.phoneTel}">${C.phoneDisplay}</a></li>
          <li>${ico('whatsapp')}<a href="${waLink()}" target="_blank" rel="noopener">WhatsApp: ${C.phoneDisplay}</a></li>
          <li>${ico('mail')}${C.email ? `<a href="mailto:${C.email}">${C.email}</a>` : '<span class="ph">Official email address</span>'}</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom container">
    <span>Copyright © ${year} Modern Holidays. All rights reserved.</span>
    <nav aria-label="Legal"><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms &amp; Conditions</a><a href="terms.html#cancellation">Cancellation Policy</a></nav>
  </div>
</footer>
<a class="fab-wa" href="${waLink()}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${ico('whatsapp')}<span class="fab-label">Chat with a travel expert</span></a>
<button class="to-top" type="button" aria-label="Back to top">${ico('arrow-up')}</button>`;
    const slot = document.getElementById('site-footer');
    if (slot) slot.outerHTML = html;
  }

  /* ---------- Card templates ---------- */
  const budgetLabel = { value: 'Value', mid: 'Mid-range', premium: 'Premium' };
  const priceHTML = p => p.price ? `₹${Number(p.price).toLocaleString('en-IN')} <small style="display:inline;text-transform:none;letter-spacing:0">/ person</small>` : 'Price on request';

  function incChips(p) {
    const txt = p.inclusions.join(' ').toLowerCase();
    const chips = [];
    if (/night|stay|accommodation/.test(txt)) chips.push(['hotel', 'Stay']);
    if (/breakfast|meal|dinner/.test(txt)) chips.push(['utensils', 'Meals']);
    if (/transfer|cab|vehicle/.test(txt)) chips.push(['car', 'Transfers']);
    if (/sightseeing|tour|excursion|attraction|shikara/.test(txt)) chips.push(['camera', 'Sightseeing']);
    if (/train|pass|flight/.test(txt)) chips.push(['plane', 'Rail / Flights']);
    return chips.slice(0, 4).map(([i, l]) => `<span class="chip">${ico(i)}${l}</span>`).join('');
  }

  const destCard = d => `
<article class="dest-card reveal">
  <div class="dest-media"><img src="${D.U(d.img, 900)}" alt="${esc(d.name)}, ${esc(d.country)} — ${esc(d.tag)}" loading="lazy" decoding="async"></div>
  <span class="dest-tag">${esc(d.tag)}</span>
  <div class="dest-body"><small>${esc(d.country)}</small><h3>${esc(d.name)}</h3><p>${esc(d.desc)}</p><span class="link-arrow">Explore Destination ${ico('arrow-right')}</span></div>
  <a class="cover" href="destination.html?id=${d.id}" aria-label="Explore ${esc(d.name)}, ${esc(d.country)}"></a>
</article>`;

  const pkgCard = p => `
<article class="pkg-card reveal">
  <a class="pkg-media" href="package.html?id=${p.id}" tabindex="-1" aria-hidden="true">
    <img src="${D.U(p.img, 800)}" alt="" loading="lazy" decoding="async">
    <span class="pkg-dur">${ico('clock')}${p.days} Days / ${p.nights} Nights</span><span class="pkg-type">${esc(p.types[0])}</span>
  </a>
  <div class="pkg-body">
    <p class="pkg-dest">${ico('pin')}${esc(p.place)}</p>
    <h3><a href="package.html?id=${p.id}">${esc(p.title)}</a></h3>
    <ul class="pkg-hl">${p.highlights.slice(0, 3).map(h => `<li>${ico('check')}<span>${esc(h)}</span></li>`).join('')}</ul>
    <div class="pkg-inc">${incChips(p)}</div>
  </div>
  <div class="pkg-foot">
    <div class="pkg-price"><small>Starting from</small><strong>${priceHTML(p)}</strong></div>
    <div class="pkg-actions"><a class="link-arrow" href="package.html?id=${p.id}">Details</a><button type="button" class="btn btn-gold btn-sm" data-enquire="${esc(p.title)}" data-enquire-dest="${esc(p.place)}">Enquire Now</button></div>
  </div>
</article>`;

  const postCard = p => `
<article class="post-card reveal">
  <div class="post-media"><img src="${D.U(p.img, 900)}" alt="" loading="lazy" decoding="async"></div>
  <div class="post-body">
    <div class="post-meta"><span class="post-cat">${esc(p.cat)}</span><span>${esc(p.read)} read</span></div>
    <h3><a href="article.html?id=${p.id}">${esc(p.title)}</a></h3>
    <p>${esc(p.excerpt)}</p>
    <span class="link-arrow">Read More ${ico('arrow-right')}</span>
  </div>
</article>`;

  const svcCard = (s, i) => `
<article class="svc-card reveal ${s.featured ? 'highlight' : ''}" data-delay="${i % 4}">
  ${s.featured ? '<span class="flag">Popular</span>' : ''}
  <div class="svc-icon">${ico(s.icon)}</div>
  <h3>${esc(s.title)}</h3>
  <p>${esc(s.short)}</p>
  <a class="link-arrow" href="${s.id === 'visa' ? 'visa.html' : 'services.html#' + s.id}">${s.id === 'visa' ? 'Get Visa Help' : 'Enquire Now'} ${ico('arrow-right')}</a>
</article>`;

  const stateHTML = (icon, title, text, action = '') => `<div class="state">${ico(icon)}<h3>${title}</h3><p>${text}</p>${action}</div>`;
  const skeletons = n => Array.from({ length: n }, () => '<div class="skeleton" aria-hidden="true"><div class="sk sk-img"></div><div class="sk sk-line"></div><div class="sk sk-line w60"></div><div class="sk sk-line w40"></div></div>').join('');

  /* ---------- Reveal on scroll ---------- */
  let revealIO = null;
  function observeReveals(scope = document) {
    const els = $$('.reveal:not(.in)', scope);
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); }
      }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    }
    els.forEach(e => revealIO.observe(e));
  }

  /* ---------- Header behaviour ---------- */
  function initHeader() {
    const header = $('#siteHeader');
    const toTop = $('.to-top');
    const onScroll = () => {
      const y = window.scrollY;
      header && header.classList.toggle('scrolled', y > 40);
      toTop && toTop.classList.toggle('show', y > 700);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    toTop && toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    // Dropdowns (keyboard / touch)
    $$('.nav-item.has-sub').forEach(li => {
      const btn = $('.sub-toggle', li);
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const open = !li.classList.contains('open');
        $$('.nav-item.open').forEach(o => { o.classList.remove('open'); $('.sub-toggle', o).setAttribute('aria-expanded', 'false'); });
        li.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', String(open));
        if (open) { const first = $('.sub-menu a', li); first && first.focus(); }
      });
      li.addEventListener('keydown', e => {
        if (e.key === 'Escape' && li.classList.contains('open')) { li.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
      });
      li.addEventListener('focusout', e => { if (!li.contains(e.relatedTarget)) { li.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
    });
    document.addEventListener('click', () => $$('.nav-item.open').forEach(o => { o.classList.remove('open'); $('.sub-toggle', o).setAttribute('aria-expanded', 'false'); }));

    // Drawer
    const toggle = $('.menu-toggle');
    const drawer = $('#drawer');
    const openDrawer = () => { document.body.classList.add('drawer-open'); toggle.setAttribute('aria-expanded', 'true'); setTimeout(() => { const f = $('.drawer-link', drawer); f && f.focus(); }, 60); };
    const closeDrawer = () => { if (!document.body.classList.contains('drawer-open')) return; document.body.classList.remove('drawer-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); };
    toggle && toggle.addEventListener('click', openDrawer);
    $$('[data-drawer-close]').forEach(b => b.addEventListener('click', closeDrawer));
    $$('.drawer-item > button.drawer-link').forEach(b => b.addEventListener('click', () => {
      const item = b.parentElement; const open = !item.classList.contains('open');
      item.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open));
    }));
    $$('.drawer a[href^="#"]').forEach(a => a.addEventListener('click', closeDrawer));

    // Search
    const overlay = $('#searchOverlay');
    const input = $('#searchInput');
    const results = $('#searchResults');
    let lastFocus = null;
    const index = [].concat(
      D.packages.map(p => ({ t: p.title, k: 'Holiday Package', u: `package.html?id=${p.id}`, img: p.img, s: `${p.title} ${p.place} ${p.types.join(' ')} ${p.scope}` })),
      D.destinations.map(d => ({ t: `${d.name}, ${d.country}`, k: 'Destination', u: `destination.html?id=${d.id}`, img: d.img, s: `${d.name} ${d.country} ${d.tag} ${d.continent}` })),
      D.services.map(s => ({ t: s.title, k: 'Service', u: s.id === 'visa' ? 'visa.html' : `services.html#${s.id}`, img: s.img, s: `${s.title} ${s.short}` })),
      D.posts.map(p => ({ t: p.title, k: 'Travel Blog', u: `article.html?id=${p.id}`, img: p.img, s: `${p.title} ${p.cat} ${p.excerpt}` }))
    );
    const runSearch = () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { results.innerHTML = ''; return; }
      const terms = q.split(/\s+/);
      const hits = index.filter(i => terms.every(t => i.s.toLowerCase().includes(t))).slice(0, 8);
      results.innerHTML = hits.length ? hits.map(h => `<a href="${h.u}"><img src="${D.U(h.img, 160)}" alt=""><span><small>${h.k}</small>${esc(h.t)}</span></a>`).join('')
        : `<p class="search-hint">No matches for “${esc(input.value)}”. <a class="link-arrow" href="contact.html#enquiry">Ask our travel team</a></p>`;
    };
    const openSearch = () => { lastFocus = document.activeElement; overlay.classList.add('open'); document.body.style.overflow = 'hidden'; setTimeout(() => input.focus(), 50); };
    const closeSearch = () => { overlay.classList.remove('open'); document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
    $$('[data-search-open]').forEach(b => b.addEventListener('click', openSearch));
    $$('[data-search-close]').forEach(b => b.addEventListener('click', closeSearch));
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
    input.addEventListener('input', runSearch);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { if (overlay.classList.contains('open')) closeSearch(); closeDrawer(); }
      if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
    });
  }

  /* ---------- Hero: entrance, parallax, floating card carousel ---------- */
  function initHero() {
    $$('.hero, .page-hero').forEach(h => requestAnimationFrame(() => h.classList.add('ready')));

    const bgs = $$('[data-parallax]');
    if (bgs.length && !reduceMotion) {
      let ticking = false;
      const update = () => {
        bgs.forEach(bg => {
          const r = bg.parentElement.getBoundingClientRect();
          if (r.bottom < 0 || r.top > innerHeight) return;
          // Offset relative to the section's centre, clamped so the image never leaves its frame
          const off = (r.top + r.height / 2 - innerHeight / 2) * -0.12;
          const max = r.height * 0.06;
          bg.style.transform = `translate3d(0, ${Math.max(-max, Math.min(max, off)).toFixed(1)}px, 0)`;
        });
        ticking = false;
      };
      window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
      update();
    }

    const wrap = $('[data-hero-cards]');
    if (!wrap) return;
    const ids = (wrap.dataset.heroCards || 'bali,switzerland,maldives,japan,dubai').split(',');
    const list = ids.map(id => D.destinations.find(d => d.id === id)).filter(Boolean);
    const cards = $('.hero-cards', wrap);
    cards.innerHTML = list.map((d, i) => `
      <a class="hcard" href="destination.html?id=${d.id}" data-i="${i}" aria-label="${esc(d.name)}, ${esc(d.country)} — ${esc(d.tag)}">
        <img src="${D.U(d.img, 900)}" alt="" ${i < 3 ? '' : 'loading="lazy"'}>
        <span class="hcard-tag">${esc(d.tag)}</span>
        <span class="hcard-info"><small>${esc(d.country)}</small><strong>${esc(d.name)}</strong><span>View Destination ${ico('arrow-right')}</span></span>
      </a>`).join('');
    const els = $$('.hcard', cards);
    const count = $('[data-count]', wrap);
    const bar = $('.ctrl-bar i', wrap);
    const mobile = window.matchMedia('(max-width: 960px)');
    let cur = 0, timer = null;

    const layout = () => {
      els.forEach((el, i) => {
        const pos = (i - cur + els.length) % els.length;
        el.dataset.pos = pos <= 2 ? String(pos) : 'hidden';
        el.tabIndex = pos <= 1 ? 0 : -1;
      });
      if (count) count.innerHTML = `<b>${String(cur + 1).padStart(2, '0')}</b> / ${String(els.length).padStart(2, '0')}`;
      if (bar && !reduceMotion) { bar.classList.remove('run'); void bar.offsetWidth; bar.classList.add('run'); }
    };
    const go = dir => {
      if (mobile.matches) {
        const w = els[0].getBoundingClientRect().width + 14;
        cards.scrollBy({ left: dir * w, behavior: reduceMotion ? 'auto' : 'smooth' });
        return;
      }
      cur = (cur + dir + els.length) % els.length; layout(); restart();
    };
    const restart = () => { clearInterval(timer); if (!reduceMotion && !mobile.matches) timer = setInterval(() => go(1), 6000); };
    $('[data-prev]', wrap).addEventListener('click', () => go(-1));
    $('[data-next]', wrap).addEventListener('click', () => go(1));
    wrap.addEventListener('mouseenter', () => clearInterval(timer));
    wrap.addEventListener('mouseleave', restart);
    wrap.addEventListener('focusin', () => clearInterval(timer));
    if (mobile.matches && count) {
      cards.addEventListener('scroll', () => {
        const w = els[0].getBoundingClientRect().width + 14;
        const i = Math.round(cards.scrollLeft / w);
        count.innerHTML = `<b>${String(i + 1).padStart(2, '0')}</b> / ${String(els.length).padStart(2, '0')}`;
      }, { passive: true });
    }
    layout(); restart();
  }

  /* ---------- Destination explorer (continent tabs) ---------- */
  function initExplorers() {
    $$('[data-dest-explorer]').forEach(el => {
      const limit = +el.dataset.limit || 0;
      const withAll = el.hasAttribute('data-all');
      const tabs = (withAll ? [{ id: 'all', name: 'All' }] : []).concat(D.continents);
      let current = params.get('continent') || el.dataset.default || (withAll ? 'all' : 'asia');
      if (!tabs.some(t => t.id === current)) current = tabs[0].id;
      const tablist = $('[data-tabs]', el);
      const grid = $('[data-grid]', el);
      const caption = $('[data-caption]', el);
      const search = $('[data-search]', el);
      const gid = grid.id || (grid.id = 'destPanel');

      tablist.setAttribute('role', 'tablist');
      tablist.setAttribute('aria-label', 'Choose a region');
      tablist.innerHTML = tabs.map(t => `<button class="ctab" role="tab" id="tab-${t.id}" data-id="${t.id}" aria-controls="${gid}" aria-selected="${t.id === current}" tabindex="${t.id === current ? 0 : -1}">${t.name}</button>`).join('');
      grid.setAttribute('role', 'tabpanel');

      const update = (push) => {
        const q = search ? search.value.trim().toLowerCase() : '';
        let list = D.destinations.filter(d => current === 'all' || d.continent === current);
        if (q) list = D.destinations.filter(d => `${d.name} ${d.country} ${d.tag} ${d.desc} ${d.continent}`.toLowerCase().includes(q));
        const total = list.length;
        if (limit) list = list.slice(0, limit);
        grid.setAttribute('aria-labelledby', `tab-${current}`);
        if (grid.hasAttribute('data-feature')) grid.classList.toggle('feature-first', list.length === 5 || list.length === 9);
        grid.innerHTML = list.length ? list.map(destCard).join('')
          : stateHTML('compass', 'No destinations found', `We couldn’t find “${esc(q)}” in our list — but we plan trips to many more places.`, '<a class="btn btn-gold btn-sm" href="contact.html#enquiry">Ask Our Team</a>');
        const cont = tabs.find(t => t.id === current);
        if (caption) {
          caption.innerHTML = q ? `<b>${total}</b> result${total === 1 ? '' : 's'} for “${esc(q)}”`
            : current === 'all' ? `<b>${total} destinations</b> across the world` : `${esc(cont.blurb || '')} <b>${total} destination${total === 1 ? '' : 's'}</b>`;
        }
        observeReveals(grid);
        if (push && el.hasAttribute('data-sync-url')) {
          const u = new URL(location.href); current === 'all' ? u.searchParams.delete('continent') : u.searchParams.set('continent', current); history.replaceState(null, '', u);
        }
      };
      const select = (id, focus) => {
        current = id;
        $$('.ctab', tablist).forEach(b => { const on = b.dataset.id === id; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
        if (search) search.value = '';
        const active = $(`.ctab[data-id="${id}"]`, tablist);
        active && active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
        update(true);
      };
      tablist.addEventListener('click', e => { const b = e.target.closest('.ctab'); if (b) select(b.dataset.id); });
      tablist.addEventListener('keydown', e => {
        const i = tabs.findIndex(t => t.id === current);
        if (e.key === 'ArrowRight') { e.preventDefault(); select(tabs[(i + 1) % tabs.length].id, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); select(tabs[(i - 1 + tabs.length) % tabs.length].id, true); }
      });
      if (search) search.addEventListener('input', () => update(false));
      update(false);
    });
  }

  /* ---------- Packages grid + filters ---------- */
  function initPackageGrids() {
    $$('[data-pkg-grid]').forEach(grid => {
      const ids = grid.dataset.ids ? grid.dataset.ids.split(',') : null;
      const form = grid.dataset.filters ? document.getElementById(grid.dataset.filters) : null;
      const meta = $('[data-results]');
      grid.innerHTML = skeletons(ids ? Math.min(ids.length, 6) : 6);

      if (!form) {
        const list = ids ? ids.map(id => D.packages.find(p => p.id === id)).filter(Boolean) : D.packages;
        setTimeout(() => { grid.innerHTML = list.map(pkgCard).join(''); observeReveals(grid); }, 250);
        return;
      }

      // Populate region select from data
      const region = form.elements.region;
      region.innerHTML = '<option value="">All regions</option>' + D.continents.filter(c => D.packages.some(p => p.continent === c.id)).map(c => `<option value="${c.id}">${c.name}</option>`).join('');
      const scopeBtns = $$('[data-scope]', form);
      // Initial state from URL
      ['q', 'region', 'duration', 'budget', 'type'].forEach(k => { if (params.get(k) && form.elements[k]) form.elements[k].value = params.get(k); });
      let scope = params.get('scope') || '';
      const setScope = s => { scope = s; scopeBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.scope === s))); };
      setScope(scope);

      const apply = () => {
        const f = form.elements;
        const q = f.q.value.trim().toLowerCase();
        const list = D.packages.filter(p => {
          if (scope && p.scope !== scope) return false;
          if (f.region.value && p.continent !== f.region.value) return false;
          if (f.budget.value && p.budget !== f.budget.value) return false;
          if (f.type.value && !p.types.includes(f.type.value)) return false;
          if (f.duration.value === 'short' && p.days > 4) return false;
          if (f.duration.value === 'mid' && (p.days < 5 || p.days > 6)) return false;
          if (f.duration.value === 'long' && p.days < 7) return false;
          if (q && !`${p.title} ${p.place} ${p.types.join(' ')} ${p.highlights.join(' ')}`.toLowerCase().includes(q)) return false;
          return true;
        });
        grid.innerHTML = list.length ? list.map(pkgCard).join('')
          : stateHTML('search', 'No packages match your filters', 'Try removing a filter — or tell us what you have in mind and we’ll design a holiday just for you.', '<div class="hero-ctas" style="justify-content:center"><button type="button" class="btn btn-outline-gold btn-sm" data-reset>Clear Filters</button><a class="btn btn-gold btn-sm" href="contact.html#enquiry">Request a Custom Holiday</a></div>');
        if (meta) meta.innerHTML = `Showing <b>${list.length}</b> of ${D.packages.length} holiday packages`;
        observeReveals(grid);
        const u = new URL(location.href);
        ['q', 'region', 'duration', 'budget', 'type'].forEach(k => { f[k].value ? u.searchParams.set(k, f[k].value) : u.searchParams.delete(k); });
        scope ? u.searchParams.set('scope', scope) : u.searchParams.delete('scope');
        history.replaceState(null, '', u);
      };
      const reset = () => { form.reset(); setScope(''); apply(); };
      form.addEventListener('input', apply);
      form.addEventListener('change', apply);
      form.addEventListener('submit', e => { e.preventDefault(); apply(); });
      scopeBtns.forEach(b => b.addEventListener('click', () => { setScope(b.dataset.scope); apply(); }));
      $$('[data-reset]', form).forEach(b => b.addEventListener('click', reset));
      grid.addEventListener('click', e => { if (e.target.closest('[data-reset]')) reset(); });
      setTimeout(apply, 350);
    });
  }

  /* ---------- Static grids ---------- */
  function initGrids() {
    $$('[data-svc-grid]').forEach(g => { g.innerHTML = D.services.map(svcCard).join(''); });
    $$('[data-dest-list]').forEach(g => {
      g.innerHTML = g.dataset.destList.split(',').map(id => D.destinations.find(d => d.id === id.trim())).filter(Boolean).map(destCard).join('');
    });
    $$('[data-blog-grid]').forEach(g => {
      const limit = +g.dataset.limit || 0;
      const cat = params.get('cat');
      let list = D.posts.slice();
      if (g.hasAttribute('data-cats')) {
        const bar = document.getElementById(g.dataset.cats);
        const cats = ['All'].concat([...new Set(D.posts.map(p => p.cat))]);
        let active = cats.includes(cat) ? cat : 'All';
        const draw = () => {
          bar.innerHTML = cats.map(c => `<button type="button" class="chip-btn" aria-pressed="${c === active}" data-cat="${c}">${c}</button>`).join('');
          const l = active === 'All' ? list : list.filter(p => p.cat === active);
          g.classList.toggle('featured', active === 'All');
          g.innerHTML = l.map(postCard).join('');
          observeReveals(g);
        };
        bar.addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (b) { active = b.dataset.cat; draw(); } });
        draw();
        return;
      }
      if (g.dataset.exclude) list = list.filter(p => p.id !== g.dataset.exclude);
      if (limit) list = list.slice(0, limit);
      g.innerHTML = list.map(postCard).join('');
    });
    $$('[data-visa-countries]').forEach(g => {
      g.innerHTML = D.visaCountries.map(c => `<button type="button" class="country reveal" data-visa-country="${esc(c.name)}"><img src="${D.U(c.img, 160)}" alt="" loading="lazy"><span><strong>${esc(c.name)}</strong><small>Tourist visa guidance</small></span></button>`).join('');
    });
    $$('[data-visa-chips]').forEach(g => {
      g.innerHTML = D.visaCountries.slice(0, 10).map(c => `<span>${esc(c.name)}</span>`).join('') + '<span>+ more</span>';
    });
    $$('[data-svc-detail]').forEach(g => {
      g.innerHTML = D.services.map(s => `
        <article class="svc-detail" id="${s.id}">
          <div class="svc-detail-media reveal"><img src="${D.U(s.img, 1000)}" alt="${esc(s.title)}" loading="lazy"></div>
          <div class="reveal" data-delay="1">
            <div class="svc-icon">${ico(s.icon)}</div>
            <h2>${esc(s.title)}</h2>
            <p class="lead">${esc(s.long)}</p>
            <ul class="ticks">${s.points.map(p => `<li>${ico('check')}<span>${esc(p)}</span></li>`).join('')}</ul>
            <div class="hero-ctas">
              ${s.id === 'visa' ? '<a class="btn btn-gold" href="visa.html">Explore Visa Assistance ' + ico('arrow-right') + '</a>' : `<button type="button" class="btn btn-gold" data-enquire="${esc(s.title)}">Enquire Now ${ico('arrow-right')}</button>`}
              <a class="btn btn-ghost" href="${waLink('Hello Modern Holidays, I would like to know more about ' + s.title + '.')}" target="_blank" rel="noopener">${ico('whatsapp')} WhatsApp</a>
            </div>
          </div>
        </article>`).join('');
    });
    $$('[data-contact]').forEach(el => {
      const k = el.dataset.contact;
      if (k === 'phone') { el.href = `tel:${C.phoneTel}`; el.textContent = C.phoneDisplay; }
      if (k === 'whatsapp') { el.href = waLink(); el.target = '_blank'; el.rel = 'noopener'; }
      if (k === 'address') el.innerHTML = C.addressLines.map(esc).join('<br>');
      if (k === 'maps') { el.href = mapsLink; el.target = '_blank'; el.rel = 'noopener'; }
      if (k === 'email') el.innerHTML = C.email ? `<a href="mailto:${C.email}">${C.email}</a>` : '<span class="ph">Official email address</span>';
    });
    $$('[data-map]').forEach(el => {
      el.innerHTML = `<iframe title="Map showing Modern Holidays office, Erode" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(C.mapQuery)}&output=embed"></iframe>`;
    });
  }

  /* ---------- Carousels (testimonials etc.) ---------- */
  function initCarousels() {
    $$('[data-carousel]').forEach(c => {
      const track = $('.carousel-track', c);
      const step = () => { const item = track.children[0]; return item ? item.getBoundingClientRect().width + 24 : 300; };
      $$('[data-c-prev]', c).forEach(b => b.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' })));
      $$('[data-c-next]', c).forEach(b => b.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' })));
    });
  }

  /* ---------- Enquiry forms ---------- */
  const CODES = [['+91', 'India'], ['+971', 'UAE'], ['+65', 'Singapore'], ['+60', 'Malaysia'], ['+974', 'Qatar'], ['+966', 'Saudi Arabia'], ['+968', 'Oman'], ['+965', 'Kuwait'], ['+973', 'Bahrain'], ['+1', 'USA / Canada'], ['+44', 'UK'], ['+61', 'Australia'], ['+64', 'New Zealand']];
  let formSeq = 0;

  function enquiryForm(variant, topic) {
    const id = 'eq' + (++formSeq);
    const v = variant || 'full';
    const today = new Date().toISOString().slice(0, 10);
    const fld = (name, label, control, opts = {}) => `<div class="field ${opts.full ? 'full' : ''}" data-field="${name}"><label for="${id}-${name}">${label}${opts.req ? ' <span class="req" aria-hidden="true">*</span>' : ''}</label>${control}<span class="field-error" id="${id}-${name}-err" role="alert">${ico('alert')}<span></span></span></div>`;
    const inp = (name, type, attrs = '') => `<input class="input" id="${id}-${name}" name="${name}" type="${type}" aria-describedby="${id}-${name}-err" ${attrs}>`;
    const destList = `<datalist id="${id}-dl">${D.destinations.map(d => `<option value="${esc(d.name)}${d.name === d.country ? '' : ', ' + esc(d.country)}">`).join('')}</datalist>`;
    const phone = `<div class="phone-group"><select class="select" name="code" aria-label="Country calling code">${CODES.map(([c, n]) => `<option value="${c}">${c} ${n}</option>`).join('')}</select>${inp('phone', 'tel', 'inputmode="tel" autocomplete="tel-national" placeholder="98765 43210" required')}</div>`;
    const visaSelect = `<select class="select" id="${id}-destination" name="destination" aria-describedby="${id}-destination-err" required><option value="">Select country</option>${D.visaCountries.map(c => `<option>${esc(c.name)}</option>`).join('')}<option>Other</option></select>`;

    const fields = [
      fld('name', 'Full Name', inp('name', 'text', 'autocomplete="name" placeholder="Your full name" required'), { req: true }),
      fld('phone', 'Mobile Number', phone, { req: true }),
      fld('email', 'Email Address', inp('email', 'email', 'autocomplete="email" placeholder="you@example.com" required'), { req: true, full: v === 'compact' })
    ];
    if (v === 'full') fields.push(fld('destination', 'Destination', inp('destination', 'text', `list="${id}-dl" placeholder="e.g. Bali, Switzerland" required`) + destList, { req: true }));
    if (v === 'visa') fields.push(fld('destination', 'Visa Required For', visaSelect, { req: true }));
    fields.push(
      fld('date', v === 'visa' ? 'Intended Travel Date' : 'Preferred Travel Date', inp('date', 'date', `min="${today}" required`), { req: true }),
      fld('travellers', v === 'visa' ? 'Number of Applicants' : 'Number of Travellers', inp('travellers', 'number', 'min="1" max="99" value="2" inputmode="numeric" required'), { req: true })
    );
    if (v === 'full') {
      fields.push(
        fld('budget', 'Approximate Budget (per person)', `<select class="select" id="${id}-budget" name="budget"><option value="">Select a range</option><option>Under ₹50,000</option><option>₹50,000 – ₹1,00,000</option><option>₹1,00,000 – ₹2,00,000</option><option>₹2,00,000 – ₹4,00,000</option><option>Above ₹4,00,000</option><option>Not sure yet</option></select>`),
        fld('type', 'Holiday Type', `<select class="select" id="${id}-type" name="type"><option value="">Select holiday type</option><option>Honeymoon</option><option>Family Holiday</option><option>Friends / Group Trip</option><option>Solo Travel</option><option>Corporate / Incentive</option><option>Visa Assistance</option><option>Other</option></select>`)
      );
    }
    fields.push(
      fld('message', v === 'visa' ? 'Tell Us About Your Trip' : 'Additional Requirements', `<textarea class="textarea" id="${id}-message" name="message" placeholder="${v === 'visa' ? 'Purpose of travel, previous travel history, any questions…' : 'Hotel preferences, special occasions, activities, dietary needs…'}"></textarea>`, { full: true }),
      `<div class="field full" data-field="consent"><label class="check"><input type="checkbox" name="consent" aria-describedby="${id}-consent-err" required><span>I agree to be contacted by Modern Holidays by phone, WhatsApp or email about this enquiry, as described in the <a href="privacy.html">Privacy Policy</a>.</span></label><span class="field-error" id="${id}-consent-err" role="alert">${ico('alert')}<span></span></span></div>`
    );
    const submitLabel = v === 'visa' ? 'Request Visa Assistance' : v === 'compact' ? 'Request My Quote' : 'Request My Holiday Quote';

    return `
<form class="js-enquiry" novalidate data-variant="${v}" data-endpoint="">
  <div class="form-body">
    <div class="alert alert-error" role="alert" data-alert>${ico('alert')}<span></span></div>
    ${topic ? `<input type="hidden" name="topic" value="${esc(topic)}">` : ''}
    ${v === 'visa' ? '<input type="hidden" name="type" value="Visa Assistance">' : ''}
    <div class="form-grid">${fields.join('')}</div>
    <div class="form-actions" style="margin-top:22px">
      <button type="submit" class="btn btn-gold ${v === 'compact' ? 'btn-block' : ''}"><span data-label>${submitLabel}</span>${ico('send')}</button>
      <button type="button" class="btn btn-wa ${v === 'compact' ? 'btn-block' : ''}" data-wa-form>${ico('whatsapp')} Enquire on WhatsApp</button>
    </div>
    <p class="form-note">${ico('info')}<span>We respond to enquiries personally. Quotes depend on dates and availability; no booking is made until you confirm.</span></p>
  </div>
  <div class="form-success" aria-live="polite" tabindex="-1">
    <div class="tick">${ico('check')}</div>
    <h3>Thank you! Your enquiry is in.</h3>
    <p>Our travel team will get in touch shortly to understand your plans and share a tailored quote.</p>
    <span class="ref" data-ref></span>
    <div class="hero-ctas" style="justify-content:center">
      <a class="btn btn-wa" data-wa-success target="_blank" rel="noopener">${ico('whatsapp')} Also send on WhatsApp</a>
      <button type="button" class="btn btn-ghost" data-new-enquiry>New Enquiry</button>
    </div>
  </div>
</form>`;
  }

  const RULES = {
    name: v => v.trim().length >= 2 && /[a-z]/i.test(v) ? '' : 'Please enter your full name.',
    phone: (v, form) => {
      const d = v.replace(/[\s\-()]/g, '');
      if (!d) return 'Please enter your mobile number.';
      if (!/^\d+$/.test(d)) return 'Use digits only.';
      if (form.elements.code.value === '+91') return /^[6-9]\d{9}$/.test(d) ? '' : 'Enter a valid 10-digit Indian mobile number.';
      return d.length >= 6 && d.length <= 13 ? '' : 'Enter a valid mobile number.';
    },
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email address.',
    destination: v => v.trim() ? '' : 'Tell us where you would like to go.',
    date: v => {
      if (!v) return 'Choose your preferred travel date.';
      const t = new Date(); t.setHours(0, 0, 0, 0);
      return new Date(v + 'T00:00:00') >= t ? '' : 'Please choose a future date.';
    },
    travellers: v => { const n = +v; return Number.isInteger(n) && n >= 1 && n <= 99 ? '' : 'Enter a number between 1 and 99.'; },
    consent: (v, form) => form.elements.consent.checked ? '' : 'Please agree so we can contact you about this enquiry.'
  };

  function validateField(form, name) {
    const wrap = $(`[data-field="${name}"]`, form);
    if (!wrap || !RULES[name]) return true;
    const el = form.elements[name];
    const msg = RULES[name](el.value || '', form);
    wrap.classList.toggle('invalid', !!msg);
    wrap.classList.toggle('valid', !msg && name !== 'consent');
    el.setAttribute('aria-invalid', String(!!msg));
    $('.field-error span', wrap).textContent = msg;
    return !msg;
  }

  const formSummary = form => {
    const f = form.elements; const g = n => (f[n] && f[n].value || '').trim();
    return [
      'Hello Modern Holidays, I would like to enquire:',
      g('topic') && `Package/Service: ${g('topic')}`,
      g('name') && `Name: ${g('name')}`,
      g('phone') && `Mobile: ${g('code')} ${g('phone')}`,
      g('email') && `Email: ${g('email')}`,
      g('destination') && `${form.dataset.variant === 'visa' ? 'Visa for' : 'Destination'}: ${g('destination')}`,
      g('date') && `Travel date: ${g('date')}`,
      g('travellers') && `${form.dataset.variant === 'visa' ? 'Applicants' : 'Travellers'}: ${g('travellers')}`,
      g('budget') && `Budget: ${g('budget')}`,
      g('type') && `Holiday type: ${g('type')}`,
      g('message') && `Notes: ${g('message')}`
    ].filter(Boolean).join('\n');
  };

  function initForms() {
    $$('[data-enquiry-form]').forEach(slot => {
      slot.innerHTML = enquiryForm(slot.dataset.variant, slot.dataset.topic);
    });

    // Pre-fill from URL (e.g. contact.html?enquire=Bali%20Romantic%20Escape)
    const pre = params.get('enquire');
    if (pre) prefill(pre, params.get('dest') || '');

    $$('form.js-enquiry').forEach(form => {
      const alertBox = $('[data-alert]', form);
      Object.keys(RULES).forEach(n => {
        const el = form.elements[n];
        if (!el) return;
        el.addEventListener('blur', () => { if (el.value || n === 'consent') validateField(form, n); });
        el.addEventListener(n === 'consent' ? 'change' : 'input', () => { if ($(`[data-field="${n}"]`, form).classList.contains('invalid')) validateField(form, n); });
      });
      form.elements.code && form.elements.code.addEventListener('change', () => form.elements.phone.value && validateField(form, 'phone'));

      $('[data-wa-form]', form).addEventListener('click', () => window.open(waLink(formSummary(form)), '_blank', 'noopener'));
      $('[data-new-enquiry]', form).addEventListener('click', () => {
        form.reset(); form.classList.remove('sent'); $$('.field', form).forEach(f => f.classList.remove('valid', 'invalid'));
        const first = form.elements.name; first && first.focus();
      });

      form.addEventListener('submit', async e => {
        e.preventDefault();
        alertBox.classList.remove('show');
        const bad = Object.keys(RULES).filter(n => form.elements[n] && !validateField(form, n));
        if (bad.length) {
          $('span', alertBox).textContent = `Please check ${bad.length === 1 ? 'the highlighted field' : `the ${bad.length} highlighted fields`} and try again.`;
          alertBox.classList.add('show');
          form.elements[bad[0]].focus();
          return;
        }
        const btn = $('button[type="submit"]', form);
        const label = $('[data-label]', btn);
        const orig = label.textContent;
        btn.disabled = true; label.textContent = 'Sending…';
        const sendIcon = $('.icon', btn); sendIcon.style.display = 'none';
        const spin = document.createElement('span'); spin.className = 'spinner'; btn.appendChild(spin);

        try {
          const endpoint = form.dataset.endpoint;
          const data = Object.fromEntries(new FormData(form).entries());
          data.consent = true; data.page = location.pathname; data.submittedAt = new Date().toISOString();
          if (endpoint) {
            // PRODUCTION: set data-endpoint (e.g. a CRM webhook, Formspree or your own API).
            const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
            if (!res.ok) throw new Error('Request failed');
          } else {
            // PROTOTYPE: no backend connected yet — simulates a successful submission.
            await new Promise(r => setTimeout(r, 1200));
          }
          const ref = 'MH-' + Date.now().toString(36).toUpperCase().slice(-6);
          $('[data-ref]', form).textContent = `Reference: ${ref}`;
          $('[data-wa-success]', form).href = waLink(formSummary(form) + `\nReference: ${ref}`);
          form.classList.add('sent');
          $('.form-success', form).focus();
        } catch (err) {
          $('span', alertBox).textContent = 'Sorry, we couldn’t send your enquiry right now. Please try again, call us on ' + C.phoneDisplay + ' or use WhatsApp.';
          alertBox.classList.add('show');
        } finally {
          btn.disabled = false; label.textContent = orig; spin.remove(); sendIcon.style.display = '';
        }
      });
    });

    // Newsletter
    $$('form.js-newsletter').forEach(form => {
      const box = form.closest('.newsletter');
      const err = $('.field-error', form);
      form.addEventListener('submit', e => {
        e.preventDefault();
        const email = form.elements.email.value.trim();
        let msg = '';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) msg = 'Enter a valid email address.';
        else if (!form.elements.consent.checked) msg = 'Please tick the box to confirm your subscription.';
        $('span', err).textContent = msg;
        err.style.display = msg ? 'flex' : 'none';
        if (msg) return;
        // PRODUCTION: connect to your email marketing platform here.
        box.classList.add('sent');
      });
    });

    // Enquire buttons anywhere → prefill the nearest form or go to contact page
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-enquire]');
      if (b) { e.preventDefault(); prefill(b.dataset.enquire, b.dataset.enquireDest || '', true); return; }
      const v = e.target.closest('[data-visa-country]');
      if (v) {
        const form = $('form.js-enquiry[data-variant="visa"]');
        if (form) { form.elements.destination.value = v.dataset.visaCountry; validateField(form, 'destination'); form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }); setTimeout(() => form.elements.name.focus({ preventScroll: true }), 500); }
      }
    });
  }

  function prefill(topic, dest, navigate) {
    const form = $('form.js-enquiry:not([data-variant="visa"])');
    if (!form) { if (navigate) location.href = `contact.html?enquire=${encodeURIComponent(topic)}${dest ? '&dest=' + encodeURIComponent(dest) : ''}#enquiry`; return; }
    const f = form.elements;
    if (f.destination && dest) f.destination.value = dest;
    else if (f.destination && !f.destination.value && topic) f.destination.value = topic;
    if (f.message) f.message.value = `I’m interested in: ${topic}`;
    let t = f.topic;
    if (!t) { t = document.createElement('input'); t.type = 'hidden'; t.name = 'topic'; form.querySelector('.form-body').appendChild(t); }
    t.value = topic;
    if (navigate) {
      form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      setTimeout(() => f.name.focus({ preventScroll: true }), 600);
    }
  }

  /* ---------- Detail pages ---------- */
  function setMeta(title, desc) {
    document.title = `${title} | Modern Holidays`;
    const m = $('meta[name="description"]'); if (m && desc) m.setAttribute('content', desc);
  }

  const pageHero = (img, crumbs, inner) => `
<section class="page-hero">
  <div class="hero-bg" data-parallax><img src="${D.U(img, 2000)}" alt="" fetchpriority="high"></div>
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb">${crumbs.map((c, i) => i < crumbs.length - 1 ? `<a href="${c[1]}">${esc(c[0])}</a><span class="sep">/</span>` : `<span aria-current="page">${esc(c[0])}</span>`).join('')}</nav>
    ${inner}
  </div>
  ${waveSVG()}
</section>`;

  const notFound = (what, back, backLabel) => `${pageHero(D.IMG.mountains, [['Home', 'index.html'], [what, back]], `<h1>${what} not found</h1>`)}
<section class="section"><div class="container">${stateHTML('compass', `We couldn’t find that ${what.toLowerCase()}`, 'The link may be outdated, or the page may have moved.', `<a class="btn btn-gold" href="${back}">${backLabel}</a>`)}</div></section>`;

  function renderPackageDetail(main) {
    const p = D.packages.find(x => x.id === params.get('id'));
    if (!p) { main.innerHTML = notFound('Package', 'packages.html', 'Browse All Packages'); setMeta('Package not found'); return; }
    setMeta(`${p.title} – ${p.days} Days / ${p.nights} Nights`, p.overview);
    const related = D.packages.filter(x => x.id !== p.id && (x.continent === p.continent || x.types.some(t => p.types.includes(t)))).slice(0, 3);
    main.innerHTML = `
${pageHero(p.img, [['Home', 'index.html'], ['Holiday Packages', 'packages.html'], [p.title]], `
  <p class="eyebrow">${esc(p.place)}</p>
  <h1>${esc(p.title)}</h1>
  <p class="lead">${esc(p.overview)}</p>
  <div class="pd-facts">
    <span class="chip">${ico('clock')}${p.days} Days / ${p.nights} Nights</span>
    <span class="chip">${ico('pin')}${esc(p.place)}</span>
    <span class="chip">${ico('heart')}${esc(p.types.join(' · '))}</span>
    <span class="chip">${ico('tag')}${budgetLabel[p.budget]}</span>
  </div>`)}
<section class="section" style="padding-top:40px">
  <div class="container pd-layout">
    <div>
      <nav class="pd-tabs" aria-label="Package sections">
        <a href="#overview" class="active">Overview</a><a href="#itinerary">Itinerary</a><a href="#inclusions">Inclusions</a><a href="#hotels">Hotels</a><a href="#notes">Travel Notes</a><a href="#gallery">Gallery</a>
      </nav>
      <section class="pd-section" id="overview">
        <h2>Overview</h2>
        <p class="lead">${esc(p.overview)}</p>
        <h3 style="margin-top:24px">Highlights</h3>
        <ul class="ticks">${p.highlights.map(h => `<li>${ico('check')}<span>${esc(h)}</span></li>`).join('')}</ul>
      </section>
      <section class="pd-section" id="itinerary">
        <h2>Day-by-Day Itinerary</h2>
        <div class="itinerary">${p.itinerary.map(([t, d], i) => `
          <div class="it-day ${i === 0 ? 'open' : ''}">
            <span class="dnum">${String(i + 1).padStart(2, '0')}</span>
            <button type="button" aria-expanded="${i === 0}" aria-controls="day-${i}"><span><small>Day ${i + 1}</small>${esc(t)}</span>${ico('chevron-down')}</button>
            <div class="it-body" id="day-${i}"><div><p>${esc(d)}</p></div></div>
          </div>`).join('')}
        </div>
        <p class="form-note">${ico('info')}<span>The order of sightseeing may change due to weather, local conditions or operating schedules.</span></p>
      </section>
      <section class="pd-section" id="inclusions">
        <h2>Inclusions &amp; Exclusions</h2>
        <div class="two-col">
          <div class="box"><h3>${ico('check')} Included</h3><ul class="ticks">${p.inclusions.map(h => `<li>${ico('check')}<span>${esc(h)}</span></li>`).join('')}</ul></div>
          <div class="box"><h3>${ico('x')} Not Included</h3><ul class="crosses">${p.exclusions.map(h => `<li>${ico('x')}<span>${esc(h)}</span></li>`).join('')}</ul></div>
        </div>
      </section>
      <section class="pd-section" id="hotels">
        <h2>Hotel Details</h2>
        <div class="box" style="display:flex;gap:16px;align-items:flex-start">
          <div class="svc-icon" style="margin:0">${ico('hotel')}</div>
          <div><p style="margin:0 0 6px;color:#fff">${esc(p.hotel)}</p><p style="margin:0;color:var(--muted);font-size:14.5px">Hotels are subject to availability at the time of booking. Similar-category alternatives may be offered.</p></div>
        </div>
      </section>
      <section class="pd-section" id="notes">
        <h2>Travel Notes</h2>
        <ul class="ticks">
          <li>${ico('check')}<span>${p.scope === 'international' ? 'Passport should generally be valid for at least six months from your travel date — please confirm destination-specific rules.' : 'Carry a valid government photo ID for all travellers.'}</span></li>
          ${p.scope === 'international' ? `<li>${ico('check')}<span>Visa requirements vary — our <a class="link-arrow" style="border:0" href="visa.html">visa assistance team</a> can guide you.</span></li>` : ''}
          <li>${ico('check')}<span>Prices are quoted on request and depend on travel dates, hotel category and availability.</span></li>
          <li>${ico('check')}<span>Standard hotel check-in and check-out times apply; early check-in is subject to availability.</span></li>
          <li>${ico('check')}<span>Travel insurance is strongly recommended for all trips.</span></li>
        </ul>
      </section>
      <section class="pd-section" id="gallery">
        <h2>Gallery</h2>
        <div class="gallery">${[p.img].concat(p.gallery).slice(0, 4).map((g, i) => `<figure><img src="${D.U(g, i === 0 ? 1000 : 600)}" alt="${esc(p.title)} — photo ${i + 1}" loading="lazy"></figure>`).join('')}</div>
      </section>
    </div>
    <aside class="pd-aside" id="enquiry">
      <div class="aside-card">
        <div class="pkg-price"><small>Starting from</small><strong>${priceHTML(p)}</strong></div>
        <h3 style="font-size:20px">Enquire about this holiday</h3>
        <p style="color:var(--muted);font-size:14.5px">Share your dates and we’ll send a tailored quote.</p>
        <div data-enquiry-form data-variant="compact" data-topic="${esc(p.title)}"></div>
      </div>
    </aside>
  </div>
</section>
${related.length ? `<section class="section bg-deep"><div class="container"><div class="head-row"><div class="section-head"><p class="eyebrow">You may also like</p><h2>Related Holidays</h2></div><a class="link-arrow" href="packages.html">All packages ${ico('arrow-right')}</a></div><div class="pkg-grid">${related.map(pkgCard).join('')}</div></div></section>` : ''}`;

    $$('.it-day button', main).forEach(b => b.addEventListener('click', () => {
      const d = b.parentElement; const open = !d.classList.contains('open'); d.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open));
    }));
    const links = $$('.pd-tabs a', main);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(ents => ents.forEach(en => {
        if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
      }), { rootMargin: '-40% 0px -55% 0px' });
      $$('.pd-section', main).forEach(s => io.observe(s));
    }
  }

  function renderDestinationDetail(main) {
    const d = D.destinations.find(x => x.id === params.get('id'));
    if (!d) { main.innerHTML = notFound('Destination', 'destinations.html', 'Explore Destinations'); setMeta('Destination not found'); return; }
    setMeta(`${d.name}, ${d.country} Holidays`, `${d.desc} Plan your ${d.name} holiday with Modern Holidays.`);
    const cont = D.continents.find(c => c.id === d.continent);
    const pk = D.packages.filter(p => p.dest === d.id);
    const pkMore = pk.length ? pk : D.packages.filter(p => p.continent === d.continent).slice(0, 3);
    const more = D.destinations.filter(x => x.continent === d.continent && x.id !== d.id).slice(0, 4);
    main.innerHTML = `
${pageHero(d.img, [['Home', 'index.html'], ['Destinations', 'destinations.html'], [cont.name, `destinations.html?continent=${cont.id}`], [d.name]], `
  <p class="eyebrow">${esc(d.tag)}</p>
  <h1>${esc(d.name)}${d.name === d.country ? '' : `<span class="accent" style="font-size:.5em;display:block;margin-top:8px">${esc(d.country)}</span>`}</h1>
  <p class="lead">${esc(d.desc)}</p>
  <div class="hero-ctas"><button type="button" class="btn btn-gold" data-enquire="${esc(d.name)} holiday" data-enquire-dest="${esc(d.name)}, ${esc(d.country)}">Plan a ${esc(d.name)} Holiday ${ico('arrow-right')}</button><a class="btn btn-ghost" href="${waLink(`Hello Modern Holidays, I'd like to plan a holiday to ${d.name}.`)}" target="_blank" rel="noopener">${ico('whatsapp')} WhatsApp</a></div>`)}
<section class="section">
  <div class="container">
    <div class="head-row"><div class="section-head"><p class="eyebrow">${pk.length ? 'Holiday packages' : `More from ${esc(cont.name)}`}</p><h2>${pk.length ? `${esc(d.name)} Holidays` : 'Suggested Holidays'}</h2>${pk.length ? '' : `<p>We don’t have a ready ${esc(d.name)} package listed yet — we can create a custom itinerary for you. Meanwhile, explore these.</p>`}</div><a class="link-arrow" href="packages.html">All packages ${ico('arrow-right')}</a></div>
    <div class="pkg-grid">${pkMore.map(pkgCard).join('')}</div>
  </div>
</section>
${more.length ? `<section class="section bg-deep"><div class="container"><div class="section-head"><p class="eyebrow">Keep exploring</p><h2>More in ${esc(cont.name)}</h2></div><div class="dest-grid swipe">${more.map(destCard).join('')}</div></div></section>` : ''}
<section class="section" id="enquiry"><div class="container" style="max-width:900px"><div class="section-head center"><p class="eyebrow">Custom itinerary</p><h2>Plan Your ${esc(d.name)} Holiday</h2><p>Tell us your dates and preferences — we’ll design a trip around you.</p></div><div class="aside-card"><div data-enquiry-form data-variant="full" data-topic="${esc(d.name)} holiday"></div></div></div></section>`;
  }

  function renderArticle(main) {
    const p = D.posts.find(x => x.id === params.get('id'));
    if (!p) { main.innerHTML = notFound('Article', 'blog.html', 'Back to the Blog'); setMeta('Article not found'); return; }
    setMeta(p.title, p.excerpt);
    main.innerHTML = `
${pageHero(p.img, [['Home', 'index.html'], ['Travel Blog', 'blog.html'], [p.cat]], `
  <p class="eyebrow">${esc(p.cat)}</p>
  <h1>${esc(p.title)}</h1>
  <div class="article-hero-meta"><span>${ico('clock')} ${esc(p.read)} read</span><span>${ico('user')} Modern Holidays Travel Desk</span></div>`)}
<section class="section" style="padding-top:50px">
  <div class="container">
    <article class="article">
      <p class="lead" style="font-size:20px;color:#fff">${esc(p.excerpt)}</p>
      <div class="prose">${p.body}</div>
      <div class="share-row"><strong style="margin-right:6px">Share:</strong>
        <a class="icon-btn" href="https://wa.me/?text=${encodeURIComponent(p.title + ' ' + location.href)}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">${ico('whatsapp')}</a>
        <a class="icon-btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" target="_blank" rel="noopener" aria-label="Share on Facebook">${ico('facebook')}</a>
        <a class="btn btn-gold btn-sm" style="margin-left:auto" href="contact.html#enquiry">Plan a Trip With Us</a>
      </div>
    </article>
  </div>
</section>
<section class="section bg-deep"><div class="container"><div class="head-row"><div class="section-head"><p class="eyebrow">Keep reading</p><h2>Related Reading</h2></div><a class="link-arrow" href="blog.html">All articles ${ico('arrow-right')}</a></div><div class="blog-grid" data-blog-grid data-limit="3" data-exclude="${p.id}"></div></div></section>`;
  }

  function initDetailPages() {
    const pkg = $('[data-package-detail]'); if (pkg) renderPackageDetail(pkg);
    const dst = $('[data-destination-detail]'); if (dst) renderDestinationDetail(dst);
    const art = $('[data-article]'); if (art) renderArticle(art);
  }

  /* ---------- Global image fallback ---------- */
  document.addEventListener('error', e => {
    const t = e.target;
    if (t && t.tagName === 'IMG' && !t.dataset.fb) { t.dataset.fb = '1'; t.src = FALLBACK_IMG; }
  }, true);

  /* ---------- Boot ---------- */
  renderHeader();
  renderFooter();
  initDetailPages();
  hydrateIcons();
  initHeader();
  initHero();
  initExplorers();
  initPackageGrids();
  initGrids();
  initCarousels();
  initForms();
  observeReveals();

  // Honour #hash after dynamic content renders
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) setTimeout(() => target.scrollIntoView({ block: 'start' }), 120);
  }
})();
