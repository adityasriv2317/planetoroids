import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

function createCelestialBody(radius, texturePath, name, isEmissive = false) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const texture = textureLoader.load(texturePath);

    let material;
    if (isEmissive) {
        material = new THREE.MeshStandardMaterial({
            emissiveMap: texture,
            emissive: 0xffff00,
            emissiveIntensity: 1.5,
        });
    } else {
        material = new THREE.MeshStandardMaterial({ map: texture });
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    return mesh;
}

export { createCelestialBody };