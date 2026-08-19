lucide.createIcons();

// ---- Mobile nav toggle ----
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuIconOpen = document.getElementById('mobileMenuIconOpen');
const mobileMenuIconClose = document.getElementById('mobileMenuIconClose');
if (mobileMenuBtn && mobileMenu) {
  const closeMobileMenu = () => {
    mobileMenu.classList.add('hidden');
    mobileMenuIconOpen.classList.remove('hidden');
    mobileMenuIconClose.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  };
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove('hidden');
      mobileMenuIconOpen.classList.add('hidden');
      mobileMenuIconClose.classList.remove('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

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

// ---- Mapa Interactivo (Leaflet) ----
const mapElement = document.getElementById('map');

if (mapElement) {
  // 1. Coordenadas de los puntos
  const oneTwentyCoords = [25.7663, -80.1965]; // 120 SW 8th St
  const pois = {
    'bcc': [25.7675, -80.1930], // Brickell City Centre
    'mbv': [25.7640, -80.1935], // Mary Brickell Village
    'fd': [25.7615, -80.1915],  // Financial District
    'mia': [25.7959, -80.2870]  // Miami Airport
  };

  // 2. Inicializar el mapa
  const map = L.map('map', {
    scrollWheelZoom: false // Evita que la página haga zoom al hacer scroll con el mouse
  }).setView(oneTwentyCoords, 15);

  // 3. Capa de mapa (Dark Mode de CartoDB)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // 4. Ícono personalizado dorado para One Twenty
  const goldIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #C5A059; width: 20px; height: 20px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 10px rgba(197, 160, 89, 0.8);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  // 5. Marcador principal
  L.marker(oneTwentyCoords, {icon: goldIcon}).addTo(map)
    .bindPopup('<b style="color:#C5A059; font-family: sans-serif;">One Twenty Signature</b><br><span style="font-family: sans-serif; font-size: 12px;">120 SW 8th St, Miami.</span>')
    .openPopup();

  // 6. Marcadores secundarios (POI) en color blanco semitransparente
  Object.values(pois).forEach(coord => {
    L.circleMarker(coord, {
      color: '#ffffff',
      fillColor: '#ffffff',
      fillOpacity: 0.5,
      radius: 5,
      weight: 1
    }).addTo(map);
  });

  // 7. Lógica para que las tarjetas muevan el mapa
  document.querySelectorAll('.poi-card').forEach(card => {
    card.addEventListener('click', function() {
      const poiKey = this.getAttribute('data-poi');
      if (pois[poiKey]) {
        map.flyTo(pois[poiKey], 16, {
          duration: 1.5 
        });
      }
    });
  });
}
