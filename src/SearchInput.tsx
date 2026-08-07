import { Search, Sparkles } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  className?: string;
  compact?: boolean;
  initialQuery?: string;
}

export default function SearchInput({ onSearch, className = '', compact, initialQuery = '' }: SearchInputProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none z-10" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the web..."
          className="w-full pl-11 pr-4 py-2.5 rounded-full bg-foreground/5 backdrop-blur-xl border border-primary/30 text-foreground font-bold placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-all duration-300 text-sm"
        />
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60 pointer-events-none z-10" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the web..."
        className="w-full pl-14 pr-16 py-5 rounded-full bg-foreground/5 backdrop-blur-xl border-2 border-primary/30 text-foreground font-bold placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-all duration-300 text-center text-lg md:text-xl pulse-glow"
      />
      <button
        type="button"
        onClick={() => window.open('https://heofonix-ai-com.zite.so/', '_blank')}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-black text-primary hover:opacity-80 transition-opacity z-10"
        title="Ask AI"
      >
        <Sparkles className="w-4 h-4" />
        <span className="hidden sm:inline">Ask</span>
      </button>
    </form>
  );
}
