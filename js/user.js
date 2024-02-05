  // Animacija naslova
const prviNaslov = document.querySelector("#prvi");

document.addEventListener("DOMContentLoaded", async function() {
    setTimeout(function (){
        prviNaslov.style.opacity = 1;
        prviNaslov.style.animation = "fadeIn-prica 1s ease-in-out forwards";
    }, 1000);
});

// Za galeriju (modal)

//Polje slika
let itemsImgs = document.querySelectorAll(".gallery-item");
itemsImgsArr = Array.from(itemsImgs);

//pop-up
let popSlider = document.querySelector("section .modal-layer");
let bgSlide = document.querySelector(".modal-layer .slide-img");

let closeBtn = document.querySelector("#closeBtn");
closeBtn.style.cssText = `cursor : pointer;`;
// lijevo
let prevBtn = document.querySelector("#prev");
prevBtn.style.cssText = `cursor : pointer;`;
// desno
let nextBtn = document.querySelector("#next");
nextBtn.style.cssText = `cursor : pointer;`;


//index slike
let activeIndex;

for (let i = 0; i < itemsImgs.length; i++) {
  itemsImgs[i].addEventListener("click", async function (e) {
    popSlider.style.display = "flex";
    let activeSrc = e.target.src;
    bgSlide.style.backgroundImage = `url(${activeSrc})`;
    activeIndex = itemsImgsArr.indexOf(e.target);
  });
}

closeBtn.addEventListener("click", removeSlider);

function removeSlider() {
  popSlider.style.display = "none";
}

nextBtn.addEventListener("click", nextSlider);

async function nextSlider() {
  activeIndex++;
  if (activeIndex == itemsImgs.length) {
    activeIndex = 0;
  }
  let imgSrc = itemsImgsArr[activeIndex].src;
  bgSlide.style.backgroundImage = `url(${imgSrc})`;
}

prevBtn.addEventListener("click", prevSlider);

async function prevSlider() {
  activeIndex--;
  if (activeIndex < 0) {
    activeIndex = itemsImgs.length - 1;
  }
  let imgSrc = itemsImgsArr[activeIndex].src;
  bgSlide.style.backgroundImage = `url(${imgSrc})`;
}

// keyboard events
document.addEventListener("keydown", async function (e) {
  if (e.key == "Escape") {
    removeSlider();
  } else if (e.key == "ArrowRight") {
    nextSlider();
  } else if (e.key == "ArrowLeft") {
    prevSlider();
  }
});