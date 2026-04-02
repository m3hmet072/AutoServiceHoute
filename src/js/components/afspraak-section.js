import '../../css/sections/afspraak-section.css';

export function renderAfspraakSection() {
  const afspraakContainer = document.getElementById('afspraak-section');
  if (!afspraakContainer) return;

  afspraakContainer.innerHTML = `
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
        <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;pointer-events:none;" />

        <div class="form-group"><input type="text" id="naam" name="naam" placeholder="Uw naam" required></div>
        <div class="form-group"><input type="email" id="email" name="email" placeholder="Uw e-mailadres" required></div>

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

        <div class="form-group"><input type="text" id="custom-service" name="onderwerp_custom" placeholder="Omschrijf uw servicevraag" hidden disabled></div>

        <div class="form-group"><input type="tel" id="telefoon" name="telefoon" placeholder="Telefoonnummer"></div>
        <div class="form-group"><textarea id="bericht" name="bericht" rows="3" placeholder="Type uw bericht hier..." required minlength="10"></textarea></div>
        <button type="submit" id="submit-btn" class="btn-afspraak">Bevestig afspraak <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5 12H5" stroke="#F5F8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="#F5F8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  </div>
</section>
  `;
}
