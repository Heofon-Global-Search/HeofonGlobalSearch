import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Globe, Palette, Info, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [searchEngine, setSearchEngine] = useState('heofon');
  const [safeSearch, setSafeSearch] = useState(true);
  const [openInNewTab, setOpenInNewTab] = useState(true);
  const [region, setRegion] = useState('wt-wt');

  const handleSave = () => {
    localStorage.setItem('heofon-settings', JSON.stringify({ searchEngine, safeSearch, openInNewTab, region }));
    toast.success('Settings saved');
  };

  return (
    <main className="relative z-10 min-h-screen">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="shrink-0">
            <img src="https://images.fillout.com/orgid-787738/flowpublicid-cvfg4pcrtm/widgetid-default/9zFCmLiaKg1ipFfHWYPyoA/pasted-image-1785358502936-xjt8tg4z.png" alt="Heofon" className="w-8 h-8 rounded-full object-cover" />
          </Link>
          <h1 className="text-xl font-black" style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Settings</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        {/* Search Settings */}
        <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur overflow-hidden">
          <div className="flex items-center gap-3 p-5 border-b border-border/30">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="font-black text-foreground">Search Preferences</h2>
          </div>
          <div className="p-5 space-y-5">
            <div>
              <label className="text-sm font-bold text-foreground mb-2 block">Default Search Engine</label>
              <select value={searchEngine} onChange={(e) => setSearchEngine(e.target.value)} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:border-primary">
                <option value="heofon">Heofon (Default)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-foreground mb-2 block">Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:border-primary">
                <option value="wt-wt">All Regions</option>
                <option value="us-en">United States</option>
                <option value="uk-en">United Kingdom</option>
                <option value="no-no">Norway</option>
                <option value="de-de">Germany</option>
                <option value="fr-fr">France</option>
                <option value="es-es">Spain</option>
                <option value="jp-jp">Japan</option>
                <option value="au-en">Australia</option>
                <option value="ca-en">Canada</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">Open results in new tab</p>
                <p className="text-xs text-muted-foreground">Links open in a new browser tab</p>
              </div>
              <button onClick={() => setOpenInNewTab(!openInNewTab)} className={`w-12 h-7 rounded-full transition-all ${openInNewTab ? 'bg-primary' : 'bg-secondary'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${openInNewTab ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur overflow-hidden">
          <div className="flex items-center gap-3 p-5 border-b border-border/30">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="font-black text-foreground">Privacy & Safety</h2>
          </div>
          <div className="p-5 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">Safe Search</p>
                <p className="text-xs text-muted-foreground">Filter explicit content from results</p>
              </div>
              <button onClick={() => setSafeSearch(!safeSearch)} className={`w-12 h-7 rounded-full transition-all ${safeSearch ? 'bg-primary' : 'bg-secondary'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${safeSearch ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-foreground font-bold mb-1">🔒 Your privacy is protected</p>
              <p className="text-xs text-muted-foreground">Heofon does not track, sell, or store your personal data. All searches are anonymous.</p>
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur overflow-hidden">
          <div className="flex items-center gap-3 p-5 border-b border-border/30">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="font-black text-foreground">Appearance</h2>
          </div>
          <div className="p-5">
            <p className="text-sm font-bold text-foreground mb-3">Theme</p>
            <div className="flex gap-3">
              {['Dark (Default)', 'Space'].map((theme) => (
                <div key={theme} className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${theme === 'Dark (Default)' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'}`}>
                  <div className="w-full h-12 rounded-lg bg-background border border-border mb-2" />
                  <p className="text-xs font-bold text-center text-foreground">{theme}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur overflow-hidden">
          <div className="flex items-center gap-3 p-5 border-b border-border/30">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="font-black text-foreground">About</h2>
          </div>
          <div className="p-5 space-y-3">
            <Link to="/about" className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/80 transition-colors">
              <span className="text-sm font-bold text-foreground">About Heofon</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Link>
            <div className="flex items-center justify-between p-3">
              <span className="text-sm font-bold text-foreground">Version</span>
              <span className="text-sm text-muted-foreground">2.0.0</span>
            </div>
          </div>
        </section>

        <button onClick={handleSave} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 transition-all">
          Save Settings
        </button>
      </div>
    </main>
  );
}
