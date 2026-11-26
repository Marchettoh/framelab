// ===== FRAME LAB — main.js =====

// Nav: stato scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Reveal on scroll con stagger
const revealEls = document.querySelectorAll('.reveal');
revealEls.forEach((el, i) => {
  const siblings = el.parentElement.querySelectorAll(':scope > .reveal');
  el.style.setProperty('--d', `${Array.from(siblings).indexOf(el) * 0.08}s`);
});
const io = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach(el => io.observe(el));

// Contatori animati
const counters = document.querySelectorAll('.stat-num');
const counterIO = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const dur = 1400;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  }),
  { threshold: 0.6 }
);
counters.forEach(el => counterIO.observe(el));

// Anno corrente nel footer
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Cookie banner (GDPR) =====
(function () {
  if (localStorage.getItem('fl_cookie_consent')) return;
  const base = location.pathname.includes('/prodotti/') ? '../' : '';
  const bar = document.createElement('div');
  bar.className = 'cookie-bar';
  bar.innerHTML = `
    <p>Usiamo solo cookie tecnici necessari al funzionamento del sito.
    Nessun tracciamento, nessuna profilazione.
    <a href="${base}cookie-policy.html">Cookie Policy</a></p>
    <div class="cookie-actions">
      <button class="btn btn-ghost btn-sm" data-cookie="essential">Solo necessari</button>
      <button class="btn btn-primary btn-sm" data-cookie="all">Accetta</button>
    </div>`;
  document.body.appendChild(bar);
  requestAnimationFrame(() => bar.classList.add('show'));
  bar.addEventListener('click', e => {
    const b = e.target.closest('[data-cookie]');
    if (!b) return;
    localStorage.setItem('fl_cookie_consent', b.dataset.cookie);
    bar.classList.remove('show');
    setTimeout(() => bar.remove(), 500);
  });
})();
