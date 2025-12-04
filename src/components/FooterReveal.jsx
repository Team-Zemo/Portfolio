// src/components/FooterReveal.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterReveal() {
  const footerRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    const section = footerRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",   // footer starts off-screen
        end: "top center",     // footer reaches center
        scrub: 1.2,
      }
    });

    // Footer comes up
    tl.fromTo(
      panel,
      { y: "100%" },
      { y: "0%", ease: "power3.out" }
    );
  }, []);

  return (
    <section
      id="footer-section"
      ref={footerRef}
      className="relative min-h-[120vh] bg-transparent overflow-hidden"
    >
      {/* The panel that rises */}
      <div
        ref={panelRef}
        className="absolute bottom-0 left-0 right-0 h-screen bg-black flex items-center justify-center"
      >
        <div className="text-center text-white space-y-4 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">
            TEAM ZEMO
          </h1>
          <p className="text-gray-300">Precision. Discipline. Excellence.</p>
          <p className="text-gray-500 text-sm mt-8">
            © {new Date().getFullYear()} Team Zemo
          </p>
        </div>
      </div>
    </section>
  );
}
