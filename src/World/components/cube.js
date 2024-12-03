import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(4, 4, 0.5);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({ color: 0x0ffff0 });

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  return cube;
}

export { createCube };
