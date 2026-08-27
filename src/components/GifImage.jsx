import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { useStore } from "../store/useStore";
import { getSvgAnimation } from "./svg";
import AnimationControls from "./AnimationControls";

export default function GifImage({ src, alt, className = "", eager = false, exerciseName }) {
  const [state, setState] = useState("loading");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSlow, setIsSlow] = useState(false);
  const displayMode = useStore((s) => s.profile.displayMode);

  // Try SVG animation first when in svg mode
  const SvgAnim = displayMode === "svg" ? getSvgAnimation(exerciseName) : null;

  if (SvgAnim) {
    return (
      <div className={`relative overflow-hidden bg-surface-2/50 flex items-center justify-center text-volt ${className}`}>
        <div className={isSlow ? "[&_*]:![animation-duration:4s]" : ""} style={{ animationPlayState: isPlaying ? "running" : "paused" }}>
          <SvgAnim className="w-full h-full" />
        </div>
        <AnimationControls
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onReplay={() => { setIsPlaying(false); setTimeout(() => setIsPlaying(true), 50); }}
          onSlowToggle={() => setIsSlow(v => !v)}
          isSlow={isSlow}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden gif-frame ${className}`}>
      {state === "loading" && (
        <div className="absolute inset-0 skeleton" aria-hidden />
      )}
      {state === "error" ? (
        <div className="absolute inset-0 grid place-items-center text-faint">
          <ImageOff size={28} strokeWidth={1.5} />
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          initial={{ opacity: 0 }}
          animate={{ opacity: state === "ready" ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="w-full h-full object-cover"
          draggable={false}
        />
      )}
    </div>
  );
}
