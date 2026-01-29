import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/ScrollTrigger.js";
if (document.querySelector('.section-avantage')
    && document.querySelector('.images-avantages-wrapper')
    && window.innerWidth >= 991) {
    const style = document.createElement("style");
    style.id = "avantage-styles"; // ID unique pour éviter les doublons
    style.innerHTML = `
        .section-avantage {
            overflow: visible;
            margin-bottom: 7rem;
        }

        .section-avantage .avantages-anim-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            position: relative;
        }

        .section-avantage .avantages-anim-wrapper > div:first-child {
            position: relative;
            height: fit-content;
        }

        .section-avantage .title-info-avantage {
            margin-bottom: 2rem;
        }

        .section-avantage .images-avantages-wrapper {
            position: relative;
            min-height: 580px;
        }

        .section-avantage .image-avantage-item {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            transition: opacity 0.4s ease;
            pointer-events: none;
        }

        .section-avantage .image-avantage-item.avantage-active {
            opacity: 1;
            z-index: 2;
            pointer-events: auto;
        }

        .section-avantage .avantages-wrapper {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            position: relative;
            padding-bottom: 4rem;
        }

        .section-avantage .avantage-wrapper {
            opacity: 0.35;
            transition: opacity 0.4s ease;
        }

        .section-avantage .avantage-wrapper.avantage-active {
            opacity: 1;
        }
    `;
    // Vérifier si le style existe déjà
    if (!document.getElementById('avantage-styles')) {
        document.head.appendChild(style);
    }
    (async function () {
        try {
            gsap.registerPlugin(ScrollTrigger);
            const section = document.querySelector('.section-avantage');
            const animWrapper = section.querySelector('.avantages-anim-wrapper');
            const leftCol = section.querySelector('.avantages-anim-wrapper > div:first-child');
            const items = section.querySelectorAll('.avantages-wrapper .avantage-wrapper');
            const images = section.querySelectorAll('.images-avantages-wrapper .image-avantage-item');
            const avantagesWrapper = section.querySelector('.avantages-wrapper');
            if (!items.length || !animWrapper || !leftCol)
                return;
            // Variable pour tracker l'index actif
            let currentIndex = -1;
            // Fonction pour calculer la hauteur nécessaire
            const setupLayout = () => {
                animWrapper.style.minHeight = '';
                const leftColHeight = leftCol.offsetHeight;
                const rightColHeight = avantagesWrapper.offsetHeight;
                const minHeight = Math.max(leftColHeight, rightColHeight);
                animWrapper.style.minHeight = `${minHeight}px`;
            };
            // Setup initial
            setupLayout();
            // Fonction pour activer un item et son image correspondante
            function activateItem(index) {
                if (currentIndex === index)
                    return;
                currentIndex = index;
                // Désactiver toutes les images (classe spécifique)
                images.forEach(img => img.classList.remove('avantage-active'));
                // Désactiver tous les items (classe spécifique)
                items.forEach(el => el.classList.remove('avantage-active'));
                // Activer l'image correspondante à l'index
                if (images[index]) {
                    images[index].classList.add('avantage-active');
                }
                // Activer l'item correspondant
                if (items[index]) {
                    items[index].classList.add('avantage-active');
                }
            }
            // Activer le premier élément par défaut
            activateItem(0);
            // PINNING de la colonne gauche
            ScrollTrigger.create({
                trigger: animWrapper,
                start: 'top top+=110px',
                end: () => {
                    const rightColBottom = avantagesWrapper.offsetHeight;
                    const leftColHeight = leftCol.offsetHeight;
                    const extraScroll = rightColBottom - leftColHeight + 110;
                    return `+=${Math.max(extraScroll, 0)}`;
                },
                pin: leftCol,
                pinSpacing: false,
                anticipatePin: 1,
                markers: false,
                invalidateOnRefresh: true,
                id: 'avantage-pin' // ID unique pour ce trigger
            });
            // Animation synchronisée images/contenus
            items.forEach((item, i) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    onEnter: () => activateItem(i),
                    onEnterBack: () => activateItem(i),
                    onLeaveBack: () => {
                        if (i > 0) {
                            activateItem(i - 1);
                        }
                    },
                    markers: false,
                    id: `avantage-item-${i}` // ID unique pour chaque trigger
                });
            });
            // Gestion du resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    if (window.innerWidth >= 991) {
                        setupLayout();
                        ScrollTrigger.refresh();
                    }
                }, 250);
            });
            // Refresh après chargement complet
            window.addEventListener('load', () => {
                setupLayout();
                ScrollTrigger.refresh();
                activateItem(0);
            });
        }
        catch (err) {
            console.error('Erreur section-avantage:', err);
        }
    })();
}
