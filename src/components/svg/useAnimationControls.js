import { useState, useCallback } from "react";

export function useAnimationControls() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSlow, setIsSlow] = useState(false);

  const togglePlay = useCallback(() => setIsPlaying((v) => !v), []);
  const handleReplay = useCallback(() => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 50);
  }, []);
  const toggleSlow = useCallback(() => setIsSlow((v) => !v), []);

  return { isPlaying, isSlow, togglePlay, handleReplay, toggleSlow };
}