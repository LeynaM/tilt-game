import { PointLight } from "three";

function createLights() {
  const light = new PointLight("white", 500);
  light.position.set(0, -13, 0);

  return light;
}

export { createLights };
