import { BoxGeometry, Mesh } from "three";
import { get3DPlatformPositionfromGridCoords } from "../../utils/utils";
import { PLATFORM_TYPES } from "../../constants/constants";

export function createPlatforms(plane, materials) {
  const platforms = new Array(plane.resolution);
  for (let i = 0; i < plane.resolution; i++) {
    platforms[i] = new Array(plane.resolution);
    for (let j = 0; j < plane.resolution; j++) {
      const geometry = new BoxGeometry(
        plane.size / plane.resolution,
        0.2,
        plane.size / plane.resolution,
      );

      const platform = new Mesh(geometry, materials[PLATFORM_TYPES.DEFAULT]);
      const position = get3DPlatformPositionfromGridCoords(
        i,
        j,
        plane.size,
        plane.resolution,
      );
      platform.position.set(position.x, position.y, position.z);
      platform.receiveShadow = true;
      platforms[i][j] = platform;
    }
  }

  return platforms;
}
