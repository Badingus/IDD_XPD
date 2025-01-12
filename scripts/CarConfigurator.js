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


//Color settings store
var bodyColor = new Color(0x000000)
var carAccentColor = new Color(0x000000)
var wheelAccentColor = new Color(0x000000)
var seatIntColor = new Color(0x000000)

var storedBodyMat
var storedBodyAccMat
var storedWheelMat
var storedIntMat


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
  if(carBody != null)
    {
      sessionStorage.setItem('storedBodyMat', carBody);
      
    }

  const carAccent = manager.materials.findMaterialsByName('Koenigsegg_Gemera_2021Coloured_Material')[0];

  if(carAccent != null)
    {
      sessionStorage.setItem('storedAccMat' , carAccent);
    }
  const wheelAccent = manager.materials.findMaterialsByName('Koenigsegg_Gemera_2021_Wheel1A_3D_3DWheel1C_Material')[0];
  

  if(wheelAccent != null)
    {
      sessionStorage.setItem('storedWheelMat' , wheelAccent);
    }

    const carInt = manager.materials.findMaterialsByName('Koenigsegg_Gemera_2021InteriorA_Material')[0];




  //Initialize colors
  var brown = new Color(0x962c42);
  var brownAccent = new Color(0x4f3328);

  var purple = new Color(0x3f216b); 
  var purpleAccent = new Color(0x110b1a);

  var grey = new Color(0x8a9399);
  var greyAccent = new Color(0x2c2f2e); 

  var black = new Color(0x383B39);
  var blackAccent = new Color(0x1a1c1b); 

  var green = new Color(0x136e62); 
  var greenAccent = new Color(0x091a17); 


  document.querySelector('.config.carBody.color1')?.addEventListener('click', () => {
    changeBodyColor(grey,greyAccent);
  })

  document.querySelector('.config.carBody.color2')?.addEventListener('click', () => {
    changeBodyColor(black,blackAccent);
  })

  document.querySelector('.config.carBody.color3')?.addEventListener('click', () => {
    changeBodyColor(brown,brownAccent);
  })

  document.querySelector('.config.carBody.color4')?.addEventListener('click', () => {
    changeBodyColor(green,greenAccent);
  })

  document.querySelector('.config.carBody.color5')?.addEventListener('click', () => {
    changeBodyColor(purple,purpleAccent);
  })

  function changeBodyColor(colorToBeChanged,accentColor) {
    carBody.color = colorToBeChanged;
    carAccent.color = accentColor;

    //Save color settings
    sessionStorage.setItem('storedBodyColor', JSON.stringify({ colorToBeChanged })); // Saves color format into JSON as a Color Number string
    sessionStorage.setItem('storedAccentColor', JSON.stringify({ accentColor }));


    viewer.scene.setDirty();
  }

  // Wheel Accent
  document.querySelector('.config.wheelAccent.color1')?.addEventListener('click', () => {
    changeWheelColor(new Color(0x828282));
  })
  document.querySelector('.config.wheelAccent.color2')?.addEventListener('click', () => {
    changeWheelColor(new Color(0xff7c00));
  })

  document.querySelector('.config.wheelAccent.color3')?.addEventListener('click', () => {
    changeWheelColor(new Color(0xac85ff));
  })

  document.querySelector('.config.wheelAccent.color4')?.addEventListener('click', () => {
    changeWheelColor(new Color(0x5fcfff));
  })

  document.querySelector('.config.wheelAccent.color5')?.addEventListener('click', () => {
    changeWheelColor(new Color(0x992a22));
  })

  function changeWheelColor(colorToBeChanged) {
    wheelAccent.color = colorToBeChanged;

    //Save color settings
    sessionStorage.setItem('storedWheelColor', JSON.stringify({ colorToBeChanged }));
    viewer.scene.setDirty();
  }


  document.querySelector('.config.carInt.color1')?.addEventListener('click', () => {
    changeInteriorColor(new Color(0xff0000));
  })
  document.querySelector('.config.carInt.color2')?.addEventListener('click', () => {
    changeInteriorColor(new Color(0xffd800));
  })
  document.querySelector('.config.carInt.color3')?.addEventListener('click', () => {
    changeInteriorColor(new Color(0x00ffba));
  })
  document.querySelector('.config.carInt.color4')?.addEventListener('click', () => {
    changeInteriorColor(new Color(0x00b4ff));
  })
  document.querySelector('.config.carInt.color5')?.addEventListener('click', () => {
    changeInteriorColor(new Color(0x9c00ff));
  })

  

  function changeInteriorColor(colorToBeChanged) {
    carInt.color = colorToBeChanged;

    //Save color settings
    sessionStorage.setItem('storedIntColor', JSON.stringify({ colorToBeChanged }));

    viewer.scene.setDirty();
  }

  
  function reloadColors()
  {
    console.log("Reloading...")
    //Getting colors

      const storedbodColor = JSON.parse(sessionStorage.getItem('storedBodyColor'));
      let bodColorHex = convertToHex(storedbodColor.colorToBeChanged) // Converts the color number into Hexdecimal format "#XXXXXX"
      carBody.color = new Color(bodColorHex); // Initialises new color on model
    


      const storedAccColor = JSON.parse(sessionStorage.getItem('storedAccentColor'));
      let accColorHex = convertToHex(storedAccColor.accentColor) // Converts the color number into Hexdecimal format "#XXXXXX"
      carAccent.color = new Color(accColorHex);
    
    

      const storedWheelColor = JSON.parse(sessionStorage.getItem('storedWheelColor'));
      let wheelColorHex = convertToHex(storedWheelColor.colorToBeChanged) // Converts the color number into Hexdecimal format "#XXXXXX"
      wheelAccent.color = new Color(wheelAccentColor);
    
    

      const storedIntColor = JSON.parse(sessionStorage.getItem('storedIntColor'));
      let intColorHex = convertToHex(storedIntColor.colorToBeChanged) // Converts the color number into Hexdecimal format "#XXXXXX"
      carInt.color = new Color(intColorHex);
      

    
    


      
      
  
      
  
      
    

  }

reloadColors();

function convertToHex(colorValue) {
  // Ensure the input is a valid number
  if (typeof colorValue !== 'number' || !isFinite(colorValue)) {
      throw new Error('Invalid color value. Must be a finite number.');
  }

  // Convert the number to a hex string and pad it to 6 digits
  return `#${colorValue.toString(16).padStart(6, '0')}`; //String formatter
}

}

const selectElement = document.querySelector('.type'); // Select the first element with the class "mySelect"

const currentValue = selectElement.value;
  
// Get the current value
document.querySelectorAll(`.fields div:not(.${currentValue})`).forEach(div => {
  div.style.display = 'none';
});
//Function for changing out divs for selector on configurator
document.querySelectorAll('.type').forEach(element => {
  element.addEventListener('change', function () {
      const x = this.value; // Get the value of the selected option
      const siblings = Array.from(this.parentElement.children).filter(
          child => child !== this && child.tagName === 'DIV'
      );

      // Hide all sibling divs that don't match the selected value
      siblings.forEach(div => {
          if (div.classList.contains(x)) {
              div.style.display = ''; // Show the matching div
              buttonAnim();
          } else {
              div.style.display = 'none'; // Hide non-matching divs
          }
      });
  });
});



setupViewer();



// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

//button anim
function buttonAnim()
{
  gsap.set(".config", { opacity: 0 });
  gsap.from(
    ".config",
    {
     opacity: 0,
     y: 40, 
     duration: 0.3,
     ease: "power1.out",
     onComplete: function () {
      gsap.delayedCall(0.5, () => {
        gsap.set(".config", { clearProps: "all" }); // Clears after a short delay
      });
     },
    });
  
}




