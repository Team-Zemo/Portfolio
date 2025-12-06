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
        snap: 1 / (totalPanels - 1),
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <div ref={wrapperRef} className="flex h-full items-center" style={{ width: "max-content" }}>

        {/* -------------------------------------------------------- */}
        {/* PANEL 1 — Light gray */}
        {/* -------------------------------------------------------- */}
        <div className="project-panel w-screen h-full flex items-center justify-center px-20 bg-gray-200">
          <div className="flex items-center gap-20 max-w-7xl w-full">

            {/* LEFT — BIGGER IMAGE */}
            <div className="flex flex-col items-center">
              <div className="rounded-xl overflow-hidden shadow-xl bg-white">
                <img
                  src="/p1.jpg"
                  alt="Project One"
                  className="w-[720px] h-[405px] object-cover"  /* 16:9 but BIGGER */
                />
              </div>
              <h2 className="text-4xl font-bold mt-8 text-gray-900">
                Project One
              </h2>
            </div>

            {/* RIGHT — VERTICAL CYLINDRICAL DESCRIPTION */}
            <div className="bg-white/90  px-10 py-16 h-[420px] w-[280px] 
                            shadow-xl border border-gray-300 flex items-center justify-center">
              <p className="text-lg text-gray-800 leading-relaxed text-center">
                A tall cylindrical description block.  
                Clean, readable, and modern — perfect for minimal portfolio layouts.
              </p>
            </div>

          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* PANEL 2 — Dark gray */}
        {/* -------------------------------------------------------- */}
        <div className="project-panel w-screen h-full flex items-center justify-center px-20 bg-gray-900">
          <div className="flex items-center gap-20 max-w-7xl w-full">

            {/* LEFT — BIG IMAGE */}
            <div className="flex flex-col items-center">
              <div className="rounded-xl overflow-hidden shadow-xl bg-gray-700">
                <img
                  src="/p2.jpg"
                  alt="Project Two"
                  className="w-[720px] h-[405px] object-cover"
                />
              </div>
              <h2 className="text-4xl font-bold mt-8 text-white">
                Project Two
              </h2>
            </div>

            {/* RIGHT — DARK CYLINDER */}
            <div className="bg-gray-700  px-10 py-16 h-[420px] w-[280px]
                            shadow-xl border border-gray-600 flex items-center justify-center">
              <p className="text-lg text-gray-200 leading-relaxed text-center">
                The cylinder gets darker here for contrast.  
                Height dominates width to give that capsule feel.
              </p>
            </div>

          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* PANEL 3 — Light gray */}
        {/* -------------------------------------------------------- */}
        <div className="project-panel w-screen h-full flex items-center justify-center px-20 bg-gray-200">
          <div className="flex items-center gap-20 max-w-7xl w-full">

            {/* LEFT — BIG IMAGE */}
            <div className="flex flex-col items-center">
              <div className="rounded-xl overflow-hidden shadow-xl bg-white">
                <img
                  src="/p3.jpg"
                  alt="Project Three"
                  className="w-[720px] h-[405px] object-cover"
                />
              </div>
              <h2 className="text-4xl font-bold mt-8 text-gray-900">
                Project Three
              </h2>
            </div>

            {/* RIGHT — LIGHT CYLINDER */}
            <div className="bg-white/95 px-10 py-16 h-[420px] w-[280px]
                            shadow-xl border border-gray-300 flex items-center justify-center">
              <p className="text-lg text-gray-800 leading-relaxed text-center">
                Designed to let the image breathe while the text sits in a
                clean vertical capsule container.
              </p>
            </div>

          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* PANEL 4 — Dark gray */}
        {/* -------------------------------------------------------- */}
        <div className="project-panel w-screen h-full flex items-center justify-center px-20 bg-gray-900 text-white">
          <div className="flex items-center gap-20 max-w-7xl w-full">

            {/* LEFT — BIG IMAGE */}
            <div className="flex flex-col items-center">
              <div className="rounded-xl overflow-hidden shadow-xl bg-gray-700">
                <img
                  src="/p4.jpg"
                  alt="Project Four"
                  className="w-[720px] h-[405px] object-cover"
                />
              </div>
              <h2 className="text-4xl font-bold mt-8">
                Project Four
              </h2>
            </div>

            {/* RIGHT — DARK CYLINDER */}
            <div className="bg-gray-700  px-10 py-16 h-[420px] w-[280px]
                            shadow-xl border border-gray-600 flex items-center justify-center">
              <p className="text-lg text-gray-200 leading-relaxed text-center">
                A tall pill-shaped description box that pairs cleanly with the
                dark aesthetic of this final panel.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HorizontalProjects;
