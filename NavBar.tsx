import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Heonews', href: '/heonews' },
  { label: 'Heopad', href: '/heopad' },
  { label: 'Heotranslate', href: '/heotranslate' },
  { label: 'Heomaps', href: '/heomaps' },
  { label: 'Heofeedback', href: '/heofeedback' },
  { label: 'About', href: '/about' },
  { label: 'Settings', href: '/settings' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-[60] p-3 rounded-full bg-secondary/80 backdrop-blur border border-border text-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
        aria-label="Menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-black text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
