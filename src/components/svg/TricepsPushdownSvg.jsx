// Stick-figure SVG: Triceps Pushdown (cable)
// Standing figure pushing cable bar down.
export default function TricepsPushdownSvg({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* Cable frame */}
      <line x1="140" y1="15" x2="140" y2="180" className="stroke-faint opacity-30" strokeWidth="2" />
      <line x1="130" y1="15" x2="150" y2="15" className="stroke-faint opacity-30" strokeWidth="2" />
      {/* Cable line */}
      <line x1="140" y1="15" x2="125" y2="55" className="stroke-ice opacity-60" strokeWidth="1.5" />

      {/* Head */}
      <circle cx="100" cy="42" r="10" className="stroke-volt" />
      {/* Torso */}
      <line x1="100" y1="52" x2="100" y2="115" className="stroke-ink" />
      {/* Legs */}
      <line x1="100" y1="115" x2="82" y2="165" className="stroke-ink" />
      <line x1="100" y1="115" x2="118" y2="165" className="stroke-ink" />

      {/* Arms — animated pushdown */}
      <g className="animate-[triPush_2.2s_ease-in-out_infinite]">
        {/* Upper arms stay close to body */}
        <line x1="100" y1="65" x2="115" y2="80" className="stroke-volt" />
        <line x1="100" y1="65" x2="85" y2="80" className="stroke-volt" />
        {/* Forearms push down */}
        <line x1="115" y1="80" x2="125" y2="110" className="stroke-volt" strokeWidth="4" />
        <line x1="85" y1="80" x2="75" y2="110" className="stroke-volt" strokeWidth="4" />
        {/* Bar */}
        <line x1="70" y1="112" x2="130" y2="112" className="stroke-ice" strokeWidth="4" />
      </g>

      <style>{`
        @keyframes triPush {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(18px); }
        }
      `}</style>
    </svg>
  );
}
