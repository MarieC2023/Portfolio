// Fonction pour ajouter la classe "navbarDark" lors du scroll
const handleNavbarScroll = () => {
  const header = document.querySelector(".navbarScroll");
  window.onscroll = () => {
    const top = window.scrollY;
    if (top >= 100) {
      header.classList.add("navbarDark");
    } else {
      header.classList.remove("navbarDark");
    }
  };
};

// Fonction pour gérer la fermeture de la navbar sur petits écrans après clic
const handleNavbarCollapse = () => {
  const navLinks = document.querySelectorAll(".nav-item");
  const menuToggle = document.getElementById("navbarSupportedContent");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      new bootstrap.Collapse(menuToggle).toggle();
    });
  });
};

handleNavbarScroll();
handleNavbarCollapse();
