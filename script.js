// 1) تمييز القسم الحالي في قائمة التنقل
const links = [...document.querySelectorAll('nav a')];
const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(l => l.classList.remove('active'));
    const a = byId.get(e.target.id);
    if (a) {
      a.classList.add('active');
      a.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
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
