
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

console.clear( );

// Canvas
const canvas = document.querySelector('.webgl');

// Scene
const scene = new THREE.Scene();
scene.background = null;

// Models
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./node_modules/three/examples/jsm/libs/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null;

var modelURL = './assets/car.glb', model;

gltfLoader.load(modelURL, gltf => {
	model = gltf.scene;
	model.position.y = 0;
  model.position.x = 0;
  model.position.z = 0;
	scene.add(model);
});

// Ground
// const floor = new THREE.Mesh(
//   new THREE.PlaneGeometry(100, 100),
//   new THREE.MeshStandardMaterial({
//       color: '#C04000',
//       metalness: 0,
//       roughness: 0.5
//   })
// )
// floor.position.set(0, -1.25, 0);
// floor.receiveShadow = true;
// floor.rotation.x = Math.PI * -0.5;
// scene.add(floor);

window.addEventListener('resize', () => {
  // Update camera
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// Camera
const camera = new THREE.PerspectiveCamera(25, innerWidth / innerHeight, 1, 20);
camera.position.set(9.19, 3.47, 8.02);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(-0.08, 0.39, 0.04);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.minDistance = 3;
controls.maxDistance = 10;
controls.rotateSpeed = 0;

// Lights
const ambientLight = new THREE.AmbientLight('white', 2.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 2.5);
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024);
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.camera.left = - 7
// directionalLight.shadow.camera.top = 7
// directionalLight.shadow.camera.right = 7
// directionalLight.shadow.camera.bottom = -7
// directionalLight.position.set(5, 5, 5)
scene.add(directionalLight);

// Renderer
const renderer = new THREE.WebGLRenderer({
  //antialias: true,
  canvas: canvas,
  alpha: true
});
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//renderer.setSize(innerWidth, innerHeight);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


var pos = [
	new THREE.Vector3(0, 1.75, 0), // Top hotspot position
	new THREE.Vector3(0, -1.75, 0), // Bottom hotspot position
	new THREE.Vector3(-1.75, 0.5, 0), // Left hotspot position
	new THREE.Vector3(1.75, 0.5, 0), // Right hotspot position
	new THREE.Vector3(0, 0.5, 1.75), // Front hotspot position
	new THREE.Vector3(0, 0.5, -1.75), // Back hotspot position
]

var hotspots = document.querySelectorAll('.hotspot');
var v = new THREE.Vector3();

const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  if(mixer) {
      mixer.update(deltaTime);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);

  if(model) {
    for(var i = 0; i < 6; i++) {
      v.copy(pos[i]);
      model.localToWorld(v);
      v.project(camera);
      
      var x = (1 + v.x) / 2 * innerWidth - 50,
          y = (1 - v.y) / 2 * innerHeight;

      hotspots[i].style.display = v.z < 1 ? 'block' : 'none'; /* Give 1 to display all hotspots regardless of zoom distance */

      hotspots[i].style.left = x + 'px';
      hotspots[i].style.top = y + 'px';
    }
  }

  directionalLight.position.copy(camera.position);
  renderer.render(scene, camera);
}

tick();
document.querySelector('.hotspot.top')?.addEventListener('click', () => {
	promptTrigger("Top")
})
document.querySelector('.hotspot.bot')?.addEventListener('click', () => {
	promptTrigger("bot")
})

function promptTrigger(value) {
	alert(value + " button clicked");
}
