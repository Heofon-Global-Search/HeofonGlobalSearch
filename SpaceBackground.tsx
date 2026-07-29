import { useMemo } from 'react';

export default function SpaceBackground() {
  const particles = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 7 + Math.random() * 6,
      delay: Math.random() * 10,
      size: Math.random() > 0.7 ? 3 : 2,
    })), []
  );

  return (
    <>
      <div
        className="fixed top-0 left-0 w-[200%] h-[200%] z-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(1px 1px at 25px 35px, rgba(255,255,255,0.8), transparent) 0 0 / 250px 250px',
            'radial-gradient(2px 2px at 50px 100px, rgba(238,238,238,0.6), transparent)',
            'radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.8), transparent)',
            'radial-gradient(2px 2px at 150px 150px, rgba(221,221,221,0.5), transparent)',
          ].join(', '),
          animation: 'spaceScroll 40s linear infinite',
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}vw`,
              top: 0,
              background: 'hsl(var(--primary))',
              boxShadow: `hsl(var(--primary)) 0 0 10px, hsl(var(--primary) / 0.3) 0 0 20px`,
              animation: `floatUp ${p.duration}s linear ${-p.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
