class TiltControls {
  constructor(container, cube) {
    container.addEventListener("mousemove", (event) => {
      cube.rotation.x =
        ((event.clientY / container.clientHeight) * Math.PI) / 2 - Math.PI / 6;
      cube.rotation.y =
        ((event.clientX / container.clientWidth) * Math.PI) / 2 - Math.PI / 4;

      this.onTilt();
    });
  }

  onTilt() {}
}

export { TiltControls };
