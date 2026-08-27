import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useStore } from "../store/useStore";
import { useI18n } from "../i18n/useI18n";

const LEVELS = ["never_tried", "learning", "comfortable", "mastered"];

const LEVEL_COLORS = {
  never_tried: "bg-faint/20 text-faint border-faint/30",
  learning: "bg-ice/15 text-ice border-ice/30",
  comfortable: "bg-volt/15 text-volt border-volt/30",
  mastered: "bg-lilac/15 text-lilac border-lilac/30",
};

export default function FamiliarityBadge({ exerciseId }) {
  const { t } = useI18n();
  const level = useStore((s) => s.familiarity[exerciseId] || "never_tried");
  const setFamiliarity = useStore((s) => s.setFamiliarity);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const cycle = () => {
    const idx = LEVELS.indexOf(level);
    const next = LEVELS[(idx + 1) % LEVELS.length];
    setFamiliarity(exerciseId, next);
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          cycle();
        }}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border cursor-pointer transition-colors ${LEVEL_COLORS[level]}`}
      >
        {t(`fam.${level}`)}
        <ChevronDown size={10} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 top-full mt-1 start-0 min-w-[130px] bg-surface-2 border border-line rounded-xl shadow-lg overflow-hidden"
          >
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={(e) => {
                  e.stopPropagation();
                  setFamiliarity(exerciseId, l);
                  setOpen(false);
                }}
                className={`w-full text-start px-3 py-1.5 text-[12px] font-semibold flex items-center gap-2 cursor-pointer transition-colors hover:bg-surface ${
                  l === level ? "text-volt" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    l === "never_tried"
                      ? "bg-faint"
                      : l === "learning"
                        ? "bg-ice"
                        : l === "comfortable"
                          ? "bg-volt"
                          : "bg-lilac"
                  }`}
                />
                {t(`fam.${l}`)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
