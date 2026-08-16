"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dictionary } from "@/data/dictionaries/types";

gsap.registerPlugin(ScrollTrigger);

export function Positioning({ dict }: { dict: Dictionary }) {
  const scopeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !scopeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: scopeRef.current,
            start: "top 80%"
          }
        }
      );
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={scopeRef} id="positioning" className="border-t border-white/10 bg-near-black px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <p data-reveal className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-purple-text">
          {dict.positioning.eyebrow}
        </p>
        <h2 data-reveal className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          {dict.positioning.title}
        </h2>
        <p data-reveal className="mt-6 text-lg text-white/70">
          {dict.positioning.body}
        </p>
      </div>
    </section>
  );
}
