import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/ScrollTrigger.js";

if (document.querySelector('.section-methode-3') && window.innerWidth >= 991) {

    /* =========================
    1. Injection CSS
    ========================= */
    const style = document.createElement("style");
    style.innerHTML = `
    .methodologies-audit-wrapper {
            display: flex;
            gap: 7rem;
            align-items: flex-start;
        }

        .methodologies-audit-wrapper-left {
            position: sticky;
            top: 10rem;
                flex: 25%;
            min-height: 580px;
        }

        .methodologie-item-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .methodologie-item-image.active {
            opacity: 1 !important;
            z-index: 2;
        }

        .methodologies-audit-wrapper-right {
            flex: 75%;
            display: flex;
            flex-direction: column;
            gap: 3rem;
        }

        .methodologie-item {
            transition: opacity 0.3s ease;
        }

        .methodologie-item p.medium-reg {
            opacity: 0;
            visibility: hidden;
            height: 0;
            transition: height 0.3 ease;
        }

        .methodologie-item .margin-bottom.margin-40 {
            margin-bottom: 0;
        }


        .methodologie-item.active p.medium-reg {
            opacity: 1;
            visibility: visible;
            height: auto;
        }

        .methodologie-item .margin-bottom.margin-40 {
            margin-bottom: 0px;
        }


    `;
    document.head.appendChild(style);

    /* =========================
    2. GSAP Logic
    ========================= */
    (async function() {
        try {
            gsap.registerPlugin(ScrollTrigger);

            const items = document.querySelectorAll(
                '.methodologies-audit-wrapper-right .methodologie-item'
            );
            const images = document.querySelectorAll(
                '.methodologies-audit-wrapper-left .methodologie-item-image'
            );
            const compteur = document.querySelector('#compteur-dynamique');
            const wrapperRight = document.querySelector('.methodologies-audit-wrapper-right');

            ScrollTrigger.create({
                trigger: wrapperRight, // On observe la colonne droite
                start: 'top top', // Au début de la colonne
                end: 'bottom bottom', // À la fin de la colonne
                pin: compteur, // Pin du compteur
                pinSpacing: true, // Laisse l'espace pour que le layout ne casse pas
            });


            if (!items.length || !images.length) return;

            // État initial
            images.forEach((img, i) => {
                img.style.opacity = i === 0 ? '1' : '0';
                if (i === 0) img.classList.add('active');
            });

            items.forEach((item, i) => {
                item.style.opacity = i === 0 ? '1' : '0.4';
                item.classList.toggle('active', i === 0);
            });

            /* =========================
            3. ScrollTriggers
            ========================= */
            items.forEach((item, i) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: 'top center',
                    end: 'bottom center',

                    onEnter: () => activateStep(i),
                    onEnterBack: () => activateStep(i)
                });
            });

            function activateStep(index) {
                // Images
                images.forEach((img, i) => {
                    img.classList.toggle('active', i === index);
                });

                // Items opacity
                items.forEach((el, i) => {
                    el.style.opacity = i === index ? '1' : '0.4';
                    el.classList.toggle('active', i === index);
                });
            }

        } catch (err) {
            console.error('GSAP / ScrollTrigger error', err);
        }
    })();
}