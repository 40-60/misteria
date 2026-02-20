// expertise conseil section
if (document.querySelector('.section-expertise-conseil') && window.innerWidth >= 991) {
    (async function () {
        try {
            /* =========================
        1. Injection du CSS
        ========================= */
            const style = document.createElement("style");
            style.innerHTML = `
                    .expertise-left {
                    position: relative;
                    overflow: hidden;
                    }

                    /* Infos & images superposées et centrées */
                    .expertise-title-info {
                        position: absolute;
                        top: 6%;
                        width: 100%;
                        transition: opacity 0.4s cubic-bezier(0.4, 0, 0, 1);
                    }

                    .expertise-image-wrapper {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    transform: translateY(-50%);
                    transition: opacity 0.4s cubic-bezier(0.4, 0, 0, 1);
                    }

                    /* État par défaut */
                    .expertise-title-info {
                    opacity: 1;
                    pointer-events: auto;
                    z-index: 2;
                    }

                    .expertise-image-wrapper {
                    opacity: 0;
                    pointer-events: none;
                    z-index: 1;
                    }

                    /* États actifs */
                    .expertise-title-info.is-hidden {
                    opacity: 0;
                    pointer-events: none;
                    }

                    .expertise-image-wrapper.is-visible {
                    opacity: 1;
                    pointer-events: auto;
                    }

                    /* Images */
                    .expertise-image-item {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    transition: opacity 0.45s cubic-bezier(0.4, 0, 0, 1);
                    }

                    .expertise-image-item.is-active {
                    opacity: 1;
                    position: relative;
                    }

                    .expertise-image-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    }
                `;
            document.head.appendChild(style);
            /* =========================
            2. Sélecteurs
            ========================= */
            const wrapper = document.querySelector(".expertise-wrapper");
            const expertiseLeft = wrapper.querySelector(".expertise-left");
            const titleInfo = wrapper.querySelector(".expertise-title-info");
            const imageWrapper = wrapper.querySelector(".expertise-image-wrapper");
            const images = wrapper.querySelectorAll(".expertise-image-item");
            const serviceItems = wrapper.querySelectorAll(".service-item");
            // if (!expertiseLeft || !titleInfo || !imageWrapper || !images.length) return;
            /* =========================
            3. Image par défaut
            ========================= */
            const defaultIndex = [...images].findIndex(img => img.classList.contains("is-active"));
            const fallbackIndex = defaultIndex !== -1 ? defaultIndex : 0;
            images.forEach(img => img.classList.remove("is-active"));
            images[fallbackIndex].classList.add("is-active");
            /* =========================
            4. Hover service-item
            ========================= */
            serviceItems.forEach((item, index) => {
                item.addEventListener("mouseenter", () => {
                    titleInfo.classList.add("is-hidden");
                    imageWrapper.classList.add("is-visible");
                    images.forEach(img => img.classList.remove("is-active"));
                    if (images[index]) {
                        images[index].classList.add("is-active");
                    }
                });
            });
            /* =========================
            5. Mouse leave
            ========================= */
            wrapper.addEventListener("mouseleave", () => {
                titleInfo.classList.remove("is-hidden");
                imageWrapper.classList.remove("is-visible");
                images.forEach(img => img.classList.remove("is-active"));
                images[fallbackIndex].classList.add("is-active");
            });
        }
        catch (err) {
            console.error('Erreur lors du chargement de la section', err);
        }
    })();
}
