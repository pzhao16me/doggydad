import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://pzhao16me.github.io/doggydad/sitemap-index.xml
`;
  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain' }
  });
};
