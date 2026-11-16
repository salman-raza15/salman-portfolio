"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: "01",
    label: "A CLEAR DIRECTION",
    word: "IMAGINE.",
    description: "Start with the problem. Find the possibility.",
  },
  {
    number: "02",
    label: "THOUGHTFULLY BUILT",
    word: "ENGINEER.",
    description: "Interfaces, intelligence, and everything underneath.",
  },
  {
    number: "03",
    label: "SOMETHING REAL",
    word: "LAUNCH.",
    description: "Turn the next big idea into something people can use.",
  },
];

export default function ImagineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const orbit = orbitRef.current;
    if (!section || !orbit) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));

      const index = Math.min(2, Math.floor(progress * 3));
      setActive((previous) => previous === index ? previous : index);

      orbit.style.transform =
        `translate(-50%, -50%) rotate(${progress * 100}deg)`;

      section.querySelectorAll<HTMLElement>(".imagine-project").forEach(
        (card, i) => {
          const offset = (progress - 0.5) * 140 * (i % 2 ? -1 : 1);
          const rotation = (progress - 0.5) * (i % 2 ? -16 : 16);
          const depth = 1 + Math.sin(progress * Math.PI) * 0.08;

          card.style.transform =
            `translate3d(0, ${offset}px, 0) rotateY(${rotation}deg) scale(${depth})`;
        }
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const current = stages[active];

  return (
    <section id="imagine" className="imagine-section" ref={sectionRef}>
      <div className="imagine-sticky" ref={stageRef}>
        <div className="imagine-top">
          <span>IDEAS INTO EXPERIENCES</span>
          <span>DESIGNED & BUILT BY SYED SALMAN RAZA</span>
        </div>

        <div className="imagine-orbit-system" ref={orbitRef} aria-hidden="true">
          <div className="imagine-ring ring-one" />
          <div className="imagine-ring ring-two" />
          <div className="imagine-ring ring-three" />
          <div className="imagine-ring ring-four" />
          <span className="imagine-dot dot-one" />
          <span className="imagine-dot dot-two" />
          <span className="imagine-dot dot-three" />
          <span className="imagine-sphere sphere-one" />
          <span className="imagine-sphere sphere-two" />
        </div>



        <div className="imagine-project imagine-project-left">
          <div className="imagine-project-top">
            <span className="premium-window-dots"><i/><i/><i/></span>
            <span>AI EVALUATION / 01</span>
          </div>

          <div className="premium-project-preview premium-ai-preview">
            <div className="premium-preview-heading">
              <span>ASSIGNMENT ANALYSIS</span>
              <span className="premium-live-dot">● LIVE</span>
            </div>

            <div className="premium-ai-score-row">
              <div className="premium-score-ring">
                <strong>92<span>%</span></strong>
              </div>
              <div className="premium-score-info">
                <small>OVERALL SCORE</small>
                <strong>Excellent work</strong>
                <span>AI-powered evaluation</span>
              </div>
            </div>

            <div className="premium-metric">
              <span>Content Quality</span>
              <div><i style={{width:"92%"}} /></div>
            </div>
            <div className="premium-metric">
              <span>Structure & Clarity</span>
              <div><i style={{width:"86%"}} /></div>
            </div>
            <div className="premium-metric">
              <span>Originality</span>
              <div><i style={{width:"96%"}} /></div>
            </div>
          </div>

          <div className="imagine-project-bottom">
            AI / EDUCATION TECHNOLOGY
          </div>
        </div>

        <div className="imagine-project imagine-project-right">
          <div className="imagine-project-top">
            <span className="premium-window-dots"><i/><i/><i/></span>
            <span>ESTATEHUB / 02</span>
          </div>

          <div className="premium-project-preview premium-estate-preview">
            <div className="premium-preview-heading">
              <span>PROPERTY EXPLORER</span>
              <span className="premium-estate-status">● ACTIVE</span>
            </div>

            <div className="premium-property-art">
              <div className="premium-building building-one" />
              <div className="premium-building building-two" />
              <div className="premium-building building-three" />
              <div className="premium-building building-four" />
              <span className="premium-property-tag">FEATURED PROPERTY</span>
            </div>

            <div className="premium-property-info">
              <strong>Modern Urban Living</strong>
              <span>Discover your next space ↗</span>
            </div>

            <div className="premium-property-stats">
              <span>PROPERTY SEARCH</span>
              <span>SMART FILTERS</span>
            </div>
          </div>

          <div className="imagine-project-bottom">
            REAL ESTATE / PLATFORM
          </div>
        </div>

        <div className="imagine-center" aria-live="polite">
          <span className="imagine-step">
            {current.number} / {current.label}
          </span>
          <div className="imagine-word-stage">
            <h2 key={current.word} className="imagine-word cinematic-word">
              {current.word}
            </h2>
          </div>
          <p key={current.description} className="imagine-description cinematic-description">
            {current.description}
          </p>
        </div>

        <div className="imagine-bottom">
          <span>↓ &nbsp; SCROLL TO SEE IT TAKE SHAPE</span>
          <a href="#projects">Explore the work <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}
