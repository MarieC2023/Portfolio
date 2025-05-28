const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-theme');

  const icon = themeToggleBtn.querySelector('.theme-icon');

  if (body.classList.contains('light-theme')) {
    // Thème clair → afficher la lune noire
    icon.classList.remove('fa-regular', 'fa-sun');
    icon.classList.add('fa-regular', 'fa-moon');
    
  } else {
    // Thème sombre → afficher le soleil blanc
    icon.classList.remove('fa-regular', 'fa-moon');
    icon.classList.add('fa-regular','fa-sun');
   
  }
});
