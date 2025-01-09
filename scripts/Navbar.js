
//Scrolling for Navbar to close and open
let lastScrollPosition = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScrollPosition = 
    document.documentElement.scrollTop || document.body.scrollTop;

  if (currentScrollPosition > lastScrollPosition) {
    // Scrolling down
    navbar.classList.add('hidden');
  } else {
    // Scrolling up
    navbar.classList.remove('hidden');
  }

  lastScrollPosition = currentScrollPosition;
});





