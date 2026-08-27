// Stick-figure SVG: Leg Extension
// Seated figure extending legs up from 90° to straight.
export default function LegExtensionSvg({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* Seat */}
      <rect x="60" y="115" width="65" height="8" rx="3" className="fill-line stroke-line" />
      {/* Backrest */}
      <rect x="55" y="70" width="10" height="53" rx="3" className="fill-line stroke-line" />
      {/* Pad under ankles */}
      <rect x="130" y="145" width="30" height="6" rx="2" className="fill-ember stroke-ember" />

      {/* Head */}
      <circle cx="90" cy="52" r="10" className="stroke-volt" />
      {/* Torso */}
      <line x1="90" y1="62" x2="90" y2="110" className="stroke-ink" />
      {/* Arms on handles */}
      <line x1="90" y1="78" x2="72" y2="95" className="stroke-ink" />
      <line x1="90" y1="78" x2="108" y2="95" className="stroke-ink" />

      {/* Thighs (fixed on seat) */}
      <line x1="90" y1="110" x2="130" y2="118" className="stroke-ink" />
      <line x1="90" y1="110" x2="130" y2="125" className="stroke-ink" />

      {/* Lower legs — animated extension */}
      <g className="animate-[legExt_2.4s_ease-in-out_infinite]">
        <line x1="130" y1="118" x2="155" y2="148" className="stroke-volt" strokeWidth="4" />
        <line x1="130" y1="125" x2="155" y2="155" className="stroke-volt" strokeWidth="4" />
        <circle cx="155" cy="148" r="3" className="fill-ember stroke-ember" />
        <circle cx="155" cy="155" r="3" className="fill-ember stroke-ember" />
      </g>

      <style>{`
        @keyframes legExt {
          0%, 100% { transform: rotate(0deg); transform-origin: 130px 120px; }
          50% { transform: rotate(-50deg); transform-origin: 130px 120px; }
        }
      `}</style>
    </svg>
  );
}
