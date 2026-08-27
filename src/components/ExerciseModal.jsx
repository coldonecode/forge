import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Target, Flame, ListOrdered, Plus, Check,
  ArrowRightLeft, Dumbbell, ChevronDown,
} from "lucide-react";
import GifImage from "./GifImage";
import EducationPanel from "./EducationPanel";
import FamiliarityBadge from "./FamiliarityBadge";
import FavoriteButton from "./FavoriteButton";
import { useStore } from "../store/useStore";
import { EXERCISE_ALTERNATIVES } from "../data/exerciseAlternatives";
import { useI18n } from "../i18n/useI18n";
import { translateInstructions } from "../i18n/translateExercise";
import { formatMuscleLocal, formatBodyPart, formatEquipment } from "../i18n/translations";
import { weekdayName as wdName } from "../i18n/translations";

function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2 text-sm font-display font-semibold text-ink">
      {icon}
      {title}
    </div>
  );
}

function Collapsible({ icon, title, children, defaultOpen = false }) {
  return (
    <details open={defaultOpen} className="group">
      <summary className="flex items-center gap-2.5 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
        <SectionHeader icon={icon} title={title} />
        <ChevronDown
          size={15}
          className="ms-auto text-faint transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}

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
  const instructions = lang === "fa"
    ? translateInstructions(exercise.instructions)
    : exercise.instructions;
  const alternatives = EXERCISE_ALTERNATIVES?.[exercise.name];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-bg overflow-y-auto overflow-x-hidden"
        onClick={onClose}
      >
        {/* Close + Favorite — top-right floating */}
        <div className="sticky top-0 z-50 flex justify-end gap-1.5 p-3 sm:p-4">
          <FavoriteButton type="exercises" id={exercise.exerciseId} />
          <button
            onClick={onClose}
            className="w-9 h-9 grid place-items-center rounded-full bg-surface border border-line text-muted hover:text-ink transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content card — centered on desktop, full-width on mobile */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="card max-w-2xl mx-auto -mt-10 sm:-mt-14 mb-24 overflow-hidden"
        >
          {/* 1. GIF — full width */}
          <GifImage
            src={exercise.gifUrl}
            alt={exercise.name}
            exerciseName={exercise.name}
            eager
            className="w-full h-[200px] rounded-t-2xl"
          />

          <div className="px-5 pb-5 flex flex-col">
            {/* 2. Name + Heart */}
            <div className="flex items-start gap-2 pt-4 pb-1">
              <h2
                className={`font-display text-xl font-bold leading-tight flex-1 min-w-0 ${
                  lang === "en" ? "capitalize" : ""
                }`}
              >
                {exercise.name}
              </h2>
              <FamiliarityBadge exerciseId={exercise.exerciseId} />
            </div>

            {/* 3. Tags row */}
            <div className="flex flex-wrap gap-1.5 pb-4">
              {exercise.equipments.map((eq) => (
                <span key={eq} className="chip !text-volt !border-volt/30 !bg-volt/10">
                  <Dumbbell size={11} />
                  {formatEquipment(eq, lang)}
                </span>
              ))}
              {exercise.bodyParts.map((bp) => (
                <span key={bp} className="chip">{formatBodyPart(bp, lang)}</span>
              ))}
            </div>

            {/* 4. Muscles — two compact cards */}
            <div className="grid grid-cols-2 gap-2.5 pb-4 border-t border-line/50 pt-4">
              <div className="rounded-xl bg-surface-2 border border-line px-3.5 py-3">
                <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                  <Target size={13} /> {t("ex.primary")}
                </div>
                <div className="text-sm font-semibold">
                  {exercise.targetMuscles.map((m) => formatMuscleLocal(m, lang)).join(joiner)}
                </div>
              </div>
              <div className="rounded-xl bg-surface-2 border border-line px-3.5 py-3">
                <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                  <Flame size={13} /> {t("ex.secondary")}
                </div>
                <div className="text-sm font-semibold">
                  {exercise.secondaryMuscles.length
                    ? exercise.secondaryMuscles.map((m) => formatMuscleLocal(m, lang)).join(joiner)
                    : "—"}
                </div>
              </div>
            </div>

            {/* 5. How to do it — collapsible */}
            <Collapsible
              icon={<ListOrdered size={15} className="text-volt shrink-0" />}
              title={t("ex.how")}
            >
              <ol className="space-y-2.5">
                {instructions.map((step, i) => {
                  const clean = step.replace(/^Step:\s*\d+\s*/i, "");
                  return (
                    <li key={i} className="flex gap-2.5 text-[13px] text-muted leading-relaxed">
                      <span
                        className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-volt/15 text-volt text-[11px] font-bold grid place-items-center tabular-nums"
                        dir="ltr"
                      >
                        {i + 1}
                      </span>
                      {clean}
                    </li>
                  );
                })}
              </ol>
            </Collapsible>

            <div className="border-t border-line/50" />

            {/* 6. Coach's notes */}
            <EducationPanel exerciseName={exercise.name} />

            <div className="border-t border-line/50" />

            {/* 7. Alternatives */}
            {alternatives?.length > 0 && (
              <>
                <div className="py-4">
                  <SectionHeader
                    icon={<ArrowRightLeft size={14} className="text-ice shrink-0" />}
                    title={t("alt.title")}
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {alternatives.map((alt) => (
                      <span
                        key={alt}
                        className="chip !text-[11px] !py-1 cursor-pointer hover:!border-ice/50 hover:!text-ice capitalize"
                      >
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-line/50" />
              </>
            )}
          </div>
        </motion.div>

        {/* 8. Add to plan — sticky bottom bar */}
        {planDays.length > 0 && (
          <div className="fixed bottom-0 inset-x-0 z-50">
            <div className="max-w-2xl mx-auto bg-bg/80 backdrop-blur-lg border-t border-line/50 px-5 py-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Plus size={16} className="text-volt shrink-0" />
                <span className="text-sm font-display font-semibold shrink-0">{t("ex.addTo")}</span>
                {planDays.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => addToDay(d.id)}
                    className={`chip cursor-pointer transition-all ${
                      addedTo === d.id
                        ? "!bg-volt !text-bg !border-volt"
                        : "hover:!border-volt/50 hover:!text-volt"
                    }`}
                  >
                    {addedTo === d.id && <Check size={12} />}
                    {wdName(d.weekday, lang)} · {d.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
