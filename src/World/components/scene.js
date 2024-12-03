import { Color, Scene } from "three";

function createScene() {
  const scene = new Scene();

  scene.background = new Color("midnightblue");

  return scene;
}

export { createScene };
