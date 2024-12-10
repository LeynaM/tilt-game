import { Clock, Vector3 } from "three";

const clock = new Clock();
const PHYSICS_DELTA = 0.05;
const GRAVITY = new Vector3(0, 1, 0);

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

  setRigidBody(rigidBody) {
    this.rigidBody = rigidBody;
    this.rigidBody.velocity = new Vector3();
    this.rigidBody.acceleration = new Vector3();
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // render a frame
      this.animationTick();
      this.renderer.render(this.scene, this.camera);
    });

    // this.physicsLoop = setInterval(() => {
    //   this.physicsTick();
    // }, PHYSICS_DELTA * 1000);
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

  //   physicsTick() {
  //     this.rigidBody.velocity.add(GRAVITY.clone().multiplyScalar(PHYSICS_DELTA));
  //     this.rigidBody.position.add(
  //       this.rigidBody.velocity.clone().multiplyScalar(PHYSICS_DELTA),
  //     );
  //   }
}

export { Loop };
