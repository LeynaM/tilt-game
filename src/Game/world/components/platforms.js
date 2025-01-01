import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import { get3DPlatformPositionfromGridCoords } from "/src/utils/utils";

export function createPlatforms(plane) {
  const platforms = new Array(plane.resolution);
  for (let i = 0; i < plane.resolution; i++) {
    platforms[i] = new Array(plane.resolution);
    for (let j = 0; j < plane.resolution; j++) {
      const geometry = new BoxGeometry(
        plane.size / plane.resolution,
        0.1,
        plane.size / plane.resolution,
      );
      const material = new MeshStandardMaterial({ color: 0x0ffff0 });
      const platform = new Mesh(geometry, material);
      const position = get3DPlatformPositionfromGridCoords(
        i,
        j,
        plane.size,
        plane.resolution,
      );
      platform.position.set(position.x, position.y, position.z);
      platform.receiveShadow = true;
      // platform.castShadow = true;
      platforms[i][j] = platform;
    }
  }

  return platforms;
}
