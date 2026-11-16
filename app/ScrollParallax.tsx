"use client";

import { useEffect } from "react";

export default function ScrollParallax() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reduceMotion.matches) return;

    const targets = document.querySelectorAll<HTMLElement>(
      "#about h1, #about h2, #projects h2"
    );

    let frame = 0;

    const update = () => {
      frame = 0;

      targets.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = center - window.innerHeight / 2;

        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          return;
        }

        const movement = Math.max(
          -22,
          Math.min(22, -distance * 0.035)
        );

        element.style.translate = `0 ${movement}px`;
      });
    };

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      targets.forEach((element) => {
        element.style.removeProperty("translate");
      });
    };
  }, []);

  return null;
}
