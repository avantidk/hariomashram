// Change SITE_URL to the real domain before launch (used for canonical URLs, sitemap, hreflang).
export const SITE_URL = process.env.SITE_URL || 'https://hariomashram.org';
export const ORG = {
  name: { en: 'Hariom Ashram Kadwapani', hi: 'हरिओम आश्रम कड़वापानी' },
  addr: {
    en: 'Kadwapani, Karbari Grant, Dehradun, Uttarakhand 248171, India',
    hi: 'कड़वापानी, करबारी ग्रांट, देहरादून, उत्तराखंड 248171, भारत'
  },
  whatsapp: 'https://api.whatsapp.com/send?phone=918193989452',
  whatsappDisplay: '+91 81939 89452',
  social: {
    Facebook: 'http://www.fb.com/hoaddun',
    Instagram: 'https://www.instagram.com/hoaddun',
    YouTube: 'https://www.youtube.com/@hoaddun'
  },
  bank: {
    bank: 'IDBI, Jhiverhedi, Dehradun',
    ifsc: 'IBKL0001768',
    name: 'HARI OM ASHRAM KADWAPANI',
    acc: '1768 1020 0000 0897'
  },
  tax80g: 'Tax exempted under section 80G(5)(iii) of Income Tax Act vide registration No AABTH0927L22LK01'
};
