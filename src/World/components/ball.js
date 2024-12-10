import { SphereGeometry, Mesh, MeshStandardMaterial } from "three";

function createBall() {
  const geometry = new SphereGeometry(0.2, 16, 16);

  const material = new MeshStandardMaterial({ color: 0xffff00 });

  const ball = new Mesh(geometry, material);
  ball.position.set(0, 0, 0);

  return ball;
}

export { createBall };
