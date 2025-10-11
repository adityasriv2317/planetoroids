import * as THREE from "three";

// import canvas where the scenes are rendered
const canvas = document.querySelector(".mainCanvas");

// create a scene
const scene = new THREE.Scene();

// size constants
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 10; // move the camera backwards so we can see the scene
scene.add(camera); // add the camera to the scene

// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

// adding light source
const light = new THREE.PointLight(0xffffff);
light.position.set(0, 0, 0); //center at the sun
scene.add(light);

// objects

// starfield
const starsGeometry = new THREE.BufferGeometry();
const starCount = 5000;
const position = new Float32Array(starCount * 3); // vector3 for each star
for (let i = 0; i < starCount * 3; i++) {
  position[i] = (Math.random() - 0.5) * 200;
}

starsGeometry.setAttribute("position", new THREE.BufferAttribute(position, 3));

const starsMaterial = new THREE.PointsMaterial({
  size: 0.05,
  sizeAttenuation: true,
  color: 0xffffff,
});
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// sun
const sunGeometry = new THREE.SphereGeometry(1, 32, 32); //radius, widthSegments, heightSegments
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // yellow color material
const sun = new THREE.Mesh(sunGeometry, sunMaterial); // creating the sun mesh using the geometry and material
scene.add(sun); // add the sun to the scene

// mercury
const mercuryGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const mercuryMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 }); // grey color material
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);

// venus
const venusGeometry = new THREE.SphereGeometry(0.32, 32, 32);
const venusMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // orange color material
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
scene.add(venus);

// earth
const earthGeometry = new THREE.SphereGeometry(0.35, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // blue color material
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// making the clock for animations
const clock = new THREE.Clock();

// render the scene
// renderer.render(scene, camera);

// making an animation loop
const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // rotate sun
  sun.rotation.x += 0.005;

  // setup mercury
  mercury.position.x = Math.cos(elapsedTime * 1) * 2.5;
  mercury.position.z = Math.sin(elapsedTime * 1) * 2.5;
  mercury.rotation.y += 0.01; // rotate mercury

  // setup venus
  venus.position.x = Math.cos(elapsedTime * 0.8) * 4;
  venus.position.z = Math.sin(elapsedTime * 0.8) * 4;
  venus.rotation.y += 0.01; // rotate venus

  // setup earth
  earth.position.x = Math.cos(elapsedTime * 0.5) * 5.5;
  earth.position.z = Math.sin(elapsedTime * 0.5) * 5.5;
  earth.rotation.y += 0.01; // rotate earth

  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
