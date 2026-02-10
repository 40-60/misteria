// Récupérer le style de masquage FOUC injecté dans le <head> HTML
  // IMPORTANT : ce CSS doit être dans le <head> de la page (Webflow → Project Settings → Custom Code → Head Code) :
  // <style id="gsap-preload-hide">
  //   h1, h2, h3, h4, h5, h6,
  //   .testimonial33_card, .normal-reg, .medium-reg, .medium-b {
  //     opacity: 0 !important;
  //     visibility: hidden !important;
  //   }
  // </style>
  const preloadStyle = document.getElementById("gsap-preload-hide");

  // Charger GSAP depuis un CDN
  let loadedCount = 0;
  const totalScripts = 3;

  const onScriptLoad = () => {
    loadedCount++;
    if (loadedCount < totalScripts) return;

    gsap.registerPlugin(SplitText, ScrollTrigger);

    // Dispatch custom event pour signaler que GSAP est prêt
    window.dispatchEvent(new CustomEvent('gsapReady'));

    runAnimations();
  };

  const gsapScript = document.createElement("script");
  gsapScript.src = "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js";
  gsapScript.onload = onScriptLoad;
  document.head.appendChild(gsapScript);

  // Charger SplitText depuis le CDN (version démo)
  const splitScript = document.createElement("script");
  splitScript.src = "https://assets.codepen.io/16327/SplitText3-beta.min.js?b=26";
  splitScript.onload = onScriptLoad;
  document.head.appendChild(splitScript);

  // Charger ScrollTrigger
  const scrollTriggerScript = document.createElement("script");
  scrollTriggerScript.src = "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js";
  scrollTriggerScript.onload = onScriptLoad;
  document.head.appendChild(scrollTriggerScript);

  // Animations à exécuter quand tout est chargé
  function runAnimations() {
    console.clear();

    // Attendre que les fonts soient prêtes avant de configurer les animations
    document.fonts.ready.then(() => {
      // title animation
      // Sélectionner tous les h1 à h6 qui ne sont pas descendants de .w-dyn-items
      const headers = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
      .filter(el => !el.closest(".section-direction, .section-mission-2 .heading-style-h2, .testimonial33_card, .gallery22_slider, .text-indent-small, .kpis-methode-wrapper , .formation-info-wrapper-global, .w-dyn-items, .formation-cta-wrapper-2, .formation-info-wrapper, .programme-contenu-wrapper"));

      headers.forEach((header) => {
        // GSAP inline styles écrasent le CSS, donc on peut révéler via set()
        gsap.set(header, { visibility: "visible", opacity: 1 });

        // SplitText
        const split = SplitText.create(header, {
          type: "words,lines",
          linesClass: "line",
          autoSplit: true,
          mask: "lines"
        });

        // Animation au scroll
        gsap.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: "cubic-bezier(0.4, 0, 0, 1)",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });

      // paragraphe animation
      const elements = Array.from(document.querySelectorAll(".testimonial33_card, .normal-reg, .medium-reg, .medium-b "))
      .filter(el => !el.closest(".section-direction, .section-mission-2 .heading-style-h2,.formation-info-wrapper-global, .w-dyn-items, .formation-cta-wrapper-2, .formation-info-wrapper, .programme-contenu-wrapper, .temoignage-info-1"));

      elements.forEach(el => {
        // visibility visible mais opacity 0 → invisible, GSAP contrôle tout
        gsap.set(el, { visibility: "visible", opacity: 0, y: 30 });

        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "cubic-bezier(0.4, 0, 0, 1)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });

      // Retirer le style de masquage APRÈS que GSAP a posé les inline styles sur chaque élément
      if (preloadStyle) preloadStyle.remove();
    });

    // image animation
    document.fonts.ready.then(() => {
      const images = Array.from(document.querySelectorAll("img"))
      .filter(img => !img.closest(".methodologie-item-image, .testimonial33_card, .section-white-hero, .section-usages, .section-finacement-formation, .section-espace-presse, .formation-info-1, .financement-wrapper .section.section-finacement-formation, .radius-full, .section-methode-3, .ressouce-item, .section-entreprises-partenaires, .nav_container, .ressouce-ite, .footer, .formation-info-wrapper-global, .testimonial33_content, .intervenant-regroup, .programme-contenu-container, ._24x24, .section-expertise-conseil, .avantages-anim-wrapper, .w-dyn-items, .logo6_content, .video-presse-container"));

      images.forEach(img => {
        // Wrapper
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "inline-block";
            wrapper.style.width = "100%";


        // Masque blanc (rideau inversé)
        const mask = document.createElement("div");
        mask.style.position = "absolute";
        mask.style.top = 0;
        mask.style.left = 0;
        mask.style.width = "100%";
        mask.style.height = "100%";
        mask.style.background = "#fff";
        mask.style.zIndex = 2;

        // DOM
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        wrapper.appendChild(mask);

        // État initial image (zoom)
        gsap.set(img, { scale: 1.5 });

        // Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });

        // Rideau
        tl.to(mask, {
          height: 0,
          duration: 0.85,
          ease: "cubic-bezier(0.4, 0, 0, 1)"
        }, 0);

        // Dézoom image
        tl.to(img, {
          scale: 1,
          duration: 0.85,
          ease: "cubic-bezier(0.4, 0, 0, 1)"
        }, 0);
      });
    });
  };

  // animation de bloc pas au point
  document.fonts.ready.then(() => {
      const containers = document.querySelectorAll(".w-dyn-items");

      containers.forEach(container => {
          const items = container.querySelectorAll(".w-dyn-item");

          if (!items.length) return;

          // État initial : tous à 0.2
          gsap.set(items, { opacity: 0.4 });

          const tl = gsap.timeline({
              scrollTrigger: {
                  trigger: container,
                  start: "top 75%",
                  end: () => "+=" + container.offsetHeight,
                  scrub: 3,
                  invalidateOnRefresh: true,
                  once: true
              }
          });

          items.forEach((item, index) => {
              // Étape principale : item courant à 1
              tl.to(item, {
                  opacity: 1,
                  ease: "none"
              });

              // Étape suivante : préparer le prochain à 0.5
              if (items[index + 1]) {
                  tl.to(items[index + 1], {
                      opacity: 0.85,
                      ease: "none"
                  }, "<");
              }
          });
      });
  });

  // TEXT REVEAL ANIMATION - all targeted elements
  document.fonts.ready.then(() => {
  const elements = document.querySelectorAll('.w-richtext p, .temoignage-info-1 p, .section-mission-2 .heading-style-h2');

  elements.forEach(el => {
    const text = el.textContent;
    const words = text.split(/\s+/);

    el.innerHTML = words.map(word =>
      `<span class="reveal-word" style="color: #6D798C; display: inline-block; transition: none;">${word}</span>`
    ).join(' ');

    const wordSpans = el.querySelectorAll('.reveal-word');

    gsap.to(wordSpans, {
      color: '#251F38',
      stagger: 0.03,
      scrollTrigger: {
        trigger: el,
        start: 'top 65%',
        end: 'bottom 30%',
        scrub: 1,
      }
    });
  });
  });