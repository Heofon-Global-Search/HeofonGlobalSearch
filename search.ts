import { z } from 'zod';
import { createEndpoint } from 'zite-integrations-backend-sdk';

export default createEndpoint({
  description: 'Search the web using Wikipedia and DuckDuckGo APIs',
  inputSchema: z.object({
    query: z.string().min(1),
    type: z.enum(['all', 'images']).optional().default('all'),
  }),
  outputSchema: z.object({
    results: z.array(z.object({
      title: z.string(),
      url: z.string(),
      snippet: z.string(),
    })),
    images: z.array(z.object({
      title: z.string(),
      url: z.string(),
      imageUrl: z.string(),
    })),
    relatedSearches: z.array(z.string()),
    query: z.string(),
    instant: z.object({
      title: z.string(),
      abstract: z.string(),
      source: z.string(),
      url: z.string(),
      image: z.string(),
    }).optional(),
  }),
  execute: async ({ input }) => {
    const { query } = input;
    const results: { title: string; url: string; snippet: string }[] = [];
    const images: { title: string; url: string; imageUrl: string }[] = [];
    const relatedSearches: string[] = [];
    let instant: { title: string; abstract: string; source: string; url: string; image: string } | undefined;

    async function safeJsonFetch(url: string) {
      try {
        const resp = await fetch(url);
        const text = await resp.text();
        return JSON.parse(text);
      } catch {
        return null;
      }
    }

    // Convert DuckDuckGo internal URLs to Wikipedia URLs
    function resolveDdgUrl(ddgUrl: string): string {
      if (ddgUrl.startsWith('https://duckduckgo.com/') && !ddgUrl.includes('/c/')) {
        const topic = ddgUrl.replace('https://duckduckgo.com/', '');
        return `https://en.wikipedia.org/wiki/${topic}`;
      }
      return ddgUrl;
    }

    const [ddg, wikiSearch, wikiImages] = await Promise.all([
      safeJsonFetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`),
      safeJsonFetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=15&format=json&origin=*`),
      safeJsonFetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=12&prop=pageimages|info&inprop=url&piprop=thumbnail&pithumbsize=400&format=json&origin=*`),
    ]);

    // --- Build instant answer with multiple fallback layers ---

    // Layer 1: DuckDuckGo abstract (best quality)
    if (ddg?.Abstract) {
      instant = {
        title: ddg.Heading || query,
        abstract: ddg.Abstract,
        source: ddg.AbstractSource || '',
        url: ddg.AbstractURL || '',
        image: ddg.Image ? (ddg.Image.startsWith('http') ? ddg.Image : `https://duckduckgo.com${ddg.Image}`) : '',
      };
    }

    // Layer 2: If DDG has no abstract, get Wikipedia summary of the FIRST search result
    // This is much more reliable than searching by raw query (e.g. "Amazon" finds "Amazon (company)")
    if (!instant && wikiSearch?.query?.search?.[0]) {
      const bestTitle = wikiSearch.query.search[0].title;
      const wikiSummary = await safeJsonFetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bestTitle.replace(/ /g, '_'))}`
      );

      if (wikiSummary?.extract && wikiSummary?.type !== 'disambiguation') {
        instant = {
          title: wikiSummary.title || bestTitle,
          abstract: wikiSummary.extract,
          source: 'Wikipedia',
          url: wikiSummary.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(bestTitle.replace(/ /g, '_'))}`,
          image: wikiSummary.thumbnail?.source || wikiSummary.originalimage?.source || '',
        };
      }
    }

    // Layer 3: If even that failed, try the raw query as a Wikipedia summary
    if (!instant) {
      const directSummary = await safeJsonFetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query.replace(/ /g, '_'))}`
      );
      if (directSummary?.extract && directSummary?.type !== 'disambiguation') {
        instant = {
          title: directSummary.title || query,
          abstract: directSummary.extract,
          source: 'Wikipedia',
          url: directSummary.content_urls?.desktop?.page || '',
          image: directSummary.thumbnail?.source || '',
        };
      }
    }

    // Layer 4: Last resort — use the first Wikipedia search snippet
    if (!instant && wikiSearch?.query?.search?.[0]) {
      const first = wikiSearch.query.search[0];
      instant = {
        title: first.title,
        abstract: clean(first.snippet || ''),
        source: 'Wikipedia',
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(first.title.replace(/ /g, '_'))}`,
        image: '',
      };
    }

    // Try to get an image for the instant box from wikiImages if we don't have one
    if (instant && !instant.image && wikiImages?.query?.pages) {
      for (const page of Object.values(wikiImages.query.pages) as any[]) {
        if (page.thumbnail?.source) {
          instant.image = page.thumbnail.source;
          break;
        }
      }
    }

    // --- Build search results ---

    // DDG official site results (these have real URLs)
    if (ddg?.Results) {
      for (const r of ddg.Results) {
        if (r.FirstURL && r.Text) {
          results.push({ title: clean(r.Text), url: r.FirstURL, snippet: 'Official website' });
        }
      }
    }

    // DDG related topics -> results + relatedSearches
    // Convert duckduckgo.com URLs to Wikipedia URLs
    if (ddg?.RelatedTopics) {
      for (const topic of ddg.RelatedTopics) {
        if (topic.FirstURL && topic.Text) {
          if (!topic.FirstURL.includes('duckduckgo.com/c/')) {
            const resolvedUrl = resolveDdgUrl(topic.FirstURL);
            results.push({
              title: topic.Text.split(' - ')[0] || topic.Text.substring(0, 60),
              url: resolvedUrl,
              snippet: topic.Text.length > 60 ? topic.Text : '',
            });
          }
          const name = topic.Text.split(' - ')[0];
          if (name && name.length < 50) relatedSearches.push(name);
        }
        if (topic.Topics) {
          for (const sub of topic.Topics) {
            if (sub.FirstURL && sub.Text && !sub.FirstURL.includes('duckduckgo.com/c/')) {
              const resolvedUrl = resolveDdgUrl(sub.FirstURL);
              results.push({
                title: sub.Text.split(' - ')[0] || sub.Text.substring(0, 60),
                url: resolvedUrl,
                snippet: sub.Text.length > 60 ? sub.Text : '',
              });
              const name = sub.Text.split(' - ')[0];
              if (name && name.length < 50) relatedSearches.push(name);
            }
          }
        }
      }
    }

    // Wikipedia search results
    const seenUrls = new Set(results.map(r => r.url));
    if (wikiSearch?.query?.search) {
      for (const item of wikiSearch.query.search) {
        const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`;
        if (seenUrls.has(url)) continue;
        seenUrls.add(url);
        results.push({ title: item.title, url, snippet: clean(item.snippet || '') });
      }
    }

    // Wikipedia images
    if (wikiImages?.query?.pages) {
      for (const page of Object.values(wikiImages.query.pages) as any[]) {
        if (page.thumbnail?.source) {
          images.push({
            title: page.title || '',
            url: page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent((page.title || '').replace(/ /g, '_'))}`,
            imageUrl: page.thumbnail.source,
          });
        }
      }
    }

    return {
      results: results.slice(0, 25),
      images: images.slice(0, 20),
      relatedSearches: [...new Set(relatedSearches)].slice(0, 8),
      query,
      instant,
    };
  },
});

function clean(str: string): string {
  return str.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}
