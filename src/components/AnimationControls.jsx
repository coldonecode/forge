import { Play, Pause, RotateCcw, Gauge } from "lucide-react";

export default function AnimationControls({
  isPlaying,
  onPlay,
  onPause,
  onReplay,
  onSlowToggle,
  isSlow,
}) {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-xl bg-bg/80 backdrop-blur-sm border border-line/50">
      <button
        onClick={isPlaying ? onPause : onPlay}
        className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-volt"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <button
        onClick={onReplay}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-ink transition-colors"
        aria-label="Replay"
      >
        <RotateCcw size={16} />
      </button>

      <div className="w-px h-5 bg-line" />

      <button
        onClick={onSlowToggle}
        className={`flex items-center gap-1 px-2 h-8 rounded-lg text-xs font-medium transition-colors ${
          isSlow ? "text-volt" : "text-muted hover:text-ink"
        }`}
      >
        <Gauge size={14} />
        {isSlow && <span>Slow</span>}
      </button>
    </div>
  );
}
