import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HorizontalProjects from "../components/HorizontalProjects";
import TeamReveal from "../components/TeamReveal";
import PostWipeFadeSection from "../components/PostWipeFadeSection";
import FooterReveal from "../components/FooterReveal";
import TeamZemoModel from "../components/TeamZemoModel";
import RendererTool from "../tools/RendererTool";
import WipeTransition from "../components/WipeTransition";
import RedWipeTransition from "../components/RedWipeTransition";

gsap.registerPlugin(ScrollTrigger);

const HomePage = ({ setProgress, setModelLoaded }) => {
    const videoRef = useRef(null);
  const ctrl = useRef({
    x: 0,
    y: -0.6,
    z: 0,
    scale: 1.3,
    rotationY: 0,
  });

  useEffect(() => {
    const obj = ctrl.current;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#hero-section-id",
            start: "bottom bottom",
            endTrigger: "#quote-section",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })

        // PHASE 1 → rotate + move left (hero → quote)
        .to(obj, {
          x: -1.6,
          y: -0.6,
          rotationY: Math.PI * 2,
          ease: "none",
        })

        // PHASE 2 → shrink + fly to top-left (quote → exit)
        .to(obj, {
          x: -3.3,
          y: 1.3,
          scale: 0.18,
          ease: "power1.inOut",
        });
    });

    return () => ctx.revert();
  }, []);


useEffect(() => {
  if (!videoRef.current) return;

  const vid = videoRef.current;

  const st = ScrollTrigger.create({
    trigger: "#hero-section-id",
    start: "top top",
    end: "bottom top",
    scrub: true,

    onUpdate: (self) => {
      // scroll velocity (self.getVelocity()) gives px/sec
      const velocity = self.getVelocity();

      // convert scroll velocity to playback speed
      // tweak the 0.002 multiplier to adjust responsiveness
      const speed = 1 + velocity * 0.002;

      // clamp speed so it never gets crazy
      const clamped = Math.min(Math.max(speed, 0.3), 3);

      vid.playbackRate = clamped;
    },
  });

  return () => st.kill();
}, []);


// MODEL RETURNS TO RIGHT AT FOOTER
useEffect(() => {
  const obj = ctrl.current;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#footer-section",
      start: "top center",
      end: "top bottom",
      scrub: 2,
    },
  });

  tl.to(obj, {
    x: 1.5,       // move model to right side
    y: -0.7,      // same vertical position as hero
    scale: 1.3,   // full size again
    rotationY: 0, // reset rotation
    ease: "ease3.out",
    duration: 1.5,
  });

  return () => tl.kill();
}, []);


  return (
    <div className="relative">
      <div className="fixed inset-0 z-10 pointer-events-none">
        <RendererTool
          onProgress={setProgress}
          onLoaded={() => setModelLoaded(true)}
        >
          <TeamZemoModel controlRef={ctrl} />
        </RendererTool>
      </div>



<section
  id="hero-section-id"
  className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
>
  {/* VIDEO LAYER */}
  <div className="absolute inset-0 overflow-hidden">
<video
  ref={videoRef}
  src="/mainBG.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="
    absolute inset-0 w-full h-full object-cover
    [mask-image:linear-gradient(
      to_bottom,
      black 0%, black 40%,
      rgba(0,0,0,0.7) 60%,
      transparent 100%
    )]
    [mask-size:100%_100%]
    backdrop-blur-[18px]
  "
  style={{
    filter: "saturate(1.1) brightness(1.08)",
    WebkitMaskImage:
      "linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.7) 60%, transparent 100%)",
  }}
/>

  </div>

  {/* 🔥 PINK COLOR RISING BEHIND THE VIDEO (THE REAL MAGIC) */}
  <div
    className="absolute bottom-0 left-0 w-full h-[28vh] pointer-events-none"
    style={{
      background:
        "linear-gradient(to bottom, rgba(255,190,210,0) 0%, rgba(255,190,210,0.45) 40%, rgba(255,190,210,0.55) 100%)",
    }}
  />

  {/* SPACER FOR MODEL */}
  <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px]" />

  <h1 className="text-5xl md:text-[12rem] font-extrabold text-black relative z-5">
    Team Zemo
  </h1>
</section>




<section
  id="quote-section"
  className="relative min-h-screen w-full flex items-center justify-end pr-20
             bg-[rgba(255,190,210,0.55)]"
>
  <div className="max-w-2xl space-y-6">
    <p className="text-5xl font-bold text-gray-900">
      "Strength grows in the moments when you think you can’t go on
      but you keep going anyway."
    </p>

    <p className="text-xl text-gray-800">
      Team Zemo believes in resilience, precision, and discipline.
    </p>

    <p id="rotation-end-marker" className="text-2xl font-semibold text-gray-900">
      — Team Zemo
    </p>
  </div>
</section>




      <HorizontalProjects />
      <WipeTransition />
      <TeamReveal />
      {/* <RedWipeTransition /> */}
      <PostWipeFadeSection />
      <FooterReveal />
    </div>
  );
};

export default HomePage;
