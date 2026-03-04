import '../../css/sections/controle-section.css';

export function renderControleSection({
  containerId = 'controle-section',
  columns = 4,
  items = null,
  className = '',
  noShadow = false,
  serviceTitle = '',
  title = 'Wat controleren wij?',
  subtitle = 'Tijdens de APK worden alle wettelijk verplichte onderdelen grondig geïnspecteerd.'
} = {}) {
  const container =
    typeof containerId === 'string'
      ? document.getElementById(containerId)
      : containerId; // allow passing element directly
  if (!container) return;

  const defaultItems = [
    'Remmen & remsysteem',
    'Stuurinrichting',
    'Banden & wielophanging',
    'Uitlaatsysteem & milieu',
    'Carrosserie & chassis',
    'Verlichting & signalering',
    'Ruiten & ruitensproeiers',
    'Gordels & airbags'
  ];

  const list = Array.isArray(items) && items.length ? items : defaultItems;

  const itemsHtml = list.map(i => `    <div class="control-item">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M8 12.5C8 12.5 9.5 12.5 11.5 16C11.5 16 17.0588 6.83333 22 5" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h6 class="item-text">${i}</h6></div>`).join('\n');

  // build attributes for section element
  let extraClass = className ? ` ${className}` : '';
  if (noShadow) extraClass += ' no-shadows';

  container.innerHTML = `
<section class="controle-section${extraClass}">
  ${serviceTitle ? `<h5 class="section-badge">${serviceTitle}</h5>` : ''}
  <h2>${title}</h2>
  <p class="section-subtitle">${subtitle}</p>
  <div class="controle-grid" style="--cols: ${columns}">
${itemsHtml}
  </div>
</section>
  `;
}
