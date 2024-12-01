import * as THREE from "three";

const container = document.getElementById("container");
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000,
);

const resizeObserver = new ResizeObserver((entries) => {
  console.log(container.clientWidth, container.clientHeight);
  renderer.setSize(container.clientWidth, container.clientHeight);
  camera.aspect = container.clientWidth / container.clientHeight;
  renderer.render(scene, camera);
});
resizeObserver.observe(container);

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(4, 4, 0.5);
const material = new THREE.MeshStandardMaterial({ color: 0x0ffff0 });
material.roughness = 0.5;
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 3;
camera.position.y = -3;
camera.rotation.x += 0.8;

renderer.render(scene, camera);

container.appendChild(renderer.domElement);
container.addEventListener("mousemove", (event) => {
  cube.rotation.y =
    ((event.clientX / container.clientWidth) * Math.PI) / 2 - Math.PI / 4;
  cube.rotation.x =
    ((event.clientY / container.clientHeight) * Math.PI) / 2 - Math.PI / 4;
  renderer.render(scene, camera);
});
