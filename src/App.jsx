import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin }  from "gsap/ScrollToPlugin";

import LoadingPage   from "./pages/LoadingPage";
import HomePage      from "./pages/HomePage";
import FloatingNav   from "./components/FloatingNav";
import CustomCursor  from "./components/CustomCursor";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const [progress,      setProgress]      = useState(0);
  const [modelLoaded,   setModelLoaded]   = useState(false);
  const [timeProgress,  setTimeProgress]  = useState(0);
  const [imagesLoaded,  setImagesLoaded]  = useState(false);

  /* ── Minimum display time (1.5s) ── */
  useEffect(() => {
    const start    = Date.now();
    const duration = 1500;
    const tick = () => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setTimeProgress(p);
      if (p < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  /* ── Image-load guard ── */
  useEffect(() => {
    const check = () => {
      const imgs = Array.from(document.images);
      if (imgs.length === 0 || imgs.every(i => i.complete)) setImagesLoaded(true);
    };
    const intv = setInterval(check, 100);
    window.addEventListener("load", check);
    return () => { clearInterval(intv); window.removeEventListener("load", check); };
  }, []);

  const effectiveProgress = Math.min(progress, timeProgress, imagesLoaded ? 100 : 99);
  const fullyLoaded = modelLoaded && effectiveProgress >= 100;

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) lenis.scrollTo(value, { immediate: true });
        else return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    if (!fullyLoaded) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, [fullyLoaded]);

  return (
    <>
      <CustomCursor />

      {/* Loading screen */}
      {/* {!fullyLoaded && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
          <LoadingPage progress={effectiveProgress} />
        </div>
      )} */}

      {/* Main page */}
      <div
        style={{
          opacity:         fullyLoaded ? 1 : 0,
          pointerEvents:   fullyLoaded ? "auto" : "none",
          transition:      "opacity 0.9s ease",
        }}
      >
        <FloatingNav />
        <HomePage setProgress={setProgress} setModelLoaded={setModelLoaded} />
      </div>
    </>
  );
}
