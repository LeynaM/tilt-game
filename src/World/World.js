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
import { PLATFORM_TYPES } from "./constants/constants.js";

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
      resolution: 16,
      finish: {
        centre: new Vector2(2, 2),
        radius: 0.3,
      },
    };
    plane.platforms = new Array(plane.resolution);
    for (let i = 0; i < plane.resolution; i++) {
      plane.platforms[i] = new Array(plane.resolution);
      for (let j = 0; j < plane.resolution; j++) {
        plane.platforms[i][j] = {
          type: PLATFORM_TYPES.DEFAULT,
        };
      }
    }
    const randI = Math.floor(Math.random() * plane.resolution);
    const randJ = Math.floor(Math.random() * plane.resolution);
    plane.platforms[randI][randJ].type = PLATFORM_TYPES.FINISH;
    console.log(randI, randJ);

    const circle = {
      radius: 0.2,
      centre: undefined,
      velocity: undefined,
      acceleration: undefined,
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
    // const finish = createFinish(plane.finish);
    scene.add(...platforms.flat(), ball, ...lights);

    animationLoop = new AnimationLoop(
      camera,
      scene,
      renderer,
      platforms,
      ball,
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
