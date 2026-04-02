import '../css/base.css'
import '../css/navbar.css'
import '../css/components.css'
import '../css/sections/hero-section.css'
import '../css/sections/afspraak-section.css'
import '../css/sections/diensten-section.css'
import '../css/sections/score-section.css'
import '../css/sections/pricing-section.css'
import '../css/sections/controle-section.css'
import '../css/sections/stappen-section.css'
import '../css/pages/home.css'
import '../css/pages/contact.css'
import '../css/footer.css'


import { loadNavbar } from './navbar'
import { initContactForm } from './contact-form'
import { renderHeroSection } from './components/hero-section'
import { renderScoreSection } from './components/score-section'
import { renderDienstenSection } from './components/diensten-section'
import { renderPricingSection } from './components/pricing-section'
import { renderControleSection } from './components/controle-section'
import { renderStappenSection } from './components/stappen-section'
import { renderAfspraakSection } from './components/afspraak-section'
import { renderFooterSection } from './components/footer-section'

loadNavbar()

// Render sections on page load
document.addEventListener('DOMContentLoaded', () => {
  renderHeroSection()
  renderPricingSection()
  renderControleSection()
  renderStappenSection()
  renderScoreSection()
  renderDienstenSection()
  renderAfspraakSection()
  renderFooterSection()
  initContactForm()
})
