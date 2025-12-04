import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Universal safe polygon formatter
const makePolygon = (p) => {
  const val = Math.round(p);
  return `polygon(0% 0%, ${val}% 0%, ${val}% 100%, 0% 100%)`;
};

const LoadingPage = ({ progress: progressProp }) => {
  const fillRef = useRef(null);
  const [localProgress, setLocalProgress] = useState(
    typeof progressProp === "number" ? progressProp : 0
  );

  useEffect(() => {
    // If external progress is provided — directly mirror it.
    if (typeof progressProp === "number") {
      setLocalProgress(progressProp);
      return;
    }

    // INTERNAL ANIMATION (no external progress)
    const animObj = { p: 0 };

    const tween = gsap.to(animObj, {
      p: 100,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        const safeVal = Math.round(animObj.p);
        setLocalProgress(safeVal);

        if (fillRef.current) {
          fillRef.current.style.clipPath = makePolygon(safeVal);
        }
      },
    });

    // Initial clipPath setup
    if (fillRef.current) {
      fillRef.current.style.clipPath = makePolygon(0);
    }

    return () => tween.kill();
  }, [progressProp]);

  // Mirror localProgress → clipPath (external progress case)
  useEffect(() => {
    if (fillRef.current) {
      fillRef.current.style.clipPath = makePolygon(localProgress);
    }
  }, [localProgress]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col bg-transparent select-none">
      <div className="relative text-center leading-tight tracking-tight">
        
        {/* Outline text */}
        <div
          className="text-5xl md:text-[9rem] font-extrabold hero-text"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px #0f172a",
          }}
        >
          Team Zemo
        </div>

        {/* Clipped fill text */}
        <div
          ref={fillRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ clipPath: makePolygon(0) }}
        >
          <div className="text-5xl md:text-[9rem] font-extrabold text-slate-900">
            Team Zemo
          </div>
        </div>
      </div>

      {/* Progress counter */}
      <div className="mt-4 text-lg">{Math.round(localProgress)}%</div>
    </div>
  );
};

export default LoadingPage;
