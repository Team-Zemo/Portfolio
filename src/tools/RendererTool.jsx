// src/tools/RendererTool.jsx
import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
  useProgress,
} from "@react-three/drei";

/* ---------------------- PROGRESS LISTENER ---------------------- */
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

/* ---------------------- MAIN RENDERER ---------------------- */
export default function RendererTool({
  children,
  onProgress,
  onLoaded
}) {
  return (
    <Canvas
      shadows
      // Use the appropriate camera position for the model
      camera={{ position: [0, 0, 4], fov: 45 }} 
      // Ensure transparency is enabled for the overlay effect
      gl={{ antialias: true, alpha: true }} 
    >
      {/* ⚠️ REMOVED: <color attach="background" args={["#ffffff"]} />
          The white background was removed in the previous fix to allow transparency. */}

      {/* LIGHTS */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
      />

      {/* LOAD MONITOR */}
      <ProgressListener onProgress={onProgress} onLoaded={onLoaded} />

      <Suspense fallback={null}>
        {/* VERY IMPORTANT: USE CHILDREN DIRECTLY */}
        {children}

        <Environment preset="studio" />

        <ContactShadows
          position={[0, -1.4, 0]} // Adjusted for the model
          opacity={0.4}
          blur={2}
          far={2}
        />
      </Suspense>

      {/* FIXED: Using 'enabled={false}' to correctly turn off all controls.
          Alternatively, you can omit the component entirely if you don't need it. */}
      <OrbitControls enabled={false} />
    </Canvas>
  );
}




// // src/tools/RendererTool.jsx
// import React, { Suspense, useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   OrbitControls,
//   ContactShadows,
//   Environment,
//   useProgress,
// } from "@react-three/drei";

// /* ---------------------- PROGRESS LISTENER ---------------------- */
// const ProgressListener = ({ onProgress, onLoaded }) => {
//   const { progress } = useProgress();
//   const calledRef = useRef(false);

//   useEffect(() => {
//     if (onProgress) onProgress(progress);

//     if (progress >= 100 && !calledRef.current) {
//       calledRef.current = true;
//       if (onLoaded) onLoaded();
//     }
//   }, [progress, onProgress, onLoaded]);

//   return null;
// };

// /* ---------------------- MAIN RENDERER ---------------------- */
// export default function RendererTool({
//   children,
//   onProgress,
//   onLoaded
// }) {
//   return (
//     <Canvas
//       shadows
//       camera={{ position: [0, 1.5, 4], fov: 45 }}
//       gl={{ antialias: true }}
//     >
//       {/* BACKGROUND */}
//       <color attach="background" args={["#ffffff"]} />

//       {/* LIGHTS */}
//       <ambientLight intensity={0.5} />
//       <directionalLight
//         position={[5, 5, 5]}
//         intensity={1}
//         castShadow
//       />

//       {/* LOAD MONITOR */}
//       <ProgressListener onProgress={onProgress} onLoaded={onLoaded} />

//       <Suspense fallback={null}>
//         {/* VERY IMPORTANT: USE CHILDREN DIRECTLY */}
//         {children}

//         <Environment preset="studio" />

//         <ContactShadows
//           position={[0, -0.8, 0]}
//           opacity={0.4}
//           blur={1.5}
//           far={1.2}
//         />
//       </Suspense>

//       <OrbitControls enabled={false} />
//     </Canvas>
//   );
// }
