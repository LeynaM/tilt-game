import { createCamera } from "./components/camera.js";
import { createPlatforms } from "./components/platforms.js";
import { createBall } from "./components/ball.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { createLights } from "./components/lights.js";
import { Vector3 } from "three";
import { createMaterials } from "./components/materials.js";
import { PLATFORM_TYPES } from "../constants/constants.js";
import {
  get3DPlatformPositionfromGridCoords,
  positionOnPlaneTo3D,
} from "../utils/utils.js";

export class World {
  constructor(container, tiltAngles, circle, plane) {
    this.tiltAngles = tiltAngles;
    this.circle = circle;
    this.plane = plane;
    this.materials = createMaterials();
    this.platforms = createPlatforms(this.plane, this.materials);
    this.ball = createBall();
    this.camera = createCamera(container);
    this.scene = createScene();
    this.renderer = createRenderer();
    this.lights = createLights();
    this.scene.add(...this.platforms.flat(), this.ball, ...this.lights);

    container.append(this.renderer.domElement);

    const resizer = new Resizer(container, this.camera, this.renderer);
    resizer.onResize = () => this.render();

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  startAnimationLoop() {
    this.renderer.setAnimationLoop(() => {
      this.animationTick();
      this.render();
    });
  }

  stopAnimationLoop() {
    this.renderer.setAnimationLoop(null);
  }

  animationTick() {
    for (let i = 0; i < this.plane.resolution; i++) {
      for (let j = 0; j < this.plane.resolution; j++) {
        const platform = this.platforms[i][j];
        platform.rotation.x = this.tiltAngles.x;
        platform.rotation.z = this.tiltAngles.z;

        const untiltedPosition = get3DPlatformPositionfromGridCoords(
          i,
          j,
          this.plane.size,
          this.plane.resolution,
        );
        const platformPosition = positionOnPlaneTo3D(
          new Vector3(
            untiltedPosition.x,
            untiltedPosition.z,
            untiltedPosition.y,
          ),
          this.tiltAngles,
        );
        platform.position.x = platformPosition.x;
        platform.position.y = platformPosition.y;
        platform.position.z = platformPosition.z;

        if (this.plane.tiles[i][j].type === PLATFORM_TYPES.HOLE) {
          platform.visible = false;
        } else {
          platform.visible = true;
          platform.material = this.materials[this.plane.tiles[i][j].type];
        }
      }
    }

    const ballPosition = positionOnPlaneTo3D(
      new Vector3(this.circle.centre.x, this.circle.centre.y, -0.3), //z coord is - (half platform thickness + ball radius)
      this.tiltAngles,
    );
    this.ball.position.x = ballPosition.x;
    this.ball.position.y = ballPosition.y;
    this.ball.position.z = ballPosition.z;
  }
}
