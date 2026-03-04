import '../../css/sections/stappen-section.css';

export function renderStappenSection({
  serviceTitle = '',
  title = '',
  subtitle = '',
  steps = null
} = {}) {
  const container = document.getElementById('stappen-section');
  if (!container) return;

  // default steps if none provided
  const defaultSteps = [
    {
      number: 1,
      title: 'Afspraak maken',
      subtitle: 'Plan online of bel ons voor een APK-keuring op een moment dat u uitkomt.'
    },
    {
      number: 2,
      title: 'Auto brengen',
      subtitle: 'Breng uw auto langs onze werkplaats. Wachten kan, of wij brengen u thuis.'
    },
    {
      number: 3,
      title: 'Keuring uitvoeren',
      subtitle: 'Onze RDW‑erkende keurmeesters voeren een grondige inspectie uit.'
    },
    {
      number: 4,
      title: 'Resultaat & ophalen',
      subtitle: 'U ontvangt direct het resultaat. Goedgekeurd? Dan kunt u meteen rijden.'
    }
  ];

  const list = Array.isArray(steps) && steps.length ? steps : defaultSteps;

  const stepsHtml = list
    .map(s => `    <div class="stap-card">
      <div class="stap-number">${s.number}</div>
      <div class="stap-content">
        <h3>${s.title}</h3>
        <p>${s.subtitle}</p>
      </div>
    </div>`)
    .join('\n');

  container.innerHTML = `
<section class="stappen-section">
  <h5 class="section-badge">${serviceTitle}</h5>
  <h2>${title}</h2>
  <p class="section-subtitle">${subtitle}</p>
  <div class="stappen-grid">
${stepsHtml}
  </div>
</section>
  `;
}
