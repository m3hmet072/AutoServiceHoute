export function navbarHtml(baseUrl) {
  const base = baseUrl || import.meta.env.BASE_URL || '/';
  return `
<nav class="navbar">
  <div class="navbar-container">
    <a href="${base}" class="logo-link">
      <div class="logo-text">
        <div class="logo-line1">Autoservice</div>
        <div class="logo-line2">Houte</div>
      </div>
    </a>

    <div class="hamburger" id="hamburger">
      <!-- svg omitted for brevity -->
    </div>

    <ul class="nav-menu" id="navMenu">
      <li><a href="${base}apk.html" class="nav-link">APK</a></li>
      <li><a href="${base}banden.html" class="nav-link">Banden</a></li>
      <li><a href="${base}onderhoud.html" class="nav-link">Onderhoud</a></li>
      <li><a href="${base}airco.html" class="nav-link">Airco</a></li>
      <li><a href="${base}occasions.html" class="nav-link">Occasions</a></li>
      <li><a href="#contact" class="btn btn-primary btn-nav">Afspraak Inplanen</a></li>
    </ul>

    <a href="#contact" class="btn btn-primary btn-nav">Afspraak Inplanen</a>
  </div>
</nav>`;
}

export function setupNavbar(root) {
  const hamburger = root.querySelector('#hamburger');
  const navMenu = root.querySelector('#navMenu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  root.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 900 && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    }, 250);
  });
}

export function loadNavbar() {
  const base = import.meta.env.BASE_URL || '/';
  document.body.insertAdjacentHTML('afterbegin', navbarHtml(base));
  setupNavbar(document.body);
}
