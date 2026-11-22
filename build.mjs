// Static site generator: node build.mjs  ->  writes ./public (English at /, Hindi at /hi/)
import fs from 'node:fs';
import path from 'node:path';
import { SITE_URL, ORG } from './src/config.mjs';
import { posts } from './src/posts.mjs';

const OUT = '.';
// L(en, hi): returns the English text and records the Hindi pair; the browser swaps text when the user toggles language.
let reg = new Map();
const L = (en, hi) => { if (reg.has(en) && reg.get(en) !== hi) console.warn('Conflicting translation for:', en); reg.set(en, hi); return en; };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, w, h, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async" ${extra}>`;
const fmtDate = (d, lang) => new Date(d).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

// ---------- page bodies: (L, u) => html.  L(en,hi) picks language, u(path) builds a language-aware URL ----------
const donateCards = (L) => `
<div class="cards donate-cards">
  <article class="card donate"><h3>${L('Token Gift', 'सांकेतिक भेंट')}</h3><p class="amt">₹101</p><p>${L('A small gesture of support.', 'सहयोग की एक छोटी भावना।')}</p><button class="btn btn-primary" data-donate data-amount="101" data-purpose="token">${L('Donate', 'दान करें')}</button></article>
  <article class="card donate"><h3>${L('Fodder Kit', 'चारा किट')}</h3><p class="amt">₹501</p><p>${L('Feeds cows for a day.', 'एक दिन गायों को भोजन।')}</p><button class="btn btn-primary" data-donate data-amount="501" data-purpose="fodder">${L('Donate', 'दान करें')}</button></article>
  <article class="card donate"><h3>${L('Medical Aid Kit', 'चिकित्सा किट')}</h3><p class="amt">₹2,100</p><p>${L('Treatment for injured cows.', 'घायल गायों का उपचार।')}</p><button class="btn btn-primary" data-donate data-amount="2100" data-purpose="medical">${L('Donate', 'दान करें')}</button></article>
  <article class="card donate"><h3>${L('Any Amount', 'कोई भी राशि')}</h3><label class="amt-input">₹ <input id="custom-amount" type="number" min="1" inputmode="numeric" placeholder="${L('Amount', 'राशि')}" aria-label="${L('Amount in rupees', 'राशि (रुपये)')}"></label><p>${L('Give what you wish.', 'अपनी इच्छानुसार दें।')}</p><button class="btn btn-primary" data-donate data-custom data-purpose="custom">${L('Donate', 'दान करें')}</button></article>
</div>
<p id="donate-msg" class="note" role="status" data-soon="${L('Online donation will be enabled soon. Meanwhile please use the bank details on this page.', 'ऑनलाइन दान जल्द ही शुरू होगा। तब तक कृपया इस पृष्ठ पर दिए बैंक विवरण का उपयोग करें।')}" data-invalid="${L('Please enter a valid amount.', 'कृपया सही राशि दर्ज करें।')}"></p>`;

const taxNote = L => `<div class="tax">${L(ORG.tax80g, 'आयकर अधिनियम की धारा 80G(5)(iii) के अंतर्गत कर-मुक्त, पंजीकरण संख्या AABTH0927L22LK01')}</div>`;

const bankBox = L => `<div class="box"><h3>${L('Bank Transfer', 'बैंक ट्रांसफर')}</h3><dl>
<dt>${L('Bank', 'बैंक')}</dt><dd>${ORG.bank.bank}</dd>
<dt>IFSC</dt><dd>${ORG.bank.ifsc}</dd>
<dt>${L('Account name', 'खाते का नाम')}</dt><dd>${ORG.bank.name}</dd>
<dt>${L('Account number', 'खाता संख्या')}</dt><dd>${ORG.bank.acc}</dd></dl>
<p class="note">${L('After transferring, please send the payment screenshot on WhatsApp for your receipt.', 'ट्रांसफर के बाद रसीद के लिए कृपया भुगतान का स्क्रीनशॉट WhatsApp पर भेजें।')}</p>
<a class="btn btn-ghost dark" target="_blank" rel="noopener" href="${ORG.whatsapp}">${L('Send on WhatsApp', 'WhatsApp पर भेजें')}</a></div>`;

const workCards = (L, u) => `<div class="cards">
 <a class="card link" href="${u('our-work/gaushala/')}">${img('cows-in-shed', L('Cows resting in the gaushala shed', 'गौशाला के शेड में गौमाताएँ'), 600, 338)}<h3>${L('Gaushala & Animal Rescue', 'गौशाला एवं पशु रक्षा')}</h3><p>${L('Shelter, fodder and medical care for rescued, abandoned and injured cows.', 'बेसहारा, परित्यक्त और घायल गायों के लिए आश्रय, चारा और चिकित्सा।')}</p></a>
 <a class="card link" href="${u('our-work/gurukul/')}">${img('gurukul-children-prasad', L('Gurukul children praying before a meal', 'भोजन से पहले प्रार्थना करते गुरुकुल के बच्चे'), 560, 560)}<h3>${L('Gurukul', 'गुरुकुल')}</h3><p>${L('Value-based education for children, combining studies, Sanskrit and life skills.', 'पढ़ाई, संस्कृत और जीवन-कौशल के साथ संस्कारयुक्त शिक्षा।')}</p></a>
 <a class="card link" href="${u('our-work/environment/')}"><div class="icon">🌳</div><h3>${L('Environment', 'पर्यावरण')}</h3><p>${L('Tree plantation, organic farming and awareness drives for a greener Uttarakhand.', 'वृक्षारोपण, जैविक खेती और हरित उत्तराखंड के लिए जागरूकता।')}</p></a>
</div>`;

const cta = (L, u) => `<section class="join"><div class="container"><h2>${L('Be part of the seva', 'सेवा से जुड़ें')}</h2><p>${L('Donate, volunteer or visit the ashram.', 'दान करें, स्वयंसेवक बनें या आश्रम आएँ।')}</p><a class="btn btn-light" href="${u('donate/')}">${L('Donate Now', 'अभी दान करें')}</a> <a class="btn btn-ghost" href="${u('contact/')}">${L('Contact Us', 'संपर्क करें')}</a></div></section>`;

const pages = [
{ key: 'home', path: '', title: ['Gaushala, Gurukul & Environment in Dehradun', 'देहरादून में गौशाला, गुरुकुल और पर्यावरण सेवा'],
  desc: ['Hariom Ashram Kadwapani, Karbari Grant, Dehradun: cow shelter, gurukul education and environment work. Donate with 80G tax benefit.', 'हरिओम आश्रम कड़वापानी, करबारी ग्रांट, देहरादून: गौशाला, गुरुकुल शिक्षा और पर्यावरण सेवा। 80G कर-लाभ के साथ दान करें।'],
  body: (L, u) => `
<section class="hero"><div class="container hero-grid">
  <div><p class="eyebrow">${L('Gaushala · Gurukul · Environment', 'गौशाला · गुरुकुल · पर्यावरण')}</p>
  <h1>${L('Serving cows, nurturing children, protecting nature.', 'गौसेवा, बच्चों की शिक्षा और प्रकृति का संरक्षण।')}</h1>
  <p class="lead">${L('Hariom Ashram Kadwapani is a community-run ashram near Dehradun, caring for rescued cows, educating children and greening the land.', 'हरिओम आश्रम कड़वापानी देहरादून के पास एक सामुदायिक आश्रम है, जहाँ बेसहारा गौमाताओं की सेवा, बच्चों की शिक्षा और भूमि को हरा-भरा करने का कार्य होता है।')}</p>
  <div class="actions"><a class="btn btn-primary" href="${u('donate/')}">${L('Donate Now', 'अभी दान करें')}</a><a class="btn btn-ghost" href="${u('our-work/')}">${L('See Our Work', 'हमारा कार्य देखें')}</a></div></div>
  <div class="hero-art">${img('swami-with-calf', L('Ashram swami lovingly holding a rescued calf', 'आश्रम के स्वामीजी एक बचाए गए बछड़े को स्नेह से थामे हुए'), 413, 450, 'fetchpriority="high" loading="eager"')}</div>
</div></section>
<section class="stats"><div class="container stat-grid">
 <div><b>🐄</b><span>${L('Cow rescue & shelter', 'गौ रक्षा एवं आश्रय')}</span></div><div><b>📚</b><span>${L('Gurukul education', 'गुरुकुल शिक्षा')}</span></div>
 <div><b>🌳</b><span>${L('Plantation drives', 'वृक्षारोपण अभियान')}</span></div><div><b>🪔</b><span>${L('Yagya & community events', 'यज्ञ एवं सामुदायिक आयोजन')}</span></div></div></section>
<section class="section"><div class="container two-col">
  <div><h2>${L('About Us', 'हमारे बारे में')}</h2>
  <p>${L('Hariom Ashram Kadwapani was founded on the belief that service to living beings, education and care for the environment belong together.', 'हरिओम आश्रम कड़वापानी इस विश्वास पर स्थापित है कि जीव सेवा, शिक्षा और पर्यावरण की देखभाल एक-दूसरे से जुड़ी हैं।')}</p>
  <a class="btn btn-ghost dark" href="${u('about/')}">${L('Read more', 'और जानें')}</a></div>
  <div class="photo">${img('cow-eating-gaushala', L('A cow eating fresh vegetables at the gaushala', 'गौशाला में ताज़ी सब्ज़ियाँ खाती एक गाय'), 480, 480)}</div></div></section>
<section class="section alt"><div class="container"><h2>${L('What We Do', 'हम क्या करते हैं')}</h2><p class="sub">${L('Three pillars guide everything the ashram does.', 'तीन स्तंभ आश्रम के हर कार्य का आधार हैं।')}</p>${workCards(L, u)}</div></section>
<section class="section"><div class="container"><h2>${L('Support Our Work', 'हमारे कार्य में सहयोग करें')}</h2><p class="sub">${L('Every contribution goes directly towards the care of cows, children and the environment.', 'आपका हर योगदान सीधे गौसेवा, बच्चों और पर्यावरण के कार्य में लगता है।')}</p>${donateCards(L)}${taxNote(L)}</div></section>
<section class="section alt"><div class="container"><h2>${L('Latest from the Blog', 'ब्लॉग से ताज़ा')}</h2><div class="cards">${postCards(L, u, posts.slice(0, 3))}</div><p style="margin-top:20px"><a class="btn btn-ghost dark" href="${u('blog/')}">${L('All posts', 'सभी पोस्ट')}</a></p></div></section>
${cta(L, u)}` },

{ key: 'about', path: 'about/', title: ['About Us', 'हमारे बारे में'],
  desc: ['About Hariom Ashram Kadwapani, a gaushala, gurukul and environment ashram at Karbari Grant, Dehradun.', 'हरिओम आश्रम कड़वापानी के बारे में जानें: करबारी ग्रांट, देहरादून में गौशाला, गुरुकुल और पर्यावरण आश्रम।'],
  body: (L, u) => `<div class="container two-col"><div>
  <p>${L('Hariom Ashram Kadwapani is a community-run ashram at Kadwapani, Karbari Grant, Dehradun. We shelter and treat cows, run a gurukul for children, and organise tree plantation and awareness drives with local villagers.', 'हरिओम आश्रम कड़वापानी, करबारी ग्रांट, देहरादून में स्थित एक सामुदायिक आश्रम है। हम गौमाताओं को आश्रय व उपचार देते हैं, बच्चों के लिए गुरुकुल चलाते हैं और ग्रामीणों के साथ वृक्षारोपण व जागरूकता अभियान करते हैं।')}</p>
  <p>${L('Our work rests on one belief: service to living beings, education and care for nature belong together.', 'हमारा कार्य एक विश्वास पर आधारित है: जीव सेवा, शिक्षा और प्रकृति की देखभाल साथ-साथ चलती हैं।')}</p>
  <p class="note">${L('Add the ashram’s founding story, founder’s name and trust registration details here.', 'यहाँ आश्रम की स्थापना कथा, संस्थापक का नाम और ट्रस्ट पंजीकरण विवरण जोड़ें।')}</p>
  ${taxNote(L)}</div>
  <div class="photo">${img('swami-with-calf', L('Ashram swami lovingly holding a rescued calf', 'आश्रम के स्वामीजी एक बचाए गए बछड़े को स्नेह से थामे हुए'), 413, 450)}</div></div>
  <div class="container" style="margin-top:48px"><h2>${L('Our Work', 'हमारा कार्य')}</h2>${workCards(L, u)}</div>${cta(L, u)}` },

{ key: 'work', path: 'our-work/', title: ['Our Work', 'हमारा कार्य'],
  desc: ['Cow shelter and rescue, gurukul education and environment work by Hariom Ashram Kadwapani, Dehradun.', 'हरिओम आश्रम कड़वापानी, देहरादून का गौशाला एवं पशु रक्षा, गुरुकुल शिक्षा और पर्यावरण कार्य।'],
  body: (L, u) => `<div class="container">${workCards(L, u)}</div>${cta(L, u)}` },

{ key: 'gaushala', path: 'our-work/gaushala/', crumbs: ['work'], title: ['Gaushala & Animal Rescue', 'गौशाला एवं पशु रक्षा'],
  desc: ['Our gaushala in Kadwapani, Dehradun gives shelter, fodder and medical care to rescued, abandoned and injured cows.', 'कड़वापानी, देहरादून की हमारी गौशाला बेसहारा, परित्यक्त और घायल गायों को आश्रय, चारा और चिकित्सा देती है।'],
  body: (L, u) => `<div class="container two-col"><div>
  <p>${L('Our gaushala gives shelter, fodder and medical care to cows that are rescued, abandoned or injured. The cows live in open, shaded sheds with space to move and fresh fodder every day.', 'हमारी गौशाला बचाई गई, परित्यक्त या घायल गायों को आश्रय, चारा और चिकित्सा प्रदान करती है। गौमाताएँ खुले, छायादार शेड में रहती हैं और उन्हें प्रतिदिन ताज़ा चारा मिलता है।')}</p>
  <ul class="ticks"><li>${L('Rescue of abandoned and injured cows', 'परित्यक्त और घायल गायों का रेस्क्यू')}</li><li>${L('Daily fodder and clean water', 'प्रतिदिन चारा और स्वच्छ जल')}</li><li>${L('Medical treatment and care for calves', 'उपचार और बछड़ों की देखभाल')}</li></ul>
  <a class="btn btn-primary" href="${u('donate/')}">${L('Donate for the cows', 'गौसेवा के लिए दान करें')}</a></div>
  <div class="photo">${img('calf-at-ashram', L('A young calf at the ashram next to a fodder cart', 'चारे की गाड़ी के पास आश्रम का एक बछड़ा'), 560, 560)}</div></div>
  <div class="container gallery">${img('cows-in-shed', L('Cows resting in the gaushala shed', 'गौशाला के शेड में गौमाताएँ'), 600, 338)}${img('cow-eating-gaushala', L('A cow eating fresh vegetables', 'ताज़ी सब्ज़ियाँ खाती गाय'), 480, 480)}</div>${cta(L, u)}` },

{ key: 'gurukul', path: 'our-work/gurukul/', crumbs: ['work'], title: ['Gurukul', 'गुरुकुल'],
  desc: ['The Hariom Ashram gurukul in Kadwapani, Dehradun offers value-based education combining studies, Sanskrit and life skills.', 'हरिओम आश्रम का गुरुकुल, कड़वापानी, देहरादून: पढ़ाई, संस्कृत और जीवन-कौशल के साथ संस्कारयुक्त शिक्षा।'],
  body: (L, u) => `<div class="container two-col"><div>
  <p>${L('In our gurukul children learn, pray and eat together as one family. Education here covers studies, Sanskrit, discipline and gratitude, so that children grow into capable and caring people.', 'हमारे गुरुकुल में बच्चे एक परिवार की तरह साथ पढ़ते, प्रार्थना करते और भोजन करते हैं। यहाँ पढ़ाई, संस्कृत, अनुशासन और कृतज्ञता सिखाई जाती है ताकि बच्चे सक्षम और संवेदनशील बनें।')}</p>
  <a class="btn btn-primary" href="${u('donate/')}">${L('Support the children', 'बच्चों का सहयोग करें')}</a></div>
  <div class="photo">${img('gurukul-children-prasad', L('Gurukul children praying before a meal', 'भोजन से पहले प्रार्थना करते गुरुकुल के बच्चे'), 560, 560)}</div></div>${cta(L, u)}` },

{ key: 'environment', path: 'our-work/environment/', crumbs: ['work'], title: ['Environment', 'पर्यावरण'],
  desc: ['Tree plantation, organic farming and awareness drives by Hariom Ashram Kadwapani for a greener Uttarakhand.', 'हरित उत्तराखंड के लिए हरिओम आश्रम कड़वापानी के वृक्षारोपण, जैविक खेती और जागरूकता अभियान।'],
  body: (L, u) => `<div class="container"><p>${L('We run tree plantation drives, promote organic farming and hold awareness rallies with local villagers for a greener Uttarakhand.', 'हम हरित उत्तराखंड के लिए ग्रामीणों के साथ वृक्षारोपण अभियान, जैविक खेती को प्रोत्साहन और जागरूकता रैलियाँ करते हैं।')}</p><p class="note">${L('Add details of plantation drives, numbers and photos here.', 'यहाँ वृक्षारोपण अभियानों का विवरण, संख्या और फ़ोटो जोड़ें।')}</p></div>${cta(L, u)}` },

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
  <address><strong>${L(ORG.name.en, ORG.name.hi)}</strong><br>${L(ORG.addr.en, ORG.addr.hi)}<br>WhatsApp: <a href="${ORG.whatsapp}" target="_blank" rel="noopener">${ORG.whatsappDisplay}</a></address>
  <p class="social">${socialLinks()}</p>
  <a class="btn btn-ghost dark" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Kadwapani+Karbari+Grant+Dehradun+248171">${L('Open in Google Maps', 'गूगल मैप्स में खोलें')}</a></div>
  <form id="contact-form" class="form" novalidate data-fill="${L('Please fill all fields.', 'कृपया सभी फ़ील्ड भरें।')}" data-soon="${L('Thank you! Form submission will be enabled soon. Please message us on WhatsApp meanwhile.', 'धन्यवाद! फ़ॉर्म जल्द शुरू होगा। तब तक कृपया WhatsApp पर संदेश भेजें।')}">
  <label><span>${L('Your name', 'आपका नाम')}</span><input name="name" required autocomplete="name"></label>
  <label><span>${L('Email or phone', 'ईमेल या फोन')}</span><input name="contact" required></label>
  <label><span>${L('Message', 'संदेश')}</span><textarea name="message" rows="4" required></textarea></label>
  <button class="btn btn-primary" type="submit">${L('Send Message', 'संदेश भेजें')}</button><p id="form-msg" class="note" role="status"></p></form></div>` }
];

function socialLinks() {
  return Object.entries(ORG.social).map(([n, h]) => `<a href="${h}" target="_blank" rel="noopener me">${n}</a>`).join('') +
    `<a href="${ORG.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>`;
}
function postCards(L, u, list) {
  return list.map(p => `<a class="card link" href="${u('blog/' + p.slug + '/')}">${img(p.img, L(p.title.en, p.title.hi), 560, 560)}<time datetime="${p.date}">${L(fmtDate(p.date, 'en'), fmtDate(p.date, 'hi'))}</time><h3>${L(p.title.en, p.title.hi)}</h3><p>${L(p.excerpt.en, p.excerpt.hi)}</p></a>`).join('');
}

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
  const nav = [['about/', L('About', 'हमारे बारे में')], ['our-work/', L('Our Work', 'हमारा कार्य')], ['blog/', L('Blog', 'ब्लॉग')], ['transparency/', L('Transparency', 'पारदर्शिता')], ['contact/', L('Contact', 'संपर्क')]]
    .map(([p, t]) => `<a href="${u(p)}"${page.path.startsWith(p) ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  const crumbs = `<nav class="crumbs" aria-label="breadcrumb"><a href="${u('')}">${L('Home', 'होम')}</a> › ${(page.crumbs || []).map(k => `<a href="${u(byKey[k].path)}">${L(byKey[k].title[0], byKey[k].title[1])}</a> › `).join('')}<span>${T}</span></nav>`;
  const head = page.key === 'home' ? '' : `<header class="page-head"><div class="container">${crumbs}<h1>${T}</h1></div></header>`;
  const ld = [{ '@context': 'https://schema.org', '@type': 'NGO', name: ORG.name.en, url: SITE_URL + '/', logo: SITE_URL + '/assets/logo-large.webp', sameAs: Object.values(ORG.social),
    address: { '@type': 'PostalAddress', streetAddress: 'Kadwapani, Karbari Grant', addressLocality: 'Dehradun', addressRegion: 'Uttarakhand', postalCode: '248171', addressCountry: 'IN' } }];
  if (page.post) ld.push({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: page.post.title.en, datePublished: page.post.date, image: SITE_URL + `/assets/img/${page.post.img}.webp`, mainEntityOfPage: url, publisher: { '@type': 'Organization', name: ORG.name.en } });
  const btnLabel = L('हिंदी', 'English');
  const footName = L(ORG.name.en, ORG.name.hi), footAddr = L(ORG.addr.en, ORG.addr.hi);
  const footer = `<footer class="site-footer"><div class="container foot-grid">
  <div><strong>${footName}</strong><p>${footAddr}</p><p>${taxShort(L)}</p></div>
  <div><strong>${L('Explore', 'अन्वेषण')}</strong><p class="flinks">${nav}<a href="${u('donate/')}">${L('Donate', 'दान करें')}</a></p></div>
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
<meta property="og:type" content="${page.post ? 'article' : 'website'}"><meta property="og:site_name" content="${esc(ORG.name.en)}"><meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(D)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE_URL}/assets/img/${page.post ? page.post.img : 'cows-in-shed'}.webp">
<meta name="theme-color" content="#2E7D32">
<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/assets/favicon-32.png" type="image/png" sizes="32x32"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip" href="#main">${skip}</a>
<header class="site-header"><div class="container nav">
  <a class="brand" href="${u('')}"><img src="/assets/logo.webp" alt="" width="${LOGO_W}" height="64"><span><strong>${brandTitle}</strong><small>गौशाला । गुरुकुल । पर्यावरण</small></span></a>
  <button class="menu-btn" aria-label="${menuLbl}" aria-expanded="false" aria-controls="menu">☰</button>
  <nav id="menu" class="menu">${nav}
    <button type="button" class="lang-switch" data-lang-toggle>${btnLabel}</button>
    <a class="btn btn-primary" href="${u('donate/')}">${donate}</a></nav></div></header>
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
fs.copyFileSync('src/style.css', OUT + '/css/style.css'); fs.copyFileSync('src/main.js', OUT + '/js/main.js');
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
fs.writeFileSync(OUT + '/404.html', fix(render({ key: 'notfound', path: '404.html', title: ['Page not found', 'पृष्ठ नहीं मिला'], desc: ['Page not found', 'पृष्ठ नहीं मिला'], body: L => `<div class="container"><p>${L('Sorry, that page does not exist.', 'क्षमा करें, यह पृष्ठ मौजूद नहीं है।')} <a href="/">${L('Go home', 'होम पर जाएँ')}</a></p></div>` })).replace('<meta name="description"', '<meta name="robots" content="noindex"><meta name="description"'));
console.log(`Built ${urls.length} pages into ${OUT}/`);
