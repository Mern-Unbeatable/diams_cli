import { HERO } from "@/config/hero";
import { FOOTER_CONTACT, FOOTER_DESCRIPTION } from "@/config/footer";

/** Production origin, as published in the legal pages. */
export const SITE_URL = "https://www.novasky.ch";
export const SITE_NAME = "NovaSky";

export const HOME_SEO = {
  title: "NovaSky | Next-Generation Mobile Network in Switzerland",
  description:
    "NovaSky is the next-generation mobile network in Switzerland. Ultra-fast 5G, nationwide coverage, unlimited calls & SMS, instant eSIM and no contract.",
  canonicalUrl: `${SITE_URL}/`,
  image: {
    url: new URL(HERO.image, SITE_URL).href,
    alt: `${SITE_NAME} — ${HERO.title} ${HERO.titleAccent}`,
  },
};

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const HOME_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: HOME_SEO.canonicalUrl,
      description: FOOTER_DESCRIPTION,
      email: FOOTER_CONTACT.email,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: FOOTER_CONTACT.phone,
        email: FOOTER_CONTACT.email,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: HOME_SEO.canonicalUrl,
      inLanguage: "en",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};
