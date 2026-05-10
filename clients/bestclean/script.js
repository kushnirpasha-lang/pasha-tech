/* ============================
   ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
============================ */
const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY   = 'bestclean-theme';

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }
}

themeToggle.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

initTheme();

/* ============================
   ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКОВ
============================ */
const LANG_KEY = 'bestclean-lang';

function applyLang(lang) {
  html.setAttribute('data-lang', lang);
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
  localStorage.setItem(LANG_KEY, lang);

  // Обновить активную кнопку
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.langBtn === lang);
  });
}

function initLang() {
  const saved = localStorage.getItem(LANG_KEY);
  applyLang(saved || 'he');
}

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => applyLang(btn.dataset.langBtn));
});

initLang();

/* ============================
   АККОРДЕОН КАРТОЧЕК УСЛУГ
============================ */
function toggleCard(card) {
  const isOpen = card.classList.contains('expanded');
  document.querySelectorAll('.service-card.expanded').forEach((c) => {
    c.classList.remove('expanded');
    c.setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    card.classList.add('expanded');
    card.setAttribute('aria-expanded', 'true');
  }
}

document.querySelectorAll('.service-card').forEach((card) => {
  card.addEventListener('click', () => toggleCard(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCard(card);
    }
  });
});

/* ============================
   АНИМАЦИЯ СЕКЦИЙ ПРИ СКРОЛЛЕ
============================ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.section-fade').forEach((el) => observer.observe(el));
