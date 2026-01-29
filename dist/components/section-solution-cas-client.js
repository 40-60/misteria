import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/ScrollTrigger.js";
if (document.querySelector('.section-solution') && window.innerWidth >= 991) {
    const style = document.createElement("style");
    style.id = "solution-styles";
    style.innerHTML = `
        .section-solution {
            position: relative;
            overflow: visible;
        }

        .section-solution .methodologies-audit-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
            position: relative;
            align-items: start;
        }

        /* COLONNE GAUCHE - Sticky */
        .section-solution .content-solution-left {
            position: sticky;
            top: 110px;
            height: fit-content;
            align-self: start;
        }

        .section-solution .content-solution-left .w-dyn-items {
            position: relative;
            aspect-ratio: 4/5;
            overflow: hidden;
        }

        .section-solution .content-solution-left .w-dyn-item {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            pointer-events: none;
            overflow: hidden;
        }

        .section-solution .content-solution-left .w-dyn-item.solution-active {
            opacity: 1;
            z-index: 2;
            pointer-events: auto;
        }

        .section-solution .content-solution-left .w-dyn-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            will-change: transform;
        }

        /* Overlay blanc pour l'effet de sortie */
        .section-solution .content-solution-left .w-dyn-item .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            opacity: 0;
            pointer-events: none;
            z-index: 1;
        }

        /* COLONNE DROITE - Scroll naturel */
        .section-solution .content-solution-right {
            padding-top: 0;
            padding-bottom: 0;
        }

        .section-solution .content-solution-right .margin-bottom.margin-48.custom-margin-0 {
            margin-bottom: 3rem !important;
        }

        .section-solution .content-solution-right .histoire-card {
            display: flex;
            flex-direction: column;
            gap: 0;
        }

        .section-solution .content-solution-right .histoire-card .w-dyn-item {
            opacity: 0.4;
            padding: 1.5rem 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            transition: opacity 850ms cubic-bezier(0.4, 0, 0, 1);
        }

        .section-solution .content-solution-right .histoire-card .w-dyn-item:first-child {
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .section-solution .content-solution-right .histoire-card .w-dyn-item.solution-active {
            opacity: 1;
        }

        .section-solution .content-solution-right .histoire-card .w-dyn-item .margin-bottom.margin-8 {
            margin-bottom: 0 !important;
        }

        .section-solution .content-solution-right .histoire-card .w-dyn-item .margin-bottom.margin-24 {
            display: none;
        }

        /* Nouvelle méthode : grid pour une animation fluide */
        .section-solution .content-solution-right .w-dyn-item .methodologie-item._2 {
            display: grid;
            grid-template-rows: 0fr;
            overflow: hidden;
            transition: grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .section-solution .content-solution-right .w-dyn-item.solution-active .methodologie-item._2 {
            grid-template-rows: 1fr;
        }

        .section-solution .content-solution-right .w-dyn-item .methodologie-item._2 > .margin-bottom.margin-40 {
            min-height: 0;
            overflow: hidden;
        }

        .section-solution .content-solution-right .w-dyn-item .methodologie-item._2 .content-inner {
            padding-top: 1.5rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
        }

        .section-solution .content-solution-right .w-dyn-item.solution-active .methodologie-item._2 .content-inner {
            opacity: 1;
            transform: translateY(0);
        }

        .section-solution .content-solution-right .w-dyn-item .methodologie-item._2 .margin-bottom.margin-40 {
            margin-bottom: 0 !important;
        }

        .section-solution .content-solution-right .w-dyn-item .methodologie-item._2 .margin-bottom.margin-16 {
            margin-bottom: 1rem !important;
        }

        .section-solution .content-solution-right .w-dyn-item .methodologie-item._2 h3 {
            font-size: 1.75rem;
            line-height: 1.3;
        }

        .section-solution .content-solution-right .w-dyn-item .methodologie-item._2 .normal-reg p {
            margin-bottom: 1rem;
        }

        .section-solution .content-solution-right .w-dyn-item .methodologie-item._2 .normal-reg p:last-child {
            margin-bottom: 0;
        }
    `;
    if (!document.getElementById('solution-styles')) {
        document.head.appendChild(style);
    }
    (async function () {
        try {
            gsap.registerPlugin(ScrollTrigger);
            const section = document.querySelector('.section-solution');
            const wrapper = section.querySelector('.methodologies-audit-wrapper');
            const leftCol = section.querySelector('.content-solution-left');
            const rightCol = section.querySelector('.content-solution-right');
            const leftItems = section.querySelectorAll('.content-solution-left .w-dyn-items .w-dyn-item');
            const rightItems = section.querySelectorAll('.content-solution-right .histoire-card .w-dyn-item');
            // Ajouter l'overlay blanc à chaque image
            leftItems.forEach((item) => {
                if (!item.querySelector('.image-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'image-overlay';
                    item.appendChild(overlay);
                }
                // Initialiser l'échelle de l'image
                const img = item.querySelector('img');
                if (img) {
                    gsap.set(img, { scale: 1.1, y: 0 });
                }
            });
            // Wrapper le contenu pour l'animation fluide + Numérotation dynamique
            rightItems.forEach((item, i) => {
                // Numérotation
                const numberEl = item.querySelector('.other-overline.text-color-blue-primary-500');
                if (numberEl) {
                    numberEl.textContent = String(i + 1).padStart(2, '0');
                }
                // Wrapper le contenu de .methodologie-item._2
                const methodologieItem = item.querySelector('.methodologie-item._2');
                if (methodologieItem) {
                    const marginDiv = methodologieItem.querySelector('.margin-bottom.margin-40');
                    if (marginDiv && !marginDiv.querySelector('.content-inner')) {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'content-inner';
                        while (marginDiv.firstChild) {
                            wrapper.appendChild(marginDiv.firstChild);
                        }
                        marginDiv.appendChild(wrapper);
                    }
                }
            });
            if (!leftItems.length || !rightItems.length || !wrapper)
                return;
            let currentIndex = -1;
            // Fonction pour activer un item
            function activateItem(index) {
                if (currentIndex === index)
                    return;
                const previousIndex = currentIndex;
                currentIndex = index;
                // Animation de sortie pour l'image précédente
                if (previousIndex >= 0 && leftItems[previousIndex]) {
                    const prevItem = leftItems[previousIndex];
                    const prevImg = prevItem.querySelector('img');
                    const prevOverlay = prevItem.querySelector('.image-overlay');
                    // Timeline pour l'animation de sortie
                    const exitTl = gsap.timeline({
                        onComplete: () => {
                            prevItem.classList.remove('solution-active');
                            // Reset pour la prochaine fois
                            gsap.set(prevItem, { opacity: 0, y: 0 });
                            gsap.set(prevImg, { scale: 1.1, y: 0 });
                            gsap.set(prevOverlay, { opacity: 0 });
                        }
                    });
                    exitTl
                        // Overlay blanc qui apparaît progressivement (10% d'opacité)
                        .to(prevOverlay, {
                        opacity: 0.1,
                        duration: 0.4,
                        ease: 'power2.out'
                    }, 0)
                        // Image qui monte vers le haut
                        .to(prevImg, {
                        y: '-30%',
                        duration: 0.5,
                        ease: 'power2.in'
                    }, 0)
                        // Container qui disparaît
                        .to(prevItem, {
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    }, 0.1);
                }
                // Animation d'entrée pour la nouvelle image
                if (leftItems[index]) {
                    const newItem = leftItems[index];
                    const newImg = newItem.querySelector('img');
                    const newOverlay = newItem.querySelector('.image-overlay');
                    // Préparer l'état initial
                    gsap.set(newItem, { opacity: 0 });
                    gsap.set(newImg, { scale: 1.1, y: 0 });
                    gsap.set(newOverlay, { opacity: 0 });
                    newItem.classList.add('solution-active');
                    // Timeline pour l'animation d'entrée
                    const enterTl = gsap.timeline();
                    enterTl
                        // Container qui apparaît
                        .to(newItem, {
                        opacity: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    }, 0)
                        // Image qui se réduit de 110% à 100%
                        .to(newImg, {
                        scale: 1,
                        duration: 0.6,
                        ease: 'power2.out'
                    }, 0);
                }
                // Animation des items de droite - uniquement les classes, le CSS gère le reste
                rightItems.forEach((item, i) => {
                    if (i === index) {
                        item.classList.add('solution-active');
                    }
                    else {
                        item.classList.remove('solution-active');
                    }
                });
            }
            // Initialisation - première image visible avec scale 1
            if (leftItems[0]) {
                const firstImg = leftItems[0].querySelector('img');
                gsap.set(leftItems[0], { opacity: 1 });
                gsap.set(firstImg, { scale: 1 });
                leftItems[0].classList.add('solution-active');
            }
            if (rightItems[0]) {
                rightItems[0].classList.add('solution-active');
            }
            currentIndex = 0;
            // ScrollTrigger pour chaque item
            rightItems.forEach((item, i) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: 'top 30%',
                    end: 'bottom center',
                    onEnter: () => activateItem(i),
                    onEnterBack: () => activateItem(i),
                    markers: false,
                    id: `solution-item-${i}`
                });
            });
            // Refresh après chargement complet
            window.addEventListener('load', () => {
                ScrollTrigger.refresh();
            });
            // Gestion du resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    if (window.innerWidth >= 991) {
                        ScrollTrigger.refresh();
                    }
                }, 250);
            });
        }
        catch (err) {
            console.error('Erreur section-solution:', err);
        }
    })();
}
