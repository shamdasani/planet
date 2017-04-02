var particles, planet; 
var width = window.innerWidth;
var height = window.innerHeight;

window.addEventListener('load', createScene, false);

function createScene() {

	var fieldOfView = 75;
	var aspectRatio = width / height;
	var nearPlane = .1;
	var farPlane = 1000;

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
	camera.lookAt(scene.position);
	camera.position.z = 500;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height)
	renderer.setClearColor(0x353A47);
    renderer.shadowMap.enabled = true;

	var space = document.getElementById("space");
	space.appendChild(renderer.domElement);

 	var controls = new THREE.OrbitControls(camera, renderer.domElement);

 	var ambientLight = new THREE.AmbientLight();
 	scene.add(ambientLight);

 	var light = new THREE.DirectionalLight();
 	light.position.set(200, 100, 200);
 	light.castShadow = true;
 	light.shadow.camera.left = -100;
 	light.shadow.camera.right = 100;
 	light.shadow.camera.top = 100;
 	light.shadow.camera.bottom = -100;
 	scene.add(light);

 	drawParticles();
 	drawPlanet()

 	function drawParticles() {

	  particles = new THREE.Group();
	  var geometry = new THREE.TetrahedronGeometry(5, 0);
   	  var colors = [0xA84830, 0xE3EF99, 0x3669AA];

	  for (let i = 0; i < 500; i ++) {
	    var material = new THREE.MeshPhongMaterial({
	      color: colors[Math.floor(Math.random() * colors.length)]
	    });
	    var mesh = new THREE.Mesh(geometry, material);
	    mesh.position.set((Math.random() - 0.5) * 1000,
	                      (Math.random() - 0.5) * 1000,
	                      (Math.random() - 0.5) * 1000);
	    mesh.updateMatrix();
	    mesh.matrixAutoUpdate = false;
	    particles.add(mesh);
	    scene.add(particles);

	  }
	}

	function drawPlanet() {
		planet = new THREE.Group()
		planet.rotation.set(.4, .3, 0)

		var planetGeometry = new THREE.IcosahedronGeometry(100, 1); // radius =100, add vertice = 1 for circle
		var planetMaterial = new THREE.MeshPhongMaterial({
			color: 0xA84830,
			shading: THREE.FlatShading 
		})
		var planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
		planet.add(planetMesh);

		planetMesh.castShadow = true;
		planetMesh.recieveShadow = true;
		planetMesh.position.set(0, 40, 0)

		var ringGeometry = new THREE.TorusGeometry(140, 10, 6, 15); // (radius, tube, radialSegments, tubularSegments, arc)
		var ringMaterial = new THREE.MeshStandardMaterial({
			color: 0x3669AA,
			shading: THREE.FlatShading
		})
		var ring = new THREE.Mesh(ringGeometry, ringMaterial);
		ring.position.set(0, 40, 0);
		ring.rotateX(80); // bring ring to middle of sphere
		ring.castShadow = true;
		ring.recieveShadow = true;
		planet.add(ring);

		scene.add(planet);

	window.addEventListener('resize', handleResize, false);

		function handleResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
		    camera.updateProjectionMatrix();

		    renderer.setSize( window.innerWidth, window.innerHeight );
		}


	}

	function render() {
		requestAnimationFrame(render);

		planet.rotation.y += .003;
		particles.rotation.y += .003;

		renderer.render(scene, camera);
	}
	render();

}





