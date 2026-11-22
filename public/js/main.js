(function () {
  var $ = function (s) { return document.querySelector(s); }, $$ = function (s) { return [].slice.call(document.querySelectorAll(s)); };
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
