import { Clock, Vector3 } from "three";

const clock = new Clock();
const PHYSICS_DELTA = 0.05;
const GRAVITY = 2;

class AnimationLoop {
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
}

export { AnimationLoop };
