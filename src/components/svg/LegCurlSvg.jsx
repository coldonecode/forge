// Stick-figure SVG: Leg Curl (lying or kneeling)
// Figure curling leg up toward glutes.
export default function LegCurlSvg({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* Bench */}
      <rect x="20" y="100" width="140" height="8" rx="3" className="fill-line stroke-line" />
      {/* Pad */}
      <rect x="150" y="108" width="20" height="6" rx="2" className="fill-ember stroke-ember" />

      {/* Head (lying face down) */}
      <circle cx="42" cy="88" r="10" className="stroke-volt" />
      {/* Torso (horizontal) */}
      <line x1="52" y1="92" x2="110" y2="95" className="stroke-ink" />
      {/* Arms on bench */}
      <line x1="65" y1="92" x2="60" y2="100" className="stroke-ink" />
      <line x1="85" y1="93" x2="80" y2="100" className="stroke-ink" />

      {/* Thighs on bench */}
      <line x1="110" y1="95" x2="140" y2="100" className="stroke-ink" />

      {/* Lower leg — animated curl */}
      <g className="animate-[legCurl_2.4s_ease-in-out_infinite]">
        <line x1="140" y1="100" x2="155" y2="135" className="stroke-volt" strokeWidth="4" />
        <circle cx="155" cy="135" r="3" className="fill-ember stroke-ember" />
      </g>

      <style>{`
        @keyframes legCurl {
          0%, 100% { transform: rotate(0deg); transform-origin: 140px 100px; }
          50% { transform: rotate(-55deg); transform-origin: 140px 100px; }
        }
      `}</style>
    </svg>
  );
}
