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
  const [timeProgress, setTimeProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 1. Artificial Delay (Min 1.5s)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 1500;

    const updateTimeProgress = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, (elapsed / duration) * 100);
      setTimeProgress(p);

      if (p < 100) {
        requestAnimationFrame(updateTimeProgress);
      }
    };
    requestAnimationFrame(updateTimeProgress);
  }, []);

  // 2. Check for all images loaded
  useEffect(() => {
    const checkImages = () => {
      const images = Array.from(document.images);
      // If no images, we consider them loaded.
      // We also check if every image is complete.
      const allLoaded =
        images.length === 0 || images.every((img) => img.complete);

      if (allLoaded) {
        setImagesLoaded(true);
      }
    };

    // Check periodically
    const interval = setInterval(checkImages, 100);

    // Also check on window load event
    window.addEventListener("load", checkImages);

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", checkImages);
    };
  }, []);

  // Calculate effective progress:
  // It is the MINIMUM of:
  // - Real Model Progress
  // - Time Progress (enforces 1.5s duration)
  // - Image Loading Status (caps at 99% until images are done)
  const effectiveProgress = Math.min(
    progress,
    timeProgress,
    imagesLoaded ? 100 : 99
  );

  // Determine if loading is complete
  // We use effectiveProgress >= 100 which implies:
  // model is done (progress=100), time is done (1.5s), images are done (imagesLoaded=true)
  const fullyLoaded = modelLoaded && effectiveProgress >= 100;

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
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <LoadingPage progress={effectiveProgress} />
        </div>
      )}

      <div
        className={
          !fullyLoaded
            ? "opacity-0 pointer-events-none"
            : "opacity-100 transition-opacity duration-1000"
        }
      >
        <HomePage setProgress={setProgress} setModelLoaded={setModelLoaded} />
      </div>
    </>
  );
}
