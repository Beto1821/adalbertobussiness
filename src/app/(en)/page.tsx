import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/hero/hero";
import { en } from "@/data/dictionaries/en";

export default function EnglishHome() {
  return (
    <main>
      <SiteHeader dict={en} homeHref="/" />
      <Hero dict={en} />
    </main>
  );
}
