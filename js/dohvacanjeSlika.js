document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.location.origin;

  dohvatiSlike(`${baseUrl}/apiIzrada.php`, 
               'izradaGalleryConteiner', 
               'pic/izrada').then(initGalleryModal);

  dohvatiSlike(`${baseUrl}/apiObnova.php`, 
               'obnovaGalleryConteiner', 
               'pic/obnova').then(initGalleryModal);;

  dohvatiPrveDvije(`${baseUrl}/apiIzrada.php`, 
                  'prveDvijeIzrada', 
                  'pic/izrada').then(initGalleryModal);;

  dohvatiPrveDvije(`${baseUrl}/apiObnova.php`, 
                  'prveDvijeObnova', 
                  'pic/obnova', 
                  '.galleryButtonContainer').then(initGalleryModal);;
});

async function dohvatiSlike(apiUrl, containerId, picFolder) {
  try {
    const res = await fetch(apiUrl);
    const images = await res.json();
    const container = document.getElementById(containerId);

    images.forEach(name => {
      const col = document.createElement('div');
      col.classList.add('col');
      const img = document.createElement('img');
      img.classList.add('gallery-item');
      img.loading = 'lazy';
      img.src = `${window.location.origin}/dokumentacija/${picFolder}/${name}`;
      img.alt = name;
      col.appendChild(img);
      container.appendChild(col);
    });
  } catch (e) {
    console.error(e);
  }
}

async function dohvatiPrveDvije(apiUrl, containerId, picFolder, buttonSelector = null) {
  try {
    const res = await fetch(apiUrl);
    const images = await res.json();
    const container = document.getElementById(containerId);

    let buttonDiv = null;
    if (buttonSelector) {
      buttonDiv = container.querySelector(buttonSelector);
    }

    images.slice(0, 2).forEach(name => {
      const col = document.createElement('div');
      col.classList.add('col');
      const img = document.createElement('img');
      img.classList.add('gallery-item');
      img.loading = 'lazy';
      img.src = `${window.location.origin}/dokumentacija/${picFolder}/${name}`;
      img.alt = name;
      col.appendChild(img);

      if (buttonDiv) {
        container.insertBefore(col, buttonDiv);
      } else {
        container.prepend(col);
      }
    });
  } catch (e) {
    console.error(e);
  }
}

function initGalleryModal() {
    const items = document.querySelectorAll('.gallery-item');
    const itemsArr = Array.from(items);
  
    const popSlider = document.querySelector('.modal-layer');
    const bgSlide   = popSlider.querySelector('.slide-img');
    const closeBtn  = popSlider.querySelector('#closeBtn');
    const nextBtn   = popSlider.querySelector('#next');
    const prevBtn   = popSlider.querySelector('#prev');
  
    let activeIndex = 0;
  
    document.body.addEventListener('click', e => {
      if (e.target.matches('.gallery-item')) {
        activeIndex = itemsArr.indexOf(e.target);
        bgSlide.style.backgroundImage = `url(${e.target.src})`;
        popSlider.style.display = 'flex';
      }
    });
  
    closeBtn.addEventListener('click', () => popSlider.style.display = 'none');
    popSlider.addEventListener('click', e => {
      if (e.target === popSlider) popSlider.style.display = 'none';
    });
  
    nextBtn.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % itemsArr.length;
      bgSlide.style.backgroundImage = `url(${itemsArr[activeIndex].src})`;
    });
  
    prevBtn.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + itemsArr.length) % itemsArr.length;
      bgSlide.style.backgroundImage = `url(${itemsArr[activeIndex].src})`;
    });
  
    document.addEventListener('keydown', e => {
      if (popSlider.style.display === 'flex') {
        if (e.key === 'Escape') popSlider.style.display = 'none';
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft')  prevBtn.click();
      }
    });
  }
