"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return;

    const selector = [
      "#about h1",
      "#about h2",
      "#about p",
      "#about .reference-intro-title",
      "#capabilities h2",
      "#capabilities h3",
      "#capabilities .capability-row",
      "#projects h2",
      "#projects h3",
      "#projects .work-list-item",
      "#journey .career-eyebrow",
      "#journey .career-heading",
      "#journey .career-stage",
      "#journey .career-outro",
      "#journey .journey-heading",
      "#journey .journey-item",
      "#contact .contact-topline",
      "#contact .contact-eyebrow",
      "#contact .contact-heading",
      "#contact .contact-email",
      "#contact .contact-links",
      "#contact .contact-footer"
    ].join(", ");

    const observed = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            el.classList.add("scroll-visible");
          } else {
            el.classList.remove("scroll-visible");
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    function register() {
      document.querySelectorAll<HTMLElement>(selector)
        .forEach((el) => {
          if (observed.has(el)) return;

          observed.add(el);

          el.classList.add("scroll-reveal");

          if (el.getBoundingClientRect().top < window.innerHeight * 0.9 &&
              el.getBoundingClientRect().bottom > 0) {
            el.classList.add("scroll-visible");
          }

          observer.observe(el);
        });
    }

    // Delay DOM changes until hydration has completed.
    const timer = window.setTimeout(register, 800);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
