// FRAME LAB — main.js (v2)
// Ogni funzione è un miglioramento progressivo: senza JS il sito resta completo e leggibile.
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initHeader();
    initMenu();
    initReveal();
    initActiveNav();
    initCarousel();
    initForm();
    initNotice();
    var y = document.querySelectorAll('[data-year]');
    for (var i = 0; i < y.length; i++) y[i].textContent = String(new Date().getFullYear());
  });

  // Header: sfondo pieno dopo il primo scroll
  function initHeader() {
    var header = document.getElementById('header');
    if (!header) return;
    var onScroll = function () { header.classList.toggle('is-solid', window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Menu mobile: Esc per chiudere, focus gestito, resto della pagina inerte
  function initMenu() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;
    var label = toggle.querySelector('.sr-only');
    var others = [document.getElementById('main'), document.querySelector('.site-footer')].filter(Boolean);
    var items = menu.querySelectorAll('.mobile-menu-list li');
    for (var i = 0; i < items.length; i++) items[i].style.setProperty('--i', i);

    menu.inert = true;

    function setOpen(open, returnFocus) {
      toggle.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'Chiudi menu' : 'Menu';
      menu.classList.toggle('is-open', open);
      menu.inert = !open;
      document.body.classList.toggle('menu-open', open);
      others.forEach(function (el) { el.inert = open; });
      if (open) {
        var first = menu.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      } else if (returnFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true', true);
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false, false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, true);
    });
    // Se si torna a schermo largo con il menu aperto, lo chiudo
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false, false);
    });
  }

  // Ingressi progressivi, una sola volta per elemento
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add('is-in');
      return;
    }
    // Ritardo a cascata tra fratelli
    for (var j = 0; j < els.length; j++) {
      var el = els[j];
      var sibs = el.parentElement.querySelectorAll(':scope > [data-reveal]');
      var idx = Array.prototype.indexOf.call(sibs, el);
      if (idx > 0) el.style.setProperty('--i', Math.min(idx, 5));
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    for (var k = 0; k < els.length; k++) io.observe(els[k]);
  }

  // Voce di menu attiva in base alla sezione visibile
  function initActiveNav() {
    var links = document.querySelectorAll('.nav-list a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (s) map[s.id] = a;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = map[entry.target.id];
        if (!a) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
          a.classList.add('is-active');
          a.setAttribute('aria-current', 'true');
        } else if (a.classList.contains('is-active')) {
          a.classList.remove('is-active');
          a.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  // Carosello: lo scorrimento è nativo (scroll-snap); qui solo frecce, contatore e barra di avanzamento
  function initCarousel() {
    var track = document.getElementById('workTrack');
    if (!track) return;
    var controls = document.querySelector('[data-carousel-controls="work"]');
    var cards = track.children;
    var prev = controls && controls.querySelector('[data-dir="-1"]');
    var next = controls && controls.querySelector('[data-dir="1"]');
    var cur = controls && controls.querySelector('[data-carousel-current]');
    var tot = controls && controls.querySelector('[data-carousel-total]');
    var bar = track.parentElement.querySelector('.carousel-progress span');
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    if (tot) tot.textContent = pad(cards.length);

    function step() {
      if (cards.length < 2) return track.clientWidth;
      return cards[1].offsetLeft - cards[0].offsetLeft;
    }
    function update() {
      var max = track.scrollWidth - track.clientWidth;
      var x = track.scrollLeft;
      if (prev) prev.disabled = x <= 2;
      if (next) next.disabled = x >= max - 2;
      var idx = Math.min(cards.length - 1, Math.round(x / step()));
      if (x >= max - 2) idx = cards.length - 1;
      if (cur) cur.textContent = pad(idx + 1);
      if (bar) {
        var visible = track.clientWidth / track.scrollWidth;
        var p = max > 0 ? visible + (1 - visible) * (x / max) : 1;
        bar.style.setProperty('--p', p.toFixed(3));
      }
    }
    function go(dir) {
      track.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
    var raf = 0;
    track.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; update(); });
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // Form contatti: validazione con messaggi chiari, stato di invio, conferma dopo il ritorno da FormSubmit
  function initForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    if (new URLSearchParams(location.search).has('inviato')) {
      var ok = document.createElement('div');
      ok.className = 'form-success';
      ok.setAttribute('role', 'status');
      ok.tabIndex = -1;
      ok.innerHTML = '<h3>Messaggio inviato</h3><p>Grazie, abbiamo ricevuto la tua richiesta. Ti risponderemo all\'indirizzo email che hai indicato.</p>';
      form.replaceWith(ok);
      ok.focus({ preventScroll: true });
      return;
    }

    form.noValidate = true;
    var messages = {
      nome: 'Scrivi il tuo nome.',
      email: { valueMissing: 'Scrivi la tua email.', typeMismatch: 'Controlla l\'email: sembra incompleta (es. nome@azienda.it).' },
      messaggio: 'Raccontaci in breve di cosa hai bisogno.'
    };

    function check(input) {
      var field = input.closest('.field');
      var err = field && field.querySelector('.field-error');
      if (!field || !err) return true;
      var v = input.validity;
      var msg = '';
      if (!v.valid) {
        var m = messages[input.name];
        msg = typeof m === 'string' ? m : (v.valueMissing ? m.valueMissing : m.typeMismatch);
      }
      if (msg) {
        field.setAttribute('data-invalid', '');
        input.setAttribute('aria-invalid', 'true');
      } else {
        field.removeAttribute('data-invalid');
        input.removeAttribute('aria-invalid');
      }
      err.textContent = msg;
      return !msg;
    }

    var inputs = form.querySelectorAll('.field input, .field textarea');
    inputs.forEach(function (input) {
      input.addEventListener('blur', function () { if (input.value) check(input); });
      input.addEventListener('input', function () {
        if (input.closest('.field').hasAttribute('data-invalid')) check(input);
      });
    });

    form.addEventListener('submit', function (e) {
      var firstBad = null;
      inputs.forEach(function (input) { if (!check(input) && !firstBad) firstBad = input; });
      if (firstBad) {
        e.preventDefault();
        firstBad.focus();
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.setAttribute('aria-disabled', 'true');
        btn.textContent = 'Invio in corso…';
      }
      // Evita doppi invii
      form.addEventListener('submit', function (ev) { ev.preventDefault(); }, { once: true });
    });
  }

  // Banner informativo: solo cookie/storage tecnici, nessun consenso da raccogliere
  function initNotice() {
    var KEY = 'fl_notice_seen';
    try {
      if (localStorage.getItem(KEY) || localStorage.getItem('fl_cookie_consent')) return;
    } catch (e) { return; }
    var base = /\/prodotti\//.test(location.pathname) ? '../' : '';
    var bar = document.createElement('div');
    bar.className = 'notice-bar on-dark';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Informativa cookie');
    bar.innerHTML = '<p>Questo sito usa solo strumenti tecnici necessari al funzionamento: nessun tracciamento e nessuna profilazione. <a href="' + base + 'cookie-policy.html">Cookie policy</a></p>' +
      '<button type="button" class="btn btn-sm">Ok</button>';
    document.body.appendChild(bar);
    bar.querySelector('button').addEventListener('click', function () {
      try { localStorage.setItem(KEY, '1'); } catch (e) { /* storage non disponibile */ }
      bar.remove();
    });
  }
})();
