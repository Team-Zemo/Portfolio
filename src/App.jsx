
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

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1500;

    const updateTimeProgress = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, (elapsed / duration) * 100);
      setTimeProgress(p);

      if (p < 100) requestAnimationFrame(updateTimeProgress);
    };

    requestAnimationFrame(updateTimeProgress);
  }, []);

  useEffect(() => {
    const checkImages = () => {
      const images = Array.from(document.images);
      const allLoaded =
        images.length === 0 || images.every((img) => img.complete);

      if (allLoaded) setImagesLoaded(true);
    };

    const interval = setInterval(checkImages, 100);
    window.addEventListener("load", checkImages);

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", checkImages);
    };
  }, []);

  const effectiveProgress = Math.min(
    progress,
    timeProgress,
    imagesLoaded ? 100 : 99
  );

  const fullyLoaded = modelLoaded && effectiveProgress >= 100;

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smooth: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        } else {
          return lenis.scroll;
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    if (!fullyLoaded) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "auto";
    }

    return () => {
      lenis.destroy();
    };
  }, [fullyLoaded]);

  return (
    <>
      {!fullyLoaded && (
        <div className="fixed inset-0 z-9999 bg-white">
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

