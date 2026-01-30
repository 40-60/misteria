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
            overflow: hidden;
        }

        .section-avantage .image-avantage-item {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
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
            transition: opacity 850ms cubic-bezier(0.4, 0, 0, 1);
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
            const steps = items.length;
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
            // Initialiser toutes les images en position basse
            images.forEach(img => {
                gsap.set(img, { y: '100%', opacity: 0 });
            });
            // Fonction pour activer un item et son image correspondante
            function activateItem(index) {
                if (currentIndex === index)
                    return;
                const previousIndex = currentIndex;
                currentIndex = index;
                // Désactiver tous les items texte (classe spécifique)
                items.forEach(el => el.classList.remove('avantage-active'));
                // Activer l'item texte correspondant
                if (items[index]) {
                    items[index].classList.add('avantage-active');
                }
                // Animation des images avec effet de stack
                if (images[index]) {
                    const goingDown = index > previousIndex;
                    // Animation de l'ancienne image (si elle existe)
                    if (previousIndex >= 0 && images[previousIndex]) {
                        images[previousIndex].classList.remove('avantage-active');
                        gsap.to(images[previousIndex], {
                            y: goingDown ? '-100%' : '100%',
                            opacity: 0.33,
                            duration: 0.85,
                            ease: 'cubic-bezier(0.4, 0, 0, 1)'
                        });
                    }
                    // Animation de la nouvelle image
                    images[index].classList.add('avantage-active');
                    gsap.fromTo(images[index], {
                        y: goingDown ? '100%' : '-100%',
                        opacity: 1
                    }, {
                        y: '0%',
                        opacity: 1,
                        duration: 0.85,
                        ease: 'cubic-bezier(0.4, 0, 0, 1)'
                    });
                }
            }
            // Activer le premier élément par défaut
            gsap.set(images[0], { y: '0%', opacity: 1 });
            images[0].classList.add('avantage-active');
            items[0].classList.add('avantage-active');
            currentIndex = 0;
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
            // Animation synchronisée images/contenus avec scrub
            ScrollTrigger.create({
                trigger: avantagesWrapper,
                start: 'top 30%',
                end: 'bottom center',
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const segment = 1 / steps;
                    let activeIdx = Math.floor(progress / segment);
                    // Clamp l'index
                    if (activeIdx < 0)
                        activeIdx = 0;
                    if (activeIdx >= steps)
                        activeIdx = steps - 1;
                    activateItem(activeIdx);
                },
                markers: false,
                id: 'avantage-scroll'
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
