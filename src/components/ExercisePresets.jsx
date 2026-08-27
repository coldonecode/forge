import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Check, Plus } from "lucide-react";
import { MUSCLE_GROUPS, PRESETS } from "../data/exercisePresets";
import { useStore } from "../store/useStore";
import { getById } from "../api/exerciseDb";
import GifImage from "../components/GifImage";
import { useI18n } from "../i18n/useI18n";
import { formatBodyPart } from "../i18n/translations";

export default function ExercisePresets({ dayId, onAdded }) {
  const catalog = useStore((s) => s.catalog);
  const addExerciseToDay = useStore((s) => s.addExerciseToDay);
  const { t, lang } = useI18n();
  const [addedIds, setAddedIds] = useState(() => new Set());

  const resolve = (name) => catalog.find((x) => x.name.toLowerCase() === name.toLowerCase());

  const handleAdd = (preset) => {
    const ex = resolve(preset.name);
    if (!ex || addedIds.has(ex.exerciseId)) return;
    addExerciseToDay(dayId, ex.exerciseId, { sets: preset.sets, reps: preset.reps, restSec: preset.restSec });
    setAddedIds((prev) => new Set(prev).add(ex.exerciseId));
    onAdded?.();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-display font-semibold text-volt">
        <Zap size={15} /> {t("pr.title")}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {MUSCLE_GROUPS.map((mg) => {
          const presets = PRESETS[mg.key] ?? [];
          const resolved = presets.map((p) => ({ ...p, ex: resolve(p.name) })).filter((p) => p.ex);
          if (resolved.length === 0) return null;
          const allAdded = resolved.every((p) => addedIds.has(p.ex.exerciseId));

          return (
            <div key={mg.key} className="rounded-xl border border-line bg-surface-2/50 overflow-hidden">
              <div className="px-3 py-2 flex items-center gap-2 border-b border-line/60">
                <span className="text-base">{mg.icon}</span>
                <span className="font-display font-semibold text-xs capitalize">{formatBodyPart(mg.key, lang)}</span>
                <span className="text-[10px] text-faint ms-auto" dir="ltr">{resolved.length}</span>
              </div>
              <ul className="divide-y divide-line/40">
                {resolved.map((p) => {
                  const done = addedIds.has(p.ex.exerciseId);
                  return (
                    <li key={p.ex.exerciseId} className="flex items-center gap-2 px-2.5 py-2">
                      <GifImage src={p.ex.gifUrl} alt={p.ex.name} exerciseName={p.ex.name} className="w-8 h-8 rounded-lg border border-line shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-medium leading-tight truncate ${lang === "en" ? "capitalize" : ""} ${done ? "text-volt" : ""}`}>
                          {p.ex.name}
                        </div>
                        <div className="text-[10px] text-faint" dir="ltr">{p.sets}×{p.reps}</div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleAdd(p)}
                        disabled={done}
                        className={`w-7 h-7 grid place-items-center rounded-lg text-xs cursor-pointer transition-all shrink-0 ${
                          done
                            ? "bg-volt text-bg"
                            : "bg-surface border border-line text-faint hover:border-volt/60 hover:text-volt"
                        }`}
                        aria-label={done ? "Added" : "Add"}
                      >
                        {done ? <Check size={13} strokeWidth={3} /> : <Plus size={14} />}
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
