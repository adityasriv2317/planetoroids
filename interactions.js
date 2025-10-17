import * as THREE from "three";

function setupInteractions(
  camera,
  interactiveObjects,
  uiElements,
  planetData,
  sizes
) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
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

      const planetName = currentHovered.name;
      // Check if we have data for this planet
      if (planetData[planetName]) {
        // Populate the panel
        uiElements.planetNameElement.textContent =
          planetName.charAt(0).toUpperCase() + planetName.slice(1);
        uiElements.planetInfoElement.textContent = planetData[planetName].info;

        // Show the panel
        uiElements.infoPanel.classList.remove("hidden");
      }
    }
  }

  // Add event listeners
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("click", onPlanetClick);
  uiElements.closeButton.addEventListener("click", () => {
    uiElements.infoPanel.classList.add("hidden");
  });
}

export { setupInteractions };
