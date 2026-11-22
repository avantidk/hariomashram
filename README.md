# Hariom Ashram Kadwapani website

Static site with an English/Hindi toggle. Every page has its own URL. The built site sits at the repo root and GitHub Pages serves it directly (Settings → Pages → Deploy from branch → `main` / root).

- Edit content: `src/posts.mjs` (blog), `src/config.mjs` (address, bank, social), `build.mjs` (page text)
- Rebuild after editing: `node build.mjs` (set `SITE_URL=https://your-domain` when the real domain is ready)
- Preview: `python3 -m http.server`
- Later: Razorpay in `window.HariomDonate.start` and Supabase in the contact form (`src/main.js`)
