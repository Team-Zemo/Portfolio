import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Lavender transition quote section ────────────────────────── */
export default function QuoteTransition() {
  const secRef   = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const words = quoteRef.current?.querySelectorAll(".q-word span");
    if (!words?.length) return;

    gsap.fromTo(
      words,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 70%",
          once: true,
        },
      }
    );

    /* Opacity scrub as centered */
    gsap.to(quoteRef.current, {
      opacity: 0.25,
      scrollTrigger: {
        trigger: secRef.current,
        start: "bottom 30%",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const quoteText =
    "Strength grows in the moments when you think you can't go on — but you keep going anyway.";

  return (
    <section
      ref={secRef}
      className="noise relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--lavender)", padding: "8rem 2rem" }}
    >
      {/* Decorative rotating circle */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10"
      >
        <div
          className="spin-slow border rounded-full"
          style={{
            width: "min(80vw, 600px)",
            height: "min(80vw, 600px)",
            borderColor: "var(--lavender-deep)",
            borderWidth: 1,
          }}
        />
      </div>

      <div
        ref={quoteRef}
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        <div
          className="font-display font-black"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.025em",
            color: "var(--lavender-deep)",
          }}
        >
          {quoteText.split(" ").map((word, i) => (
            <span
              key={i}
              className="q-word"
              style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em" }}
            >
              <span style={{ display: "inline-block" }}>{word}</span>
            </span>
          ))}
        </div>

        <p
          className="font-display font-bold mt-8 tracking-widest uppercase"
          style={{ fontSize: "0.85rem", color: "var(--lavender-deep)", opacity: 0.55, letterSpacing: "0.12em" }}
        >
          — Team Zemo
        </p>
      </div>
    </section>
  );
}
