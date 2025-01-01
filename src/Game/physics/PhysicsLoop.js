import { positionOnPlaneTo3D } from "/src/utils/utils";
import { PLATFORM_TYPES } from "/src/constants/constants";

const PHYSICS_DELTA = 0.05;
const GRAVITY = 2;

export class PhysicsLoop {
  constructor(tiltAngles, circle, plane) {
    this.tiltAngles = tiltAngles;
    this.circle = circle;
    this.plane = plane;
  }

  start() {
    this.loop = setInterval(() => {
      this.physicsTick();
    }, PHYSICS_DELTA * 1000);
  }

  stop() {
    clearInterval(this.loop);
  }

  onWin() {}

  onLose() {}

  physicsTick() {
    const circleGridI = Math.floor(
      (this.circle.centre.x + this.plane.size / 2) /
        (this.plane.size / this.plane.resolution),
    );
    const circleGridJ = Math.floor(
      (this.circle.centre.y + this.plane.size / 2) /
        (this.plane.size / this.plane.resolution),
    );

    const circleIsOffPlane =
      circleGridI < 0 ||
      circleGridI >= this.plane.resolution ||
      circleGridJ < 0 ||
      circleGridJ >= this.plane.resolution;

    if (circleIsOffPlane) {
      this.onLose();
      return;
    }

    if (
      this.plane.tiles[circleGridI][circleGridJ].type === PLATFORM_TYPES.FINISH
    ) {
      this.onWin();
      return;
    }

    this.circle.acceleration.x = GRAVITY * Math.sin(this.tiltAngles.z);
    this.circle.velocity.x =
      this.circle.velocity.x + this.circle.acceleration.x * PHYSICS_DELTA;
    this.circle.centre.x =
      this.circle.centre.x + this.circle.velocity.x * PHYSICS_DELTA;

    this.circle.acceleration.y = -GRAVITY * Math.sin(this.tiltAngles.x);
    this.circle.velocity.y =
      this.circle.velocity.y + this.circle.acceleration.y * PHYSICS_DELTA;
    this.circle.centre.y =
      this.circle.centre.y + this.circle.velocity.y * PHYSICS_DELTA;
  }
}
