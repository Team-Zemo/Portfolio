import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import HeroSection       from "../components/HeroSection";
import WorkSection       from "../components/WorkSection";
import QuoteTransition   from "../components/QuoteTransition";
import AboutSection      from "../components/AboutSection";
import CommunitySection  from "../components/CommunitySection";
import FooterSection     from "../components/FooterSection";

gsap.registerPlugin(ScrollTrigger);

const HomePage = ({ setProgress, setModelLoaded }) => {
  return (
    <div className="relative">
      <HeroSection setProgress={setProgress} setModelLoaded={setModelLoaded} />
      <WorkSection />
      <QuoteTransition />
      <AboutSection />
      <CommunitySection />
      <FooterSection />
    </div>
  );
};

export default HomePage;
