import { Vector3 } from "three";

export function positionOnPlaneTo3D(positionOnPlane, tiltAngles) {
  const x =
    positionOnPlane.x * Math.cos(tiltAngles.z) -
    positionOnPlane.z * Math.sin(tiltAngles.z);

  const y =
    positionOnPlane.x * Math.sin(tiltAngles.z) * Math.cos(tiltAngles.x) +
    positionOnPlane.z * Math.cos(tiltAngles.z) * Math.cos(tiltAngles.x) -
    positionOnPlane.y * Math.sin(tiltAngles.x);

  const z =
    positionOnPlane.x * Math.sin(tiltAngles.x) * Math.sin(tiltAngles.z) +
    positionOnPlane.z * Math.cos(tiltAngles.z) * Math.sin(tiltAngles.x) +
    positionOnPlane.y * Math.cos(tiltAngles.x);

  return new Vector3(x, y, z);
}
