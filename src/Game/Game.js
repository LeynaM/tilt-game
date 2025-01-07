import { PhysicsLoop } from "./physics/PhysicsLoop";
import { Plane } from "./physics/Plane";
import { Circle } from "./physics/Circle";
import { Vector2 } from "three";
import { World } from "./world/World";

export class Game {
  constructor(container) {
    this.container = container;

    this.score = 0;
    this.highscore = 0;
    this.isNewHighscore;

    this.plane = new Plane(6, 16);
    this.circle = new Circle(0.2, new Vector2(0, 0));
    this.tiltAngles = { x: 0, z: 0 };

    this.physicsLoop = new PhysicsLoop(
      this.tiltAngles,
      this.circle,
      this.plane,
    );
    this.physicsLoop.onScore = () => {
      this.plane.addHoles(0.05);
      this.plane.updateFinish();
      this.score++;
      this.onScoreUpdated();
    };
    this.physicsLoop.onGameOver = () => {
      if (this.score > this.highscore) {
        this.highscore = this.score;
        this.isNewHighscore = true;
      }
      this.onGameOver();
    };
    this.world = new World(
      this.container,
      this.tiltAngles,
      this.circle,
      this.plane,
    );

    this.container.addEventListener("mousemove", (event) => {
      this.tiltAngles.x =
        ((event.clientY / event.currentTarget.clientHeight) * Math.PI) / 2 -
        Math.PI / 4;
      this.tiltAngles.z =
        ((event.clientX / event.currentTarget.clientWidth) * Math.PI) / 2 -
        Math.PI / 4;
    });
    this.container.addEventListener("touchmove", (event) => {
      this.tiltAngles.x =
        ((event.clientY / event.currentTarget.clientHeight) * Math.PI) / 2 -
        Math.PI / 4;
      this.tiltAngles.z =
        ((event.clientX / event.currentTarget.clientWidth) * Math.PI) / 2 -
        Math.PI / 4;
    });
  }

  resetState() {
    this.score = 0;
    this.isNewHighscore = false;
    this.plane.resetTiles();

    this.tiltAngles.x = 0;
    this.tiltAngles.z = 0;

    this.circle.centre = new Vector2(-2, -2);
    this.circle.velocity = new Vector2(0, 0);
    this.circle.acceleration = new Vector2(0, 0);
  }

  start() {
    this.resetState();
    this.physicsLoop.start();
    this.world.startAnimationLoop();
    this.onScoreUpdated();
  }

  stop() {
    this.physicsLoop.stop();
    this.world.stopAnimationLoop();
  }

  onScoreUpdated() {}

  onGameOver() {}
}
