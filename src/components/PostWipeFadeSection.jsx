// src/components/PostWipeFadeSection.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PostWipeFadeSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#post-wipe",
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="post-wipe"
      ref={sectionRef}
      className="min-h-screen w-full bg-white flex items-center justify-center px-10"
    >
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">
          Follow Team Zemo
        </h1>

        <p className="text-lg md:text-2xl text-gray-600 leading-relaxed">
          Strength. Precision. Discipline.  
          If these words mean something to you,  
          you already think like one of us.
        </p>
<a href="https://github.com/Team-Zemo" target="_blank" rel="noopener noreferrer">

        <button className="mt-6 px-10 py-4 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition-all duration-300 z-50">
          Become a Member
        </button>
</a>
      </div>
    </section>
  );
};

export default PostWipeFadeSection;



