// Blog posts. Each post gets its own URL: /blog/<slug>/ and /hi/blog/<slug>/
// These three are SAMPLE drafts - replace with real posts (or later load from Supabase).
export const posts = [
  {
    slug: 'welcome-to-hariom-ashram-kadwapani',
    date: '2026-11-22',
    img: 'cows-in-shed',
    title: { en: 'Welcome to Hariom Ashram Kadwapani', hi: 'हरिओम आश्रम कड़वापानी में आपका स्वागत है' },
    excerpt: { en: 'An introduction to our gaushala, gurukul and environment work near Dehradun.', hi: 'देहरादून के पास हमारी गौशाला, गुरुकुल और पर्यावरण सेवा का परिचय।' },
    body: {
      en: ['Hariom Ashram Kadwapani is a community-run ashram at Kadwapani, Karbari Grant, Dehradun. Our work rests on three pillars: caring for cows in our gaushala, educating children in our gurukul, and protecting the environment.', 'This blog will share updates from the ashram, stories of rescued animals, news from the gurukul and ways you can take part. Follow us on social media or message us on WhatsApp to stay in touch.'],
      hi: ['हरिओम आश्रम कड़वापानी, करबारी ग्रांट, देहरादून में स्थित एक सामुदायिक आश्रम है। हमारा कार्य तीन स्तंभों पर टिका है: गौशाला में गौसेवा, गुरुकुल में बच्चों की शिक्षा और पर्यावरण संरक्षण।', 'इस ब्लॉग में हम आश्रम के समाचार, बचाई गई गौमाताओं की कहानियाँ, गुरुकुल की खबरें और जुड़ने के तरीके साझा करेंगे। जुड़े रहने के लिए हमें सोशल मीडिया पर फॉलो करें या WhatsApp पर संदेश भेजें।']
    }
  },
  {
    slug: 'how-your-donation-helps-cows',
    date: '2026-11-21',
    img: 'calf-at-ashram',
    title: { en: 'How your donation helps the cows', hi: 'आपका दान गौमाताओं की कैसे सहायता करता है' },
    excerpt: { en: 'What fodder and medical aid kits mean for the animals in our care.', hi: 'चारा और चिकित्सा किट हमारी गौमाताओं के लिए क्या मायने रखते हैं।' },
    body: {
      en: ['Most of the support we receive goes into two basic needs: fodder and medical care. A fodder kit helps feed the cows for a day, and a medical aid kit helps treat animals that arrive injured or unwell.', 'Every contribution, large or small, helps. You can donate from our donation page, and donations are eligible for tax exemption under section 80G.'],
      hi: ['हमें मिलने वाला अधिकांश सहयोग दो मूल आवश्यकताओं में लगता है: चारा और चिकित्सा। एक चारा किट से गायों को एक दिन का भोजन मिलता है और चिकित्सा किट से घायल या बीमार गौमाताओं का उपचार होता है।', 'छोटा-बड़ा हर योगदान मायने रखता है। आप हमारे दान पृष्ठ से दान कर सकते हैं, और दान पर 80G के अंतर्गत कर-छूट उपलब्ध है।']
    }
  },
  {
    slug: 'gurukul-education-and-values',
    date: '2026-11-20',
    img: 'gurukul-children-prasad',
    title: { en: 'Gurukul: education with values', hi: 'गुरुकुल: संस्कारयुक्त शिक्षा' },
    excerpt: { en: 'Why the ashram combines studies, discipline and daily prayer.', hi: 'आश्रम में पढ़ाई, अनुशासन और दैनिक प्रार्थना का मेल क्यों।' },
    body: {
      en: ['Our gurukul brings children together to learn, pray and eat together as one family. Education here is not only about books; it is also about discipline, gratitude and service.', 'If you would like to support the children or visit the gurukul, please contact us.'],
      hi: ['हमारे गुरुकुल में बच्चे एक परिवार की तरह साथ पढ़ते, प्रार्थना करते और भोजन करते हैं। यहाँ शिक्षा केवल पुस्तकों तक सीमित नहीं है; अनुशासन, कृतज्ञता और सेवा भी इसका हिस्सा हैं।', 'यदि आप बच्चों का सहयोग करना या गुरुकुल आना चाहते हैं, तो कृपया हमसे संपर्क करें।']
    }
  }
];
