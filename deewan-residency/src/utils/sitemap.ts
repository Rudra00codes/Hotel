// Sitemap generation utility for Deewan Residency website

export interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Define all website URLs with their properties
export const SITEMAP_URLS: SitemapURL[] = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/rooms',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/amenities',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/dining',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/gallery',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/about',
    changefreq: 'yearly',
    priority: 0.6,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/contact',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Generate XML sitemap content
export const generateSitemap = (baseUrl: string = 'https://deewan-residency.com'): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urls = SITEMAP_URLS.map(url => {
    const loc = `<loc>${baseUrl}${url.loc}</loc>`;
    const lastmod = url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : '';
    const changefreq = url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : '';
    const priority = url.priority ? `<priority>${url.priority}</priority>` : '';

    return `  <url>
    ${loc}
    ${lastmod}
    ${changefreq}
    ${priority}
  </url>`;
  }).join('\n');

  return `${xmlHeader}
${urlsetOpen}
${urls}
${urlsetClose}`;
};

// Generate robots.txt content
export const generateRobotsTxt = (baseUrl: string = 'https://deewan-residency.com'): string => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;
};