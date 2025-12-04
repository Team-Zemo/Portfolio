// src/App.jsx
import React, { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [progress, setProgress] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Determine if loading is complete
  const fullyLoaded = modelLoaded && progress >= 100;

  // LENIS SMOOTH SCROLL
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smooth: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "fixed",
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Stop scrolling while loading
    if (!fullyLoaded) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "auto";
    }

    return () => lenis.destroy();
  }, [fullyLoaded]); // Add fullyLoaded to dependency array to toggle scroll

  return (
    <>
      {/* 1. LOADING OVERLAY 
         We render this on top using z-index/fixed positioning.
         We remove it from DOM only when fullyLoaded is true.
      */}
      {!fullyLoaded && (
        <div 
          className="fixed inset-0 z-9999 bg-white"
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <LoadingPage progress={progress} />
        </div>
      )}

      {/* 2. HOMEPAGE (MUST RENDER ALWAYS)
         This must be rendered so the <Canvas> inside it initializes 
         and starts the useProgress hook.
      */}
      <div className={!fullyLoaded ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-1000"}>
        <HomePage 
          setProgress={setProgress} 
          setModelLoaded={setModelLoaded}
        />
      </div>
    </>
  );
}