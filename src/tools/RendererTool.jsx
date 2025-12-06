import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
  useProgress,
} from "@react-three/drei";

const ProgressListener = ({ onProgress, onLoaded }) => {
  const { progress } = useProgress();
  const calledRef = useRef(false);

  useEffect(() => {
    if (onProgress) onProgress(progress);
    if (progress >= 100 && !calledRef.current) {
      calledRef.current = true;
      if (onLoaded) onLoaded();
    }
  }, [progress, onProgress, onLoaded]);

  return null;
};

function StableCanvasSize() {
  const { gl } = useThree();
  useEffect(() => gl.setPixelRatio(1), [gl]);
  return null;
}

export default function RendererTool({ children, onProgress, onLoaded }) {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1]}
      shadows
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <StableCanvasSize />

      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 3]} intensity={0.5} castShadow />

      <ProgressListener onProgress={onProgress} onLoaded={onLoaded} />

      <Suspense fallback={null}>
        {children}

        <Environment preset="studio" />

        <ContactShadows
          opacity={0.4}
          blur={3}
          far={10}
          scale={10}
          position={[0, -1.2, 0]}
        />
      </Suspense>

      <OrbitControls enabled={false} />
    </Canvas>
  );
}
