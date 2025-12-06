// src/components/RedWipeTransition.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RedWipeTransition = () => {
  const panelRef = useRef(null);
  const textRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    const text = textRef.current;
    const wrapper = wrapperRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",      // 🔥 Triggers EXACTLY when TeamReveal unpins
        end: "+=150%",         // 🔥 Full wipe enter + pause + exit
        scrub: 1.2,
        pin: true,
        pinSpacing: false,
      },
    });

    // ENTER WIPE
    tl.fromTo(
      panel,
      { x: "-100%" },
      { x: "0%", duration: 1, ease: "power3.inOut" }
    );

    // TEXT REVEAL
    tl.fromTo(
      text,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.5"
    );

    // EXIT WIPE
    tl.to(panel, {
      x: "100%",
      duration: 1.1,
      ease: "power3.inOut",
    });

  }, []);

  return (
    <section
      ref={wrapperRef}
      id="red-wipe"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div
        ref={panelRef}
        className="absolute inset-0 bg-red-600 flex items-center justify-center z-30"
      >
        <h1
          ref={textRef}
          className="text-white text-6xl md:text-9xl font-extrabold tracking-widest"
        >
          TEAM ZEMO
        </h1>
      </div>
    </section>
  );
};

export default RedWipeTransition;
