import { Clock, Vector3 } from "three";
import { positionOnPlaneTo3D } from "../utils/utils";

const clock = new Clock();
const PHYSICS_DELTA = 0.05;
const GRAVITY = 20;

class AnimationLoop {
  constructor(camera, scene, renderer, cube, ball, physics) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.physics = physics;
    this.cube = cube;
    this.ball = ball;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // render a frame
      this.animationTick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
    // clearInterval(this.physicsLoop);
  }

  animationTick() {
    this.cube.rotation.x = this.physics.tiltAngles.x;
    this.cube.rotation.z = this.physics.tiltAngles.z;

    const position =
      this.physics.circle.isOnPlane || !this.physics.sphere
        ? positionOnPlaneTo3D(
            this.physics.circle.centre,
            this.physics.tiltAngles,
          )
        : this.physics.sphere.centre;
    if (!(this.physics.circle.isOnPlane || !this.physics.sphere)) {
      console.log("blah");
      debugger;
    }

    this.ball.position.x = position.x;
    this.ball.position.y = position.y;
    this.ball.position.z = position.z;
  }
}

export { AnimationLoop };
