import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"; 

/**
 * Team Zemo 3D Model Component.
 * * It manages the model's state, mouse interaction (subtle tilt),
 * and scroll-driven rotation.
 * @param {number} rotationY - The exact Y-axis rotation angle (in radians) calculated by ScrollTrigger.
 */
export default function TeamZemoModel({ rotationY, ...props }) {
    // Load the 3D model (GLTF)
    // NOTE: This file expects the model 'team_zemo.glb' to be in the public directory.
    const { scene } = useGLTF("/team_zemo.glb");
    const ref = useRef();

    useFrame((state, delta) => {
        if (!ref.current) return;

        // R3F automatically provides mouse coordinates (normalized from -1 to 1)
        const { y } = state.mouse;

        // --- MOUSE FOLLOW (X-axis tilt for subtle up/down look) ---
        // Lerp (linear interpolation) smooths the movement
        const targetX = -y * 0.1; 
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.1);
        
        // --- SCROLL-DRIVEN Y-ROTATION (The fix) ---
        // CRITICAL: Set the Y rotation to the exact value calculated by the HomePage component (based on scroll progress)
        // This ensures precisely one 360-degree rotation (0 to 2*PI radians) during the transition.
        ref.current.rotation.y = rotationY;
    });

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={1.8}
            rotation={[0, 0, 0]} 
            position={[0, -0.9, 0]}
            {...props}
        />
    );
}

// Preload the model for faster loading
useGLTF.preload("/team_zemo.glb");