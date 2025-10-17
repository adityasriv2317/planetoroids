# Planetoroids

A small interactive Three.js demo that visualizes a simplified solar system with planets, orbits, a starfield and basic interaction. Click planets or their orbits to open an info panel. This project is intended as a learning/demo project and a starting point for experimenting with 3D scenes in the browser.

## Features

- Interactive 3D scene built with Three.js (module importmap in `index.html`).
- Sun and eight planets with simple orbital motion and rotation.
- Saturn rings with a texture mapped onto a ring geometry.
- Starfield background using a Points buffer geometry.
- Clickable planets and orbits that open an info panel (see `interactions.js`).

## Files

- `index.html` — entry point, sets up the import map for Three.js and loads `main.js`.
- `main.js` — bootstraps the scene, creates planets, adds lights and animation loop.
- `createCelestialBody.js` — helper to create sphere meshes for planets/sun (textures, scale, and naming).
- `sceneSetup.js` — scene, camera, controls and renderer initialization.
- `interactions.js` — raycast-based click/hover handling and UI wiring for the info panel.
- `planetData.js` — data used by the interactions/info panel to show names and descriptions.
- `style.css` — basic page styling and info panel styles.
- `assets/` — textures for planets, sun, and rings.

> Note: Some filenames listed above are inferred from the codebase and used by `main.js`.

## How to run (local development)

1. Open the project folder in a simple static server. Because `index.html` uses ES module imports and an import map, you must serve the files over HTTP (opening the file:// URL will fail in most browsers).

2. Quick options:

   - Using Python 3 (if installed):

     - For Windows PowerShell:

       python -m http.server 8000

     - Then open `http://localhost:8000/` in your browser.

   - Using Node.js `http-server` (if installed globally):

     - http-server -c-1 .

     - Then open the printed URL (usually `http://127.0.0.1:8080`).

3. Open the site in a modern browser (Chrome, Edge or Firefox) that supports ES modules and import maps.

## Controls

- Use mouse drag to orbit the camera (OrbitControls).
- Scroll to zoom.
- Click a planet or its orbit to open the info panel.
- Close the panel with the × button.

## Development notes & things to try

- Textures are stored in `assets/` — swap or replace them to change planet appearances.
- Tweak orbital radii and speeds in `main.js` to experiment with motion.
- Add labels, accurate scales, or physically-correct lighting for a more realistic simulation.
- Consider bundling with a simple build tool (Vite, Parcel, or webpack) if you plan to expand the demo.

## License & credits

- Textures and assets are taken from common educational or public-domain resources; verify licensing before reuse in a public project.
- This demo code is provided as-is for learning and experimentation.

---
