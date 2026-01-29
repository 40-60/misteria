import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/ScrollTrigger.js";

if (document.querySelector('.section-methode-3') && window.innerWidth >= 991) {
    const style = document.createElement("style");
    style.innerHTML = `
    .methodologies-audit-wrapper-left img {
        height: 400px !important;
    }

    .methodologies-audit-wrapper-left {
        height: 400px !important;
    }
    .methodologie-item p.medium-reg {
        opacity: 0 !important;
        transform: translateY(10px) !important;
        clip-path: inset(0 0 100% 0) !important;
        transition: opacity 850ms cubic-bezier(0.4, 0, 0, 1), transform 850ms cubic-bezier(0.4, 0, 0, 1), clip-path 0.6s ease;
    }

    .methodologie-item.active p.medium-reg {
        opacity: 1 !important;
        transform: translateY(0) !important;
        clip-path: inset(0 0 0 0) !important;
    }

    .methodologies-audit-wrapper-left {
        position: relative;
    }

    .methodologie-item-image {
        position: absolute;
        top: 0;
        width: max-content;
        height: max-content;
        opacity: 0;
        left: 0;
        transition: opacity 850ms cubic-bezier(0.4, 0, 0, 1), transform 850ms cubic-bezier(0.4, 0, 0, 1);
    }

    .methodologie-item-image img {
        height: 100%;
        width: 100%;
    }

    .methodologie-item-image.active {
        opacity: 1;
    }

    /* Styles pour la barre de progression */
    .progress-bar-container {
        width: 100px;
        height: 4px;
        background-color: #e5e5e5;
        border-radius: 2px;
        overflow: hidden;
    }

    .progress-bar-fill {
        height: 100%;
        background-color: #000;
        width: 0%;
        transition: width 850ms cubic-bezier(0.4, 0, 0, 1);
    }
    `;
    document.head.appendChild(style);

    gsap.registerPlugin(ScrollTrigger);

    const items = document.querySelectorAll(".methodologie-item");
    const images = document.querySelectorAll(".methodologies-audit-wrapper-left .methodologie-item-image");
    const compteurGauche = document.querySelector(".compteur-methodologie .other-data-sm:first-child");
    const compteurDroit = document.querySelector(".compteur-methodologie .other-data-sm:last-child");

    // Mettre à jour le total sur le côté droit
    if (compteurDroit) {
        const totalItems = items.length.toString().padStart(2, '0');
        compteurDroit.textContent = totalItems;
    }

    // Remplacer l'image par une barre de progression
    const imgElement = document.querySelector(".compteur-methodologie img");
    if (imgElement) {
        const progressBarHTML = `
            <div class="progress-bar-container">
                <div class="progress-bar-fill"></div>
            </div>
        `;
        imgElement.outerHTML = progressBarHTML;
    }

    const progressBar = document.querySelector(".progress-bar-fill");

    function activateItem(index) {
        items.forEach((i, idx) => i.classList.toggle("active", idx === index));
        images.forEach((img, idx) => img.classList.toggle("active", idx === index));
        
        // Mise à jour du compteur gauche (current)
        if (compteurGauche) {
            const currentNumber = (index + 1).toString().padStart(2, '0');
            compteurGauche.textContent = currentNumber;
        }
        
        // Mise à jour de la barre de progression
        if (progressBar) {
            const totalItems = items.length;
            const progressPercentage = ((index + 1) / totalItems) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    // Pin du titre
    ScrollTrigger.create({
        trigger: ".section-methode-info-title",
        start: "top top+=120rem",
        end: () => {
            const rightWrapper = document.querySelector(".methodologies-audit-wrapper-right");
            const leftWrapper = document.querySelector(".methodologies-audit-wrapper-left");
            const infoTitle = document.querySelector(".methode-title-info");
            const description = document.querySelector(
                'body > div.page-wrapper > main > section.section-methode-3 > div > div > div.margin-bottom.margin-80'
            );

            const descriptionHeight = description ? description.offsetHeight : 0;

            console.log('descriptionHeight', descriptionHeight);

            return `+=${rightWrapper.offsetHeight - (leftWrapper.offsetHeight)}`;
        },

        pin: true,
        pinSpacing: false,
        pinType: "fixed",
        markers: false,
        invalidateOnRefresh: true,
    });

    // Pin du wrapper-left (images)
    ScrollTrigger.create({
        trigger: ".methodologies-audit-wrapper-left",
        start: "top top+=400rem",

        end: () => {
            const rightWrapper = document.querySelector(".methodologies-audit-wrapper-right");
            const leftWrapper = document.querySelector(".methodologies-audit-wrapper-left");
            const description = document.querySelector(
                'body > div.page-wrapper > main > section.section-methode-3 > div > div > div.margin-bottom.margin-80'
            );

            const descriptionHeight = description ? description.offsetHeight : 0;

            // console.log('descriptionHeight', descriptionHeight);

            return `+=${rightWrapper.offsetHeight - leftWrapper.offsetHeight - descriptionHeight + 20}`;
        },
        pin: true,
        pinSpacing: false,
        pinType: "fixed",
        markers: false,
        invalidateOnRefresh: false,
    });

    // Activation des items au scroll
    items.forEach((item, index) => {
        ScrollTrigger.create({
            trigger: item,
            start: "top center",
            end: "bottom center",
            onEnter: () => activateItem(index),
            onEnterBack: () => activateItem(index),
            markers: false,
            pinSpacing: true,
        });
    });
}