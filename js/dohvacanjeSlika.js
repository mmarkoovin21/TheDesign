
document.addEventListener("DOMContentLoaded", function () {
    dohvatiSlikeIzrade();
    dohvatiSlikeObnova();
    dohvatiSlikePrveDvijeIzrade();
    dohvatiSlikePrveDvijeObnova();
}
);

async function dohvatiSlikeIzrade() {
    fetch('https://thedesign.hr/apiIzrada.php')
        .then(response => response.json())
        .then(images => {

            const container = document.getElementById('izradaGalleryConteiner');

            images.forEach(imageName => {

                const div = document.createElement('div');
                div.classList.add('col');

                const img = document.createElement('img');
                img.classList.add('gallery-item');
                img.loading = 'lazy';
                img.src = `https://www.thedesign.hr/dokumentacija/pic/izrada/${imageName}`;
                img.alt = imageName;

                div.appendChild(img);
                container.appendChild(div);
            });

        })
        .catch(error => console.error('Došlo je do pogreške prilikom učitavanja slika:', error));
}

async function dohvatiSlikeObnova() {
    fetch('https://thedesign.hr/apiObnova.php')
        .then(response => response.json())
        .then(images => {
            const container = document.getElementById('obnovaGalleryConteiner');
            images.forEach(imageName => {

                const div = document.createElement('div');
                div.classList.add('col');

                const img = document.createElement('img');
                img.classList.add('gallery-item');
                img.loading = 'lazy';
                img.src = `https://www.thedesign.hr/dokumentacija/pic/obnova/${imageName}`;
                img.alt = imageName;

                div.appendChild(img);
                container.insertBefore(div, buttonDiv);
            });

        })
        .catch(error => console.error('Došlo je do pogreške prilikom učitavanja slika:', error));
}

async function dohvatiSlikePrveDvijeIzrade() {
    fetch('https://thedesign.hr/apiIzrada.php')
        .then(response => response.json())
        .then(images => {
            const container = document.getElementById('prveDvijeIzrada');
            const buttonDiv = container.getElementsByClassName("gallery-button");
            images.slice(0, 2).forEach(imageName => {
                const div = document.createElement('div');
                div.classList.add('col');

                const img = document.createElement('img');
                img.classList.add('gallery-item');
                img.loading = 'lazy';
                img.src = `https://www.thedesign.hr/dokumentacija/pic/izrada/${imageName}`;
                img.alt = imageName;

                div.appendChild(img);
                container.insertBefore(div, buttonDiv);
            });

        })
        .catch(error => console.error('Došlo je do pogreške prilikom učitavanja slika:', error));
}

async function dohvatiSlikePrveDvijeObnova() {
    fetch('https://thedesign.hr/apiIzrada.php')
        .then(response => response.json())
        .then(images => {
            const buttonDiv = container.getElementsByClassName("gallery-button");
            const container = document.getElementById('prveDvijeObnova');
            images.slice(0, 2).forEach(imageName => {
                const div = document.createElement('div');
                div.classList.add('col');

                const img = document.createElement('img');
                img.classList.add('gallery-item');
                img.loading = 'lazy';
                img.src = `https://www.thedesign.hr/dokumentacija/pic/izrada/${imageName}`;
                img.alt = imageName;

                div.appendChild(img);
                container.prepend(div);
            });

        })
        .catch(error => console.error('Došlo je do pogreške prilikom učitavanja slika:', error));
}
