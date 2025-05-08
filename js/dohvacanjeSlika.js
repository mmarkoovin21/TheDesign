document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.location.origin;

  dohvatiSlike(`${baseUrl}/apiIzrada.php`, 
               'izradaGalleryConteiner', 
               'pic/izrada');

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
