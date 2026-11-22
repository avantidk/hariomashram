import { ORG } from './config.mjs';
import { img, icon } from './helpers.mjs';

export const taxNote = L => `<div class="tax">${icon('shield')} <span>${L(ORG.tax80g, 'आयकर अधिनियम की धारा 80G(5)(iii) के अंतर्गत कर-मुक्त, पंजीकरण संख्या AABTH0927L22LK01')}</span></div>`;

export const bankBox = L => `<div class="box"><h3>${icon('file')} ${L('Bank Transfer', 'बैंक ट्रांसफर')}</h3><dl>
<dt>${L('Bank', 'बैंक')}</dt><dd>${ORG.bank.bank}</dd>
<dt>IFSC</dt><dd>${ORG.bank.ifsc}</dd>
<dt>${L('Account name', 'खाते का नाम')}</dt><dd>${ORG.bank.name}</dd>
<dt>${L('Account number', 'खाता संख्या')}</dt><dd>${ORG.bank.acc}</dd></dl>
<p class="note">${L('After transferring, please send the payment screenshot on WhatsApp for your receipt.', 'ट्रांसफर के बाद रसीद के लिए कृपया भुगतान का स्क्रीनशॉट WhatsApp पर भेजें।')}</p>
<a class="btn btn-ghost dark" target="_blank" rel="noopener" href="${ORG.whatsapp}">${icon('whatsapp-f')} ${L('Send on WhatsApp', 'WhatsApp पर भेजें')}</a></div>`;

export const workCards = (L, u) => `<div class="cards">
 <a class="card link" href="${u('animal-rescue/')}">${img('calves-protected-enclosure', L('Injured calves resting in a protected netted enclosure', 'सुरक्षित जालीदार बाड़े में आराम करते घायल बछड़े'), 640, 360)}<h3>${icon('heart')} ${L('Animal Rescue', 'पशु रक्षा')}</h3><p>${L('Rescue, treatment and care for injured and abandoned animals.', 'घायल और परित्यक्त पशुओं का रेस्क्यू, उपचार और देखभाल।')}</p></a>
 <a class="card link" href="${u('gaushalas-cow-shelters/')}">${img('fodder-shed-seva', L('Workers handling green fodder in the fodder shed', 'चारा शेड में हरा चारा संभालते कार्यकर्ता'), 640, 360)}<h3>${icon('home')} ${L('Gaushalas', 'गौशालाएँ')}</h3><p>${L('Three gaushalas giving shelter, fodder and medical care to cows.', 'तीन गौशालाएँ जो गायों को आश्रय, चारा और चिकित्सा देती हैं।')}</p></a>
 <a class="card link" href="${u('gurukul/')}">${img('gurukul-children-prasad', L('Gurukul children praying before a meal', 'भोजन से पहले प्रार्थना करते गुरुकुल के बच्चे'), 560, 560)}<h3>${icon('book')} ${L('Gurukul', 'गुरुकुल')}</h3><p>${L('Education, meals, shelter and care for underprivileged children.', 'वंचित बच्चों के लिए शिक्षा, भोजन, आश्रय और देखभाल।')}</p></a>
 <a class="card link" href="${u('environment/')}"><div class="icon">${icon('tree')}</div><h3>${L('Environment', 'पर्यावरण')}</h3><p>${L('Tree plantation, organic farming and river cleanliness drives.', 'वृक्षारोपण, जैविक खेती और नदी स्वच्छता अभियान।')}</p></a>
</div>`;

export const cta = (L, u) => `<section class="join"><div class="container"><h2>${L('Be part of the seva', 'सेवा से जुड़ें')}</h2><p>${L('Donate, volunteer or visit the ashram.', 'दान करें, स्वयंसेवक बनें या आश्रम आएँ।')}</p><a class="btn btn-light" href="${u('donate/')}">${icon('heart')} ${L('Donate Now', 'अभी दान करें')}</a> <a class="btn btn-ghost" href="${u('contact/')}">${icon('mail')} ${L('Contact Us', 'संपर्क करें')}</a></div></section>`;

// feature grid: [[iconName, enTitle, hiTitle, enText, hiText], ...]
export const features = (L, items) => `<div class="feat-grid">${items.map(([i, et, ht, ed, hd]) => `<div class="feat"><span class="badge">${icon(i)}</span><h3>${L(et, ht)}</h3>${ed ? `<p>${L(ed, hd)}</p>` : ''}</div>`).join('')}</div>`;
// check list: [[en, hi], ...]
export const checks = (L, items) => `<ul class="checks">${items.map(([e, h]) => `<li>${icon('check')}<span>${L(e, h)}</span></li>`).join('')}</ul>`;
// numbered steps: [[enTitle, hiTitle, enText, hiText], ...]
export const steps = (L, items) => `<ol class="steps">${items.map(([et, ht, ed, hd]) => `<li><div><h3>${L(et, ht)}</h3><p>${L(ed, hd)}</p></div></li>`).join('')}</ol>`;
export const section = (cls, inner) => `<section class="blk ${cls}"><div class="container">${inner}</div></section>`;
