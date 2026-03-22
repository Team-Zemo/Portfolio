import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Physics-inspired floating shapes ─────────────────────────── */
const SHAPES = [
  { id: 1, kind: "circle",  color: "#b8f542", size: 80, top: "12%", left: "8%",    delay: 0    },
  { id: 2, kind: "cross",   color: "#f9e84b", size: 50, top: "18%", left: "72%",   delay: 0.4  },
  { id: 3, kind: "circle",  color: "#67e8f9", size: 40, top: "62%", left: "15%",   delay: 0.8  },
  { id: 4, kind: "ring",    color: "#e8dfff", size: 96, top: "35%", left: "55%",   delay: 0.2  },
  { id: 5, kind: "squiggle",color: "#b8f542", size: 70, top: "75%", left: "80%",   delay: 0.6  },
  { id: 6, kind: "circle",  color: "#f9e84b", size: 28, top: "50%", left: "42%",   delay: 1.0  },
  { id: 7, kind: "cross",   color: "#67e8f9", size: 40, top: "82%", left: "27%",   delay: 0.35 },
  { id: 8, kind: "ring",    color: "#b8f542", size: 60, top: "90%", left: "58%",   delay: 0.75 },
];

function Shape({ kind, color, size }) {
  const half = size / 2;
  const t    = size * 0.15;

  if (kind === "circle") return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={half} cy={half} r={half - 2} fill={color} />
    </svg>
  );
  if (kind === "ring") return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={half} cy={half} r={half - t} stroke={color} strokeWidth={t} fill="none" />
    </svg>
  );
  if (kind === "cross") return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect x={half - t * 0.6} y={0}         width={t * 1.2} height={size} rx={t * 0.6} fill={color} />
      <rect x={0}               y={half - t * 0.6} width={size} height={t * 1.2} rx={t * 0.6} fill={color} />
    </svg>
  );
  if (kind === "squiggle") return (
    <svg width={size} height={size * 0.6} viewBox={`0 0 ${size} ${size * 0.6}`}>
      <path
        d={`M4 ${size * 0.3} Q${size * 0.2} 4 ${size * 0.38} ${size * 0.3} Q${size * 0.56} ${size * 0.56} ${size * 0.74} ${size * 0.3} Q${size * 0.88} 10 ${size - 4} ${size * 0.3}`}
        stroke={color} strokeWidth="5" fill="none" strokeLinecap="round"
      />
    </svg>
  );
  return null;
}

function FloatingShape({ s, containerRef }) {
  const ref     = useRef(null);
  const drag    = useRef({ dragging: false, ox: 0, oy: 0, x: 0, y: 0 });
  const pos     = useRef({ x: 0, y: 0 });
  const vel     = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  /* Continuous float animation via GSAP */
  useEffect(() => {
    const range = 18;
    gsap.to(ref.current, {
      y: `+=${range}`,
      x: `+=${range * 0.4}`,
      duration: 2.5 + s.delay,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: s.delay,
    });
  }, [s.delay]);

  /* Mouse drag with spring-back */
  const onMouseDown = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    drag.current = { dragging: true, ox: e.clientX - rect.left, oy: e.clientY - rect.top, x: 0, y: 0 };
    gsap.killTweensOf(el, "x,y");
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!drag.current.dragging) return;
      const el = ref.current;
      const px = e.clientX - drag.current.ox;
      const py = e.clientY - drag.current.oy;
      gsap.set(el, { x: px, y: py });
      drag.current.x = px;
      drag.current.y = py;
    };
    const onUp = () => {
      if (!drag.current.dragging) return;
      drag.current.dragging = false;
      const el = ref.current;
      gsap.to(el, {
        x: 0, y: 0,
        duration: 1.4,
        ease: "elastic.out(1,0.5)",
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="footer-shape"
      style={{
        position: "absolute",
        top: s.top,
        left: s.left,
        cursor: "grab",
        userSelect: "none",
        zIndex: 2,
      }}
      onMouseDown={onMouseDown}
    >
      <Shape kind={s.kind} color={s.color} size={s.size} />
    </div>
  );
}

/* ─── Main Footer ───────────────────────────────────────────────── */
export default function FooterSection() {
  const sectionRef = useRef(null);
  const panelRef   = useRef(null);
  const headingRef = useRef(null);
  const modelRef   = useRef(null);

  /* Reveal panel */
  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { y: "100%" },
      {
        y: "0%",
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 0.6,
        },
      }
    );

    /* Heading characters */
    const chars = headingRef.current?.querySelectorAll(".footer-char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
      }
    );
  }, []);

  const footerBrand = "TEAM ZEMO";

  return (
    <section
      id="contact-section"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: "130vh", background: "var(--cream)" }}
    >
      {/* Sticky spacer so panel slides up from below */}
      <div style={{ height: "30vh" }} />

      {/* Rising dark panel */}
      <div
        ref={panelRef}
        className="absolute bottom-0 left-0 right-0 noise"
        style={{
          height: "100vh",
          background: "var(--dark-green)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: "4rem",
        }}
      >
        {/* Floating interactive shapes */}
        {SHAPES.map(s => (
          <FloatingShape key={s.id} s={s} containerRef={panelRef} />
        ))}

        {/* Big brand headline */}
        <div
          ref={headingRef}
          className="relative z-10 text-center px-4"
        >
          <h2
            className="font-display font-black"
            aria-label={footerBrand}
            style={{
              fontSize: "clamp(3.5rem, 14vw, 14rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
              color: "transparent",
              WebkitTextStroke: "2px var(--lime)",
            }}
          >
            {footerBrand.split("").map((ch, i) => (
              <span
                key={i}
                className="footer-char"
                style={{
                  display: "inline-block",
                  whiteSpace: ch === " " ? "pre" : undefined,
                  opacity: 0,
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h2>

          <p
            className="font-body mt-4"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              color: "rgba(245,240,232,0.5)",
              fontWeight: 400,
              letterSpacing: "0.04em",
            }}
          >
            Precision · Discipline · Excellence
          </p>

          {/* CTA row */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/Team-Zemo"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Visit GitHub ↗
            </a>
            <a
              href="mailto:teamzemo@acropolis.in"
              className="btn-outline"
            >
              Say Hello
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="relative z-10 w-full max-w-6xl px-6 md:px-14 mt-16 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(245,240,232,0.1)", paddingTop: "2rem" }}
        >
          <p className="font-body text-xs" style={{ color: "rgba(245,240,232,0.3)", letterSpacing: "0.04em" }}>
            © {new Date().getFullYear()} Team Zemo. All rights reserved.
          </p>
          <p className="font-body text-xs" style={{ color: "rgba(245,240,232,0.3)", letterSpacing: "0.04em" }}>
            Built with React · GSAP · Three.js
          </p>
        </div>
      </div>
    </section>
  );
}
