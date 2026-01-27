import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/ScrollTrigger.js";

if (
    document.querySelector('.section-methode-3') &&
    window.innerWidth >= 991
) {

    /* =========================
       1. Injection CSS
    ========================= */
    const style = document.createElement("style");
    style.innerHTML = `
       .methodologies-audit-wrapper {
            display: flex;
            gap: 7rem;
            align-items: flex-start;
        }

        .methodologies-audit-wrapper-left {
            position: sticky;
            top: 15rem;
                flex: 25%;
            min-height: 580px;
        }

        .methodologie-item-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .methodologie-item-image.active {
            opacity: 1 !important;
            z-index: 2;
        }

        .methodologies-audit-wrapper-right {
               flex: 75%;
            display: flex;
            flex-direction: column;
            gap: 3rem;
        }

        .methodologie-item {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    /* =========================
       2. GSAP Logic
    ========================= */
    (async function () {
        try {
            gsap.registerPlugin(ScrollTrigger);

            const items = document.querySelectorAll(
                '.methodologies-audit-wrapper-right .methodologie-item'
            );
            const images = document.querySelectorAll(
                '.methodologies-audit-wrapper-left .methodologie-item-image'
            );

            if (!items.length || !images.length) return;

            // État initial
            images.forEach((img, i) => {
                img.style.opacity = i === 0 ? '1' : '0';
                if (i === 0) img.classList.add('active');
            });

            items.forEach((item, i) => {
                item.style.opacity = i === 0 ? '1' : '0.4';
            });

            /* =========================
               3. ScrollTriggers
            ========================= */
            items.forEach((item, i) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: 'top center',
                    end: 'bottom center',

                    onEnter: () => activateStep(i),
                    onEnterBack: () => activateStep(i)
                });
            });

            function activateStep(index) {
                // Images
                images.forEach((img, i) => {
                    img.classList.toggle('active', i === index);
                });

                // Items opacity
                items.forEach((el, i) => {
                    el.style.opacity = i === index ? '1' : '0.4';
                });
            }

        } catch (err) {
            console.error('GSAP / ScrollTrigger error', err);
        }
    })();
}
