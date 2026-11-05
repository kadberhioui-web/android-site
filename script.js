// 1) تمييز القسم الحالي في قائمة التنقل
const nav = document.querySelector('nav');
const links = [...document.querySelectorAll('nav a')];
const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));

function centerLink(a) {
  const n = nav.getBoundingClientRect();
  const r = a.getBoundingClientRect();
  nav.scrollBy({ left: (r.left + r.width / 2) - (n.left + n.width / 2), behavior: 'smooth' });
}

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(l => l.classList.remove('active'));
    const a = byId.get(e.target.id);
    if (a) {
      a.classList.add('active');
      centerLink(a);
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section').forEach(s => io.observe(s));

// 2) زر العودة إلى الأعلى
const topBtn = document.getElementById('top');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('show', window.scrollY > 600);
}, { passive: true });
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 3) التنقل بين الأقسام دون إضافة خطوات إلى سجل التصفح
nav.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  const target = document.getElementById(a.getAttribute('href').slice(1));
  if (target) target.scrollIntoView({ behavior: 'smooth' });
});

// 4) زر الرجوع في الهاتف: الضغطة الأولى تعيدك إلى بداية الموقع، والثانية تخرجك
try {
  history.pushState({ site: true }, '');
  window.addEventListener('popstate', () => {
    if (window.scrollY > 80) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState({ site: true }, '');
    } else {
      history.back();
    }
  });
} catch (err) {
  // إن منع المتصفح هذه الميزة، يبقى الموقع يعمل بشكل عادي
}
