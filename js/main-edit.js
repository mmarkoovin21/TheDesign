async function dohvatiPartnere(apiUrl, containerId, picFolder) {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const images = await res.json();
    const container = document.getElementsByClassName(containerId)[0];
    if (!container) return;

    images.forEach(name => {
      const img = document.createElement('img');
      img.classList.add('partners-img');
      img.src = `${window.location.origin}/dokumentacija/${picFolder}/${name}`;
      img.alt = name;
      container.appendChild(img);
    });
  } catch (e) {
    console.error('Greška pri dohvatu partnera ili prikazu slika:', e);
  }
}

function fadeInTitle() {
  const prviNaslov = document.getElementById("naslov");
  if (!prviNaslov) return;

  setTimeout(() => {
    prviNaslov.style.opacity = 1;
    prviNaslov.style.animation = "fadeIn-prica 1s ease-in-out forwards";
  }, 1000);
}

function dohvatiSlike(apiUrl, containerId, picFolder) {
  const container = document.getElementById(containerId);
  if (!container) return;

  fetch(apiUrl)
    .then(res => res.json())
    .then(images => {
      images.forEach(name => {
        const baseName = name.replace(/\.(avif|jpg|jpeg|png|webp)$/i, '');
        const extension = name.split('.').pop();

        const col = document.createElement('div');
        col.classList.add('col');

        const img = document.createElement('img');
        img.classList.add('gallery-item');

        img.srcset = `
          ${window.location.origin}/dokumentacija/${picFolder}/mobile-480/${baseName}-480.${extension} 408w,
          ${window.location.origin}/dokumentacija/${picFolder}/tablet-720/${baseName}-720.${extension} 720w,
          ${window.location.origin}/dokumentacija/${picFolder}/${baseName}.${extension} 1080w
        `.trim();

        img.sizes = `(max-width: 480px) 480px, (max-width: 768px) 720px, 1080px`;
        img.src = `${window.location.origin}/dokumentacija/${picFolder}/tablet-720/${baseName}-720.${extension}`;
        img.alt = baseName;

        col.appendChild(img);
        container.appendChild(col);
      });
    })
    .catch(console.error);
}

async function dohvatiPrveDvije(apiUrl, containerId, picFolder, buttonSelector = null) {
  try {
    const res = await fetch(apiUrl);
    const images = await res.json();
    const container = document.getElementById(containerId);
    if (!container) return;

    let buttonDiv = null;
    if (buttonSelector) {
      buttonDiv = container.querySelector(buttonSelector);
    }

    images.slice(0, 2).forEach(name => {
      const baseName = name.replace(/\.(avif|jpg|jpeg|png|webp)$/i, '');
      const extension = name.split('.').pop();

      const col = document.createElement('div');
      col.classList.add('col');

      const img = document.createElement('img');
      img.classList.add('gallery-item');

      img.srcset = `
        ${window.location.origin}/dokumentacija/${picFolder}/mobile-480/${baseName}-480.${extension} 480w,
        ${window.location.origin}/dokumentacija/${picFolder}/tablet-720/${baseName}-720.${extension} 720w,
        ${window.location.origin}/dokumentacija/${picFolder}/${baseName}.${extension} 1080w
      `.trim();

      img.sizes = `(max-width: 480px) 480px, (max-width: 768px) 720px, 1080px`;
      img.src = `${window.location.origin}/dokumentacija/${picFolder}/tablet-720/${baseName}-720.${extension}`;
      img.alt = baseName;

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

let porukeGresaka;

function resetInputStyles(input) {
  input.style.border = "";
  input.style.borderRadius = "";
}

function CheckNameInput(name) {
  if (name.value.length < 3) {
    let li = document.createElement("li");
    li.innerHTML = "Upiši minimalno 3 znaka u Ime i prezime.";
    porukeGresaka.appendChild(li);
    name.style.border = "3px solid #A70A0A";
    name.style.borderRadius = "5px";
    return false;
  }
  return true;
}

function CheckEmailInput(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (email.value.trim().length === 0 || !regex.test(email.value)) {
    let li = document.createElement("li");
    li.innerHTML = "Ispravan format emaila je xxx@poslužitelj.domena.";
    porukeGresaka.appendChild(li);
    email.style.border = "3px solid #A70A0A";
    email.style.borderRadius = "5px";
    return false;
  }
  return true;
}

function CheckNumberInput(number) {
  if (number.value.length !== 10) {
    let li = document.createElement("li");
    li.innerHTML = "Ispravan format broja je 09x xxx xxxx.";
    porukeGresaka.appendChild(li);
    number.style.border = "3px solid #A70A0A";
    number.style.borderRadius = "5px";
    return false;
  }
  return true;
}

function CheckMessageInput(message) {
  if (message.value.length < 10) {
    let li = document.createElement("li");
    li.innerHTML = "Upiši minimalno 10 znakova u Poruku.";
    porukeGresaka.appendChild(li);
    message.style.border = "3px solid #A70A0A";
    message.style.borderRadius = "5px";
    return false;
  }
  return true;
}

function CheckSuglasnost(suglasnost) {
  if (!suglasnost.checked) {
    let li = document.createElement("li");
    li.innerHTML = "Prihvatite suglasnost za korištenje podataka ispod poruke.";
    porukeGresaka.appendChild(li);
    return false;
  }
  return true;
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

document.addEventListener("DOMContentLoaded", () => {
  fadeInTitle();
  dohvatiSlike(`/apiIzrada.php`,
    'izradaGalleryConteiner',
    'pic/izrada')

  dohvatiSlike(`/apiObnova.php`,
    'obnovaGalleryConteiner',
    'pic/obnova');

  dohvatiPrveDvije(`/apiIzrada.php`,
    'prveDvijeIzrada',
    'pic/izrada');

  dohvatiPrveDvije(`/apiObnova.php`,
    'prveDvijeObnova',
    'pic/obnova',
    '.galleryButtonContainer');
  dohvatiPartnere(`/apiPartneri.php`, 'partners-slider', 'partners');
  dohvatiPartnere(`/apiPartneri.php`, 'partners-slider', 'partners');
  initGalleryModal();

  document.querySelectorAll('.upit').forEach(button => {
    button.addEventListener('click', function () {
      window.location.href = this.getAttribute('data-href');
    });
  });

  document.querySelectorAll('.gallery-button').forEach(button => {
    button.addEventListener('click', function () {
      window.location.href = this.getAttribute('data-href');
    });
  });

  // === VALIDACIJA FORME ===
  const imePrezime = document.getElementById("ime");
  const mobitel = document.getElementById("mob");
  const email = document.getElementById("email");
  const poruka = document.getElementById("poruka");
  const suglasnost = document.getElementById("suglasnost");
  const forma = document.getElementById("form");
  const statusSlanja = document.getElementById("status");

  forma.addEventListener("submit", (e) => {
    e.preventDefault();

    porukeGresaka = document.createElement("ul");
    resetInputStyles(imePrezime);
    resetInputStyles(mobitel);
    resetInputStyles(email);
    resetInputStyles(poruka);

    let nameValid = CheckNameInput(imePrezime);
    let messageValid = CheckMessageInput(poruka);
    let emailValid = CheckEmailInput(email);
    let numberValid = CheckNumberInput(mobitel);
    let suglasnostValid = CheckSuglasnost(suglasnost);

    if (nameValid && messageValid && emailValid && numberValid && suglasnostValid) {
      let obj = {
        "ime-prezime": imePrezime.value,
        "email": email.value,
        "mobitel": mobitel.value,
        "poruka": poruka.value.replace(/\n/g, "<br>")
      };

      let h = new Headers();
      h.set("Content-Type", "application/json");

      fetch("/kontakt-forma.php", {
        method: "POST",
        headers: h,
        body: JSON.stringify(obj)
      }).then(r => r.json()).then(data => {
        statusSlanja.innerHTML = data.status
          ? "<p id='porukaPoslana'>Poruka je uspješno poslana</p>"
          : "<p id='greskaSlanja'>Greška! Poruka nije poslana</p>";
      });

      fetch("/info-no-reply.php", {
        method: "POST",
        headers: h,
        body: JSON.stringify({ "primatelj-mail": email.value })
      });

      forma.reset();
      statusSlanja.innerHTML = "";
    } else {
      while (statusSlanja.firstChild) {
        statusSlanja.removeChild(statusSlanja.firstChild);
      }
      statusSlanja.id = "greskaSlanja";
      statusSlanja.appendChild(porukeGresaka);
    }
  });
});
