# Hariom Ashram Kadwapani website

Static, bilingual (English `/`, Hindi `/hi/`) site. Every page has its own URL.

- Edit content: `src/posts.mjs` (blog), `src/config.mjs` (address, bank, social), `build.mjs` (pages)
- Build: `SITE_URL=https://your-domain node build.mjs` -> `public/`
- Preview: `cd public && python3 -m http.server`
- Deploy: pushing to `main` runs `.github/workflows/pages.yml` (set repo variable `SITE_URL`).
- Later: Razorpay in `window.HariomDonate.start` and Supabase in the contact form (`src/main.js`).
