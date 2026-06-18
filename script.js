// Language toggle (EN / 中)
const I18N_META = {
  en: {
    titles: {
      home: 'Leiming Yu — GPU Researcher',
      blog: 'Blog — Leiming Yu',
    },
    backToTop: 'Back to top',
    pubsShown: (n) => `Showing ${n} publications`,
    talksShown: (n) => `Showing ${n} talks`,
    blogShown: (n) => `Showing ${n} posts`,
  },
  zh: {
    titles: {
      home: '郁雷鸣 — GPU 研究员',
      blog: '博客 — 郁雷鸣',
    },
    backToTop: '回到顶部',
    pubsShown: (n) => `显示 ${n} 篇论文`,
    talksShown: (n) => `显示 ${n} 场报告`,
    blogShown: (n) => `显示 ${n} 篇博文`,
  }
};

// Current UI language (mirrors <html lang>), defaulting to 'en'.
const currentLang = () => (document.documentElement.lang === 'zh' ? 'zh' : 'en');

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
      const on = b.dataset.lang === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    const titleKey = document.documentElement.dataset.titleKey;
    if (titleKey && I18N_META[lang].titles[titleKey]) {
      document.title = I18N_META[lang].titles[titleKey];
    }
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

// Respect the user's motion preference for programmatic scrolling
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scrollBehavior = () => (prefersReducedMotion.matches ? 'auto' : 'smooth');

// Back-to-top button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  const toggle = () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
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
    if (target) target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
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
const filterStatus = document.getElementById('filter-status');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach(b => {
      const on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });

    let shown = 0;
    pubs.forEach(p => {
      const show = filter === 'all' || p.dataset.type === filter;
      p.classList.toggle('hidden', !show);
      if (show) shown++;
    });
    if (filterStatus) filterStatus.textContent = I18N_META[currentLang()].pubsShown(shown);
  });
});

// Talks filter
const talkFilters = document.querySelectorAll('.talk-filter');
const talks = document.querySelectorAll('.talk');

talkFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    talkFilters.forEach(b => {
      const on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });

    let shown = 0;
    talks.forEach(t => {
      const show = filter === 'all' || t.dataset.type === filter;
      t.classList.toggle('hidden', !show);
      if (show) shown++;
    });
    if (filterStatus) filterStatus.textContent = I18N_META[currentLang()].talksShown(shown);
  });
});

// Blog tag filter
const blogFilters = document.querySelectorAll('.blog-filter');
const posts = document.querySelectorAll('.post');

blogFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    blogFilters.forEach(b => {
      const on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });

    let shown = 0;
    posts.forEach(p => {
      const tags = (p.dataset.tags || '').split(/\s+/).filter(Boolean);
      const show = filter === 'all' || tags.includes(filter);
      p.classList.toggle('hidden', !show);
      if (show) shown++;
    });
    if (filterStatus) filterStatus.textContent = I18N_META[currentLang()].blogShown(shown);
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
          a.classList.toggle('is-current', isCurrent);
          if (isCurrent) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}
