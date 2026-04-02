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
import '../css/sections/product-section.css'
import '../css/pages/home.css'
import '../css/pages/contact.css'
import '../css/footer.css'

import { loadNavbar } from './navbar'
import { initContactForm } from './contact-form'
import { renderFooterSection } from './components/footer-section'
import { renderHeroSection } from './components/hero-section'
import { renderPricingSection } from './components/pricing-section'
import { renderControleSection } from './components/controle-section'
import { renderQuestionSection } from './components/question-section'
import { renderStappenSection } from './components/stappen-section'
import { renderAfspraakSection } from './components/afspraak-section'
import { renderProductSection } from './components/product-section'

window.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location.href)
  const isProductDetail = Boolean(url.searchParams.get('id') || url.searchParams.get('productId'))

    loadNavbar()

  if (!isProductDetail) {
    renderHeroSection({
      omitImage: true,
      // custom title: first line dark, second line in accent color
      titleHtml: `Betrouwbare<br><span class="accent">tweedehands auto's</span>`,
      badgeText: 'Gecertificeerde occasions',
      subtitle: 'Elke occasion is grondig gekeurd, inclusief garantie en APK. Rijdt u vandaag nog weg.',
      btnAfspraakText: 'Advies krijgen',
      btnBelText: 'Bellen',
      pageClass: 'hero--center'
    })
  }

    renderProductSection()
    renderPricingSection()
    renderControleSection()
 
  if (!isProductDetail) {
    renderStappenSection({
      serviceTitle: 'HOE WERKT HET?',
      title: 'In 4 stappen uw nieuwe auto',
      subtitle: '',
      steps: [
        { number: 1, title: 'Bekijken', subtitle: 'Blader door ons aanbod of bel ons voor persoonlijk advies..' },
        { number: 2, title: 'Proefrijden', subtitle: 'Maak een afspraak en ervaar de auto zelf op de weg.' },
        { number: 3, title: 'Inruilen', subtitle: 'Heeft u een auto? Wij doen u een eerlijk inruilvoorstel.' },
        { number: 4, title: 'Rijden', subtitle: 'Wij regelen alles: tenaamstelling, verzekering en aflevering.' }
      ]
    })

    renderAfspraakSection()
    initContactForm()
  }
   renderQuestionSection({
          title: 'Goed om te weten',
          subtitle: 'VEELGESTELDE VRAGEN',
          svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 9V13.5" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 16.9922V17.0022" stroke="#0082FB" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,
          questions: [
              {
                  title: 'Kan ik mijn huidige auto inruilen?',
                  answer: 'Ja! Wij bieden een eerlijke inruilprijs op basis van actuele marktwaarden. Neem uw auto mee voor een vrijblijvende taxatie.'
              },
              {
                  title: 'Bieden jullie financiering aan?',
                  answer: 'Ja, wij werken samen met meerdere financieringspartners. Wij helpen u graag met een passende oplossing, van lening tot private lease.'
              },
               {
                  title: 'Hoelang is de garantie geldig?',
                  answer: 'Standaard leveren wij minimaal 6 maanden BOVAG-garantie. Uitbreiding tot 24 maanden is mogelijk tegen een meerprijs.'
              },
               {
                  title: 'Kan ik een proefrit maken?',
                  answer: 'Absoluut! Maak een afspraak en u kunt de auto rustig uitproberen. Neem gerust iemand mee voor een second opinion.'
              }
          ]
      })

    renderFooterSection()
})
