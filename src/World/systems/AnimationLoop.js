import { Vector3, Vector2 } from "three";
import { positionOnPlaneTo3D } from "../utils/utils";

const PHYSICS_DELTA = 0.05;
const GRAVITY = 20;

class AnimationLoop {
  constructor(camera, scene, renderer, cube, ball, finish, physics) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.physics = physics;
    this.cube = cube;
    this.ball = ball;
    this.finish = finish;
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
    this.finish.rotation.x = this.cube.rotation.x + Math.PI / 2;
    this.finish.rotation.y = this.cube.rotation.z;

    const ballPosition =
      this.physics.circle.isOnPlane || !this.physics.sphere
        ? positionOnPlaneTo3D(
            new Vector3(
              this.physics.circle.centre.x,
              this.physics.circle.centre.y,
              -0.2,
            ),
            this.physics.tiltAngles,
          )
        : this.physics.sphere.centre;

    this.ball.position.x = ballPosition.x;
    this.ball.position.y = ballPosition.y;
    this.ball.position.z = ballPosition.z;

    const finishPosition = positionOnPlaneTo3D(
      new Vector3(
        this.physics.plane.finish.centre.x,
        this.physics.plane.finish.centre.y,
        -0.1,
      ),
      this.physics.tiltAngles,
    );
    this.finish.position.x = finishPosition.x;
    this.finish.position.y = finishPosition.y;
    this.finish.position.z = finishPosition.z;
  }
}

export { AnimationLoop };
