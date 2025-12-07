// src/components/RedWipeTransition.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RedWipeTransition = () => {
  const panelRef = useRef(null);
  const wrapperRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const panel = panelRef.current;
    const wrapper = wrapperRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "+=150%",
        scrub: 1.2,
        pin: true,
        pinSpacing: false,
      },
    });

    // RED PANEL ENTER
    tl.fromTo(
      panel,
      { x: "-100%" },
      { x: "0%", duration: 1, ease: "power3.inOut" }
    );

    // 🔥 DUST TRAIL LETTER REVEAL
    tl.fromTo(
      lettersRef.current,
      {
        y: 80,
        opacity: 0,
        scaleY: 0.3,
        transformOrigin: "center bottom",
        filter: "blur(6px)",
      },
      {
        y: 0,
        opacity: 1,
        scaleY: 1,
        filter: "blur(0px)",
        duration: 0.75,
        ease: "back.out(1.7)",
        stagger: 0.07,
      },
      "-=0.3"
    );

    // EXIT WIPE
    tl.to(panel, {
      x: "100%",
      duration: 1.1,
      ease: "power3.inOut",
    });
  }, []);

  const text = "TEAM ZEMO";

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
        <h1 className="text-white text-6xl md:text-9xl font-extrabold tracking-widest flex gap-1">
          {text.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
};

export default RedWipeTransition;
