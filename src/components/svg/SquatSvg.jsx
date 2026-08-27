// Stick-figure SVG: Squat (smith machine)
// Figure squatting down and standing up.
export default function SquatSvg({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* Smith machine rails */}
      <line x1="55" y1="20" x2="55" y2="180" className="stroke-faint opacity-30" strokeWidth="2" />
      <line x1="145" y1="20" x2="145" y2="180" className="stroke-faint opacity-30" strokeWidth="2" />

      {/* Head */}
      <circle cx="100" cy="48" r="10" className="stroke-volt" />
      {/* Torso */}
      <line x1="100" y1="58" x2="100" y2="105" className="stroke-ink" />

      {/* Bar on shoulders */}
      <line x1="70" y1="62" x2="130" y2="62" className="stroke-lilac" strokeWidth="4" />

      {/* Legs — animated squat */}
      <g className="animate-[squat_2.6s_ease-in-out_infinite]">
        {/* Upper legs */}
        <line x1="100" y1="105" x2="78" y2="140" className="stroke-volt" strokeWidth="4" />
        <line x1="100" y1="105" x2="122" y2="140" className="stroke-volt" strokeWidth="4" />
        {/* Lower legs */}
        <line x1="78" y1="140" x2="75" y2="175" className="stroke-volt" strokeWidth="4" />
        <line x1="122" y1="140" x2="125" y2="175" className="stroke-volt" strokeWidth="4" />
        {/* Feet */}
        <line x1="75" y1="175" x2="65" y2="178" className="stroke-ink" />
        <line x1="125" y1="175" x2="135" y2="178" className="stroke-ink" />
      </g>

      {/* Arms holding bar */}
      <line x1="100" y1="62" x2="78" y2="62" className="stroke-ink" />
      <line x1="100" y1="62" x2="122" y2="62" className="stroke-ink" />

      <style>{`
        @keyframes squat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(30px); }
        }
      `}</style>
    </svg>
  );
}
