//import './index.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
camera.position.setZ(10);


renderer.render(scene, camera);
//background Texture
const blankTexture = new THREE.TextureLoader().load('/img/blank_background.jpeg');
scene.background = blankTexture;

//light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 300, 100);
pointLight.position.set(3,5,5);
pointLight.rotation.set(45,45,0);
scene.add(pointLight);

/*
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);
*/

//Controls
const Controls = new OrbitControls(camera, renderer.domElement);

//Loading GLTF
const gltfLoader = new GLTFLoader();
const MonitorURL = '3D Assets/Monitor.glb';
const TableURL = '3D Assets/Table.glb';
const KeyboardURL = '3D Assets/Keyboard.glb';
const MouseURL = '3D Assets/Mouse.glb';
gltfLoader.load(MonitorURL, (gltf) => {
    const monitor = gltf.scene;
    monitor.position.set(0,-3,3.5);
    scene.add(monitor);
  });

  gltfLoader.load(TableURL, (gltf) => {
    const table = gltf.scene;
    table.position.set(0, -7.5, 4);
    table.scale.set(2.8,1,1.5);
    scene.add(table);
});

gltfLoader.load(KeyboardURL, (gltf) => {
  const Keyboard = gltf.scene;
  Keyboard.position.set(0, -3, 5.5);
  Keyboard.scale.set(0.5,0.5,0.5);
  scene.add(Keyboard);
});

gltfLoader.load(MouseURL, (gltf) => {
  const Mouse = gltf.scene;
  Mouse.position.set(1.5, -3, 5.5);
  Mouse.rotation.set(0, 4.6, 0);
  Mouse.scale.set(0.1 ,0.1 ,0.1);
  scene.add(Mouse);
});


//Animate function
function animate() {

	

  Controls.update();
	renderer.render( scene, camera );
}