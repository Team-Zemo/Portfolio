import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    num: "01",
    title: "Placement Portal",
    subtitle: "Campus Drive Coordination Platform",
    image: "/projects/first.png",
    tech: ["Student Workflow", "Recruiter Access", "Drive Tracking"],
    description:
      "Unified placement workflow for students, coordinators, and hiring teams. Centralized job postings, applications, and drive schedule management.",
    links: [{ label: "Live Project", url: "https://cdc.acropolis.teamzemo.tech/" }],
    color: "#e8dfff",
    accent: "#7c5cbf",
  },
  {
    id: 2,
    num: "02",
    title: "Aeigies Core",
    subtitle: "AI Misuse Detection / Security Engine",
    image: "/projects/second.png",
    tech: ["Realtime Defense", "Pattern Rules", "Enforcement Layer"],
    description:
      "High-speed prompt misuse detection with multilayer auditing. Attack signature mapping and realtime prompt pattern analysis.",
    links: [
      { label: "Backend Repo",  url: "https://github.com/Team-Zemo/aeigies-core" },
      { label: "Frontend Repo", url: "https://github.com/Team-Zemo/Aeigis-Frontend" },
    ],
    color: "#d4efff",
    accent: "#2a8ad4",
  },
  {
    id: 3,
    num: "03",
    title: "Swayog",
    subtitle: "Pose Engine / Live CV Feedback",
    image: "/projects/third.png",
    tech: ["FastAPI", "Realtime CV", "Socket Streams"],
    description:
      "AI-driven posture analysis engine for realtime corrective feedback. Advanced OpenCV + keypoint estimation pipeline tuned for stability and accuracy.",
    links: [{ label: "Project Repo", url: "https://github.com/Team-Zemo/Swayog" }],
    color: "#f5ede0",
    accent: "#0d2b1a",
  },
];

/* Single project card — horizontal layout */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const imgFirst = index % 2 === 0; // alternate image/text positions

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
  }, []);

  return (
    <article
      ref={cardRef}
      className="project-card group"
      style={{
        background: project.color,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "420px",
        width: "min(100%, 960px)",
        marginLeft: imgFirst ? 0 : "auto",
        marginRight: imgFirst ? "auto" : 0,
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ order: imgFirst ? 0 : 1 }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ minHeight: "320px" }}
        />
        <div className="card-overlay" />
        <div className="card-meta">
          <p className="font-display text-xs font-bold uppercase" style={{ letterSpacing:"0.08em", opacity:0.75 }}>{project.num}</p>
          <h3 className="font-display text-xl font-bold mt-1">{project.title}</h3>
        </div>
      </div>

      {/* Text panel */}
      <div
        className="flex flex-col justify-between p-8 lg:p-12"
        style={{ order: imgFirst ? 1 : 0, color: project.accent }}
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="tag-pill" style={{ color: project.accent, borderColor: project.accent, fontSize: "0.7rem" }}>
              {project.num}
            </span>
          </div>
          <p className="font-display text-xs font-bold uppercase tracking-widest opacity-55 mb-3">
            {project.subtitle}
          </p>
          <h3
            className="font-display font-black leading-none mb-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.025em" }}
          >
            {project.title}
          </h3>
          <p className="font-body leading-relaxed opacity-70" style={{ fontSize: "0.92rem" }}>
            {project.description}
          </p>
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map(t => (
              <span
                key={t}
                className="font-display text-xs font-bold px-3 py-1 rounded-full"
                style={{ background:"rgba(0,0,0,0.08)", letterSpacing:"0.04em" }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            {project.links.map(lnk => (
              <a
                key={lnk.label}
                href={lnk.url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ background: project.accent, color: "#fff", boxShadow: "none", fontSize: "0.75rem" }}
              >
                {lnk.label} →
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WorkSection() {
  const secRef    = useRef(null);
  const titleRef  = useRef(null);

  useEffect(() => {
    const chars = titleRef.current?.querySelectorAll(".char");
    if (!chars?.length) return;
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  const title = "Digital Experiences";

  return (
    <section
      id="work-section"
      ref={secRef}
      className="noise relative w-full overflow-hidden sec-cream"
      style={{ padding: "7rem 0 9rem" }}
    >
      {/* Section header */}
      <div className="px-6 md:px-14 mb-14 md:mb-20">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-px" style={{ background: "var(--dark-green)" }} />
          <span
            className="font-display text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--dark-green)", opacity: 0.6 }}
          >
            Selected Work
          </span>
        </div>
        <h2
          ref={titleRef}
          className="font-display font-black"
          aria-label={title}
          style={{
            fontSize: "clamp(2.8rem, 9vw, 9rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "var(--dark-green)",
          }}
        >
          {title.split("").map((ch, i) => (
            <span key={i} className="char" style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : undefined }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h2>
      </div>

      {/* Cards — staggered layout */}
      <div
        className="px-6 md:px-14 flex flex-col"
        style={{ gap: "2.5rem" }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      {/* Bottom quote */}
      <div
        className="mx-auto max-w-4xl text-center px-6 mt-20 md:mt-28"
        style={{ color: "var(--dark-green)" }}
      >
        <p
          className="font-display font-black leading-tight"
          style={{ fontSize: "clamp(1.9rem, 5vw, 4.5rem)", letterSpacing: "-0.025em" }}
        >
          We design, build & ship world-class digital products for forward-thinking teams.
        </p>
        <img src="/logo/Acropolislogo.png" alt="Acropolis" className="mx-auto mt-10 md:mt-16 w-44 md:w-56 object-contain" />
      </div>
    </section>
  );
}
