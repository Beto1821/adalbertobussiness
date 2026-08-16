import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/hero/hero";
import { pt } from "@/data/dictionaries/pt";

export default function PortugueseHome() {
  return (
    <main>
      <SiteHeader dict={pt} homeHref="/pt" />
      <Hero dict={pt} />
    </main>
  );
}
