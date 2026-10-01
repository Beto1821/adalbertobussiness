"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Atom,
  Braces,
  Cloud,
  Coffee,
  Database,
  FileCode,
  Hexagon,
  Infinity as InfinityIcon,
  Workflow,
  type LucideIcon
} from "lucide-react";
import type { Dictionary } from "@/data/dictionaries/types";

const ICONS: Record<string, LucideIcon> = {
  Python: Braces,
  PHP: FileCode,
  Java: Coffee,
  "JavaScript/TypeScript": Braces,
  React: Atom,
  "Node.js": Hexagon,
  ".NET": InfinityIcon,
  DevOps: Workflow,
  Cloud: Cloud,
  Databases: Database
};

export function Technology({ dict }: { dict: Dictionary }) {
  const technology = dict.technology;
  if (!technology) return null;

  return (
    <section
      id="technology"
      className="relative overflow-hidden border-t border-white/10 px-6 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-purple-text">
              {technology.eyebrow}
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {technology.title}
            </h2>
          </m.div>

          <m.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {technology.items.map((item) => {
              const Icon = ICONS[item.name] ?? Braces;
              return (
                <m.div
                  key={item.name}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 hover:border-electric-purple/60"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full bg-electric-purple/40 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <Icon aria-hidden className="relative h-8 w-8 shrink-0 text-electric-purple-text" />
                  <span className="relative text-base font-medium text-white">{item.name}</span>
                </m.div>
              );
            })}
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
}
