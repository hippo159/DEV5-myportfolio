import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import pointlight
import { PointLight } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;


//add red bottom wall
const bottomWall = new THREE.BoxGeometry( 2.9, 0.5, 2.9);
const material1 = new THREE.MeshBasicMaterial( { color: 0x941406 } );
const redConcrete = new THREE.TextureLoader().load( '/assets/concrete.jpg' );
material1.map = redConcrete;
const cubeRed = new THREE.Mesh( bottomWall, material1 );
scene.add( cubeRed );

//add main structure
const wall = new THREE.BoxGeometry( 2.8, 1.5, 2.8);
//lower opacity
const material = new THREE.MeshBasicMaterial( { color: 0xc9b7a7 } );
const texture = new THREE.TextureLoader().load( '/assets/concrete.jpg' );
material.map = texture;
const cube = new THREE.Mesh( wall, material );
cube.position.y = 0.8;
scene.add( cube );

//add cone roof
const cone = new THREE.ConeGeometry( 2.4, 0.4, 8 );
const material2 = new THREE.MeshBasicMaterial( {color: 0x941406} );
const cone1 = new THREE.Mesh( cone, material2 );
cone1.position.y = 1.95;
scene.add( cone1 );
//add cylinder under cone
const cylinder = new THREE.CylinderGeometry( 2.4, 2.4, 0.2, 8 );
const material3 = new THREE.MeshBasicMaterial( {color: 0xebe2c5} );
const cylinder1 = new THREE.Mesh( cylinder, material3 );
cylinder1.position.y = 1.65;
scene.add( cylinder1 );
//add textures
const clay = new THREE.TextureLoader().load( '/assets/clay.jpg' );
clay.wrapS = THREE.RepeatWrapping;
clay.wrapT = THREE.RepeatWrapping;
clay.repeat.set( 14, 14 );
material2.map = texture;
material3.map = texture;




//add floor
const grass = new THREE.TextureLoader().load( '/assets/pavement.jpg' );
grass.wrapS = THREE.RepeatWrapping;
grass.wrapT = THREE.RepeatWrapping;
grass.repeat.set( 12, 12 );
//add floor plane
const planeGeometry = new THREE.CircleGeometry( 10, 16);
const planeMaterial = new THREE.MeshBasicMaterial( { map: grass, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = Math.PI / 2;
plane.position.y = -0.15;
scene.add( plane );


camera.position.z = 5;
// add point light
const pointLight = new PointLight(0xffffff, 1);
pointLight.position.set(0, 8, 0);
scene.add(pointLight);
//add light helper
const lightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(lightHelper);

function animate() {
  requestAnimationFrame( animate );



  renderer.render( scene, camera );
};

animate();