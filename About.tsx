import { Link } from 'react-router-dom';
import { Shield, Globe, Zap, Heart } from 'lucide-react';

export default function About() {
  return (
    <main className="relative z-10 min-h-screen">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="shrink-0">
            <img src="https://images.fillout.com/orgid-787738/flowpublicid-cvfg4pcrtm/widgetid-default/9zFCmLiaKg1ipFfHWYPyoA/pasted-image-1785358502936-xjt8tg4z.png" alt="Heofon" className="w-8 h-8 rounded-full object-cover" />
          </Link>
          <h1 className="text-xl font-black" style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>About Heofon</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <img src="https://images.fillout.com/orgid-787738/flowpublicid-cvfg4pcrtm/widgetid-default/9zFCmLiaKg1ipFfHWYPyoA/pasted-image-1785358502936-xjt8tg4z.png" alt="Heofon" className="w-20 h-20 rounded-2xl mx-auto mb-4 object-cover" />
          <h2 className="text-4xl font-black mb-3" style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Heofon Global Search</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">A Norwegian-American privacy-first search engine. We believe the internet should be open, accessible, and free from tracking.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            { icon: Shield, title: 'Privacy First', desc: 'We do not track, sell, or store your personal data. Your searches stay yours.' },
            { icon: Globe, title: 'Global Reach', desc: 'Searching across millions of pages worldwide in every language.' },
            { icon: Zap, title: 'Lightning Fast', desc: 'Results delivered in under 2 seconds, powered by cutting-edge infrastructure.' },
            { icon: Heart, title: 'User Focused', desc: 'Built by people who care about the open web and user freedom.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur">
              <Icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-black text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/" className="inline-flex px-8 py-3 rounded-full bg-primary text-primary-foreground font-black hover:opacity-90 transition-opacity">
            Start Searching
          </Link>
        </div>
      </div>
    </main>
  );
}
