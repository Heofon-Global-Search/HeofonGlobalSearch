import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, MessageSquare, Bug, Lightbulb, Star } from 'lucide-react';
import { toast } from 'sonner';

const TYPES = [
  { id: 'feedback', label: 'General Feedback', icon: MessageSquare },
  { id: 'bug', label: 'Bug Report', icon: Bug },
  { id: 'feature', label: 'Feature Request', icon: Lightbulb },
  { id: 'rating', label: 'Rate Us', icon: Star },
] as const;

export default function Heofeedback() {
  const [type, setType] = useState('feedback');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!message.trim() && type !== 'rating') return;
    setSubmitted(true);
    toast.success('Thank you for your feedback!');
  };

  if (submitted) {
    return (
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-foreground mb-3">Thank You!</h2>
          <p className="text-muted-foreground mb-6">Your feedback helps us make Heofon better.</p>
          <Link to="/" className="inline-flex px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">Back to Search</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="shrink-0">
            <img src="https://images.fillout.com/orgid-787738/flowpublicid-cvfg4pcrtm/widgetid-default/9zFCmLiaKg1ipFfHWYPyoA/pasted-image-1785358502936-xjt8tg4z.png" alt="Heofon" className="w-8 h-8 rounded-full object-cover" />
          </Link>
          <h1 className="text-xl font-black" style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Heofeedback</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h2 className="text-2xl font-black text-foreground mb-2">Send Feedback</h2>
        <p className="text-sm text-muted-foreground mb-6">Help us improve Heofon with your thoughts.</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {TYPES.map((t) => (
            <button key={t.id} onClick={() => setType(t.id)} className={`p-4 rounded-xl border-2 text-center transition-all ${type === t.id ? 'border-primary bg-primary/10' : 'border-border/50 bg-card/50 hover:border-primary/40'}`}>
              <t.icon className={`w-6 h-6 mx-auto mb-2 ${type === t.id ? 'text-primary' : 'text-muted-foreground'}`} />
              <p className="text-xs font-bold text-foreground">{t.label}</p>
            </button>
          ))}
        </div>

        {type === 'rating' && (
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)} className="transition-transform hover:scale-110">
                <Star className={`w-10 h-10 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
              </button>
            ))}
          </div>
        )}

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={type === 'bug' ? 'Describe the bug...' : type === 'feature' ? 'Describe your idea...' : 'Your feedback...'}
          className="w-full h-40 p-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-primary transition-colors mb-4"
        />

        <button onClick={handleSubmit} disabled={!message.trim() && type !== 'rating'} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
          <Send className="w-5 h-5" /> Submit Feedback
        </button>
      </div>
    </main>
  );
}
