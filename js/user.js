// Animacija naslova
const prviNaslov = document.getElementById("naslov");

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    prviNaslov.style.opacity = 1;
    prviNaslov.style.animation = "fadeIn-prica 1s ease-in-out forwards";
  }, 1000);


  const pathFooter = window.location.pathname.startsWith('/html/')
    ? 'footer.html'
    : '/html/footer.html';

  const pathNav = window.location.pathname.startsWith('/html/')
    ? 'nav.html'
    : '/html/nav.html';

  fetch(pathFooter)
    .then(r => r.text())
    .then(html => {
      document.getElementById('footer-container').innerHTML = html;
    })
    .catch(console.error);

  fetch(pathNav)
    .then(r => r.text())
    .then(html => {
      document.getElementById('nav-container').innerHTML = html;

      const navbarLinksDiv = document.getElementById("navbarSupportedContent");
      const navButton = document.querySelector(".navbar-toggler");

      if (navbarLinksDiv && navButton) {
        navbarLinksDiv.addEventListener('click', () => {
          navbarLinksDiv.classList.remove("show");
          navButton.classList.add("collapsed");
        });
      }

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
    })
    .catch(console.error);
}
);