import { Clock, Vector3 } from "three";

const clock = new Clock();
const PHYSICS_DELTA = 0.05;
const GRAVITY = new Vector3(0, 1, 0);

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
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

    this.physicsLoop = setInterval(() => {
      this.physicsTick();
    }, PHYSICS_DELTA * 1000);
  }

  stop() {
    this.renderer.setAnimationLoop(null);
    clearInterval(this.physicsLoop);
  }

  animationTick() {
    const delta = clock.getDelta();

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }

  physicsTick() {
    this.rigidBody.velocity.add(GRAVITY.clone().multiplyScalar(PHYSICS_DELTA));
    this.rigidBody.position.add(
      this.rigidBody.velocity.clone().multiplyScalar(PHYSICS_DELTA),
    );
  }
}

export { Loop };
