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

    (async function() {
        try {
            gsap.registerPlugin(ScrollTrigger);

            const section = document.querySelector('.section-solution');
            const wrapper = section.querySelector('.methodologies-audit-wrapper');
            const leftCol = section.querySelector('.content-solution-left');
            const rightCol = section.querySelector('.content-solution-right');

            const leftItems = section.querySelectorAll('.content-solution-left .w-dyn-items .w-dyn-item');
            const rightItems = section.querySelectorAll('.content-solution-right .histoire-card .w-dyn-item');

            // Initialiser toutes les images en position basse (comme section-avantages)
            leftItems.forEach((item) => {
                gsap.set(item, { y: '100%', opacity: 0 });
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

            if (!leftItems.length || !rightItems.length || !wrapper) return;

            let currentIndex = -1;

            // Fonction pour activer un item avec effet de stack (comme section-avantages)
            function activateItem(index) {
                if (currentIndex === index) return;

                const previousIndex = currentIndex;
                currentIndex = index;

                // Désactiver tous les items texte
                rightItems.forEach(el => el.classList.remove('solution-active'));

                // Activer l'item texte correspondant
                if (rightItems[index]) {
                    rightItems[index].classList.add('solution-active');
                }

                // Animation des images avec effet de stack
                if (leftItems[index]) {
                    const goingDown = index > previousIndex;

                    // Animation de l'ancienne image (si elle existe)
                    if (previousIndex >= 0 && leftItems[previousIndex]) {
                        leftItems[previousIndex].classList.remove('solution-active');
                        gsap.to(leftItems[previousIndex], {
                            y: goingDown ? '-100%' : '100%',
                            opacity: 0.33,
                            duration: 0.85,
                            ease: 'cubic-bezier(0.4, 0, 0, 1)'
                        });
                    }

                    // Animation de la nouvelle image
                    leftItems[index].classList.add('solution-active');
                    gsap.fromTo(leftItems[index],
                        {
                            y: goingDown ? '100%' : '-100%',
                            opacity: 1
                        },
                        {
                            y: '0%',
                            opacity: 1,
                            duration: 0.85,
                            ease: 'cubic-bezier(0.4, 0, 0, 1)'
                        }
                    );
                }
            }

            // Initialisation - première image visible en position 0
            gsap.set(leftItems[0], { y: '0%', opacity: 1 });
            leftItems[0].classList.add('solution-active');
            rightItems[0].classList.add('solution-active');
            currentIndex = 0;

            const totalItems = rightItems.length;
            let isInSection = false;
            let lastWheelTime = 0;
            let exitDirection = null; // 'up' ou 'down' - direction de sortie
            const wheelCooldown = 850; // Correspond à la durée de l'animation

            // Fonction pour aller à l'item suivant
            function goToNext() {
                if (currentIndex < totalItems - 1) {
                    activateItem(currentIndex + 1);
                    return true;
                }
                return false;
            }

            // Fonction pour aller à l'item précédent
            function goToPrev() {
                if (currentIndex > 0) {
                    activateItem(currentIndex - 1);
                    return true;
                }
                return false;
            }

            // Gestionnaire de wheel pour le scroll step-by-step
            function handleWheel(e) {
                if (!isInSection) return;

                const now = Date.now();
                const direction = e.deltaY > 0 ? 'down' : 'up';

                // Si on a quitté par un bord et qu'on revient dans l'autre sens, réactiver
                if (exitDirection !== null) {
                    if (exitDirection !== direction) {
                        // On revient en arrière, réactiver le contrôle
                        exitDirection = null;
                    } else {
                        // On continue dans la même direction, laisser le scroll naturel
                        return;
                    }
                }

                // Cooldown pour éviter les transitions trop rapides
                if (now - lastWheelTime < wheelCooldown) {
                    e.preventDefault();
                    return;
                }

                if (direction === 'down') {
                    if (currentIndex < totalItems - 1) {
                        e.preventDefault();
                        lastWheelTime = now;
                        goToNext();
                    } else {
                        // Dernier item atteint, marquer la direction de sortie
                        exitDirection = 'down';
                    }
                } else {
                    if (currentIndex > 0) {
                        e.preventDefault();
                        lastWheelTime = now;
                        goToPrev();
                    } else {
                        // Premier item atteint, marquer la direction de sortie
                        exitDirection = 'up';
                    }
                }
            }

            // ScrollTrigger pour détecter quand la section est visible
            // Calculé par rapport à la section elle-même (avec offset pour le header sticky)
            ScrollTrigger.create({
                trigger: section,
                start: 'top top+=230',
                end: 'bottom 60%',
                onEnter: () => {
                    isInSection = true;
                    exitDirection = null;
                },
                onEnterBack: () => {
                    isInSection = true;
                    exitDirection = null;
                },
                onLeave: () => {
                    isInSection = false;
                    exitDirection = null;
                },
                onLeaveBack: () => {
                    isInSection = false;
                    exitDirection = null;
                },
                markers: false,
                id: 'solution-section-trigger'
            });

            // Écouter les événements wheel
            window.addEventListener('wheel', handleWheel, { passive: false });

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

        } catch (err) {
            console.error('Erreur section-solution:', err);
        }
    })();
}