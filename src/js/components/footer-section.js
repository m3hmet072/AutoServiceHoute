import '../../css/footer.css';

export function renderFooterSection() {
  const footerContainer = document.getElementById('footer-section');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
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
        <h4>Paginas</h4>
        <a href="#">Homepage</a>
        <a href="apk.html">APK Keuring</a>
        <a href="airco.html">Airconditioning</a>
        <a href="banden.html">Banden Service</a>
        <a href="occasions.html">Occasions</a>
      </div>

      <!-- Contact Info -->
      <div class="footer-nav">
        <h4>Contact</h4>
        <a href="mailto:Autoservicehoute@hotmail.com">Autoservicehoute@hotmail.com</a>
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
  `;
}
