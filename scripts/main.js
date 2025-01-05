import { gsap } from "gsap";
import { _numWithUnitExp } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
var audio = new Audio('audio/engine.mp3');
audio.addEventListener("canplaythrough", () => {
  console.log("Audio is ready to play");
});

function playSound() {
  console.log("Playing sound...");
  audio.currentTime = 0
  audio.play();
}

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

