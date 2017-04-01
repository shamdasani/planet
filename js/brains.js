window.addEventListener('load', init, false);

function init() {
	createScene();
}

function createScene() {

	var width = window.innerWidth;
	var height = window.innerHeight;


	var fieldOfView = 150;
	var aspectRatio = width / height;
	var nearPlane = 1;
	var farPlane = 1000;

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height)

	var container = document.getElementById("particles");
	container.appendChild(renderer.domElement);

    // the particles


    var starsGeometry = new THREE.Geometry();

    for (var i = 0; i < 100000; i ++) {

	  var x = (Math.random() * 3000) - 1500;
	  var y = (Math.random() * 3000) - 1500;
	  var z = (Math.random() * 3000) - 1500;

      var star = new THREE.Vector3(x, y, z);

      starsGeometry.vertices.push(star);
    }

    var starsMaterial = new THREE.PointsMaterial({ color: 0x888888 })

    var starField = new THREE.Points(starsGeometry, starsMaterial);

    scene.add(starField);


	function render() {
		requestAnimationFrame(render);


		starField.rotation.z += 0.005;
		starField.translateZ(1);

		renderer.render (scene, camera)
	}
	render();
}






// name: 'Out of Control Spaceship',
//     particleCount: 100000,
//     material: new THREE.PointCloudMaterial({ 
//       size: 1, 
//       color: 0xffffff,
//       transparent: true,
//       opacity: 0.9
//     }),
//     initialize: null,
//     spawnBehavior: function(index){
//       var x, y, z;

//       x = (Math.random() * 2000) - 1000;
//       y = (Math.random() * 2000) - 1000;
//       z = (Math.random() * 2000) - 1000;
//       return new THREE.Vector3(x, y, z);
//     },
//     frameBehavior: null,
//     sceneFrameBehavior: function(){
      







