import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Target, Flame, ListOrdered, Plus, Check } from "lucide-react";
import GifImage from "./GifImage";
import EducationPanel from "./EducationPanel";
import { useStore } from "../store/useStore";
import { useI18n } from "../i18n/useI18n";
import { translateInstructions } from "../i18n/translateExercise";
import { formatMuscleLocal, formatBodyPart, formatEquipment } from "../i18n/translations";
import { weekdayName as wdName } from "../i18n/translations";

export default function ExerciseModal({ exercise, onClose }) {
  const [addedTo, setAddedTo] = useState(null);
  const planDays = useStore((s) => s.planDays);
  const addExerciseToDay = useStore((s) => s.addExerciseToDay);
  const { t, lang } = useI18n();

  if (!exercise) return null;

  const addToDay = (dayId) => {
    addExerciseToDay(dayId, exercise.exerciseId);
    setAddedTo(dayId);
    setTimeout(() => setAddedTo(null), 1600);
  };

  const joiner = lang === "fa" ? "، " : ", ";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto overflow-x-hidden flex flex-col"
      >
        <motion.div
          initial={{ y: 60, scale: 0.96, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 40, scale: 0.97, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="card w-full max-w-3xl max-w-full relative mx-auto my-auto overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-3.5 end-3.5 z-10 w-9 h-9 grid place-items-center rounded-full bg-bg/70 border border-line text-muted hover:text-ink transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] overflow-hidden">
            <GifImage src={exercise.gifUrl} alt={exercise.name} exerciseName={exercise.name} eager className="aspect-square md:aspect-auto md:min-h-full max-h-[420px] md:max-h-none" />

            <div className="p-6 flex flex-col gap-4 min-w-0">
              <div>
                <h2 className={`font-display text-xl font-bold leading-tight pe-8 ${lang === "en" ? "capitalize" : ""}`}>{exercise.name}</h2>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {exercise.equipments.map((eq) => (
                    <span key={eq} className="chip !text-volt !border-volt/30 !bg-volt/10">
                      {formatEquipment(eq, lang)}
                    </span>
                  ))}
                  {exercise.bodyParts.map((bp) => (
                    <span key={bp} className="chip">{formatBodyPart(bp, lang)}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl bg-surface-2 border border-line px-3.5 py-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted mb-1"><Target size={13} /> {t("ex.primary")}</div>
                  <div className="text-sm font-semibold">{exercise.targetMuscles.map((m) => formatMuscleLocal(m, lang)).join(joiner)}</div>
                </div>
                <div className="rounded-xl bg-surface-2 border border-line px-3.5 py-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted mb-1"><Flame size={13} /> {t("ex.secondary")}</div>
                  <div className="text-sm font-semibold">
                    {exercise.secondaryMuscles.length ? exercise.secondaryMuscles.map((m) => formatMuscleLocal(m, lang)).join(joiner) : "—"}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-display font-semibold mb-2">
                  <ListOrdered size={15} className="text-volt" /> {t("ex.how")}
                </div>
                <ol className="space-y-2 max-h-56 overflow-y-auto pe-1">
                  {(lang === "fa" ? translateInstructions(exercise.instructions) : exercise.instructions).map((step, i) => {
                    const clean = step.replace(/^Step:\s*\d+\s*/i, "");
                    return (
                      <li key={i} className="flex gap-2.5 text-[13px] text-muted leading-relaxed">
                        <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-volt/15 text-volt text-[11px] font-bold grid place-items-center tabular-nums" dir="ltr">
                          {i + 1}
                        </span>
                        {clean}
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Deep form education (coach's notes) */}
              <EducationPanel exerciseName={exercise.name} />

              {planDays.length > 0 && (
                <div className="mt-auto pt-2 border-t border-line">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Plus size={16} className="text-volt" />
                    <span className="text-sm font-display font-semibold">{t("ex.addTo")}</span>
                    {planDays.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => addToDay(d.id)}
                        className={`chip cursor-pointer transition-all ${
                          addedTo === d.id ? "!bg-volt !text-bg !border-volt" : "hover:!border-volt/50 hover:!text-volt"
                        }`}
                      >
                        {addedTo === d.id ? <Check size={12} /> : null}
                        {wdName(d.weekday, lang)} · {d.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
