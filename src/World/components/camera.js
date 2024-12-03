import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );

  camera.rotation.x += 0.3;
  camera.position.set(0, -2, 6);

  return camera;
}

export { createCamera };
