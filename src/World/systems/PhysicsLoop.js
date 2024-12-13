import { Clock, Vector3 } from "three";
import { positionOnPlaneTo3D } from "../utils/utils";

const PHYSICS_DELTA = 0.05;
const GRAVITY = 2;

class PhysicsLoop {
  constructor(tiltAngles, circle, sphere, plane) {
    this.tiltAngles = tiltAngles;
    this.circle = circle;
    this.sphere = sphere;
    this.plane = plane;
  }

  start() {
    this.Loop = setInterval(() => {
      this.physicsTick();
    }, PHYSICS_DELTA * 1000);
  }

  stop() {
    clearInterval(this.physicsLoop);
  }

  physicsTick() {
    const atFinish =
      Math.abs(this.circle.centre.x - this.plane.finish.centre.x) <=
        this.plane.finish.radius - this.circle.radius &&
      Math.abs(this.circle.centre.y - this.plane.finish.centre.y) <=
        this.plane.finish.radius - this.circle.radius;
    if (atFinish) {
      console.log("hello");
    }

    this.circle.isOnPlane =
      this.circle.isOnPlane &&
      this.circle.centre.x < this.plane.width / 2 &&
      this.circle.centre.x > -this.plane.width / 2 &&
      this.circle.centre.y < this.plane.height / 2 &&
      this.circle.centre.y > -this.plane.height / 2;

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
      if (!this.sphere) {
        this.sphere = {
          centre: positionOnPlaneTo3D(this.circle.centre, this.tiltAngles),
          //This is wrong (need to include the vertical component)
          velocity: new Vector3(
            this.circle.velocity.x,
            0,
            this.circle.velocity.y,
          ),
          acceleration: new Vector3(0, GRAVITY, 0),
        };
      }
      this.sphere.velocity.y =
        this.sphere.velocity.y + this.sphere.acceleration.y * PHYSICS_DELTA;
      this.sphere.centre.y =
        this.sphere.centre.y + this.sphere.velocity.y * PHYSICS_DELTA;
    }
  }
}

export { PhysicsLoop };
