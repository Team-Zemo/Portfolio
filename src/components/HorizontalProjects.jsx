import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// PROJECT DATA (unchanged)
const projects = [
  {
    id: 1,
    title: "Omninet Core",
    subtitle: "Team Zemo / Infrastructure Layer",
    tech: "Spring Boot • Modular Runtime • AI Voice Stack",
    description: [
      "Speech-enabled backend architecture.",
      "Adaptive modular runtime for AI pipelines.",
      "Hierarchical NoteManager workflow system.",
      "AI chat with memory threads."
    ],
    links: [
      { label: "Backend Repo", url: "https://github.com/Team-Zemo/omninet-core" },
      { label: "Frontend Repo", url: "https://github.com/Team-Zemo/omninet-security-web" }
    ],
  },
  {
    id: 2,
    title: "Aeigies Core",
    subtitle: "AI Misuse Detection / Security Engine",
    tech: "Realtime Defense • Pattern Rules • Enforcement Layer",
    description: [
      "Prompt misuse detection + leakage prevention.",
      "Attack signature mapping.",
      "Policy enforcement with auditing."
    ],
    links: [
      { label: "Backend Repo", url: "https://github.com/Team-Zemo/aeigies-core" },
      { label: "Frontend Repo", url: "https://github.com/Team-Zemo/Aeigis-Frontend" }
    ],
  },
  {
    id: 3,
    title: "Swayog",
    subtitle: "Pose Engine / Live CV Feedback",
    tech: "FastAPI • Realtime CV • Socket Streams",
    description: [
      "ML posture detection.",
      "Live webcam correction.",
      "Low-latency socket feedback pipeline."
    ],
    links: [
      { label: "Project Repo", url: "https://github.com/Team-Zemo/Swayog" }
    ],
  }
];

const HorizontalProjects = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    const totalPanels = projects.length;
    const scrollWidth = (totalPanels - 1) * window.innerWidth;

    // horizontal scroll
    const mainScroll = gsap.to(wrapper, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: "+=" + scrollWidth,
        snap: 1 / (totalPanels - 1),
      },
    });

    // Clean slide-in for each panel
    gsap.utils.toArray(".project-panel").forEach((panel) => {
      gsap.fromTo(
        panel,
        { opacity: 0.3, x: 120 },
        {
          opacity: 1,
          x: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: mainScroll,
            start: "left center",
            end: "right center",
            scrub: true,
          },
        }
      );
    });

    // Subtitle animation from the right
    gsap.utils.toArray(".subtitle-anim").forEach((sub) => {
      gsap.fromTo(
        sub,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          ease: "power2.out",
          duration: 1,
          scrollTrigger: {
            trigger: sub,
            containerAnimation: mainScroll,
            start: "left center",
            end: "right center",
            scrub: true,
          },
        }
      );
    });

    // Background darkening when fully centered
    gsap.utils.toArray(".project-panel").forEach((panel) => {
      gsap.fromTo(
        panel,
        { backgroundColor: "#0a0d12" },
        {
          backgroundColor: "#111827",
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: mainScroll,
            start: "center center",
            end: "center center",
            scrub: true,
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((s) => s.kill());
  }, []);

  return (
    <section
      id="horizontal-projects-start"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden text-white"
    >
      <div
        ref={wrapperRef}
        className="flex h-full"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((p, i) => (
          <div
            key={i}
            className="project-panel w-screen h-full flex items-center justify-center px-20"
            style={{ backgroundColor: "#0a0d12" }}
          >
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-16">

              {/* LEFT SIDE */}
              <div className="left-block md:col-span-8 space-y-8">

                <span className="subtitle-anim text-xs tracking-widest text-blue-300 uppercase">
                  {p.subtitle}
                </span>

                <h2 className="text-6xl font-semibold tracking-tight">{p.title}</h2>

                <p className="text-sm text-gray-300">{p.tech}</p>

                <div className="space-y-4">
                  {p.description.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-blue-300/70"></span>
                      <p className="text-lg text-gray-300">{line}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="right-block md:col-span-4">
                <div className="bg-black/50 p-8 rounded-lg border border-blue-400/20 shadow-xl">
                  <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-4">
                    Repositories
                  </h3>

                  <div className="flex flex-col gap-4">
                    {p.links.map((l, idx) => (
                      <a
                        key={idx}
                        href={l.url}
                        target="_blank"
                        className="group flex justify-between py-3 px-4 bg-black/40 hover:bg-black/60 border border-blue-400/20 hover:border-blue-300/40 rounded transition-all"
                      >
                        <span className="text-gray-300 group-hover:text-white">{l.label}</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-300 group-hover:text-blue-200"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalProjects;
