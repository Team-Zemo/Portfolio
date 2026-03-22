import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "100%", label: "In-house & independent" },
  { value: "3+",   label: "Years crafting digital experiences" },
  { value: "2+",   label: "Awards from Institutions" },
  { value: "∞",    label: "Lines of passion shipped" },
];

function SplitText({ text, className, style }) {
  return (
    <span className={className} style={style} aria-label={text}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="hero-word" style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}>
          <span style={{ display: "inline-block" }}>{word}</span>
        </span>
      ))}
    </span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);
  const imgRef     = useRef(null);
  const statsRef   = useRef(null);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    /* Heading words slide in on scroll */
    const words = sec.querySelectorAll(".about-word span");
    gsap.fromTo(
      words,
      { y: "110%" },
      {
        y: "0%",
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: sec,
          start: "top 75%",
          once: true,
        },
      }
    );

    /* Image parallax */
    gsap.to(imgRef.current, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    /* Stats reveal */
    const statEls = statsRef.current?.querySelectorAll(".stat-row");
    gsap.fromTo(
      statEls,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 82%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="noise relative w-full sec-cream overflow-hidden"
      style={{ padding: "8rem 0 9rem" }}
    >
      {/* Decorative circle */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: "var(--lime)", filter: "blur(80px)" }}
      />

      <div className="mx-auto max-w-[1640px] px-6 md:px-14">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px" style={{ background: "var(--dark-green)" }} />
          <span className="font-display text-xs font-bold uppercase tracking-widest" style={{ color: "var(--dark-green)", opacity: 0.5 }}>
            About Us
          </span>
        </div>

        {/* Massive headline */}
        <h2
          className="font-display font-black"
          style={{
            fontSize: "clamp(3rem, 9.5vw, 10rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            color: "var(--dark-green)",
            maxWidth: "14ch",
          }}
        >
          {["Great", "work", "for", "great", "people."].map((word, i) => (
            <span
              key={i}
              className="about-word"
              style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em" }}
            >
              <span style={{ display: "inline-block" }}>{word}</span>
            </span>
          ))}
        </h2>

        {/* Two-column layout */}
        <div
          className="mt-16 md:mt-24 grid grid-cols-1 xl:grid-cols-12 gap-14 xl:gap-20"
        >
          {/* Left: text + stats */}
          <div className="xl:col-span-5 flex flex-col justify-between">
            <div ref={textRef} className="space-y-6">
              <p
                className="font-body"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", fontWeight: 500, lineHeight: 1.5, color: "#1b2e1d" }}
              >
                We put people first, understanding that a well-crafted product
                significantly impacts the lives of those who use it. By
                empowering users, we solve unique problems, accelerate progress,
                and unlock potential for our clients.
              </p>
              <p
                className="font-body"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", lineHeight: 1.55, color: "#1b2e1d", opacity: 0.75 }}
              >
                Our independent spirit drives our creative energy and approach
                to technology, allowing us to ensure quality and consistently
                deliver outstanding outcomes.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="mt-14 md:mt-20 border-t" style={{ borderTopColor: "rgba(13,43,26,0.15)" }}>
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="stat-row grid gap-4 py-5 border-b"
                  style={{
                    gridTemplateColumns: "7rem 1fr",
                    borderBottomColor: "rgba(13,43,26,0.12)",
                    opacity: 0,
                  }}
                >
                  <span
                    className="font-display font-black"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "var(--dark-green)", lineHeight: 1 }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-body font-semibold self-center"
                    style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", color: "#1b2e1d" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="xl:col-span-7">
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "2rem", background: "#efefe8" }}
            >
              <img
                ref={imgRef}
                src="/team/team.png"
                alt="Team Zemo"
                className="w-full object-cover object-center will-transform"
                style={{ height: "clamp(360px, 60vh, 680px)" }}
              />
              {/* Lime accent stripe */}
              <div
                className="absolute bottom-6 left-6 right-6 flex items-center justify-between px-6 py-4 rounded-2xl"
                style={{ background: "var(--lime)", backdropFilter: "blur(10px)" }}
              >
                <span className="font-display font-black text-sm" style={{ color: "var(--dark-green)" }}>
                  TEAM ZEMO
                </span>
                <span className="font-body text-xs font-medium" style={{ color: "var(--dark-green)", opacity: 0.7 }}>
                  Est. 2022 · Indore, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
