// Utilise le gsap global chargé par gsap-anim-global.js
const initSectionHistoire = () => {
    if (!document.querySelector('.section-histoire') || window.innerWidth < 991)
        return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined')
        return;
    const style = document.createElement("style");
    style.innerHTML = `
        .histoire-card { opacity:0.35; transition:opacity 850ms cubic-bezier(0.4, 0, 0, 1), transform 850ms cubic-bezier(0.4, 0, 0, 1); transform:translateY(12px); }
        .histoire-card.active { opacity:1; transform:translateY(0); }
        .methodologie-item._2 { display:none; opacity:0; transform:translateY(12px); transition:opacity 0.85s, transform 0.85s; }
        .active .methodologie-item._2 { display:block; opacity:1; transform:translateY(0); }
        .histoire-content-wrapper-left { position:relative; overflow: hidden; }
        .image-histoire-content-item { position:absolute; top:0; left:0; width:100%; opacity:0; pointer-events: none; }
        .image-histoire-content-item.active { opacity:1; pointer-events: auto; }
        .histoire-card, .methodologie-item._2 { will-change: opacity, transform; }
    `;
    document.head.appendChild(style);
    const cards = gsap.utils.toArray(".histoire-card");
    const images = gsap.utils.toArray(".image-histoire-content-item");
    const steps = cards.length;
    if (!cards.length)
        return;
    // Variable pour tracker l'index actif
    let currentIndex = -1;
    // Initialiser toutes les images en position basse
    images.forEach(img => {
        gsap.set(img, { y: '100%', opacity: 0 });
    });
    function activateStep(index) {
        if (currentIndex === index)
            return;
        const previousIndex = currentIndex;
        currentIndex = index;
        // Activer/désactiver les cartes texte
        cards.forEach(card => card.classList.remove("active"));
        cards[index].classList.add("active");
        // Animation des images avec effet de stack
        if (images[index]) {
            const goingDown = index > previousIndex;
            // Animation de l'ancienne image (si elle existe)
            if (previousIndex >= 0 && images[previousIndex]) {
                images[previousIndex].classList.remove("active");
                gsap.to(images[previousIndex], {
                    y: goingDown ? '-100%' : '100%',
                    opacity: 0,
                    duration: 0.85,
                    ease: 'cubic-bezier(0.4, 0, 0, 1)'
                });
            }
            // Animation de la nouvelle image
            images[index].classList.add("active");
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
    images[0].classList.add("active");
    cards[0].classList.add("active");
    currentIndex = 0;
    // --- Navigation par étapes (wheel + clavier) ---
    const section = document.querySelector('.section-histoire');
    let isLocked = false; // scroll verrouillé dans la section
    let isAnimating = false; // empêche les inputs pendant l'animation
    function goToStep(direction) {
        if (isAnimating)
            return;
        const nextIndex = currentIndex + direction;
        // Si on dépasse les limites, on libère le scroll
        if (nextIndex < 0 || nextIndex >= steps) {
            isLocked = false;
            return;
        }
        isAnimating = true;
        activateStep(nextIndex);
        // Débloquer après la durée de l'animation
        setTimeout(() => { isAnimating = false; }, 900);
    }
    // Wheel : un tick = un changement de carte
    section.addEventListener('wheel', (e) => {
        if (!isLocked)
            return;
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        goToStep(direction);
    }, { passive: false });
    // Clavier : flèches haut/bas
    // window.addEventListener('keydown', (e) => {
    //     if (!isLocked) return;
    //     if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    //     e.preventDefault();
    //     const direction = e.key === 'ArrowDown' ? 1 : -1;
    //     goToStep(direction);
    // });
    // ScrollTrigger pour détecter l'entrée/sortie de la section
    ScrollTrigger.create({
        trigger: section,
        start: "top 30%",
        end: "bottom center",
        onEnter: () => { isLocked = true; },
        onEnterBack: () => { isLocked = true; },
        onLeave: () => { isLocked = true; },
        onLeaveBack: () => { isLocked = true; },
        markers: false,
        id: 'histoire-lock'
    });
};
// Attendre que gsap global soit disponible
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    initSectionHistoire();
}
else {
    // Écouter l'événement gsapReady déclenché par gsap-anim-global.js
    window.addEventListener('gsapReady', initSectionHistoire, { once: true });
}
