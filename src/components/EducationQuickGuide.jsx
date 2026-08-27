import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Wind, TriangleAlert, CircleCheckBig } from "lucide-react";
import { findEducation } from "../data/exerciseEducation";
import { useI18n } from "../i18n/useI18n";

// Compact collapsible shown inside the workout player: breathing + top cues
// + the #1 mistake fix — just enough to check mid-set.
export default function EducationQuickGuide({ exerciseName }) {
  const [open, setOpen] = useState(false);
  const { t, lang } = useI18n();
  const edu = useMemo(() => findEducation(exerciseName), [exerciseName]);

  if (!edu) return null;

  const cueList = (edu.cues?.[lang] ?? edu.cues?.en ?? []).slice(0, 2);
  const topMistake = edu.mistakes?.[0];
  const breath = edu.breathing?.[lang] ?? edu.breathing?.en;

  return (
    <div className="mb-3 rounded-xl border border-line/80 bg-surface-2/40 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-display font-semibold text-muted hover:text-volt transition-colors cursor-pointer select-none"
      >
        <CircleCheckBig size={13} className={open ? "text-volt" : ""} />
        {t("edu.quickGuide")}
        <ChevronDown size={14} className={`ms-auto transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-2 text-xs">
              {breath && (
                <p className="flex gap-1.5 text-muted">
                  <Wind size={12} className="text-ice shrink-0 mt-0.5" />
                  {breath}
                </p>
              )}
              {cueList.map((c, i) => (
                <p key={i} className="flex gap-1.5 text-muted">
                  <span className="text-volt shrink-0">✓</span> {c}
                </p>
              ))}
              {topMistake && (
                <p className="flex gap-1.5 text-muted">
                  <TriangleAlert size={12} className="text-ember shrink-0 mt-0.5" />
                  {topMistake.fix[lang] ?? topMistake.fix.en}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
