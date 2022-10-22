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



const wall = new THREE.BoxGeometry( 3, 0.3, 3);

const material = new THREE.MeshBasicMaterial( { color: 0x941406 } );
const texture = new THREE.TextureLoader().load( '/assets/concrete.jpg' );
material.map = texture;
const cube = new THREE.Mesh( wall, material );
scene.add( cube );

//add grass
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