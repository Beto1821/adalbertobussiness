export type Dictionary = {
  nav: {
    items: { label: string; href: string }[];
    localeSwitchLabel: string;
    localeSwitchHref: string;
  };
  hero: {
    eyebrow: string;
    regionLabel?: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  positioning: {
    eyebrow: string;
    title: string;
    body: string;
  };
  tiers?: {
    eyebrow: string;
    title: string;
    items: {
      title: string;
      description: string;
      cta: string;
      href: string;
    }[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    items: {
      title: string;
      description: string;
      cta: string;
      href: string;
    }[];
  };
};
