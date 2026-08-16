"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/data/dictionaries/types";

export function Hero({ dict }: { dict: Dictionary }) {
  const scopeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !scopeRef.current) return;

    const targets = scopeRef.current.querySelectorAll("[data-hero-animate]");
    const tween = gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 }
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section ref={scopeRef} id="hero" className="flex min-h-screen flex-col justify-center bg-near-black px-6 pt-16">
      <div className="mx-auto w-full max-w-4xl">
        <p data-hero-animate className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-purple-text">
          {dict.hero.eyebrow}
        </p>
        <h1 data-hero-animate className="text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
          {dict.hero.headline}
        </h1>
        <p data-hero-animate className="mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
          {dict.hero.subheadline}
        </p>
        <div data-hero-animate className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className="h-12 px-6 hover:bg-electric-purple">
            <a href="#cta">{dict.hero.primaryCta}</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-6 bg-transparent border-white/20 text-white hover:border-white/40 hover:bg-transparent hover:text-white">
            <a href="#cta">{dict.hero.secondaryCta}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
