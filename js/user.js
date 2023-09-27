
// Za galeriju (modal)
document.addEventListener("click",function (e){
    if(e.target.classList.contains("gallery-item")){
          const src = e.target.getAttribute("src");
          document.querySelector(".modal-img").src = src;
          const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
          myModal.show();
    }
  });
  // Animacija skrolanja
  // Funkcija koja će provjeriti kada se element nalazi na ekranu
function isElementInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }
  const prviNaslov = document.querySelector("#prvi");
  const drugiNaslov = document.querySelector("#drugi");
  
  // Funkcija koja će se pozvati pri svakom skrolanju
  function handleScroll() {
      if (isElementInViewport(prviNaslov)) {
          prviNaslov.style.opacity = 1;
          prviNaslov.style.animation = "fadeIn-prica 1.5s ease-in-out forwards";
      }
      if (isElementInViewport(drugiNaslov)) {
          drugiNaslov.style.opacity = 1;
          drugiNaslov.style.animation = "fadeIn-prica 1.5s ease-in-out forwards";
      }
  }
  
  // Dodajemo event listener za skrolanje
  window.addEventListener("scroll", handleScroll);
  
  // Pokretanje animacije pri učitavanju stranice (ako su elementi odmah vidljivi)
  handleScroll();
  