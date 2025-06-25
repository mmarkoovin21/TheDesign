document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.location.origin;

  dohvatiSlike(`${baseUrl}/apiIzrada.php`,
    'izradaGalleryConteiner',
    'pic/izrada')

  dohvatiSlike(`${baseUrl}/apiObnova.php`,
    'obnovaGalleryConteiner',
    'pic/obnova');

  dohvatiPrveDvije(`${baseUrl}/apiIzrada.php`,
    'prveDvijeIzrada',
    'pic/izrada');

  dohvatiPrveDvije(`${baseUrl}/apiObnova.php`,
    'prveDvijeObnova',
    'pic/obnova',
    '.galleryButtonContainer');
  dohvatiPartnere(`${baseUrl}/apiPartneri.php`, 'partners-slider', 'partners');
  dohvatiPartnere(`${baseUrl}/apiPartneri.php`, 'partners-slider', 'partners');
  initGalleryModal();
});

async function dohvatiPartnere(apiUrl, containerId, picFolder) {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const images = await res.json();
    const container = document.getElementsByClassName(containerId)[0];
    if (!container) throw new Error(`Element s id="${containerId}" ne postoji`);

    images.forEach(name => {
      const img = document.createElement('img');
      img.classList.add('partners-img');
      img.loading = 'lazy';
      img.src = `${window.location.origin}/dokumentacija/${picFolder}/${name}`;
      img.alt = name;
      container.appendChild(img);
    });
  } catch (e) {
    console.error('Greška pri dohvatu partnera ili prikazu slika:', e);
  }
}


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
  const modal = document.getElementById('galleryModal');
  const modalImage = document.getElementById('modalImage');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  let itemsArr = [];
  let currentIndex = 0;

  const refreshItems = () => {
    itemsArr = Array.from(document.querySelectorAll('.gallery-item'));
  };
  refreshItems();
  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('gallery-item')) {
      refreshItems();
      currentIndex = itemsArr.indexOf(e.target);
      modalImage.src = e.target.src;
      modal.classList.add('active');
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + itemsArr.length) % itemsArr.length;
    modalImage.src = itemsArr[currentIndex].src;
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % itemsArr.length;
    modalImage.src = itemsArr[currentIndex].src;
  });

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') modal.classList.remove('active');
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
