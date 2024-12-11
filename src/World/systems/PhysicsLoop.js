import { Clock, Vector3 } from "three";

const clock = new Clock();
const PHYSICS_DELTA = 0.05;
const GRAVITY = 2;

class PhysicsLoop {
  constructor(tiltAngles, circle) {
    this.tiltAngles = tiltAngles;
    this.circle = circle;
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
    console.log(this.circle.centre);
  }
}

export { PhysicsLoop };
