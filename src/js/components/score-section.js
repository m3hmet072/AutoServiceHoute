import '../../css/sections/score-section.css';

export function renderScoreSection() {
  const scoreContainer = document.getElementById('score-section');
  if (!scoreContainer) return;

  scoreContainer.innerHTML = `
<section class="stats-section">
  <div class="stat-card">
    <div class="stat-icon">
      <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1108_1229)">
          <path d="M23.9984 8.78987H14.8354L12.005 0L9.16595 8.78987L0.00292969 8.7811L7.42364 14.2189L4.58429 23L12.005 17.571L19.4167 23L16.5864 14.2189L23.9984 8.78987Z" fill="#0082FB" />
          <path d="M17.2221 16.2068L16.5853 14.2188L12.0039 17.5708L17.2221 16.2068Z" fill="#004CA9" />
        </g>
        <defs>
          <clipPath id="clip0_1108_1229">
            <rect width="24" height="23" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
    <div class="stat-content">
      <p class="stat-value">5.0<span>/5</span></p>
      <p class="stat-label">Google score</p>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 11C13 8.79086 11.2091 7 9 7C6.79086 7 5 8.79086 5 11C5 13.2091 6.79086 15 9 15C11.2091 15 13 13.2091 13 11Z" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M11.0386 7.55773C11.0131 7.37547 11 7.18927 11 7C11 4.79086 12.7909 3 15 3C17.2091 3 19 4.79086 19 7C19 9.20914 17.2091 11 15 11C14.2554 11 13.5584 10.7966 12.9614 10.4423" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15 21C15 17.6863 12.3137 15 9 15C5.68629 15 3 17.6863 3 21" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M21 17C21 13.6863 18.3137 11 15 11" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div class="stat-content">
      <p class="stat-value">2.500+</p>
      <p class="stat-label">Tevreden klanten</p>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2V6M8 2V6" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M3 10H21" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M11 14H16M8 14H8.00898M13 18H8M16 18H15.991" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div class="stat-content">
      <p class="stat-value">23+</p>
      <p class="stat-label">Jaar ervaring</p>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M29.444 2.48963L30.0747 2.75519C28.9793 3.18672 28.0166 3.65145 27.1535 4.14938L26.2573 4.0166C27.0871 3.55187 28.249 2.98755 29.444 2.48963ZM31.6349 2.85477L25.8921 0C25.4606 0.06639 24.9959 0.13278 24.5975 0.19917L28.4813 1.89212C28.4149 1.95851 28.3485 1.95851 28.249 1.9917L24.0996 0.298755C23.3029 0.431535 22.5062 0.630705 21.8423 0.796681L25.5602 1.9917C25.3942 2.05809 25.3278 2.09129 25.1618 2.19087L21.1452 0.995851C19.9502 1.3278 18.722 1.72614 17.0954 2.39004L24.6971 3.71784C24.4979 3.81743 24.3651 3.91701 24.1328 4.0166L16.0664 2.82158C14.1411 3.65145 11.917 4.91286 10.1245 6.07469H18.0581C17.6929 6.30705 17.3942 6.50622 16.9627 6.80498L8.6639 7.07054C7.13693 8.16597 5.57676 9.46058 4.6805 10.2573C3.78423 11.0207 1.19502 13.6432 0 16L9.69295 13.4772C9.26141 14.1079 8.89627 14.805 8.6971 15.4025L19.2199 12.0498C19.1203 9.59336 21.5104 7.40249 23.1037 6.07469H24.4315C22.3734 7.83402 21.4108 9.79253 21.6763 11.2863L24.9627 10.2573C24.1992 8.19917 26.3568 4.58091 31.6349 2.85477Z" fill="#0082FB" />
      </svg>
    </div>
    <div class="stat-content">
      <p class="stat-value">RDW</p>
      <p class="stat-label">Erkend Bedrijf</p>
    </div>
  </div>
</section>
  `;
}
