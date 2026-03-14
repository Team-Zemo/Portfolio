import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Omninet Core",
    subtitle: "Team Zemo / Infrastructure Layer",
    image: "/projects/first.jpg",
    tech: "Spring Boot • Modular Runtime • AI Voice Stack",
    description: [
      "Speech-enabled backend architecture for realtime AI voice workflows.",
      "Adaptive modular runtime for AI pipelines and multi-agent flows.",
      "Hierarchical NoteManager workflow system for advanced task routing.",
      "AI chat engine with persistent contextual memory threads.",
    ],
    links: [
      {
        label: "Backend Repo",
        url: "https://github.com/Team-Zemo/omninet-core",
      },
      {
        label: "Frontend Repo",
        url: "https://github.com/Team-Zemo/omninet-security-web",
      },
    ],
  },

  {
    id: 2,
    title: "Aeigies Core",
    subtitle: "AI Misuse Detection / Security Engine",
    image: "/projects/second.jpg",
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
    image: "/projects/third.jpg",
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

    // Start narrow with rounded top corners, then expand as section pins.
    gsap.set(frame, {
      width: "86vw",
      borderTopLeftRadius: 38,
      borderTopRightRadius: 38,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    });

    const introTween = gsap.to(frame, {
      width: "100vw",
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 20%",
        end: "top top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * 1.6}`,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Keep full width while pinned, then shrink back in the final 20%.
        const outroStart = 0.8;
        const outroProgress = Math.min(
          Math.max((self.progress - outroStart) / (1 - outroStart), 0),
          1,
        );

        const widthVw = 100 - outroProgress * 14;
        const bottomRadius = outroProgress * 30;
        const upShiftPx = outroProgress * window.innerHeight * 0.16;

        frame.style.width = `${widthVw}vw`;
        frame.style.borderBottomLeftRadius = `${bottomRadius}px`;
        frame.style.borderBottomRightRadius = `${bottomRadius}px`;
        frame.style.transform = `translateY(-${upShiftPx}px)`;
      },
    });

    setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      introTween.kill();
      trigger.kill();
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
      className="relative h-[180vh] bg-[rgba(255,190,210,0.55)] text-[#19261a]"
    >
      <div
        ref={frameRef}
        className="mx-auto h-screen overflow-hidden bg-[#f8f2e5]"
      >
        <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col px-4 pt-5 pb-6 md:px-10 md:pt-8 md:pb-10">
          <div className="mb-4 md:mb-6">
            <h2 className="mt-2 text-[2.25rem] font-primary leading-[0.95] text-[#000000] md:text-[5rem] lg:text-[6rem]">
              Digital Experiences
            </h2>
          </div>

          <div className="flex flex-1 items-center justify-center py-2 md:py-3">
            <div className="relative h-[80vh] w-full max-w-[1300px] overflow-hidden rounded-[1.75rem] bg-[#f8f2e5] shadow-[0_20px_60px_rgba(60,48,22,0.16)] md:h-[70vh]">
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
                      <div className="relative h-[34vh] md:col-span-7 md:h-full">
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0c140d]/18 via-transparent to-transparent" />
                      </div>

                      <div className="md:col-span-5 flex h-full flex-col bg-[#f8f2e5] p-5 md:p-8 lg:p-10">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#3e5f39] md:text-xs">
                          {project.subtitle}
                        </p>

                        <h3 className="mt-2 text-3xl font-primary leading-tight text-[#122111] md:text-5xl">
                          {project.title}
                        </h3>

                        <p className="mt-3 text-sm font-medium text-[#365133] md:text-base">
                          {project.tech}
                        </p>

                        <div className="my-4 h-px bg-[#231008] md:my-5" />

                        <div className="space-y-2.5 text-[13px] leading-[1.55] text-[#294028] md:text-[15px]">
                          {project.description.map((line, lineIndex) => (
                            <p key={lineIndex}>{line}</p>
                          ))}
                        </div>

                        <div className=" pt-5">
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
                    className="h-11 w-11 rounded-full border border-[#9aae8f] bg-[#f7efd8] text-xl font-bold text-[#244023] transition-colors hover:bg-[#ecdfbd] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    &lt;
                  </button>
                  <button
                    type="button"
                    aria-label="Next project"
                    onClick={goNext}
                    disabled={activeIndex === projects.length - 1}
                    className="h-11 w-11 rounded-full border border-[#9aae8f] bg-[#f7efd8] text-xl font-bold text-[#244023] transition-colors hover:bg-[#ecdfbd] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex  w-full max-w-7xl flex-col items-center justify-center px-6  lg:mt-10  text-center">
        <p className="max-w-5xl text-5xl font-primary  text-[#132313]  md:text-6xl lg:text-7xl md:mt-5">
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
