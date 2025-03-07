import { PerspectiveCamera } from "three";

function createCamera(container) {
  const camera = new PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );

  camera.rotation.x += Math.PI / 2;
  camera.position.set(0, -6, 0);
  //
  // For testing (side on):
  // camera.rotation.z = Math.PI;
  // camera.position.set(0, 0, 6);

  return camera;
}

export { createCamera };
