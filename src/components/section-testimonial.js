import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.14.0/index.js";

// Fonction pour dupliquer les items pour effet infini
function setupInfiniteScroll() {
  const leftList = document.querySelector(".testimonial33_list-left .testimonial33_list");
  const rightList = document.querySelector(".testimonial33_list-right .testimonial33_list");
  
  if (!leftList || !rightList) return;
  
  // Dupliquer les items plusieurs fois pour un scroll fluide
  const duplicateCount = 3;
  
  // Sauvegarder le contenu original
  const leftContent = leftList.innerHTML;
  const rightContent = rightList.innerHTML;
  
  // Dupliquer le contenu
  for (let i = 0; i < duplicateCount; i++) {
    leftList.innerHTML += leftContent;
    rightList.innerHTML += rightContent;
  }
  
  // Animation gauche (monte)
  gsap.to(leftList, {
    yPercent: -25,
    duration: 50,
    ease: "none",
    repeat: -1,
    modifiers: {
      yPercent: gsap.utils.wrap(-25, 0)
    }
  });
  
  // Animation droite (descend - inverse)
  gsap.to(rightList, {
    yPercent: 25,
    duration: 50,
    ease: "none",
    repeat: -1,
    modifiers: {
      yPercent: gsap.utils.wrap(0, 25)
    }
  });
}

// Appel direct ou avec DOMContentLoaded selon votre setup
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupInfiniteScroll);
} else {
  setupInfiniteScroll();
}