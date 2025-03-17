import { PLATFORM_TYPES } from "../../constants/constants";
import { MeshStandardMaterial } from "three";

export function createMaterials() {
  return {
    [PLATFORM_TYPES.DEFAULT]: new MeshStandardMaterial({
      color: 0x0ffff0,
    }),
    [PLATFORM_TYPES.FINISH]: new MeshStandardMaterial({
      color: 0x20a030,
    }),
  };
}
