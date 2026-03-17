import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Placement Portal",
    subtitle: "Campus Drive Coordination Platform",
    image: "/projects/first.png",
    tech: "Student Workflow • Recruiter Access • Drive Tracking",
    description: [
      "Unified placement workflow for students, coordinators, and hiring teams.",
      "Centralized job postings, applications, and drive schedule management.",
      "Built to streamline campus recruitment and reduce manual coordination overhead.",
    ],
    links: [
      {
        label: "Live Project",
        url: "https://cdc.acropolis.teamzemo.tech/",
      },
    ],
  },

  {
    id: 2,
    title: "Aeigies Core",
    subtitle: "AI Misuse Detection / Security Engine",
    image: "/projects/second.png",
    tech: "Realtime Defense • Pattern Rules • Enforcement Layer",
    description: [
      "High-speed prompt misuse detection with multilayer auditing.",
      "Attack signature mapping and realtime prompt pattern analysis.",
      "Dynamic policy enforcement engine with hardened rule responses.",
    ],
    links: [
      {
        label: "Backend Repo",
        url: "https://github.com/Team-Zemo/aeigies-core",
      },
      {
        label: "Frontend Repo",
        url: "https://github.com/Team-Zemo/Aeigis-Frontend",
      },
    ],
  },

  {
    id: 3,
    title: "Swayog",
    subtitle: "Pose Engine / Live CV Feedback",
    image: "/projects/third.png",
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
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    gsap.set(frame, {
      y: 42,
      borderRadius: 30,
    });

    const smoothTween = gsap.to(frame, {
      y: 0,
      borderRadius: 22,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        end: "bottom 18%",
        scrub: 0.9,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      smoothTween.kill();
    };
  }, []);

  const goToSlide = (index) => {
    const safeIndex = Math.min(Math.max(index, 0), projects.length - 1);
    setActiveIndex(safeIndex);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) =>
      prev === projects.length - 1 ? projects.length - 1 : prev + 1,
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[rgba(255,190,210,0.55)] py-8 text-[#19261a] md:py-12"
    >
      <div
        ref={frameRef}
        className="mx-auto w-[95vw] max-w-[1650px] overflow-hidden rounded-[1.35rem] bg-[#fcf7ec] md:w-[96vw] md:rounded-[1.8rem]"
      >
        <div className="mx-auto flex  w-full max-w-[1600px] flex-col px-4 pt-5 pb-6 md:min-h-screen md:px-10 md:pt-8 md:pb-10">
          <div className="mb-4 md:mb-6">
            <h2 className="mt-2 text-[2.1rem] font-primary font-semibold leading-[0.95] text-[#000000] md:text-[5rem] lg:text-[6rem]">
              Digital Experiences
            </h2>
          </div>

          <div className="flex flex-1 items-center justify-center py-2 md:py-3">
            <div className="relative h-[76svh] w-full max-w-[1300px] overflow-hidden rounded-[1.3rem] bg-[#f8f2e5] shadow-[0_20px_60px_rgba(60,48,22,0.16)] md:h-[70vh] md:rounded-[1.75rem]">
              {projects.map((project, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <article
                    key={project.id}
                    className={`absolute inset-0 transition-all duration-500 ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-8 opacity-0"
                    }`}
                  >
                    <div className="grid h-full grid-cols-1 md:grid-cols-12">
                      <div className="relative h-[29svh] md:col-span-7 md:h-full">
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0c140d]/18 via-transparent to-transparent" />
                      </div>

                      <div className="flex h-full flex-col bg-[#f8f2e5] p-4 pb-20 md:col-span-5 md:p-8 md:pb-8 lg:p-10">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#3e5f39] md:text-xs">
                          {project.subtitle}
                        </p>

                        <h3 className="mt-2 text-2xl font-primary leading-tight text-[#122111] md:text-5xl">
                          {project.title}
                        </h3>

                        <p className="mt-3 text-sm font-medium text-[#365133] md:text-base">
                          {project.tech}
                        </p>

                        <div className="my-4 h-px bg-[#231008] md:my-5" />

                        <div className="flex-1 space-y-2 overflow-y-auto pr-1 text-[12px] leading-normal text-[#294028] md:space-y-2.5 md:text-[15px]">
                          {project.description.map((line, lineIndex) => (
                            <p key={lineIndex}>{line}</p>
                          ))}
                        </div>

                        <div className="pt-4 md:pt-5">
                          <div className="flex flex-wrap gap-2.5">
                            {project.links.map((lnk, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={lnk.url}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-[#ac9b6f] bg-[#ecdebc] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#263a24] transition-colors hover:bg-[#e5d3aa] md:text-[11px]"
                              >
                                {lnk.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-3 md:bottom-5 md:px-5">
                <div className="flex gap-2">
                  {projects.map((project, idx) => (
                    <button
                      key={project.id}
                      type="button"
                      aria-label={`Go to ${project.title}`}
                      onClick={() => goToSlide(idx)}
                      className={`h-2.5 rounded-full transition-all md:h-3 ${
                        idx === activeIndex
                          ? "w-8 bg-[#263f24]"
                          : "w-3 bg-[#8ea482] hover:bg-[#6f8768]"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous project"
                    onClick={goPrev}
                    disabled={activeIndex === 0}
                    className="h-10 w-10 rounded-full border border-[#9aae8f] bg-[#f7efd8] text-lg font-bold text-[#244023] transition-colors hover:bg-[#ecdfbd] disabled:cursor-not-allowed disabled:opacity-45 md:h-11 md:w-11 md:text-xl"
                  >
                    &lt;
                  </button>
                  <button
                    type="button"
                    aria-label="Next project"
                    onClick={goNext}
                    disabled={activeIndex === projects.length - 1}
                    className="h-10 w-10 rounded-full border border-[#9aae8f] bg-[#f7efd8] text-lg font-bold text-[#244023] transition-colors hover:bg-[#ecdfbd] disabled:cursor-not-allowed disabled:opacity-45 md:h-11 md:w-11 md:text-xl"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex  w-full max-w-7xl flex-col items-center justify-center px-6 mb-40 lg:mt-50 mt-50 lg:mb-40 text-center">
        <p className="max-w-5xl text-5xl font-primary font-semibold  text-[#132313]  md:text-6xl lg:text-7xl md:mt-5">
          We design, build and ship world-class digital products for
          forward-thinking brands.
        </p>

        <img
          src="/logo/Acropolislogo.png"
          alt="Brand logo"
          className="mt-10 w-[210px] max-w-[58vw] object-contain md:mt-30 md:w-[300px]"
        />
      </div>
    </section>
  );
};

export default HorizontalProjects;
