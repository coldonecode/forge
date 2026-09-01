import { useState, useCallback } from "react";
import { ImageOff, RefreshCw } from "lucide-react";
import { useStore } from "../store/useStore";
import { getSvgAnimation } from "./svg";
import { useAnimationControls } from "./svg/useAnimationControls";
import AnimationControls from "./AnimationControls";

export default function GifImage({ src, alt, className = "", eager = false, exerciseName }) {
  const [loadState, setLoadState] = useState("loading");
  const [retryKey, setRetryKey] = useState(0);
  const displayMode = useStore((s) => s.profile.displayMode);
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const { isPlaying, isSlow, togglePlay, handleReplay, toggleSlow } = useAnimationControls();
  const SvgAnim = displayMode === "svg" ? getSvgAnimation(exerciseName) : null;

  // SVG mode
  if (SvgAnim && exerciseName) {
    return (
      <div className={`relative overflow-hidden bg-surface-2/30 flex items-center justify-center ${className}`}>
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            animationPlayState: prefersReducedMotion ? "paused" : (isPlaying ? "running" : "paused"),
          }}
        >
          <SvgAnim className="w-full h-full" />
        </div>
        <AnimationControls
          isPlaying={isPlaying}
          isSlow={isSlow}
          onPlay={togglePlay}
          onPause={togglePlay}
          onReplay={handleReplay}
          onSlowToggle={toggleSlow}
          isSlowMode={isSlow}
        />
      </div>
    );
  }

  // GIF mode with blur-up placeholder
  const handleLoad = useCallback(() => setLoadState("ready"), []);
  const handleError = useCallback(() => setLoadState("error"), []);
  const handleRetry = useCallback(() => {
    setLoadState("loading");
    setRetryKey((k) => k + 1);
  }, []);

  return (
    <div className={`relative overflow-hidden bg-surface-2/40 ${className}`}>
      {/* Loading placeholder */}
      {loadState === "loading" && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-2 to-surface" />
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-surface-2/50 via-surface-2/80 to-surface-2/50" />
          <div className="absolute bottom-2 start-2 flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-volt/60 animate-bounce" style={{ animationDelay: "0ms", animationDuration: "0.6s" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-volt/60 animate-bounce" style={{ animationDelay: "150ms", animationDuration: "0.6s" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-volt/60 animate-bounce" style={{ animationDelay: "300ms", animationDuration: "0.6s" }} />
          </div>
        </div>
      )}

      {/* Error state with retry */}
      {loadState === "error" && (
        <div className="absolute inset-0 grid place-items-center gap-2 bg-surface-2/40">
          <div className="text-center">
            <ImageOff size={24} strokeWidth={1.5} className="text-faint/50 mx-auto mb-1" />
            <span className="text-[11px] text-faint">No preview available</span>
            <button
              onClick={handleRetry}
              className="mt-2 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface border border-line text-[11px] text-muted hover:text-volt hover:border-volt/40 transition-colors cursor-pointer"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        </div>
      )}

      {/* GIF with blur-up fade */}
      {loadState !== "error" && (
        <img
          key={retryKey}
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-500 ease-out ${
            loadState === "ready" ? "opacity-100 blur-0" : "opacity-0 blur-lg"
          }`}
          draggable={false}
        />
      )}
    </div>
  );
}