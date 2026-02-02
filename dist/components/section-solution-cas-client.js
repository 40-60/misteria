import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";
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

        /* COLONNE DROITE */
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
            transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
        }

        .section-solution .content-solution-right .histoire-card .w-dyn-item:first-child {
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .section-solution .content-solution-right .histoire-card .w-dyn-item:hover {
            opacity: 0.7;
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

        /* Accordion avec grid pour animation fluide */
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
    (function () {
        try {
            const section = document.querySelector('.section-solution');
            const wrapper = section.querySelector('.methodologies-audit-wrapper');
            const leftItems = section.querySelectorAll('.content-solution-left .w-dyn-items .w-dyn-item');
            const rightItems = section.querySelectorAll('.content-solution-right .histoire-card .w-dyn-item');
            if (!leftItems.length || !rightItems.length || !wrapper)
                return;
            let currentIndex = -1;
            let isAnimating = false;
            // Initialiser toutes les images en position cachée
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
                        const contentWrapper = document.createElement('div');
                        contentWrapper.className = 'content-inner';
                        while (marginDiv.firstChild) {
                            contentWrapper.appendChild(marginDiv.firstChild);
                        }
                        marginDiv.appendChild(contentWrapper);
                    }
                }
            });
            // Fonction pour activer un item au clic
            function activateItem(index) {
                if (isAnimating)
                    return;
                // Si on clique sur l'item déjà actif, on le ferme
                if (currentIndex === index) {
                    closeAll();
                    return;
                }
                isAnimating = true;
                const previousIndex = currentIndex;
                currentIndex = index;
                // Désactiver tous les items texte
                rightItems.forEach(el => el.classList.remove('solution-active'));
                // Activer l'item texte correspondant
                if (rightItems[index]) {
                    rightItems[index].classList.add('solution-active');
                }
                // Animation des images
                if (leftItems[index]) {
                    const goingDown = previousIndex === -1 || index > previousIndex;
                    // Animation de l'ancienne image (si elle existe)
                    if (previousIndex >= 0 && leftItems[previousIndex]) {
                        leftItems[previousIndex].classList.remove('solution-active');
                        gsap.to(leftItems[previousIndex], {
                            y: goingDown ? '-100%' : '100%',
                            opacity: 0,
                            duration: 0.6,
                            ease: 'power3.inOut'
                        });
                    }
                    // Animation de la nouvelle image
                    leftItems[index].classList.add('solution-active');
                    gsap.fromTo(leftItems[index], {
                        y: goingDown ? '100%' : '-100%',
                        opacity: 0
                    }, {
                        y: '0%',
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power3.inOut',
                        onComplete: () => {
                            isAnimating = false;
                        }
                    });
                }
                else {
                    isAnimating = false;
                }
            }
            // Fonction pour tout fermer
            function closeAll() {
                if (isAnimating || currentIndex === -1)
                    return;
                isAnimating = true;
                const previousIndex = currentIndex;
                currentIndex = -1;
                // Désactiver tous les items texte
                rightItems.forEach(el => el.classList.remove('solution-active'));
                // Fermer l'image active
                if (previousIndex >= 0 && leftItems[previousIndex]) {
                    leftItems[previousIndex].classList.remove('solution-active');
                    gsap.to(leftItems[previousIndex], {
                        y: '100%',
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power3.inOut',
                        onComplete: () => {
                            isAnimating = false;
                        }
                    });
                }
                else {
                    isAnimating = false;
                }
            }
            // Ajouter les événements de clic sur chaque item
            rightItems.forEach((item, i) => {
                item.addEventListener('click', () => {
                    activateItem(i);
                });
            });
            // Ouvrir le premier item par défaut
            gsap.set(leftItems[0], { y: '0%', opacity: 1 });
            leftItems[0].classList.add('solution-active');
            rightItems[0].classList.add('solution-active');
            currentIndex = 0;
        }
        catch (err) {
            console.error('Erreur section-solution:', err);
        }
    })();
}
