import { Clock, Vector3 } from "three";

const clock = new Clock();
const PHYSICS_DELTA = 0.05;
const GRAVITY = 2;

class Loop {
  constructor(camera, scene, renderer, cube, tiltAngles, circle, ball) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.cube = cube;
    this.tiltAngles = tiltAngles;
    this.ball = ball;
    this.circle = circle;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // render a frame
      this.animationTick();
      this.renderer.render(this.scene, this.camera);
    });

    this.physicsLoop = setInterval(() => {
      this.physicsTick();
    }, PHYSICS_DELTA * 1000);
  }

  stop() {
    this.renderer.setAnimationLoop(null);
    // clearInterval(this.physicsLoop);
  }

  animationTick() {
    this.cube.rotation.x = this.tiltAngles.x;
    this.cube.rotation.z = this.tiltAngles.z;

    this.ball.position.x = this.circle.centre.x * Math.cos(this.tiltAngles.z);
    this.ball.position.y =
      this.circle.centre.x *
        Math.sin(this.tiltAngles.z) *
        Math.cos(this.tiltAngles.x) -
      this.circle.centre.y * Math.sin(this.tiltAngles.x);
    this.ball.position.z =
      this.circle.centre.x *
        Math.sin(this.tiltAngles.x) *
        Math.sin(this.tiltAngles.z) +
      this.circle.centre.y * Math.cos(this.tiltAngles.x);

    console.log(this.ball.position);
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

export { Loop };
