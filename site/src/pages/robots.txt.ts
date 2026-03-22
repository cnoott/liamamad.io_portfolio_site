import type { APIRoute } from "astro";
import { siteMeta } from "../data/site";

const renderRobotsTxt = (sitemapUrl: URL) => `User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`;

export const GET: APIRoute = ({ site }) => {
  const resolvedSite = site ?? new URL(siteMeta.siteUrl);
  const sitemapUrl = new URL("sitemap-index.xml", resolvedSite);

  return new Response(renderRobotsTxt(sitemapUrl), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
