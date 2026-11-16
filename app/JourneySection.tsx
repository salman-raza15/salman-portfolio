"use client";

import { useEffect, useRef, useState } from "react";

const milestones = [
  {
    number: "01",
    period: "APR — SEP 2026",
    year: "2026",
    title: "AI & Agentic Development Bootcamp",
    organization: "Mari Energies Employment-Based Bootcamp",
    type: "LEARNING PHASE",
    description:
      "Practical training in AI agents, intelligent applications, API development, n8n, Make.com and workflow automation.",
    tags: ["AI AGENTS", "N8N", "MAKE.COM", "APIs"],
  },
  {
    number: "02",
    period: "SEP 2026 — PRESENT",
    year: "NOW",
    title: "Junior Software Engineer",
    organization: "Xloop Digital",
    type: "PROFESSIONAL PHASE",
    description:
      "Building software applications, backend APIs, Agentic AI solutions and intelligent automation workflows.",
    tags: ["PYTHON", "FASTAPI", "AGENTIC AI", "AUTOMATION"],
  },
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reduced.matches) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;

      const start = viewport * 0.85;
      const end = viewport * 0.2;

      const total = rect.height + start - end;
      const current = start - rect.top;

      const value = Math.max(
        0,
        Math.min(1, current / total)
      );

      setProgress((previous) =>
        Math.abs(previous - value) > 0.003 ? value : previous
      );
    };

    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", schedule, {
      passive: true
    });
    window.addEventListener("resize", schedule);

    update();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="career-section"
      style={{
        ["--career-progress" as string]: progress,
      }}
    >
      <div className="career-container">
        <div className="career-header">
          <div>
            <p className="career-eyebrow">
              LEARNING / BUILDING / SHIPPING
            </p>
            <h2 className="career-heading">
              THE <span>JOURNEY.</span>
            </h2>
          </div>

          <div className="career-header-aside">
            <span className="career-header-dot" />
            <span>
              FROM LEARNING
              <br />
              TO BUILDING.
            </span>
          </div>
        </div>

        <div className="career-stage">
          <div className="career-stage-top">
            <span>CAREER PROGRESSION</span>
            <span>2026 — PRESENT</span>
          </div>

          <div className="career-path">
            <div className="career-path-track">
              <div className="career-path-fill" />
            </div>

            {milestones.map((item, index) => (
              <div
                key={item.number}
                className={`career-milestone career-milestone-${index + 1}`}
              >
                <div className="career-node-wrap">
                  <div className="career-node">
                    <span>{item.number}</span>
                  </div>
                  <span className="career-node-date">
                    {item.period}
                  </span>
                </div>

                <div className="career-card">
                  <div className="career-card-top">
                    <span>{item.type}</span>
                    <span className="career-card-icon">
                      ↗
                    </span>
                  </div>

                  <span className="career-card-year">
                    {item.year}
                  </span>

                  <h3>{item.title}</h3>
                  <p className="career-organization">
                    {item.organization}
                  </p>
                  <p>{item.description}</p>

                  <div className="career-card-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="career-stage-bottom">
            <span>THE FOUNDATION</span>
            <span>THE NEXT CHAPTER</span>
          </div>
        </div>

        <div className="career-outro">
          <span className="career-outro-star">✳</span>
          <p>
            ALWAYS LEARNING.
            <br />
            <strong>ALWAYS BUILDING.</strong>
          </p>
          <span className="career-outro-index">
            02 MILESTONES / ONE JOURNEY
          </span>
        </div>
      </div>
    </section>
  );
}
