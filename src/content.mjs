import { ORG } from './config.mjs';
import { img, icon } from './helpers.mjs';
import { workCards, cta, features, checks, steps, section, taxNote } from './blocks.mjs';
import { posts } from './posts.mjs';
import { campaigns, campaignCard } from './campaigns.mjs';
const fmt = (d, lang) => new Date(d).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

const wa = (L, label) => `<a class="btn btn-primary" target="_blank" rel="noopener" href="${ORG.whatsapp}">${icon('whatsapp-f')} ${label}</a>`;
const fig = (n, alt, w, h) => `<figure class="fig">${img(n, alt, w, h)}</figure>`;
const split = (text, photo, rev) => `<div class="two-col${rev ? ' rev' : ''}"><div>${text}</div><div class="photo">${photo}</div></div>`;

export default [
// ---------------- Home ----------------
{ key: 'home', path: '', title: ['Gaushala, Gurukul & Environment in Dehradun', 'देहरादून में गौशाला, गुरुकुल और पर्यावरण सेवा'],
  desc: ['Hariom Ashram Kadwapani, Karbari Grant, Dehradun: gaushalas, gurukul education and environment work. Donate with 80G tax benefit.', 'हरिओम आश्रम कड़वापानी, करबारी ग्रांट, देहरादून: गौशालाएँ, गुरुकुल शिक्षा और पर्यावरण कार्य। 80G कर-लाभ के साथ दान करें।'],
  body: (L, u) => [
    `<section class="hero"><div class="container hero-grid">
      <div><p class="eyebrow">${L('Gaushala · Gurukul · Environment', 'गौशाला · गुरुकुल · पर्यावरण')}</p>
      <h1>${L('Serving cows, nurturing children, protecting nature.', 'गौसेवा, बच्चों की शिक्षा और प्रकृति का संरक्षण।')}</h1>
      <p class="lead">${L('For over 20 years, Hariom Ashram has sheltered rescued cows, educated underprivileged children and greened the land around Dehradun.', '20 वर्षों से अधिक समय से हरिओम आश्रम रेस्क्यू की गई गायों को आश्रय, वंचित बच्चों को शिक्षा और देहरादून के आसपास की भूमि को हरा-भरा करने का कार्य कर रहा है।')}</p>
      <div class="actions"><a class="btn btn-primary" href="${u('campaigns/')}">${icon('heart')} ${L('Donate Now', 'अभी दान करें')}</a><a class="btn btn-ghost" href="${u('our-work/')}">${L('See Our Work', 'हमारा कार्य देखें')}</a></div>
      <ul class="trust"><li>${icon('shield')} ${L('80G tax benefit', '80G कर-लाभ')}</li><li>${icon('award')} ${L('Serving since 2006', '2006 से सेवारत')}</li><li>${icon('home')} ${L('3 gaushalas', '3 गौशालाएँ')}</li></ul></div>
      <div class="hero-art"><span class="ring"></span>${img('swami-with-calf', L('Ashram swami lovingly holding a rescued calf', 'आश्रम के स्वामीजी एक बचाए गए बछड़े को स्नेह से थामे हुए'), 413, 450, 'fetchpriority="high" loading="eager"')}</div>
    </div></section>`,
    `<section class="impact"><div class="container impact-grid">
      <div><strong>20+</strong><span>${L('Years of seva', 'वर्षों की सेवा')}</span></div>
      <div><strong>3</strong><span>${L('Gaushalas', 'गौशालाएँ')}</span></div>
      <div><strong>2,000</strong><span>${L('Cows can be sheltered', 'गायों के आश्रय की क्षमता')}</span></div>
      <div><strong>30,000+</strong><span>${L('Animals served', 'पशुओं की सेवा')}</span></div></div></section>`,
    section('', `<div class="two-col"><div class="photo">${img('cow-eating-gaushala', L('A cow eating fresh vegetables at the gaushala', 'गौशाला में ताज़ी सब्ज़ियाँ खाती एक गाय'), 480, 480)}</div>
      <div><p class="eyebrow dark">${L('About Hariom Ashram', 'हरिओम आश्रम के बारे में')}</p><h2>${L('Service to living beings, education and nature, together', 'जीव सेवा, शिक्षा और प्रकृति: एक साथ')}</h2>
      <p>${L('Founded in 2006, Hariom Ashram is a not-for-profit organisation at Kadwapani, Dehradun. Every rupee donated goes towards building well-run shelters for stray cows and caring for children.', '2006 में स्थापित हरिओम आश्रम, कड़वापानी, देहरादून में स्थित एक गैर-लाभकारी संस्था है। दान किया गया हर रुपया बेसहारा गायों के सुव्यवस्थित आश्रय और बच्चों की देखभाल में लगता है।')}</p>
      ${checks(L, [['Registered with the Animal Welfare Board', 'जीव जंतु कल्याण बोर्ड में पंजीकृत'], ['80G tax-exempt donations', '80G कर-मुक्त दान'], ['Bank details published openly', 'बैंक विवरण सार्वजनिक']])}
      <p style="margin-top:20px"><a class="btn btn-ghost dark" href="${u('about-hariom-ashram/')}">${L('Read more', 'और जानें')} ${icon('arrow')}</a></p></div></div>`),
    section('alt', `<div class="sec-head"><p class="eyebrow dark">${L('What we do', 'हम क्या करते हैं')}</p><h2>${L('Three pillars of our work', 'हमारे कार्य के तीन स्तंभ')}</h2></div>${workCards(L, u)}`),
    section('', `<div class="sec-head"><p class="eyebrow dark">${L('Campaigns', 'अभियान')}</p><h2>${L('Support a cause close to your heart', 'अपने हृदय के निकट किसी कार्य का सहयोग करें')}</h2></div>
      <div class="cards">${campaigns.map(c => campaignCard(L, u, c)).join('')}</div>`),
    section('alt', `<div class="sec-head"><p class="eyebrow dark">${L('Why give through us', 'हमारे माध्यम से दान क्यों')}</p><h2>${L('Transparent, direct and tax-exempt', 'पारदर्शी, सीधा और कर-मुक्त')}</h2></div>
      ${features(L, [
        ['shield', '80G tax exemption', '80G कर-छूट', 'Donations are tax exempted under section 80G(5)(iii).', 'दान धारा 80G(5)(iii) के अंतर्गत कर-मुक्त हैं।'],
        ['file', 'Open bank details', 'खुले बैंक विवरण', 'Account and UPI details are public, with receipts on request.', 'खाता और UPI विवरण सार्वजनिक हैं, अनुरोध पर रसीद।'],
        ['heart', 'Direct to the cause', 'सीधे सेवा में', 'Fodder, medicine and meals reach the cows and children.', 'चारा, दवाइयाँ और भोजन सीधे गायों और बच्चों तक पहुँचते हैं।'],
        ['award', '20+ years of trust', '20+ वर्षों का विश्वास', 'Built through years of community support.', 'वर्षों के जन-सहयोग से निर्मित।']])}
      <p class="center"><a class="btn btn-ghost dark" href="${u('transparency/')}">${icon('file')} ${L('See bank & tax details', 'बैंक एवं कर विवरण देखें')}</a></p>`),
    section('', `<div class="sec-head"><p class="eyebrow dark">${L('Glimpses', 'झलकियाँ')}</p><h2>${L('Seva at the gaushala', 'गौशाला में सेवा')}</h2></div>
      <div class="gallery g4">${img('cows-in-shed', L('Cows resting in the gaushala shed', 'गौशाला के शेड में गौमाताएँ'), 600, 338)}${img('fodder-shed-seva', L('Workers handling green fodder in the fodder shed', 'चारा शेड में हरा चारा संभालते कार्यकर्ता'), 640, 360)}${img('dung-cleaning-seva', L('Workers cleaning the cow shed floor', 'गौशाला के फर्श की सफाई करते कार्यकर्ता'), 640, 360)}${img('fodder-truck-unloading', L('Green fodder being unloaded from a truck', 'ट्रक से उतारा जा रहा हरा चारा'), 640, 360)}</div>`),
    section('alt', `<div class="sec-head"><p class="eyebrow dark">${L('From the blog', 'ब्लॉग से')}</p><h2>${L('Latest updates', 'ताज़ा समाचार')}</h2></div>
      <div class="cards">${posts.slice(0, 3).map(p => `<a class="card link" href="${u('blog/' + p.slug + '/')}">${img(p.img, L(p.title.en, p.title.hi), 560, 560)}<time datetime="${p.date}">${L(fmt(p.date, 'en'), fmt(p.date, 'hi'))}</time><h3>${L(p.title.en, p.title.hi)}</h3><p>${L(p.excerpt.en, p.excerpt.hi)}</p></a>`).join('')}</div>
      <p class="center"><a class="btn btn-ghost dark" href="${u('blog/')}">${L('All posts', 'सभी पोस्ट')} ${icon('arrow')}</a></p>`),
    cta(L, u)].join('') },

// ---------------- About ----------------
{ key: 'about', path: 'about-hariom-ashram/', title: ['About Hariom Ashram', 'हरिओम आश्रम के बारे में'],
  desc: ['Hariom Ashram is a not-for-profit NGO in Dehradun serving cows, children and the environment for over 20 years.', 'हरिओम आश्रम देहरादून की एक गैर-लाभकारी संस्था है, जो 20 वर्षों से अधिक समय से गौसेवा, बच्चों और पर्यावरण की सेवा कर रही है।'],
  body: (L, u) => [
    section('', split(`<p class="lead-d">${L('Hariom Ashram is a not-for-profit organisation that has been serving society for over 20 years: people, animals and the environment.', 'हरिओम आश्रम एक गैर-लाभकारी संस्था है, जो 20 वर्षों से अधिक समय से समाज की सेवा कर रही है: मनुष्य, पशु और पर्यावरण।')}</p>
      <h2>${L('Our Mission', 'हमारा उद्देश्य')}</h2><p>${L('To build well-run shelters for stray cows. Every rupee donated is devoted to this cause.', 'बेसहारा गायों के लिए सुव्यवस्थित आश्रय बनाना। दान किया गया हर रुपया इसी कार्य में लगता है।')}</p>${taxNote(L)}`,
      img('cows-in-shed', L('Cows resting in the gaushala shed', 'गौशाला के शेड में गौमाताएँ'), 600, 338))),
    section('alt', `<h2>${L('Our Journey', 'हमारी यात्रा')}</h2>
      ${features(L, [
        ['award', 'Founded in 2006', '2006 में स्थापना', 'Founded by Mahant Anupamand Giri Ji Maharaj.', 'महंत अनुपमानंद गिरि जी महाराज द्वारा स्थापित।'],
        ['heart', '30,000+ animals served', '30,000+ पशुओं की सेवा', 'Stray cows, dogs, cats, horses, buffaloes and other animals in two decades.', 'दो दशकों में बेसहारा गायें, कुत्ते, बिल्लियाँ, घोड़े, भैंसें और अन्य पशु।'],
        ['users', 'Community-built', 'समाज के सहयोग से निर्मित', 'Built through years of hard work and public support, without major industrial or political backing.', 'वर्षों की मेहनत और जन-सहयोग से निर्मित, किसी बड़े औद्योगिक या राजनीतिक सहारे के बिना।']
      ])}`),
    section('', `<h2>${L('Areas of Work', 'कार्य क्षेत्र')}</h2>
      ${features(L, [
        ['heart', 'Animal Welfare', 'पशु कल्याण', '', ''],
        ['home', 'Gaushalas', 'गौशालाएँ', '', ''],
        ['book', 'Gurukul', 'गुरुकुल', '', ''],
        ['tree', 'Environment Protection', 'पर्यावरण संरक्षण', '', '']
      ])}`),
    section('alt', `<h2>${L('Our Team', 'हमारी टीम')}</h2>
      ${features(L, [
        ['user', 'Mahant Anupamand Giri', 'महंत अनुपमानंद गिरि', 'Founder and Manager. Sanyasi of Juna Akhada, Haridwar.', 'संस्थापक एवं प्रबंधक। जूना अखाड़ा, हरिद्वार के संन्यासी।'],
        ['user', 'Nikhil Kamboj', 'निखिल कम्बोज', 'Secretary. Oversees administration and internal operations.', 'सचिव। प्रशासन और आंतरिक संचालन की देखरेख।'],
        ['user', 'Mukul Panwar', 'मुकुल पंवार', 'Member. Leads animal rescue operations and manages the gaushala.', 'सदस्य। पशु रेस्क्यू का नेतृत्व और गौशाला का प्रबंधन।']
      ])}`),
    section('', `<h2>${L('Recognitions & Registrations', 'मान्यताएँ एवं पंजीकरण')}</h2>
      ${checks(L, [
        ['NGO Darpan registration', 'एनजीओ दर्पण पंजीकरण'],
        ['Gaushala registration, Animal Welfare Board of India', 'गौशाला पंजीकरण, भारतीय जीव जंतु कल्याण बोर्ड'],
        ['Gaushala registration, Uttarakhand Animal Welfare Board (2024)', 'गौशाला पंजीकरण, उत्तराखंड पशु कल्याण बोर्ड (2024)'],
        ['80G permanent certificate (tax exemption for donors)', '80G स्थायी प्रमाणपत्र (दानदाताओं के लिए कर-छूट)']
      ])}
      <p><a class="btn btn-ghost dark" href="${u('transparency/')}">${icon('file')} ${L('Bank & tax details', 'बैंक एवं कर विवरण')}</a></p>`),
    cta(L, u)].join('') },

// ---------------- Our Work hub ----------------
{ key: 'work', path: 'our-work/', title: ['Our Work', 'हमारा कार्य'],
  desc: ['Animal rescue, gaushalas, gurukul and environment work by Hariom Ashram Kadwapani, Dehradun.', 'हरिओम आश्रम कड़वापानी, देहरादून का पशु रक्षा, गौशाला, गुरुकुल और पर्यावरण कार्य।'],
  body: (L, u) => `<div class="container">${workCards(L, u)}</div>${cta(L, u)}` },

// ---------------- Animal Rescue ----------------
{ key: 'rescue', path: 'animal-rescue/', crumbs: ['work'], title: ['Animal Rescue', 'पशु रक्षा'],
  desc: ['How Hariom Ashram rescues injured, abandoned and trafficked cattle in Dehradun, with a hydraulic-lift ambulance and post-rescue care.', 'हरिओम आश्रम घायल, परित्यक्त और तस्करी से बचाए गए पशुओं का रेस्क्यू कैसे करता है: हाइड्रोलिक लिफ्ट एम्बुलेंस और रेस्क्यू के बाद देखभाल।'],
  body: (L, u) => [
    section('', split(`<p class="lead-d">${L('A dedicated team of young volunteers, our Gaurakshaks, rescues animals in need and brings them to safety.', 'हमारे गौरक्षक युवा स्वयंसेवकों की समर्पित टीम ज़रूरतमंद पशुओं को बचाकर सुरक्षित स्थान तक पहुँचाती है।')}</p>
      <h2>${L('When we step in', 'हम कब पहुँचते हैं')}</h2>
      ${checks(L, [
        ['Cattle injured on the roadside after accidents', 'सड़क दुर्घटना में घायल होकर सड़क किनारे पड़े पशु'],
        ['Animals abandoned by farmers facing financial difficulty', 'आर्थिक कठिनाई में किसानों द्वारा छोड़े गए पशु'],
        ['Animals rescued from illegal traffickers and butchers', 'अवैध तस्करों और कसाइयों से छुड़ाए गए पशु'],
        ['Animals kept in poor conditions in dairies', 'डेयरियों में खराब हालत में रखे गए पशु'],
        ['Other emergencies', 'अन्य आपातकालीन स्थितियाँ']
      ])}`,
      img('calves-protected-enclosure', L('Injured calves resting in a protected netted enclosure', 'सुरक्षित जालीदार बाड़े में आराम करते घायल बछड़े'), 640, 360))),
    section('alt', `<h2>${L('Why rescuing large cattle is hard', 'बड़े पशुओं का रेस्क्यू कठिन क्यों है')}</h2>
      ${features(L, [
        ['alert', 'Fear and aggression', 'भय और आक्रामकता', 'Frightened animals can react aggressively.', 'डरे हुए पशु आक्रामक हो सकते हैं।'],
        ['hand', 'Risk of injury', 'चोट का जोखिम', 'Handlers can get hurt during the rescue.', 'रेस्क्यू के दौरान कार्यकर्ताओं को चोट लग सकती है।'],
        ['scale', 'Heavy weight', 'भारी वज़न', 'Large animals need many hands to move.', 'बड़े पशुओं को हिलाने में कई लोग लगते हैं।'],
        ['pin', 'Limited space', 'सीमित स्थान', 'Tight spots where lifting machinery cannot reach.', 'तंग जगहें जहाँ लिफ्ट मशीन नहीं पहुँच पाती।'],
        ['users', 'Manual effort', 'हाथ से मेहनत', 'Much of the work is done by hand.', 'अधिकांश कार्य हाथ से करना पड़ता है।'],
        ['truck', 'Transport to the shelter', 'आश्रय तक परिवहन', 'Moving injured animals safely over distance.', 'घायल पशुओं को सुरक्षित दूरी तक ले जाना।']
      ])}`),
    section('', `<div class="callout">${icon('truck')}<div><h2>${L('Rescue ambulance', 'रेस्क्यू एम्बुलेंस')}</h2><p>${L('Our specialised ambulance has an automatic hydraulic lift that helps us move large injured animals safely.', 'हमारी विशेष एम्बुलेंस में स्वचालित हाइड्रोलिक लिफ्ट है, जिससे बड़े घायल पशुओं को सुरक्षित उठाया जा सकता है।')}</p></div></div>
      <h2>${L('After the rescue', 'रेस्क्यू के बाद')}</h2>
      ${steps(L, [
        ['Taken to the nearest gaushala', 'निकटतम गौशाला पहुँचाया जाता है', 'The animal is moved to safety without delay.', 'पशु को बिना देरी सुरक्षित स्थान पर ले जाया जाता है।'],
        ['Primary treatment', 'प्राथमिक उपचार', 'A doctor examines and treats the animal.', 'चिकित्सक पशु की जाँच और उपचार करते हैं।'],
        ['Food, water and medication', 'भोजन, जल और दवाइयाँ', 'Care continues until the animal recovers.', 'स्वस्थ होने तक देखभाल जारी रहती है।']
      ])}`),
    section('alt', `<h2>${L('Care our rescued cows receive', 'रेस्क्यू की गई गायों को मिलने वाली देखभाल')}</h2>
      ${features(L, [
        ['cross', 'Primary treatment', 'प्राथमिक उपचार', '', ''],
        ['leaf', 'Nutritious fodder', 'पौष्टिक चारा', '', ''],
        ['drop', 'Clean water', 'स्वच्छ जल', '', ''],
        ['sparkle', 'Medication and check-ups', 'दवाइयाँ और जाँच', '', ''],
        ['home', 'Clean shelter', 'स्वच्छ आश्रय', '', ''],
        ['heart', 'Long-term care', 'दीर्घकालीन देखभाल', '', '']
      ])}
      <p class="center">${wa(L, L('Join our rescue team', 'हमारी रेस्क्यू टीम से जुड़ें'))}</p>`),
    cta(L, u)].join('') },

// ---------------- Gaushalas ----------------
{ key: 'gaushalas', path: 'gaushalas-cow-shelters/', crumbs: ['work'], title: ['Gaushalas (Cow Shelters)', 'गौशालाएँ'],
  desc: ['Three gaushalas run by Hariom Ashram in Dehradun and Himachal Pradesh: fodder, water, electricity, staff and veterinary care for around 2,000 cows.', 'हरिओम आश्रम द्वारा देहरादून और हिमाचल प्रदेश में संचालित तीन गौशालाएँ: लगभग 2,000 गायों के लिए चारा, जल, बिजली, कर्मचारी और पशु-चिकित्सा।'],
  body: (L, u) => [
    section('', split(`<p class="lead-d">${L('Gaushalas are an integral part of Indian culture, where the cow is revered as a mother. In cities, keeping cows is difficult, and gaushalas give them a safe home.', 'गौशालाएँ भारतीय संस्कृति का अभिन्न अंग हैं, जहाँ गाय को माता के रूप में पूजा जाता है। शहरों में गाय रखना कठिन है, और गौशालाएँ उन्हें सुरक्षित घर देती हैं।')}</p>
      <h2>${L('Why gaushalas matter', 'गौशालाएँ क्यों महत्वपूर्ण हैं')}</h2>
      ${checks(L, [
        ['Preserve our cultural heritage', 'सांस्कृतिक विरासत का संरक्षण'],
        ['Dung and urine used for organic farming and medicine', 'गोबर और गोमूत्र से जैविक खेती और औषधि'],
        ['Fewer road accidents caused by stray cows', 'आवारा गायों से होने वाली सड़क दुर्घटनाओं में कमी'],
        ['Cleaner streets', 'स्वच्छ सड़कें'],
        ['Social harmony', 'सामाजिक सद्भाव'],
        ['Support for rituals and worship', 'पूजा और अनुष्ठानों में सहयोग']
      ])}`,
      img('fodder-shed-seva', L('Workers handling green fodder in the fodder shed', 'चारा शेड में हरा चारा संभालते कार्यकर्ता'), 640, 360))),
    section('alt', `<h2>${L('Our three gaushalas', 'हमारी तीन गौशालाएँ')}</h2>
      <div class="feat-grid">
        <div class="feat"><span class="badge">${icon('pin')}</span><h3>Kadwapani</h3><p>${L('Karbari Grant, Shimla Bypass Road, Dehradun', 'करबारी ग्रांट, शिमला बाईपास रोड, देहरादून')}</p></div>
        <div class="feat"><span class="badge">${icon('pin')}</span><h3>Chidibhelli</h3><p>${L('Timli, Vikasnagar, Dehradun, Uttarakhand', 'तिमली, विकासनगर, देहरादून, उत्तराखंड')}</p></div>
        <div class="feat"><span class="badge">${icon('pin')}</span><h3>Khodri Majri</h3><p>${L('Near Dakpather Barrage, Himachal Pradesh', 'डाकपत्थर बैराज के पास, हिमाचल प्रदेश')}</p></div>
      </div>
      <p class="note">${L('Together the gaushalas can accommodate around 2,000 cows and 50 staff.', 'तीनों गौशालाओं में मिलाकर लगभग 2,000 गायों और 50 कर्मचारियों के रहने की व्यवस्था है।')}</p>`),
    section('', `<h2>${L('How the gaushalas are managed', 'गौशालाओं का संचालन')}</h2>
      ${steps(L, [
        ['Infrastructure', 'आधारभूत ढाँचा', 'Sheds for the cows and quarters for staff.', 'गायों के लिए शेड और कर्मचारियों के लिए आवास।'],
        ['Fodder', 'चारा', 'Fresh green fodder from local farms, cut and mixed with dry husk, with wheat, pulses, jaggery and salt as supplements.', 'स्थानीय खेतों से ताज़ा हरा चारा, कटाई के बाद सूखे भूसे में मिलाकर, गेहूँ, दालें, गुड़ और नमक के पूरक के साथ।'],
        ['Basic facilities', 'मूलभूत सुविधाएँ', 'Reliable electricity and clean drinking water.', 'निरंतर बिजली और स्वच्छ पेयजल।'],
        ['Dedicated staff', 'समर्पित कर्मचारी', 'Staff for feeding, fodder cutting, dung cleaning and overall cleanliness.', 'भोजन, चारा कटाई, गोबर सफाई और स्वच्छता के लिए कर्मचारी।'],
        ['Medical services', 'चिकित्सा सेवा', 'On-site care by a veterinary team for sick and injured cows, including accident cases.', 'बीमार और घायल गायों, दुर्घटना के मामलों सहित, के लिए पशु-चिकित्सा दल द्वारा परिसर में उपचार।'],
        ['Respectful last rites', 'सम्मानजनक अंतिम संस्कार', 'Deceased cows are laid to rest with respect and hygiene.', 'दिवंगत गायों का सम्मान और स्वच्छता के साथ अंतिम संस्कार।']
      ])}
      <div class="gallery g3">${img('dung-cleaning-seva', L('Workers cleaning the cow shed floor', 'गौशाला के फर्श की सफाई करते कार्यकर्ता'), 640, 360)}${img('fodder-truck-unloading', L('Green fodder being unloaded from a truck', 'ट्रक से उतारा जा रहा हरा चारा'), 640, 360)}${img('cows-in-shed', L('Cows at the feeding trough in the shed', 'शेड में चारे की नांद पर गायें'), 600, 338)}</div>`),
    cta(L, u)].join('') },

// ---------------- Gurukul ----------------
{ key: 'gurukul', path: 'gurukul/', crumbs: ['work'], title: ['Gurukul', 'गुरुकुल'],
  desc: ['Hariom Ashram gurukul shelters and educates underprivileged children, blending Vedic tradition with modern schooling. Partner Kanya Gurukul supports over 50 girls.', 'हरिओम आश्रम का गुरुकुल वंचित बच्चों को आश्रय और शिक्षा देता है, वैदिक परंपरा और आधुनिक शिक्षा के मेल के साथ। सहयोगी कन्या गुरुकुल 50 से अधिक बालिकाओं की सेवा करता है।'],
  body: (L, u) => [
    section('', split(`<p class="lead-d">${L('We are reviving the spirit of the gurukul: learning rooted in Vedic tradition and blended with modern education, for children who need it most.', 'हम गुरुकुल की भावना को पुनर्जीवित कर रहे हैं: वैदिक परंपरा पर आधारित और आधुनिक शिक्षा से जुड़ी शिक्षा, उन बच्चों के लिए जिन्हें इसकी सबसे अधिक आवश्यकता है।')}</p>
      <h2>${L('Support for needy children', 'ज़रूरतमंद बच्चों को सहयोग')}</h2>
      <p>${L('Our gurukul shelters around 30 underprivileged children and looks after them as one family.', 'हमारा गुरुकुल लगभग 30 वंचित बच्चों को आश्रय देता है और उनकी एक परिवार की तरह देखभाल करता है।')}</p>`,
      img('gurukul-children-prasad', L('Gurukul children praying before a meal', 'भोजन से पहले प्रार्थना करते गुरुकुल के बच्चे'), 560, 560))),
    section('alt', `<h2>${L('What every child receives', 'हर बच्चे को क्या मिलता है')}</h2>
      ${features(L, [
        ['book', 'Education', 'शिक्षा', 'Children attend nearby day schools.', 'बच्चे पास के विद्यालयों में पढ़ने जाते हैं।'],
        ['leaf', 'Nutritious meals', 'पौष्टिक भोजन', 'Healthy meals every day.', 'प्रतिदिन पौष्टिक भोजन।'],
        ['shirt', 'Clothing & necessities', 'वस्त्र एवं आवश्यक सामग्री', '', ''],
        ['cross', 'Medical care', 'चिकित्सा देखभाल', 'Regular check-ups and treatment.', 'नियमित जाँच और उपचार।'],
        ['home', 'Shelter', 'आश्रय', 'A safe and caring home.', 'सुरक्षित और स्नेहपूर्ण घर।']
      ])}`),
    section('', `<div class="callout">${icon('users')}<div><h2>${L('Kanya Gurukul, Mundakheda', 'कन्या गुरुकुल, मुंडाखेड़ा')}</h2><p>${L('In collaboration with Kanya Gurukul, Mundakheda (Laksar, Uttarakhand), which shelters and educates over 50 underprivileged girls under the leadership of Dr. Savita.', 'कन्या गुरुकुल, मुंडाखेड़ा (लक्सर, उत्तराखंड) के सहयोग से, जो डॉ. सविता के नेतृत्व में 50 से अधिक वंचित बालिकाओं को आश्रय और शिक्षा देता है।')}</p></div></div>
      <p class="center"><a class="btn btn-primary" href="${u('donate/')}">${icon('heart')} ${L('Support the children', 'बच्चों का सहयोग करें')}</a></p>`),
    cta(L, u)].join('') },

// ---------------- Environment ----------------
{ key: 'environment', path: 'environment/', crumbs: ['work'], title: ['Environment', 'पर्यावरण'],
  desc: ['Tree plantation, organic farming and river cleanliness drives by Hariom Ashram Kadwapani for a greener Uttarakhand.', 'हरित उत्तराखंड के लिए हरिओम आश्रम कड़वापानी के वृक्षारोपण, जैविक खेती और नदी स्वच्छता अभियान।'],
  body: (L, u) => [
    section('', `<p class="lead-d">${L('Caring for living beings includes caring for the land they live on. Our environment work involves the local community.', 'जीवों की सेवा में उस भूमि की देखभाल भी शामिल है जिस पर वे रहते हैं। हमारा पर्यावरण कार्य स्थानीय समुदाय को साथ जोड़ता है।')}</p>
      ${features(L, [
        ['tree', 'Tree plantation drives', 'वृक्षारोपण अभियान', 'Planting trees with villagers and volunteers.', 'ग्रामीणों और स्वयंसेवकों के साथ वृक्षारोपण।'],
        ['leaf', 'Organic farming', 'जैविक खेती', 'Using cow dung and urine from our gaushalas.', 'हमारी गौशालाओं के गोबर और गोमूत्र का उपयोग।'],
        ['drop', 'River cleanliness', 'नदी स्वच्छता', 'Campaigns to keep local rivers clean.', 'स्थानीय नदियों को स्वच्छ रखने के अभियान।']
      ])}`),
    cta(L, u)].join('') },

// ---------------- CSR ----------------
{ key: 'csr', path: 'csr/', title: ['Corporate Social Responsibility (CSR)', 'कॉर्पोरेट सामाजिक उत्तरदायित्व (CSR)'],
  desc: ['Partner with Hariom Ashram for CSR: from cow care to community welfare, education and the environment, aligned with the UN Sustainable Development Goals.', 'CSR के लिए हरिओम आश्रम के साथ जुड़ें: गौसेवा से सामुदायिक कल्याण, शिक्षा और पर्यावरण तक, संयुक्त राष्ट्र सतत विकास लक्ष्यों के अनुरूप।'],
  body: (L, u) => [
    section('', `<p class="tagline">${L('From Cow Care to Community Welfare', 'गौसेवा से सामुदायिक कल्याण तक')}</p>
      <p class="lead-d">${L('For over 20 years Hariom Ashram has served animals, children and the environment. Partner with us to turn your CSR commitment into lasting, visible impact.', '20 वर्षों से अधिक समय से हरिओम आश्रम पशुओं, बच्चों और पर्यावरण की सेवा कर रहा है। हमारे साथ जुड़कर अपनी CSR प्रतिबद्धता को स्थायी और दृश्य प्रभाव में बदलें।')}</p>
      <h2>${L('Why partner with us', 'हमारे साथ क्यों जुड़ें')}</h2>
      ${features(L, [
        ['heart', 'Animal welfare', 'पशु कल्याण', 'Gaushalas in Dehradun and Himachal Pradesh caring for stray and rescued cows.', 'देहरादून और हिमाचल प्रदेश की गौशालाएँ बेसहारा और रेस्क्यू की गई गायों की सेवा करती हैं।'],
        ['users', 'Community empowerment', 'सामुदायिक सशक्तिकरण', 'Support for orphans, the elderly, widows and economically disadvantaged families.', 'अनाथों, बुज़ुर्गों, विधवाओं और आर्थिक रूप से कमज़ोर परिवारों को सहयोग।'],
        ['book', 'Education', 'शिक्षा', 'Gurukul education for underprivileged children.', 'वंचित बच्चों के लिए गुरुकुल शिक्षा।'],
        ['tree', 'Environment', 'पर्यावरण', 'Tree plantation, organic farming and river cleanliness campaigns.', 'वृक्षारोपण, जैविक खेती और नदी स्वच्छता अभियान।']
      ])}`),
    section('alt', `<div class="callout">${icon('scale')}<div><h2>${L('Vision & values', 'दृष्टि एवं मूल्य')}</h2><p class="quote">धर्मो रक्षति रक्षितः</p><p>${L('Those who protect dharma are protected by it.', 'जो धर्म की रक्षा करता है, धर्म उसकी रक्षा करता है।')}</p></div></div>
      <h2>${L('Aligned with the UN Sustainable Development Goals', 'संयुक्त राष्ट्र सतत विकास लक्ष्यों के अनुरूप')}</h2>
      ${features(L, [
        ['leaf', 'Zero Hunger', 'शून्य भुखमरी', '', ''],
        ['book', 'Quality Education', 'गुणवत्तापूर्ण शिक्षा', '', ''],
        ['cross', 'Good Health & Well-being', 'अच्छा स्वास्थ्य एवं कल्याण', '', ''],
        ['drop', 'Clean Water & Sanitation', 'स्वच्छ जल एवं स्वच्छता', '', ''],
        ['sparkle', 'Responsible Consumption & Production', 'ज़िम्मेदार उपभोग एवं उत्पादन', '', ''],
        ['globe', 'Climate Action', 'जलवायु कार्रवाई', '', '']
      ])}`),
    section('', `<h2>${L('Ways to contribute', 'योगदान के तरीके')}</h2>
      <div class="feat-grid">
        <a class="feat link" href="${u('donate/')}"><span class="badge">${icon('heart')}</span><h3>${L('Adopt a Cow', 'गाय गोद लें')}</h3></a>
        <a class="feat link" href="${u('gurukul/')}"><span class="badge">${icon('book')}</span><h3>${L("Sponsor a Child's Education", 'बच्चे की शिक्षा प्रायोजित करें')}</h3></a>
        <a class="feat link" href="${u('donate/')}"><span class="badge">${icon('cross')}</span><h3>${L('Support Medical Camps & Health Drives', 'चिकित्सा शिविर एवं स्वास्थ्य अभियान में सहयोग')}</h3></a>
        <a class="feat link" href="${u('environment/')}"><span class="badge">${icon('tree')}</span><h3>${L('Fund Tree Plantation & River Cleanliness', 'वृक्षारोपण एवं नदी स्वच्छता को सहयोग')}</h3></a>
      </div>
      <p class="center">${wa(L, L('Connect on WhatsApp', 'WhatsApp पर संपर्क करें'))}</p>
      ${taxNote(L)}`),
    cta(L, u)].join('') }
];
