import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutLiftTransition = () => {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;

    gsap.set(panel, {
      yPercent: 0,
      scale: 1,
      borderRadius: 0,
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",

        // SHORTER = faster feeling
        end: () => `+=${window.innerHeight * 0.65}`,

        scrub: true, // smooth but not sticky
        // pin: true,
        // anticipatePin: 1,
        // invalidateOnRefresh: true,
      },
    });

    tl.to(panel, {
      yPercent: -10, // smaller movement
      scale: 0.96,
      borderRadius: 28,
      ease: "none",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 h-[130vh] w-full bg-white"
    >
      <div
        ref={panelRef}
        className="mx-auto flex h-screen w-full items-end overflow-hidden bg-[#efefe8] px-5 pb-12 md:px-10 md:pb-16"
      >
        <div className="mx-auto w-full max-w-[1700px]">
          <h3 className="mt-3 max-w-5xl text-[clamp(2.1rem,6.1vw,6.2rem)] font-black leading-[0.92] tracking-[-0.02em] text-[#071f06]">
            Crafted with independent thinking, built for real human impact.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default AboutLiftTransition;
