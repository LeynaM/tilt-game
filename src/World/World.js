import { createCamera } from "./components/camera.js";
import { createCube } from "./components/cube.js";
import { createBall } from "./components/ball.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { TiltControls } from "./systems/TiltControls.js";
import { createLights } from "./components/lights.js";
import { Loop } from "./systems/Loop.js";

let camera;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const cube = createCube();
    const ball = createBall();
    const light = createLights();

    loop.updatables.push(cube);

    scene.add(cube, ball, light);

    const resizer = new Resizer(container, camera, renderer);
    // resizer.onResize = () => {
    //   this.render();
    // };

    const tiltControl = new TiltControls(container, cube);
    // tiltControl.onTilt = () => {
    //   console.log("hi");
    //   this.render();
    // };
  }
  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
