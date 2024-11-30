import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import * as THREE from "three";
import { useEffect, useRef } from "react";

function App() {
  const containerRef = useRef(null);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
      containerRef.current.addEventListener("mousemove", (event) => {
        cube.rotation.y = event.clientX / window.innerWidth - window.innerWidth;
        cube.rotation.x =
          event.clientY / window.innerHeight + window.innerHeight;
        renderer.render(scene, camera);
      });
    }
  });

  return (
    <>
      <div ref={containerRef} />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
