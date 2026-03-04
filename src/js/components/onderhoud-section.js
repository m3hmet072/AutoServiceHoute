import '../../css/sections/onderhoud-section.css';

export function renderOnderhoudsection({ title, subtitle, cards = [] } = {}) {
    const container = document.getElementById('onderhoud-section');
    if (!container) return;

    const cardsHTML = cards.map((card, index) => `
    <div class="onderhoud-card ${index === 1 ? 'onderhoud-card-featured' : ''}">
      <div class="stat-icon">
        ${card.svg || ''}
      </div>
      <h3>${card.title}</h3>
      <p class="price">${card.price}</p>
      ${card.subtitle ? `<p class="card-description">${card.subtitle}</p>` : ''}
      <div class="card-features">
        <div class="feature-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0082FB" stroke-width="1.5"/>
                <path d="M12 8V12L14 14" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          <p>${card.minutes}</p>
        </div>
        <div class="feature-box">
           <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1130_2670)">
<path d="M23.9974 8.78987H14.8344L12.004 0L9.16497 8.78987L0.00195312 8.7811L7.42266 14.2189L4.58331 23L12.004 17.571L19.4157 23L16.5854 14.2189L23.9974 8.78987Z" fill="#0082FB"/>
<path d="M17.2221 16.2068L16.5853 14.2188L12.0039 17.5708L17.2221 16.2068Z" fill="#004CA9"/>
</g>
<defs>
<clipPath id="clip0_1130_2670">
<rect width="24" height="23" fill="white"/>
</clipPath>
</defs>
</svg>

          <p>${card.reviews}</p>
        </div>
      </div>
      <a href="#contact" class="btn-afspraak">${card.buttontext}<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.5 12H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg></a>
    </div>
  `).join('');

    container.innerHTML = `
    <section class="onderhoud-section">
      <div class="onderhoud-header">
        ${subtitle ? `<h3 class="section-subtitle">${subtitle}</h3>` : ''}
        <h2 class="section-title">${title}</h2>
      </div>
      <div class="onderhoud-cards-container">
        ${cardsHTML}
      </div>
    </section>
  `;
}
