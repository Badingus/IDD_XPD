import { gsap } from "gsap";
import { _numWithUnitExp } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";


// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


// var audio = new Audio('audio/engine.mp3');
// audio.addEventListener("canplaythrough", () => {
//   console.log("Audio is ready to play");
// });

// function playSound() {
//   console.log("Playing sound...");
//   audio.currentTime = 0
//   audio.play();
// }

function myFunction()
{
  console.log("Page loaded!");
}
myFunction()

ScrollTrigger.create({
  trigger: ".Engine-Audio",
  start: "top top",
  endTrigger: "#otherID",
  end: "bottom 50%+=100px",
    onEnter: () => {
      console.log("ScrollTrigger onStart triggered");
      playSound();
    },
    toggleActions: "restart none none none",
    markers: true,
    
    // markers: {
    //   startColor: "white",
    //   endColor: "red",
    //   fontSize: "20px",
    //   indent: 100,
    // },
    // toggleClass: "black",
  }
);

//Banner content
gsap.from(

  "#bannerContent",
  {
   opacity: 0,
   y: 100, 
   duration: 1, 
   stagger:1
   
});



gsap.from(".Backstory", {
  scrollTrigger: {
    trigger: ".Backstory", // Start animation when this element enters the viewport
    start: "top 80%", // Element starts animating when it's 80% visible
    end: "top 20%",   // Optional: define an endpoint
    ease: "power2.out",
    toggleActions: "play none none reverse", // Animation lifecycle
  },
  backgroundSize:'150%',        // Starting opacity
  duration: 0.5,       // Animation duration (1 second)
  stagger: 0.3       // Delay between animations of multiple elements
});



gsap.from("#subtext", {
  scrollTrigger: {
    trigger: "#subtext", // Start animation when this element enters the viewport
    start: "top 80%", // Element starts animating when it's 80% visible
    end: "top 20%",   // Optional: define an endpoint
    toggleActions: "play none none reverse", // Animation lifecycle
  },
  opacity: 0,        // Starting opacity
  y: 50,             // Starting position (50px below)
  duration: 1,       // Animation duration (1 second)
  stagger: 0.3       // Delay between animations of multiple elements
});

gsap.from(".canvas-swap", {
  scrollTrigger: {
    trigger: ".canvas-swap", // Start animation when this element enters the viewport
    start: "top 100%",
    toggleActions: "play none none reverse", // Animation lifecycle
  },
  opacity: 0,        // Starting opacity
  y: 50,             // Starting position (50px below)
  duration: 0.3,       // Animation duration (1 second)
});



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





