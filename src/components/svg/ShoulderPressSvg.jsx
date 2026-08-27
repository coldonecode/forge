// Stick-figure SVG: Shoulder Press (lever machine)
// Seated figure pressing handles overhead.
export default function ShoulderPressSvg({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* Seat + backrest */}
      <rect x="70" y="130" width="60" height="8" rx="3" className="fill-line stroke-line" />
      <rect x="65" y="75" width="10" height="63" rx="3" className="fill-line stroke-line" />

      {/* Head */}
      <circle cx="100" cy="55" r="10" className="stroke-volt" />
      {/* Torso */}
      <line x1="100" y1="65" x2="100" y2="120" className="stroke-ink" />
      {/* Hips */}
      <line x1="100" y1="120" x2="85" y2="130" className="stroke-ink" />
      <line x1="100" y1="120" x2="115" y2="130" className="stroke-ink" />

      {/* Arms — animated press overhead */}
      <g className="animate-[shoulderPress_2.4s_ease-in-out_infinite]">
        <line x1="100" y1="78" x2="78" y2="65" className="stroke-volt" />
        <line x1="100" y1="78" x2="122" y2="65" className="stroke-volt" />
        <line x1="78" y1="65" x2="72" y2="32" className="stroke-volt" />
        <line x1="122" y1="65" x2="128" y2="32" className="stroke-volt" />
        <circle cx="72" cy="30" r="4" className="fill-volt stroke-volt" />
        <circle cx="128" cy="30" r="4" className="fill-volt stroke-volt" />
      </g>

      {/* Machine frame */}
      <line x1="55" y1="50" x2="55" y2="145" className="stroke-faint opacity-40" strokeWidth="2" />
      <line x1="145" y1="50" x2="145" y2="145" className="stroke-faint opacity-40" strokeWidth="2" />

      <style>{`
        @keyframes shoulderPress {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </svg>
  );
}
