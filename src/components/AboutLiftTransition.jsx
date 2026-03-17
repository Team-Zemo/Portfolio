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
      className="relative z-0 h-[20vh] w-full bg-[rgba(255,190,210,0.55)] md:h-screen"
    >
      <div
        ref={panelRef}
        className="mx-auto flex h-[72vh] w-full items-start overflow-hidden bg-[#fcf7ec] px-5 pt-50 pb-10 md:h-screen md:items-end md:px-10 md:pt-0 md:pb-16"
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
