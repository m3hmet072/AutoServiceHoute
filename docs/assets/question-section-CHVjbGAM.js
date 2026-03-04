function a({svg:t,title:e,subtitle:n,questions:c=[]}={}){const s=document.getElementById("question-section");if(!s)return;const o=c.map(i=>`
      <article class="question-card">
        <div class="question-card-left">
          <div class="icon">${t}</div>
        </div>
        <div class="question-card-right">
          <h4 class="question-title">${i.title}</h4>
          <p class="question-text">${i.answer}</p>
        </div>
      </article>
    `).join("");s.innerHTML=`
    <section class="question-section">
      <div class="question-inner">
        <h3 class="section-subtitle">${n}</h3>
        <h2 class="section-title">${e}</h2>

        <div class="questions-list">
          ${o}
        </div>
      </div>
    </section>
  `}export{a as r};
