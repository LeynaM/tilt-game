import { Vector3 } from "three";

export function positionOnPlaneTo3D(positionOnPlane, tiltAngles) {
  const x = positionOnPlane.x * Math.cos(tiltAngles.z);

  const y =
    positionOnPlane.x * Math.sin(tiltAngles.z) * Math.cos(tiltAngles.x) -
    positionOnPlane.y * Math.sin(tiltAngles.x);

  const z =
    positionOnPlane.x * Math.sin(tiltAngles.x) * Math.sin(tiltAngles.z) +
    positionOnPlane.y * Math.cos(tiltAngles.x);

  return new Vector3(x, y, z);
}
