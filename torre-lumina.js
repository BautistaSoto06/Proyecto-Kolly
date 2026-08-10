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

// ---- Elevación: matriz de pisos ----
const STATUS = {
  disponible: { color: 'bg-emerald', label: 'Disponible' },
  reservado:  { color: 'bg-amber',   label: 'Reservado' },
  vendido:    { color: 'bg-sold',    label: 'Vendido' },
};

const floors = [
  { n: 12, units: ['disponible','disponible','reservado','disponible'] },
  { n: 11, units: ['disponible','reservado','disponible','disponible'] },
  { n: 10, units: ['reservado','disponible','disponible','reservado'] },
  { n: 9,  units: ['disponible','disponible','reservado','disponible'] },
  { n: 8,  units: ['reservado','disponible','reservado','disponible'] },
  { n: 7,  units: ['disponible','reservado','reservado','disponible'] },
  { n: 6,  units: ['reservado','vendido','disponible','reservado'] },
  { n: 5,  units: ['vendido','reservado','vendido','disponible'] },
  { n: 4,  units: ['vendido','vendido','reservado','vendido'] },
  { n: 3,  units: ['vendido','vendido','vendido','reservado'] },
  { n: 2,  units: ['vendido','vendido','vendido','vendido'] },
  { n: 1,  units: ['vendido','vendido','vendido','vendido'] },
];

const elevation = document.getElementById('elevation');
const letters = ['A','B','C','D'];

floors.forEach(floor => {
  const row = document.createElement('div');
  row.className = 'flex items-center gap-3';

  const label = document.createElement('span');
  label.className = 'font-mono text-[11px] text-muted w-9 shrink-0 text-right';
  label.textContent = 'P' + floor.n;
  row.appendChild(label);

  const cells = document.createElement('div');
  cells.className = 'flex-1 grid grid-cols-4 gap-1.5';

  floor.units.forEach((status, i) => {
    const cell = document.createElement('div');
    const s = STATUS[status];
    cell.className = `unit-cell ${s.color} h-6 md:h-7 rounded-[3px] cursor-pointer`;
    cell.title = `Piso ${floor.n} · Unidad ${letters[i]} · ${s.label}`;
    cells.appendChild(cell);
  });

  row.appendChild(cells);
  elevation.appendChild(row);
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
