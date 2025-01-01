import { PLATFORM_TYPES } from "/src/constants/constants.js";

export class Plane {
  constructor(size, resolution) {
    this.size = size;
    this.resolution = resolution;

    this.tiles = new Array(this.resolution);
    for (let i = 0; i < this.resolution; i++) {
      this.tiles[i] = new Array(this.resolution);
      for (let j = 0; j < this.resolution; j++) {
        this.tiles[i][j] = {
          type: PLATFORM_TYPES.DEFAULT,
        };
      }
    }

    const randI = Math.floor(Math.random() * this.resolution);
    const randJ = Math.floor(Math.random() * this.resolution);
    this.tiles[randI][randJ].type = PLATFORM_TYPES.FINISH;
  }
}
