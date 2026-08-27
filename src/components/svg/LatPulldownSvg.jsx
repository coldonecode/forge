// Stick-figure SVG: Lat Pulldown (front pulldown / reverse grip)
// Seated figure pulling bar down to chest.
export default function LatPulldownSvg({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* Seat */}
      <rect x="70" y="135" width="60" height="8" rx="3" className="fill-line stroke-line" />
      {/* Thigh pad */}
      <rect x="72" y="122" width="56" height="6" rx="2" className="fill-line stroke-line" />
      {/* Frame */}
      <line x1="100" y1="20" x2="100" y2="50" className="stroke-faint opacity-40" strokeWidth="2" />
      <line x1="60" y1="20" x2="140" y2="20" className="stroke-faint opacity-40" strokeWidth="2" />

      {/* Head */}
      <circle cx="100" cy="58" r="10" className="stroke-volt" />
      {/* Torso */}
      <line x1="100" y1="68" x2="100" y2="120" className="stroke-ink" />
      {/* Legs under pad */}
      <line x1="100" y1="120" x2="82" y2="135" className="stroke-ink" />
      <line x1="100" y1="120" x2="118" y2="135" className="stroke-ink" />

      {/* Arms — animated pull down */}
      <g className="animate-[latPull_2.2s_ease-in-out_infinite]">
        {/* Upper arms */}
        <line x1="100" y1="78" x2="75" y2="60" className="stroke-volt" />
        <line x1="100" y1="78" x2="125" y2="60" className="stroke-volt" />
        {/* Forearms up to bar */}
        <line x1="75" y1="60" x2="65" y2="25" className="stroke-volt" />
        <line x1="125" y1="60" x2="135" y2="25" className="stroke-volt" />
        {/* Bar */}
        <line x1="60" y1="22" x2="140" y2="22" className="stroke-ice" strokeWidth="4" />
        <circle cx="65" cy="22" r="3" className="fill-ice stroke-ice" />
        <circle cx="135" cy="22" r="3" className="fill-ice stroke-ice" />
      </g>

      <style>{`
        @keyframes latPull {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(25px); }
        }
      `}</style>
    </svg>
  );
}
