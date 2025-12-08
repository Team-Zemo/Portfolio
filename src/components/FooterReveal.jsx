// src/components/FooterReveal.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterReveal() {
  const footerRef = useRef(null);
  const panelRef = useRef(null);
  const textRef = useRef(null);

  // Rising panel
  useEffect(() => {
    const panel = panelRef.current;
    const section = footerRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
      },
    });

    tl.fromTo(panel, { y: "100%" }, { y: "0%", ease: "power3.out" });
  }, []);

  // Text animation with responsive behavior
  useEffect(() => {
    const section = footerRef.current;
    const text = textRef.current;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top center",
            scrub: 1.2,
          },
        });

        if (isDesktop) {
          // Desktop: Slide from center to left to make room for the model
          tl.fromTo(
            text,
            { x: 0, opacity: 0 },
            { x: "-20vw", opacity: 1, ease: "power3.out" }
          );
        } else {
          // Mobile: Simple fade up, stay centered
          tl.fromTo(
            text,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, ease: "power3.out" }
          );
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="footer-section"
      ref={footerRef}
      className="relative min-h-[120vh] bg-transparent overflow-hidden"
    >
      <div
        ref={panelRef}
        className="absolute bottom-0 left-0 right-0 h-screen bg-black flex items-center justify-center"
      >
        <div ref={textRef} className="text-center text-white space-y-4 px-6">
          <h1 className="text-6xl md:text-9xl font-extrabold tracking-wide">
            TEAM ZEMO
          </h1>

          <p className="text-xl md:text-3xl text-gray-300 font-light">
            Precision. Discipline. Excellence.
          </p>

          <a
            href="https://github.com/Team-Zemo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            <p className="text-sm md:text-base">
              © {new Date().getFullYear()} Team Zemo
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
