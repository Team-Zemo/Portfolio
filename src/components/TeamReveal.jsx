// src/components/TeamReveal.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { name: "Uday Khare", role: "Lead Developer", img: "/team/uday.jpg" },
  { name: "Sai Harsha", role: "Backend Specialist", img: "/team/sai.jpg" },
  { name: "Aman Gupta", role: "3D Model Engineer", img: "/team/aman.jpg" },
  { name: "Rishabh Singh", role: "Frontend Magician", img: "/team/rishabh.jpg" },
  { name: "Arnav Patel", role: "AI/ML Researcher", img: "/team/arnav.jpg" },
];

const TeamReveal = () => {
  const containerRef = useRef(null);
  const redPanelRef = useRef(null);
  const redTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = gsap.utils.toArray(".team-bar");
      const redPanel = redPanelRef.current;
      const redText = redTextRef.current;

      // 🔥 ONE PINNED TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",     // 🔥 Reveal + hold + red wipe + exit
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // STEP 1 — Bars drop
      tl.fromTo(
        bars,
        { height: 0 },
        {
          height: "100%",
          ease: "power3.inOut",
          duration: 1,
          stagger: 0.08,
        }
      );

      // STEP 2 — Members fade in
      tl.fromTo(
        "#team-members .member-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // STEP 3 — RED WIPE ENTER (overlay)
      tl.fromTo(
        redPanel,
        { x: "-100%" },
        {
          x: "0%",
          duration: 1.3,
          ease: "power3.inOut",
        },
        "+=0.3"   // small scroll gap AFTER team fully revealed
      );

      // STEP 4 — Red Text Reveal
      tl.fromTo(
        redText,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // STEP 5 — RED PANEL EXIT
      tl.to(redPanel, {
        x: "100%",
        duration: 1.3,
        ease: "power3.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="team-transition"
      className="relative min-h-screen w-full overflow-hidden bg-gray-100"
    >
      {/* BACKGROUND BARS */}
      <div className="absolute inset-0 grid grid-cols-5 px-4 md:px-10 z-10 gap-2 md:gap-4">
        {TEAM.map((_, i) => (
          <div key={i} className="flex justify-center h-full">
            <div className="team-bar w-full max-w-[15vw] h-full bg-black origin-top" />
          </div>
        ))}
      </div>

      {/* TEAM MEMBERS */}
      <div
        id="team-members"
        className="absolute inset-0 grid grid-cols-5 px-4 md:px-10 z-20 gap-2 md:gap-4 pointer-events-none"
      >
        {TEAM.map((member, index) => (
          <div
            key={index}
            className="member-item flex flex-col items-center justify-center text-center text-white h-full"
          >
            <div className="w-full max-w-[12vw] aspect-[3/4] overflow-hidden mb-6 bg-gray-800">
              {member.img ? (
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover opacity-90"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                  No Img
                </div>
              )}
            </div>

            <div className="w-full px-2">
              <h3 className="font-bold text-lg md:text-2xl leading-tight">
                {member.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-300 mt-1 uppercase tracking-wider">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 RED WIPE PANEL (now INSIDE TeamReveal) */}
      <div
        ref={redPanelRef}
        className="absolute inset-0 bg-red-600 flex items-center justify-center z-[40]"
        style={{ transform: "translateX(-100%)" }}
      >
        <h1
          ref={redTextRef}
          className="text-white text-6xl md:text-9xl font-extrabold tracking-widest opacity-0"
        >
          TEAM ZEMO
        </h1>
      </div>
    </section>
  );
};

export default TeamReveal;
