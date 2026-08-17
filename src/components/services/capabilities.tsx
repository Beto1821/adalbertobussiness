"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import type { Dictionary } from "@/data/dictionaries/types";

export function Capabilities({ dict }: { dict: Dictionary }) {
  return (
    <section id="capabilities" className="border-t border-white/10 bg-near-black px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-purple-text">
            {dict.capabilities.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {dict.capabilities.title}
          </h2>
        </div>

        <LazyMotion features={domAnimation}>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.capabilities.items.map((item) => (
              <m.div
                key={item.title}
                whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.4)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col rounded-lg border border-white/15 p-6 transition-[transform,border-color] duration-200 ease-out focus-within:border-white/40 motion-safe:focus-within:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{item.description}</p>
                <a href={item.href} className="mt-6 text-sm font-semibold text-electric-purple-text hover:text-white">
                  {item.cta} →
                </a>
              </m.div>
            ))}
          </div>
        </LazyMotion>
      </div>
    </section>
  );
}
