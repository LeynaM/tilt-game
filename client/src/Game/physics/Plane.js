import { PLATFORM_TYPES } from "../constants/constants.js";

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

  breadthFirstSearch(i, j, visitedTiles) {
    if (i < 0 || j < 0 || i >= this.resolution || j >= this.resolution) {
      return [];
    }

    if (visitedTiles[i][j]) {
      return [];
    }

    if (this.tiles[i][j].type === PLATFORM_TYPES.HOLE) {
      return [];
    }

    visitedTiles[i][j] = true;

    const allowedFinishes = [
      { i, j },
      ...this.breadthFirstSearch(i + 1, j, visitedTiles),
      ...this.breadthFirstSearch(i - 1, j, visitedTiles),
      ...this.breadthFirstSearch(i, j + 1, visitedTiles),
      ...this.breadthFirstSearch(i, j - 1, visitedTiles),
    ];

    return allowedFinishes;
  }

  getAllowedFinishes() {
    const visitedTiles = new Array(this.resolution);
    for (let i = 0; i < this.resolution; i++) {
      visitedTiles[i] = new Array(this.resolution);
      for (let j = 0; j < this.resolution; j++) {
        visitedTiles[i][j] = false;
      }
    }

    visitedTiles[this.finishCoords.i][this.finishCoords.j] = true;
    return [
      ...this.breadthFirstSearch(
        this.finishCoords.i + 1,
        this.finishCoords.j,
        visitedTiles,
      ),
      ...this.breadthFirstSearch(
        this.finishCoords.i - 1,
        this.finishCoords.j,
        visitedTiles,
      ),
      ...this.breadthFirstSearch(
        this.finishCoords.i,
        this.finishCoords.j + 1,
        visitedTiles,
      ),
      ...this.breadthFirstSearch(
        this.finishCoords.i,
        this.finishCoords.j - 1,
        visitedTiles,
      ),
    ];
  }

  updateFinish() {
    const allowedFinishes = this.getAllowedFinishes();
    if (allowedFinishes.length === 0) {
      console.log("no allowed finishes");
      return false;
    }

    if (allowedFinishes.length === 1) {
      this.tiles[allowedFinishes[0].i][allowedFinishes[0].j].type =
        PLATFORM_TYPES.HOLE;
      console.log("only one");
      return false;
    }

    const randIndex = Math.floor(Math.random() * allowedFinishes.length);
    const newI = allowedFinishes[randIndex].i;
    const newJ = allowedFinishes[randIndex].j;

    this.tiles[this.finishCoords.i][this.finishCoords.j].type =
      PLATFORM_TYPES.DEFAULT;
    this.tiles[newI][newJ].type = PLATFORM_TYPES.FINISH;
    this.finishCoords = { i: newI, j: newJ };

    return true;
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
