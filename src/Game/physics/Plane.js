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
    this.resetTiles();
  }

  resetTiles() {
    this.tiles.flat().map((tile) => {
      tile.type = PLATFORM_TYPES.DEFAULT;
      return tile;
    });
    const randI = Math.floor(Math.random() * this.resolution);
    const randJ = Math.floor(Math.random() * this.resolution);
    this.tiles[randI][randJ].type = PLATFORM_TYPES.FINISH;
    this.finishCoords = { i: randI, j: randJ };
  }

  updateFinish() {
    let randI = Math.floor(Math.random() * this.resolution);
    let randJ = Math.floor(Math.random() * this.resolution);
    while (this.tiles[randI][randJ].type != PLATFORM_TYPES.DEFAULT) {
      randI = Math.floor(Math.random() * this.resolution);
      randJ = Math.floor(Math.random() * this.resolution);
    }
    this.tiles[this.finishCoords.i][this.finishCoords.j].type =
      PLATFORM_TYPES.DEFAULT;
    this.tiles[randI][randJ].type = PLATFORM_TYPES.FINISH;
    this.finishCoords = { i: randI, j: randJ };
  }

  addHoles(cutoff) {
    this.tiles.map((array) => {
      return array.map((t) => {
        if (t.type === PLATFORM_TYPES.DEFAULT) {
          const rand = Math.random();
          if (rand < cutoff) {
            t.type = PLATFORM_TYPES.HOLE;
          }
        }
        return t;
      });
    });
  }
}
