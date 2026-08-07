import { Link } from 'react-router-dom';
import { MapPin, Navigation, Search } from 'lucide-react';
import { useState } from 'react';

export default function Heomaps() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      window.open(`https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`, '_blank');
    }
  };

  return (
    <main className="relative z-10 min-h-screen">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="shrink-0">
            <img src="https://images.fillout.com/orgid-787738/flowpublicid-cvfg4pcrtm/widgetid-default/9zFCmLiaKg1ipFfHWYPyoA/pasted-image-1785358502936-xjt8tg4z.png" alt="Heofon" className="w-8 h-8 rounded-full object-cover" />
          </Link>
          <h1 className="text-xl font-black" style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Heomaps</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Search */}
        <div className="relative mb-6">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for a place..."
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-bold"
          />
          <button onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Map embed */}
        <div className="rounded-2xl overflow-hidden border border-border/50 h-[500px]">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-180,-85,180,85&layer=mapnik"
            className="w-full h-full border-0"
            title="Heomaps"
          />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          {[
            { label: 'My Location', icon: Navigation, query: '' },
            { label: 'Restaurants', icon: MapPin, query: 'restaurants near me' },
            { label: 'Gas Stations', icon: MapPin, query: 'gas stations near me' },
          ].map(({ label, icon: Icon, query: q }) => (
            <button key={label} onClick={() => { if (q) { setQuery(q); window.open(`https://www.openstreetmap.org/search?query=${encodeURIComponent(q)}`, '_blank'); } else { navigator.geolocation?.getCurrentPosition((pos) => { window.open(`https://www.openstreetmap.org/#map=15/${pos.coords.latitude}/${pos.coords.longitude}`, '_blank'); }); } }} className="flex items-center gap-2 p-4 rounded-xl border border-border/50 bg-card/50 hover:border-primary/40 transition-all">
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-foreground">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
