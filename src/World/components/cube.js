import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(6, 6, 0.5);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({ color: 0x0ffff0 });

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);
  //cube.rotation.set(-0.5, -0.1, 0.8);
  // container.addEventListener("mousemove", (event) => {
  //   cube.rotation.y =
  //     ((event.clientX / container.clientWidth) * Math.PI) / 2 - Math.PI / 4;
  //   cube.rotation.x =
  //     ((event.clientY / container.clientHeight) * Math.PI) / 2 - Math.PI / 6;
  //   renderer.render(scene, camera);
  // });

  return cube;
}

export { createCube };
