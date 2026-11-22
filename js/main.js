(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---- Language toggle (English default, Hindi optional, remembered) ----
  const nodes = $$('[data-i18n]');
  nodes.forEach(n => { n.dataset.en = n.innerHTML; });
  function setLang(lang) {
    document.documentElement.lang = lang;
    nodes.forEach(n => {
      const k = n.dataset.i18n;
      n.innerHTML = lang === 'hi' && window.HI[k] ? window.HI[k] : n.dataset.en;
    });
    $$('.lang button').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  let saved = 'en'; try { saved = localStorage.getItem('lang') || 'en'; } catch (e) {}
  if (saved === 'hi') setLang('hi');

  // ---- Mobile menu ----
  const btn = $('.menu-btn'), menu = $('#menu');
  btn.addEventListener('click', () => btn.setAttribute('aria-expanded', menu.classList.toggle('open')));
  $$('#menu a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }));

  $('#yr').textContent = new Date().getFullYear();

  // ---- Donation hook: wire Razorpay + Supabase here later ----
  // window.HariomDonate.start({amount, purpose}) will open Razorpay Checkout,
  // then record the payment in Supabase.
  window.HariomDonate = window.HariomDonate || {
    start({ amount, purpose }) {
      $('#donate-msg').textContent = 'Online donations will be enabled soon. (₹' + amount + ', ' + purpose + ')';
    }
  };
  $$('[data-donate]').forEach(b => b.addEventListener('click', () => {
    let amount = Number(b.dataset.amount);
    if (b.hasAttribute('data-custom')) amount = Number($('#custom-amount').value);
    if (!amount || amount < 1) { $('#donate-msg').textContent = 'Please enter a valid amount.'; return; }
    window.HariomDonate.start({ amount, purpose: b.dataset.purpose });
  }));

  // ---- Contact form hook: wire Supabase insert here later ----
  $('#contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (!f.name.value.trim() || !f.contact.value.trim() || !f.message.value.trim()) {
      $('#form-msg').textContent = 'Please fill all fields.'; return;
    }
    $('#form-msg').textContent = 'Thank you! Form submission will be enabled soon.';
  });
})();
