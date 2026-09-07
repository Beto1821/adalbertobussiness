import Link from "next/link";
import Image from "next/image";

export function SiteHeader({ homeHref }: { homeHref: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-near-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={homeHref} aria-label="Adalberto Business" className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={36} height={36} priority className="rounded-sm" />
          <span className="text-sm font-semibold tracking-wide text-white">ADALBERTO BUSINESS</span>
        </Link>

      </div>
    </header>
  );
}
