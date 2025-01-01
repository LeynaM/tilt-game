import { PhysicsLoop } from "./physics/PhysicsLoop";
import { Plane } from "./physics/Plane";
import { Circle } from "./physics/Circle";
import { Vector2, Clock } from "three";
import { World } from "./world/World";

export class Game {
  constructor(container) {
    this.container = container;

    this.clock = new Clock();
    this.score;
    this.highscore;
    this.isNewHighscore;

    this.plane = new Plane(6, 16);
    this.circle = new Circle(0.2, new Vector2(0, 0));
    this.tiltAngles = { x: 0, z: 0 };

    this.physicsLoop = new PhysicsLoop(
      this.tiltAngles,
      this.circle,
      this.plane,
    );
    this.physicsLoop.onWin = () => {
      this.updateScores();
      this.clock.stop();
      this.onWin();
    };
    this.physicsLoop.onLose = () => {
      this.clock.stop();
      this.onLose();
    };
    this.world = new World(
      this.container,
      this.tiltAngles,
      this.circle,
      this.plane,
    );

    this.addTiltControls();
  }

  addTiltControls() {
    this.container.addEventListener("mousemove", (event) => {
      this.tiltAngles.x =
        ((event.clientY / this.container.clientHeight) * Math.PI) / 2 -
        Math.PI / 4;
      this.tiltAngles.z =
        ((event.clientX / this.container.clientWidth) * Math.PI) / 2 -
        Math.PI / 4;
    });
  }

  resetState() {
    this.isNewHighscore = false;

    this.tiltAngles.x = 0;
    this.tiltAngles.z = 0;

    this.circle.centre = new Vector2(-2, -2);
    this.circle.velocity = new Vector2(0, 0);
    this.circle.acceleration = new Vector2(0, 0);
  }

  start() {
    this.resetState();
    this.clock.start();
    this.physicsLoop.start();
    this.world.startAnimationLoop();
  }

  stop() {
    this.physicsLoop.stop();
    this.world.stopAnimationLoop();
  }

  updateScores() {
    this.score = parseFloat(this.clock.getElapsedTime().toFixed(3));
    this.isNewHighscore = !this.highscore || this.score < this.highscore;
    if (this.isNewHighscore) {
      this.highscore = this.score;
    }
  }

  onWin() {}

  onLose() {}
}
