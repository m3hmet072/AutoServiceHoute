import '../../css/sections/hero-section.css';

export function renderHeroSection({
    omitImage = false,
    accent = 'Gewoon goed geregeld.',
    accentHtml,
    titleHtml,
    subtitle = 'Betrouwbare reparatie en onderhoud in Heemskerk - snel, vakkundig en eerlijk geprijsd.',
    badgeText = 'RDW erkend garagebedrijf',
    btnAfspraakText = 'Afspraak maken',
    btnBelText = 'Bekijk diensten',
    pageClass = ''
} = {}) {
    const heroContainer = document.getElementById('hero-section');
    if (!heroContainer) return;

    // allow callers to supply full HTML if they need more control over the
    // colouring/structure of the accent text (used on the APK page).
    const accentSpan = accentHtml
        ? accentHtml
        : `<span class="accent">${accent}</span>`;

    heroContainer.innerHTML = `
<div class="hero-section ${omitImage ? 'hero-no-image' : ''} ${pageClass}">
  <div class="hero-left">
    <div class="badge"> 
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.1678 8.33357C18.5484 10.2013 18.2772 12.1431 17.3994 13.8351C16.5216 15.527 15.0902 16.8669 13.3441 17.6313C11.5979 18.3957 9.64252 18.5384 7.80391 18.0355C5.9653 17.5327 4.35465 16.4147 3.24056 14.8681C2.12646 13.3214 1.57626 11.4396 1.68171 9.53639C1.78717 7.63318 2.54189 5.82364 3.82004 4.40954C5.09818 2.99545 6.82248 2.06226 8.70538 1.76561C10.5883 1.46897 12.516 1.82679 14.167 2.7794"
          stroke="#0082FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M7.5 9.16634L10 11.6663L18.3333 3.33301" stroke="#0082FB" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      ${badgeText}
    </div>
    <h2>${titleHtml ? titleHtml : `APK, onderhoud en reparatie. ${accentSpan}`}</h2>
    <p class="section-subtitle">${subtitle}</p>

    <div class="hero-buttons">
      <a href="#contact" class="btn-afspraak">${btnAfspraakText}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5 12H5" stroke="#F5F8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="#F5F8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
      <a href="tel:+31611023141" class="btn-bel">${btnBelText}</a>
    </div>

    <div class="reviews">
      <div class="svg">
        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1108_1208)">
            <path d="M23.9984 8.78987H14.8354L12.005 0L9.16595 8.78987L0.00292969 8.7811L7.42364 14.2189L4.58429 23L12.005 17.571L19.4167 23L16.5864 14.2189L23.9984 8.78987Z" fill="#0082FB" />
            <path d="M17.2221 16.2068L16.5853 14.2188L12.0039 17.5708L17.2221 16.2068Z" fill="#004CA9" />
          </g>
          <defs>
            <clipPath id="clip0_1108_1208">
              <rect width="24" height="23" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1108_1208)">
            <path d="M23.9984 8.78987H14.8354L12.005 0L9.16595 8.78987L0.00292969 8.7811L7.42364 14.2189L4.58429 23L12.005 17.571L19.4167 23L16.5864 14.2189L23.9984 8.78987Z" fill="#0082FB" />
            <path d="M17.2221 16.2068L16.5853 14.2188L12.0039 17.5708L17.2221 16.2068Z" fill="#004CA9" />
          </g>
          <defs>
            <clipPath id="clip0_1108_1208">
              <rect width="24" height="23" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1108_1208)">
            <path d="M23.9984 8.78987H14.8354L12.005 0L9.16595 8.78987L0.00292969 8.7811L7.42364 14.2189L4.58429 23L12.005 17.571L19.4167 23L16.5864 14.2189L23.9984 8.78987Z" fill="#0082FB" />
            <path d="M17.2221 16.2068L16.5853 14.2188L12.0039 17.5708L17.2221 16.2068Z" fill="#004CA9" />
          </g>
          <defs>
            <clipPath id="clip0_1108_1208">
              <rect width="24" height="23" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1108_1208)">
            <path d="M23.9984 8.78987H14.8354L12.005 0L9.16595 8.78987L0.00292969 8.7811L7.42364 14.2189L4.58429 23L12.005 17.571L19.4167 23L16.5864 14.2189L23.9984 8.78987Z" fill="#0082FB" />
            <path d="M17.2221 16.2068L16.5853 14.2188L12.0039 17.5708L17.2221 16.2068Z" fill="#004CA9" />
          </g>
          <defs>
            <clipPath id="clip0_1108_1208">
              <rect width="24" height="23" fill="white" />
            </clipPath>
          </defs>
        </svg>
             <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1108_1208)">
            <path d="M23.9984 8.78987H14.8354L12.005 0L9.16595 8.78987L0.00292969 8.7811L7.42364 14.2189L4.58429 23L12.005 17.571L19.4167 23L16.5864 14.2189L23.9984 8.78987Z" fill="#0082FB" />
            <path d="M17.2221 16.2068L16.5853 14.2188L12.0039 17.5708L17.2221 16.2068Z" fill="#004CA9" />
          </g>
          <defs>
            <clipPath id="clip0_1108_1208">
              <rect width="24" height="23" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <p>5/5 — 2.500+ tevreden klanten</p>
    </div>
  </div>

  ${omitImage ? '' : `  <div class="hero-right">
    <div class="hero-illustration" aria-hidden="true">
      <img src="/images/dashboard image hero.png" alt="Monteur bij auto" class="hero-illustration-img">
    </div>
  </div>`}
</div>
  `;
}
