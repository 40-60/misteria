import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";

if (document.querySelector('.section-direction') && window.innerWidth >= 991 ) {
    const style = document.createElement("style");
    style.innerHTML = `
        .team-slider {
                position: relative;
                height: 47rem;
            }

        .directions-wrapper {
            position: absolute !important;
            top: 0;
            left: 0;
            width: 100%;
            opacity: 1; /* Toujours opaque */
            visibility: hidden;
            pointer-events: none;
        }

        .directions-wrapper.active {
            visibility: visible;
            pointer-events: auto;
        }

        .direction-card {
            border-left: 1px solid var(--_color---greyscale--100);
            margin-left: auto;
            margin-right: auto;
            padding: 7rem 4rem;
            /* La bordure reste toujours visible et fixe */
        }
        `;
    document.head.appendChild(style);

    // Configuration
    const slideDuration = 5; // durée d'affichage de chaque slide en secondes
    const animationDuration = 0.85; // 850ms
    const customEase = "cubic-bezier(0.4, 0, 0, 1)"; // ease personnalisée

    // Sélection des slides
    const slides = document.querySelectorAll('.directions-wrapper');
    let currentSlide = 0;

    // Fonction d'initialisation
    function initSlider() {
        slides.forEach((slide, index) => {
            if (index === 0) {
                // Premier slide visible
                slide.classList.add('active');

                const card1 = slide.querySelector('.direction-card._1');
                const card2 = slide.querySelectorAll('.direction-card')[1];

                // Initialiser la carte 1 (image et info)
                gsap.set(card1.querySelector('.image-avec-masque').parentElement, {
                    opacity: 1
                });
                gsap.set(card1.querySelector('.image-avec-masque'), {
                    y: 0,
                    scale: 1
                });
                gsap.set(card1.querySelector('.image-avec-masque').nextElementSibling, {
                    height: '0%'
                });
                gsap.set(card1.querySelector('h3'), {
                    opacity: 1
                });
                gsap.set(card1.querySelector('.line'), {
                    opacity: 1,
                    y: '0%'
                });
                gsap.set(card1.querySelector('.normal-reg'), {
                    opacity: 1,
                    y: 0
                });

                // Initialiser la carte 2 (texte description)
                gsap.set(card2.querySelector('.medium-reg'), {
                    opacity: 1,
                    y: 0
                });

            } else {
                // Cacher les autres slides
                slide.classList.remove('active');
            }
        });
    }

    // Animation pour la carte 1 (gauche - image et nom)
    function animateCard1Out(card) {
        const tl = gsap.timeline();

        tl.to(card.querySelector('.normal-reg'), {
                opacity: 0,
                y: -15,
                duration: animationDuration * 0.5,
                ease: customEase
            })
            .to(card.querySelector('h3'), {
                opacity: 0,
                duration: animationDuration * 0.4,
                ease: customEase
            }, `-=${animationDuration * 0.3}`)
            .to(card.querySelector('.image-avec-masque').parentElement, {
                opacity: 0,
                duration: animationDuration * 0.5,
                ease: customEase
            }, `-=${animationDuration * 0.3}`);

        return tl;
    }

    function animateCard1In(card) {
        const tl = gsap.timeline();

        // Préparer les éléments
        tl.set([
                card.querySelector('.image-avec-masque').parentElement,
                card.querySelector('h3'),
                card.querySelector('.normal-reg')
            ], {
                opacity: 0
            })
            .set(card.querySelector('.image-avec-masque'), {
                y: 30,
                scale: 1.1
            })
            .set(card.querySelector('.image-avec-masque').nextElementSibling, {
                height: '100%'
            })
            .set(card.querySelector('.line'), {
                opacity: 0,
                y: '100%'
            });

        // Animer l'image
        tl.to(card.querySelector('.image-avec-masque').parentElement, {
                opacity: 1,
                duration: 0.01
            })
            .to(card.querySelector('.image-avec-masque'), {
                y: 0,
                scale: 1,
                duration: animationDuration * 1.2,
                ease: customEase
            })
            .to(card.querySelector('.image-avec-masque').nextElementSibling, {
                height: '0%',
                duration: animationDuration * 1.2,
                ease: customEase
            }, `-=${animationDuration * 1.2}`);

        // Animer le nom
        tl.to(card.querySelector('h3'), {
                opacity: 1,
                duration: 0.01
            }, `-=${animationDuration * 0.8}`)
            .to(card.querySelector('.line'), {
                opacity: 1,
                y: '0%',
                duration: animationDuration,
                ease: customEase
            }, `-=${0.01}`);

        // Animer le rôle
        tl.to(card.querySelector('.normal-reg'), {
            opacity: 1,
            y: 0,
            duration: animationDuration * 0.8,
            ease: customEase
        }, `-=${animationDuration * 0.5}`);

        return tl;
    }

    // Animation pour la carte 2 (droite - description)
    function animateCard2Out(card) {
        const tl = gsap.timeline();

        tl.to(card.querySelector('.medium-reg'), {
            opacity: 0,
            y: -20,
            duration: animationDuration * 0.6,
            ease: customEase
        });

        return tl;
    }

    function animateCard2In(card) {
        const tl = gsap.timeline();

        tl.set(card.querySelector('.medium-reg'), {
                opacity: 0,
                y: 20
            })
            .to(card.querySelector('.medium-reg'), {
                opacity: 1,
                y: 0,
                duration: animationDuration,
                ease: customEase
            });

        return tl;
    }

    // Fonction principale pour changer de slide
    function changeSlide() {
        const current = slides[currentSlide];
        const next = slides[(currentSlide + 1) % slides.length];

        const currentCard1 = current.querySelector('.direction-card._1');
        const currentCard2 = current.querySelectorAll('.direction-card')[1];
        const nextCard1 = next.querySelector('.direction-card._1');
        const nextCard2 = next.querySelectorAll('.direction-card')[1];

        // Timeline principale
        const mainTl = gsap.timeline();

        // Phase 1 : Sortie des deux cartes en parallèle
        mainTl.add(animateCard1Out(currentCard1), 0);
        mainTl.add(animateCard2Out(currentCard2), 0);

        // Phase 2 : Changement de slide
        mainTl.add(() => {
            current.classList.remove('active');
            next.classList.add('active');
        });

        // Phase 3 : Entrée des deux cartes en parallèle (avec léger décalage)
        mainTl.add(animateCard1In(nextCard1), `-=${animationDuration * 0.2}`);
        mainTl.add(animateCard2In(nextCard2), `-=${animationDuration * 0.9}`);

        // Mettre à jour l'index
        currentSlide = (currentSlide + 1) % slides.length;
    }

    // Lancer le slider
    initSlider();
    setInterval(changeSlide, slideDuration * 1000);
}