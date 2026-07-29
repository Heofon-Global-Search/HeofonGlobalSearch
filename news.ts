import { z } from 'zod';
import { createEndpoint } from 'zite-integrations-backend-sdk';

export default createEndpoint({
  description: 'Fetch news articles from BBC RSS feeds',
  inputSchema: z.object({
    category: z.enum(['top', 'world', 'business', 'technology', 'science', 'health', 'entertainment']).optional().default('top'),
  }),
  outputSchema: z.object({
    articles: z.array(z.object({
      title: z.string(),
      description: z.string(),
      link: z.string(),
      pubDate: z.string(),
      thumbnail: z.string(),
    })),
    category: z.string(),
  }),
  execute: async ({ input }) => {
    const feeds: Record<string, string> = {
      top: 'https://feeds.bbci.co.uk/news/rss.xml',
      world: 'https://feeds.bbci.co.uk/news/world/rss.xml',
      business: 'https://feeds.bbci.co.uk/news/business/rss.xml',
      technology: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
      science: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
      health: 'https://feeds.bbci.co.uk/news/health/rss.xml',
      entertainment: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
    };

    const url = feeds[input.category] || feeds.top;
    const articles: { title: string; description: string; link: string; pubDate: string; thumbnail: string }[] = [];

    try {
      const resp = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/xml, text/xml' },
      });
      const xml = await resp.text();

      // Parse RSS items with regex
      const items = xml.split('<item>').slice(1);
      for (const item of items) {
        const title = extractTag(item, 'title');
        const description = extractTag(item, 'description');
        const link = extractTag(item, 'link');
        const pubDate = extractTag(item, 'pubDate');
        const thumbMatch = item.match(/url="([^"]*?)"/);
        const thumbnail = thumbMatch ? thumbMatch[1] : '';

        if (title && link) {
          articles.push({
            title: cleanXml(title),
            description: cleanXml(description),
            link,
            pubDate,
            thumbnail,
          });
        }
      }
    } catch {
      // Return empty on failure
    }

    return { articles: articles.slice(0, 30), category: input.category };
  },
});

function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? (match[1] || match[2] || '').trim() : '';
}

function cleanXml(str: string): string {
  return str.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}
