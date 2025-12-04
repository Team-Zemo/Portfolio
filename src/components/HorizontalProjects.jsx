import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalProjects = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    const panels = gsap.utils.toArray(".project-panel");
    const totalPanels = panels.length;
    const totalScrollWidth = (totalPanels - 1) * window.innerWidth;

    gsap.to(wrapper, {
      x: () => -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=" + totalScrollWidth,

        // ⭐ THE SNAP MAGIC
        snap: 1 / (totalPanels - 1),
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-white"
    >
      <div
        ref={wrapperRef}
        className="flex h-full items-center"
        style={{ width: "max-content" }}
      >
        <div className="project-panel w-screen h-full flex items-center justify-center bg-gray-100 text-4xl font-bold">
          Project One
        </div>

        <div className="project-panel w-screen h-full flex items-center justify-center bg-gray-200 text-4xl font-bold">
          Project Two
        </div>

        <div className="project-panel w-screen h-full flex items-center justify-center bg-gray-300 text-4xl font-bold">
          Project Three
        </div>

        <div className="project-panel w-screen h-full flex items-center justify-center bg-gray-400 text-4xl font-bold text-white">
          Project Four
        </div>
      </div>
    </section>
  );
};

export default HorizontalProjects;


