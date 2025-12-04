import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HorizontalProjects from "../components/HorizontalProjects";
import TeamReveal from "../components/TeamReveal";
import RedWipeTransition from "../components/RedWipeTransition";
import PostWipeFadeSection from "../components/PostWipeFadeSection";
import FooterReveal from "../components/FooterReveal";
import TeamZemoModel from "../components/TeamZemoModel";
import RendererTool from "../tools/RendererTool";

gsap.registerPlugin(ScrollTrigger);

const HomePage = ({ setProgress, setModelLoaded }) => {
    // 1. STATE: Tracks the required Y-axis rotation in radians (0 to 2*PI)
    const [scrollRotationY, setScrollRotationY] = useState(0);

    // ------------------- MODEL JOURNEY ANIMATION -------------------
    useEffect(() => {
        // --- 2. MODEL JOURNEY & EXIT ANIMATION ---

        // Set initial state: centered, scaled 1, rotation 0
        gsap.set("#fixed-model-wrapper", { scale: 1, rotationY: 0, x: 0, y: 0 });

        const modelJourneyTl = gsap.timeline({
            scrollTrigger: {
                // The entire animation spans from the Hero exit, across the Quote section, to the Quote exit.
                trigger: "#hero-section-id", 
                start: "bottom bottom",      // Start when the bottom of Hero hits the bottom of viewport
                endTrigger: "#quote-section", // End when the quote section leaves the viewport
                end: "bottom top",           // End when the bottom of Quote hits the top of the viewport
                scrub: true,
                
                // 2. LOGIC: Calculate rotation based on scroll progress
                onUpdate: (self) => {
                    // self.progress goes from 0 (start) to 1 (end)
                    // Multiply progress by 2*PI (360 degrees) to get the required angle in radians.
                    const rotation = self.progress * Math.PI * 2; 
                    setScrollRotationY(rotation);
                },
                // Ensure rotation locks at 360 degrees (2*PI) when the trigger area is left down
                onLeave: () => setScrollRotationY(Math.PI * 2), 
                // Ensure rotation locks at 0 degrees when the trigger area is left back up
                onLeaveBack: () => setScrollRotationY(0),
            },
        });

        // Phase 1: Move from Center to Quote Position
        modelJourneyTl.to("#fixed-model-wrapper", {
            x: "-25vw",          // Move left to align with the quote text
            scale: 1,            // Ensure no unwanted shrinking
            ease: "power1.inOut",
            duration: 1,
        });

        // Phase 3: Scroll Away with the Quote Section
        modelJourneyTl.to("#fixed-model-wrapper", {
            y: "-100vh", // Move the fixed container vertically up and out of view
            x: "-25vw", 
            scale: 1,
            ease: "power1.in", 
            duration: 1,
        });
        
    }, []);

    // ------------------- WIPE TRANSITION ANIMATION -------------------
    useEffect(() => {
        const bars = gsap.utils.toArray(".bar");
        const nextContent = document.getElementById("next-content");

        const wipeTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#wipe-transition",
                start: "top center",
                end: "top top",
                scrub: true,
            },
        });

        // Grow bars vertically
        wipeTl.fromTo(
            bars,
            { scaleY: 0 },
            {
                scaleY: 1,
                duration: 1.2,
                ease: "power3.inOut",
                stagger: 0.1,
            }
        );

        // Reveal next section
        wipeTl.to(
            nextContent,
            {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
            },
            "-=0.8"
        );

        // Remove bars
        wipeTl.to(
            bars,
            {
                opacity: 0,
                duration: 0.5,
                pointerEvents: "none",
            },
            "-=0.3"
        );
    }, []);

    // ------------------- TEAM TRANSITION ANIMATION -------------------
    useEffect(() => {
        const teamBars = gsap.utils.toArray(".team-bar");
        const teamMembers = document.getElementById("team-members");

        const teamTL = gsap.timeline({
            scrollTrigger: {
                trigger: "#team-transition",
                start: "top center",
                end: "top top",
                scrub: true,
            },
        });

        // Stagger bars from above
        teamTL.fromTo(
            teamBars,
            { height: 0 },
            {
                height: "100%",
                duration: 1.4,
                ease: "power3.inOut",
                stagger: 0.15,
            }
        );

        // Fade in team members after bars settle
        teamTL.to(
            teamMembers,
            {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
            },
            "-=0.5"
        );
    }, []);

    return (
        <div className="relative">
            
            {/* ------------------------------------------------------------- */}
            {/* 1. THE FIXED MODEL CONTAINER (Must be rendered first)         */}
            {/* ------------------------------------------------------------- */}
            <div 
                className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center"
            >
                <div 
                    id="fixed-model-wrapper" 
                    className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
                    style={{ transformStyle: "preserve-3d" }} // Required for 3D CSS rotation
                >
                    {/* Enable pointer events ONLY on the canvas for mouse control */}
                    <div className="w-full h-full pointer-events-auto">
                        <RendererTool
                            onProgress={setProgress}
                            onLoaded={() => setModelLoaded(true)}
                        >
                            {/* PASS PROP: Send the calculated rotation to the model */}
                            <TeamZemoModel rotationY={scrollRotationY} />
                        </RendererTool>
                    </div>
                </div>
            </div>


            {/* ------------------------------------------------------------- */}
            {/* 2. HERO SECTION (Starting point for the model)                */}
            {/* ------------------------------------------------------------- */}
            <section 
                id="hero-section-id" // <-- CRITICAL ID FOR GSAP TRIGGER
                className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white z-0"
            >
                {/* Placeholder div to ensure text is centered below the model's fixed position */}
                <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] mb-6 shrink-0" />

                <h1 className="text-5xl md:text-[10rem] font-extrabold leading-none text-center">
                    Team Zemo
                </h1>
            </section>


            {/* ------------------------------------------------------------- */}
            {/* 3. QUOTE SECTION (Ending point for the model)                 */}
            {/* ------------------------------------------------------------- */}
            <section
                id="quote-section"
                className="relative min-h-screen w-full flex items-center justify-end pr-8 md:pr-20 bg-white z-0"
            >
                {/* Content pushed to the right side, leaving space for the fixed model on the left */}
                <div className="max-w-xl md:max-w-2xl text-left space-y-6 md:py-10">
                    <p className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
                        “Strength grows in the moments when you think you can’t go on but
                        you keep going anyway.”
                    </p>

                    <p className="text-lg md:text-xl text-gray-700">
                        Team Zemo believes in resilience, precision, and discipline. Every
                        setback is an instruction, every challenge a doorway, and every
                        victory a reminder that power belongs to the relentless.
                    </p>

                    <p className="text-xl md:text-2xl font-semibold text-gray-900">
                        — Team Zemo
                    </p>
                </div>
            </section>


            {/* ------------------------------------------------------------- */}
            {/* 4. REST OF THE PAGE SECTIONS                                  */}
            {/* ------------------------------------------------------------- */}
            <section>
                <HorizontalProjects />
            </section>

            <section
                id="wipe-transition"
                className="relative min-h-screen w-full bg-white overflow-hidden"
            >
                <div id="bars-wrapper" className="absolute inset-0 flex gap-2 pl-4 z-40">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="bar bg-black w-[8vw] h-0 origin-center" />
                    ))}
                </div>

                <div id="next-content" className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 z-30">
                    <h1 className="text-5xl md:text-8xl font-extrabold text-gray-900">
                        The Next Chapter
                    </h1>
                    <p className="text-lg md:text-2xl max-w-2xl text-gray-700 mt-6">
                        Power, precision, discipline — the core of Team Zemo’s legacy.
                    </p>
                </div>
            </section>

            <TeamReveal />
            <PostWipeFadeSection />
            <FooterReveal />
        </div>
    );
};

export default HomePage;




// import React, { useEffect } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import HorizontalProjects from "../components/HorizontalProjects";
// import TeamReveal from "../components/TeamReveal";
// import RedWipeTransition from "../components/RedWipeTransition";
// import PostWipeFadeSection from "../components/PostWipeFadeSection";
// import FooterReveal from "../components/FooterReveal";
// import TeamZemoModel from "../components/TeamZemoModel";
// import RendererTool from "../tools/RendererTool";

// gsap.registerPlugin(ScrollTrigger);

// const HomePage = ({ setProgress, setModelLoaded }) => {
//   useEffect(() => {
//     const bars = gsap.utils.toArray(".bar");
//     const nextContent = document.getElementById("next-content");

//     const wipeTl = gsap.timeline({
//       scrollTrigger: {
//         trigger: "#wipe-transition",
//         start: "top center",
//         end: "top top",
//         scrub: true,
//       },
//     });

//     // Grow bars vertically (up + down)
//     wipeTl.fromTo(
//       bars,
//       { scaleY: 0 },
//       {
//         scaleY: 1,
//         duration: 1.2,
//         ease: "power3.inOut",
//         stagger: 0.1,
//       }
//     );

//     // While bars still growing, reveal next section
//     wipeTl.to(
//       nextContent,
//       {
//         opacity: 1,
//         duration: 1,
//         ease: "power2.out",
//       },
//       "-=0.8" // overlaps with bars growing
//     );

//     // Remove bars after wipe completes
//     wipeTl.to(
//       bars,
//       {
//         opacity: 0,
//         duration: 0.5,
//         pointerEvents: "none",
//       },
//       "-=0.3"
//     );
//   }, []);

//   useEffect(() => {
//     // EXISTING CODE (wipe animation)
//     // ...

//     // TEAM TRANSITION ANIMATION
//     const teamBars = gsap.utils.toArray(".team-bar");
//     const teamMembers = document.getElementById("team-members");

//     const teamTL = gsap.timeline({
//       scrollTrigger: {
//         trigger: "#team-transition",
//         start: "top center",
//         end: "top top",
//         scrub: true,
//       },
//     });

//     // Stagger bars from above
//     teamTL.fromTo(
//       teamBars,
//       { height: 0 },
//       {
//         height: "100%",
//         duration: 1.4,
//         ease: "power3.inOut",
//         stagger: 0.15,
//       }
//     );

//     // Fade in team members after bars settle
//     teamTL.to(
//       teamMembers,
//       {
//         opacity: 1,
//         duration: 1,
//         ease: "power2.out",
//       },
//       "-=0.5" // overlap a little
//     );
//   }, []);

// useEffect(() => {
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#quote-section",
//       start: "top 80%",
//       end: "top 10%",
//       scrub: 1.2,
//     },
//   });

//   // 1️⃣ Appear in hero section
//   tl.to("#floating-model", {
//     opacity: 1,
//     duration: 0.5,
//     ease: "power1.out",
//   });

//   // 2️⃣ Move model from center hero → position next to quote
//   tl.to("#floating-model", {
//     x: "-20vw",       // move LEFT or RIGHT depending on your layout
//     y: "20vh",        // move DOWN toward quote section
//     scale: 1.3,       // optional enlarge slightly
//     duration: 2,
//     ease: "power3.inOut",
//   });

//   // 3️⃣ Rotate while traveling
//   tl.to(
//     "#floating-model",
//     {
//       rotateY: "+=360",
//       duration: 2,
//       ease: "none",
//     },
//     "<" // start at SAME TIME as movement
//   );
// }, []);


//   return (
//     <div>
//       <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white">
//         <div
//           id="floating-model"
//           className="model-start w-[300px] h-[300px] md:w-[450px] md:h-[450px] mb-6"
//         >
//           <RendererTool
//             onProgress={setProgress}
//             onLoaded={() => setModelLoaded(true)}
//           >
//             <TeamZemoModel />
//           </RendererTool>
//         </div>

//         <h1 className="text-5xl md:text-[10rem] font-extrabold leading-none text-center">
//           Team Zemo
//         </h1>
//       </section>

//       <section
//         id="quote-section"
//         className="relative min-h-screen w-full flex items-center justify-between px-20 bg-white"
//       >
//         {/* LEFT — MODEL (starts off-screen left via GSAP) */}
//         <div
//           id="floating-model"
//           className="w-[260px] h-[260px] md:w-[380px] md:h-[380px] flex items-center justify-center"
//           style={{ opacity: 0 }} // start hidden
//         >
//           <RendererTool
//             onProgress={setProgress}
//             onLoaded={() => setModelLoaded(true)}
//           >
//             <TeamZemoModel />
//           </RendererTool>
//         </div>

//         {/* RIGHT — QUOTE */}
//         <div className="max-w-2xl text-left space-y-6 md:py-10">
//           <p className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
//             “Strength grows in the moments when you think you can’t go on but
//             you keep going anyway.”
//           </p>

//           <p className="text-lg md:text-xl text-gray-700">
//             Team Zemo believes in resilience, precision, and discipline. Every
//             setback is an instruction, every challenge a doorway, and every
//             victory a reminder that power belongs to the relentless.
//           </p>

//           <p className="text-xl md:text-2xl font-semibold text-gray-900">
//             — Team Zemo
//           </p>
//         </div>
//       </section>

//       <section>
//         <HorizontalProjects />
//       </section>

//       {/* <section
//   id="next-section"
//   className="relative min-h-screen w-full flex items-center justify-center bg-white overflow-hidden"
// >
//   <div 
//     className="flex flex-col gap-6"
//     id="stagger-cards"
//   >
//     <div className="w-64 h-32 bg-black text-white flex items-center justify-center text-xl font-bold rounded-md opacity-0 translate-x-20">
//       Mission
//     </div>
//     <div className="w-64 h-32 bg-black text-white flex items-center justify-center text-xl font-bold rounded-md opacity-0 translate-x-20">
//       Vision
//     </div>
//     <div className="w-64 h-32 bg-black text-white flex items-center justify-center text-xl font-bold rounded-md opacity-0 translate-x-20">
//       Projects
//     </div>
//     <div className="w-64 h-32 bg-black text-white flex items-center justify-center text-xl font-bold rounded-md opacity-0 translate-x-20">
//       About Us
//     </div>
//   </div>
// </section> */}

//       {/* Wipe Transition Section */}
//       <section
//         id="wipe-transition"
//         className="relative min-h-screen w-full bg-white overflow-hidden"
//       >
//         {/* Bars container */}
//         <div
//           id="bars-wrapper"
//           className="absolute inset-0 flex gap-2 pl-4 z-40"
//         >
//           {Array.from({ length: 10 }).map((_, i) => (
//             <div key={i} className="bar bg-black w-[8vw] h-0 origin-center" />
//           ))}
//         </div>

//         {/* Next Section Content */}
//         <div
//           id="next-content"
//           className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 z-30"
//         >
//           <h1 className="text-5xl md:text-8xl font-extrabold text-gray-900">
//             The Next Chapter
//           </h1>
//           <p className="text-lg md:text-2xl max-w-2xl text-gray-700 mt-6">
//             Power, precision, discipline — the core of Team Zemo’s legacy. This
//             is where the story continues.
//           </p>
//         </div>
//       </section>
//       {/* TEAM TRANSITION SECTION */}
//       <TeamReveal />
//       {/* <section
//         id="pre-red"
//         className="h-screen w-full bg-white flex items-center justify-center"
//       >
//         <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900">
//           Coming Up Next
//         </h1>
//       </section> */}
//       {/* RED WIPE TRANSITION SECTION */}
//       {/* <RedWipeTransition /> */}
//       <PostWipeFadeSection />
//       <FooterReveal />
//     </div>
//   );
// };

// export default HomePage;
