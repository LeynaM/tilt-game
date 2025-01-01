import { Vector3, Vector2 } from "three";
import {
  positionOnPlaneTo3D,
  get3DPlatformPositionfromGridCoords,
} from "../utils/utils";

const PHYSICS_DELTA = 0.05;
const GRAVITY = 20;

class AnimationLoop {
  constructor(camera, scene, renderer, platforms, ball, finish, physics) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.physics = physics;
    this.platforms = platforms;
    this.ball = ball;
    this.finish = finish;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.animationTick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  animationTick() {
    for (let i = 0; i < this.physics.plane.resolution; i++) {
      for (let j = 0; j < this.physics.plane.resolution; j++) {
        const platform = this.platforms[i][j];
        platform.rotation.x = this.physics.tiltAngles.x;
        platform.rotation.z = this.physics.tiltAngles.z;

        const untiltedPosition = get3DPlatformPositionfromGridCoords(
          i,
          j,
          this.physics.plane.width,
          this.physics.plane.resolution,
        );
        const platformPosition = positionOnPlaneTo3D(
          new Vector3(
            untiltedPosition.x,
            untiltedPosition.z,
            untiltedPosition.y,
          ),
          this.physics.tiltAngles,
        );
        platform.position.x = platformPosition.x;
        platform.position.y = platformPosition.y;
        platform.position.z = platformPosition.z;
      }
    }

    const ballPosition = positionOnPlaneTo3D(
      new Vector3(
        this.physics.circle.centre.x,
        this.physics.circle.centre.y,
        -0.2,
      ),
      this.physics.tiltAngles,
    );
    this.ball.position.x = ballPosition.x;
    this.ball.position.y = ballPosition.y;
    this.ball.position.z = ballPosition.z;

    this.finish.rotation.x = this.physics.tiltAngles.x + Math.PI / 2;
    this.finish.rotation.y = this.physics.tiltAngles.z;
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
