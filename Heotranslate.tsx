import { useState } from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'zite-endpoints-sdk';
import { ArrowLeftRight, Loader2, Copy, Check, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'no', name: 'Norwegian' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'pl', name: 'Polish' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'Ukrainian' },
];

export default function Heotranslate() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    try {
      const result = await translate({ text: sourceText, sourceLang, targetLang });
      setTranslatedText(result.translatedText);
    } catch {
      setTranslatedText('Translation failed. Please try again.');
    }
    setLoading(false);
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <main className="relative z-10 min-h-screen">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="shrink-0">
            <img src="https://images.fillout.com/orgid-787738/flowpublicid-cvfg4pcrtm/widgetid-default/9zFCmLiaKg1ipFfHWYPyoA/pasted-image-1785358502936-xjt8tg4z.png" alt="Heofon" className="w-8 h-8 rounded-full object-cover" />
          </Link>
          <h1 className="text-xl font-black" style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Heotranslate</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Language selectors */}
        <div className="flex items-center gap-3 mb-4">
          <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="flex-1 bg-secondary border border-border rounded-xl px-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:border-primary">
            {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
          </select>
          <button onClick={handleSwap} className="p-3 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
            <ArrowLeftRight className="w-5 h-5" />
          </button>
          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="flex-1 bg-secondary border border-border rounded-xl px-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:border-primary">
            {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
          </select>
        </div>

        {/* Text areas */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full h-52 p-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-primary transition-colors"
            />
            <div className="absolute bottom-3 left-3 flex gap-2">
              {sourceText && (
                <button onClick={() => handleSpeak(sourceText, sourceLang)} className="p-1.5 rounded-full text-muted-foreground hover:text-primary transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <span className="absolute bottom-3 right-3 text-xs text-muted-foreground/50">{sourceText.length}/5000</span>
          </div>

          <div className="relative">
            <div className="w-full h-52 p-4 rounded-2xl bg-primary/5 border border-primary/20 text-foreground overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
              ) : (
                <p className={translatedText ? 'text-foreground' : 'text-muted-foreground/50'}>{translatedText || 'Translation will appear here...'}</p>
              )}
            </div>
            {translatedText && !loading && (
              <div className="absolute bottom-3 left-3 flex gap-2">
                <button onClick={() => handleSpeak(translatedText, targetLang)} className="p-1.5 rounded-full text-muted-foreground hover:text-primary transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
                <button onClick={handleCopy} className="p-1.5 rounded-full text-muted-foreground hover:text-primary transition-colors">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleTranslate}
          disabled={!sourceText.trim() || loading}
          className="w-full mt-4 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </div>
    </main>
  );
}
