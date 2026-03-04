import{c as x,t as B,s as M}from"./api-W8rwW8DE.js";function E(e){const n=e;return`
<nav class="navbar">
  <div class="navbar-container">
    <a href="${n}" class="logo-link">
      <div class="logo-text">
        <div class="logo-line1">Autoservice</div>
        <div class="logo-line2">Houte</div>
      </div>
    </a>

    <div class="hamburger" id="hamburger">
      <!-- svg omitted for brevity -->
    </div>

    <ul class="nav-menu" id="navMenu">
      <li><a href="${n}apk.html" class="nav-link">APK</a></li>
      <li><a href="${n}banden.html" class="nav-link">Banden</a></li>
      <li><a href="${n}onderhoud.html" class="nav-link">Onderhoud</a></li>
      <li><a href="${n}airco.html" class="nav-link">Airco</a></li>
      <li><a href="${n}occasions.html" class="nav-link">Occasions</a></li>
      <li><a href="#contact" class="btn btn-primary btn-nav">Afspraak Inplanen</a></li>
    </ul>

    <a href="#contact" class="btn btn-primary btn-nav">Afspraak Inplanen</a>
  </div>
</nav>`}function A(e){const n=e.querySelector("#hamburger"),t=e.querySelector("#navMenu");if(!n||!t)return;n.addEventListener("click",()=>{const s=n.classList.toggle("active");t.classList.toggle("active"),document.body.style.overflow=s?"hidden":""}),e.querySelectorAll(".nav-link").forEach(s=>{s.addEventListener("click",()=>{n.classList.remove("active"),t.classList.remove("active"),document.body.style.overflow=""})}),document.addEventListener("click",s=>{t.classList.contains("active")&&!t.contains(s.target)&&!n.contains(s.target)&&(n.classList.remove("active"),t.classList.remove("active"),document.body.style.overflow="")});let i;window.addEventListener("resize",()=>{clearTimeout(i),i=setTimeout(()=>{window.innerWidth>900&&t.classList.contains("active")&&(n.classList.remove("active"),t.classList.remove("active"),document.body.style.overflow="")},250)})}function V(){document.body.insertAdjacentHTML("afterbegin",E("/")),A(document.body)}let v=null;function m(e,n="success"){const t=document.querySelector(".custom-toast");t&&t.remove();const i=document.createElement("div");i.className=`custom-toast toast-${n}`;const s={success:`<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>`,error:`<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
    </svg>`,warning:`<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
    </svg>`};i.innerHTML=`
    ${s[n]}
    <span class="toast-message">${e}</span>
    <button class="toast-close" aria-label="Close">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>
    </button>
  `,document.body.appendChild(i),setTimeout(()=>i.classList.add("show"),10),i.querySelector(".toast-close").addEventListener("click",()=>{i.classList.remove("show"),setTimeout(()=>i.remove(),300)}),setTimeout(()=>{i.parentElement&&(i.classList.remove("show"),setTimeout(()=>i.remove(),300))},5e3)}const I="xKnL-OvHIJbJ6pn8s",P="service_38razxb",j="template_aplhulr";function S(e){return e.replace(/[-\s]/g,"").toUpperCase()}function _(e){return!e||e.length!==8?"Onbekend":`${e.substring(6,8)}-${e.substring(4,6)}-${e.substring(0,4)}`}function $(e){return!e||!e.datum_eerste_toelating||e.datum_eerste_toelating.length<4?"Onbekend":e.datum_eerste_toelating.substring(0,4)}function f(e){const n=e.querySelector('select[name="onderwerp"][multiple]');return n?Array.from(n.selectedOptions).map(i=>i.value.toString().trim()).filter(Boolean):new FormData(e).getAll("onderwerp").map(i=>i.toString().trim()).filter(Boolean)}function F(e){let n=e.value.replace(/[^a-zA-Z0-9]/g,"").toUpperCase();n.length>6?/^[A-Z]{2}[0-9]{2}/.test(n)||/^[0-9]{2}[A-Z]{2}/.test(n)?n=n.substring(0,2)+"-"+n.substring(2,4)+"-"+n.substring(4,6):/^[A-Z]{2}[0-9]{3}/.test(n)?n=n.substring(0,2)+"-"+n.substring(2,5)+"-"+n.substring(5,6):n=n.substring(0,2)+"-"+n.substring(2,5)+"-"+n.substring(5,7):n.length>2&&(n=n.substring(0,2)+"-"+n.substring(2)),e.value=n.substring(0,9)}async function b(e){const n=S(e),t=document.getElementById("kenteken-status"),i=document.getElementById("vehicle-info");if(n.length<4)return t.textContent="",t.className="kenteken-status",i.style.display="none",!1;try{t.innerHTML='<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 112 0v4a1 1 0 11-2 0V7zm1 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/></svg> Kenteken controleren...',t.className="kenteken-status checking";const s=await fetch(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${n}`,{headers:{Accept:"application/json"}});if(!s.ok)throw new Error("API request failed");const o=await s.json();if(o&&o.length>0){v=o[0],t.innerHTML='<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg> Kenteken gevonden',t.className="kenteken-status valid";const d=v.merk||"Onbekend merk",r=v.handelsbenaming||"Onbekend model",h=`${d} ${r}`.trim(),c=$(v),g=_(v.vervaldatum_apk),a=v.eerste_kleur||"Onbekend",l=v.brandstof_omschrijving||"Onbekend";return document.getElementById("vehicle-title").textContent=h,document.getElementById("vehicle-bouwjaar").textContent=c,document.getElementById("vehicle-apk").textContent=g,document.getElementById("vehicle-kleur").textContent=a,document.getElementById("vehicle-brandstof").textContent=l,i.style.display="block",!0}else return t.innerHTML='<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg> Kenteken niet gevonden',t.className="kenteken-status invalid",i.style.display="none",v=null,!1}catch(s){return console.error("Error validating kenteken:",s),t.innerHTML='<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg> Controleer uw kenteken',t.className="kenteken-status error",i.style.display="none",!1}}function T(e,n){let t;return function(...s){const o=()=>{clearTimeout(t),e(...s)};clearTimeout(t),t=setTimeout(o,n)}}async function H(e){if(typeof emailjs>"u")throw new Error("EmailJS library not loaded");const n={name:e.naam||"Niet opgegeven",subject:e.onderwerp,email:e.email||"Niet opgegeven",phone:e.telefoon,license:e.kenteken,message:e.bericht};try{return{success:!0,response:await emailjs.send(P,j,n,I)}}catch(t){throw console.error("EmailJS Error:",t),t}}async function O(e){const n={id:Date.now().toString(),name:e.naam||"Niet opgegeven",email:e.email||"Niet opgegeven",phone:e.telefoon,kenteken:e.kenteken,subject:e.onderwerp,message:e.bericht,vehicleInfo:v||null,source:"website-form",read:!1},t=await x(n);console.log("Form data saved to database via API:",t)}function Z(){const e=document.getElementById("contact-form"),n=document.getElementById("kenteken"),t=document.getElementById("submit-btn"),i=document.getElementById("onderwerp-status"),s=document.getElementById("onderwerp-preview"),o=document.getElementById("onderwerp-toggle"),d=document.getElementById("onderwerp-panel"),r=document.getElementById("onderwerp-dropdown");if(!e||!n)return;const h=e.querySelectorAll('input[name="onderwerp"]'),c=()=>{if(!s)return;const a=f(e);s.textContent=a.length>0?`Gekozen: ${a.join(", ")}`:"Nog geen onderwerp gekozen."},g=T(async a=>{await b(a)},300);if(n.addEventListener("input",a=>{if(F(a.target),S(a.target.value).length>=1)g(a.target.value);else{const u=document.getElementById("kenteken-status"),p=document.getElementById("vehicle-info");u&&(u.textContent="",u.className="kenteken-status"),p&&(p.style.display="none")}}),h.forEach(a=>{a.addEventListener("change",()=>{if(!i){c();return}const l=f(e);i.textContent=l.length>0?"":"Selecteer minimaal één onderwerp.",c()})}),o&&d&&r){const a=()=>{d.hidden=!1,o.setAttribute("aria-expanded","true")},l=()=>{d.hidden=!0,o.setAttribute("aria-expanded","false")};o.addEventListener("click",()=>{o.getAttribute("aria-expanded")==="true"?l():a()}),document.addEventListener("click",u=>{r.contains(u.target)||l()}),l()}c(),e.addEventListener("submit",async a=>{a.preventDefault();const l=new FormData(e),u=f(e),p={...Object.fromEntries(l.entries()),naam:"Niet opgegeven",email:l.get("email")||"Niet opgegeven",onderwerp:u.join(", ")};if(!p.kenteken||!p.kenteken.trim()){m("Vul een kenteken in.","warning");return}if(u.length===0){i&&(i.textContent="Selecteer minimaal één onderwerp."),m("Kies minimaal één onderwerp.","warning");return}if(i&&(i.textContent=""),!await b(p.kenteken)){m("Het ingevoerde kenteken is niet gevonden in de RDW database. Controleer het kenteken en probeer opnieuw.","error");return}t&&(t.disabled=!0,t.textContent="Verzenden...");try{if((await H(p)).success)await O(p),m("Uw bericht is succesvol verzonden! We nemen zo spoedig mogelijk contact met u op.","success"),e.reset(),v=null,document.getElementById("kenteken-status").textContent="",document.getElementById("vehicle-info").style.display="none",i&&(i.textContent=""),c();else throw new Error("Failed to send email")}catch(k){console.error("Error sending email:",k),m("Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het later opnieuw of neem telefonisch contact met ons op.","error")}finally{t&&(t.disabled=!1,t.textContent="Bevestig afspraak")}})}function z(){const e=navigator.userAgent;let n="Desktop",t="Unknown",i="Unknown",s="Unknown";if(e.includes("Windows NT 10.0"))s="Windows 10";else if(e.includes("Windows NT 6.3"))s="Windows 8.1";else if(e.includes("Windows NT 6.2"))s="Windows 8";else if(e.includes("Windows NT 6.1"))s="Windows 7";else if(e.includes("Mac OS X")){const o=e.match(/Mac OS X ([\d_]+)/);s=o?`macOS ${o[1].replace(/_/g,".")}`:"macOS"}else if(e.includes("Android")){const o=e.match(/Android ([\d.]+)/);s=o?`Android ${o[1]}`:"Android"}else if(e.includes("iOS")||e.includes("iPhone")||e.includes("iPad")){const o=e.match(/OS ([\d_]+)/);s=o?`iOS ${o[1].replace(/_/g,".")}`:"iOS"}else e.includes("Linux")&&(s="Linux");return e.includes("Chrome")&&!e.includes("Edg")?i="Chrome":e.includes("Safari")&&!e.includes("Chrome")?i="Safari":e.includes("Firefox")?i="Firefox":e.includes("Edg")?i="Edge":(e.includes("Opera")||e.includes("OPR"))&&(i="Opera"),e.includes("iPhone")?(n="Mobile",e.includes("iPhone15")?t="iPhone 15":e.includes("iPhone14")?t="iPhone 14":e.includes("iPhone13")?t="iPhone 13":e.includes("iPhone12")?t="iPhone 12":e.includes("iPhone11")?t="iPhone 11":e.includes("iPhone X")?t="iPhone X":t="iPhone"):e.includes("iPad")?(n="Tablet",t="iPad",e.includes("iPad Pro")?t="iPad Pro":e.includes("iPad Air")?t="iPad Air":e.includes("iPad Mini")&&(t="iPad Mini")):e.includes("Android")?(n=e.includes("Mobile")?"Mobile":"Tablet",e.includes("SM-S926")?t="Samsung Galaxy S24+":e.includes("SM-S921")?t="Samsung Galaxy S24":e.includes("SM-S928")?t="Samsung Galaxy S24 Ultra":e.includes("SM-S911")?t="Samsung Galaxy S23":e.includes("SM-S918")?t="Samsung Galaxy S23 Ultra":e.includes("SM-S901")?t="Samsung Galaxy S22":e.includes("SM-S908")?t="Samsung Galaxy S22 Ultra":e.includes("SM-G991")?t="Samsung Galaxy S21":e.includes("SM-G998")?t="Samsung Galaxy S21 Ultra":e.includes("SM-A")?t="Samsung Galaxy A Series":e.includes("Pixel 8")?t="Google Pixel 8":e.includes("Pixel 7")?t="Google Pixel 7":e.includes("Pixel 6")?t="Google Pixel 6":e.includes("Pixel")?t="Google Pixel":e.includes("OnePlus")?t="OnePlus":e.includes("Xiaomi")?t="Xiaomi":e.includes("Huawei")?t="Huawei":t="Android Device"):(n="Desktop",e.includes("Windows")?t="Windows PC":e.includes("Mac")?t="Mac":e.includes("Linux")?t="Linux PC":t="Desktop Computer"),{deviceType:n,deviceName:t,browser:i,os:s,screenResolution:`${window.screen.width}x${window.screen.height}`,viewport:`${window.innerWidth}x${window.innerHeight}`}}const N=1800*1e3,G=3e4;function K(){let e=localStorage.getItem("visitorId");return e||(e=`visitor_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,localStorage.setItem("visitorId",e)),e}function C(){const e=localStorage.getItem("lastActivity");return e?Date.now()-parseInt(e)>N:!0}function w(){localStorage.setItem("lastActivity",Date.now().toString())}function L(){if(C()){const n=`session_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;return localStorage.setItem("currentSessionId",n),localStorage.setItem("sessionStartTime",Date.now().toString()),w(),n}let e=localStorage.getItem("currentSessionId");return e||(e=`session_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,localStorage.setItem("currentSessionId",e),localStorage.setItem("sessionStartTime",Date.now().toString())),w(),e}async function y(){try{const e=z(),n=K(),t=C(),i=L();(await B({...e,visitorId:n,sessionId:i,isNewSession:t})).success&&console.log("Visitor tracking initialized:",{visitorId:n,sessionId:i,isNewSession:t});const o=setInterval(()=>{const r=L();M(n,r).catch(console.error)},G),d=()=>w();["mousedown","keydown","scroll","touchstart"].forEach(r=>{document.addEventListener(r,d,{passive:!0})}),window.addEventListener("beforeunload",()=>{clearInterval(o)})}catch(e){console.error("Failed to initialize visitor tracking:",e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",y):y();function U({omitImage:e=!1,accent:n="Gewoon goed geregeld.",accentHtml:t,titleHtml:i,subtitle:s="Betrouwbare reparatie en onderhoud in Heemskerk - snel, vakkundig en eerlijk geprijsd.",badgeText:o="RDW erkend garagebedrijf",btnAfspraakText:d="Afspraak maken",btnBelText:r="Bekijk diensten",pageClass:h=""}={}){const c=document.getElementById("hero-section");if(!c)return;const g=t||`<span class="accent">${n}</span>`;c.innerHTML=`
<div class="hero-section ${e?"hero-no-image":""} ${h}">
  <div class="hero-left">
    <div class="badge"> 
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.1678 8.33357C18.5484 10.2013 18.2772 12.1431 17.3994 13.8351C16.5216 15.527 15.0902 16.8669 13.3441 17.6313C11.5979 18.3957 9.64252 18.5384 7.80391 18.0355C5.9653 17.5327 4.35465 16.4147 3.24056 14.8681C2.12646 13.3214 1.57626 11.4396 1.68171 9.53639C1.78717 7.63318 2.54189 5.82364 3.82004 4.40954C5.09818 2.99545 6.82248 2.06226 8.70538 1.76561C10.5883 1.46897 12.516 1.82679 14.167 2.7794"
          stroke="#0082FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M7.5 9.16634L10 11.6663L18.3333 3.33301" stroke="#0082FB" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      ${o}
    </div>
    <h2>${i||`APK, onderhoud en reparatie. ${g}`}</h2>
    <p class="section-subtitle">${s}</p>

    <div class="hero-buttons">
      <a href="#contact" class="btn-afspraak">${d}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5 12H5" stroke="#F5F8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="#F5F8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
      <a href="tel:+31611023141" class="btn-bel">${r}</a>
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

  ${e?"":`  <div class="hero-right">
    <div class="hero-illustration" aria-hidden="true">
      <img src="/images/dashboard image hero.png" alt="Monteur bij auto" class="hero-illustration-img">
    </div>
  </div>`}
</div>
  `}function q({containerId:e="controle-section",columns:n=4,items:t=null,className:i="",noShadow:s=!1,serviceTitle:o="",title:d="Wat controleren wij?",subtitle:r="Tijdens de APK worden alle wettelijk verplichte onderdelen grondig geïnspecteerd."}={}){const h=typeof e=="string"?document.getElementById(e):e;if(!h)return;const c=["Remmen & remsysteem","Stuurinrichting","Banden & wielophanging","Uitlaatsysteem & milieu","Carrosserie & chassis","Verlichting & signalering","Ruiten & ruitensproeiers","Gordels & airbags"],a=(Array.isArray(t)&&t.length?t:c).map(u=>`    <div class="control-item">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M8 12.5C8 12.5 9.5 12.5 11.5 16C11.5 16 17.0588 6.83333 22 5" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h6 class="item-text">${u}</h6></div>`).join(`
`);let l=i?` ${i}`:"";s&&(l+=" no-shadows"),h.innerHTML=`
<section class="controle-section${l}">
  ${o?`<h5 class="section-badge">${o}</h5>`:""}
  <h2>${d}</h2>
  <p class="section-subtitle">${r}</p>
  <div class="controle-grid" style="--cols: ${n}">
${a}
  </div>
</section>
  `}function R(){const e=document.getElementById("afspraak-section");e&&(e.innerHTML=`
<section class="appointment" id="contact">
  <div class="appointment-grid">
    <div class="appointment-left">
      <div class="badge">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2V6M8 2V6" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 10H21" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Afspraak maken
      </div>
      <h2>Plan uw bezoek eenvoudig online</h2>
      <h3 class="section-subtitle">Kies een moment dat u uitkomt. Wij zorgen dat uw auto op tijd klaar staat.</h3>
      <ul class="checklist">
        <div class="list-appointment">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8006 9.9995C22.2573 12.2408 21.9318 14.5709 20.8785 16.6013C19.8251 18.6317 18.1075 20.2396 16.0121 21.1568C13.9167 22.0741 11.5702 22.2453 9.36391 21.6419C7.15758 21.0385 5.2248 19.6969 3.88789 17.8409C2.55097 15.9849 1.89073 13.7267 2.01728 11.4429C2.14382 9.15904 3.04949 6.98759 4.58326 5.29067C6.11703 3.59375 8.18619 2.47393 10.4457 2.11795C12.7052 1.76198 15.0184 2.19136 16.9996 3.3345" stroke="#0082FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 11L12 14L22 4" stroke="#0082FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h3>Geen lange wachttijden</h3>
        </div>
        <div class="list-appointment">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8006 9.9995C22.2573 12.2408 21.9318 14.5709 20.8785 16.6013C19.8251 18.6317 18.1075 20.2396 16.0121 21.1568C13.9167 22.0741 11.5702 22.2453 9.36391 21.6419C7.15758 21.0385 5.2248 19.6969 3.88789 17.8409C2.55097 15.9849 1.89073 13.7267 2.01728 11.4429C2.14382 9.15904 3.04949 6.98759 4.58326 5.29067C6.11703 3.59375 8.18619 2.47393 10.4457 2.11795C12.7052 1.76198 15.0184 2.19136 16.9996 3.3345" stroke="#0082FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 11L12 14L22 4" stroke="#0082FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h3>Snelle service</h3>
        </div>
        <div class="list-appointment">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8006 9.9995C22.2573 12.2408 21.9318 14.5709 20.8785 16.6013C19.8251 18.6317 18.1075 20.2396 16.0121 21.1568C13.9167 22.0741 11.5702 22.2453 9.36391 21.6419C7.15758 21.0385 5.2248 19.6969 3.88789 17.8409C2.55097 15.9849 1.89073 13.7267 2.01728 11.4429C2.14382 9.15904 3.04949 6.98759 4.58326 5.29067C6.11703 3.59375 8.18619 2.47393 10.4457 2.11795C12.7052 1.76198 15.0184 2.19136 16.9996 3.3345" stroke="#0082FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 11L12 14L22 4" stroke="#0082FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h3>Gratis diagnose bij reparatie</h3>
        </div>
      </ul>
    </div>
    <div class="appointment-right">
      <form id="contact-form">
        <div class="form-group">
          <input type="text" id="kenteken" name="kenteken" placeholder="Uw kenteken" required>
          <small id="kenteken-status" class="kenteken-status" aria-live="polite"></small>
          <div id="vehicle-info" class="vehicle-info" style="display:none;" aria-live="polite">
            <h4 class="vehicle-title"><span id="vehicle-title">-</span></h4>
            <div class="vehicle-details-grid">
              <div class="vehicle-detail-column">
                <div class="vehicle-detail-item">
                  <span class="vehicle-detail-label">Bouwjaar</span>
                  <span class="vehicle-detail-value" id="vehicle-bouwjaar">-</span>
                </div>
                <div class="vehicle-detail-item">
                  <span class="vehicle-detail-label">Kleur</span>
                  <span class="vehicle-detail-value" id="vehicle-kleur">-</span>
                </div>
              </div>
              <div class="vehicle-detail-column">
                <div class="vehicle-detail-item">
                  <span class="vehicle-detail-label">Je APK verloopt op</span>
                  <span class="vehicle-detail-value" id="vehicle-apk">-</span>
                </div>
                <div class="vehicle-detail-item">
                  <span class="vehicle-detail-label">Brandstof</span>
                  <span class="vehicle-detail-value" id="vehicle-brandstof">-</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="onderwerp-dropdown" id="onderwerp-dropdown">
            <button type="button" id="onderwerp-toggle" class="onderwerp-toggle" aria-expanded="false" aria-controls="onderwerp-panel">
              Kies één of meer onderwerpen
            </button>
            <div id="onderwerp-panel" class="onderwerp-panel" hidden>
              <div class="subject-options-grid">
                <label class="subject-option"><input type="checkbox" name="onderwerp" value="APK"><span>APK</span></label>
                <label class="subject-option"><input type="checkbox" name="onderwerp" value="Grote beurt"><span>Grote beurt</span></label>
                <label class="subject-option"><input type="checkbox" name="onderwerp" value="Banden service"><span>Banden service</span></label>
                <label class="subject-option"><input type="checkbox" name="onderwerp" value="Airco specialist"><span>Airco specialist</span></label>
                <label class="subject-option"><input type="checkbox" name="onderwerp" value="Overig"><span>Overig</span></label>
              </div>
            </div>
          </div>
          <small id="onderwerp-preview" class="onderwerp-preview">Nog geen onderwerp gekozen.</small>
          <small id="onderwerp-status" class="onderwerp-status" aria-live="polite"></small>
        </div>

        <div class="form-group"><input type="tel" id="telefoon" name="telefoon" placeholder="Telefoonnummer" required></div>
        <div class="form-group"><textarea id="bericht" name="bericht" rows="3" placeholder="Type uw bericht hier..."></textarea></div>
        <button type="submit" id="submit-btn" class="btn-afspraak">Bevestig afspraak <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5 12H5" stroke="#F5F8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="#F5F8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  </div>
</section>
  `)}function J(){const e=document.getElementById("footer-section");e&&(e.innerHTML=`
<footer>
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-logo-section">
        <a href="index.html" class="footer-logo">
          <div class="logo-text">
            <div class="logo-line1">Autoservice</div>
            <div class="logo-line2">houte</div>
          </div>
        </a>
      </div>

      <!-- Quick Links -->
      <div class="footer-nav">
        <h4>Snelle Links</h4>
        <a href="#">Homepage</a>
        <a href="apk.html">APK Keuring</a>
        <a href="airco.html">Airconditioning</a>
        <a href="banden.html">Banden Service</a>
        <a href="occasions.html">Occasions</a>
        <a href="#about">Over ons</a>
        <a href="#contact">Contact</a>
      </div>

      <!-- Contact Info -->
      <div class="footer-nav">
        <h4>Contact</h4>
        <a href="mailto:Autoservicehoute@gmail.com">Autoservicehoute@gmail.com</a>
        <a href="tel:+31611023141">+31 6 11023141</a>
        <a href="#">Ambachtsring 9-K<br>1969 NH Heemskerk</a>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <p>&copy; 2024 AutoService Houte. Alle rechten voorbehouden.</p>
    <div class="footer-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Gebruiksvoorwaarden</a>
      <a href="#">Cookie Beleid</a>
    </div>
  </div>
</footer>
  `)}export{q as a,R as b,J as c,Z as i,V as l,U as r};
