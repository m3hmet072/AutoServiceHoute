import"./components-QB7fqpKC.js";class D{constructor(){this.currentView="month",this.currentDate=new Date,this.appointments=this.loadData("appointments")||[],this.emails=this.loadData("emails")||[],this.init()}formatDateString(a){const t=a.getFullYear(),e=String(a.getMonth()+1).padStart(2,"0"),s=String(a.getDate()).padStart(2,"0");return`${t}-${e}-${s}`}init(){this.setupNavigation(),this.setupCalendar(),this.setupAppointments(),this.setupEmails(),this.setupSettings(),this.setupModal(),this.updateStats(),this.renderDashboard(),this.renderCalendar()}loadData(a){const t=localStorage.getItem(`ash_${a}`);return t?JSON.parse(t):null}saveData(a,t){localStorage.setItem(`ash_${a}`,JSON.stringify(t))}setupNavigation(){const a=document.querySelectorAll(".nav-item"),t=document.querySelectorAll(".content-section");a.forEach(i=>{i.addEventListener("click",o=>{o.preventDefault();const n=i.dataset.section;a.forEach(l=>l.classList.remove("active")),t.forEach(l=>l.classList.remove("active")),i.classList.add("active"),document.getElementById(`section-${n}`).classList.add("active"),n==="calendar"?this.renderCalendar():n==="appointments"?this.renderAppointments():n==="emails"&&this.renderEmails()})});const e=document.getElementById("mobile-toggle"),s=document.getElementById("sidebar");e&&s&&(e.addEventListener("click",()=>{s.classList.toggle("active")}),document.addEventListener("click",i=>{window.innerWidth<=1024&&!s.contains(i.target)&&!e.contains(i.target)&&s.classList.remove("active")}))}setupCalendar(){const a=document.querySelectorAll(".view-btn"),t=document.getElementById("prev-period"),e=document.getElementById("next-period"),s=document.getElementById("today-btn");a.forEach(i=>{i.addEventListener("click",()=>{a.forEach(o=>o.classList.remove("active")),i.classList.add("active"),this.currentView=i.dataset.view,this.renderCalendar()})}),t.addEventListener("click",()=>{this.currentView==="month"?this.currentDate.setMonth(this.currentDate.getMonth()-1):this.currentDate.setDate(this.currentDate.getDate()-7),this.renderCalendar()}),e.addEventListener("click",()=>{this.currentView==="month"?this.currentDate.setMonth(this.currentDate.getMonth()+1):this.currentDate.setDate(this.currentDate.getDate()+7),this.renderCalendar()}),s.addEventListener("click",()=>{this.currentDate=new Date,this.renderCalendar()})}renderCalendar(){const a=document.getElementById("calendar-view"),t=document.getElementById("current-period");if(this.currentView==="month")this.renderMonthView(a),t.textContent=this.currentDate.toLocaleDateString("nl-NL",{month:"long",year:"numeric"});else{this.renderWeekView(a);const e=this.getWeekStart(this.currentDate),s=new Date(e);s.setDate(s.getDate()+6),t.textContent=`${e.getDate()} - ${s.getDate()} ${e.toLocaleDateString("nl-NL",{month:"long",year:"numeric"})}`}}renderMonthView(a){const t=this.currentDate.getFullYear(),e=this.currentDate.getMonth(),s=new Date(t,e,1),i=new Date(t,e+1,0),o=new Date(t,e,0),n=s.getDay(),l=i.getDate(),p=o.getDate(),u=n===0?6:n-1;let d='<div class="calendar-grid">';["Ma","Di","Wo","Do","Vr","Za","Zo"].forEach(r=>{d+=`<div class="calendar-header">${r}</div>`});for(let r=u-1;r>=0;r--){const g=p-r;d+=`<div class="calendar-day other-month"><div class="day-number">${g}</div></div>`}const h=new Date;for(let r=1;r<=l;r++){const g=new Date(t,e,r),f=this.formatDateString(g),y=g.toDateString()===h.toDateString(),b=this.appointments.filter(w=>w.date===f);d+=`<div class="calendar-day ${y?"today":""}" data-date="${f}">
        <div class="day-number">${r}</div>
        <div class="day-appointments">`,b.slice(0,3).forEach(w=>{d+=`<div class="appointment-pill ${w.status}" data-id="${w.id}">
          ${w.time} ${w.name}
        </div>`}),b.length>3&&(d+=`<div class="appointment-pill" style="background: #E5E7EB; color: #6B7280;">
          +${b.length-3} meer
        </div>`),d+="</div></div>"}const v=u+l,c=v%7===0?0:7-v%7;for(let r=1;r<=c;r++)d+=`<div class="calendar-day other-month"><div class="day-number">${r}</div></div>`;d+="</div>",a.innerHTML=d,document.querySelectorAll(".calendar-day").forEach(r=>{r.addEventListener("click",g=>{if(g.target.classList.contains("appointment-pill")){const f=g.target.dataset.id;f&&this.showAppointmentModal(f)}})})}renderWeekView(a){const t=this.getWeekStart(this.currentDate),e=Array.from({length:11},(i,o)=>`${8+o}:00`);let s='<div class="week-grid">';s+='<div class="time-slot"></div>';for(let i=0;i<7;i++){const o=new Date(t);o.setDate(o.getDate()+i);const n=o.toDateString()===new Date().toDateString();s+=`<div class="week-header-cell ${n?"today":""}">
        ${o.toLocaleDateString("nl-NL",{weekday:"short",day:"numeric"})}
      </div>`}e.forEach(i=>{s+=`<div class="time-slot">${i}</div>`;for(let o=0;o<7;o++){const n=new Date(t);n.setDate(n.getDate()+o);const l=this.formatDateString(n),p=i.split(":")[0],u=this.appointments.filter(d=>d.date===l&&d.time.startsWith(p));s+='<div class="week-day-cell">',u.forEach(d=>{s+=`<div class="appointment-pill ${d.status}" data-id="${d.id}">
            ${d.time} ${d.name}
          </div>`}),s+="</div>"}}),s+="</div>",a.innerHTML=s,document.querySelectorAll(".appointment-pill").forEach(i=>{i.addEventListener("click",()=>{const o=i.dataset.id;o&&this.showAppointmentModal(o)})})}getWeekStart(a){const t=new Date(a),e=t.getDay(),s=t.getDate()-e+(e===0?-6:1);return new Date(t.setDate(s))}setupAppointments(){const a=document.getElementById("status-filter"),t=document.getElementById("date-filter"),e=document.getElementById("time-filter");a&&a.addEventListener("change",()=>{this.renderAppointments(a.value)}),t&&t.addEventListener("change",()=>{this.renderAppointments(a?a.value:"all")}),e&&e.addEventListener("change",()=>{this.renderAppointments(a?a.value:"all")})}renderAppointments(a="all"){const t=document.getElementById("appointments-list");let e=this.appointments;a!=="afgerond"&&(e=e.filter(n=>n.status!=="afgerond")),a!=="all"&&a!=="afgerond"?e=e.filter(n=>n.status===a):a==="afgerond"&&(e=this.appointments.filter(n=>n.status==="afgerond"));const s=document.getElementById("date-filter");if(s&&s.value!=="all"){const n=new Date;n.setHours(0,0,0,0),e=e.filter(l=>{const[p,u,d]=l.date.split("-").map(Number),m=new Date(p,u-1,d);switch(m.setHours(0,0,0,0),s.value){case"today":return m.getTime()===n.getTime();case"tomorrow":const h=new Date(n);return h.setDate(h.getDate()+1),m.getTime()===h.getTime();case"this-week":const v=new Date(n);return v.setDate(v.getDate()+7),m>=n&&m<v;case"next-week":const c=new Date(n);c.setDate(c.getDate()+7);const r=new Date(n);return r.setDate(r.getDate()+14),m>=c&&m<r;default:return!0}})}const i=document.getElementById("time-filter");if(i&&i.value!=="all"&&(e=e.filter(n=>{const l=parseInt(n.time.split(":")[0]);return i.value==="morning"?l>=9&&l<12:i.value==="afternoon"?l>=12&&l<17:!0})),e.sort((n,l)=>n.date===l.date?n.time.localeCompare(l.time):n.date.localeCompare(l.date)),e.length===0){t.innerHTML='<p class="empty-state">Geen afspraken gevonden</p>';return}let o="";e.forEach(n=>{const[l,p,u]=n.date.split("-").map(Number),m=new Date(l,p-1,u).toLocaleDateString("nl-NL",{weekday:"short",day:"numeric",month:"short"}),h={"nieuwe-aanvraag":"Nieuw",bevestigd:"Bevestigd","in-behandeling":"Bezig",afgerond:"Klaar"}[n.status];o+=`<div class="appointment-card ${n.status}" data-id="${n.id}">
        <div class="appointment-header">
          <div class="appointment-info">
            <h3>${n.name}</h3>
            <div class="appointment-meta">
              <span>📅 ${m}</span>
              <span>🕐 ${n.time}</span>
              ${n.subject?`<span>📋 ${n.subject}</span>`:""}
              ${n.license?`<span>🚗 ${n.license}</span>`:""}
            </div>
          </div>
          <span class="status-badge ${n.status}">${h}</span>
        </div>
        ${n.description?`<div class="appointment-body">
          <p>${n.description}</p>
        </div>`:""}
      </div>`}),t.innerHTML=o,document.querySelectorAll(".appointment-card").forEach(n=>{n.addEventListener("click",()=>{this.showAppointmentModal(n.dataset.id)})})}setupEmails(){const a=document.getElementById("test-email-btn");a&&a.addEventListener("click",()=>{this.addTestEmail()})}addTestEmail(){const a=["Jan Bakker","Maria de Vries","Peter van Dijk","Sophie Jansen"],t=["APK keuring nodig voor mijn auto","Banden vervangen voor de winter","Airco werkt niet meer goed","Onderhoudsbeurt voor mijn occasion"],e={id:Date.now(),name:a[Math.floor(Math.random()*a.length)],email:"test@example.com",phone:"+31 6 12345678",subject:t[Math.floor(Math.random()*t.length)],description:"Dit is een test e-mail voor demonstratie doeleinden.",license:"AB-123-CD",date:new Date().toISOString(),read:!1};this.emails.unshift(e),this.saveData("emails",this.emails),this.renderEmails(),this.updateStats(),this.showNotification("Nieuwe test e-mail toegevoegd!")}renderEmails(){const a=document.getElementById("emails-container");if(this.emails.length===0){a.innerHTML='<p class="empty-state">Geen e-mails ontvangen</p>';return}let t="";this.emails.forEach(e=>{const i=new Date(e.date).toLocaleDateString("nl-NL",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});this.appointments.some(o=>o.emailId==e.id),t+=`<div class="email-card ${e.read?"":"unread"}" data-id="${e.id}">
        <div class="email-main-row">
          <div class="email-left">
            <div class="email-info-block">
              <h3 class="sender-name">
                ${e.name}
                ${e.read?"":'<span class="unread-dot"></span>'}
              </h3>
              <div class="email-meta">
                <span>📧 ${e.email}</span>
                ${e.phone?`<span>📞 ${e.phone}</span>`:""}
                ${e.license?`<span>🚗 ${e.license}</span>`:""}
                <span class="subject-badge">${e.subject}</span>
              </div>
              <p class="email-message">${e.description}</p>
            </div>
          </div>
          <div class="email-right">
            <span class="email-date">${i}</span>
            <div class="email-actions">
              <button class="action-btn btn-email-schedule" onclick="event.stopPropagation(); dashboard.createAppointmentFromEmail('${e.id}')" title="Plan afspraak">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Inplannen</span>
              </button>
              <button class="action-btn btn-email-edit" onclick="event.stopPropagation(); dashboard.showEmailDetails('${e.id}')" title="Bekijk details">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button class="action-btn btn-email-reject" onclick="event.stopPropagation(); dashboard.archiveEmail('${e.id}')" title="Afwijzen">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>`}),a.innerHTML=t}createAppointmentFromEmail(a){const t=this.emails.find(i=>i.id==a);if(!t)return;if(this.appointments.find(i=>i.emailId==a)){this.showNotification("Er bestaat al een afspraak voor dit bericht","warning");return}const s={id:Date.now(),name:t.name,email:t.email,phone:t.phone,license:t.license||"",date:this.formatDateString(new Date),time:"09:00",subject:t.subject,description:t.description,status:"nieuwe-aanvraag",createdFrom:"email",emailId:t.id};this.appointments.push(s),this.saveData("appointments",this.appointments),this.emails=this.emails.filter(i=>i.id!=a),this.saveData("emails",this.emails),this.updateStats(),this.renderEmails(),this.renderCalendar(),this.renderAppointments(),this.showNotification("Afspraak aangemaakt! Email verplaatst naar afspraken."),this.showAppointmentModal(s.id)}quickPlanToday(a,t){const e=this.emails.find(l=>l.id==a);if(!e)return;if(this.appointments.find(l=>l.emailId==a)){this.showNotification("Er bestaat al een afspraak voor dit bericht","warning");return}t&&t.querySelector("span")&&(t.classList.add("btn-collapsed"),t.style.pointerEvents="none");const i=this.formatDateString(new Date),o=this.findNextAvailableTime(i),n={id:Date.now(),name:e.name,email:e.email,phone:e.phone,license:e.license||"",date:i,time:o,subject:e.subject,description:e.description,status:"bevestigd",createdFrom:"email",emailId:e.id};this.appointments.push(n),this.saveData("appointments",this.appointments),this.emails=this.emails.filter(l=>l.id!=a),this.saveData("emails",this.emails),this.updateStats(),this.renderEmails(),this.renderCalendar(),this.renderAppointments(),this.showNotification(`Afspraak gepland voor vandaag om ${o}. Email verplaatst naar afspraken.`,"success")}quickPlanTomorrow(a){const t=this.emails.find(l=>l.id==a);if(!t)return;if(this.appointments.find(l=>l.emailId==a)){this.showNotification("Er bestaat al een afspraak voor dit bericht","warning");return}const s=new Date;s.setDate(s.getDate()+1);const i=this.formatDateString(s),o=this.findNextAvailableTime(i),n={id:Date.now(),name:t.name,email:t.email,phone:t.phone,license:t.license||"",date:i,time:o,subject:t.subject,description:t.description,status:"bevestigd",createdFrom:"email",emailId:t.id};this.appointments.push(n),this.saveData("appointments",this.appointments),this.emails=this.emails.filter(l=>l.id!=a),this.saveData("emails",this.emails),this.updateStats(),this.renderEmails(),this.renderCalendar(),this.renderAppointments(),this.showNotification(`Afspraak gepland voor morgen om ${o}. Email verplaatst naar afspraken.`,"success")}findNextAvailableTime(a){const t=["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"],e=this.appointments.filter(s=>s.date===a&&s.status!=="afgerond");for(let s of t)if(!e.some(o=>o.time===s))return s;return"17:00"}markAsRead(a){const t=this.emails.find(e=>e.id==a);t&&(t.read=!0,this.saveData("emails",this.emails),this.renderEmails(),this.updateStats())}archiveEmail(a){this.showConfirmDialog("Weet je zeker dat je deze aanvraag wilt afwijzen?",()=>{this.emails=this.emails.filter(t=>t.id!=a),this.saveData("emails",this.emails),this.renderEmails(),this.updateStats(),this.showNotification("Aanvraag afgewezen en verwijderd")})}showEmailDetails(a){const t=this.emails.find(l=>l.id==a);if(!t)return;t.read=!0,this.saveData("emails",this.emails),this.updateStats(),this.renderEmails();const e=document.getElementById("appointment-modal"),s=document.getElementById("modal-title"),i=document.getElementById("modal-body"),n=new Date(t.date).toLocaleDateString("nl-NL",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"});s.textContent=`Aanvraag van ${t.name}`,i.innerHTML=`
      <div class="detail-grid">
        <div class="detail-row">
          <span class="detail-label">Naam</span>
          <span class="detail-value">${t.name}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">E-mail</span>
          <span class="detail-value">${t.email}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Telefoon</span>
          <span class="detail-value">${t.phone||"-"}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Kenteken</span>
          <span class="detail-value">${t.license||"-"}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Onderwerp</span>
          <span class="detail-value">${t.subject}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Ontvangen op</span>
          <span class="detail-value">${n}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Bericht</span>
          <div class="detail-value message-box">${t.description}</div>
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="action-btn primary" onclick="dashboard.quickPlanToday('${t.id}'); document.getElementById('appointment-modal').classList.remove('active');">
          Accepteren & Plan Vandaag
        </button>
        <button class="action-btn secondary" onclick="dashboard.createAppointmentFromEmail('${t.id}')">
          Datum Kiezen
        </button>
        <button class="action-btn danger" onclick="dashboard.archiveEmail('${t.id}'); document.getElementById('appointment-modal').classList.remove('active');">
          Afwijzen
        </button>
      </div>
    `,e.classList.add("active")}setupModal(){const a=document.getElementById("appointment-modal");document.getElementById("modal-close").addEventListener("click",()=>{a.classList.remove("active")}),a.addEventListener("click",e=>{e.target===a&&a.classList.remove("active")})}showAppointmentModal(a,t=!1){const e=this.appointments.find(h=>h.id==a);if(!e)return;const s=document.getElementById("appointment-modal"),i=document.getElementById("modal-title"),o=document.getElementById("modal-body"),[n,l,p]=e.date.split("-").map(Number),d=new Date(n,l-1,p).toLocaleDateString("nl-NL",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),m={"nieuwe-aanvraag":"Nieuwe Aanvraag",bevestigd:"Bevestigd","in-behandeling":"In Behandeling",afgerond:"Afgerond"}[e.status];i.textContent=t?"Afspraak Bewerken":`Afspraak - ${e.name}`,t?o.innerHTML=`
        <div class="detail-grid">
          <div class="detail-row">
            <span class="detail-label">Status</span>
            <span class="status-badge ${e.status}">${m}</span>
          </div>
          <div class="detail-row">
            <label class="detail-label" for="edit-name">Naam</label>
            <input type="text" id="edit-name" class="form-control" value="${e.name}" required>
          </div>
          <div class="detail-row">
            <span class="detail-label">E-mail</span>
            <span class="detail-value">${e.email||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Telefoon</span>
            <span class="detail-value">${e.phone||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Kenteken</span>
            <span class="detail-value">${e.license||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Onderwerp</span>
            <span class="detail-value">${e.subject||"-"}</span>
          </div>
          <div class="detail-row">
            <label class="detail-label" for="edit-date">Datum</label>
            <input type="date" id="edit-date" class="form-control" value="${e.date}" required>
          </div>
          <div class="detail-row">
            <label class="detail-label" for="edit-time">Tijd</label>
            <input type="time" id="edit-time" class="form-control" value="${e.time}" required>
          </div>
          <div class="detail-row">
            <span class="detail-label">Bericht</span>
            <div class="detail-value message-box">${e.description}</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="action-btn primary" onclick="dashboard.saveAppointmentChanges('${e.id}')">
            Opslaan
          </button>
          <button class="action-btn secondary" onclick="dashboard.showAppointmentModal('${e.id}', false)">
            Annuleren
          </button>
        </div>
      `:o.innerHTML=`
        <div class="detail-grid">
          <div class="detail-row">
            <span class="detail-label">Status</span>
            <span class="status-badge ${e.status}">${m}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Naam</span>
            <span class="detail-value">${e.name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">E-mail</span>
            <span class="detail-value">${e.email||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Telefoon</span>
            <span class="detail-value">${e.phone||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Kenteken</span>
            <span class="detail-value">${e.license||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Onderwerp</span>
            <span class="detail-value">${e.subject||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Datum</span>
            <span class="detail-value">${d}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Tijd</span>
            <span class="detail-value">${e.time}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Bericht</span>
            <div class="detail-value message-box">${e.description}</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="action-btn secondary" onclick="dashboard.showAppointmentModal('${e.id}', true)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Bewerken
          </button>
          ${e.status==="nieuwe-aanvraag"?`
            <button class="action-btn primary" onclick="dashboard.updateAppointmentStatus('${e.id}', 'bevestigd')">
              Bevestigen
            </button>
          `:""}
          ${e.status==="bevestigd"?`
            <button class="action-btn primary" onclick="dashboard.updateAppointmentStatus('${e.id}', 'in-behandeling')">
              Start Behandeling
            </button>
          `:""}
          ${e.status==="in-behandeling"?`
            <button class="action-btn primary" onclick="dashboard.updateAppointmentStatus('${e.id}', 'afgerond')">
              Afronden
            </button>
          `:""}
          <button class="action-btn danger" onclick="dashboard.confirmDelete('${e.id}')">
            Verwijderen
          </button>
        </div>
      `,s.classList.add("active")}updateAppointmentStatus(a,t){const e=this.appointments.find(s=>s.id==a);if(e){e.status=t,this.saveData("appointments",this.appointments),this.updateStats(),this.renderCalendar(),this.renderAppointments(),this.renderDashboard(),this.showAppointmentModal(a);const s={"nieuwe-aanvraag":"Nieuwe Aanvraag",bevestigd:"Bevestigd","in-behandeling":"In Behandeling",afgerond:"Afgerond"}[t];this.showNotification(`Status bijgewerkt naar: ${s}`)}}saveAppointmentChanges(a){const t=this.appointments.find(n=>n.id==a);if(!t)return;const e=document.getElementById("edit-name").value.trim(),s=document.getElementById("edit-date").value,i=document.getElementById("edit-time").value;if(!e||!s||!i){this.showNotification("Vul alle verplichte velden in","error");return}if(this.appointments.some(n=>n.id!=a&&n.date===s&&n.time===i&&n.status!=="afgerond")){this.showConfirmDialog("Er is al een afspraak op deze datum en tijd. Toch opslaan?",()=>{this.performSaveAppointment(t,e,s,i)});return}this.performSaveAppointment(t,e,s,i)}performSaveAppointment(a,t,e,s){a.name=t,a.date=e,a.time=s,this.saveData("appointments",this.appointments),this.updateStats(),this.renderCalendar(),this.renderAppointments(),this.renderDashboard(),this.showAppointmentModal(a.id,!1),this.showNotification("Afspraak succesvol bijgewerkt")}confirmDelete(a){this.showConfirmDialog("Weet je zeker dat je deze afspraak wilt verwijderen?",()=>{this.deleteAppointment(a)})}deleteAppointment(a){this.appointments=this.appointments.filter(e=>e.id!=a),this.saveData("appointments",this.appointments),document.getElementById("appointment-modal").classList.remove("active"),this.updateStats(),this.renderCalendar(),this.renderAppointments(),this.renderDashboard(),this.showNotification("Afspraak verwijderd")}archiveEmail(a){this.showConfirmDialog("Weet je zeker dat je deze e-mail wilt verwijderen?",()=>{this.emails=this.emails.filter(t=>t.id!=a),this.saveData("emails",this.emails),this.renderEmails(),this.updateStats(),this.showNotification("E-mail verwijderd")})}setupSettings(){const a=document.getElementById("clear-data-btn");a&&a.addEventListener("click",()=>{this.showConfirmDialog("Weet je zeker dat je alle data wilt verwijderen? Dit kan niet ongedaan worden gemaakt!",()=>{localStorage.removeItem("ash_appointments"),localStorage.removeItem("ash_emails"),this.appointments=[],this.emails=[],this.updateStats(),this.renderCalendar(),this.renderAppointments(),this.renderEmails(),this.renderDashboard(),this.showNotification("Alle data verwijderd")})})}showConfirmDialog(a,t){const e=document.querySelector(".confirm-dialog");e&&e.remove();const s=document.createElement("div");s.className="confirm-dialog",s.innerHTML=`
      <div class="confirm-dialog-content">
        <div class="confirm-dialog-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3>Bevestiging</h3>
        <p>${a}</p>
        <div class="confirm-dialog-actions">
          <button class="action-btn secondary" id="confirm-cancel">Annuleren</button>
          <button class="action-btn danger" id="confirm-yes">Ja, doorgaan</button>
        </div>
      </div>
    `,document.body.appendChild(s),setTimeout(()=>s.classList.add("show"),10),document.getElementById("confirm-cancel").addEventListener("click",()=>{s.classList.remove("show"),setTimeout(()=>s.remove(),300)}),document.getElementById("confirm-yes").addEventListener("click",()=>{s.classList.remove("show"),setTimeout(()=>s.remove(),300),t()}),s.addEventListener("click",i=>{i.target===s&&(s.classList.remove("show"),setTimeout(()=>s.remove(),300))})}updateStats(){const a=this.appointments.filter(c=>c.status==="nieuwe-aanvraag").length,t=this.appointments.filter(c=>c.status==="bevestigd").length,e=this.appointments.filter(c=>c.status==="in-behandeling").length,s=new Date;s.setDate(s.getDate()-7),s.setHours(0,0,0,0);const i=this.appointments.filter(c=>{if(c.status!=="afgerond")return!1;const[r,g,f]=c.date.split("-").map(Number),y=new Date(r,g-1,f);return y.setHours(0,0,0,0),y>=s}).length,o=this.emails.filter(c=>!c.read).length,n=this.appointments.filter(c=>c.status!=="afgerond").length;document.getElementById("stat-new-requests").textContent=a,document.getElementById("stat-confirmed").textContent=t,document.getElementById("stat-in-progress").textContent=e,document.getElementById("stat-completed").textContent=i;const l=document.getElementById("appointments-badge"),p=document.getElementById("emails-badge");l&&(l.textContent=n,l.style.display=n>0?"inline-block":"none"),p&&(p.textContent=o,p.style.display=o>0?"inline-block":"none");const u=this.formatDateString(new Date),d=this.appointments.filter(c=>c.date===u&&c.status!=="afgerond").length,m=document.getElementById("quick-new-emails"),h=document.getElementById("quick-today-appointments"),v=document.getElementById("quick-pending");m&&(m.textContent=o||""),h&&(h.textContent=d||""),v&&(v.textContent=a||"")}showNewEmailsOnly(){document.querySelectorAll(".nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".content-section").forEach(a=>a.classList.remove("active")),document.querySelector('[data-section="emails"]').classList.add("active"),document.getElementById("section-emails").classList.add("active"),this.renderEmails(),setTimeout(()=>{const a=document.querySelector(".email-card.unread");a&&a.scrollIntoView({behavior:"smooth",block:"center"})},100)}showTodayAppointments(){document.querySelectorAll(".nav-item").forEach(e=>e.classList.remove("active")),document.querySelectorAll(".content-section").forEach(e=>e.classList.remove("active")),document.querySelector('[data-section="appointments"]').classList.add("active"),document.getElementById("section-appointments").classList.add("active");const a=document.getElementById("date-filter"),t=document.getElementById("status-filter");a&&(a.value="today"),t&&(t.value="all"),this.renderAppointments()}showCompletedAppointments(){document.querySelectorAll(".nav-item").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".content-section").forEach(t=>t.classList.remove("active")),document.querySelector('[data-section="appointments"]').classList.add("active"),document.getElementById("section-appointments").classList.add("active");const a=document.getElementById("status-filter");a&&(a.value="afgerond",this.renderAppointments("afgerond"))}showPendingActions(){document.querySelectorAll(".nav-item").forEach(e=>e.classList.remove("active")),document.querySelectorAll(".content-section").forEach(e=>e.classList.remove("active")),document.querySelector('[data-section="appointments"]').classList.add("active"),document.getElementById("section-appointments").classList.add("active"),document.querySelectorAll(".filter-btn").forEach(e=>e.classList.remove("active"));const t=document.querySelector('[data-filter="nieuwe-aanvraag"]');t&&t.classList.add("active"),this.renderAppointments("nieuwe-aanvraag")}renderDashboard(){const a=this.formatDateString(new Date),t=this.appointments.filter(o=>o.date===a).sort((o,n)=>o.time.localeCompare(n.time)),e=document.getElementById("appointments-today");if(t.length===0)e.innerHTML='<p class="empty-state">Geen afspraken voor vandaag</p>';else{let o="";t.forEach(n=>{const l={"nieuwe-aanvraag":"Nieuwe Aanvraag",bevestigd:"Bevestigd","in-behandeling":"In Behandeling",afgerond:"Afgerond"}[n.status];o+=`<div class="appointment-item" onclick="dashboard.showAppointmentModal('${n.id}')">
          <div class="item-header">
            <span class="item-title">${n.name}</span>
            <span class="item-time">${n.time}</span>
          </div>
          <div class="item-description">
            <span class="status-badge ${n.status}">${l}</span> - ${n.description}
          </div>
        </div>`}),e.innerHTML=o}const s=this.emails.slice(0,5),i=document.getElementById("recent-emails");if(s.length===0)i.innerHTML='<p class="empty-state">Geen nieuwe e-mails</p>';else{let o="";s.forEach(n=>{const l=new Date(n.date),p=this.getTimeAgo(l);o+=`<div class="email-item" onclick="dashboard.createAppointmentFromEmail('${n.id}')">
          <div class="item-header">
            <span class="item-title">${n.name}</span>
            <span class="item-time">${p}</span>
          </div>
          <div class="item-description">${n.subject}</div>
        </div>`}),i.innerHTML=o}}getTimeAgo(a){const e=Math.floor((new Date-a)/1e3);return e<60?"Zojuist":e<3600?`${Math.floor(e/60)} min geleden`:e<86400?`${Math.floor(e/3600)} uur geleden`:`${Math.floor(e/86400)} dagen geleden`}showNotification(a,t="success"){const e=document.querySelector(".dashboard-toast");e&&e.remove();const s=document.createElement("div");s.className=`dashboard-toast toast-${t}`;const i={success:`<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>`,error:`<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>`,warning:`<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>`};s.innerHTML=`
      ${i[t]}
      <span class="toast-message">${a}</span>
      <button class="toast-close" aria-label="Close">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    `,document.body.appendChild(s),setTimeout(()=>s.classList.add("show"),10),s.querySelector(".toast-close").addEventListener("click",()=>{s.classList.remove("show"),setTimeout(()=>s.remove(),300)}),setTimeout(()=>{s.parentElement&&(s.classList.remove("show"),setTimeout(()=>s.remove(),300))},5e3)}}const E=new D;window.dashboard=E;
