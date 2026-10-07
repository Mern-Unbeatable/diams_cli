import { useEffect } from "react";
import {
  HOME_SEO,
  HOME_STRUCTURED_DATA,
  SITE_NAME,
} from "@/config/homeSeo";

// Escaped so the payload can never terminate its own <script> element.
const structuredDataJson = JSON.stringify(HOME_STRUCTURED_DATA).replace(
  /</g,
  "\\u003c",
);

/**
 * Landing-page metadata. React 19 hoists these tags into <head> and removes
 * them when the home route unmounts, so they never leak onto other pages.
 */
const HomeSeo = () => {
  // Not rendered as <title>: React would hoist a second <title> next to the
  // index.html default. Updating document.title keeps exactly one element.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = HOME_SEO.title;
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <>
      <meta name="description" content={HOME_SEO.description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={HOME_SEO.canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={HOME_SEO.canonicalUrl} />
      <meta property="og:title" content={HOME_SEO.title} />
      <meta property="og:description" content={HOME_SEO.description} />
      <meta property="og:image" content={HOME_SEO.image.url} />
      <meta property="og:image:alt" content={HOME_SEO.image.alt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={HOME_SEO.title} />
      <meta name="twitter:description" content={HOME_SEO.description} />
      <meta name="twitter:image" content={HOME_SEO.image.url} />
      <meta name="twitter:image:alt" content={HOME_SEO.image.alt} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />
    </>
  );
};

export default HomeSeo;
