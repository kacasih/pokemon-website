

document.addEventListener("DOMContentLoaded", function() {
    //alert("helloss");
    console.log("Loading frontcover.js...");
    console.log("DOMContentLoaded event triggered.");
  

    const isAboutUsPage = window.location.href.includes('/aboutus');
    const isContactUSPage = window.location.href.includes('/contactus');
    const isMyAccountPage = window.location.href.includes('/myaccount');
    // If it's the main page, execute the cube code
    if (!isAboutUsPage&&!isContactUSPage&&!isMyAccountPage)
    // create scene, camera and renderer
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
  
    renderer.setSize(document.getElementById("cube-container").clientWidth, document.getElementById("cube-container").clientHeight);
    document.getElementById("cube-container").appendChild(renderer.domElement);
    console.log("renderer.domElement added to cube-container");
    // create cube mesh
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // red color
    var cube = new THREE.Mesh(geometry, material);
    var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);
  
    // add cube mesh to scene
    scene.add(cube);
    console.log("Cube added to scene.");
  
    // position camera
    camera.position.z = 2;
  
    // animate cube
    function animate() {
        requestAnimationFrame(animate);
  
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
  
        renderer.render(scene, camera);
    }
  
    animate();
  
});
