import type { Dictionary } from "@/data/dictionaries/types";
import { CardGrid } from "@/components/ui/card-grid";

export function Tiers({ dict }: { dict: Dictionary }) {
  if (!dict.tiers) return null;

  return (
    <section id="tiers" className="border-t border-white/10 bg-near-black px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-purple-text">
            {dict.tiers.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {dict.tiers.title}
          </h2>
        </div>
        <CardGrid items={dict.tiers.items} columns={3} />
      </div>
    </section>
  );
}
