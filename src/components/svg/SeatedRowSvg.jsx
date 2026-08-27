// Stick-figure SVG: Seated Row (lever machine)
// Seated figure pulling handles toward torso.
export default function SeatedRowSvg({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* Seat */}
      <rect x="50" y="120" width="55" height="8" rx="3" className="fill-line stroke-line" />
      {/* Chest pad */}
      <rect x="108" y="85" width="8" height="30" rx="3" className="fill-line stroke-line" />
      {/* Foot rest */}
      <rect x="120" y="140" width="30" height="6" rx="2" className="fill-line stroke-line" />

      {/* Head */}
      <circle cx="80" cy="55" r="10" className="stroke-volt" />
      {/* Torso */}
      <line x1="80" y1="65" x2="80" y2="115" className="stroke-ink" />
      {/* Hips on seat */}
      <line x1="80" y1="115" x2="65" y2="120" className="stroke-ink" />
      {/* Feet on rest */}
      <line x1="80" y1="115" x2="130" y2="140" className="stroke-ink" />
      <line x1="80" y1="115" x2="140" y2="140" className="stroke-ink" />

      {/* Arms — animated row pull */}
      <g className="animate-[seatedRow_2.2s_ease-in-out_infinite]">
        {/* Upper arms */}
        <line x1="80" y1="78" x2="110" y2="85" className="stroke-volt" />
        <line x1="80" y1="78" x2="110" y2="92" className="stroke-volt" />
        {/* Forearms to handles */}
        <line x1="110" y1="85" x2="140" y2="82" className="stroke-volt" strokeWidth="4" />
        <line x1="110" y1="92" x2="140" y2="88" className="stroke-volt" strokeWidth="4" />
        {/* Handles */}
        <circle cx="142" cy="82" r="3" className="fill-ice stroke-ice" />
        <circle cx="142" cy="88" r="3" className="fill-ice stroke-ice" />
      </g>

      {/* Frame */}
      <line x1="155" y1="60" x2="155" y2="150" className="stroke-faint opacity-40" strokeWidth="2" />

      <style>{`
        @keyframes seatedRow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-15px); }
        }
      `}</style>
    </svg>
  );
}
