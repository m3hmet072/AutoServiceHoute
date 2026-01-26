import"./base-D7JJuB-E.js";/* empty css                   */import"./auth-C_FCBoUG.js";import{f as q,a as P,b as z,c as O,d as F,e as V,g as C,h as T,u as x,i as W,j as H}from"./api-204sF5lH.js";const G="modulepreload",U=function(d){return"/"+d},I={},J=function(e,a,t){let n=Promise.resolve();if(a&&a.length>0){let r=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(l=>({status:"fulfilled",value:l}),l=>({status:"rejected",reason:l}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=i?.nonce||i?.getAttribute("nonce");n=r(a.map(c=>{if(c=U(c),c in I)return;I[c]=!0;const u=c.endsWith(".css"),l=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${l}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":G,u||(p.as="script"),p.crossOrigin="",p.href=c,s&&p.setAttribute("nonce",s),document.head.appendChild(p),u)return new Promise((m,v)=>{p.addEventListener("load",m),p.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return n.then(i=>{for(const s of i||[])s.status==="rejected"&&o(s.reason);return e().catch(o)})},Y={en:{dashboard:"Dashboard",calendar:"Calendar",appointments:"Appointments",emails:"E-mails",settings:"Settings",admin:"Admin",owner:"Owner",totalAppointments:"Total Appointments",allAppointments:"All appointments",completed:"Completed",completedAppointments:"Completed appointments",emailsReceived:"E-mails Received",allEmails:"All e-mails",unreadEmails:"Unread E-mails",yetToRead:"Yet to read",appointmentsToday:"Appointments Today",noAppointmentsToday:"No appointments for today",recentEmails:"Recent E-mails",noNewEmails:"No new e-mails",month:"Month",week:"Week",today:"Today",all:"All",newRequest:"New Request",confirmed:"Confirmed",inProgress:"In Progress",addAppointment:"Add Appointment",noAppointments:"No appointments",inbox:"Inbox",unread:"Unread",read:"Read",markAsRead:"Mark as read",reply:"Reply",delete:"Delete",accountInformation:"Account Information",businessName:"Business Name",email:"Email",phone:"Phone",address:"Address",saveChanges:"Save Changes",openingHours:"Opening Hours",monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",thursday:"Thursday",friday:"Friday",saturday:"Saturday",sunday:"Sunday",closed:"Closed",notifications:"Notifications",emailNotifications:"Email Notifications",receiveEmailNotifications:"Receive email notifications for new appointments",pushNotifications:"Push Notifications",receivePushNotifications:"Receive push notifications",dataManagement:"Data Management",exportData:"Export Data",exportDataDesc:"Export all your data as JSON file",export:"Export",importData:"Import Data",importDataDesc:"Import data from JSON file",import:"Import",clearAllData:"Clear All Data",clearAllDataDesc:"This will delete all appointments and emails",clearData:"Clear Data",language:"Language",selectLanguage:"Select Language",from:"From",to:"To",january:"January",february:"February",march:"March",april:"April",may:"May",june:"June",july:"July",august:"August",september:"September",october:"October",november:"November",december:"December",newTestEmailAdded:"New test e-mail added!",appointmentAlreadyExists:"An appointment already exists for this message",appointmentCreated:"Appointment created! Email moved to appointments.",appointmentScheduledToday:"Appointment scheduled for today at {time}. Email moved to appointments.",appointmentScheduledTomorrow:"Appointment scheduled for tomorrow at {time}. Email moved to appointments.",requestRejectedDeleted:"Request rejected and deleted",statusUpdated:"Status updated to: {status}",fillAllFields:"Please fill in all required fields",appointmentUpdated:"Appointment successfully updated",appointmentDeleted:"Appointment deleted",emailDeleted:"E-mail deleted",workDaysAdded:"{count} work days added to calendar!",allDataCleared:"All data cleared",clearAllDataConfirm:"Are you sure you want to delete all data? This cannot be undone!",statusNew:"New Request",statusConfirmed:"Confirmed",statusInProgress:"In Progress",statusCompleted:"Completed",appointmentDetails:"Appointment Details",emailDetails:"E-mail Details",name:"Name",date:"Date",time:"Time",licensePlate:"License Plate",service:"Service",notes:"Notes",message:"Message",edit:"Edit",save:"Save",cancel:"Cancel",close:"Close",confirm:"Confirm",reject:"Reject",schedule:"Schedule",acceptScheduleToday:"Accept & Schedule Today",chooseDate:"Choose Date",deleteConfirm:"Are you sure you want to delete this?",deleteAppointmentConfirm:"Are you sure you want to delete this appointment?",deleteEmailConfirm:"Are you sure you want to delete this e-mail?",yes:"Yes",no:"No",confirmation:"Confirmation",yesContinue:"Yes, continue",requestFrom:"Request from",receivedOn:"Received on",viewDetails:"View details",importCalendar:"Import Calendar",selectICSFile:"Select ICS File",importWorkDays:"Import Work Days",addNewAppointment:"Add New Appointment",viewAllEmails:"View All E-mails",exportReport:"Export Report",sun:"Sun",mon:"Mon",tue:"Tue",wed:"Wed",thu:"Thu",fri:"Fri",sat:"Sat",allDates:"All Dates",tomorrow:"Tomorrow",thisWeek:"This Week",nextWeek:"Next Week",allTimes:"All Times",morning:"Morning",afternoon:"Afternoon",activeAppointments:"Active Appointments",newRequests:"New Requests",completedAppointments2:"Completed Appointments",monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",thursday:"Thursday",friday:"Friday",saturday:"Saturday",sunday:"Sunday",garageInfo:"Garage Information",companyName:"Company Name",emailAddress:"Email Address",phoneNumber:"Phone Number",openingHours:"Opening Hours",dataManagement:"Data Management",importWorkSchedule:"Import Work Schedule",uploadICSDescription:"Upload an iCalendar (.ics) file to add work days to the calendar",importCalendarFile:"Import Calendar",deleteAllData:"Delete All Data",warningCannotUndo:"Warning: This action cannot be undone.",addTestEmail:"Add Test Email",noEmailsReceived:"No emails received",recentEmailsTitle:"Recent Emails",noNewEmailsReceived:"No new emails",appointmentsOn:"Appointments on",more:"more",receivedOn:"Received on",subject:"Subject",status:"Status",actions:"Actions",search:"Search",filter:"Filter",sortBy:"Sort by",noResults:"No results found",loading:"Loading..."},tr:{dashboard:"Gösterge Paneli",calendar:"Takvim",appointments:"Randevular",emails:"E-postalar",settings:"Ayarlar",admin:"Yönetici",owner:"Sahip",totalAppointments:"Toplam Randevular",allAppointments:"Tüm randevular",completed:"Tamamlandı",completedAppointments:"Tamamlanan randevular",emailsReceived:"Alınan E-postalar",allEmails:"Tüm e-postalar",unreadEmails:"Okunmamış E-postalar",yetToRead:"Henüz okunmadı",appointmentsToday:"Bugünkü Randevular",noAppointmentsToday:"Bugün randevu yok",recentEmails:"Son E-postalar",noNewEmails:"Yeni e-posta yok",month:"Ay",week:"Hafta",today:"Bugün",all:"Hepsi",newRequest:"Yeni Talep",confirmed:"Onaylandı",inProgress:"İşlemde",addAppointment:"Randevu Ekle",noAppointments:"Randevu yok",inbox:"Gelen Kutusu",unread:"Okunmamış",read:"Okundu",markAsRead:"Okundu olarak işaretle",reply:"Yanıtla",delete:"Sil",accountInformation:"Hesap Bilgileri",businessName:"İşletme Adı",email:"E-posta",phone:"Telefon",address:"Adres",saveChanges:"Değişiklikleri Kaydet",openingHours:"Çalışma Saatleri",monday:"Pazartesi",tuesday:"Salı",wednesday:"Çarşamba",thursday:"Perşembe",friday:"Cuma",saturday:"Cumartesi",sunday:"Pazar",closed:"Kapalı",notifications:"Bildirimler",emailNotifications:"E-posta Bildirimleri",receiveEmailNotifications:"Yeni randevular için e-posta bildirimleri al",pushNotifications:"Anlık Bildirimler",receivePushNotifications:"Anlık bildirimler al",dataManagement:"Veri Yönetimi",exportData:"Veriyi Dışa Aktar",exportDataDesc:"Tüm verilerinizi JSON dosyası olarak dışa aktarın",export:"Dışa Aktar",importData:"Veri İçe Aktar",importDataDesc:"JSON dosyasından veri içe aktarın",import:"İçe Aktar",clearAllData:"Tüm Verileri Temizle",clearAllDataDesc:"Bu işlem tüm randevuları ve e-postaları silecektir",clearData:"Verileri Temizle",language:"Dil",selectLanguage:"Dil Seçin",from:"Başlangıç",to:"Bitiş",january:"Ocak",february:"Şubat",march:"Mart",april:"Nisan",may:"Mayıs",june:"Haziran",july:"Temmuz",august:"Ağustos",september:"Eylül",october:"Ekim",november:"Kasım",december:"Aralık",newTestEmailAdded:"Yeni test e-postası eklendi!",appointmentAlreadyExists:"Bu mesaj için zaten bir randevu var",appointmentCreated:"Randevu oluşturuldu! E-posta randevulara taşındı.",appointmentScheduledToday:"Randevu bugün saat {time} için planlandı. E-posta randevulara taşındı.",appointmentScheduledTomorrow:"Randevu yarın saat {time} için planlandı. E-posta randevulara taşındı.",requestRejectedDeleted:"Talep reddedildi ve silindi",statusUpdated:"Durum güncellendi: {status}",fillAllFields:"Lütfen tüm gerekli alanları doldurun",appointmentUpdated:"Randevu başarıyla güncellendi",appointmentDeleted:"Randevu silindi",emailDeleted:"E-posta silindi",workDaysAdded:"{count} çalışma günü takvime eklendi!",allDataCleared:"Tüm veriler temizlendi",clearAllDataConfirm:"Tüm verileri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!",statusNew:"Yeni Talep",statusConfirmed:"Onaylandı",statusInProgress:"İşlemde",statusCompleted:"Tamamlandı",appointmentDetails:"Randevu Detayları",emailDetails:"E-posta Detayları",name:"Ad",date:"Tarih",time:"Saat",licensePlate:"Plaka",service:"Hizmet",notes:"Notlar",message:"Mesaj",edit:"Düzenle",save:"Kaydet",cancel:"İptal",close:"Kapat",confirm:"Onayla",reject:"Reddet",schedule:"Planla",acceptScheduleToday:"Kabul Et & Bugün Planla",chooseDate:"Tarih Seç",deleteConfirm:"Bunu silmek istediğinizden emin misiniz?",deleteAppointmentConfirm:"Bu randevuyu silmek istediğinizden emin misiniz?",deleteEmailConfirm:"Bu e-postayı silmek istediğinizden emin misiniz?",yes:"Evet",no:"Hayır",confirmation:"Onay",yesContinue:"Evet, devam et",requestFrom:"Talep",receivedOn:"Alındı",viewDetails:"Detayları görüntüle",importCalendar:"Takvim İçe Aktar",selectICSFile:"ICS Dosyası Seç",importWorkDays:"Çalışma Günlerini İçe Aktar",addNewAppointment:"Yeni Randevu Ekle",viewAllEmails:"Tüm E-postaları Görüntüle",exportReport:"Rapor Dışa Aktar",sun:"Paz",mon:"Pzt",tue:"Sal",wed:"Çar",thu:"Per",fri:"Cum",sat:"Cmt",allDates:"Tüm Tarihler",tomorrow:"Yarın",thisWeek:"Bu Hafta",nextWeek:"Gelecek Hafta",allTimes:"Tüm Saatler",morning:"Sabah",afternoon:"Öğleden Sonra",activeAppointments:"Aktif Randevular",newRequests:"Yeni Talepler",completedAppointments2:"Tamamlanan Randevular",monday:"Pazartesi",tuesday:"Salı",wednesday:"Çarşamba",thursday:"Perşembe",friday:"Cuma",saturday:"Cumartesi",sunday:"Pazar",garageInfo:"Garaj Bilgileri",companyName:"Şirket Adı",emailAddress:"E-posta Adresi",phoneNumber:"Telefon Numarası",openingHours:"Açılış Saatleri",dataManagement:"Veri Yönetimi",importWorkSchedule:"Çalışma Takvimini İçe Aktar",uploadICSDescription:"Çalışma günlerini takvime eklemek için bir iCalendar (.ics) dosyası yükleyin",importCalendarFile:"Takvim İçe Aktar",deleteAllData:"Tüm Verileri Sil",warningCannotUndo:"Uyarı: Bu işlem geri alınamaz.",addTestEmail:"Test E-postası Ekle",noEmailsReceived:"Alınan e-posta yok",recentEmailsTitle:"Son E-postalar",noNewEmailsReceived:"Yeni e-posta yok",appointmentsOn:"Randevular",more:"daha fazla",receivedOn:"Alındı",subject:"Konu",status:"Durum",actions:"İşlemler",search:"Ara",filter:"Filtrele",sortBy:"Sırala",noResults:"Sonuç bulunamadı",loading:"Yükleniyor..."},nl:{dashboard:"Dashboard",calendar:"Kalender",appointments:"Afspraken",emails:"E-mails",settings:"Instellingen",admin:"Admin",owner:"Eigenaar",totalAppointments:"Totaal Afspraken",allAppointments:"Alle afspraken",completed:"Afgerond",completedAppointments:"Voltooide afspraken",emailsReceived:"E-mails Ontvangen",allEmails:"Alle e-mails",unreadEmails:"Ongelezen E-mails",yetToRead:"Nog te lezen",appointmentsToday:"Afspraken Vandaag",noAppointmentsToday:"Geen afspraken voor vandaag",recentEmails:"Recente E-mails",noNewEmails:"Geen nieuwe e-mails",month:"Maand",week:"Week",today:"Vandaag",all:"Alles",newRequest:"Nieuwe Aanvraag",confirmed:"Bevestigd",inProgress:"In Behandeling",addAppointment:"Afspraak Toevoegen",noAppointments:"Geen afspraken",inbox:"Inbox",unread:"Ongelezen",read:"Gelezen",markAsRead:"Markeer als gelezen",reply:"Beantwoorden",delete:"Verwijderen",accountInformation:"Accountinformatie",businessName:"Bedrijfsnaam",email:"E-mail",phone:"Telefoon",address:"Adres",saveChanges:"Wijzigingen Opslaan",openingHours:"Openingstijden",monday:"Maandag",tuesday:"Dinsdag",wednesday:"Woensdag",thursday:"Donderdag",friday:"Vrijdag",saturday:"Zaterdag",sunday:"Zondag",closed:"Gesloten",notifications:"Meldingen",emailNotifications:"E-mailmeldingen",receiveEmailNotifications:"Ontvang e-mailmeldingen voor nieuwe afspraken",pushNotifications:"Pushmeldingen",receivePushNotifications:"Ontvang pushmeldingen",dataManagement:"Gegevensbeheer",exportData:"Gegevens Exporteren",exportDataDesc:"Exporteer al uw gegevens als JSON-bestand",export:"Exporteren",importData:"Gegevens Importeren",importDataDesc:"Importeer gegevens uit JSON-bestand",import:"Importeren",clearAllData:"Alle Gegevens Wissen",clearAllDataDesc:"Dit zal alle afspraken en e-mails verwijderen",clearData:"Gegevens Wissen",language:"Taal",selectLanguage:"Selecteer Taal",from:"Van",to:"Tot",january:"Januari",february:"Februari",march:"Maart",april:"April",may:"Mei",june:"Juni",july:"Juli",august:"Augustus",september:"September",october:"Oktober",november:"November",december:"December",newTestEmailAdded:"Nieuwe test e-mail toegevoegd!",appointmentAlreadyExists:"Er bestaat al een afspraak voor dit bericht",appointmentCreated:"Afspraak aangemaakt! Email verplaatst naar afspraken.",appointmentScheduledToday:"Afspraak gepland voor vandaag om {time}. Email verplaatst naar afspraken.",appointmentScheduledTomorrow:"Afspraak gepland voor morgen om {time}. Email verplaatst naar afspraken.",requestRejectedDeleted:"Aanvraag afgewezen en verwijderd",statusUpdated:"Status bijgewerkt naar: {status}",fillAllFields:"Vul alle verplichte velden in",appointmentUpdated:"Afspraak succesvol bijgewerkt",appointmentDeleted:"Afspraak verwijderd",emailDeleted:"E-mail verwijderd",workDaysAdded:"{count} werkdagen toegevoegd aan kalender!",allDataCleared:"Alle data verwijderd",clearAllDataConfirm:"Weet je zeker dat je alle data wilt verwijderen? Dit kan niet ongedaan worden gemaakt!",statusNew:"Nieuwe Aanvraag",statusConfirmed:"Bevestigd",statusInProgress:"In Behandeling",statusCompleted:"Afgerond",appointmentDetails:"Afspraak Details",emailDetails:"E-mail Details",name:"Naam",date:"Datum",time:"Tijd",licensePlate:"Kenteken",service:"Dienst",notes:"Opmerkingen",message:"Bericht",edit:"Bewerken",save:"Opslaan",cancel:"Annuleren",close:"Sluiten",confirm:"Bevestigen",reject:"Afwijzen",schedule:"Inplannen",acceptScheduleToday:"Accepteren & Plan Vandaag",chooseDate:"Datum Kiezen",deleteConfirm:"Weet je zeker dat je dit wilt verwijderen?",deleteAppointmentConfirm:"Weet je zeker dat je deze afspraak wilt verwijderen?",deleteEmailConfirm:"Weet je zeker dat je deze e-mail wilt verwijderen?",yes:"Ja",no:"Nee",confirmation:"Bevestiging",yesContinue:"Ja, doorgaan",requestFrom:"Aanvraag van",receivedOn:"Ontvangen op",viewDetails:"Bekijk details",importCalendar:"Kalender Importeren",selectICSFile:"Selecteer ICS Bestand",importWorkDays:"Werkdagen Importeren",addNewAppointment:"Nieuwe Afspraak Toevoegen",viewAllEmails:"Alle E-mails Bekijken",exportReport:"Rapport Exporteren",sun:"Zo",mon:"Ma",tue:"Di",wed:"Wo",thu:"Do",fri:"Vr",sat:"Za",allDates:"Alle Data",tomorrow:"Morgen",thisWeek:"Deze Week",nextWeek:"Volgende Week",allTimes:"Alle Tijden",morning:"Ochtend",afternoon:"Middag",activeAppointments:"Actieve Afspraken",newRequests:"Nieuwe Aanvragen",completedAppointments2:"Afgeronde Afspraken",monday:"Maandag",tuesday:"Dinsdag",wednesday:"Woensdag",thursday:"Donderdag",friday:"Vrijdag",saturday:"Zaterdag",sunday:"Zondag",garageInfo:"Garage Informatie",companyName:"Bedrijfsnaam",emailAddress:"E-mailadres",phoneNumber:"Telefoonnummer",openingHours:"Openingstijden",dataManagement:"Data Beheer",importWorkSchedule:"Werkrooster Importeren",uploadICSDescription:"Upload een iCalendar (.ics) bestand om werkdagen toe te voegen aan de kalender",importCalendarFile:"Kalender Importeren",deleteAllData:"Alle Data Verwijderen",warningCannotUndo:"Let op: Deze actie kan niet ongedaan worden gemaakt.",addTestEmail:"Test E-mail Toevoegen",noEmailsReceived:"Geen e-mails ontvangen",recentEmailsTitle:"Recent E-mails",noNewEmailsReceived:"Geen nieuwe e-mails",appointmentsOn:"Afspraken op",more:"meer",receivedOn:"Ontvangen op",subject:"Onderwerp",status:"Status",actions:"Acties",search:"Zoeken",filter:"Filter",sortBy:"Sorteer op",noResults:"Geen resultaten gevonden",loading:"Laden..."}};let f=null,S=0,B=0,$=null;function _(d="live-visitor-counter"){const e=document.getElementById(d);if(!e){console.warn("Live visitor counter container not found");return}e.innerHTML=`
    <div class="live-counter">
      <div class="live-indicator">
        <span class="pulse-dot"></span>
        <span class="live-text">Live</span>
      </div>
      <div class="visitor-count">
        <span class="count-number" id="visitor-count">0</span>
        <span class="count-label">mensen bekijken nu</span>
      </div>
    </div>
  `,N(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(!f||f.readyState===EventSource.CLOSED)&&N()})}function N(){const d=window.location.hostname==="localhost"?"http://localhost:3001/api":"https://autoservicehoute-production.up.railway.app/api";try{f=new EventSource(`${d}/visitors/stream`),f.onmessage=e=>{const a=JSON.parse(e.data);K(a.activeVisitors)},f.onerror=e=>{console.error("SSE connection error:",e),f.close(),setTimeout(()=>{document.visibilityState==="visible"&&N()},5e3)},f.onopen=()=>{console.log("✓ Real-time visitor counter connected")}}catch(e){console.error("Failed to connect to visitor stream:",e)}}function K(d){B=d,$&&cancelAnimationFrame($),M()}function M(){const d=document.getElementById("visitor-count");if(!d)return;const e=B-S;if(Math.abs(e)<.1){S=B,d.textContent=Math.round(S);return}S+=e*.15,d.textContent=Math.round(S),$=requestAnimationFrame(M)}window.addEventListener("beforeunload",()=>{f&&f.close(),$&&cancelAnimationFrame($)});let L=null;async function j(){try{const d=await q();k("active-visitors-count",d.activeVisitors||0),k("today-visitors-count",d.todayVisitors||0),k("yesterday-visitors-count",d.yesterdayVisitors||0),k("total-visitors-count",d.totalVisitors||0),k("total-sessions-count",d.totalSessions||0),k("avg-session-duration",R(d.avgSessionDuration||0)),await Z()}catch(d){console.error("Failed to fetch visitor stats:",d)}}async function Z(){try{const d=await z(),e=document.getElementById("active-visitors-list");if(!e)return;if(d.length===0){e.innerHTML='<p class="empty-state">Geen actieve bezoekers op dit moment</p>';return}e.innerHTML=d.map(a=>`
      <div class="active-visitor-card">
        <div class="device-icon">
          ${Q(a.deviceType)}
        </div>
        <div class="visitor-info">
          <div class="device-name">${a.deviceName}</div>
          <div class="device-details">
            ${a.browser} • ${a.os}
          </div>
          <div class="visitor-page">${a.page}</div>
        </div>
        <div class="visitor-duration">${R(a.duration)}</div>
      </div>
    `).join("")}catch(d){console.error("Failed to fetch active visitors:",d)}}function Q(d){switch(d){case"Mobile":return"📱";case"Tablet":return"📱";case"Desktop":return"💻";default:return"🖥️"}}async function X(d=30){try{const e=await P(d),a=document.getElementById("visitor-chart");if(!a)return;const t=e.map(i=>new Date(i.date).toLocaleDateString("nl-NL",{month:"short",day:"numeric"})),n=e.map(i=>i.uniqueVisitors),o=e.map(i=>i.totalSessions);if(window.Chart){L&&L.destroy();const i=a.getContext("2d");L=new Chart(i,{type:"line",data:{labels:t,datasets:[{label:"Unique Bezoekers",data:n,borderColor:"rgb(75, 192, 192)",backgroundColor:"rgba(75, 192, 192, 0.2)",tension:.1},{label:"Totaal Sessies",data:o,borderColor:"rgb(255, 99, 132)",backgroundColor:"rgba(255, 99, 132, 0.2)",tension:.1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"},title:{display:!0,text:`Bezoekersstatistieken (Laatste ${d} Dagen)`}},scales:{y:{beginAtZero:!0,ticks:{precision:0}}}}})}}catch(e){console.error("Failed to load visitor chart:",e)}}function k(d,e){const a=document.getElementById(d);a&&(a.textContent=e)}function R(d){const e=Math.floor(d/60),a=Math.floor(d%60);return`${e}m ${a}s`}setInterval(j,1e4);j();X(30);_("live-visitor-counter");class ee{constructor(){this.currentView="month",this.currentDate=new Date,this.appointments=[],this.emails=[],this.workDays=[],this.currentLanguage=this.loadData("language")||"en",this.translations=Y,this.init()}formatDateString(e){const a=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${t}-${n}`}init(){this.loadAllData().then(()=>{this.setupLanguage(),this.setupNavigation(),this.setupCalendar(),this.setupAppointments(),this.setupEmails(),this.setupSettings(),this.setupModal(),this.updateStats(),this.renderDashboard(),this.renderCalendar(),this.applyTranslations()})}async loadAllData(){try{[this.appointments,this.emails,this.workDays]=await Promise.all([O(),F(),V()]),console.log("✓ Data loaded from database")}catch(e){console.error("Error loading data:",e),this.appointments=this.loadData("appointments")||[],this.emails=this.loadData("emails")||[],this.workDays=this.loadData("workDays")||[]}}setupLanguage(){const e=document.getElementById("language-select");if(!e)return;const a=e.querySelector(".select-trigger"),t=e.querySelectorAll(".select-option"),n=e.querySelector(".selected-value"),o={en:{flag:"🇬🇧",name:"English"},tr:{flag:"🇹🇷",name:"Türkçe"},nl:{flag:"🇳🇱",name:"Nederlands"}},i=o[this.currentLanguage];i&&(n.innerHTML=`
        <span class="flag-icon">${i.flag}</span>
        <span class="lang-text">${i.name}</span>
      `),t.forEach(r=>{r.dataset.value===this.currentLanguage&&r.classList.add("selected")}),a.addEventListener("click",r=>{r.stopPropagation(),e.classList.toggle("open")}),t.forEach(r=>{r.addEventListener("click",c=>{c.stopPropagation();const u=r.dataset.value;t.forEach(p=>p.classList.remove("selected")),r.classList.add("selected");const l=o[u];n.innerHTML=`
          <span class="flag-icon">${l.flag}</span>
          <span class="lang-text">${l.name}</span>
        `,e.classList.remove("open"),this.currentLanguage=u,this.saveData("language",this.currentLanguage),this.applyTranslations(),this.renderDashboard(),this.renderCalendar(),document.getElementById("section-appointments").classList.contains("active")&&this.renderAppointments(),document.getElementById("section-emails").classList.contains("active")&&this.renderEmails()})}),document.addEventListener("click",r=>{e.contains(r.target)||e.classList.remove("open")}),document.addEventListener("keydown",r=>{r.key==="Escape"&&e.classList.contains("open")&&e.classList.remove("open")});const s=document.getElementById("logout-btn");s&&s.addEventListener("click",()=>{confirm("Are you sure you want to logout?")&&J(()=>import("./auth-C_FCBoUG.js"),[]).then(r=>{r.logout()})})}applyTranslations(){const e=this.currentLanguage,a=this.translations[e];a&&(document.querySelectorAll("[data-translate]").forEach(t=>{const n=t.getAttribute("data-translate");a[n]&&(t.textContent=a[n])}),document.documentElement.lang=e)}translate(e,a={}){const t=this.translations[this.currentLanguage];let n=t&&t[e]?t[e]:e;return Object.keys(a).forEach(o=>{n=n.replace(`{${o}}`,a[o])}),n}getLocale(){return{en:"en-US",tr:"tr-TR",nl:"nl-NL"}[this.currentLanguage]||"en-US"}getStatusText(e){const a={"nieuwe-aanvraag":"statusNew",bevestigd:"statusConfirmed","in-behandeling":"statusInProgress",afgerond:"statusCompleted"};return this.translate(a[e]||e)}loadData(e){const a=localStorage.getItem(`ash_${e}`);return a?JSON.parse(a):null}saveData(e,a){localStorage.setItem(`ash_${e}`,JSON.stringify(a))}setupNavigation(){const e=document.querySelectorAll(".nav-item"),a=document.querySelectorAll(".content-section");e.forEach(o=>{o.addEventListener("click",i=>{i.preventDefault();const s=o.dataset.section;e.forEach(r=>r.classList.remove("active")),a.forEach(r=>r.classList.remove("active")),o.classList.add("active"),document.getElementById(`section-${s}`).classList.add("active"),s==="calendar"?this.renderCalendar():s==="appointments"?this.renderAppointments():s==="emails"&&this.renderEmails()})});const t=document.getElementById("mobile-toggle"),n=document.getElementById("sidebar");t&&n&&(t.addEventListener("click",()=>{n.classList.toggle("active")}),document.addEventListener("click",o=>{window.innerWidth<=1024&&!n.contains(o.target)&&!t.contains(o.target)&&n.classList.remove("active")}))}setupCalendar(){const e=document.querySelectorAll(".view-btn"),a=document.getElementById("prev-period"),t=document.getElementById("next-period"),n=document.getElementById("today-btn");e.forEach(o=>{o.addEventListener("click",()=>{e.forEach(i=>i.classList.remove("active")),o.classList.add("active"),this.currentView=o.dataset.view,this.renderCalendar()})}),a.addEventListener("click",()=>{this.currentView==="month"?this.currentDate.setMonth(this.currentDate.getMonth()-1):this.currentDate.setDate(this.currentDate.getDate()-7),this.renderCalendar()}),t.addEventListener("click",()=>{this.currentView==="month"?this.currentDate.setMonth(this.currentDate.getMonth()+1):this.currentDate.setDate(this.currentDate.getDate()+7),this.renderCalendar()}),n.addEventListener("click",()=>{this.currentDate=new Date,this.renderCalendar()})}renderCalendar(){const e=document.getElementById("calendar-view"),a=document.getElementById("current-period");if(this.currentView==="month")this.renderMonthView(e),a.textContent=this.currentDate.toLocaleDateString("nl-NL",{month:"long",year:"numeric"});else{this.renderWeekView(e);const t=this.getWeekStart(this.currentDate),n=new Date(t);n.setDate(n.getDate()+6),a.textContent=`${t.getDate()} - ${n.getDate()} ${t.toLocaleDateString("nl-NL",{month:"long",year:"numeric"})}`}}renderMonthView(e){const a=this.currentDate.getFullYear(),t=this.currentDate.getMonth(),n=new Date(a,t,1),o=new Date(a,t+1,0),i=new Date(a,t,0),s=n.getDay(),r=o.getDate(),c=i.getDate(),u=s===0?6:s-1;let l='<div class="calendar-grid">';[this.translate("mon"),this.translate("tue"),this.translate("wed"),this.translate("thu"),this.translate("fri"),this.translate("sat"),this.translate("sun")].forEach(h=>{l+=`<div class="calendar-header">${h}</div>`});for(let h=u-1;h>=0;h--){const w=c-h;l+=`<div class="calendar-day other-month"><div class="day-number">${w}</div></div>`}const m=new Date;for(let h=1;h<=r;h++){const w=new Date(a,t,h),D=this.formatDateString(w),E=w.toDateString()===m.toDateString(),A=this.appointments.filter(g=>g.date===D),b=this.workDays.find(g=>g.date===D);if(l+=`<div class="calendar-day ${E?"today":""} ${b?"work-day":""}" data-date="${D}">`,l+=`<div class="day-header">
        <div class="day-number">${h}</div>`,b){const g=b.shift.includes("Ochtend")?"Ochtend":b.shift.includes("Middag")?"Middag":b.shift.includes("Nacht")?"Nacht":"Werk";l+=`<div class="work-day-label">${g}</div>`}l+="</div>",l+='<div class="day-appointments">',A.slice(0,3).forEach(g=>{l+=`<div class="appointment-pill ${g.status}" data-id="${g.id}">
          ${g.time} ${g.name}
        </div>`}),A.length>3&&(l+=`<div class="appointment-pill" style="background: #E5E7EB; color: #6B7280;">
          +${A.length-3} ${this.translate("more")}
        </div>`),l+="</div></div>"}const v=u+r,y=v%7===0?0:7-v%7;for(let h=1;h<=y;h++)l+=`<div class="calendar-day other-month"><div class="day-number">${h}</div></div>`;l+="</div>",e.innerHTML=l,document.querySelectorAll(".calendar-day").forEach(h=>{h.addEventListener("click",w=>{const D=h.dataset.date;if(D)if(w.target.classList.contains("appointment-pill")&&w.target.dataset.id){const E=w.target.dataset.id;this.showAppointmentModal(E)}else{const E=this.appointments.filter(A=>A.date===D);E.length>0&&this.showDayAppointmentsModal(D,E)}})})}renderWeekView(e){const a=this.getWeekStart(this.currentDate),t=Array.from({length:11},(o,i)=>`${8+i}:00`);let n='<div class="week-grid">';n+='<div class="time-slot"></div>';for(let o=0;o<7;o++){const i=new Date(a);i.setDate(i.getDate()+o);const s=i.toDateString()===new Date().toDateString();n+=`<div class="week-header-cell ${s?"today":""}">
        ${i.toLocaleDateString("nl-NL",{weekday:"short",day:"numeric"})}
      </div>`}t.forEach(o=>{n+=`<div class="time-slot">${o}</div>`;for(let i=0;i<7;i++){const s=new Date(a);s.setDate(s.getDate()+i);const r=this.formatDateString(s),c=parseInt(o.split(":")[0]),u=this.appointments.filter(l=>l.date!==r?!1:parseInt(l.time.split(":")[0])===c);n+=`<div class="week-day-cell" data-date="${r}" data-hour="${o}">`,u.forEach(l=>{n+=`<div class="appointment-pill ${l.status}" data-id="${l.id}">
            ${l.time} ${l.name}
          </div>`}),n+="</div>"}}),n+="</div>",e.innerHTML=n,document.querySelectorAll(".appointment-pill").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.id;i&&this.showAppointmentModal(i)})})}getWeekStart(e){const a=new Date(e),t=a.getDay(),n=a.getDate()-t+(t===0?-6:1);return new Date(a.setDate(n))}setupAppointments(){const e=document.getElementById("status-filter"),a=document.getElementById("date-filter"),t=document.getElementById("time-filter");e&&e.addEventListener("change",()=>{this.renderAppointments(e.value)}),a&&a.addEventListener("change",()=>{this.renderAppointments(e?e.value:"all")}),t&&t.addEventListener("change",()=>{this.renderAppointments(e?e.value:"all")})}renderAppointments(e="all"){const a=document.getElementById("appointments-list");let t=this.appointments;e!=="afgerond"&&(t=t.filter(s=>s.status!=="afgerond")),e!=="all"&&e!=="afgerond"?t=t.filter(s=>s.status===e):e==="afgerond"&&(t=this.appointments.filter(s=>s.status==="afgerond"));const n=document.getElementById("date-filter");if(n&&n.value!=="all"){const s=new Date;s.setHours(0,0,0,0),t=t.filter(r=>{const[c,u,l]=r.date.split("-").map(Number),p=new Date(c,u-1,l);switch(p.setHours(0,0,0,0),n.value){case"today":return p.getTime()===s.getTime();case"tomorrow":const m=new Date(s);return m.setDate(m.getDate()+1),p.getTime()===m.getTime();case"this-week":const v=new Date(s);return v.setDate(v.getDate()+7),p>=s&&p<v;case"next-week":const y=new Date(s);y.setDate(y.getDate()+7);const h=new Date(s);return h.setDate(h.getDate()+14),p>=y&&p<h;default:return!0}})}const o=document.getElementById("time-filter");if(o&&o.value!=="all"&&(t=t.filter(s=>{const r=parseInt(s.time.split(":")[0]);return o.value==="morning"?r>=9&&r<12:o.value==="afternoon"?r>=12&&r<17:!0})),t.sort((s,r)=>s.date===r.date?s.time.localeCompare(r.time):s.date.localeCompare(r.date)),t.length===0){a.innerHTML='<p class="empty-state">Geen afspraken gevonden</p>';return}let i="";t.forEach(s=>{const[r,c,u]=s.date.split("-").map(Number),p=new Date(r,c-1,u).toLocaleDateString("nl-NL",{weekday:"short",day:"numeric",month:"short"}),m={"nieuwe-aanvraag":"Nieuw",bevestigd:"Bevestigd","in-behandeling":"Bezig",afgerond:"Klaar"}[s.status];i+=`<div class="appointment-card ${s.status}" data-id="${s.id}">
        <div class="appointment-header">
          <div class="appointment-info">
            <h3>${s.name}</h3>
            <div class="appointment-meta">
              <span>📅 ${p}</span>
              <span>🕐 ${s.time}</span>
              ${s.service?`<span>📋 ${s.service}</span>`:""}
              ${s.kenteken?`<span>🚗 ${s.kenteken}</span>`:""}
            </div>
          </div>
          <span class="status-badge ${s.status}">${m}</span>
        </div>
        ${s.notes?`<div class="appointment-body">
          <p>${s.notes}</p>
        </div>`:""}
      </div>`}),a.innerHTML=i,document.querySelectorAll(".appointment-card").forEach(s=>{s.addEventListener("click",()=>{this.showAppointmentModal(s.dataset.id)})})}setupEmails(){const e=document.getElementById("test-email-btn");e&&e.addEventListener("click",()=>{this.addTestEmail()})}addTestEmail(){const e=["Jan Bakker","Maria de Vries","Peter van Dijk","Sophie Jansen"],a=["APK keuring nodig voor mijn auto","Banden vervangen voor de winter","Airco werkt niet meer goed","Onderhoudsbeurt voor mijn occasion"],t={id:String(Date.now()),name:e[Math.floor(Math.random()*e.length)],email:"test@example.com",phone:"+31 6 12345678",subject:a[Math.floor(Math.random()*a.length)],description:"Dit is een test e-mail voor demonstratie doeleinden.",license:"AB-123-CD",date:new Date().toISOString(),read:!1};this.emails.unshift(t),this.saveData("emails",this.emails),this.renderEmails(),this.updateStats(),this.showNotification(this.translate("newTestEmailAdded"))}renderEmails(){const e=document.getElementById("emails-container");if(this.emails.length===0){e.innerHTML=`<p class="empty-state">${this.translate("noEmailsReceived")}</p>`;return}let a="";this.emails.forEach(t=>{const o=new Date(t.created_at).toLocaleDateString(this.getLocale(),{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});this.appointments.some(i=>i.emailId==t.id),a+=`<div class="email-card ${t.read?"":"unread"}" data-id="${t.id}">
        <div class="email-main-row">
          <div class="email-left">
            <div class="email-info-block">
              <h3 class="sender-name">
                ${t.name}
                ${t.read?"":'<span class="unread-dot"></span>'}
              </h3>
              <div class="email-meta">
                <span>📧 ${t.email}</span>
                ${t.phone?`<span>📞 ${t.phone}</span>`:""}
                ${t.kenteken?`<span>🚗 ${t.kenteken}</span>`:""}
                <span class="subject-badge">${t.subject}</span>
              </div>
              <p class="email-message">${t.message}</p>
            </div>
          </div>
          <div class="email-right">
            <span class="email-date">${o}</span>
            <div class="email-actions">
              <button class="action-btn btn-email-schedule" onclick="event.stopPropagation(); dashboard.createAppointmentFromEmail('${t.id}')" title="${this.translate("schedule")}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>${this.translate("schedule")}</span>
              </button>
              <button class="action-btn btn-email-edit" onclick="event.stopPropagation(); dashboard.showEmailDetails('${t.id}')" title="${this.translate("viewDetails")}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button class="action-btn btn-email-reject" onclick="event.stopPropagation(); dashboard.archiveEmail('${t.id}')" title="${this.translate("reject")}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>`}),e.innerHTML=a}async createAppointmentFromEmail(e){const a=this.emails.find(o=>o.id==e);if(!a)return;if(this.appointments.find(o=>o.emailId==e)){this.showNotification(this.translate("appointmentAlreadyExists"),"warning");return}const n={id:String(Date.now()),name:a.name,email:a.email,phone:a.phone,kenteken:a.kenteken||"",date:this.formatDateString(new Date),time:"09:00",service:a.subject,notes:a.message,status:"nieuwe-aanvraag",createdFrom:"email",emailId:a.id};try{await C(n),this.appointments.push(n),await T(e),this.emails=this.emails.filter(o=>o.id!=e)}catch(o){console.error("Error creating appointment:",o),this.appointments.push(n),this.saveData("appointments",this.appointments),this.emails=this.emails.filter(i=>i.id!=e),this.saveData("emails",this.emails)}this.updateStats(),this.renderEmails(),this.renderCalendar(),this.renderAppointments(),this.showNotification(this.translate("appointmentCreated")),this.showAppointmentModal(n.id)}async quickPlanToday(e,a){const t=this.emails.find(r=>r.id==e);if(!t)return;if(this.appointments.find(r=>r.emailId==e)){this.showNotification(this.translate("appointmentAlreadyExists"),"warning");return}a&&a.querySelector("span")&&(a.classList.add("btn-collapsed"),a.style.pointerEvents="none");const o=this.formatDateString(new Date),i=this.findNextAvailableTime(o),s={id:String(Date.now()),name:t.name,email:t.email,phone:t.phone,kenteken:t.kenteken||"",date:o,time:i,service:t.subject,notes:t.message,status:"bevestigd",createdFrom:"email",emailId:t.id};try{await C(s),this.appointments.push(s),await T(e),this.emails=this.emails.filter(r=>r.id!=e)}catch(r){console.error("Error creating appointment:",r),this.appointments.push(s),this.saveData("appointments",this.appointments),this.emails=this.emails.filter(c=>c.id!=e),this.saveData("emails",this.emails)}this.updateStats(),this.renderEmails(),this.renderCalendar(),this.renderAppointments(),this.showNotification(this.translate("appointmentScheduledToday",{time:i}),"success")}async quickPlanTomorrow(e){const a=this.emails.find(r=>r.id==e);if(!a)return;if(this.appointments.find(r=>r.emailId==e)){this.showNotification("Er bestaat al een afspraak voor dit bericht","warning");return}const n=new Date;n.setDate(n.getDate()+1);const o=this.formatDateString(n),i=this.findNextAvailableTime(o),s={id:String(Date.now()),name:a.name,email:a.email,phone:a.phone,kenteken:a.kenteken||"",date:o,time:i,service:a.subject,notes:a.message,status:"bevestigd",createdFrom:"email",emailId:a.id};try{await C(s),this.appointments.push(s),await T(e),this.emails=this.emails.filter(r=>r.id!=e)}catch(r){console.error("Error creating appointment:",r),this.appointments.push(s),this.saveData("appointments",this.appointments),this.emails=this.emails.filter(c=>c.id!=e),this.saveData("emails",this.emails)}this.updateStats(),this.renderEmails(),this.renderCalendar(),this.renderAppointments(),this.showNotification(this.translate("appointmentScheduledTomorrow",{time:i}),"success")}findNextAvailableTime(e){const a=["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"],t=this.appointments.filter(n=>n.date===e&&n.status!=="afgerond");for(let n of a)if(!t.some(i=>i.time===n))return n;return"17:00"}markAsRead(e){const a=this.emails.find(t=>t.id==e);a&&(a.read=!0,this.saveData("emails",this.emails),this.renderEmails(),this.updateStats())}archiveEmail(e){this.showConfirmDialog("Weet je zeker dat je deze aanvraag wilt afwijzen?",()=>{this.emails=this.emails.filter(a=>a.id!=e),this.saveData("emails",this.emails),this.renderEmails(),this.updateStats(),this.showNotification(this.translate("requestRejectedDeleted"))})}showEmailDetails(e){const a=this.emails.find(r=>r.id==e);if(!a)return;a.read=!0,this.saveData("emails",this.emails),this.updateStats(),this.renderEmails();const t=document.getElementById("appointment-modal"),n=document.getElementById("modal-title"),o=document.getElementById("modal-body"),s=new Date(a.created_at).toLocaleDateString("nl-NL",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"});n.textContent=`${this.translate("requestFrom")} ${a.name}`,o.innerHTML=`
      <div class="detail-grid">
        <div class="detail-row">
          <span class="detail-label">${this.translate("name")}</span>
          <span class="detail-value">${a.name}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${this.translate("email")}</span>
          <span class="detail-value">${a.email}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${this.translate("phone")}</span>
          <span class="detail-value">${a.phone||"-"}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${this.translate("licensePlate")}</span>
          <span class="detail-value">${a.kenteken||"-"}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${this.translate("subject")}</span>
          <span class="detail-value">${a.subject}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${this.translate("receivedOn")}</span>
          <span class="detail-value">${s}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${this.translate("message")}</span>
          <div class="detail-value message-box">${a.message}</div>
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="action-btn primary" onclick="dashboard.quickPlanToday('${a.id}'); document.getElementById('appointment-modal').classList.remove('active');">
          ${this.translate("acceptScheduleToday")}
        </button>
        <button class="action-btn secondary" onclick="dashboard.createAppointmentFromEmail('${a.id}')">
          ${this.translate("chooseDate")}
        </button>
        <button class="action-btn danger" onclick="dashboard.archiveEmail('${a.id}'); document.getElementById('appointment-modal').classList.remove('active');">
          ${this.translate("reject")}
        </button>
      </div>
    `,t.classList.add("active")}setupModal(){const e=document.getElementById("appointment-modal");document.getElementById("modal-close").addEventListener("click",()=>{e.classList.remove("active")}),e.addEventListener("click",o=>{o.target===e&&e.classList.remove("active")});const t=document.getElementById("day-appointments-modal"),n=document.getElementById("day-modal-close");t&&n&&(n.addEventListener("click",()=>{t.classList.remove("active")}),t.addEventListener("click",o=>{o.target===t&&t.classList.remove("active")}))}showDayAppointmentsModal(e,a){const t=document.getElementById("day-appointments-modal"),n=document.getElementById("day-modal-title"),o=document.getElementById("day-modal-body");if(!t||!n||!o)return;const[i,s,r]=e.split("-").map(Number),u=new Date(i,s-1,r).toLocaleDateString(this.getLocale(),{weekday:"long",year:"numeric",month:"long",day:"numeric"});n.textContent=`${this.translate("appointmentsOn")} ${u}`;const l=[...a].sort((m,v)=>{const y=m.time.split(":").map(Number),h=v.time.split(":").map(Number);return y[0]*60+y[1]-(h[0]*60+h[1])});let p='<div class="day-appointments-list">';l.forEach(m=>{const v=this.getStatusText(m.status);p+=`
        <div class="day-appointment-item" data-id="${m.id}">
          <div class="day-appointment-time">${m.time}</div>
          <div class="day-appointment-details">
            <div class="day-appointment-name">${m.name}</div>
            <div class="day-appointment-info">
              <span class="status-badge ${m.status}">${v}</span>
              ${m.service?`<span class="day-appointment-subject">${m.service}</span>`:""}
            </div>
          </div>
          <button class="day-appointment-view" onclick="dashboard.showAppointmentModal('${m.id}')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      `}),p+="</div>",o.innerHTML=p,t.classList.add("active")}showAppointmentModal(e,a=!1){const t=this.appointments.find(v=>v.id==e);if(!t)return;const n=document.getElementById("day-appointments-modal");n&&n.classList.remove("active");const o=document.getElementById("appointment-modal"),i=document.getElementById("modal-title"),s=document.getElementById("modal-body"),[r,c,u]=t.date.split("-").map(Number),p=new Date(r,c-1,u).toLocaleDateString("nl-NL",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),m={"nieuwe-aanvraag":this.translate("statusNew"),bevestigd:this.translate("statusConfirmed"),"in-behandeling":this.translate("statusInProgress"),afgerond:this.translate("statusCompleted")}[t.status];i.textContent=a?this.translate("edit")+" - "+t.name:`${this.translate("appointmentDetails")} - ${t.name}`,a?s.innerHTML=`
        <div class="detail-grid">
          <div class="detail-row">
            <span class="detail-label">${this.translate("status")}</span>
            <span class="status-badge ${t.status}">${m}</span>
          </div>
          <div class="detail-row">
            <label class="detail-label" for="edit-name">${this.translate("name")}</label>
            <input type="text" id="edit-name" class="form-control" value="${t.name}" required>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("email")}</span>
            <span class="detail-value">${t.email||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("phone")}</span>
            <span class="detail-value">${t.phone||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("licensePlate")}</span>
            <span class="detail-value">${t.kenteken||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("service")}</span>
            <span class="detail-value">${t.service||"-"}</span>
          </div>
          <div class="detail-row">
            <label class="detail-label" for="edit-date">${this.translate("date")}</label>
            <input type="date" id="edit-date" class="form-control" value="${t.date}" required>
          </div>
          <div class="detail-row">
            <label class="detail-label" for="edit-time">${this.translate("time")}</label>
            <input type="time" id="edit-time" class="form-control" value="${t.time}" required>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("notes")}</span>
            <div class="detail-value message-box">${t.notes||""}</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="action-btn primary" onclick="dashboard.saveAppointmentChanges('${t.id}')">
            ${this.translate("save")}
          </button>
          <button class="action-btn secondary" onclick="dashboard.showAppointmentModal('${t.id}', false)">
            ${this.translate("cancel")}
          </button>
        </div>
      `:s.innerHTML=`
        <div class="detail-grid">
          <div class="detail-row">
            <span class="detail-label">${this.translate("status")}</span>
            <span class="status-badge ${t.status}">${m}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("name")}</span>
            <span class="detail-value">${t.name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("email")}</span>
            <span class="detail-value">${t.email||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("phone")}</span>
            <span class="detail-value">${t.phone||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("licensePlate")}</span>
            <span class="detail-value">${t.kenteken||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("service")}</span>
            <span class="detail-value">${t.service||"-"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("date")}</span>
            <span class="detail-value">${p}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("time")}</span>
            <span class="detail-value">${t.time}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate("message")}</span>
            <div class="detail-value message-box">${t.notes||""}</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="action-btn secondary" onclick="dashboard.showAppointmentModal('${t.id}', true)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            ${this.translate("edit")}
          </button>
          ${t.status==="nieuwe-aanvraag"?`
            <button class="action-btn primary" onclick="dashboard.updateAppointmentStatus('${t.id}', 'bevestigd')">
              ${this.translate("confirm")}
            </button>
          `:""}
          ${t.status==="bevestigd"?`
            <button class="action-btn primary" onclick="dashboard.updateAppointmentStatus('${t.id}', 'in-behandeling')">
              ${this.translate("statusInProgress")}
            </button>
          `:""}
          ${t.status==="in-behandeling"?`
            <button class="action-btn primary" onclick="dashboard.updateAppointmentStatus('${t.id}', 'afgerond')">
              ${this.translate("completed")}
            </button>
          `:""}
          <button class="action-btn danger" onclick="dashboard.confirmDelete('${t.id}')">
            ${this.translate("delete")}
          </button>
        </div>
      `,o.classList.add("active")}async updateAppointmentStatus(e,a){const t=this.appointments.find(n=>n.id==e);if(t){t.status=a;try{await x(e,{status:a}),await this.loadAllData()}catch(o){console.error("Error updating appointment:",o),this.saveData("appointments",this.appointments)}this.updateStats(),this.renderCalendar(),this.renderAppointments(),this.renderDashboard(),this.showAppointmentModal(e);const n={"nieuwe-aanvraag":this.translate("statusNew"),bevestigd:this.translate("statusConfirmed"),"in-behandeling":this.translate("statusInProgress"),afgerond:this.translate("statusCompleted")}[a];this.showNotification(this.translate("statusUpdated",{status:n}))}}saveAppointmentChanges(e){const a=this.appointments.find(s=>s.id==e);if(!a)return;const t=document.getElementById("edit-name").value.trim(),n=document.getElementById("edit-date").value,o=document.getElementById("edit-time").value;if(!t||!n||!o){this.showNotification(this.translate("fillAllFields"),"error");return}if(this.appointments.some(s=>s.id!=e&&s.date===n&&s.time===o&&s.status!=="afgerond")){this.showConfirmDialog("Er is al een afspraak op deze datum en tijd. Toch opslaan?",()=>{this.performSaveAppointment(a,t,n,o)});return}this.performSaveAppointment(a,t,n,o)}async performSaveAppointment(e,a,t,n){e.name=a,e.date=t,e.time=n;try{await x(e.id,{name:a,date:t,time:n}),await this.loadAllData()}catch(o){console.error("Error updating appointment:",o),this.saveData("appointments",this.appointments)}this.updateStats(),this.renderCalendar(),this.renderAppointments(),this.renderDashboard(),this.showAppointmentModal(e.id,!1),this.showNotification(this.translate("appointmentUpdated"))}confirmDelete(e){this.showConfirmDialog(this.translate("deleteAppointmentConfirm"),()=>{this.deleteAppointment(e)})}async deleteAppointment(e){try{await W(e),this.appointments=this.appointments.filter(t=>t.id!=e)}catch(t){console.error("Error deleting appointment:",t),this.appointments=this.appointments.filter(n=>n.id!=e),this.saveData("appointments",this.appointments)}document.getElementById("appointment-modal").classList.remove("active"),this.updateStats(),this.renderCalendar(),this.renderAppointments(),this.renderDashboard(),this.showNotification(this.translate("appointmentDeleted"))}async archiveEmail(e){this.showConfirmDialog(this.translate("deleteEmailConfirm"),async()=>{try{await T(e),this.emails=this.emails.filter(a=>a.id!=e)}catch(a){console.error("Error deleting email:",a),this.emails=this.emails.filter(t=>t.id!=e),this.saveData("emails",this.emails)}this.renderEmails(),this.updateStats(),this.showNotification(this.translate("emailDeleted"))})}setupSettings(){const e=document.getElementById("clear-data-btn"),a=document.getElementById("import-ics-btn"),t=document.getElementById("ics-file-input");a&&t&&(a.addEventListener("click",()=>{t.click()}),t.addEventListener("change",async n=>{const o=n.target.files[0];if(!o)return;const i=document.getElementById("import-status");try{const s=await o.text(),r=this.parseICalendar(s);if(r.length>0)try{await H(r),this.workDays=r,this.renderCalendar(),i&&(i.textContent=`✓ ${r.length} werkdagen geïmporteerd`,i.style.color="#10B981",setTimeout(()=>i.textContent="",5e3)),this.showNotification(this.translate("workDaysAdded",{count:r.length}))}catch(c){console.error("Database error:",c),this.workDays=r,this.saveData("workDays",this.workDays),this.renderCalendar(),i&&(i.textContent=`✓ ${r.length} werkdagen geïmporteerd (lokaal)`,i.style.color="#10B981",setTimeout(()=>i.textContent="",5e3))}else i&&(i.textContent="✗ Geen gebeurtenissen gevonden",i.style.color="#EF4444",setTimeout(()=>i.textContent="",5e3));t.value=""}catch(s){console.error("Error importing iCalendar:",s),i&&(i.textContent="✗ Fout bij importeren",i.style.color="#EF4444",setTimeout(()=>i.textContent="",5e3))}})),e&&e.addEventListener("click",()=>{this.showConfirmDialog(this.translate("clearAllDataConfirm"),()=>{localStorage.removeItem("ash_appointments"),localStorage.removeItem("ash_emails"),this.appointments=[],this.emails=[],this.updateStats(),this.renderCalendar(),this.renderAppointments(),this.renderEmails(),this.renderDashboard(),this.showNotification(this.translate("allDataCleared"))})})}parseICalendar(e){const a=[],t=e.split(/\r\n|\n|\r/);let n=null;for(let o=0;o<t.length;o++){const i=t[o].trim();if(i==="BEGIN:VEVENT")n={};else if(i==="END:VEVENT"&&n)n.start&&n.description&&a.push({date:n.start,shift:n.description,startTime:n.startTime,endTime:n.endTime}),n=null;else if(n)if(i.startsWith("DTSTART")){const s=i.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);s&&(n.start=`${s[1]}-${s[2]}-${s[3]}`,n.startTime=`${s[4]}:${s[5]}`)}else if(i.startsWith("DTEND")){const s=i.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);s&&(n.endTime=`${s[4]}:${s[5]}`)}else i.startsWith("DESCRIPTION:")&&(n.description=i.substring(12))}return a}showConfirmDialog(e,a){const t=document.querySelector(".confirm-dialog");t&&t.remove();const n=document.createElement("div");n.className="confirm-dialog",n.innerHTML=`
      <div class="confirm-dialog-content">
        <div class="confirm-dialog-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3>${this.translate("confirmation")}</h3>
        <p>${e}</p>
        <div class="confirm-dialog-actions">
          <button class="action-btn secondary" id="confirm-cancel">${this.translate("cancel")}</button>
          <button class="action-btn danger" id="confirm-yes">${this.translate("yesContinue")}</button>
        </div>
      </div>
    `,document.body.appendChild(n),setTimeout(()=>n.classList.add("show"),10),document.getElementById("confirm-cancel").addEventListener("click",()=>{n.classList.remove("show"),setTimeout(()=>n.remove(),300)}),document.getElementById("confirm-yes").addEventListener("click",()=>{n.classList.remove("show"),setTimeout(()=>n.remove(),300),a()}),n.addEventListener("click",o=>{o.target===n&&(n.classList.remove("show"),setTimeout(()=>n.remove(),300))})}updateStats(){const e=this.appointments.length,a=this.appointments.filter(m=>m.status==="afgerond").length,t=this.emails.length,n=this.emails.filter(m=>!m.read).length,o=this.appointments.filter(m=>m.status!=="afgerond").length;document.getElementById("stat-total-appointments").textContent=e,document.getElementById("stat-completed").textContent=a,document.getElementById("stat-total-emails").textContent=t,document.getElementById("stat-unread-emails").textContent=n;const i=document.getElementById("appointments-badge"),s=document.getElementById("emails-badge");i&&(i.textContent=o,i.style.display=o>0?"inline-block":"none"),s&&(s.textContent=n,s.style.display=n>0?"inline-block":"none");const r=this.formatDateString(new Date),c=this.appointments.filter(m=>m.date===r&&m.status!=="afgerond").length,u=document.getElementById("quick-new-emails"),l=document.getElementById("quick-today-appointments"),p=document.getElementById("quick-pending");u&&(u.textContent=n||""),l&&(l.textContent=c||""),p&&(p.textContent=newRequests||"")}showNewEmailsOnly(){document.querySelectorAll(".nav-item").forEach(e=>e.classList.remove("active")),document.querySelectorAll(".content-section").forEach(e=>e.classList.remove("active")),document.querySelector('[data-section="emails"]').classList.add("active"),document.getElementById("section-emails").classList.add("active"),this.renderEmails(),setTimeout(()=>{const e=document.querySelector(".email-card.unread");e&&e.scrollIntoView({behavior:"smooth",block:"center"})},100)}showTodayAppointments(){document.querySelectorAll(".nav-item").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".content-section").forEach(t=>t.classList.remove("active")),document.querySelector('[data-section="appointments"]').classList.add("active"),document.getElementById("section-appointments").classList.add("active");const e=document.getElementById("date-filter"),a=document.getElementById("status-filter");e&&(e.value="today"),a&&(a.value="all"),this.renderAppointments()}showCompletedAppointments(){document.querySelectorAll(".nav-item").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".content-section").forEach(a=>a.classList.remove("active")),document.querySelector('[data-section="appointments"]').classList.add("active"),document.getElementById("section-appointments").classList.add("active");const e=document.getElementById("status-filter");e&&(e.value="afgerond",this.renderAppointments("afgerond"))}showPendingActions(){document.querySelectorAll(".nav-item").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".content-section").forEach(t=>t.classList.remove("active")),document.querySelector('[data-section="appointments"]').classList.add("active"),document.getElementById("section-appointments").classList.add("active"),document.querySelectorAll(".filter-btn").forEach(t=>t.classList.remove("active"));const a=document.querySelector('[data-filter="nieuwe-aanvraag"]');a&&a.classList.add("active"),this.renderAppointments("nieuwe-aanvraag")}renderDashboard(){const e=this.formatDateString(new Date),a=this.appointments.filter(i=>i.date===e).sort((i,s)=>i.time.localeCompare(s.time)),t=document.getElementById("appointments-today");if(a.length===0)t.innerHTML=`<p class="empty-state">${this.translate("noAppointmentsToday")}</p>`;else{let i="";a.forEach(s=>{const r=this.getStatusText(s.status);i+=`<div class="appointment-item" onclick="dashboard.showAppointmentModal('${s.id}')">
          <div class="item-header">
            <span class="item-title">${s.name}</span>
            <span class="item-time">${s.time}</span>
          </div>
          <div class="item-description">
            <span class="status-badge ${s.status}">${r}</span> - ${s.notes}
          </div>
        </div>`}),t.innerHTML=i}const n=this.emails.slice(0,5),o=document.getElementById("recent-emails");if(n.length===0)o.innerHTML=`<p class="empty-state">${this.translate("noNewEmailsReceived")}</p>`;else{let i="";n.forEach(s=>{const r=new Date(s.created_at),c=this.getTimeAgo(r);i+=`<div class="email-item" onclick="dashboard.createAppointmentFromEmail('${s.id}')">
          <div class="item-header">
            <span class="item-title">${s.name}</span>
            <span class="item-time">${c}</span>
          </div>
          <div class="item-description">${s.subject}</div>
        </div>`}),o.innerHTML=i}}getTimeAgo(e){const t=Math.floor((new Date-e)/1e3);return t<60?"Zojuist":t<3600?`${Math.floor(t/60)} min geleden`:t<86400?`${Math.floor(t/3600)} uur geleden`:`${Math.floor(t/86400)} dagen geleden`}showNotification(e,a="success"){const t=document.querySelector(".dashboard-toast");t&&t.remove();const n=document.createElement("div");n.className=`dashboard-toast toast-${a}`;const o={success:`<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>`,error:`<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>`,warning:`<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>`};n.innerHTML=`
      ${o[a]}
      <span class="toast-message">${e}</span>
      <button class="toast-close" aria-label="Close">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    `,document.body.appendChild(n),setTimeout(()=>n.classList.add("show"),10),n.querySelector(".toast-close").addEventListener("click",()=>{n.classList.remove("show"),setTimeout(()=>n.remove(),300)}),setTimeout(()=>{n.parentElement&&(n.classList.remove("show"),setTimeout(()=>n.remove(),300))},5e3)}}const te=new ee;window.dashboard=te;
