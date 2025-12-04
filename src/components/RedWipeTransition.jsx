// src/components/RedWipeTransition.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RedWipeTransition = () => {
  const panelRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    const text = textRef.current;

    if (!panel || !text) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#red-wipe",
        start: "top 80%",
        end: "top -40%",
        scrub: 1.2,
        pin: true,
      },
    });

    // PANEL ENTERS
    tl.fromTo(
      panel,
      { x: "-100%" },
      {
        x: "0%",
        duration: 1.3,
        ease: "power3.inOut",
      }
    );

    // TEXT REVEALS
    tl.fromTo(
      text,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // PANEL EXITS
    tl.to(panel, {
      x: "100%",
      duration: 1.2,
      ease: "power3.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="red-wipe"
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      {/* RED PANEL */}
      <div
        ref={panelRef}
        className="absolute inset-0 bg-red-600 flex items-center justify-center z-30"
      >
        {/* TEXT */}
        <h1
          ref={textRef}
          className="text-white text-6xl md:text-9xl font-extrabold tracking-widest"
          style={{ letterSpacing: "0.1em" }}
        >
          TEAM ZEMO
        </h1>
      </div>
    </section>
  );
};

export default RedWipeTransition;



