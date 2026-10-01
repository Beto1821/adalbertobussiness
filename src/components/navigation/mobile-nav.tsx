"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ContactDialog } from "@/components/contact/contact-dialog";
import type { Dictionary } from "@/data/dictionaries/types";

export function MobileNav({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? dict.nav.closeMenuLabel : dict.nav.openMenuLabel}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber"
      >
        {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
      </button>

      {open ? (
        <div id="mobile-nav-panel" className="fixed inset-x-0 top-16 border-b border-white/10 bg-near-black px-6 py-6">
          <nav className="flex flex-col items-start gap-4" aria-label="Navegação principal">
            {dict.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/80 transition-colors hover:text-brand-amber"
              >
                {item.label}
              </a>
            ))}
            <ContactDialog
              dict={dict}
              triggerClassName="text-base font-medium text-white/80 transition-colors hover:text-brand-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber"
            />
          </nav>
        </div>
      ) : null}
    </div>
  );
}
