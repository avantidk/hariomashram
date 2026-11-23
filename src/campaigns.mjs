import { ORG } from './config.mjs';
import { img, icon } from './helpers.mjs';
import { checks, steps, features, section, cta, taxNote } from './blocks.mjs';

const inr = n => '₹' + Number(n).toLocaleString('en-IN');

// Amounts raised / goals come from the original donation pages. They will be driven from Supabase later.
// Images are placeholders (existing photos) until the campaign photos are supplied: replace `img` with the new file name.
export const campaigns = [
  { slug: 'cow-fodder-kit', icon: 'leaf', img: 'cow-eating-gaushala', iw: 480, ih: 480, raised: 2004, goal: 250000, amounts: [500, 1000, 1500, 2000, 3000], purpose: 'fodder',
    title: { en: 'Cow Fodder Kit', hi: 'गौ चारा किट' },
    short: { en: 'Feed the cows with a kit of Dry Husk 5 Kg, Green Fodder 5 Kg, Grains & Pulses 5 Kg and Gur (Jaggery) 3 Kg.', hi: 'सूखा भूसा 5 किग्रा, हरा चारा 5 किग्रा, अनाज एवं दालें 5 किग्रा और गुड़ 3 किग्रा वाली किट से गौमाताओं को भोजन कराएँ।' },
    alt: { en: 'A cow eating fresh vegetables at the gaushala', hi: 'गौशाला में ताज़ी सब्ज़ियाँ खाती एक गाय' },
    body: (L, u) => [
      `<p class="lead-d">${L('Gauseva, the service of cows, is one of the most sacred acts in Sanatan tradition. A Cow Fodder Kit helps nourish the abandoned and rescued cows at Hariom Ashram Gaushala.', 'गौसेवा सनातन परंपरा के सबसे पवित्र कार्यों में से एक है। गौ चारा किट हरिओम आश्रम गौशाला की परित्यक्त और रेस्क्यू की गई गायों को पोषण देती है।')}</p>`,
      `<h2>${L("What's Included in the Cow Fodder Kit?", 'गौ चारा किट में क्या शामिल है?')}</h2>${features(L, [
        ['leaf', 'Dry Husk – 5 Kg', 'सूखा भूसा – 5 किग्रा', '', ''], ['leaf', 'Green Fodder – 5 Kg', 'हरा चारा – 5 किग्रा', '', ''],
        ['sparkle', 'Grains & Pulses – 5 Kg', 'अनाज एवं दालें – 5 किग्रा', '', ''], ['gift', 'Gur (Jaggery) – 3 Kg', 'गुड़ – 3 किग्रा', '', '']])}`,
      `<h2>${L('Why Donate a Cow Fodder Kit?', 'गौ चारा किट क्यों दान करें?')}</h2>${checks(L, [
        ['Feeds abandoned and rescued cows with nutritious food', 'परित्यक्त और रेस्क्यू की गई गायों को पौष्टिक भोजन'],
        ['Helps keep the cows healthy and strong', 'गायों को स्वस्थ और सशक्त रखने में सहायक'],
        ['A direct way to practise Gauseva', 'गौसेवा का सीधा माध्यम'],
        ['Brings the blessings of Gau Mata', 'गौमाता का आशीर्वाद'],
        ['Eligible for 80G tax exemption', '80G कर-छूट के लिए पात्र']])}`,
      `<h2>${L('Hariom Ashram Gaushala – A Sanctuary for Abandoned Cows', 'हरिओम आश्रम गौशाला – परित्यक्त गायों का आश्रय')}</h2><p>${L('Our gaushalas give shelter, fodder and medical care to cows that are abandoned, injured or rescued from cruelty, so that every cow has a safe and loving home.', 'हमारी गौशालाएँ परित्यक्त, घायल या क्रूरता से बचाई गई गायों को आश्रय, चारा और चिकित्सा देती हैं, ताकि हर गाय को सुरक्षित और स्नेहपूर्ण घर मिले।')}</p>`,
      `<h2>${L('How Your Donation Makes a Difference', 'आपका दान कैसे बदलाव लाता है')}</h2>${checks(L, [
        ['Provides daily meals to hungry cows', 'भूखी गायों को प्रतिदिन भोजन'],
        ['Supports the staff who cut fodder and feed the cows', 'चारा काटने और खिलाने वाले कर्मचारियों को सहयोग'],
        ['Helps injured cows regain their strength', 'घायल गायों को स्वस्थ होने में सहायता'],
        ['Keeps our shelters running every day', 'हमारे आश्रयों का प्रतिदिन संचालन']])}`,
      `<h2>${L('Donate a Cow Fodder Kit Today!', 'आज ही गौ चारा किट दान करें!')}</h2><p>${L('Join us in this noble cause. Jai Gau Mata!', 'इस पुनीत कार्य में हमारे साथ जुड़ें। जय गौमाता!')}</p>`] },

  { slug: 'cow-medical-aid-kit', icon: 'cross', img: 'calves-protected-enclosure', iw: 640, ih: 360, raised: 5202, goal: 80000, amounts: [1100, 2100, 3100, 5100, 11000], purpose: 'medical',
    title: { en: 'Cow Medical Aid Kit', hi: 'गौ चिकित्सा किट' },
    short: { en: 'Help provide general medicines, treatment for injured cows, important vaccinations and health tonics.', hi: 'सामान्य दवाइयाँ, घायल गायों का उपचार, आवश्यक टीकाकरण और स्वास्थ्यवर्धक टॉनिक उपलब्ध कराने में सहयोग करें।' },
    alt: { en: 'Injured calves resting in a protected netted enclosure', hi: 'सुरक्षित जालीदार बाड़े में आराम करते घायल बछड़े' },
    body: (L, u) => [
      `<p class="lead-d">${L('Cow Medical Aid Kit: ensuring the health and well-being of rescued cows.', 'गौ चिकित्सा किट: रेस्क्यू की गई गायों के स्वास्थ्य और कल्याण को सुनिश्चित करना।')}</p>`,
      `<h2>${L("What's Included in the Cow Medical Aid Kit?", 'गौ चिकित्सा किट में क्या शामिल है?')}</h2>${features(L, [
        ['cross', 'General medicines', 'सामान्य दवाइयाँ', '', ''], ['hand', 'Medical treatment for injured cows', 'घायल गायों का चिकित्सीय उपचार', '', ''],
        ['shield', 'Important vaccinations', 'आवश्यक टीकाकरण', 'Including protection against Foot-and-Mouth Disease and Brucellosis.', 'खुरपका-मुँहपका रोग और ब्रुसेलोसिस से बचाव सहित।'],
        ['sparkle', 'Health tonics & supplements', 'स्वास्थ्य टॉनिक एवं पोषक पूरक', '', '']])}`,
      `<h2>${L('Why Donate a Cow Medical Aid Kit?', 'गौ चिकित्सा किट क्यों दान करें?')}</h2>${checks(L, [
        ['Gives injured and sick cows timely treatment', 'घायल और बीमार गायों को समय पर उपचार'],
        ['Protects the herd from serious diseases through vaccination', 'टीकाकरण से पूरे झुंड को गंभीर रोगों से सुरक्षा'],
        ['Helps rescued cows recover and live in comfort', 'रेस्क्यू की गई गायों को स्वस्थ होकर आराम से रहने में सहायता'],
        ['A compassionate act of Gauseva', 'गौसेवा का करुणामय कार्य'],
        ['Eligible for 80G tax exemption', '80G कर-छूट के लिए पात्र']])}`,
      `<h2>${L('Hariom Ashram Gaushala – A Lifeline for Rescued Cows', 'हरिओम आश्रम गौशाला – रेस्क्यू की गई गायों का जीवन-आधार')}</h2><p>${L('Our veterinary team treats sick and injured cows, including accident cases, right at the gaushala. Medicines and vaccines are the backbone of that care.', 'हमारा पशु-चिकित्सा दल बीमार और घायल गायों का, दुर्घटना के मामलों सहित, गौशाला में ही उपचार करता है। दवाइयाँ और टीके इस देखभाल की रीढ़ हैं।')}</p>`,
      `<h2>${L('Your Donation Makes a Life-Changing Impact', 'आपका दान जीवन बदल देता है')}</h2>${checks(L, [
        ['Pays for medicines and treatment of injured cows', 'घायल गायों की दवाइयों और उपचार का खर्च'],
        ['Funds vaccinations that prevent disease', 'रोग रोकने वाले टीकाकरण के लिए सहयोग'],
        ['Provides tonics and nutrition for weak cows', 'कमज़ोर गायों के लिए टॉनिक और पोषण'],
        ['Gives rescued cows a second chance at life', 'रेस्क्यू की गई गायों को जीवन का दूसरा अवसर']])}`,
      `<h2>${L('Donate a Cow Medical Aid Kit Today!', 'आज ही गौ चिकित्सा किट दान करें!')}</h2><p>${L('Jai Gau Mata!', 'जय गौमाता!')}</p>`] },

  { slug: 'meal-for-children', icon: 'users', img: 'gurukul-children-prasad', iw: 560, ih: 560, raised: 31000, goal: 250000, amounts: [1100, 2100, 3100, 5100, 11000], purpose: 'meal',
    title: { en: 'Meal for Children & Gausevaks', hi: 'बच्चों एवं गौसेवकों के लिए भोजन' },
    short: { en: 'Nourish lives with a one-time meal donation for 30 underprivileged children and 40 Gausevaks.', hi: 'एक बार के भोजन दान से 30 वंचित बच्चों और 40 गौसेवकों का पोषण करें।' },
    alt: { en: 'Gurukul children praying before a meal', hi: 'भोजन से पहले प्रार्थना करते गुरुकुल के बच्चे' },
    body: (L, u) => [
      `<p class="lead-d">${L('Meal for children and Gausevaks at Hariom Ashram: a simple gift that feeds those who serve and those who learn.', 'हरिओम आश्रम में बच्चों और गौसेवकों के लिए भोजन: एक सरल दान जो सेवा करने वालों और सीखने वालों दोनों का पेट भरता है।')}</p>`,
      `${features(L, [
        ['book', 'Nourish children', 'बच्चों को पोषण', 'Support 30 underprivileged children.', '30 वंचित बच्चों को सहयोग।'],
        ['hand', 'Honour Gausevaks', 'गौसेवकों का सम्मान', 'Support the 40 Gausevaks who care for the cows.', 'गायों की सेवा करने वाले 40 गौसेवकों को सहयोग।'],
        ['heart', 'Receive divine blessings', 'दिव्य आशीर्वाद', 'Feeding others is a timeless act of dharma.', 'भोजन कराना धर्म का शाश्वत कार्य है।']])}`,
      `<h2>${L('How to Donate?', 'दान कैसे करें?')}</h2>${steps(L, [
        ['Choose your meal', 'भोजन चुनें', 'Select breakfast, lunch or dinner.', 'नाश्ता, दोपहर का भोजन या रात का भोजन चुनें।'],
        ['Schedule the offering', 'दिन तय करें', 'Connect with Hariom Ashram to schedule your offering.', 'अपना भोजन दान तय करने के लिए हरिओम आश्रम से संपर्क करें।'],
        ['Experience the giving', 'सेवा का अनुभव करें', 'Be part of the joy of serving a meal.', 'भोजन कराने के आनंद के सहभागी बनें।']])}`,
      `<h2>${L('Why Your Donation Matters', 'आपका दान क्यों महत्वपूर्ण है')}</h2>${checks(L, [
        ['A nutritious meal helps children focus on learning', 'पौष्टिक भोजन बच्चों को पढ़ाई पर ध्यान देने में मदद करता है'],
        ['It supports the Gausevaks who care for the cows every day', 'यह प्रतिदिन गौसेवा करने वालों को सहयोग देता है'],
        ['Eligible for 80G tax exemption', '80G कर-छूट के लिए पात्र']])}`,
      `<h2>${L('Be a Part of This Noble Cause', 'इस पुनीत कार्य के सहभागी बनें')}</h2><p>${L('Contact us today to arrange a meal. Jai Gau Mata!', 'भोजन की व्यवस्था के लिए आज ही संपर्क करें। जय गौमाता!')}</p><p><a class="btn btn-ghost dark" href="${u('contact/')}">${icon('mail')} ${L('Contact us', 'संपर्क करें')}</a></p>`] },

  { slug: 'celebrate-with-us', icon: 'gift', img: 'gurukul-children-prasad', iw: 560, ih: 560, raised: 0, goal: 0, amounts: [500, 1000, 2100, 3100, 5100], purpose: 'celebrate',
    title: { en: 'Celebrate With Us', hi: 'हमारे साथ उत्सव मनाएँ' },
    short: { en: 'Share the joy of your birthday, anniversary or wedding with Gurukul children and cows.', hi: 'अपने जन्मदिन, वर्षगाँठ या विवाह की खुशी गुरुकुल के बच्चों और गौमाताओं के साथ बाँटें।' },
    alt: { en: 'Gurukul children praying before a meal', hi: 'भोजन से पहले प्रार्थना करते गुरुकुल के बच्चे' },
    body: (L, u) => [
      `<p class="lead-d">${L('Celebrate your special occasion at Hariom Ashram Gaushala and share your joy with Gurukul children and cows.', 'अपना विशेष अवसर हरिओम आश्रम गौशाला में मनाएँ और अपनी खुशी गुरुकुल के बच्चों और गौमाताओं के साथ बाँटें।')}</p>`,
      `<h2>${L('Simple and Meaningful Ways to Celebrate', 'उत्सव मनाने के सरल और सार्थक तरीके')}</h2>${features(L, [
        ['leaf', 'Sponsor a Meal', 'भोजन प्रायोजित करें', 'Serve a meal to the children and Gausevaks.', 'बच्चों और गौसेवकों को भोजन कराएँ।'],
        ['heart', 'Feed the Cows', 'गायों को चारा खिलाएँ', 'Offer fodder to the cows in your family’s name.', 'अपने परिवार के नाम से गायों को चारा अर्पित करें।'],
        ['book', 'Support Education', 'शिक्षा में सहयोग', 'Help a child at the Gurukul learn and grow.', 'गुरुकुल के बच्चे की शिक्षा और विकास में सहायता करें।'],
        ['sun', 'Seek Blessings', 'आशीर्वाद प्राप्त करें', 'Begin your new year of life with prayers and blessings.', 'प्रार्थना और आशीर्वाद के साथ जीवन के नए वर्ष का आरंभ करें।']])}
        <p><a class="btn btn-ghost dark" href="${u('campaigns/meal-for-children/')}">${icon('leaf')} ${L('Sponsor a Meal', 'भोजन प्रायोजित करें')}</a> <a class="btn btn-ghost dark" href="${u('campaigns/cow-fodder-kit/')}">${icon('heart')} ${L('Feed the Cows', 'गायों को चारा खिलाएँ')}</a></p>`,
      `<h2>${L('Why Celebrate with Us?', 'हमारे साथ उत्सव क्यों मनाएँ?')}</h2>${checks(L, [
        ['Turn a personal milestone into a gift for others', 'अपने निजी अवसर को दूसरों के लिए उपहार बनाएँ'],
        ['Create memories with children and cows', 'बच्चों और गौमाताओं के साथ यादगार पल'],
        ['80G tax benefit on your donation', 'आपके दान पर 80G कर-लाभ']])}`,
      `<h2>${L('Make Your Special Day Truly Meaningful', 'अपने विशेष दिन को सच में सार्थक बनाएँ')}</h2><p>${L('Birthdays, anniversaries, weddings or any joyful moment: celebrate with Hariom Ashram and bring happiness to many lives. Jai Gau Mata!', 'जन्मदिन, वर्षगाँठ, विवाह या कोई भी आनंद का क्षण: हरिओम आश्रम के साथ मनाएँ और अनेक जीवन में खुशियाँ लाएँ। जय गौमाता!')}</p>`] },

  { slug: 'token-support-for-gaushala', icon: 'hand', img: 'calf-at-ashram', iw: 560, ih: 560, raised: 1111, goal: 150000, amounts: [], purpose: 'token',
    title: { en: 'Token Support for Gaushala', hi: 'गौशाला के लिए सांकेतिक सहयोग' },
    short: { en: 'Every gift, large or small, is a beacon of hope for the cows and children in our care.', hi: 'छोटा या बड़ा हर दान हमारी देखरेख में रह रही गौमाताओं और बच्चों के लिए आशा की किरण है।' },
    alt: { en: 'A young calf at the ashram next to a fodder cart', hi: 'चारे की गाड़ी के पास आश्रम का एक बछड़ा' },
    body: (L, u) => [
      `<p class="lead-d">${L('Hariom! With heartfelt gratitude we acknowledge your generous support. Thank you for your kindness and compassion. Jai Gau Mata!', 'हरिओम! हम हृदय से आपके उदार सहयोग के लिए आभारी हैं। आपकी दया और करुणा के लिए धन्यवाद। जय गौमाता!')}</p>`,
      `<h2>${L('Why Donate to Hariom Ashram? A Meaningful Way to Give Back', 'हरिओम आश्रम को दान क्यों करें? लौटाने का एक सार्थक तरीका')}</h2>${steps(L, [
        ['Aiding underprivileged children', 'वंचित बच्चों की सहायता', 'Your gift helps provide education, meals and shelter at the Gurukul.', 'आपका दान गुरुकुल में शिक्षा, भोजन और आश्रय में सहायक होता है।'],
        ['Supporting the care of cows', 'गौसेवा में सहयोग', 'Fodder, shelter and medical care for abandoned and rescued cows.', 'परित्यक्त और रेस्क्यू की गई गायों के लिए चारा, आश्रय और चिकित्सा।'],
        ['Promoting sustainable practices', 'सतत पद्धतियों को बढ़ावा', 'Organic farming and tree plantation drives.', 'जैविक खेती और वृक्षारोपण अभियान।'],
        ['Gaining divine blessings', 'दिव्य आशीर्वाद', 'Giving with a pure heart brings peace and blessings.', 'शुद्ध हृदय से दिया गया दान शांति और आशीर्वाद लाता है।'],
        ['Tax benefits under Section 80G', 'धारा 80G के अंतर्गत कर-लाभ', 'Donations are tax exempted under section 80G(5)(iii).', 'दान धारा 80G(5)(iii) के अंतर्गत कर-मुक्त हैं।'],
        ['Being part of a noble cause', 'पुनीत कार्य का हिस्सा', 'Join a community that serves animals, children and nature.', 'पशुओं, बच्चों और प्रकृति की सेवा करने वाले समुदाय से जुड़ें।'],
        ['Transparency and accountability', 'पारदर्शिता और जवाबदेही', 'Our registration and bank details are public on this website.', 'हमारा पंजीकरण और बैंक विवरण इस वेबसाइट पर सार्वजनिक है।']])}`,
      `<h2>${L('Frequently Asked Questions', 'अक्सर पूछे जाने वाले प्रश्न')}</h2><div class="faq">
        <details><summary>${L('How can I donate?', 'मैं दान कैसे कर सकता/सकती हूँ?')}</summary><p>${L('You can donate through the online option on this page once it is live, by bank transfer or UPI (see the Transparency page), or in person at the ashram.', 'आप इस पृष्ठ के ऑनलाइन विकल्प (शुरू होने पर), बैंक ट्रांसफर या UPI (पारदर्शिता पृष्ठ देखें) से, या आश्रम आकर दान कर सकते हैं।')}</p></details>
        <details><summary>${L('Will I get a receipt?', 'क्या मुझे रसीद मिलेगी?')}</summary><p>${L('Yes. Send your payment screenshot on WhatsApp for an official receipt. Monetary donations are eligible for an 80G certificate.', 'हाँ। आधिकारिक रसीद के लिए अपना भुगतान स्क्रीनशॉट WhatsApp पर भेजें। मौद्रिक दान के लिए 80G प्रमाणपत्र उपलब्ध है।')}</p></details>
        <details><summary>${L('What are the 80G benefits?', '80G के क्या लाभ हैं?')}</summary><p>${L('Donations are tax exempted under section 80G(5)(iii) of the Income Tax Act, registration No AABTH0927L22LK01.', 'दान आयकर अधिनियम की धारा 80G(5)(iii) के अंतर्गत कर-मुक्त हैं, पंजीकरण संख्या AABTH0927L22LK01।')}</p></details>
        <details><summary>${L('How are the funds used?', 'दान की राशि का उपयोग कैसे होता है?')}</summary><p>${L('Funds go towards the care of cows, the education and upkeep of Gurukul children, and environment work.', 'राशि गौसेवा, गुरुकुल के बच्चों की शिक्षा एवं देखभाल और पर्यावरण कार्य में लगती है।')}</p></details>
        <details><summary>${L('Can I volunteer or donate in kind?', 'क्या मैं स्वयंसेवक बन सकता/सकती हूँ या वस्तु दान कर सकता/सकती हूँ?')}</summary><p>${L('Please contact us on WhatsApp and we will guide you.', 'कृपया WhatsApp पर हमसे संपर्क करें, हम आपका मार्गदर्शन करेंगे।')}</p></details></div>`,
      `<p>${L('Join us in this noble mission today and become a force for good! Jai Gau Mata!', 'आज ही इस पुनीत अभियान से जुड़ें और शुभ कार्य के सहभागी बनें! जय गौमाता!')}</p>`] }
];

export const bySlug = Object.fromEntries(campaigns.map(c => [c.slug, c]));

const progress = (L, c) => c.goal ? `<div class="prog"><div class="bar"><span style="width:${Math.max(2, Math.min(100, Math.round(c.raised / c.goal * 100)))}%"></span></div><p><strong>${inr(c.raised)}</strong> ${L('raised', 'जुटाए गए')} · ${L('Goal', 'लक्ष्य')} ${inr(c.goal)}</p></div>` : '';

export const campaignCard = (L, u, c) => `<a class="card link camp" href="${u('campaigns/' + c.slug + '/')}">${img(c.img, L(c.alt.en, c.alt.hi), c.iw, c.ih)}<h3>${icon(c.icon)} ${L(c.title.en, c.title.hi)}</h3><p>${L(c.short.en, c.short.hi)}</p>${progress(L, c)}<span class="more">${L('Donate', 'दान करें')} ${icon('arrow')}</span></a>`;

const donateAside = (L, u, c) => `<aside class="dcard"><h3>${L('Choose an amount', 'राशि चुनें')}</h3>
${c.amounts.length ? `<div class="chips">${c.amounts.map(a => `<button type="button" class="chip" data-chip="${a}">${inr(a)}</button>`).join('')}<button type="button" class="chip" data-chip="other">${L('Other', 'अन्य')}</button></div>` : ''}
<label class="amt-input">₹ <input id="custom-amount" type="number" min="1" inputmode="numeric" placeholder="${L('Your contribution', 'आपका योगदान')}" aria-label="${L('Amount in rupees', 'राशि (रुपये)')}"></label>
<button class="btn btn-primary block" data-donate data-custom data-purpose="${c.purpose}">${icon('heart')} ${L('Donate', 'दान करें')}</button>
<p id="donate-msg" class="note" role="status" data-soon="${L('Online donation will be enabled soon. Meanwhile please use the bank details on the Transparency page.', 'ऑनलाइन दान जल्द ही शुरू होगा। तब तक कृपया पारदर्शिता पृष्ठ पर दिए बैंक विवरण का उपयोग करें।')}" data-invalid="${L('Please enter a valid amount.', 'कृपया सही राशि दर्ज करें।')}"></p>
${progress(L, c)}
<p class="small">${icon('shield')} ${L('80G tax exempted. Send your payment screenshot on WhatsApp for the receipt.', '80G कर-मुक्त। रसीद के लिए भुगतान का स्क्रीनशॉट WhatsApp पर भेजें।')}</p>
<p class="small"><a href="${u('transparency/')}">${icon('file')} ${L('Bank & UPI details', 'बैंक एवं UPI विवरण')}</a> · <a href="${ORG.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp-f')} WhatsApp</a></p></aside>`;

export const campaignPages = campaigns.map(c => ({
  key: 'camp-' + c.slug, path: `campaigns/${c.slug}/`, crumbs: ['campaigns'], og: c.img, title: [c.title.en, c.title.hi], desc: [c.short.en, c.short.hi],
  body: (L, u) => `<div class="blk"><div class="container camp-grid"><div class="camp-main"><div class="photo">${img(c.img, L(c.alt.en, c.alt.hi), c.iw, c.ih, 'loading="eager" fetchpriority="high"')}</div>${c.body(L, u).join('')}</div>${donateAside(L, u, c)}</div></div>
    <section class="blk alt"><div class="container"><h2>${L('Other ways to give', 'सहयोग के अन्य तरीके')}</h2><div class="cards">${campaigns.filter(x => x !== c).slice(0, 3).map(x => campaignCard(L, u, x)).join('')}</div></div></section>${cta(L, u)}`
}));

campaignPages.unshift({
  key: 'campaigns', path: 'campaigns/', title: ['Campaigns', 'अभियान'],
  desc: ['Donation campaigns of Hariom Ashram Kadwapani: cow fodder kit, cow medical aid kit, meals for children, celebrations and token support. All donations are 80G tax exempted.', 'हरिओम आश्रम कड़वापानी के दान अभियान: गौ चारा किट, गौ चिकित्सा किट, बच्चों के लिए भोजन, उत्सव और सांकेतिक सहयोग। सभी दान 80G कर-मुक्त हैं।'],
  body: (L, u) => `<div class="container"><p class="lead-d">${L('Choose a cause close to your heart. Every campaign supports the cows, children and Gausevaks of Hariom Ashram.', 'अपने हृदय के निकट कोई अभियान चुनें। हर अभियान हरिओम आश्रम की गौमाताओं, बच्चों और गौसेवकों का सहयोग करता है।')}</p><div class="cards">${campaigns.map(c => campaignCard(L, u, c)).join('')}</div>${taxNote(L)}</div>${cta(L, u)}`
});
