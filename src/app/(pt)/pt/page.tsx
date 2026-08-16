import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/hero/hero";
import { Positioning } from "@/components/sections/positioning";
import { Capabilities } from "@/components/services/capabilities";
import { pt } from "@/data/dictionaries/pt";

export default function PortugueseHome() {
  return (
    <main>
      <SiteHeader dict={pt} homeHref="/pt" />
      <Hero dict={pt} />
      <Positioning dict={pt} />
      <Capabilities dict={pt} />
    </main>
  );
}
