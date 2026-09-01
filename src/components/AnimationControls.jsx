import { Play, Pause, RotateCcw, Gauge } from "lucide-react";

export default function AnimationControls({
  isPlaying,
  isSlow,
  onPlay,
  onPause,
  onReplay,
  onSlowToggle,
}) {
  return (
    <div className="absolute bottom-3 start-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-2xl bg-bg/85 backdrop-blur-md border border-line/50">
      <button
        onClick={isPlaying ? onPause : onPlay}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-volt/15 text-volt transition-colors hover:bg-volt/25"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
      </button>

      <button
        onClick={onReplay}
        className="w-9 h-9 flex items-center justify-center rounded-xl text-muted hover:text-ink transition-colors"
        aria-label="Replay"
      >
        <RotateCcw size={15} />
      </button>

      <div className="w-px h-5 bg-line/50" />

      <button
        onClick={onSlowToggle}
        className={`flex items-center gap-1 px-2.5 h-9 rounded-xl text-[11px] font-medium transition-colors ${
          isSlow ? "text-volt bg-volt/10" : "text-muted hover:text-ink"
        }`}
      >
        <Gauge size={13} />
        {isSlow && <span>Slow</span>}
      </button>
    </div>
  );
}