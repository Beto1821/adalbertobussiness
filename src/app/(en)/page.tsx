import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/hero/hero";
import { Positioning } from "@/components/sections/positioning";
import { Capabilities } from "@/components/services/capabilities";
import { en } from "@/data/dictionaries/en";

export default function EnglishHome() {
  return (
    <main>
      <SiteHeader dict={en} homeHref="/" />
      <Hero dict={en} />
      <Positioning dict={en} />
      <Capabilities dict={en} />
    </main>
  );
}
