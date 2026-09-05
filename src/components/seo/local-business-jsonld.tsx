import { COMPANY } from "@/lib/constants";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: COMPANY.tradeName,
    url: COMPANY.website,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.cityState.split(" - ")[0],
      addressRegion: "MG",
      addressCountry: "BR"
    },
    areaServed: COMPANY.regionCities.map((city) => ({
      "@type": "City",
      name: city
    }))
  };

  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
