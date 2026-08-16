"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/data/dictionaries/types";

export function MobileNav({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center text-white"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open ? (
        <div id="mobile-nav-panel" className="fixed inset-x-0 top-16 border-b border-white/10 bg-near-black px-6 py-6">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {dict.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/80"
              >
                {item.label}
              </a>
            ))}
            <Link
              href={dict.nav.localeSwitchHref}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-white/50"
            >
              {dict.nav.localeSwitchLabel}
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
