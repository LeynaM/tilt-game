import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import { Vector3 } from "three";
import { get3DPlatformPositionfromGridCoords } from "../utils/utils";

function createPlatform(plane) {
  const material = new MeshStandardMaterial({ color: 0x0ffff0 });

  const platforms = new Array(plane.resolution);
  for (let i = 0; i < plane.resolution; i++) {
    platforms[i] = new Array(plane.resolution);
    for (let j = 0; j < plane.resolution; j++) {
      const geometry = new BoxGeometry(
        plane.width / plane.resolution,
        0.1,
        plane.height / plane.resolution,
      );

      const platform = new Mesh(geometry, material);
      const position = get3DPlatformPositionfromGridCoords(
        i,
        j,
        plane.width,
        plane.resolution,
      );
      platform.position.set(position.x, position.y, position.z);
      platform.receiveShadow = true;
      platform.castShadow = true;
      platforms[i][j] = platform;
    }
  }

  return platforms;
}

export { createPlatform };
