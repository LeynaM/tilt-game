import { Vector3, Vector2 } from "three";
import { positionOnPlaneTo3D } from "../utils/utils";
import { PLATFORM_TYPES } from "../constants/constants";

const PHYSICS_DELTA = 0.05;
const GRAVITY = 2;

class PhysicsLoop {
  constructor(tiltAngles, circle, plane) {
    this.tiltAngles = tiltAngles;
    this.circle = circle;
    this.plane = plane;
  }

  start() {
    this.tiltAngles.x = 0;
    this.tiltAngles.z = 0;

    this.circle.centre = new Vector2(-2, -2);
    this.circle.velocity = new Vector2(0, 0);
    this.circle.acceleration = new Vector2(0, 0);
    this.circle.isOnPlane = true;
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
    // const atFinish =
    //   Math.abs(this.circle.centre.x - this.plane.finish.centre.x) <=
    //     this.plane.finish.radius - this.circle.radius &&
    //   Math.abs(this.circle.centre.y - this.plane.finish.centre.y) <=
    //     this.plane.finish.radius - this.circle.radius;
    const circleGridI = Math.floor(
      (this.circle.centre.x + this.plane.width / 2) /
        (this.plane.width / this.plane.resolution),
    );
    const circleGridJ = Math.floor(
      (this.circle.centre.y + this.plane.width / 2) /
        (this.plane.width / this.plane.resolution),
    );

    this.circle.isOnPlane =
      this.circle.isOnPlane &&
      this.circle.centre.x < this.plane.width / 2 &&
      this.circle.centre.x > -this.plane.width / 2 &&
      this.circle.centre.y < this.plane.height / 2 &&
      this.circle.centre.y > -this.plane.height / 2;

    if (
      this.circle.isOnPlane &&
      this.plane.platforms[circleGridI][circleGridJ].type ===
        PLATFORM_TYPES.FINISH
    ) {
      this.onWin();
      return;
    }

    if (this.circle.isOnPlane) {
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
    } else {
      this.onLose();
    }
  }
}

export { PhysicsLoop };
