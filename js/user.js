// Animacija naslova
const prviNaslov = document.getElementById("naslov");

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    prviNaslov.style.opacity = 1;
    prviNaslov.style.animation = "fadeIn-prica 1s ease-in-out forwards";
  }, 1000);
}
);

// funkcija za vraćanje navigacije
var navbarLinksDiv = document.getElementById("navbarSupportedContent");
var navButton = document.getElementsByClassName("navbar-toggler");
navbarLinksDiv.addEventListener('click', () => {
  navbarLinksDiv.classList.remove("show");
  navButton.classList.add("collapsed");
});

// linkovi gumbi za galeriju
document.querySelectorAll('.gallery-button').forEach(button => {
  button.addEventListener('click', function () {
    window.location.href = this.getAttribute('data-href');
  });
});

// linkovi gumbi za kontakt
document.querySelectorAll('.upit').forEach(button => {
  button.addEventListener('click', function () {
    window.location.href = this.getAttribute('data-href');
  });
});

