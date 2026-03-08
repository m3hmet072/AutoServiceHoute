import"./footer-section-BwioXl2V.js";function c({serviceTitle:i="",title:s="",subtitle:a="",steps:e=null}={}){const n=document.getElementById("stappen-section");if(!n)return;const r=[{number:1,title:"Afspraak maken",subtitle:"Plan online of bel ons voor een APK-keuring op een moment dat u uitkomt."},{number:2,title:"Auto brengen",subtitle:"Breng uw auto langs onze werkplaats. Wachten kan, of wij brengen u thuis."},{number:3,title:"Keuring uitvoeren",subtitle:"Onze RDW‑erkende keurmeesters voeren een grondige inspectie uit."},{number:4,title:"Resultaat & ophalen",subtitle:"U ontvangt direct het resultaat. Goedgekeurd? Dan kunt u meteen rijden."}],o=(Array.isArray(e)&&e.length?e:r).map(t=>`    <div class="stap-card">
      <div class="stap-number">${t.number}</div>
      <div class="stap-content">
        <h3>${t.title}</h3>
        <p>${t.subtitle}</p>
      </div>
    </div>`).join(`
`);n.innerHTML=`
<section class="stappen-section">
  <h5 class="section-badge">${i}</h5>
  <h2>${s}</h2>
  <p class="section-subtitle">${a}</p>
  <div class="stappen-grid">
${o}
  </div>
</section>
  `}export{c as r};
