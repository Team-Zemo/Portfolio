import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RendererTool from "../tools/RendererTool";
import TeamZemoModel from "./TeamZemoModel";

gsap.registerPlugin(ScrollTrigger);

/* ─── Inline decorative SVG shapes ─────────────────────────────── */
const Smiley = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none"
       xmlns="http://www.w3.org/2000/svg"
       style={{ display:"inline-block", verticalAlign:"middle", marginBottom:"0.15em" }}>
    <circle cx="36" cy="36" r="34" stroke="#b8f542" strokeWidth="3" fill="none"/>
    <circle cx="24" cy="28" r="5" fill="#b8f542"/>
    <circle cx="48" cy="28" r="5" fill="#b8f542"/>
    <path d="M20 44 Q36 58 52 44" stroke="#b8f542" strokeWidth="3" strokeLinecap="round" fill="none"/>
  </svg>
);

const Star = ({ color = "#f9e84b", size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
       xmlns="http://www.w3.org/2000/svg"
       className="float-anim"
       style={{ display:"inline-block", verticalAlign:"middle" }}>
    <path d="M24 4L27.5 20.5L44 24L27.5 27.5L24 44L20.5 27.5L4 24L20.5 20.5Z"
          fill={color}/>
  </svg>
);

const MARQUEE_ITEMS = [
  "AI Infrastructure", "★", "Security Engines", "★",
  "Computer Vision", "★", "Realtime Systems", "★",
  "AI Infrastructure", "★", "Security Engines", "★",
  "Computer Vision", "★", "Realtime Systems", "★",
];

export default function HeroSection({ setProgress, setModelLoaded }) {
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const ctaRef     = useRef(null);
  const ctrl = useRef({ x: 0, y: -0.4, z: 0, scale: 1.1, rotationY: 0 });

  /* ── Entry animation ──────────────────────────────────────────── */
  useEffect(() => {
    const words = headingRef.current?.querySelectorAll(".hero-word span");
    if (!words) return;

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(words, {
      y: "0%",
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.08,
    })
    .fromTo(subRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
    .fromTo(ctaRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3");
  }, []);

  /* ── Model scroll animation ───────────────────────────────────── */
  useEffect(() => {
    const obj = ctrl.current;
    const mm  = gsap.matchMedia();

    mm.add({ isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" }, (ctx) => {
      const { isMobile } = ctx.conditions;
      gsap.set(obj, { x: 0, y: isMobile ? -0.15 : -0.3, z: 0, scale: isMobile ? 0.7 : 1.05, rotationY: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          endTrigger: "#work-section",
          end: "top top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(obj, {
        x: isMobile ? 0 : -1.6,
        y: isMobile ? -1.0 : -0.5,
        rotationY: Math.PI * 2,
        ease: "none",
      }).to(obj, {
        x: isMobile ? -1.5 : -3.5,
        y: isMobile ? 2.5 : 1.5,
        scale: 0.15,
        ease: "power1.inOut",
      });
    });
    return () => mm.revert();
  }, []);

  /* ── Cursor parallax ─────────────────────────────────────────── */
  useEffect(() => {
    const words = headingRef.current?.querySelectorAll(".parallax-word");
    if (!words?.length) return;

    const onMove = (e) => {
      const cx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      words.forEach((el, i) => {
        const depth = (i % 3 + 1) * 0.35;
        gsap.to(el, { x: cx * depth * 18, y: cy * depth * 10, duration: 0.6, ease: "power2.out" });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero-section"
      className="noise relative min-h-screen w-full overflow-hidden sec-green flex flex-col"
      style={{ minHeight: "100dvh" }}
    >
      {/* 3D Model — fixed overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* <RendererTool onProgress={setProgress} onLoaded={() => setModelLoaded(true)}>
          <TeamZemoModel controlRef={ctrl} />
        </RendererTool> */}
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-[12%] right-[8%] w-64 h-64 rounded-full opacity-10 blur-3xl"
           style={{ background: "radial-gradient(circle, #b8f542 0%, transparent 70%)" }} />
      <div className="absolute bottom-[15%] left-[5%] w-48 h-48 rounded-full opacity-8 blur-3xl"
           style={{ background: "radial-gradient(circle, #f9e84b 0%, transparent 70%)" }} />

      {/* Main content */}
      <div className="relative z-20 flex flex-col justify-end flex-1 px-6 md:px-14 pb-12 md:pb-24 pt-24">

        {/* Overline tag */}
        <div className="mb-6 md:mb-8 flex items-center gap-3">
          <span className="tag-pill" style={{ color: "var(--lime)", borderColor: "rgba(184,245,66,0.4)" }}>
            Est. 2022
          </span>
          <span style={{ color: "rgba(245,240,232,0.45)", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
            Precision · Discipline · Excellence
          </span>
        </div>

        {/* Big heading */}
        <h1
          ref={headingRef}
          className="font-display parallax-word"
          style={{
            fontSize: "clamp(3.8rem, 13vw, 13rem)",
            fontWeight: 800,
            lineHeight: 0.88,
            letterSpacing: "-0.025em",
            color: "var(--cream)",
          }}
        >
          <span className="hero-word"><span>Team</span></span>{" "}
          <span className="hero-word parallax-word"><span className="inline-block" style={{ color: "var(--lime)" }}>Zemo</span></span>
          <br/>
          <span className="hero-word"><span>Build</span></span>{" "}
          <span className="hero-word parallax-word">
            <span>
              <Smiley />
            </span>
          </span>
          <br/>
          <span className="hero-word"><span>The Future</span></span>
        </h1>

        {/* Sub + CTA row */}
        <div ref={subRef} className="mt-10 flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-12 opacity-0">
          <p
            className="max-w-sm font-body"
            style={{ color: "rgba(245,240,232,0.65)", fontSize: "1.05rem", lineHeight: 1.55 }}
          >
            We build advanced AI infrastructure, realtime security engines,
            and computer vision systems that push boundaries.
          </p>
          <div ref={ctaRef} className="flex flex-wrap gap-3 opacity-0">
            <a href="#work-section" className="btn-primary">
              See Our Work
              <span style={{ fontSize: "1.1rem" }}>↓</span>
            </a>
            <a href="https://github.com/Team-Zemo" target="_blank" rel="noreferrer" className="btn-outline">
              GitHub
            </a>
          </div>
        </div>

        {/* Floating decorative stars */}
        <div className="absolute top-1/2 right-[12%] hidden md:block" style={{ transform: "translateY(-30%)" }}>
          <Star color="#b8f542" size={56} />
        </div>
        <div className="absolute bottom-[22%] right-[28%] hidden md:block">
          <Star color="#f9e84b" size={36} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="relative z-20 flex items-center gap-2 pb-8 px-8 md:px-16"
        style={{ color: "rgba(245,240,232,0.35)", fontSize: "0.78rem", fontFamily: "var(--font-display)", letterSpacing: "0.1em", textTransform: "uppercase" }}
      >
        <div className="w-14 h-px" style={{ background: "rgba(245,240,232,0.25)" }} />
        Scroll to explore
      </div>

      {/* Marquee strip */}
      <div
        className="relative z-20 overflow-hidden border-t"
        style={{ borderTopColor: "rgba(245,240,232,0.1)", background: "rgba(255,255,255,0.03)", padding: "0.85rem 0" }}
      >
        <div className="marquee-track" style={{ gap: "2.5rem" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-display"
              style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: item === "★" ? "var(--lime)" : "rgba(245,240,232,0.5)",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
