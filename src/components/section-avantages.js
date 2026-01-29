import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/ScrollTrigger.js";

if (document.querySelector('.section-avantage') 
    && document.querySelector('.images-avantages-wrapper')
    && window.innerWidth >= 991
) {

    const style = document.createElement("style");
    style.innerHTML = `
        body > div.page-wrapper > main > section.section-avantage > div > div > div > div.pin-spacer > div {
            min-height: 63rem;
            position: relative;
        }

        body > div.page-wrapper > main > section.section-avantage > div > div > div > div.pin-spacer > div::after {
            content: "";
            position: absolute;
            bottom: -14%;
            background: linear-gradient(180deg, rgba(241, 245, 250, 0.00) 0%, #F1F5FA 50%);
            width: 100vw;
            height: 30rem;
            transform: translateX(100rem);
            right: 0;
            z-index: 2;
        }
        .avantages-anim-wrapper {
            display: grid;
            position: relative;
            height: 1650px;
        }

        /* COLONNE GAUCHE - qui sera pinnée */
        .avantages-anim-wrapper > div:first-child {
            flex: 0 0 45%; /* ajuste selon tes besoins */
            position: relative;
        }

        .title-info-avantage {
            margin-bottom: 2rem;
        }

        .images-avantages-wrapper {
            position: relative;
            min-height: 580px;
        }

        .image-avantage-item {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            transition: opacity 0.3s ease;
        }

        .image-avantage-item.active {
            opacity: 1;
            z-index: 2;
        }

        /* COLONNE DROITE - qui scroll */
        .avantages-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            position: relative;
            top: 8rem;
        }

        .avantage-wrapper {
            opacity: 0.4;
            transition: opacity 0.3s ease;
        }

        .avantage-wrapper.active {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Charger GSAP et ScrollTrigger
    (async function() {
        try {
            gsap.registerPlugin(ScrollTrigger);

            const animWrapper = document.querySelector('.avantages-anim-wrapper');
            const items = document.querySelectorAll('.avantages-wrapper .avantage-wrapper');
            const images = document.querySelectorAll('.images-avantages-wrapper .image-avantage-item');
            const avantagesWrapper = document.querySelector('.avantages-wrapper');

            if (!items.length || !animWrapper) return;

            // Afficher la première image par défaut
            if (images[0]) images[0].classList.add('active');
            if (items[0]) items[0].classList.add('active');

            // PINNING de toute la section .avantages-anim-wrapper
            ScrollTrigger.create({
                trigger: animWrapper,
                start: 'top top+=110px', // commence à épingler quand le haut arrive à 100px du haut
                end: () => `bottom ${window.innerHeight * 0.60}px`,
                pin: '.avantages-anim-wrapper > div:first-child', // pin la colonne gauche
                pinSpacing: false,
                anticipatePin: 1,
                markers: false // mettre à true pour débugger
            });

            // Animation synchronisée images/contenus
            items.forEach((item, i) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: () => `top ${window.innerHeight * 0.5}px`,
                    end: () => `bottom ${window.innerHeight * 0.6}px`,
                    onEnter: () => {
                        // Active image
                        images.forEach(img => img.classList.remove('active'));
                        if (images[i]) images[i].classList.add('active');
                        
                        // Active item
                        items.forEach(el => el.classList.remove('active'));
                        item.classList.add('active');
                    },
                    onEnterBack: () => {
                        images.forEach(img => img.classList.remove('active'));
                        if (images[i]) images[i].classList.add('active');
                        
                        items.forEach(el => el.classList.remove('active'));
                        item.classList.add('active');
                    }
                });
            });

        } catch (err) {
            console.error('Erreur lors du chargement de GSAP ou ScrollTrigger', err);
        }
    })();
}