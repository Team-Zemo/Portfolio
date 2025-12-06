import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WipeTransition() {
    const wrapperRef = useRef(null);
    const panelRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const panel = panelRef.current;
        const content = contentRef.current;

        // Ensure ScrollTrigger instance is only created once
        if (!wrapper) return;

        // Kill any existing ScrollTriggers on the element to prevent duplicates
        ScrollTrigger.getById("wipe-transition-tl")?.kill();

        gsap.timeline({
            scrollTrigger: {
                id: "wipe-transition-tl",
                trigger: wrapper,
                start: "top bottom",    // Starts when top of section hits bottom of viewport
                end: "center center",  // Animation finishes when center of section hits center of viewport
                scrub: true,
                // pin: true, // You may re-add 'pin: true' if you want the screen to freeze during the wipe
            },
        })
        .fromTo(
            panel,
            { x: "100%" }, // Starts fully off-screen right
            {
                x: "0%",     // Ends fully covering the screen
                ease: "power3.inOut",
            }
        )
        .fromTo(
            content,
            { opacity: 0 },
            {
                opacity: 1,
                ease: "power2.out",
            },
            // The content should fade in slightly after the panel starts moving
            "-=0.7" 
        );
        
        // Add a second timeline to remove the panel
        gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: "center center", // Starts when the wipe panel is fully on screen
                end: "bottom top",      // Ends when the section leaves the viewport
                scrub: true,
            },
        })
        .to(
            panel,
            {
                x: "-100%", // Move panel off-screen left to reveal the content permanently
                ease: "power3.inOut",
            }
        )
        // Ensure content is fully visible and stays visible
        .to(
            content,
            {
                opacity: 1,
            },
            0 // Start this part of the content animation immediately
        );

    }, []);

return (
    <section
        ref={wrapperRef}
        className="relative w-full h-screen overflow-hidden"
    >
        {/* BACKGROUND IMAGE */}
        <div
            className="absolute inset-0 z-0"
            style={{
                backgroundImage: "url('/nextBG.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backdropFilter: "blur(4px)",
            }}
        />

        {/* WIPE PANEL */}
        <div
            ref={panelRef}
            className="absolute inset-0 bg-gray-900 z-20"
        />

        {/* CONTENT */}
        <div
            ref={contentRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 text-white z-30"
        >
            <h1 className="text-6xl font-extrabold">
                Meet The Team
            </h1>
            <p className="text-xl mt-6 max-w-2xl">
                Discipline. Precision. Dominance. This is where Team Zemo truly begins.
            </p>
        </div>
    </section>
);

}