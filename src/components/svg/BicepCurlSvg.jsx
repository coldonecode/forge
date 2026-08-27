// Stick-figure SVG: Bicep Curl
// Standing figure curling dumbbell up.
export default function BicepCurlSvg({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* Head */}
      <circle cx="100" cy="38" r="10" className="stroke-volt" />
      {/* Torso */}
      <line x1="100" y1="48" x2="100" y2="110" className="stroke-ink" />
      {/* Legs */}
      <line x1="100" y1="110" x2="82" y2="160" className="stroke-ink" />
      <line x1="100" y1="110" x2="118" y2="160" className="stroke-ink" />
      {/* Feet */}
      <line x1="82" y1="160" x2="72" y2="165" className="stroke-ink" />
      <line x1="118" y1="160" x2="128" y2="165" className="stroke-ink" />

      {/* Left arm (stationary) */}
      <line x1="100" y1="60" x2="78" y2="85" className="stroke-ink" />
      <line x1="78" y1="85" x2="75" y2="105" className="stroke-ink" />

      {/* Right arm — animated curl */}
      <g className="animate-[bicepCurl_2s_ease-in-out_infinite]">
        {/* Upper arm stays */}
        <line x1="100" y1="60" x2="122" y2="85" className="stroke-volt" />
        {/* Forearm curls up */}
        <line x1="122" y1="85" x2="128" y2="62" className="stroke-volt" strokeWidth="4" />
        {/* Dumbbell */}
        <rect x="121" y="55" width="14" height="8" rx="2" className="fill-ember stroke-ember" />
      </g>

      <style>{`
        @keyframes bicepCurl {
          0%, 100% { transform: rotate(0deg); transform-origin: 122px 85px; }
          50% { transform: rotate(-40deg); transform-origin: 122px 85px; }
        }
      `}</style>
    </svg>
  );
}
