import { PointLight } from "three";

function createLights() {
  const light = new PointLight("white", 600);
  light.position.set(0, -20, 0);

  const sideLight = new PointLight("white", 300);
  sideLight.position.set(10, -10, 10);
  sideLight.castShadow = true;
  sideLight.shadow.mapSize.x = 2048;
  sideLight.shadow.mapSize.y = 2048;

  return [light, sideLight];
}

export { createLights };
