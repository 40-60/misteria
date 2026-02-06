import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);
if (document.querySelector('.section-direction') && window.innerWidth >= 991) {
    const style = document.createElement("style");
    style.id = "direction-styles"; // ID unique
    style.innerHTML = `
        .section-direction .team-slider {
            position: relative;
            height: 47rem;
        }

        .section-direction .directions-wrapper {
            position: absolute !important;
            top: 0;
            left: 0;
            width: 100%;
            opacity: 1;
            visibility: hidden;
            pointer-events: none;
        }

        .section-direction .directions-wrapper.direction-active {
            visibility: visible;
            pointer-events: auto;
        }

        .section-direction .direction-card {
            border-left: 1px solid var(--_color---greyscale--100);
            margin-left: auto;
            margin-right: auto;
            padding: 7rem 4rem;
        }
    `;
    // Vérifier si le style existe déjà
    if (!document.getElementById('direction-styles')) {
        document.head.appendChild(style);
    }
    // Configuration
    const animationDuration = 0.65;
    const customEase = "cubic-bezier(0.4, 0, 0, 1)";
    // Sélection des slides (scope à la section)
    const section = document.querySelector('.section-direction');
    const slides = section.querySelectorAll('.directions-wrapper');
    let currentSlide = 0;
    function initSlider() {
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('direction-active');
                const card1 = slide.querySelector('.direction-card._1');
                const card2 = slide.querySelectorAll('.direction-card')[1];
                if (card1) {
                    const imageParent = card1.querySelector('.image-avec-masque')?.parentElement;
                    const imageEl = card1.querySelector('.image-avec-masque');
                    const maskEl = imageEl?.nextElementSibling;
                    if (imageParent)
                        gsap.set(imageParent, { opacity: 1 });
                    if (imageEl)
                        gsap.set(imageEl, { y: 0, scale: 1 });
                    if (maskEl)
                        gsap.set(maskEl, { height: '0%' });
                    const h3 = card1.querySelector('h3');
                    const line = card1.querySelector('.line');
                    const normalReg = card1.querySelector('.normal-reg');
                    if (h3)
                        gsap.set(h3, { opacity: 1 });
                    if (line)
                        gsap.set(line, { opacity: 1, y: '0%' });
                    if (normalReg)
                        gsap.set(normalReg, { opacity: 1, y: 0 });
                }
                if (card2) {
                    const mediumReg = card2.querySelector('.medium-reg');
                    if (mediumReg)
                        gsap.set(mediumReg, { opacity: 1, y: 0 });
                }
            }
            else {
                slide.classList.remove('direction-active');
            }
        });
    }
    function animateCard1Out(card) {
        const tl = gsap.timeline();
        const normalReg = card.querySelector('.normal-reg');
        const h3 = card.querySelector('h3');
        const imageParent = card.querySelector('.image-avec-masque')?.parentElement;
        if (normalReg) {
            tl.to(normalReg, {
                opacity: 0,
                y: -15,
                duration: animationDuration * 0.5,
                ease: customEase
            });
        }
        if (h3) {
            tl.to(h3, {
                opacity: 0,
                duration: animationDuration * 0.4,
                ease: customEase
            }, `-=${animationDuration * 0.3}`);
        }
        if (imageParent) {
            tl.to(imageParent, {
                opacity: 0,
                duration: animationDuration * 0.5,
                ease: customEase
            }, `-=${animationDuration * 0.3}`);
        }
        return tl;
    }
    function animateCard1In(card) {
        const tl = gsap.timeline();
        const imageParent = card.querySelector('.image-avec-masque')?.parentElement;
        const imageEl = card.querySelector('.image-avec-masque');
        const maskEl = imageEl?.nextElementSibling;
        const h3 = card.querySelector('h3');
        const line = card.querySelector('.line');
        const normalReg = card.querySelector('.normal-reg');
        // Préparer les éléments
        const elementsToHide = [imageParent, h3, normalReg].filter(Boolean);
        if (elementsToHide.length) {
            tl.set(elementsToHide, { opacity: 0 });
        }
        if (imageEl)
            tl.set(imageEl, { y: 30, scale: 1.1 });
        if (maskEl)
            tl.set(maskEl, { height: '100%' });
        if (line)
            tl.set(line, { opacity: 0, y: '100%' });
        // Animer l'image
        if (imageParent) {
            tl.to(imageParent, { opacity: 1, duration: 0.01 });
        }
        if (imageEl) {
            tl.to(imageEl, {
                y: 0,
                scale: 1,
                duration: animationDuration * 1.2,
                ease: customEase
            });
        }
        if (maskEl) {
            tl.to(maskEl, {
                height: '0%',
                duration: animationDuration * 1.2,
                ease: customEase
            }, `-=${animationDuration * 1.2}`);
        }
        // Animer le nom
        if (h3) {
            tl.to(h3, { opacity: 1, duration: 0.01 }, `-=${animationDuration * 0.8}`);
        }
        if (line) {
            tl.to(line, {
                opacity: 1,
                y: '0%',
                duration: animationDuration,
                ease: customEase
            }, `-=${0.01}`);
        }
        // Animer le rôle
        if (normalReg) {
            tl.to(normalReg, {
                opacity: 1,
                y: 0,
                duration: animationDuration * 0.8,
                ease: customEase
            }, `-=${animationDuration * 0.5}`);
        }
        return tl;
    }
    function animateCard2Out(card) {
        const tl = gsap.timeline();
        const mediumReg = card.querySelector('.medium-reg');
        if (mediumReg) {
            tl.to(mediumReg, {
                opacity: 0,
                y: -20,
                duration: animationDuration * 0.6,
                ease: customEase
            });
        }
        return tl;
    }
    function animateCard2In(card) {
        const tl = gsap.timeline();
        const mediumReg = card.querySelector('.medium-reg');
        if (mediumReg) {
            tl.set(mediumReg, { opacity: 0, y: 20 })
                .to(mediumReg, {
                opacity: 1,
                y: 0,
                duration: animationDuration,
                ease: customEase
            });
        }
        return tl;
    }
    function goToSlide(targetIndex) {
        if (targetIndex === currentSlide || targetIndex < 0 || targetIndex >= slides.length)
            return;
        const current = slides[currentSlide];
        const target = slides[targetIndex];
        const currentCard1 = current.querySelector('.direction-card._1');
        const currentCard2 = current.querySelectorAll('.direction-card')[1];
        const targetCard1 = target.querySelector('.direction-card._1');
        const targetCard2 = target.querySelectorAll('.direction-card')[1];
        const mainTl = gsap.timeline();
        // Sortie du slide actuel
        if (currentCard1)
            mainTl.add(animateCard1Out(currentCard1), 0);
        if (currentCard2)
            mainTl.add(animateCard2Out(currentCard2), 0);
        // Changement de visibilité
        mainTl.add(() => {
            current.classList.remove('direction-active');
            target.classList.add('direction-active');
        });
        // Entrée du nouveau slide
        if (targetCard1)
            mainTl.add(animateCard1In(targetCard1), `-=${animationDuration * 0.2}`);
        if (targetCard2)
            mainTl.add(animateCard2In(targetCard2), `-=${animationDuration * 0.9}`);
        currentSlide = targetIndex;
    }
    initSlider();
    // ScrollTrigger principal avec pin
    const teamSlider = section.querySelector('.team-slider');
    ScrollTrigger.create({
        trigger: teamSlider,
        start: "top 13%",
        end: () => `+=${slides.length * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: false,
        onUpdate: (self) => {
            // Calculer quel slide afficher basé sur la progression du scroll
            const progress = self.progress;
            const targetSlide = Math.min(Math.floor(progress * slides.length), slides.length - 1);
            if (targetSlide !== currentSlide) {
                goToSlide(targetSlide);
            }
        }
    });
}
