import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WipeTransition() {
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;

    // Ensure ScrollTrigger instance is only created once
    if (!wrapper) return;

    // Kill any existing ScrollTriggers on the element to prevent duplicates
    ScrollTrigger.getById("wipe-transition-tl")?.kill();

    gsap
      .timeline({
        scrollTrigger: {
          id: "wipe-transition-tl",
          trigger: wrapper,
          start: "top top",
          end: "+=250%", // Increased duration by pinning and extending scroll distance
          scrub: 1,
          pin: true,
        },
      })
      .fromTo(
        panel,
        { x: "100%" },
        {
          x: "0%",
          ease: "none", // Linear for better control with scrub
          duration: 1,
        }
      )
      .fromTo(
        content,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power2.out",
          duration: 0.5,
        },
        "-=0.5"
      )
      .to(
        panel,
        {
          x: "-100%",
          ease: "none",
          duration: 1,
        },
        "+=0.5"
      ); // Hold for a bit before wiping out
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/nextBG.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* WIPE PANEL */}
      <div ref={panelRef} className="absolute inset-0 bg-gray-900 z-20" />

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 text-white z-30"
      >
        <h1 className="text-6xl font-extrabold">Meet The Team</h1>
        <p className="text-xl mt-6 max-w-2xl">
          Discipline. Precision. Dominance. This is where Team Zemo truly
          begins.
        </p>
      </div>
    </section>
  );
}
