import { TrendingUp } from 'lucide-react';

const TAGS = [
  'Anthropic AI', 'YouTube', 'Amazon', 'NASCAR', 'Microsoft Bing',
  'Roblox', 'Tesla', 'SpaceX', 'Netflix', 'ChatGPT', 'GitHub', 'Discord',
];

interface TrendingTagsProps {
  onTagClick: (tag: string) => void;
}

export default function TrendingTags({ onTagClick }: TrendingTagsProps) {
  return (
    <div className="w-full max-w-3xl mt-8">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <TrendingUp className="w-4 h-4 text-primary" />
        <span className="text-sm font-black text-primary uppercase tracking-widest">
          Trending Searches
        </span>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className="px-4 py-2 rounded-full text-sm font-bold border border-primary/30 text-primary bg-primary/5 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
