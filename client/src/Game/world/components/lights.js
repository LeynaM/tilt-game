import { DirectionalLight } from "three";

function createLights() {
  const light = new DirectionalLight("white", 2);
  light.position.set(0, -20, 0);

  const sideLight = new DirectionalLight("white", 2);
  sideLight.position.set(10, -10, 10);
  sideLight.castShadow = true;
  sideLight.shadow.mapSize.x = 512;
  sideLight.shadow.mapSize.y = 512;

  return [light, sideLight];
}

export { createLights };
