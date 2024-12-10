class TiltControls {
  constructor(container, tiltAngles) {
    container.addEventListener("mousemove", (event) => {
      tiltAngles.x =
        ((event.clientY / container.clientHeight) * Math.PI) / 2 - Math.PI / 4;
      tiltAngles.z =
        ((event.clientX / container.clientWidth) * Math.PI) / 2 - Math.PI / 4;
    });
  }
}

export { TiltControls };
