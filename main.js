import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
camera.position.z = 15; // move the camera backwards so we can see the scene
scene.add(camera); // add the camera to the scene

// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth camera movement

// mouse and raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// texture loader
const textureLoader = new THREE.TextureLoader();

// adding light source
const light = new THREE.PointLight(0xffffff, 100); // color, intensity, distance
light.position.set(0, 0, 0); //center at the sun
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.08); // White light, low intensity
scene.add(ambientLight);

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
const sunTexture = textureLoader.load("./assets/sunmap.jpg");
const sunGeometry = new THREE.SphereGeometry(1, 32, 32); //radius, widthSegments, heightSegments
const sunMaterial = new THREE.MeshStandardMaterial({
  emissiveMap: sunTexture,
  emissive: 0xffff00,
  emissiveIntensity: 1.5,
}); // yellow color material
const sun = new THREE.Mesh(sunGeometry, sunMaterial); // creating the sun mesh using the geometry and material
scene.add(sun); // add the sun to the scene

// mercury
const mercuryTexture = textureLoader.load("./assets/mercurymap.jpg");
const mercuryGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture }); // grey color material
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.name = "mercury";
scene.add(mercury);

// venus
const venusTexture = textureLoader.load("./assets/venusmap.jpg");
const venusGeometry = new THREE.SphereGeometry(0.33, 32, 32);
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture }); // orange color material
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.name = "venus";
scene.add(venus);

// earth
const earthTexture = textureLoader.load("./assets/earthmap.jpg");
const earthGeometry = new THREE.SphereGeometry(0.35, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture }); // blue color material
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.name = "earth";
scene.add(earth);

// mars
const marsTexture = textureLoader.load("./assets/marsmap.jpg");
const marsGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture }); // red color material
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.name = "mars";
scene.add(mars);

// jupiter
const jupiterTexture = textureLoader.load("./assets/jupitermap.jpg");
const jupiterGeometry = new THREE.SphereGeometry(0.7, 32, 32);
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture }); // brown color material
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiter.name = "jupiter";
scene.add(jupiter);

// saturn
const saturnTexture = textureLoader.load("./assets/saturnmap.jpg");
const saturnGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture }); // yellow-brown color material
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.name = "saturn";
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
  // inner radius ~0.7 → uv.x = 0, outer radius ~1.2 → uv.x = 1
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
const uranusTexture = textureLoader.load("./assets/uranusmap.jpg");
const uranusGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.name = "uranus";
scene.add(uranus);

// neptune
const neptuneTexture = textureLoader.load("./assets/neptunemap.jpg");
const neptuneGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptune.name = "neptune";
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

// making the clock for animations
const clock = new THREE.Clock();

// render the scene
// renderer.render(scene, camera);

// making an animation loop
const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // rotate sun
  sun.rotation.y += 0.005;

  // setup mercury
  mercury.position.x = Math.cos(elapsedTime * 1) * 2.5;
  mercury.position.z = Math.sin(elapsedTime * 1) * 2.5;
  mercury.rotation.y += 0.01; // rotate mercury
  mercury.rotation.x += Math.PI * 0.5 + 0.122173;

  // setup venus
  venus.position.x = Math.cos(elapsedTime * 0.8) * 4;
  venus.position.z = Math.sin(elapsedTime * -0.8) * 4;
  venus.rotation.y += 0.01; // rotate venus
  venus.rotation.x += Math.PI * 0.5 + 0.059162;

  // setup earth
  earth.position.x = Math.cos(elapsedTime * 0.5) * 5.5;
  earth.position.z = Math.sin(elapsedTime * 0.5) * 5.5;
  earth.rotation.y += 0.01; // rotate earth
  earth.rotation.x += Math.PI * 0.5;

  // setup mars
  mars.position.x = Math.cos(elapsedTime * 0.4) * 8;
  mars.position.z = Math.sin(elapsedTime * 0.4) * 8;
  mars.rotation.y += 0.01; // rotate mars
  mars.rotation.x += Math.PI * 0.5 + 0.032287;

  // setup jupiter
  jupiter.position.x = Math.cos(elapsedTime * 0.2) * 13;
  jupiter.position.z = Math.sin(elapsedTime * 0.2) * 13;
  jupiter.rotation.y += 0.01; // rotate jupiter
  jupiter.rotation.x += Math.PI * 0.5 + 0.022853;

  // setup saturn
  saturn.position.x = Math.cos(elapsedTime * 0.1) * 20;
  saturn.position.z = Math.sin(elapsedTime * 0.1) * 20;
  saturn.rotation.y += 0.008;
  saturn.rotation.x += Math.PI * 0.5 + 0.043478;

  // setup uranus
  uranus.position.x = Math.cos(elapsedTime * 0.07) * 28;
  uranus.position.y = Math.sin(elapsedTime * 0.07) * 28;
  uranus.rotation.z += 0.008;
  uranus.rotation.x += 0.013445;

  // setup neptune
  neptune.position.x = Math.cos(elapsedTime * 0.05) * 36;
  neptune.position.z = Math.sin(elapsedTime * 0.05) * 36;
  neptune.rotation.y += 0.008;
  neptune.rotation.x += Math.PI * 0.5 + 0.030886;

  // Update controls
  controls.update();

  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();

// raycasting on planet clicks

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

// hover
let currentHovered = null;

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactiveObjects);

  // If we are hovering over something new
  if (intersects.length > 0) {
    let newHovered = intersects[0].object;
    // If it's an orbit, get its planet
    if (newHovered.userData.planet) {
      newHovered = newHovered.userData.planet;
    }

    // If the new object is different from the old one
    if (currentHovered !== newHovered) {
      // Un-highlight the old object if it exists
      if (currentHovered) {
        currentHovered.material.emissive.setHex(0x000000);
        currentHovered.userData.orbit.visible = false;
      }

      // Highlight the new one
      currentHovered = newHovered;
      currentHovered.material.emissive.setHex(0xaaaaaa555555);
      currentHovered.userData.orbit.visible = true;
    }
  }
  // If we are not hovering over anything
  else {
    // Un-highlight the old object if it exists
    if (currentHovered) {
      currentHovered.material.emissive.setHex(0x000000);
      currentHovered.userData.orbit.visible = false;
    }
    currentHovered = null;
  }
}
window.addEventListener("mousemove", onMouseMove);

// click
function onPlanetClick(e) {
  // calculate mouse position from -1 to +1
  mouse.x = (e.clientX / sizes.width) * 2 - 1;
  mouse.y = -(e.clientY / sizes.height) * 2 + 1;

  // update the raycaster with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(interactiveObjects);

  if (intersects.length > 0) {
    let clickedObject = intersects[0].object;

    // If the orbit was clicked, get the associated planet
    if (clickedObject.userData.planet) {
      clickedObject = clickedObject.userData.planet;
    }

    console.log(`You clicked on: ${clickedObject.name}`);
    // alert(`You clicked on: ${clickedObject.name}`);
  }
}

window.addEventListener("click", onPlanetClick);
window.addEventListener("mousemove", onMouseMove);
