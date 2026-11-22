(function () {
  var $ = function (s) { return document.querySelector(s); }, $$ = function (s) { return [].slice.call(document.querySelectorAll(s)); };
  // ---- English / Hindi toggle (same URL; text swapped in the browser, choice remembered) ----
  var dict = {};
  try { dict = JSON.parse($('#hi-dict').textContent); } catch (e) {}
  var ATTRS = ['alt', 'placeholder', 'aria-label', 'data-soon', 'data-invalid', 'data-fill'];
  var textNodes = [], attrNodes = [];
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function (n) {
      var p = n.parentNode.nodeName;
      return p === 'SCRIPT' || p === 'STYLE' || !n.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  while (walker.nextNode()) {
    var tn = walker.currentNode;
    if (dict[tn.nodeValue.trim()] !== undefined) textNodes.push({ n: tn, en: tn.nodeValue });
  }
  $$('[' + ATTRS.join('],[') + ']').forEach(function (el) {
    ATTRS.forEach(function (a) {
      var v = el.getAttribute(a);
      if (v && dict[v] !== undefined) attrNodes.push({ el: el, a: a, en: v });
    });
  });
  var meta = $('meta[name=description]'), metaEn = meta && meta.content, titleEn = document.title;
  function tr(v, lang) { return lang === 'hi' ? dict[v.trim()] : v.trim(); }
  function setLang(lang) {
    textNodes.forEach(function (t) {
      var lead = t.en.slice(0, t.en.length - t.en.trimStart().length);
      var trail = t.en.slice(t.en.trimEnd().length);
      t.n.nodeValue = lead + tr(t.en, lang) + trail;
    });
    attrNodes.forEach(function (x) { x.el.setAttribute(x.a, tr(x.en, lang)); });
    if (meta && dict[metaEn] !== undefined) meta.content = tr(metaEn, lang);
    if (dict[titleEn] !== undefined) document.title = tr(titleEn, lang);
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }
  var current = 'en';
  try { current = localStorage.getItem('lang') === 'hi' ? 'hi' : 'en'; } catch (e) {}
  if (current === 'hi') setLang('hi');
  $$('[data-lang-toggle]').forEach(function (b) {
    b.addEventListener('click', function () { current = current === 'hi' ? 'en' : 'hi'; setLang(current); });
  });

  var btn = $('.menu-btn'), menu = $('#menu');
  if (btn) btn.addEventListener('click', function () { btn.setAttribute('aria-expanded', menu.classList.toggle('open')); });

  // Donation hook: wire Razorpay Checkout + Supabase here later.
  // Replace window.HariomDonate.start with a function that opens Razorpay and records the payment.
  window.HariomDonate = window.HariomDonate || {
    start: function (d) { var m = $('#donate-msg'); if (m) m.textContent = m.dataset.soon + ' (₹' + d.amount + ')'; }
  };
  $$('[data-donate]').forEach(function (b) {
    b.addEventListener('click', function () {
      var amount = Number(b.dataset.amount);
      if (b.hasAttribute('data-custom')) amount = Number($('#custom-amount').value);
      if (!amount || amount < 1) { $('#donate-msg').textContent = $('#donate-msg').dataset.invalid; return; }
      window.HariomDonate.start({ amount: amount, purpose: b.dataset.purpose });
    });
  });

  // Contact form hook: wire a Supabase insert here later.
  var f = $('#contact-form');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = f.name.value.trim() && f.contact.value.trim() && f.message.value.trim();
    $('#form-msg').textContent = ok ? f.dataset.soon : f.dataset.fill;
  });
})();
