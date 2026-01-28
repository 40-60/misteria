import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/ScrollTrigger.js";
if (document.querySelector('.section-avantage')
    && document.querySelector('.images-avantages-wrapper')
    && window.innerWidth >= 991) {
    const style = document.createElement("style");
    style.innerHTML = `
            .title-info-avantage {
                z-index: 0;
            }
            .avantages-anim-wrapper {
                display: flex;
                gap: 2rem;
                position: relative;
                align-items: flex-start; /* aligne le contenu et l'image en haut */
            }

            .images-avantages-wrapper {
                position: sticky;
                top: 15rem; /* ajuste selon ton header */
                flex: 1;
                min-height: 580px; /* hauteur minimale */
            }

            .image-avantage-item {
                opacity: 0;
                position: absolute; /* nécessaire pour superposer les images */
                top: 0; /* aligné en haut de la zone sticky */
                left: 0;
                width: 100%;
                transition: opacity 0.3s ease;
            }

            .image-avantage-item.active {
                opacity: 1;
                z-index: 2;
            }

            .avantages-wrapper {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 2rem; /* espace entre les items */
            }

        `;
    document.head.appendChild(style);
    // Charger GSAP et ScrollTrigger, puis lancer le code
    (async function () {
        try {
            // Enregistrer ScrollTrigger
            gsap.registerPlugin(ScrollTrigger);
            // Sélection des éléments
            const items = document.querySelectorAll('.avantages-wrapper .avantage-wrapper');
            const images = document.querySelectorAll('.images-avantages-wrapper .image-avantage-item');
            const titleInfo = document.querySelector('.title-info-avantage');
            if (!items)
                return;
            // Rendre le titre sticky via CSS
            titleInfo.style.position = 'sticky';
            titleInfo.style.top = '7rem';
            // titleInfo.style.zIndex = '10';
            // Afficher la première image par défaut
            if (images[0])
                images[0].classList.add('active');
            // Animation synchronisée images/contenus
            items.forEach((item, i) => {
                // Mettre l'opacité initiale des items
                items.forEach((el, idx) => {
                    el.style.opacity = idx === 0 ? '1' : '0.4';
                    el.style.transition = 'opacity 0.3s ease';
                });
                ScrollTrigger.create({
                    trigger: item,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => {
                        titleInfo.classList.add('active');
                        // Active image
                        images.forEach(img => img.classList.remove('active'));
                        if (images[i])
                            images[i].classList.add('active');
                        // Active item et opacity
                        items.forEach((el, idx) => {
                            el.style.opacity = idx === i ? '1' : '0.4';
                        });
                    },
                    onEnterBack: () => {
                        images.forEach(img => img.classList.remove('active'));
                        if (images[i])
                            images[i].classList.add('active');
                        // Opacité pour scroll vers le haut
                        items.forEach((el, idx) => {
                            el.style.opacity = idx === i ? '1' : '0.4';
                        });
                    },
                    onLeave: () => {
                        if (i !== items.length - 1) {
                            if (images[i])
                                images[i].classList.remove('active');
                        }
                        titleInfo.classList.remove('active');
                    },
                    onLeaveBack: () => {
                        if (i !== 0) {
                            if (images[i])
                                images[i].classList.remove('active');
                        }
                        titleInfo.classList.remove('active');
                    }
                });
            });
        }
        catch (err) {
            console.error('Erreur lors du chargement de GSAP ou ScrollTrigger', err);
        }
    })();
}
