import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { search, SearchOutputType } from 'zite-endpoints-sdk';
import { Search, ExternalLink, Loader2, ImageIcon, FileText, Users, Info } from 'lucide-react';
import SearchInput from '@/components/SearchInput';

type Result = SearchOutputType['results'][0];
type ImageResult = SearchOutputType['images'][0];
type Instant = SearchOutputType['instant'];

function InstantAnswer({ data }: { data: Instant }) {
  if (!data || !data.abstract) return null;
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 pt-4 pb-2">
        <Info className="w-4 h-4 text-primary" />
        <span className="text-xs font-black text-primary uppercase tracking-widest">Information</span>
      </div>
      <div className="px-5 pb-5">
        <div className="flex gap-5">
          {data.image && (
            <img
              src={data.image}
              alt={data.title || ''}
              className="w-28 h-28 rounded-xl object-cover shrink-0 hidden sm:block border border-border/30"
            />
          )}
          <div className="min-w-0">
            {data.title && (
              <h2 className="text-lg font-black text-foreground mb-1.5">{data.title}</h2>
            )}
            <p className="text-sm text-muted-foreground leading-relaxed">{data.abstract}</p>
            {data.source && data.url && (
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-primary hover:underline"
              >
                Read more on {data.source} <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ result }: { result: Result }) {
  const domain = (() => {
    try { return new URL(result.url).hostname.replace('www.', ''); } catch { return result.url; }
  })();

  return (
    <a
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur hover:border-primary/40 hover:bg-card/80 transition-all duration-200"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
          alt=""
          className="w-4 h-4 rounded-sm"
        />
        <span className="text-xs text-muted-foreground truncate">{domain}</span>
        <ExternalLink className="w-3 h-3 text-muted-foreground/50 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-1">
        {result.title}
      </h3>
      {result.snippet && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{result.snippet}</p>
      )}
    </a>
  );
}

function RelatedSearches({ items, onSearch }: { items: string[]; onSearch: (q: string) => void }) {
  if (!items.length) return null;
  return (
    <div className="p-4 rounded-2xl border border-border/50 bg-card/30 backdrop-blur">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-primary" />
        <span className="text-sm font-black text-primary uppercase tracking-wider">People Also Search For</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSearch(item)}
            className="px-3 py-1.5 rounded-full text-xs font-bold border border-primary/30 text-primary bg-primary/5 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function ImageGrid({ images }: { images: ImageResult[] }) {
  if (!images.length) return <p className="text-center text-muted-foreground py-12">No images found</p>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {images.map((img, i) => (
        <a key={i} href={img.url} target="_blank" rel="noopener noreferrer" className="group relative rounded-xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all aspect-square bg-card/50">
          <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <p className="text-xs text-white font-bold line-clamp-2">{img.title}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

type Tab = 'all' | 'images';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const tabParam = searchParams.get('tab') as Tab || 'all';
  const [tab, setTab] = useState<Tab>(tabParam);
  const [results, setResults] = useState<Result[]>([]);
  const [images, setImages] = useState<ImageResult[]>([]);
  const [relatedSearches, setRelatedSearches] = useState<string[]>([]);
  const [instant, setInstant] = useState<Instant>(undefined);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setSearched(true);
    search({ query, type: tab })
      .then((data) => {
        setResults(data.results);
        setImages(data.images);
        setRelatedSearches(data.relatedSearches);
        setInstant(data.instant);
      })
      .catch(() => { setResults([]); setImages([]); setRelatedSearches([]); })
      .finally(() => setLoading(false));
  }, [query, tab]);

  const handleSearch = (q: string) => setSearchParams({ q, tab });
  const handleTab = (t: Tab) => { setTab(t); setSearchParams({ q: query, tab: t }); };

  const TABS: { id: Tab; label: string; icon: typeof FileText }[] = [
    { id: 'all', label: 'All', icon: FileText },
    { id: 'images', label: 'Images', icon: ImageIcon },
  ];

  return (
    <main className="relative z-10 min-h-screen">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="shrink-0 flex items-center gap-2">
            <img src="https://images.fillout.com/orgid-787738/flowpublicid-cvfg4pcrtm/widgetid-default/9zFCmLiaKg1ipFfHWYPyoA/pasted-image-1785358502936-xjt8tg4z.png" alt="Heofon" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-lg font-black tracking-tight hidden md:inline" style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Heofon</span>
          </Link>
          <div className="flex-1 max-w-2xl">
            <SearchInput onSearch={handleSearch} initialQuery={query} compact />
          </div>
        </div>
        <div className="container mx-auto px-4 flex gap-1 -mt-1 pb-0">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => handleTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold border-b-2 transition-all ${tab === t.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
              <t.icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {!loading && searched && results.length === 0 && images.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg font-bold text-foreground">No results found</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
          </div>
        )}

        {!loading && searched && tab === 'all' && (results.length > 0 || instant) && (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-4">{results.length} results for <span className="font-bold text-foreground">"{query}"</span></p>
              <InstantAnswer data={instant} />
              <div className="space-y-3">
                {results.map((result, i) => <ResultCard key={`${result.url}-${i}`} result={result} />)}
              </div>
            </div>
            <div className="lg:w-72 shrink-0 space-y-4">
              <RelatedSearches items={relatedSearches} onSearch={handleSearch} />
              {images.length > 0 && (
                <div className="p-4 rounded-2xl border border-border/50 bg-card/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black text-primary uppercase tracking-wider">Images</span>
                    <button onClick={() => handleTab('images')} className="text-xs text-primary font-bold hover:underline">View all</button>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {images.slice(0, 6).map((img, i) => (
                      <a key={i} href={img.url} target="_blank" rel="noopener noreferrer" className="aspect-square rounded-lg overflow-hidden">
                        <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover hover:scale-110 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!loading && searched && tab === 'images' && <ImageGrid images={images} />}

        {!loading && !searched && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Enter a search term to get started</p>
          </div>
        )}
      </div>
    </main>
  );
}
