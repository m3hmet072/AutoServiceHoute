import"./base-Cs-ev0D8.js";/* empty css               */import"./api-CLM0aaL7.js";import{l as h,r as v,a as k,b as m,i as w,c as f}from"./footer-section-BwioXl2V.js";import{r as b}from"./pricing-section-KhKP1XOE.js";import{r as j}from"./question-section-CHVjbGAM.js";import{r as C}from"./stappen-section-lfHDkw6g.js";const $=[];let u=null;function B({containerId:s="product-section",products:e=[]}={}){const i=document.getElementById(s);if(!i)return;const t=e.length?e:$,o=new URL(window.location.href),l=o.searchParams.get("id")||o.searchParams.get("productId");if(l){const d=t.find(a=>String(a.id)===String(l));H(i,d);return}M(i,t)}function M(s,e){if(!e.length){s.innerHTML=`
      <section class="product-section">
        <div class="products-grid">
          <article class="product-card" style="grid-column: 1 / -1; text-align: center; cursor: default;">
            <div class="product-body" style="padding: 2rem 1.5rem;">
              <h3 class="product-title">Momenteel geen occasions beschikbaar</h3>
           
            </div>
          </article>
        </div>
      </section>
    `;return}const i=e.map(t=>{const o=t.image&&(t.image.startsWith("/")||t.image.startsWith("http"))?`<img src="${t.image}" alt="${t.brand}" loading="lazy">`:t.image||"🚗";return`
      <article class="product-card" data-id="${t.id}">
        <div class="product-header">
          <div class="product-image">${o}</div>
          ${t.badge?`<div class="product-badge">${t.badge}</div>`:""}
        </div>
        <div class="product-body">
          <h3 class="product-title">${t.brand}</h3>
          <div class="product-specs">
            <span class="spec"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3327 1.66602V4.99935M6.66602 1.66602V4.99935" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.8333 3.33398H9.16667C6.02397 3.33398 4.45262 3.33398 3.47631 4.31029C2.5 5.28661 2.5 6.85795 2.5 10.0007V11.6673C2.5 14.81 2.5 16.3814 3.47631 17.3577C4.45262 18.334 6.02397 18.334 9.16667 18.334H10.8333C13.976 18.334 15.5474 18.334 16.5237 17.3577C17.5 16.3814 17.5 14.81 17.5 11.6673V10.0007C17.5 6.85795 17.5 5.28661 16.5237 4.31029C15.5474 3.33398 13.976 3.33398 10.8333 3.33398Z" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.5 8.33398H17.5" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
${t.year}</span>
            <span class="spec"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.71883 10.834L7.55715 12.3443C7.43266 12.5062 7.52188 12.7391 7.72489 12.7822L8.94175 13.0404C9.15825 13.0863 9.24075 13.3442 9.08942 13.5016L7.64811 15.0007" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33398 8.33398H13.334" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33398 17.5V7.5C3.33398 5.14297 3.33398 3.96447 4.06622 3.23223C4.79845 2.5 5.97696 2.5 8.33398 2.5C10.691 2.5 11.8695 2.5 12.6017 3.23223C13.334 3.96447 13.334 5.14297 13.334 7.5V17.5H3.33398Z" stroke="#6F7A8B" stroke-width="1.5"/>
<path d="M1.66602 17.5H14.9993" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.334 11.6667H14.7229C14.9812 11.6667 15.1104 11.6667 15.2163 11.6951C15.5039 11.7721 15.7286 11.9968 15.8056 12.2843C15.834 12.3903 15.834 12.5194 15.834 12.7777V13.75C15.834 14.4403 16.3937 15 17.084 15C17.7743 15 18.334 14.4403 18.334 13.75V8.50925C18.334 8.00832 18.334 7.75784 18.2625 7.52165C18.191 7.28546 18.052 7.07706 17.7742 6.66025L17.1296 5.69337C16.8408 5.26019 16.3546 5 15.834 5" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
${t.km} km</span>
            <span class="spec"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 11.6673L13.3333 8.33398" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.78268 15.8324C2.0512 14.5656 1.66607 13.1285 1.66602 11.6657C1.66596 10.2028 2.05098 8.76576 2.78236 7.49888C3.51375 6.232 4.56574 5.17998 5.83259 4.44854C7.09944 3.7171 8.53651 3.33203 9.99935 3.33203C11.4622 3.33203 12.8993 3.7171 14.1661 4.44854C15.433 5.17998 16.4849 6.232 17.2163 7.49888C17.9477 8.76576 18.3327 10.2028 18.3327 11.6657C18.3326 13.1285 17.9475 14.5656 17.216 15.8324" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
${t.fuel}</span>
          </div>
          <div class="product-footer">
            <div class="product-price">${t.price}</div>
            <span class="btn-product">Bekijk details<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5 12H5" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
          </div>
        </div>
      </article>
    `}).join("");s.innerHTML=`
    <section class="product-section">
      <div class="products-grid">
        ${i}
      </div>
    </section>
  `,s.dataset.productListener||(s.addEventListener("click",t=>{const o=t.target.closest(".product-card");if(!o)return;const l=new URL(window.location.href);l.searchParams.set("id",o.dataset.id),window.location.href=l.toString()}),s.dataset.productListener="1")}function H(s,e){if(!e){s.innerHTML=`
      <section class="product-detail-page">
        <a class="back-link" href="${window.location.pathname}"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 12.002H19" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.9999 18.002C10.9999 18.002 5.00001 13.583 5 12.0019C4.99999 10.4208 11 6.00195 11 6.00195" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Terug naar occasions</a>
        <h2>Product niet gevonden</h2>
      </section>
    `;return}const i=Array.isArray(e.images)&&e.images.length?e.images:[e.image].filter(Boolean),o=[{label:"Kilometerstand",value:`${e.km} km`},{label:"Bouwjaar",value:String(e.year)},{label:"Brandstof",value:e.fuel},{label:"Prijs",value:e.price}].map(a=>`
    <div class="fact-item">
      <span class="fact-label">${a.label}</span>
      <strong class="fact-value">${a.value}</strong>
    </div>
  `).join(""),l=Object.entries(e.details||{}).map(([a,r])=>{const g=Object.entries(r||{}).map(([n,c])=>`
      <div class="details-row">
        <dt>${n}</dt>
        <dd>${c}</dd>
      </div>
    `).join("");return`
      <section class="details-card">
        <h3 class="details-section-title">${a}</h3>
        <dl class="details-list">${g}</dl>
      </section>
    `}).join(""),d=i.length?`
    <div class="product-carousel" data-index="0">
      <div class="carousel-counter"><span class="current">1</span> / <span class="total">${i.length}</span></div>
      <div class="carousel-images">
        ${i.map((a,r)=>`
          <img src="${a}" class="carousel-img${r===0?" active":""}" data-index="${r}" alt="${e.brand} ${r+1}">
        `).join("")}
      </div>
      <div class="carousel-controls">
        <button type="button" class="prev">&lt;</button>
        <button type="button" class="next">&gt;</button>
      </div>
      <div class="carousel-thumbs">
        ${i.map((a,r)=>`
          <img src="${a}" class="thumb${r===0?" active":""}" data-index="${r}" alt="Thumbnail ${r+1}">
        `).join("")}
      </div>
    </div>
  `:"";s.innerHTML=`
    <section class="product-detail-page">
      <a class="back-link" href="${window.location.pathname}"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 12.002H19" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.9999 18.002C10.9999 18.002 5.00001 13.583 5 12.0019C4.99999 10.4208 11 6.00195 11 6.00195" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Terug naar occasions</a>
      <div class="product-detail-top">
        <div class="product-detail-gallery">
          ${d}
        </div>
        <aside class="product-detail-summary">
          <div class="product-summary-head">
            <h1 class="product-detail-title">${e.brand}</h1>
            ${e.badge?`<span class="product-detail-badge">${e.badge}</span>`:""}
          </div>
          <p class="product-detail-price">${e.price}</p>
          <div class="quick-facts">${o}</div>
          ${e.description?`<p class="product-description">${e.description}</p>`:""}
        </aside>
      </div>
      <div class="product-detail-info">${l}</div>
    </section>
  `,u&&(clearInterval(u),u=null),i.length>1&&L(s)}function L(s){const e=s.querySelector(".product-carousel");if(!e)return;const i=e.querySelectorAll(".carousel-img"),t=e.querySelectorAll(".thumb"),o=e.querySelector(".prev"),l=e.querySelector(".next");let d=Number(e.dataset.index)||0;function a(n){n<0&&(n=i.length-1),n>=i.length&&(n=0),i.forEach(p=>p.classList.remove("active")),t.forEach(p=>p.classList.remove("active")),i[n].classList.add("active"),t[n].classList.add("active"),e.dataset.index=n,d=n;const c=e.querySelector(".carousel-counter");c&&(c.querySelector(".current").textContent=n+1)}function r(){a(d+1)}function g(){a(d-1)}l.onclick=r,o.onclick=g,t.forEach(n=>{n.onclick=c=>{const p=Number(c.target.dataset.index);a(p)}}),u&&clearInterval(u),u=setInterval(r,5e3)}window.addEventListener("DOMContentLoaded",()=>{const s=new URL(window.location.href),e=!!(s.searchParams.get("id")||s.searchParams.get("productId"));h(),e||v({omitImage:!0,titleHtml:`Betrouwbare<br><span class="accent">tweedehands auto's</span>`,badgeText:"Gecertificeerde occasions",subtitle:"Elke occasion is grondig gekeurd, inclusief garantie en APK. Rijdt u vandaag nog weg.",btnAfspraakText:"Advies krijgen",btnBelText:"Bellen",pageClass:"hero--center"}),B(),b(),k(),e||(C({serviceTitle:"HOE WERKT HET?",title:"In 4 stappen uw nieuwe auto",subtitle:"",steps:[{number:1,title:"Bekijken",subtitle:"Blader door ons aanbod of bel ons voor persoonlijk advies.."},{number:2,title:"Proefrijden",subtitle:"Maak een afspraak en ervaar de auto zelf op de weg."},{number:3,title:"Inruilen",subtitle:"Heeft u een auto? Wij doen u een eerlijk inruilvoorstel."},{number:4,title:"Rijden",subtitle:"Wij regelen alles: tenaamstelling, verzekering en aflevering."}]}),m(),w()),j({title:"Goed om te weten",subtitle:"VEELGESTELDE VRAGEN",svg:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 9V13.5" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 16.9922V17.0022" stroke="#0082FB" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,questions:[{title:"Kan ik mijn huidige auto inruilen?",answer:"Ja! Wij bieden een eerlijke inruilprijs op basis van actuele marktwaarden. Neem uw auto mee voor een vrijblijvende taxatie."},{title:"Bieden jullie financiering aan?",answer:"Ja, wij werken samen met meerdere financieringspartners. Wij helpen u graag met een passende oplossing, van lening tot private lease."},{title:"Hoelang is de garantie geldig?",answer:"Standaard leveren wij minimaal 6 maanden BOVAG-garantie. Uitbreiding tot 24 maanden is mogelijk tegen een meerprijs."},{title:"Kan ik een proefrit maken?",answer:"Absoluut! Maak een afspraak en u kunt de auto rustig uitproberen. Neem gerust iemand mee voor een second opinion."}]}),f()});
