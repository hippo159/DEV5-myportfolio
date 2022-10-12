import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import gltf loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			
		

			//import donut glb
			let donut;
			const loader = new GLTFLoader();
			loader.load('/assets/models/bignut.glb', (gltf) => {
				donut = gltf.scene;
				donut.scale.set(40,40,40);
				scene.add(donut);

			});
			//const geometry2 = new THREE.TorusGeometry( 0.3, 0.2, 16, 100 );
			//const material2 = new THREE.MeshLambertMaterial( { color: 0xd49566 } );
			//const torus = new THREE.Mesh( geometry2, material2 );
			//scene.add( torus );




			//add sphere
			//load texture
			const textureLoader = new THREE.TextureLoader();
			const galaxyTexture = textureLoader.load('/assets/jw.jpg');
			
			const sphereGeometry = new THREE.SphereGeometry( 100, 32, 32 );
			const sphereMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
			sphereMaterial.map = galaxyTexture;
			sphereMaterial.side = THREE.BackSide;
			const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
			scene.add( sphere );

			//add ambient light
			const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
			scene.add( ambientLight );
			
      //add orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);

      //add grid helper
      //const gridHelper = new THREE.GridHelper( 200, 50 );
      //scene.add( gridHelper );
      
      //add directional light
      const light = new THREE.DirectionalLight(0xffffff, 0.8);
      light.position.set(2, 1.5, 1);
      scene.add(light);
     
      //add directional light helper
      //const helper = new THREE.DirectionalLightHelper(light, 0.5);
      //scene.add(helper);

	  //create sphere
	  //load texture
	  const addEarth = (x,y,z) => {
		const earthTexture = textureLoader.load('/assets/textures/earth.png');
		const Earthgeometry = new THREE.SphereGeometry( 1, 32, 32 );
		const Earthmaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
		Earthmaterial.map = earthTexture;
		const Earth = new THREE.Mesh( Earthgeometry, Earthmaterial );
		Earth.position.set(x,y,z);
		scene.add( Earth );
	  };
	  
	  
	  for(let i = 0; i < 100; i++){
		//random sign
		let sign = Math.random() < 0.5 ? -1 : 1;
		let x = Math.random() * 50 * sign;
		sign = Math.random() < 0.5 ? -1 : 1;
		let y = Math.random() * 50 * sign;
		sign = Math.random() < 0.5 ? -1 : 1;
		let z = Math.random() * 50 * sign;
		addEarth(x,y,z);

	  }

     

			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );

				scene.rotation.x += 0.00006;
				scene.rotation.y += 0.0006;

				camera.position.x += 0.0001;
				
				camera.position.z += 0.0001;
				camera.lookAt(scene.position);

				renderer.render( scene, camera );
			};

			animate();
	document.querySelector(".recolour").addEventListener("click", () => {
		//donut.material.color.setHex(Math.random() * 0xffffff);
		//loop over donut meshes
		donut.traverse((child) => {
			if(child.isMesh){
				console.log(child.name);
				child.material.color.setHex(Math.random() * 0xffffff);
			}
		});
	});