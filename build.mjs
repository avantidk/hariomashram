// Static site generator: node build.mjs  ->  writes ./public (English at /, Hindi at /hi/)
import fs from 'node:fs';
import path from 'node:path';
import { SITE_URL, ORG } from './src/config.mjs';
import { posts } from './src/posts.mjs';
import { esc, img, icon } from './src/helpers.mjs';
import { taxNote, bankBox, workCards, cta } from './src/blocks.mjs';
import contentPages from './src/content.mjs';
import { campaigns, campaignPages } from './src/campaigns.mjs';

const OUT = '.';
// L(en, hi): returns the English text and records the Hindi pair; the browser swaps text when the user toggles language.
let reg = new Map();
const L = (en, hi) => { if (reg.has(en) && reg.get(en) !== hi) console.warn('Conflicting translation for:', en); reg.set(en, hi); return en; };
const fmtDate = (d, lang) => new Date(d).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

// ---------- page bodies: (L, u) => html.  L(en,hi) picks language, u(path) builds a language-aware URL ----------
const donateCards = (L) => `
<div class="cards donate-cards">
  <article class="card donate"><h3>${L('Token Gift', 'सांकेतिक भेंट')}</h3><p class="amt">₹101</p><p>${L('A small gesture of support.', 'सहयोग की एक छोटी भावना।')}</p><button class="btn btn-primary" data-donate data-amount="101" data-purpose="token">${icon("heart")} ${L("Donate", "दान करें")}</button></article>
  <article class="card donate"><h3>${L('Fodder Kit', 'चारा किट')}</h3><p class="amt">₹501</p><p>${L('Feeds cows for a day.', 'एक दिन गायों को भोजन।')}</p><button class="btn btn-primary" data-donate data-amount="501" data-purpose="fodder">${icon("heart")} ${L("Donate", "दान करें")}</button></article>
  <article class="card donate"><h3>${L('Medical Aid Kit', 'चिकित्सा किट')}</h3><p class="amt">₹2,100</p><p>${L('Treatment for injured cows.', 'घायल गायों का उपचार।')}</p><button class="btn btn-primary" data-donate data-amount="2100" data-purpose="medical">${icon("heart")} ${L("Donate", "दान करें")}</button></article>
  <article class="card donate"><h3>${L('Any Amount', 'कोई भी राशि')}</h3><label class="amt-input">₹ <input id="custom-amount" type="number" min="1" inputmode="numeric" placeholder="${L('Amount', 'राशि')}" aria-label="${L('Amount in rupees', 'राशि (रुपये)')}"></label><p>${L('Give what you wish.', 'अपनी इच्छानुसार दें।')}</p><button class="btn btn-primary" data-donate data-custom data-purpose="custom">${icon("heart")} ${L("Donate", "दान करें")}</button></article>
</div>
<p id="donate-msg" class="note" role="status" data-soon="${L('Online donation will be enabled soon. Meanwhile please use the bank details on this page.', 'ऑनलाइन दान जल्द ही शुरू होगा। तब तक कृपया इस पृष्ठ पर दिए बैंक विवरण का उपयोग करें।')}" data-invalid="${L('Please enter a valid amount.', 'कृपया सही राशि दर्ज करें।')}"></p>`;


const pages = [
{ key: 'donate', path: 'donate/', title: ['Donate', 'दान करें'],
  desc: ['Donate to Hariom Ashram Kadwapani for cow care, gurukul education and the environment. 80G tax benefit available.', 'गौसेवा, गुरुकुल शिक्षा और पर्यावरण के लिए हरिओम आश्रम कड़वापानी को दान करें। 80G कर-लाभ उपलब्ध।'],
  body: (L, u) => `<div class="container">${donateCards(L)}${taxNote(L)}<div class="two-col" style="margin-top:32px">${bankBox(L)}<div class="photo">${img('calf-at-ashram', L('A young calf at the ashram', 'आश्रम का एक बछड़ा'), 560, 560)}</div></div></div>` },

{ key: 'transparency', path: 'transparency/', title: ['Transparency & Bank Details', 'पारदर्शिता एवं बैंक विवरण'],
  desc: ['Bank account details and 80G tax exemption registration of Hariom Ashram Kadwapani.', 'हरिओम आश्रम कड़वापानी के बैंक खाते का विवरण और 80G कर-छूट पंजीकरण।'],
  body: (L, u) => `<div class="container"><div class="two-col">${bankBox(L)}<div class="box"><h3>${L('Tax Exemption (80G)', 'कर-छूट (80G)')}</h3><p>${L(ORG.tax80g, 'आयकर अधिनियम की धारा 80G(5)(iii) के अंतर्गत कर-मुक्त, पंजीकरण संख्या AABTH0927L22LK01')}</p><p class="note">${L('Other certificates and registrations can be listed here.', 'अन्य प्रमाणपत्र और पंजीकरण यहाँ सूचीबद्ध किए जा सकते हैं।')}</p></div></div></div>` },

{ key: 'blog', path: 'blog/', title: ['Blog', 'ब्लॉग'],
  desc: ['News, stories and updates from Hariom Ashram Kadwapani: cow care, gurukul and environment.', 'हरिओम आश्रम कड़वापानी की खबरें, कहानियाँ और अपडेट: गौसेवा, गुरुकुल और पर्यावरण।'],
  body: (L, u) => `<div class="container"><div class="cards">${postCards(L, u, posts)}</div></div>` },

{ key: 'contact', path: 'contact/', title: ['Contact Us', 'संपर्क करें'],
  desc: ['Contact Hariom Ashram Kadwapani, Karbari Grant, Dehradun, Uttarakhand 248171. WhatsApp, social media and map.', 'हरिओम आश्रम कड़वापानी, करबारी ग्रांट, देहरादून, उत्तराखंड 248171 से संपर्क करें। WhatsApp, सोशल मीडिया और मानचित्र।'],
  body: (L, u) => `<div class="container two-col"><div>
  <address><p class="row">${icon('home')}<strong>${L(ORG.name.en, ORG.name.hi)}</strong></p><p class="row">${icon('pin')}<span>${L(ORG.addr.en, ORG.addr.hi)}</span></p><p class="row">${icon('whatsapp-f')}<a href="${ORG.whatsapp}" target="_blank" rel="noopener">${ORG.whatsappDisplay}</a></p></address>
  <p class="social">${socialLinks()}</p>
  <a class="btn btn-ghost dark" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Kadwapani+Karbari+Grant+Dehradun+248171">${L('Open in Google Maps', 'गूगल मैप्स में खोलें')}</a></div>
  <form id="contact-form" class="form" novalidate data-fill="${L('Please fill all fields.', 'कृपया सभी फ़ील्ड भरें।')}" data-soon="${L('Thank you! Form submission will be enabled soon. Please message us on WhatsApp meanwhile.', 'धन्यवाद! फ़ॉर्म जल्द शुरू होगा। तब तक कृपया WhatsApp पर संदेश भेजें।')}">
  <label><span>${L('Your name', 'आपका नाम')}</span><input name="name" required autocomplete="name"></label>
  <label><span>${L('Email or phone', 'ईमेल या फोन')}</span><input name="contact" required></label>
  <label><span>${L('Message', 'संदेश')}</span><textarea name="message" rows="4" required></textarea></label>
  <button class="btn btn-primary" type="submit">${icon('mail')} ${L('Send Message', 'संदेश भेजें')}</button><p id="form-msg" class="note" role="status"></p></form></div>` }
];

function socialLinks() {
  const ic = { Facebook: 'facebook-f', Instagram: 'instagram-f', YouTube: 'youtube-f' };
  return Object.entries(ORG.social).map(([n, h]) => `<a class="soc" href="${h}" target="_blank" rel="noopener me" aria-label="${n}" title="${n}">${icon(ic[n])}</a>`).join('') +
    `<a class="soc" href="${ORG.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp">${icon('whatsapp-f')}</a>`;
}
function postCards(L, u, list) {
  return list.map(p => `<a class="card link" href="${u('blog/' + p.slug + '/')}">${img(p.img, L(p.title.en, p.title.hi), 560, 560)}<time datetime="${p.date}">${L(fmtDate(p.date, 'en'), fmtDate(p.date, 'hi'))}</time><h3>${L(p.title.en, p.title.hi)}</h3><p>${L(p.excerpt.en, p.excerpt.hi)}</p></a>`).join('');
}

pages.splice(0, 0, ...contentPages, ...campaignPages);
// blog posts become pages too
for (const p of posts) {
  pages.push({ key: 'post-' + p.slug, path: `blog/${p.slug}/`, crumbs: ['blog'], post: p, title: [p.title.en, p.title.hi], desc: [p.excerpt.en, p.excerpt.hi],
    body: (L, u) => `<article class="container article"><time datetime="${p.date}">${L(fmtDate(p.date, 'en'), fmtDate(p.date, 'hi'))}</time>${img(p.img, L(p.title.en, p.title.hi), 560, 560, 'fetchpriority="high" loading="eager"')}${p.body.en.map((t, i) => `<p>${L(t, p.body.hi[i])}</p>`).join('')}<p><a class="btn btn-primary" href="${u('donate/')}">${L('Support our work', 'हमारे कार्य में सहयोग करें')}</a></p></article>` });
}
const byKey = Object.fromEntries(pages.map(p => [p.key, p]));

// ---------- layout ----------
const u = p => '/' + p;
function render(page) {
  reg = new Map();
  const url = SITE_URL + '/' + page.path;
  const T = L(page.title[0], page.title[1]);
  const D = L(page.desc[0], page.desc[1]);
  const full = page.key === 'home' ? L(`${ORG.name.en} | ${page.title[0]}`, `${ORG.name.hi} | ${page.title[1]}`) : L(`${page.title[0]} | ${ORG.name.en}`, `${page.title[1]} | ${ORG.name.hi}`);
  const body = page.body(L, u);
  const lnk = (p, t) => `<a href="${u(p)}"${page.path.startsWith(p) && p ? ' aria-current="page"' : ''}>${t}</a>`;
  const campLabel = L('Campaign', 'अभियान');
  const dropdown = `<div class="dd"><a href="${u('campaigns/')}"${page.path.startsWith('campaigns/') ? ' aria-current="page"' : ''}>${campLabel} <span class="caret" aria-hidden="true">▾</span></a><button type="button" class="dd-toggle" aria-expanded="false" aria-label="${L('Show campaign menu', 'अभियान मेनू खोलें')}"><span aria-hidden="true">▾</span></button><div class="dd-menu">${campaigns.map(c => lnk(`campaigns/${c.slug}/`, L(c.title.en, c.title.hi))).join('')}</div></div>`;
  const nav = lnk('about-hariom-ashram/', L('About', 'हमारे बारे में')) + lnk('our-work/', L('Our Work', 'हमारा कार्य')) + dropdown + lnk('csr/', L('CSR', 'CSR')) + lnk('blog/', L('Blog', 'ब्लॉग')) + lnk('contact/', L('Contact', 'संपर्क'));
  const footNav = lnk('about-hariom-ashram/', L('About', 'हमारे बारे में')) + lnk('our-work/', L('Our Work', 'हमारा कार्य')) + lnk('campaigns/', campLabel) + lnk('csr/', L('CSR', 'CSR')) + lnk('blog/', L('Blog', 'ब्लॉग')) + lnk('transparency/', L('Transparency', 'पारदर्शिता')) + lnk('contact/', L('Contact', 'संपर्क'));
  const crumbs = `<nav class="crumbs" aria-label="breadcrumb"><a href="${u('')}">${L('Home', 'होम')}</a> › ${(page.crumbs || []).map(k => `<a href="${u(byKey[k].path)}">${L(byKey[k].title[0], byKey[k].title[1])}</a> › `).join('')}<span>${T}</span></nav>`;
  const head = page.key === 'home' ? '' : `<header class="page-head"><div class="container">${crumbs}<h1>${T}</h1></div></header>`;
  const ogImg = SITE_URL + `/assets/img/${page.post ? page.post.img : (page.og || 'cows-in-shed')}.webp`;
  const ld = [{ '@context': 'https://schema.org', '@type': 'NGO', '@id': SITE_URL + '/#org', name: ORG.name.en, alternateName: 'Hariom Ashram', url: SITE_URL + '/', logo: SITE_URL + '/assets/logo-large.webp', image: ogImg, foundingDate: '2006',
    description: 'Gaushala, gurukul and environment work at Kadwapani, Karbari Grant, Dehradun, Uttarakhand.', sameAs: Object.values(ORG.social),
    contactPoint: { '@type': 'ContactPoint', telephone: '+91-8193989452', contactType: 'customer support', availableLanguage: ['en', 'hi'] },
    address: { '@type': 'PostalAddress', streetAddress: 'Kadwapani, Karbari Grant', addressLocality: 'Dehradun', addressRegion: 'Uttarakhand', postalCode: '248171', addressCountry: 'IN' } },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: ORG.name.en, url: SITE_URL + '/', inLanguage: ['en', 'hi'], publisher: { '@id': SITE_URL + '/#org' } }];
  if (page.key !== 'home' && page.key !== 'notfound') {
    const trail = [['Home', SITE_URL + '/'], ...(page.crumbs || []).map(k => [byKey[k].title[0], SITE_URL + '/' + byKey[k].path]), [page.title[0], url]];
    ld.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: trail.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) });
  }
  if (page.post) ld.push({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: page.post.title.en, description: page.desc[0], datePublished: page.post.date, dateModified: page.post.date, image: ogImg, mainEntityOfPage: url, author: { '@type': 'Organization', name: ORG.name.en }, publisher: { '@id': SITE_URL + '/#org' } });
  const btnLabel = L('हिंदी', 'English');
  const footName = L(ORG.name.en, ORG.name.hi), footAddr = L(ORG.addr.en, ORG.addr.hi);
  const footer = `<footer class="site-footer"><div class="container foot-grid">
  <div><strong>${footName}</strong><p>${footAddr}</p><p>${taxShort(L)}</p></div>
  <div><strong>${L('Explore', 'अन्वेषण')}</strong><p class="flinks">${footNav}<a href="${u('donate/')}">${L('Donate', 'दान करें')}</a></p></div>
  <div><strong>${L('Follow us', 'हमसे जुड़ें')}</strong><p class="social">${socialLinks()}</p></div></div>
  <div class="container copy">© ${new Date().getFullYear()} ${footName}</div></footer>`;
  const skip = L('Skip to content', 'मुख्य सामग्री पर जाएँ'), menuLbl = L('Menu', 'मेनू'), donate = L('Donate', 'दान करें');
  const brandTitle = L('Hariom Ashram', 'हरिओम आश्रम');
  const dict = JSON.stringify(Object.fromEntries(reg)).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(D)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${page.post ? 'article' : 'website'}"><meta property="og:site_name" content="${esc(ORG.name.en)}"><meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(D)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${ogImg}"><meta property="og:image:alt" content="${esc(T)}"><meta property="og:locale" content="en_IN"><meta property="og:locale:alternate" content="hi_IN">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(full)}"><meta name="twitter:description" content="${esc(D)}"><meta name="twitter:image" content="${ogImg}">
<meta name="robots" content="index,follow,max-image-preview:large"><meta name="author" content="${esc(ORG.name.en)}"><meta name="geo.region" content="IN-UT"><meta name="geo.placename" content="Dehradun">
<meta name="theme-color" content="#2E7D32">
<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/assets/favicon-32.png" type="image/png" sizes="32x32"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip" href="#main">${skip}</a>
<div class="topbar"><div class="container">${icon('shield')} <span>${L('All donations are tax exempted under section 80G(5)(iii) of Income Tax Act', 'सभी दान आयकर अधिनियम की धारा 80G(5)(iii) के अंतर्गत कर-मुक्त हैं')}</span></div></div>
<header class="site-header"><div class="container nav">
  <a class="brand" href="${u('')}"><img src="/assets/logo.webp" alt="" width="${LOGO_W}" height="64"><span><strong>${brandTitle}</strong><small>गौशाला । गुरुकुल । पर्यावरण</small></span></a>
  <nav id="menu" class="menu">${nav}
    <a class="btn btn-primary menu-donate" href="${u('donate/')}">${icon('heart')} ${donate}</a></nav>
  <div class="nav-right">
    <button type="button" class="lang-switch" data-lang-toggle>${btnLabel}</button>
    <a class="btn btn-primary nav-donate" href="${u('donate/')}">${icon('heart')} ${donate}</a>
    <button class="menu-btn" aria-label="${menuLbl}" aria-expanded="false" aria-controls="menu">☰</button></div></div></header>
<main id="main">${head}<div class="${page.key === 'home' ? '' : 'section'}">${body}</div></main>
${footer}
<script type="application/json" id="hi-dict">${dict}</script>
<script src="/js/main.js"></script>
</body></html>`;
}
const taxShort = L => L('80G tax exempted · Reg. No AABTH0927L22LK01', '80G कर-मुक्त · पंजीकरण संख्या AABTH0927L22LK01');
const LOGO_W = 60;

// ---------- write ----------
fs.mkdirSync(OUT + '/css', { recursive: true }); fs.mkdirSync(OUT + '/js', { recursive: true });
// If the site lives under a sub-path (e.g. github.io/hariomashram), prefix every root-relative link with it.
const BASE = new URL(SITE_URL).pathname.replace(/\/$/, '');
const fix = html => html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`);
fs.writeFileSync(OUT + '/css/style.css', fs.readFileSync('src/style.css', 'utf8') + '\n' + fs.readFileSync('src/style-extra.css', 'utf8') + '\n' + fs.readFileSync('src/style-nav.css', 'utf8')); fs.copyFileSync('src/main.js', OUT + '/js/main.js');
fs.writeFileSync(OUT + '/manifest.webmanifest', fs.readFileSync('src/manifest.webmanifest', 'utf8').replaceAll('"/', `"${BASE}/`));
fs.writeFileSync(OUT + '/.nojekyll', '');
const urls = [];
for (const page of pages) {
  const dir = path.join(OUT, page.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), fix(render(page)));
  urls.push(SITE_URL + '/' + page.path);
}
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(OUT + '/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(l => `<url><loc>${l}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(OUT + '/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(OUT + '/404.html', fix(render({ key: 'notfound', path: '404.html', title: ['Page not found', 'पृष्ठ नहीं मिला'], desc: ['Page not found', 'पृष्ठ नहीं मिला'], body: L => `<div class="container"><p>${L('Sorry, that page does not exist.', 'क्षमा करें, यह पृष्ठ मौजूद नहीं है।')} <a href="/">${L('Go home', 'होम पर जाएँ')}</a></p></div>` })).replace('index,follow,max-image-preview:large', 'noindex'));
console.log(`Built ${urls.length} pages into ${OUT}/`);
