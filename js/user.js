const prviNaslov = document.getElementById("naslov");

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    prviNaslov.style.opacity = 1;
    prviNaslov.style.animation = "fadeIn-prica 1s ease-in-out forwards";
  }, 1000);
}
);