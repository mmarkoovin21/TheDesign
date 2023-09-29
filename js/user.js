
// Za galeriju (modal)
document.addEventListener("click",function (e){
    if(e.target.classList.contains("gallery-item")){
          const src = e.target.getAttribute("src");
          document.querySelector(".modal-img").src = src;
          const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
          myModal.show();
    }
  });
  // Animacija naslova
  const prviNaslov = document.querySelector("#prvi");
  const drugiNaslov = document.querySelector("#drugi");

  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function (){
        prviNaslov.style.opacity = 1;
        prviNaslov.style.animation = "fadeIn-prica 1s ease-in-out forwards";
    }, 1000);
    setTimeout(function(){
        drugiNaslov.style.opacity = 1;
        drugiNaslov.style.animation = "fadeIn-prica 1s ease-in-out forwards";
    }, 2000);
});