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
import '../css/sections/onderhoud-section.css'
import '../css/pages/home.css'
import '../css/pages/contact.css'
import '../css/footer.css'

import { loadNavbar } from './navbar';
import { initContactForm } from './contact-form';
import { renderFooterSection } from './components/footer-section';
import { renderHeroSection } from './components/hero-section';
import { renderPricingSection } from './components/pricing-section';
import { renderQuestionSection } from './components/question-section';
import { renderControleSection } from './components/controle-section';
import { renderStappenSection } from './components/stappen-section';
import { renderAfspraakSection } from './components/afspraak-section';
import { renderOnderhoudsection } from './components/onderhoud-section';

window.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    renderHeroSection({
        omitImage: true,
        // custom title: first line dark, second line in accent color
        titleHtml: `Onderhoud dat<br><span class="accent">uw auto verdient</span>`,
        badgeText: 'Volgens fabrieksvoorschriften',
        subtitle: 'Regelmatig onderhoud voorkomt dure reparaties en houdt uw auto betrouwbaar. Wij werken volgens fabrieksrichtlijnen, zonder de dealerprijs.',
        btnAfspraakText: 'APK inplannen',
        btnBelText: 'Bellen',
        pageClass: 'hero--center'
    });
    renderOnderhoudsection({
        title: 'Soorten Onderhoud',
        subtitle: 'ONDERHOUDSPAKKETTEN',
        cards: [
            {
                title: 'Kleine Beurt',
                price: 'Prijs op aanvraag',
                subtitle: 'Olie en filtervervangen, vloeistoffen bijvullen en basiscontrole.',
                minutes: '±45 min',
                reviews: '5.0 reviews',
                buttontext: 'Direct inplannen',
                svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 11L18 6" stroke="#0082FB" stroke-width="1.5"/>
<path d="M19 7L17 5L19.5 3.5L20.5 4.5L19 7Z" stroke="#0082FB" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M4.02513 8.97487C3.01416 7.96391 2.75095 6.48836 3.23548 5.23548L4.65748 6.65748H6.65748V4.65748L5.23548 3.23548C6.48836 2.75095 7.96391 3.01416 8.97487 4.02513C9.98621 5.03647 10.2493 6.51274 9.76398 7.76593L16.2341 14.236C17.4873 13.7507 18.9635 14.0138 19.9749 15.0251C20.9858 16.0361 21.2491 17.5116 20.7645 18.7645L19.3425 17.3425H17.3425V19.3425L18.7645 20.7645C17.5116 21.2491 16.0361 20.9858 15.0251 19.9749C14.0145 18.9643 13.7511 17.4895 14.2349 16.2369L7.76312 9.76507C6.51053 10.2489 5.03571 9.98546 4.02513 8.97487Z" stroke="#0082FB" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M12.203 14.5L6.59897 20.1041C6.07115 20.6319 5.2154 20.6319 4.68758 20.1041L3.89586 19.3124C3.36805 18.7846 3.36805 17.9288 3.89586 17.401L9.49994 11.7969" stroke="#0082FB" stroke-width="1.5" stroke-linejoin="round"/>
</svg>
`
            },
            {
                title: 'Grote Beurt',
                price: 'Prijs op aanvraag',
                subtitle: 'Complete onderhoudsbeurt volgens fabrieksvoorschriften. Inclusief alle filters en vloeistoffen.',
                minutes: '±90 min',
                reviews: '5.0 reviews',
                buttontext: 'Direct inplannen',
                svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.3584 13.3567C19.1689 14.546 16.9308 14.4998 13.4992 14.4998C11.2914 14.4998 9.50138 12.7071 9.50024 10.4993C9.50024 7.07001 9.454 4.83065 10.6435 3.64138C11.8329 2.45212 12.3583 2.50027 17.6274 2.50027C18.1366 2.49809 18.3929 3.11389 18.0329 3.47394L15.3199 6.18714C14.6313 6.87582 14.6294 7.99233 15.3181 8.68092C16.0068 9.36952 17.1234 9.36959 17.8122 8.68109L20.5259 5.96855C20.886 5.60859 21.5019 5.86483 21.4997 6.37395C21.4997 11.6422 21.5479 12.1675 20.3584 13.3567Z" stroke="#F5F8FF" stroke-width="1.5"/>
<path d="M13.5 14.5L7.32842 20.6716C6.22386 21.7761 4.433 21.7761 3.32843 20.6716C2.22386 19.567 2.22386 17.7761 3.32843 16.6716L9.5 10.5" stroke="#F5F8FF" stroke-width="1.5" stroke-linecap="round"/>
<path d="M5.50896 18.5H5.5" stroke="#F5F8FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
            },
            {
                title: 'Airco bijvullen',
                price: `<span class="primary">R134</span><span class="secondary">/€80</span><br><span class="primary">1234YF</span><span class="secondary">/€120</span>`,

                subtitle: '',
                minutes: '±60 min',
                reviews: '5.0 reviews',
                buttontext: 'Direct inplannen',
                svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 5.94145C5.5 9.37313 10.5755 7.90241 11.7324 5.94145C11.9026 5.65301 12 5.31814 12 4.96096C12 3.87795 11.1046 3 10 3C8.89543 3 8 3.87795 8 4.96096" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round"/>
<path d="M17 8.92814C17 7.31097 18.1193 6 19.5 6C20.8807 6 22 7.31097 22 8.92814C22 9.6452 21.7799 10.3021 21.4146 10.8111C19.3463 14.1915 9.2764 12.9164 4 11.8563" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round"/>
<path d="M13.0854 19.8873C13.2913 20.5356 13.8469 21 14.5 21C15.3284 21 16 20.2528 16 19.331C16 19.0176 15.9224 18.7244 15.7873 18.4738C14.4999 15.9925 7.99996 14.3239 2 18.7746" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round"/>
<path d="M19 15.5H21" stroke="#0082FB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
            }
        ]
    });
    renderControleSection({
        serviceTitle: 'INBEGREPEN',
        className: 'bg',
        title: 'Wat zit er in een grote beurt?',
        subtitle: 'Tijdens de APK worden alle wettelijk verplichte onderdelen grondig geïnspecteerd.',
        noShadow: true,
        items: [
            'Motorolie verversen',
            'Oliefilter vervangen',
            'Luchtfilter controleren',
            'Remmen inspecteren',
            'Vloeistoffen bijvullen',
            'gloeibougies controleren',
            'Distributieriem check',
            'Algemene veiligheidscontrole'
        ]
    });

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
                title: 'Hoe vaak moet ik een onderhoudsbeurt laten doen?',
                answer: 'Wij adviseren minimaal één keer per jaar of elke 15.000–20.000 km, afhankelijk van het merk en model.'
            },
        ]
    });

    renderAfspraakSection();
    initContactForm();
    renderFooterSection();
});
