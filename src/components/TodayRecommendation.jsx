import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Moon, Play, ChevronRight, Info } from "lucide-react";
import { useStore } from "../store/useStore";
import { useI18n } from "../i18n/useI18n";
import { getTodayRecommendation, MUSCLE_GROUPS } from "../utils/recommendation";

// Muscle group display labels (i18n keys)
const MUSCLE_LABELS = {
  chest: "muscle.chest",
  back: "muscle.back",
  shoulders: "muscle.shoulders",
  arms: "muscle.arms",
  legs: "muscle.legs",
  core: "muscle.core",
};

// Color mapping for recovery status dots
const STATUS_COLORS = {
  ready: "bg-green-400",
  recent: "bg-yellow-400",
  needs_rest: "bg-red-400",
};

// Tooltip label i18n keys
const STATUS_LABELS = {
  ready: "rec.ready",
  recent: "rec.recent",
  needs_rest: "rec.needsRest",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

// ---------------------------------------------------------------------------
// MuscleDot — a single muscle group indicator with tooltip
// ---------------------------------------------------------------------------
function MuscleDot({ muscle, info, t, lang }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const daysText =
    info.daysSince === null
      ? lang === "fa" ? "هرگز" : "Never"
      : info.daysSince === 0
        ? lang === "fa" ? "امروز" : "Today"
        : lang === "fa"
          ? `${info.daysSince} روز پیش`
          : `${info.daysSince}d ago`;

  return (
    <div className="relative flex flex-col items-center gap-1">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="flex flex-col items-center gap-1 cursor-pointer select-none focus:outline-none"
        aria-label={`${t(MUSCLE_LABELS[muscle])}: ${t(STATUS_LABELS[info.status])}`}
      >
        <span className={`w-3 h-3 rounded-full ${STATUS_COLORS[info.status]} transition-colors`} />
        <span className="text-[10px] text-faint leading-tight text-center whitespace-nowrap">
          {t(MUSCLE_LABELS[muscle])}
        </span>
      </button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-12 start-1/2 -translate-x-1/2 z-20 px-2.5 py-1.5 rounded-lg bg-surface-2 border border-line shadow-lg text-[11px] text-ink whitespace-nowrap pointer-events-none"
          >
            <span className="font-semibold">{t(MUSCLE_LABELS[muscle])}</span>
            <span className="mx-1 text-faint">·</span>
            <span className="text-muted">{daysText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TodayRecommendation — dashboard card
// ---------------------------------------------------------------------------
export default function TodayRecommendation() {
  const planDays = useStore((s) => s.planDays);
  const logs = useStore((s) => s.logs);
  const profile = useStore((s) => s.profile);
  const catalog = useStore((s) => s.catalog);
  const activeSession = useStore((s) => s.activeSession);
  const setPage = useStore((s) => s.setPage);
  const startSession = useStore((s) => s.startSession);
  const { t, lang } = useI18n();

  const rec = useMemo(
    () => getTodayRecommendation(planDays, logs, profile, catalog),
    [planDays, logs, profile, catalog]
  );

  // If there's an active session, show resume prompt instead
  if (activeSession) {
    return (
      <motion.div variants={item} className="card mt-6 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-volt/15 grid place-items-center shrink-0">
            <Play size={16} className="text-volt" />
          </div>
          <div className="font-display font-semibold text-sm">
            {t("dash.resume1")}
          </div>
        </div>
        <button
          onClick={() => setPage("session")}
          className="btn-volt w-full text-sm"
        >
          {activeSession.dayName}
          <ChevronRight size={14} className="rtl:rotate-180" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div variants={item} className="card mt-6 overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="flex items-center gap-2 mb-1">
          <Dumbbell size={16} className="text-volt" />
          <h3 className="font-display font-semibold text-sm">{t("rec.title")}</h3>
        </div>
      </div>

      {/* Recommendation content */}
      <div className="px-5 pb-4">
        {rec.recommendedDay ? (
          <div className="flex flex-col gap-3">
            {/* Day name + reason */}
            <div className="flex items-start gap-3 mt-2">
              <div className="w-11 h-11 rounded-2xl bg-volt/15 grid place-items-center shrink-0">
                <Dumbbell size={20} className="text-volt" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-lg leading-tight">
                  {rec.recommendedDay.name}
                </div>
                <p className="text-muted text-xs mt-0.5">
                  {t(rec.reason, rec.reasonParams)}
                </p>
              </div>
            </div>

            {/* Start button */}
            <button
              onClick={() => startSession(rec.recommendedDay.id)}
              className="btn-volt w-full text-sm"
            >
              <Play size={15} />
              {t("dash.startWorkout")}
              <ChevronRight size={14} className="rtl:rotate-180" />
            </button>
          </div>
        ) : (
          /* Rest day */
          <div className="flex items-start gap-3 mt-3">
            <div className="w-11 h-11 rounded-2xl bg-ice/15 grid place-items-center shrink-0">
              <Moon size={20} className="text-ice" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-sm">
                {t("dash.restTitle")}
              </div>
              <p className="text-muted text-xs mt-0.5">
                {t(rec.reason, rec.reasonParams)}
              </p>
            </div>
          </div>
        )}

        {/* Muscle readiness row */}
        <div className="mt-4 pt-3 border-t border-line/60">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Info size={12} className="text-faint" />
            <span className="text-[11px] text-faint font-medium">
              {t("rec.recovery")}
            </span>
          </div>
          <div className="flex justify-between items-start px-1">
            {rec.muscleReadiness.map((m) => (
              <MuscleDot
                key={m.muscle}
                muscle={m.muscle}
                info={m}
                t={t}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
