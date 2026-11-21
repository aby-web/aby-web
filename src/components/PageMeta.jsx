import { Helmet } from 'react-helmet-async';
import { pageMeta, pageUrl } from '../data/pages';

// The standard head tags for a page: title, description, canonical, robots
// and the share (Open Graph / Twitter) tags. Everything comes from the one
// table in src/data/pages.js, so the tags a crawler reads in the built HTML
// and the tags the browser shows are always the same.
//
// Pages keep their own <Helmet> only for extras: keywords and JSON-LD.
export default function PageMeta({ path }) {
  const page = pageMeta(path);
  if (!page) return null;
  const url = pageUrl(path);
  const { title, description, image, imageAlt } = page;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {!page.index && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      {/* Open Graph — WhatsApp, iMessage, Facebook, LinkedIn, Slack */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ammar Bass" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:width" content="1200" />}
      {image && <meta property="og:image:height" content="630" />}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}

      {/* Twitter/X */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
