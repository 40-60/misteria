import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/ScrollTrigger.js";

const style = document.createElement("style");
style.innerHTML = `
  .section-programme-contenu {
    position: relative;
    left: 0;
    top: 6rem !important;
    margin: 0;
    height: 100vh;
    overflow: hidden;
  }



  .programme-contenu-container {
    position: relative;
    width: 100%;
    height: 400px;
  }

  /* Progress bar à l'intérieur du container */
  .progress-container {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 10;
  }

  .progress-line {
      width: 40px;
      height: 2px;
      background: var(--_color---primary--100);
      border-radius: 2px;
      transition: background 0.4s cubic-bezier(0.4, 0, 0, 1);
      margin-left: auto;
      margin-right: 0;
  }

  .progress-line.active {
      background: var(--_color---primary--500);
      width: 56px;
  }

  .programme-contenu-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0 !important;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0, 1);
  }

  .programme-contenu-wrapper.active {
    opacity: 1 !important;
    z-index: 2;
  }

  @media (max-width: 991px) {
      .section-programme-contenu {
          top: 3rem !important;
      }

      .progress-container {
            top: 10px;
                gap: 5px;
        }  

      .programme-contenu-wrapper {
          width: 85%;
      }

      .progress-line.active {
          width: 33px;
      }

      .progress-line {
        width: 23px;
            height: 1.33px;
    }

          
  }

`;
document.head.appendChild(style);

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".section-programme-contenu").forEach(section => {
  const wrappers = section.querySelectorAll(".programme-contenu-wrapper");
  const container = section.querySelector(".programme-contenu-container");

  // Créer le container des progress lines à l'intérieur du container
  const progressContainer = document.createElement("div");
  progressContainer.classList.add("progress-container");
  container.appendChild(progressContainer);

  wrappers.forEach((w, idx) => {
    // w.style.opacity = idx === 0 ? "1" : "0";

    // Créer chaque ligne de progression
    const line = document.createElement("div");
    line.classList.add("progress-line");
    if (idx === 0) line.classList.add("active");
    progressContainer.appendChild(line);
  });

  const progressLines = progressContainer.querySelectorAll(".progress-line");

  let tl = gsap.timeline({
    scrollTrigger: {
  trigger: section,
  start: "top top",
  end: () => "+=" + (wrappers.length * window.innerHeight),
  scrub: false, // instantané
  pin: true,
  onUpdate: self => {
    // progress est toujours entre 0 et 1, même en remontant
    let index = Math.floor(self.progress * wrappers.length);

    // Clamp pour éviter les dépassements
    index = Math.max(0, Math.min(wrappers.length - 1, index));

    wrappers.forEach((w, i) => {
      w.classList.toggle("active", i === index);
      progressLines[i].classList.toggle("active", i === index);
    });
  }
}



  });

  wrappers.forEach((wrapper, i) => {
    if (i === 0) return;
    tl.to(wrappers[i - 1], { 
        // opacity: 0, 
        duration: 0, 
        ease: "cubic-bezier(0.4, 0, 0, 1)" 
      }, i)
      .to(wrapper, { 
        // opacity: 1, 
        duration: 0, 
        ease: "cubic-bezier(0.4, 0, 0, 1)" 
      }, i);
  });


});
