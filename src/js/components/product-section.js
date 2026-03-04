import '../../css/sections/product-section.css';

const defaultProducts = [];

let carouselInterval = null;

export function renderProductSection({
  containerId = 'product-section',
  products = []
} = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = products.length ? products : defaultProducts;
  const url = new URL(window.location.href);
  const selectedId = url.searchParams.get('id') || url.searchParams.get('productId');

  if (selectedId) {
    const product = items.find((item) => String(item.id) === String(selectedId));
    renderProductDetail(container, product);
    return;
  }

  renderProductsGrid(container, items);
}

function renderProductsGrid(container, items) {
  if (!items.length) {
    container.innerHTML = `
      <section class="product-section">
        <div class="products-grid">
          <article class="product-card" style="grid-column: 1 / -1; text-align: center; cursor: default;">
            <div class="product-body" style="padding: 2rem 1.5rem;">
              <h3 class="product-title">Momenteel geen occasions beschikbaar</h3>
           
            </div>
          </article>
        </div>
      </section>
    `;
    return;
  }

  const productsHtml = items.map((product) => {
    const imageHtml = product.image && (product.image.startsWith('/') || product.image.startsWith('http'))
      ? `<img src="${product.image}" alt="${product.brand}" loading="lazy">`
      : (product.image || '🚗');

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-header">
          <div class="product-image">${imageHtml}</div>
          ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        </div>
        <div class="product-body">
          <h3 class="product-title">${product.brand}</h3>
          <div class="product-specs">
            <span class="spec"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3327 1.66602V4.99935M6.66602 1.66602V4.99935" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.8333 3.33398H9.16667C6.02397 3.33398 4.45262 3.33398 3.47631 4.31029C2.5 5.28661 2.5 6.85795 2.5 10.0007V11.6673C2.5 14.81 2.5 16.3814 3.47631 17.3577C4.45262 18.334 6.02397 18.334 9.16667 18.334H10.8333C13.976 18.334 15.5474 18.334 16.5237 17.3577C17.5 16.3814 17.5 14.81 17.5 11.6673V10.0007C17.5 6.85795 17.5 5.28661 16.5237 4.31029C15.5474 3.33398 13.976 3.33398 10.8333 3.33398Z" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.5 8.33398H17.5" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
${product.year}</span>
            <span class="spec"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.71883 10.834L7.55715 12.3443C7.43266 12.5062 7.52188 12.7391 7.72489 12.7822L8.94175 13.0404C9.15825 13.0863 9.24075 13.3442 9.08942 13.5016L7.64811 15.0007" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33398 8.33398H13.334" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33398 17.5V7.5C3.33398 5.14297 3.33398 3.96447 4.06622 3.23223C4.79845 2.5 5.97696 2.5 8.33398 2.5C10.691 2.5 11.8695 2.5 12.6017 3.23223C13.334 3.96447 13.334 5.14297 13.334 7.5V17.5H3.33398Z" stroke="#6F7A8B" stroke-width="1.5"/>
<path d="M1.66602 17.5H14.9993" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.334 11.6667H14.7229C14.9812 11.6667 15.1104 11.6667 15.2163 11.6951C15.5039 11.7721 15.7286 11.9968 15.8056 12.2843C15.834 12.3903 15.834 12.5194 15.834 12.7777V13.75C15.834 14.4403 16.3937 15 17.084 15C17.7743 15 18.334 14.4403 18.334 13.75V8.50925C18.334 8.00832 18.334 7.75784 18.2625 7.52165C18.191 7.28546 18.052 7.07706 17.7742 6.66025L17.1296 5.69337C16.8408 5.26019 16.3546 5 15.834 5" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
${product.km} km</span>
            <span class="spec"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 11.6673L13.3333 8.33398" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.78268 15.8324C2.0512 14.5656 1.66607 13.1285 1.66602 11.6657C1.66596 10.2028 2.05098 8.76576 2.78236 7.49888C3.51375 6.232 4.56574 5.17998 5.83259 4.44854C7.09944 3.7171 8.53651 3.33203 9.99935 3.33203C11.4622 3.33203 12.8993 3.7171 14.1661 4.44854C15.433 5.17998 16.4849 6.232 17.2163 7.49888C17.9477 8.76576 18.3327 10.2028 18.3327 11.6657C18.3326 13.1285 17.9475 14.5656 17.216 15.8324" stroke="#6F7A8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
${product.fuel}</span>
          </div>
          <div class="product-footer">
            <div class="product-price">${product.price}</div>
            <span class="btn-product">Bekijk details<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5 12H5" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = `
    <section class="product-section">
      <div class="products-grid">
        ${productsHtml}
      </div>
    </section>
  `;

  if (!container.dataset.productListener) {
    container.addEventListener('click', (event) => {
      const card = event.target.closest('.product-card');
      if (!card) return;

      const url = new URL(window.location.href);
      url.searchParams.set('id', card.dataset.id);
      window.location.href = url.toString();
    });
    container.dataset.productListener = '1';
  }
}

function renderProductDetail(container, product) {
  if (!product) {
    container.innerHTML = `
      <section class="product-detail-page">
        <a class="back-link" href="${window.location.pathname}"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 12.002H19" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.9999 18.002C10.9999 18.002 5.00001 13.583 5 12.0019C4.99999 10.4208 11 6.00195 11 6.00195" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Terug naar occasions</a>
        <h2>Product niet gevonden</h2>
      </section>
    `;
    return;
  }

  const images = Array.isArray(product.images) && product.images.length
    ? product.images
    : [product.image].filter(Boolean);

  const quickFacts = [
    { label: 'Kilometerstand', value: `${product.km} km` },
    { label: 'Bouwjaar', value: String(product.year) },
    { label: 'Brandstof', value: product.fuel },
    { label: 'Prijs', value: product.price }
  ];

  const quickFactsHtml = quickFacts.map((fact) => `
    <div class="fact-item">
      <span class="fact-label">${fact.label}</span>
      <strong class="fact-value">${fact.value}</strong>
    </div>
  `).join('');

  const detailsHtml = Object.entries(product.details || {}).map(([section, attrs]) => {
    const rows = Object.entries(attrs || {}).map(([key, value]) => `
      <div class="details-row">
        <dt>${key}</dt>
        <dd>${value}</dd>
      </div>
    `).join('');

    return `
      <section class="details-card">
        <h3 class="details-section-title">${section}</h3>
        <dl class="details-list">${rows}</dl>
      </section>
    `;
  }).join('');

  const carouselHtml = images.length ? `
    <div class="product-carousel" data-index="0">
      <div class="carousel-counter"><span class="current">1</span> / <span class="total">${images.length}</span></div>
      <div class="carousel-images">
        ${images.map((image, index) => `
          <img src="${image}" class="carousel-img${index === 0 ? ' active' : ''}" data-index="${index}" alt="${product.brand} ${index + 1}">
        `).join('')}
      </div>
      <div class="carousel-controls">
        <button type="button" class="prev">&lt;</button>
        <button type="button" class="next">&gt;</button>
      </div>
      <div class="carousel-thumbs">
        ${images.map((image, index) => `
          <img src="${image}" class="thumb${index === 0 ? ' active' : ''}" data-index="${index}" alt="Thumbnail ${index + 1}">
        `).join('')}
      </div>
    </div>
  ` : '';

  container.innerHTML = `
    <section class="product-detail-page">
      <a class="back-link" href="${window.location.pathname}"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 12.002H19" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.9999 18.002C10.9999 18.002 5.00001 13.583 5 12.0019C4.99999 10.4208 11 6.00195 11 6.00195" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Terug naar occasions</a>
      <div class="product-detail-top">
        <div class="product-detail-gallery">
          ${carouselHtml}
        </div>
        <aside class="product-detail-summary">
          <div class="product-summary-head">
            <h1 class="product-detail-title">${product.brand}</h1>
            ${product.badge ? `<span class="product-detail-badge">${product.badge}</span>` : ''}
          </div>
          <p class="product-detail-price">${product.price}</p>
          <div class="quick-facts">${quickFactsHtml}</div>
          ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
        </aside>
      </div>
      <div class="product-detail-info">${detailsHtml}</div>
    </section>
  `;

  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }

  if (images.length > 1) {
    setupCarousel(container);
  }
}

function setupCarousel(container) {
  const carousel = container.querySelector('.product-carousel');
  if (!carousel) return;

  const images = carousel.querySelectorAll('.carousel-img');
  const thumbs = carousel.querySelectorAll('.thumb');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  let index = Number(carousel.dataset.index) || 0;

  function showIndex(newIndex) {
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    images.forEach(img => img.classList.remove('active'));
    thumbs.forEach(t => t.classList.remove('active'));
    images[newIndex].classList.add('active');
    thumbs[newIndex].classList.add('active');
    carousel.dataset.index = newIndex;
    index = newIndex;
    // update counter overlay
    const counter = carousel.querySelector('.carousel-counter');
    if (counter) {
      counter.querySelector('.current').textContent = newIndex + 1;
    }
  }

  function next() {
    showIndex(index + 1);
  }

  function prev() {
    showIndex(index - 1);
  }

  // manual controls (use onclick to avoid stacking listeners)
  nextBtn.onclick = next;
  prevBtn.onclick = prev;
  thumbs.forEach(t => {
    t.onclick = (e) => {
      const idx = Number(e.target.dataset.index);
      showIndex(idx);
    };
  });

  if (carouselInterval) {
    clearInterval(carouselInterval);
  }
  carouselInterval = setInterval(next, 5000);
}
