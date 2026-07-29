import { useNavigate } from 'react-router-dom';
import SearchInput from '@/components/SearchInput';
import TrendingTags from '@/components/TrendingTags';
import QuickLinks from '@/components/QuickLinks';
import Stats from '@/components/Stats';
import SocialsSection from '@/components/SocialsSection';

export default function Home() {
  const navigate = useNavigate();
  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <main className="relative z-10">
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1
          className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter select-none"
          style={{
            background: 'linear-gradient(to right, hsl(var(--primary)) 0%, hsl(220, 80%, 65%) 40%, hsl(var(--accent)) 70%, hsl(290, 70%, 65%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Heofon
        </h1>
        <div className="w-full max-w-[750px] flex flex-col items-center">
          <SearchInput onSearch={handleSearch} />
          <TrendingTags onTagClick={handleSearch} />
          <QuickLinks />
          <Stats />
        </div>
      </div>
      <SocialsSection />
      <footer className="text-center py-8 text-xs text-muted-foreground border-t border-border/30">
        <p className="font-bold">Heofon Global Search — Privacy First, Always.</p>
        <p className="mt-1 opacity-60">
          Norwegian-American search engine. We do not track, sell, or store your personal data.
        </p>
      </footer>
    </main>
  );
}
