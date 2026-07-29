import { Link } from 'react-router-dom';
import { Newspaper, FileText, Languages, MapPin, MessageSquarePlus, Info, Settings } from 'lucide-react';

const LINKS = [
  { label: 'Heonews', href: '/heonews', icon: Newspaper },
  { label: 'Heopad', href: '/heopad', icon: FileText },
  { label: 'Heotranslate', href: '/heotranslate', icon: Languages },
  { label: 'Heomaps', href: '/heomaps', icon: MapPin },
  { label: 'Heofeedback', href: '/heofeedback', icon: MessageSquarePlus },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export default function QuickLinks() {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-5">
      {LINKS.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          to={href}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 border border-border/60 hover:border-primary/40 hover:text-primary text-xs font-bold transition-all"
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </Link>
      ))}
    </div>
  );
}
