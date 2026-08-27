// Stick-figure SVG: Chest Press (lever machine)
// Shows seated figure pushing handles forward from chest.
export default function ChestPressSvg({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* Seat */}
      <rect x="70" y="130" width="60" height="8" rx="3" className="fill-line stroke-line" />
      <rect x="68" y="100" width="8" height="38" rx="2" className="fill-line stroke-line" />
      {/* Backrest */}
      <rect x="60" y="60" width="10" height="48" rx="3" className="fill-line stroke-line" />

      {/* Head */}
      <circle cx="100" cy="42" r="10" className="stroke-volt" />
      {/* Torso */}
      <line x1="100" y1="52" x2="100" y2="110" className="stroke-ink" />
      {/* Hips on seat */}
      <line x1="100" y1="110" x2="85" y2="130" className="stroke-ink" />
      <line x1="100" y1="110" x2="115" y2="130" className="stroke-ink" />
      {/* Feet */}
      <line x1="85" y1="130" x2="85" y2="145" className="stroke-ink" />
      <line x1="115" y1="130" x2="115" y2="145" className="stroke-ink" />

      {/* Arms — animated push/pull */}
      <g className="animate-[chestPress_2s_ease-in-out_infinite]">
        {/* Upper arms (start near chest, push forward) */}
        <line x1="100" y1="68" x2="75" y2="80" className="stroke-volt" />
        <line x1="100" y1="68" x2="125" y2="80" className="stroke-volt" />
        {/* Forearms to handles */}
        <line x1="75" y1="80" x2="55" y2="75" className="stroke-volt" />
        <line x1="125" y1="80" x2="145" y2="75" className="stroke-volt" />
        {/* Handles */}
        <circle cx="55" cy="75" r="4" className="fill-volt stroke-volt" />
        <circle cx="145" cy="75" r="4" className="fill-volt stroke-volt" />
      </g>

      {/* Machine frame hint */}
      <line x1="50" y1="55" x2="50" y2="140" className="stroke-faint opacity-40" strokeWidth="2" />
      <line x1="150" y1="55" x2="150" y2="140" className="stroke-faint opacity-40" strokeWidth="2" />

      <style>{`
        @keyframes chestPress {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(18px); }
        }
      `}</style>
    </svg>
  );
}
