const STATS = [
  { value: '50M+', label: 'Pages Indexed' },
  { value: '<2s', label: 'Search Speed' },
  { value: '100%', label: 'Privacy Safe' },
];

export default function Stats() {
  return (
    <div className="mt-10 flex gap-8 text-center">
      {STATS.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-8">
          {i > 0 && <div className="w-px h-10 bg-primary/20" />}
          <div>
            <p className="text-2xl md:text-3xl font-black text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
