"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

export type CardGridItem = {
  title: string;
  description: string;
  cta: string;
  href: string;
};

export function CardGrid({ items, columns = 4 }: { items: CardGridItem[]; columns?: 2 | 3 | 4 }) {
  const columnsClass =
    columns === 2 ? "lg:grid-cols-2" : columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <LazyMotion features={domAnimation}>
      <div className={`mt-14 grid gap-6 sm:grid-cols-2 ${columnsClass}`}>
        {items.map((item) => (
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
  );
}
