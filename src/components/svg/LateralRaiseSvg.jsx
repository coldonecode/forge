// Stick-figure SVG: Lateral Raise
// Standing figure raising arms out to sides.
export default function LateralRaiseSvg({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* Head */}
      <circle cx="100" cy="38" r="10" className="stroke-volt" />
      {/* Torso */}
      <line x1="100" y1="48" x2="100" y2="110" className="stroke-ink" />
      {/* Legs */}
      <line x1="100" y1="110" x2="82" y2="160" className="stroke-ink" />
      <line x1="100" y1="110" x2="118" y2="160" className="stroke-ink" />
      <line x1="82" y1="160" x2="72" y2="165" className="stroke-ink" />
      <line x1="118" y1="160" x2="128" y2="165" className="stroke-ink" />

      {/* Arms — animated lateral raise */}
      <g className="animate-[latRaise_2.4s_ease-in-out_infinite]">
        {/* Upper arms raise out */}
        <line x1="100" y1="62" x2="68" y2="72" className="stroke-volt" strokeWidth="4" />
        <line x1="100" y1="62" x2="132" y2="72" className="stroke-volt" strokeWidth="4" />
        {/* Dumbbells */}
        <rect x="58" y="66" width="12" height="8" rx="2" className="fill-lilac stroke-lilac" />
        <rect x="130" y="66" width="12" height="8" rx="2" className="fill-lilac stroke-lilac" />
      </g>

      <style>{`
        @keyframes latRaise {
          0%, 100% { transform: rotate(0deg); transform-origin: 100px 62px; }
          50% { transform: rotate(-30deg); transform-origin: 100px 62px; }
        }
      `}</style>
    </svg>
  );
}
