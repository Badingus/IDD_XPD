import { gsap } from "gsap";
import { _numWithUnitExp } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ViewerApp,
  AssetManagerPlugin,
  addBasePlugins,
  VariationConfiguratorPlugin,
  FrameFadePlugin,
  LoadingScreenPlugin,
  PickingPlugin,
  TweakpaneUiPlugin,
  MaterialConfiguratorPlugin,

  // Import THREE.js internals
  Color,
	Texture,
  Vector3,
} from 'webgi';

async function setupViewer() {
  const viewer = new ViewerApp({
      canvas: document.getElementById('web-canvas'),
  });

  await addBasePlugins(viewer);

  const manager = await viewer.getPlugin(AssetManagerPlugin);

  // Load an environment map if not set in the glb file
  await viewer.setEnvironmentMap("./assets/autumn forest.hdr");

  // await manager.addFromPath("./assets/wash basin.glb");
  await viewer.load("./assets/2021_koenigsegg_gemera.glb");

  // Camera transform
	viewer.scene.activeCamera.position = new Vector3(9.19, 3.47, 8.02);
	viewer.scene.activeCamera.target = new Vector3(-0.08, 0.39, 0.04);
		
	// Camera options
	const options = viewer.scene.activeCamera.getCameraOptions();
	options.fov = 15;
	viewer.scene.activeCamera.setCameraOptions(options);
	
	// Control options
	const controls = viewer.scene.activeCamera.controls;
	controls.autoRotate = false;
	controls.autoRotateSpeed = 5;
	controls.enableDamping = true;
	controls.rotateSpeed = 2.0;
	controls.enableZoom = false;
	controls.enablePan = false;
	controls.minDistance = 3;
	controls.maxDistance = 12;

  const carBody = manager.materials.findMaterialsByName('Koenigsegg_Gemera_2021Paint_Material')[0];
  const carAccent = manager.materials.findMaterialsByName('Koenigsegg_Gemera_2021Coloured_Material')[0];
  const wheelAccent = manager.materials.findMaterialsByName('Koenigsegg_Gemera_2021_Wheel1A_3D_3DWheel1C_Material')[0];

  //Initialize colors
  var brown = new Color(0x794029); //Burnished Russet
  var brownAccent = new Color(0x4f3328);

  
  var pink = new Color(0xDA1884); //Barbie Pink
  var pinkAccent = new Color(0xff7ac4);

  var grey = new Color(0x8a9399); //Quicksilver
  var greyAccent = new Color(0x2c2f2e); 

  var black = new Color(0x27221F); //Sumi Ink
  var blackAccent = new Color(0x27251f); 

  var green = new Color(0x5e6b44); //Bonza Green
  var greenAccent = new Color(0x484d40); 

  //Color settings store
  var bodyColor
  var carAccentColor
  var wheelAccentColor
  var seatCushionColor



  document.querySelector('.config.carBody.color1')?.addEventListener('click', () => {
    changeBodyColor(grey,greyAccent);
  })

  document.querySelector('.config.carBody.color2')?.addEventListener('click', () => {
    changeBodyColor(brown,brownAccent);
  })

  document.querySelector('.config.carBody.color3')?.addEventListener('click', () => {
    changeBodyColor(black,blackAccent);
  })

  document.querySelector('.config.carBody.color4')?.addEventListener('click', () => {
    changeBodyColor(green,greenAccent);
  })

  document.querySelector('.config.carBody.color5')?.addEventListener('click', () => {
    changeBodyColor(pink,pinkAccent);
  })

  function changeBodyColor(colorToBeChanged,accentColor) {
    carBody.color = colorToBeChanged;
    carAccent.color = accentColor;

    //Save color settings
    bodyColor = colorToBeChanged;
    carAccentColor = colorToBeChanged;

    configged = true;

    console.log(configged);

    viewer.scene.setDirty();
  }

  // Top
  document.querySelector('.config.wheelAccent.color1')?.addEventListener('click', () => {
    changeWheelColor(new Color(0x000000));
  })

  document.querySelector('.config.wheelAccent.color2')?.addEventListener('click', () => {
    changeWheelColor(new Color(0xffffff));
  })

  document.querySelector('.config.wheelAccent.color3')?.addEventListener('click', () => {
    changeWheelColor(new Color(0x616161));
  })

  function changeWheelColor(colorToBeChanged) {
    wheelAccent.color = colorToBeChanged;

    //Save color settings
    wheelAccentColor = colorToBeChanged;
    viewer.scene.setDirty();
  }

  document.querySelector('.config.drawer-color1')?.addEventListener('click', () => {
    changeDrawerColor(new Color(0x000000));
  })

  document.querySelector('.config.drawer-color2')?.addEventListener('click', () => {
    changeDrawerColor(new Color(0xffffff));
  })

  function changeDrawerColor(colorToBeChanged) {
    drawer.color = colorToBeChanged;

    //Save color settings
    seatCushionColor = colorToBeChanged;
    viewer.scene.setDirty();
  }
}

setupViewer();

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



