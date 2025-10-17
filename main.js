import * as THREE from "three";
import { createCelestialBody } from "./createCelestialBody.js";
import { planetData } from "./planetData.js";
import { initializeScene } from "./sceneSetup.js";
import { setupInteractions } from "./interactions.js";

// ui references
const uiElements = {
  infoPanel: document.getElementById("info-panel"),
  planetNameElement: document.getElementById("planet-name"),
  planetInfoElement: document.getElementById("planet-info"),
  closeButton: document.getElementById("close-button"),
};

const canvas = document.querySelector(".mainCanvas");

// size constants
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
const { scene, camera, controls } = initializeScene(renderer, sizes);
const clock = new THREE.Clock();

// texture loader
const textureLoader = new THREE.TextureLoader();

// adding light source
const light = new THREE.PointLight(0xffffff, 100); // color, intensity, distance
light.position.set(0, 0, 0); //center at the sun
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.08); // White light, low intensity
scene.add(ambientLight);

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
const sun = createCelestialBody(1, "./assets/sunmap.jpg", "sun", true);
scene.add(sun);

// mercury
const mercury = createCelestialBody(0.2, "./assets/mercurymap.jpg", "mercury");
scene.add(mercury);

// venus
const venus = createCelestialBody(0.33, "./assets/venusmap.jpg", "venus");
scene.add(venus);

// earth
const earth = createCelestialBody(0.35, "./assets/earthmap.jpg", "earth");
scene.add(earth);

// mars
const mars = createCelestialBody(0.27, "./assets/marsmap.jpg", "mars");
scene.add(mars);

// jupiter
const jupiter = createCelestialBody(0.7, "./assets/jupitermap.jpg", "jupiter");
scene.add(jupiter);

// saturn
const saturn = createCelestialBody(0.6, "./assets/saturnmap.jpg", "saturn");
scene.add(saturn);

// saturn's rings
const ringsTexture = textureLoader.load("./assets/rings.png");
const ringsGeometry = new THREE.RingGeometry(0.7, 1.2, 128);

// Fix UVs for circular texture mapping
const pos = ringsGeometry.attributes.position;
const uv = ringsGeometry.attributes.uv;
const temp = new THREE.Vector3();
for (let i = 0; i < pos.count; i++) {
  temp.fromBufferAttribute(pos, i);
  const radius = temp.length();
  uv.setXY(i, THREE.MathUtils.mapLinear(radius, 0.7, 1.2, 0, 1), 1);
}
ringsGeometry.attributes.uv.needsUpdate = true;

const ringsMaterial = new THREE.MeshStandardMaterial({
  map: ringsTexture,
  side: THREE.DoubleSide,
  transparent: true,
});

const rings = new THREE.Mesh(ringsGeometry, ringsMaterial);
rings.rotation.x = Math.PI * 0.3; // flatten the ring
saturn.add(rings);

// uranus
const uranus = createCelestialBody(0.5, "./assets/uranusmap.jpg", "uranus");
scene.add(uranus);

// neptune
const neptune = createCelestialBody(0.5, "./assets/neptunemap.jpg", "neptune");
scene.add(neptune);

// orbits
const orbitMaterial = new THREE.LineDashedMaterial({ color: 0xffffffaaaaaa });
const mercuryOrbitGeometry = new THREE.TorusGeometry(2.5, 0.005, 16, 100);
const mercuryOrbit = new THREE.Line(mercuryOrbitGeometry, orbitMaterial);
mercuryOrbit.rotation.x = Math.PI * 0.5 + 0.122173; // Rotate to be flat
mercuryOrbit.visible = false; // Start invisible
const venusOrbitGeometry = new THREE.TorusGeometry(4, 0.005, 16, 100);
const venusOrbit = new THREE.Line(venusOrbitGeometry, orbitMaterial);
venusOrbit.rotation.x = Math.PI * 0.5 + 0.059162;
venusOrbit.visible = false; // Start invisible
const earthOrbitGeometry = new THREE.TorusGeometry(5.5, 0.005, 16, 100);
const earthOrbit = new THREE.Line(earthOrbitGeometry, orbitMaterial);
earthOrbit.rotation.x = Math.PI * 0.5;
earthOrbit.visible = false; // Start invisible
const marsOrbitGeometry = new THREE.TorusGeometry(8, 0.005, 16, 100);
const marsOrbit = new THREE.Line(marsOrbitGeometry, orbitMaterial);
marsOrbit.rotation.x = Math.PI * 0.5 + 0.032287;
marsOrbit.visible = false; // Start invisible
const jupiterOrbitGeometry = new THREE.TorusGeometry(13, 0.005, 16, 100);
const jupiterOrbit = new THREE.Line(jupiterOrbitGeometry, orbitMaterial);
jupiterOrbit.rotation.x = Math.PI * 0.5 + 0.022853;
jupiterOrbit.visible = false; // Start invisible
const saturnOrbitGeometry = new THREE.TorusGeometry(20, 0.005, 16, 100);
const saturnOrbit = new THREE.Line(saturnOrbitGeometry, orbitMaterial);
saturnOrbit.rotation.x = Math.PI * 0.5 + 0.043478;
saturnOrbit.visible = false; // Start invisible
const uranusOrbitGeometry = new THREE.TorusGeometry(28, 0.005, 16, 100);
const uranusOrbit = new THREE.Line(uranusOrbitGeometry, orbitMaterial);
uranusOrbit.rotation.x = 0.013445;
uranusOrbit.visible = false; // Start invisible
const neptuneOrbitGeometry = new THREE.TorusGeometry(36, 0.005, 16, 100);
const neptuneOrbit = new THREE.Line(neptuneOrbitGeometry, orbitMaterial);
neptuneOrbit.rotation.x = Math.PI * 0.5 + 0.030886;
neptuneOrbit.visible = false; // Start invisible
scene.add(
  mercuryOrbit,
  venusOrbit,
  earthOrbit,
  marsOrbit,
  jupiterOrbit,
  saturnOrbit,
  uranusOrbit,
  neptuneOrbit
);

// link planet orbits to the planets
mercury.userData.orbit = mercuryOrbit;
venus.userData.orbit = venusOrbit;
earth.userData.orbit = earthOrbit;
mars.userData.orbit = marsOrbit;
jupiter.userData.orbit = jupiterOrbit;
saturn.userData.orbit = saturnOrbit;
uranus.userData.orbit = uranusOrbit;
neptune.userData.orbit = neptuneOrbit;
mercuryOrbit.userData.planet = mercury;
venusOrbit.userData.planet = venus;
earthOrbit.userData.planet = earth;
marsOrbit.userData.planet = mars;
jupiterOrbit.userData.planet = jupiter;
saturnOrbit.userData.planet = saturn;
uranusOrbit.userData.planet = uranus;
neptuneOrbit.userData.planet = neptune;


// making an animation loop
const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // rotate sun
  sun.rotation.y += 0.005;

  // setup mercury
  mercury.position.x = Math.cos(elapsedTime * 1) * 2.5;
  mercury.position.z = Math.sin(elapsedTime * 1) * 2.5;
  mercury.rotation.y += 0.01; // rotate mercury

  // setup venus
  venus.position.x = Math.cos(elapsedTime * 0.8) * 4;
  venus.position.z = Math.sin(elapsedTime * -0.8) * 4;
  venus.rotation.y += 0.01; // rotate venus

  // setup earth
  earth.position.x = Math.cos(elapsedTime * 0.5) * 5.5;
  earth.position.z = Math.sin(elapsedTime * 0.5) * 5.5;
  earth.rotation.y += 0.01; // rotate earth

  // setup mars
  mars.position.x = Math.cos(elapsedTime * 0.4) * 8;
  mars.position.z = Math.sin(elapsedTime * 0.4) * 8;
  mars.rotation.y += 0.01; // rotate mars

  // setup jupiter
  jupiter.position.x = Math.cos(elapsedTime * 0.2) * 13;
  jupiter.position.z = Math.sin(elapsedTime * 0.2) * 13;
  jupiter.rotation.y += 0.01; // rotate jupiter

  // setup saturn
  saturn.position.x = Math.cos(elapsedTime * 0.1) * 20;
  saturn.position.z = Math.sin(elapsedTime * 0.1) * 20;
  saturn.rotation.y += 0.008;

  // setup uranus
  uranus.position.x = Math.cos(elapsedTime * 0.07) * 28;
  uranus.position.y = Math.sin(elapsedTime * 0.07) * 28;
  uranus.rotation.z += 0.008;

  // setup neptune
  neptune.position.x = Math.cos(elapsedTime * 0.05) * 36;
  neptune.position.z = Math.sin(elapsedTime * 0.05) * 36;
  neptune.rotation.y += 0.008;

  // Update controls
  controls.update();

  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();

// planet enums
const interactiveObjects = [
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
  mercuryOrbit,
  venusOrbit,
  earthOrbit,
  marsOrbit,
  jupiterOrbit,
  saturnOrbit,
  uranusOrbit,
  neptuneOrbit,
];

setupInteractions(camera, interactiveObjects, uiElements, planetData, sizes);
