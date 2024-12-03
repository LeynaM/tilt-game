import { PointLight } from "three";

function createLights() {
  const light = new PointLight("white", 100);
  light.position.set(0, 0, 5);

  return light;
}

export { createLights };
