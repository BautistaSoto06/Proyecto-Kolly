lucide.createIcons();

// ---- Tabs (tipologías) ----
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.plan-tab');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.dataset.active = 'false');
    panels.forEach(p => p.dataset.active = 'false');
    btn.dataset.active = 'true';
    document.querySelectorAll(`.plan-tab[data-panel="${btn.dataset.tab}"]`).forEach(p => p.dataset.active = 'true');
  });
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));
