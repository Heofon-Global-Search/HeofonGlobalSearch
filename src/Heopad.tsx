import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Save, Trash2, Plus, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

function getStoredNotes(): Note[] {
  try { return JSON.parse(localStorage.getItem('heopad-notes') || '[]'); } catch { return []; }
}

export default function Heopad() {
  const [notes, setNotes] = useState<Note[]>(getStoredNotes);
  const [activeId, setActiveId] = useState<string | null>(notes[0]?.id || null);
  const active = notes.find((n) => n.id === activeId);

  useEffect(() => {
    localStorage.setItem('heopad-notes', JSON.stringify(notes));
  }, [notes]);

  const createNote = () => {
    const note: Note = { id: Date.now().toString(), title: 'Untitled Note', content: '', updatedAt: Date.now() };
    setNotes([note, ...notes]);
    setActiveId(note.id);
  };

  const updateNote = (field: 'title' | 'content', value: string) => {
    setNotes(notes.map((n) => n.id === activeId ? { ...n, [field]: value, updatedAt: Date.now() } : n));
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    setActiveId(updated[0]?.id || null);
    toast.success('Note deleted');
  };

  return (
    <main className="relative z-10 min-h-screen flex flex-col">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="shrink-0">
            <img src="https://images.fillout.com/orgid-787738/flowpublicid-cvfg4pcrtm/widgetid-default/9zFCmLiaKg1ipFfHWYPyoA/pasted-image-1785358502936-xjt8tg4z.png" alt="Heofon" className="w-8 h-8 rounded-full object-cover" />
          </Link>
          <h1 className="text-xl font-black" style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Heopad</h1>
          <button onClick={createNote} className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> New
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-border/40 bg-card/30 overflow-y-auto hidden md:block">
          <div className="p-3 space-y-1">
            {notes.length === 0 && <p className="text-xs text-muted-foreground text-center py-8">No notes yet</p>}
            {notes.map((note) => (
              <button key={note.id} onClick={() => setActiveId(note.id)} className={`w-full text-left p-3 rounded-xl transition-all ${activeId === note.id ? 'bg-primary/10 border border-primary/30' : 'hover:bg-secondary/80 border border-transparent'}`}>
                <p className="text-sm font-bold text-foreground truncate">{note.title || 'Untitled'}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{note.content.substring(0, 50) || 'Empty note'}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          {active ? (
            <>
              <div className="flex items-center gap-2 p-4 border-b border-border/30">
                <input value={active.title} onChange={(e) => updateNote('title', e.target.value)} className="flex-1 bg-transparent text-lg font-black text-foreground focus:outline-none" placeholder="Note title..." />
                <button onClick={() => { toast.success('Saved'); }} className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"><Save className="w-4 h-4" /></button>
                <button onClick={() => deleteNote(active.id)} className="p-2 rounded-lg text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
              <textarea value={active.content} onChange={(e) => updateNote('content', e.target.value)} className="flex-1 p-4 bg-transparent text-foreground resize-none focus:outline-none text-sm leading-relaxed" placeholder="Start writing..." />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <FileText className="w-12 h-12 mb-4 opacity-30" />
              <p className="font-bold">No note selected</p>
              <button onClick={createNote} className="mt-3 text-sm text-primary font-bold hover:underline">Create a new note</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
