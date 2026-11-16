"use client";
import JourneySection from "./JourneySection";
import ContactSection from "./ContactSection";


import ImagineSection from "./ImagineSection";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

function Sculpture() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.2;
    mesh.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });

  return (
    <Float speed={1.5} floatIntensity={0.8}>
      <mesh ref={mesh} scale={2}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color="#a6a6a6"
          metalness={0.9}
          roughness={0.2}
          distort={0.3}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

export default function Home() {
  const container = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "contact"];

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      let current = "home";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Existing section reveal
      gsap.from(".reveal", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Repeating fade-in on scroll up and down
      [
        ".hero-title-inner",
        ".hero-portrait img",
        ".about-card-photo",
      ].forEach((selector) => {
        gsap.fromTo(
          selector,
          {
            autoAlpha: 0,
            y: 65,
            scale: 0.96,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: selector,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Hero parallax
      gsap.to(".hero-title", {
        y: -130,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // About heading
      gsap.fromTo(
        ".about-section h2",
        { y: 100, opacity: 0, filter: "blur(12px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // About paragraphs
      gsap.fromTo(
        ".about-section p",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main ref={container} className="portfolio">
      <nav className="navbar">
        <div className="brand">SALMAN RAZA<span>.</span></div>
        <div className="nav-links">
          <a href="#home" className={activeSection === "home" ? "nav-active" : ""}>Home</a>
          <a href="#about" className={activeSection === "about" ? "nav-active" : ""}>About</a>
          <a href="#projects" className={activeSection === "projects" ? "nav-active" : ""}>Projects</a>
          <a href="#contact" className={activeSection === "contact" ? "nav-active" : ""}>Contact</a>
        </div>
        <a href="#contact" className="contact-link">
          LET&apos;S TALK <ArrowUpRight size={17} />
        </a>
      </nav>

      <section id="home" className="hero hero-reference">

        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-three" aria-hidden="true" />
        <span className="hero-orbit-dot" aria-hidden="true" />

        <h1 className="hero-title" aria-label="PORTFOLIO">
          <span className="hero-title-inner" aria-hidden="true">
            PORTFOLIO
          </span>
        </h1>

        <div className="hero-portrait" aria-hidden="true">
          <img src="/salman-hero.png" alt="" />
        </div>

        <div className="hero-content reveal">
          <div className="hero-reference-role">
            <h2>Software <em>Developer</em></h2>
            <p>&amp; AI Engineer</p>
          </div>

          <div className="hero-reference-actions">
            <a href="#about" className="hero-reference-arrow" aria-label="Explore portfolio">
              ↙
            </a>
            <a href="#contact" className="hero-reference-contact">
              Contact
            </a>
          </div>
        </div>

      </section>

      <section id="about" className="reference-intro">
  <div className="reference-intro-grid">
    <div className="reference-intro-portrait">
      <div className="reference-intro-placeholder">
        <img className="about-card-photo" src="/salman-hero.png" alt="Syed Salman Raza" />
        <small>SYED SALMAN RAZA</small>
      </div>
    </div>

    <div className="reference-intro-right">
      <h2 className="reference-intro-title">Intro</h2>

      <div className="reference-intro-card">
        <p>
          Hey, I&apos;m <strong>Syed Salman Raza.</strong> A software
          developer passionate about transforming ideas into
          modern, purposeful digital experiences.
        </p>

        <p>
          I develop across the stack — from responsive
          <strong> Next.js</strong> interfaces
          to reliable <strong>Python</strong> and <strong>FastAPI</strong>{" "}backend systems, with a growing focus on automation
          and intelligent workflows. I also focus on <strong>Agentic AI</strong>, intelligent automation, and AI-powered workflows.</p>

        <p>
          My work includes <strong>AI Assignment Evaluation System</strong>, a video clipping
          platform, and <strong>EstateHub</strong>, a property
          discovery and management application.
        </p>

        <p>
          I&apos;m driven by curiosity, clean engineering,
          and building software that solves real problems.
        </p>

        <a href="#projects" className="reference-intro-link">
          EXPLORE MY WORK <span>↗</span>
        </a>
      </div>
    </div>
  </div>
</section>

      <ImagineSection />


      <section id="capabilities" className="capabilities-section">
        <div className="capabilities-heading-area">
          <span className="capabilities-eyebrow">
            THE TOOLKIT / WHAT I BUILD
          </span>
          <h2>WHAT I<br /><span>CAN DO</span></h2>
        </div>

        <div className="capabilities-list">
          {[
            {
              number: "01",
              title: "AI & AGENTIC DEVELOPMENT",
              skills: "LLMs · AI Agents · Prompt Engineering · AI Evaluation · Azure AI"
            },
            {
              number: "02",
              title: "BACKEND & API DEVELOPMENT",
              skills: "Python · FastAPI · REST APIs · SQL · PostgreSQL · psycopg2"
            },
            {
              number: "03",
              title: "WORKFLOW AUTOMATION",
              skills: "n8n · Make.com · AI-powered workflows"
            },
            {
              number: "04",
              title: "DASHBOARDS & DEVELOPMENT TOOLS",
              skills: "Streamlit · Next.js · Dashboard Development · Git · GitHub · VS Code"
            }
          ].map((item) => (
            <details className="capability-item" key={item.number}>
              <summary>
                <span className="capability-number">{item.number}</span>
                <span className="capability-title">{item.title}</span>
                <span className="capability-arrow">↘</span>
              </summary>
              <div className="capability-details">
                {item.skills}
              </div>
            </details>
          ))}
        </div>
      </section>

      
      <section id="projects" className="work-list-section">
        <div className="work-list-heading">
          <span>A SELECTION OF WHAT I BUILD</span>
          <h2>SELECTED <em>WORK.</em></h2>
          <p>
            From intelligent assistants to real-world
            platforms. Ideas engineered into something useful.
          </p>
        </div>
        <div className="work-list">

          <article className="work-list-item">
            <span className="work-index">01</span>
            <div className="work-content">
              <h3>AI Assignment Evaluation System</h3>
              <p>An AI-powered evaluation platform that supports assignment assessment, rubric generation, and structured scoring.</p>
              <div className="work-tags"><span className="work-tag">AI Evaluation</span><span className="work-tag">Rubric Generation</span></div>
            </div>
            <span className="work-arrow">↗</span>
          </article>

          <article className="work-list-item">
            <span className="work-index">02</span>
            <div className="work-content">
              <h3>AI Voice Receptionist</h3>
              <p>A multilingual conversational AI receptionist that handles restaurant reservations, customer interactions, and calendar scheduling.</p>
              <div className="work-tags"><span className="work-tag">ElevenLabs</span><span className="work-tag">n8n</span><span className="work-tag">Gemini API</span><span className="work-tag">Google Calendar</span></div>
            </div>
            <span className="work-arrow">↗</span>
          </article>

          <article className="work-list-item">
            <span className="work-index">03</span>
            <div className="work-content">
              <h3>AI Language Translator</h3>
              <p>A multilingual translation platform integrating AI models with text and voice functionality.</p>
              <div className="work-tags"><span className="work-tag">React</span><span className="work-tag">FastAPI</span><span className="work-tag">Azure AI</span><span className="work-tag">GPT</span></div>
            </div>
            <span className="work-arrow">↗</span>
          </article>

          <article className="work-list-item">
            <span className="work-index">04</span>
            <div className="work-content">
              <h3>AI Personal Assistant</h3>
              <p>An intelligent chatbot and voice assistant with live web research and latest news retrieval.</p>
              <div className="work-tags"><span className="work-tag">React</span><span className="work-tag">Vite</span><span className="work-tag">AI Chatbot</span><span className="work-tag">Voice</span></div>
            </div>
            <span className="work-arrow">↗</span>
          </article>

          <article className="work-list-item">
            <span className="work-index">05</span>
            <div className="work-content">
              <h3>EstateHub</h3>
              <p>A full-stack real estate platform for property discovery, listing management, and buyer-seller interactions.</p>
              <div className="work-tags"><span className="work-tag">Next.js</span><span className="work-tag">FastAPI</span><span className="work-tag">PostgreSQL</span></div>
            </div>
            <span className="work-arrow">↗</span>
          </article>
        </div>
      </section>
          <JourneySection />
      <ContactSection />
      </main>
  );
}
