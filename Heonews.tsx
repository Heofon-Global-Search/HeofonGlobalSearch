import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { news, NewsOutputType } from 'zite-endpoints-sdk';
import { Loader2, ExternalLink, Clock } from 'lucide-react';

type Article = NewsOutputType['articles'][0];

const CATEGORIES = [
  { id: 'top', label: 'Top Stories' },
  { id: 'world', label: 'World' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
  { id: 'entertainment', label: 'Entertainment' },
] as const;

function timeAgo(dateStr: string): string {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  } catch { return ''; }
}

function HeroCard({ article }: { article: Article }) {
  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" className="group block relative rounded-2xl overflow-hidden border border-border/50 bg-card/50 h-80 md:h-96">
      {article.thumbnail ? (
        <img src={article.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-black uppercase">Breaking</span>
          {article.pubDate && <span className="text-xs text-white/60 flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(article.pubDate)}</span>}
        </div>
        <h2 className="text-xl md:text-2xl font-black text-white leading-tight">{article.title}</h2>
        <p className="text-sm text-white/70 mt-2 line-clamp-2">{article.description}</p>
      </div>
    </a>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" className="group flex gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:border-primary/40 hover:bg-card/80 transition-all">
      {article.thumbnail && (
        <img src={article.thumbnail} alt="" className="w-28 h-20 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform" />
      )}
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">{article.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{article.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-muted-foreground/60">BBC News</span>
          {article.pubDate && <span className="text-xs text-muted-foreground/60">• {timeAgo(article.pubDate)}</span>}
          <ExternalLink className="w-3 h-3 text-muted-foreground/30 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </a>
  );
}

export default function Heonews() {
  const [category, setCategory] = useState<string>('top');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    news({ category: category as any })
      .then((data) => setArticles(data.articles))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <main className="relative z-10 min-h-screen">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="shrink-0 flex items-center gap-2">
            <img src="https://images.fillout.com/orgid-787738/flowpublicid-cvfg4pcrtm/widgetid-default/9zFCmLiaKg1ipFfHWYPyoA/pasted-image-1785358502936-xjt8tg4z.png" alt="Heofon" className="w-8 h-8 rounded-full object-cover" />
          </Link>
          <h1 className="text-xl font-black" style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Heonews</h1>
        </div>
        <div className="container mx-auto px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setCategory(cat.id)} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${category === cat.id ? 'bg-primary text-primary-foreground' : 'bg-secondary/80 text-muted-foreground hover:text-foreground'}`}>
              {cat.label}
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
        {!loading && articles.length > 0 && (
          <div className="space-y-4">
            <HeroCard article={articles[0]} />
            {articles.slice(1).map((article, i) => (
              <ArticleCard key={i} article={article} />
            ))}
          </div>
        )}
        {!loading && articles.length === 0 && (
          <p className="text-center py-20 text-muted-foreground">No news articles available right now.</p>
        )}
      </div>
    </main>
  );
}
