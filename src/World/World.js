import { createCamera } from "./components/camera.js";
import { createPlatform } from "./components/platform.js";
import { createBall } from "./components/ball.js";
import { createFinish } from "./components/finish.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { TiltControls } from "./systems/TiltControls.js";
import { createLights } from "./components/lights.js";
import { AnimationLoop } from "./systems/AnimationLoop.js";
import { PhysicsLoop } from "./systems/PhysicsLoop.js";
import { Vector2, Vector3 } from "three";

let camera;
let renderer;
let scene;
let animationLoop;
let physicsLoop;

class World {
  constructor(container) {
    const plane = {
      width: 6,
      height: 6,
      resolution: 4,
      finish: {
        centre: new Vector2(2, 2),
        radius: 0.3,
      },
    };
    const circle = {
      radius: 0.2,
      centre: new Vector2(0, 0),
      velocity: new Vector2(0, 0),
      acceleration: new Vector2(0, 0),
      isOnPlane: true,
    };

    const tiltAngles = { x: 0, z: 0 };

    physicsLoop = new PhysicsLoop(tiltAngles, circle, plane);
    physicsLoop.onWin = () => this.onWin();
    physicsLoop.onLose = () => this.onLose();

    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    const lights = createLights();
    const platforms = createPlatform(plane);
    const ball = createBall();
    const finish = createFinish(plane.finish);
    scene.add(...platforms.flat(), ball, ...lights, finish);

    animationLoop = new AnimationLoop(
      camera,
      scene,
      renderer,
      platforms,
      ball,
      finish,
      physicsLoop,
    );

    container.append(renderer.domElement);

    const resizer = new Resizer(container, camera, renderer);

    const tiltControl = new TiltControls(container, tiltAngles);
    this.render();

    resizer.onResize = () => this.render();
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    animationLoop.start();
    physicsLoop.start();
  }

  stop() {
    animationLoop.stop();
    physicsLoop.stop();
  }

  onWin() {}

  onLose() {}
}

export { World };
