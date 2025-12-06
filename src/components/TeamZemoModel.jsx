import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function TeamZemoModel({ controlRef }) {
  const { scene } = useGLTF("/team_zemo.glb");
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const ctrl = controlRef.current;

    // Position from GSAP
    ref.current.position.set(ctrl.x, ctrl.y, ctrl.z);

    // Scaling from GSAP
    ref.current.scale.set(ctrl.scale, ctrl.scale, ctrl.scale);

    // Rotation from GSAP
    ref.current.rotation.y = ctrl.rotationY;

    // Subtle mouse tilt
    const tiltX = -state.mouse.y * 0.15;
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      tiltX,
      0.1
    );
  });

  return (
    <primitive
      ref={ref}
      object={scene}
    />
  );
}

useGLTF.preload("/team_zemo.glb");
