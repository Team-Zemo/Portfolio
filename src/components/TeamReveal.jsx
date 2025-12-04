// src/components/TeamReveal.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// TEAM DATA
const TEAM = [
  { name: "Uday Khare", role: "Lead Developer", img: "/team/uday.jpg" },
  { name: "Sai Harsha", role: "Backend Specialist", img: "/team/sai.jpg" },
  { name: "Aman Gupta", role: "3D Model Engineer", img: "/team/aman.jpg" },
  { name: "Rishabh Singh", role: "Frontend Magician", img: "/team/rishabh.jpg" },
  { name: "Arnav Patel", role: "AI/ML Researcher", img: "/team/arnav.jpg" },
];

const TeamReveal = () => {
  const redRef = useRef(null);
  const redTextRef = useRef(null);

  useEffect(() => {
    const bars = gsap.utils.toArray(".team-bar");

    //---------------------------------------------
    // 1️⃣ PILLARS + MEMBERS (PLAY ONCE)
    //---------------------------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: "#team-transition",
        start: "top 85%",
        end: "top 10%",
        once: true,          // 🔥 prevents multiple runs
        toggleActions: "play none none none",
      },
    })
      .fromTo(
        bars,
        { height: 0 },
        {
          height: "100%",
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.18,
        }
      )
      .to(
        "#team-members",
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      );

    //---------------------------------------------
    // 2️⃣ RED WIPE (SCRUB — SCROLL CONTROLLED)
    //---------------------------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: "#team-transition",
        start: "top top",
        end: "bottom+=150% top",
        scrub: 1.2,
        pin: true,
      },
    })
      .fromTo(
        redRef.current,
        { x: "-100%" },
        { x: "0%", duration: 1.3, ease: "power3.inOut" }
      )
      .fromTo(
        redTextRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .to(redRef.current, {
        x: "100%",
        duration: 1.2,
        ease: "power3.inOut",
      });
  }, []);

  return (
    <section
      id="team-transition"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "#f3f3f3" }}
    >
      {/* BLACK PILLARS */}
      <div
        id="team-bars-wrapper"
        className="absolute inset-0 flex justify-between px-10 z-30"
      >
        {TEAM.map((_, i) => (
          <div
            key={i}
            className="team-bar w-[15vw] h-0 bg-black origin-top relative"
          />
        ))}
      </div>

      {/* TEAM MEMBERS */}
      <div
        id="team-members"
        className="absolute inset-0 grid grid-cols-5 px-10 opacity-0 z-40"
      >
        {TEAM.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center text-white h-full py-10"
          >
            <div className="w-full h-[40vh] overflow-hidden flex items-center justify-center">
              {member.img ? (
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover opacity-90"
                />
              ) : (
                <div className="text-gray-300">No Image</div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center flex-1">
              <p className="font-bold text-xl">{member.name}</p>
              <p className="text-sm text-gray-300">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RED WIPE PANEL */}
      <div
        ref={redRef}
        className="absolute inset-0 bg-red-600 flex items-center justify-center z-50"
      >
        <h1
          ref={redTextRef}
          className="text-white text-6xl md:text-9xl font-extrabold tracking-widest"
          style={{ letterSpacing: "0.1em" }}
        >
          TEAM ZEMO
        </h1>
      </div>
    </section>
  );
};

export default TeamReveal;


// src/components/TeamRevealCinematic.jsx
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// const TEAM = [
//   { name: "Uday Khare", role: "Lead Developer", img: "/team/uday.jpg" },
//   { name: "Sai Harsha", role: "Backend Specialist", img: "/team/sai.jpg" },
//   { name: "Aman Gupta", role: "3D Model Engineer", img: "/team/aman.jpg" },
//   { name: "Rishabh Singh", role: "Frontend Magician", img: "/team/rishabh.jpg" },
//   { name: "Arnav Patel", role: "AI/ML Researcher", img: "/team/arnav.jpg" },
// ];

// export default function TeamReveal(){
//   const sectionRef = useRef();
//   const barsRef = useRef([]);
//   const membersRef = useRef();

//   useEffect(() => {
//     const bars = barsRef.current;
//     // 1) reveal timeline (play once)
//     const reveal = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top 75%",
//         end: "top 25%",
//         toggleActions: "play none none none",
//       }
//     });

//     reveal.fromTo(bars, { height: 0, rotationX: 6, transformOrigin: "top center" }, {
//       height: "100%",
//       rotationX: 0,
//       duration: 1.1,
//       stagger: 0.12,
//       ease: "power3.out"
//     }).to(membersRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5");

//     // 2) cinematic camera sweep (scrub, no replays)
//     gsap.to(sectionRef.current, {
//       yPercent: 6,
//       scale: 0.996,
//       ease: "none",
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom top",
//         scrub: 0.8,
//       }
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach(t => t.kill());
//       reveal.kill();
//     };
//   }, []);

//   return (
//     <section id="team-transition" ref={sectionRef} className="relative h-screen overflow-hidden bg-[rgb(243,243,243)]">
//       <div className="absolute inset-0 flex justify-between px-10 z-20">
//         {TEAM.map((_, i) => (
//           <div key={i} ref={el => barsRef.current[i] = el} className="team-bar w-[15vw] bg-black origin-top h-0" />
//         ))}
//       </div>

//       <div ref={membersRef} className="absolute inset-0 grid grid-cols-5 items-center px-10 opacity-0 z-30">
//         {TEAM.map((m,i) => (
//           <div key={i} className="flex flex-col items-center text-center text-white">
//             <div className="w-full h-[42vh] overflow-hidden rounded-md">
//               <img src={m.img} alt={m.name} className="object-cover w-full h-full"/>
//             </div>
//             <div className="mt-4">
//               <div className="font-semibold text-lg">{m.name}</div>
//               <div className="text-sm text-gray-300">{m.role}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

