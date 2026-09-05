import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/data/dictionaries/types";
import { MobileNav } from "@/components/navigation/mobile-nav";

export function SiteHeader({ dict, homeHref }: { dict: Dictionary; homeHref: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-near-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={homeHref} aria-label="Adalberto Business" className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={36} height={36} priority className="rounded-sm" />
          <span className="text-sm font-semibold tracking-wide text-white">ADALBERTO BUSINESS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {dict.nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <MobileNav dict={dict} />
      </div>
    </header>
  );
}
