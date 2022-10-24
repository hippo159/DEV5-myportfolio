import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import pointlight
import { PointLight } from 'three';
//import gltf loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
//import rgbe loader
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

//create env map
new RGBELoader()
            .load('/assets/49TH_STREET.hdr', function (texture){

                texture.mapping = THREE.EquirectangularReflectionMapping;    
                scene.background = texture;
                scene.enviroment = texture;             
            });



//add red bottom wall
const bottomWall = new THREE.BoxGeometry( 2.9, 0.5, 2.9);
const material1 = new THREE.MeshLambertMaterial( { color: 0x263899 } );
const concrete = new THREE.TextureLoader().load( '/assets/concrete.jpg' );
material1.map = concrete;
const cubeRed = new THREE.Mesh( bottomWall, material1 );
scene.add( cubeRed );

//add curb
const curb = new THREE.BoxGeometry( 6, 0.1, 6);
const materialCurb = new THREE.MeshLambertMaterial( { color: 0x7d7d7d } );
const redConcrete = new THREE.TextureLoader().load( '/assets/concrete.jpg' );
materialCurb.map = redConcrete;
const curbStone = new THREE.Mesh( curb, materialCurb );
curbStone.position.y = -0.12;
scene.add( curbStone );

//add main structure
const wall = new THREE.BoxGeometry( 2.8, 1.5, 2.8);
//lower opacity
const material = new THREE.MeshLambertMaterial( { color: 0xc9b7a7 } );
const texture = new THREE.TextureLoader().load( '/assets/concrete.jpg' );
material.map = texture;
const cube = new THREE.Mesh( wall, material );
cube.position.y = 0.8;
scene.add( cube );

//add glass window
const glass = new THREE.BoxGeometry( 2.85, 1.1, 2.85);
const materialGlass = new THREE.MeshLambertMaterial( { color: 0xbd9182 } );
const shopFace = new THREE.TextureLoader().load( '/assets/shop.jpg' );
materialGlass.map = shopFace;
const glassWindow = new THREE.Mesh( glass , materialGlass);
glassWindow.position.z = 0;
glassWindow.position.y = 0.9;
scene.add( glassWindow );

//add 4 corner pillars
const clay = new THREE.TextureLoader().load( '/assets/clay.jpg' );
const pillar = new THREE.BoxGeometry( 0.2, 1.7, 0.2);
const materialPillar = new THREE.MeshLambertMaterial( { color: 0x46484a } );
materialPillar.map = clay;
const pillar1 = new THREE.Mesh( pillar, materialPillar );
pillar1.position.x = 1.4;
pillar1.position.y = -0.1;
pillar1.position.z = 1.4;
cube.add( pillar1 );

const pillar2 = new THREE.Mesh( pillar, materialPillar );
pillar2.position.x = -1.4;
pillar2.position.y = -0.1;
pillar2.position.z = -1.4;
cube.add( pillar2 );

const pillar3 = new THREE.Mesh( pillar, materialPillar );
pillar3.position.x = 1.4;
pillar3.position.y = -0.1;
pillar3.position.z = -1.4;
cube.add( pillar3 );

const pillar4 = new THREE.Mesh( pillar, materialPillar );
pillar4.position.z = 1.4;
pillar4.position.y = -0.1;
pillar4.position.x = -1.4;
cube.add( pillar4 );

//add wooden door
const door = new THREE.BoxGeometry( 0.2, 1.2, 0.8);
const materialDoor = new THREE.MeshLambertMaterial( { color: 0xffffff } );
const wood = new THREE.TextureLoader().load( '/assets/door.png' );
materialDoor.map = wood;
const door1 = new THREE.Mesh( door, materialDoor );
door1.position.z = 1.36;
door1.position.y = -0.3;
//rotate 90 degrees
door1.rotation.y = Math.PI / 2;
cube.add( door1 );

//import cash gltf
const loader = new GLTFLoader();
loader.load(
  // resource URL
  '/assets/cash.gltf',
  // called when the resource is loaded
  function ( gltf ) {
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(1.56, -1.55, 1.36);
    gltf.scene.rotation.set(0, Math.PI / 2, 0);
    cube.add( gltf.scene );
  },
  // called while loading is progressing
  function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  // called when loading has errors
  function ( error ) {
    console.log( 'An error happened' );
  }
);




//add cone roof
const cone = new THREE.ConeGeometry( 2.4, 0.4, 8 );
const material2 = new THREE.MeshLambertMaterial( {color: 0x263899} );
const cone1 = new THREE.Mesh( cone, material2 );
cone1.position.y = 1.95;
scene.add( cone1 );
//add cylinder under cone
const cylinder = new THREE.CylinderGeometry( 2.4, 2.4, 0.2, 8 );
const material3 = new THREE.MeshLambertMaterial( {color: 0xebe2c5} );
const cylinder1 = new THREE.Mesh( cylinder, material3 );
cylinder1.position.y = 1.65;
scene.add( cylinder1 );
//add textures

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
const planeMaterial = new THREE.MeshLambertMaterial( { map: grass, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = Math.PI / 2;
plane.position.y = -0.15;
scene.add( plane );

//add red spotlight
const spotLight = new THREE.SpotLight( 0xff0000 );
spotLight.position.set( 2, 3, 0 );
spotLight.angle = Math.PI / 3;
spotLight.penumbra = 0.05;
spotLight.decay = 2;
spotLight.distance = 200;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 200;
scene.add( spotLight );

const spotLight1 = new THREE.SpotLight( 0x0000ff );
spotLight1.position.set( 0, 3, 2 );
spotLight1.angle = Math.PI / 1;
spotLight1.penumbra = 0.05;
spotLight1.decay = 2;
spotLight1.distance = 200;
spotLight1.castShadow = true;
spotLight1.shadow.mapSize.width = 1024;
spotLight1.shadow.mapSize.height = 1024;
spotLight1.shadow.camera.near = 10;
spotLight1.shadow.camera.far = 200;
scene.add( spotLight1 );

//add moonlight
const moonLight = new THREE.PointLight( 0xffffff, 0.5 );
moonLight.position.set( 1, 4, 0 );
scene.add( moonLight );

camera.position.z = 5;


function animate() {
  requestAnimationFrame( animate );



  renderer.render( scene, camera );
};

animate();