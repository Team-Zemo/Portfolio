import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Omninet Core",
    subtitle: "Team Zemo / Infrastructure Layer",
    tech: "Spring Boot • Modular Runtime • AI Voice Stack",
    description: [
      "Speech-enabled backend architecture for realtime AI voice workflows.",
      "Adaptive modular runtime for AI pipelines and multi-agent flows.",
      "Hierarchical NoteManager workflow system for advanced task routing.",
      "AI chat engine with persistent contextual memory threads.",
    ],
    links: [
      { label: "Backend Repo", url: "https://github.com/Team-Zemo/omninet-core" },
      { label: "Frontend Repo", url: "https://github.com/Team-Zemo/omninet-security-web" },
    ],
  },

  {
    id: 2,
    title: "Aeigies Core",
    subtitle: "AI Misuse Detection / Security Engine",
    tech: "Realtime Defense • Pattern Rules • Enforcement Layer",
    description: [
      "High-speed prompt misuse detection with multilayer auditing.",
      "Attack signature mapping and realtime prompt pattern analysis.",
      "Dynamic policy enforcement engine with hardened rule responses.",
    ],
    links: [
      { label: "Backend Repo", url: "https://github.com/Team-Zemo/aeigies-core" },
      { label: "Frontend Repo", url: "https://github.com/Team-Zemo/Aeigis-Frontend" },
    ],
  },

  {
    id: 3,
    title: "Swayog",
    subtitle: "Pose Engine / Live CV Feedback",
    tech: "FastAPI • Realtime CV • Socket Streams",
    description: [
      "AI-driven posture analysis engine designed for realtime corrective feedback.",
      "Advanced OpenCV + keypoint estimation pipeline tuned for stability and accuracy.",
      "Built for fitness apps, physiotherapy, motion training, and interactive movement coaching.",
    ],
    links: [
      { label: "Project Repo", url: "https://github.com/Team-Zemo/Swayog" },
    ],
  },
];

const HorizontalProjects = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    const panels = gsap.utils.toArray(".project-panel");
    const totalPanels = panels.length;
    const totalWidth = (totalPanels - 1) * window.innerWidth;

    ScrollTrigger.getAll().forEach(t => t.kill());

    gsap.to(wrapper, {
      x: () => -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=" + totalWidth,
        snap: 1 / (totalPanels - 1),
        invalidateOnRefresh: true,
      },
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0d12] text-white"
    >
      <div
        ref={wrapperRef}
        className="flex h-screen"
        style={{ width: "max-content" }}
      >

        {projects.map((p) => (
          <div
            key={p.id}
            className="
              project-panel 
              w-screen 
              h-screen 
              flex items-center 
              justify-center 
              px-8 md:px-20
            "
          >

            {/* DESKTOP */}
            <div className="hidden md:grid md:grid-cols-12 md:gap-16 max-w-6xl w-full">

              {/* LEFT */}
              <div className="col-span-8 flex flex-col justify-center space-y-6">
                <p className="text-blue-300 text-xs uppercase tracking-widest">{p.subtitle}</p>
                <h2 className="text-5xl font-bold">{p.title}</h2>
                <p className="text-gray-300 text-base">{p.tech}</p>
                <div className="w-full h-[1px] bg-white/10 my-3" />
                <div className="space-y-3">
                  {p.description.map((line, i) => (
                    <p key={i} className="text-gray-300 text-lg leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="col-span-4 flex flex-col justify-center">
                <div className="bg-black/40 border border-blue-400/20 p-8 rounded-2xl shadow-xl space-y-4">
                  <h3 className="text-blue-300 text-sm uppercase tracking-wider">Repositories</h3>
                  <div className="flex flex-col gap-4">
                    {p.links.map((lnk, i) => (
                      <a
                        key={i}
                        href={lnk.url}
                        target="_blank"
                        className="
                          bg-black/40 
                          border border-blue-300/30 
                          hover:bg-black/60 
                          transition-all 
                          rounded-full 
                          px-6 py-3 
                          flex items-center justify-between
                        "
                      >
                        {lnk.label}
                        <svg width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2'>
                          <line x1='7' y1='17' x2='17' y2='7' />
                          <polyline points='7 7 17 7 17 17' />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* MOBILE (LEFT-ALIGNED, FIXED TOP SPACING) */}
            <div className="md:hidden max-w-xl w-full px-4 pt-16 space-y-8 text-left">

              <p className="text-[11px] tracking-widest text-blue-300 uppercase">{p.subtitle}</p>

              <h2 className="text-4xl font-extrabold leading-tight">{p.title}</h2>

              <p className="text-gray-300 text-sm">{p.tech}</p>

              <div className="w-full h-[1px] bg-white/10" />

              <div className="space-y-4">
                {p.description.map((line, i) => (
                  <p key={i} className="text-gray-300 text-[15px] leading-[1.6]">{line}</p>
                ))}
              </div>

              <div className="flex flex-col gap-4 pt-4 pb-10">
                {p.links.map((lnk, i) => (
                  <a
                    key={i}
                    href={lnk.url}
                    target="_blank"
                    className="
                      bg-black/50 
                      border border-blue-400/40 
                      hover:bg-black/60 
                      rounded-full 
                      px-6 py-3 
                      text-sm 
                      flex items-center justify-between
                      active:scale-[0.97]
                    "
                  >
                    {lnk.label}
                    <svg width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2'>
                      <line x1='7' y1='17' x2='17' y2='7' />
                      <polyline points='7 7 17 7 17 17' />
                    </svg>
                  </a>
                ))}
              </div>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default HorizontalProjects;
