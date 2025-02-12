import { CircleGeometry, Mesh, MeshStandardMaterial } from "three";

function createFinish(finish) {
  const geometry = new CircleGeometry(finish.radius, 16);

  const material = new MeshStandardMaterial({ color: 0x000000 });

  const finishMesh = new Mesh(geometry, material);
  finishMesh.position.set(2, -0.1, 2);

  return finishMesh;
}

export { createFinish };
