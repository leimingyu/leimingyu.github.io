// Language toggle (EN / 中)
const I18N_META = {
  en: {
    title: 'Leiming Yu — GPU Researcher',
    backToTop: 'Back to top',
  },
  zh: {
    title: '余磊明 — GPU 研究员',
    backToTop: '回到顶部',
  }
};

(function initLang() {
  const stored = localStorage.getItem('site-lang');
  const fromBrowser = (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  const initial = stored || fromBrowser;
  applyLang(initial);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      applyLang(lang);
      localStorage.setItem('site-lang', lang);
    });
  });

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    document.title = I18N_META[lang].title;
    const bt = document.getElementById('back-to-top');
    if (bt) {
      bt.setAttribute('aria-label', I18N_META[lang].backToTop);
      bt.setAttribute('title', I18N_META[lang].backToTop);
    }
  }
})();

// Footer year
const year = new Date().getFullYear();
const yr = document.getElementById('yr');
if (yr) yr.textContent = year;
const yrZh = document.getElementById('yr-zh');
if (yrZh) yrZh.textContent = year;

// Back-to-top button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  const toggle = () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Email obfuscation — assemble address at click time so it never sits in source.
function buildAddress(el) {
  return `${el.dataset.emailUser}@${el.dataset.emailDomain}`;
}

// Header "Email" link: scroll to contact + open mailto
document.querySelectorAll('a.email-link').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(el.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.location.href = 'mailto:' + buildAddress(el);
  });
});

// Inline "email" hyperlink in the Contact section
document.querySelectorAll('a.email-send').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'mailto:' + buildAddress(el);
  });
});

// Publication filter
const filterButtons = document.querySelectorAll('.filter-btn');
const pubs = document.querySelectorAll('.pub');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach(b => b.classList.toggle('active', b === btn));

    pubs.forEach(p => {
      const show = filter === 'all' || p.dataset.type === filter;
      p.classList.toggle('hidden', !show);
    });
  });
});

// Talks filter
const talkFilters = document.querySelectorAll('.talk-filter');
const talks = document.querySelectorAll('.talk');

talkFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    talkFilters.forEach(b => b.classList.toggle('active', b === btn));

    talks.forEach(t => {
      const show = filter === 'all' || t.dataset.type === filter;
      t.classList.toggle('hidden', !show);
    });
  });
});

// Highlight current section in nav as user scrolls
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const sections = Array.from(navLinks)
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          const isCurrent = a.getAttribute('href') === `#${id}`;
          a.style.color = isCurrent ? 'var(--accent)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}
