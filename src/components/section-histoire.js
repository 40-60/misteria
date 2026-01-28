import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/ScrollTrigger.js";

if (document.querySelector('.section-histoire') && window.innerWidth >= 991) {

    const style = document.createElement("style");
    style.innerHTML = `
        .histoire-card { opacity:0.4; transition:opacity 0.85s, transform 0.85s; transform:translateY(12px); }
        .histoire-card.active { opacity:1; transform:translateY(0); }
        .methodologie-item._2 { display:none; opacity:0; transform:translateY(12px); transition:opacity 0.85s, transform 0.85s; }
        .active .methodologie-item._2 { display:block; opacity:1; transform:translateY(0); }
        .histoire-content-wrapper-left { position:relative; }
        .image-histoire-content-item { position:absolute; top:0; left:0; width:100%; opacity:0; transition:opacity 0.85s, transform 0.85s; }
        .image-histoire-content-item.active { opacity:1; transform:scale(1); }
        .histoire-card, .image-histoire-content-item, .methodologie-item._2 { will-change: opacity, transform; }
    `;
    document.head.appendChild(style);

    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.section-histoire');
    const cards = gsap.utils.toArray(".histoire-card");
    const images = gsap.utils.toArray(".image-histoire-content-item");

    // ScrollTrigger global
    ScrollTrigger.create({
        trigger: section,
        start: "top 35%",
        end: "bottom 35%",
        onUpdate: self => {
            const progress = self.progress; // 0 → 1
            const index = Math.floor(progress * cards.length);
            activateStep(index);
        },
        markers: false // pour debug
    });

    function activateStep(index) {
        // clamp index pour éviter overflow
        const safeIndex = Math.min(index, cards.length - 1);

        cards.forEach(card => card.classList.remove("active"));
        images.forEach(img => img.classList.remove("active"));

        cards[safeIndex].classList.add("active");
        images[safeIndex].classList.add("active");
    }

}
