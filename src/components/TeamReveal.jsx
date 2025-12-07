// src/components/TeamReveal.jsx
import React, {useEffect, useRef} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
    {
        name: "Uday Khare",
        role: "DevOPs Wizard",
        img: "/team/UdayCharacter.png",
        codeName: "Arbiter",
        github: "https://github.com/UdayKhare09"
    },
    {
        name: "Ratan Tiwari",
        role: "Backend Specialist",
        img: "/team/RatanCharacter.png",
        codeName: "Blaze",
        github: "https://github.com/RatanTiwari07"
    },
    {
        name: "Tanishq Tiwari",
        role: "Frontend Designer",
        img: "/team/TanishqCharacter.png",
        codeName: "Kakashi",
        github: "https://github.com/tanishqtiwari7"
    },
    {
        name: "Surendra Singh Chouhan",
        role: "Backend Architect",
        img: "/team/SuriiCharacter.png",
        codeName: "Phantom",
        github: "https://github.com/Surendra1341"
    },
    {
        name: "Yadveer Singh Pawar",
        role: "UI Developer",
        img: "/team/YadveerCharacter.png",
        codeName: "Cipher",
        github: "https://github.com/Yadveer1"
    },
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

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            tl.fromTo(bars, {height: 0}, {
                height: "100%",
                ease: "power3.inOut",
                duration: 1,
                stagger: 0.08,
            });

            tl.fromTo(
                "#team-members .member-item",
                {opacity: 0, y: 20},
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "-=0.6"
            );

            tl.fromTo(
                redPanel,
                {x: "-100%"},
                {
                    x: "0%",
                    duration: 1.3,
                    ease: "power3.inOut",
                },
                "+=0.3"
            );

            tl.fromTo(
                redText,
                {opacity: 0, y: 40},
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power2.out",
                },
                "-=0.5"
            );

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
            className="relative min-h-screen w-full overflow-hidden bg-gray-300"
        >
            {/* BARS */}
            <div className="absolute inset-0 grid grid-cols-5 px-4 md:px-10 z-10 gap-2 md:gap-4">
                {TEAM.map((_, i) => (
                    <div key={i} className="flex justify-center h-full group">
                        <div
                            className="
                                team-bar w-full max-w-[15vw] h-full bg-gray-900 origin-top
                                transition-all duration-300
                                group-hover:shadow-[0_0_20px_rgba(255,255,255,0.45)]
                            "
                        />
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
                        onClick={() => window.open(member.github, "_blank")}
                        className="
                            member-item pointer-events-auto cursor-pointer
                            flex flex-col items-center justify-center text-center text-white h-full
                            transition-all duration-300 group relative
                        "
                    >

                        {/* FIXED CODENAME (INSIDE IMAGE WRAPPER) */}
                        <div className="relative w-full max-w-[12vw] mb-6">
                            <p
                                className="
                                    absolute -top-10 left-1/2 -translate-x-1/2
                                    text-xs md:text-sm font-semibold tracking-wider
                                    text-red-400
                                    opacity-0 group-hover:opacity-100
                                    transition-all duration-300 z-30
                                "
                            >
                                {member.codeName}
                            </p>

                            {/* IMAGE */}
                            <img
                                src={member.img}
                                alt={member.name}
                                className="
                                    w-full h-full object-cover opacity-90 relative z-20
                                    transition-transform duration-500
                                    ease-[cubic-bezier(0.22,0.61,0.36,1)]
                                    group-hover:scale-110
                                "
                            />
                        </div>

                        {/* NAME + ROLE */}
                        <div className="w-full px-2 flex flex-col items-center relative">
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

            {/* RED PANEL */}
            <div
                ref={redPanelRef}
                className="absolute inset-0 bg-red-600 flex items-center justify-center z-[40]"
                style={{transform: "translateX(-100%)"}}
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
