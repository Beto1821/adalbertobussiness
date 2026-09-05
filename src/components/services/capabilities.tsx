import type { Dictionary } from "@/data/dictionaries/types";
import { CardGrid } from "@/components/ui/card-grid";

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
        <CardGrid items={dict.capabilities.items} columns={4} />
      </div>
    </section>
  );
}
