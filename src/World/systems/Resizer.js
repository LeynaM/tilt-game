class Resizer {
  constructor(container, camera, renderer) {
    camera.aspect = container.clientWidth / container.clientHeight;

    camera.updateProjectionMatrix();
    // next, set the renderer to the same size as our container element
    renderer.setSize(container.clientWidth, container.clientHeight);

    // finally, set the pixel ratio to ensure our scene will look good on mobile devices
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}

export { Resizer };
