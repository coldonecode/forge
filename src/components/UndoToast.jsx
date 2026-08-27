import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Undo2, Trash2 } from "lucide-react";

const DISMISS_MS = 5000;

export default function UndoToast({ message, onUndo, onDismiss }) {
  const [remaining, setRemaining] = useState(DISMISS_MS);

  useEffect(() => {
    const tick = setInterval(() => {
      setRemaining((r) => {
        if (r <= 100) {
          clearInterval(tick);
          onDismiss();
          return 0;
        }
        return r - 100;
      });
    }, 100);
    return () => clearInterval(tick);
  }, [onDismiss]);

  const secs = Math.ceil(remaining / 1000);

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 60, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="fixed bottom-20 lg:bottom-6 inset-x-0 z-50 px-4 pointer-events-none"
    >
      <div className="max-w-lg mx-auto card bg-surface/95 backdrop-blur px-4 py-3 flex items-center gap-3 pointer-events-auto border-line">
        <Trash2 size={16} className="text-ember shrink-0" />
        <span className="flex-1 text-sm text-muted min-w-0 truncate">{message}</span>
        <button
          onClick={onUndo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-volt/15 text-volt text-xs font-display font-bold hover:bg-volt/25 transition-colors cursor-pointer shrink-0"
        >
          <Undo2 size={14} /> Undo
        </button>
        <span className="text-[10px] text-faint tabular-nums shrink-0" dir="ltr">{secs}s</span>
      </div>
    </motion.div>
  );
}
