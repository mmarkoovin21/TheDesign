// Animacija naslova
const prviNaslov = document.getElementById("naslov")

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    prviNaslov.style.opacity = 1;
    prviNaslov.style.animation = "fadeIn-prica 1s ease-in-out forwards";
  }, 1000);

  dohvatiSlikeIzrade();
}
);

async function dohvatiSlikeIzrade() {
  fetch('https://thedesign.hr/apiIzrada.php')
    .then(response => response.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .then(images => {

      const container = document.getElementById('izradaGalleryConteiner');


      images.forEach(imageName => {
        console.log(imageName);

        const div = document.createElement('div');
        div.classList.add('col');

        const img = document.createElement('img');
        img.classList.add('gallery-item');
        img.loading = 'lazy';
        img.src = `https://www.thedesign.hr/dokumentacija/pic/izrada/${imageName}`;
        img.alt = 'slika1';

        div.appendChild(img);
        container.appendChild(div);
      });

    })
    .catch(error => console.error('Došlo je do pogreške prilikom učitavanja slika:', error));
}

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
  itemsImgs[i].addEventListener("click", function (e) {
    popSlider.style.display = "flex";
    let activeSrc = e.target.src;
    bgSlide.style.backgroundImage = `url(${activeSrc})`;
    bgSlide.style, bacgroundSize = `50%`;
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

// događaji za listanje galerije pomoću tipkovinice
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    removeSlider();
  } else if (e.key == "ArrowRight") {
    nextSlider();
  } else if (e.key == "ArrowLeft") {
    prevSlider();
  }
});

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

