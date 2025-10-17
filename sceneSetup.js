import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function initializeScene(renderer, sizes) {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    camera.position.z = 15;
    scene.add(camera);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 100);
    scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.08);
    scene.add(ambientLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Return all the essential components
    return { scene, camera, controls };
}

export { initializeScene };