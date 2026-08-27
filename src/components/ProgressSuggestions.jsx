import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Lightbulb } from "lucide-react";
import { useStore } from "../store/useStore";
import { useI18n } from "../i18n/useI18n";

function parseReps(reps) {
  if (typeof reps === "number") return reps;
  if (typeof reps === "string") {
    const parts = reps.split("-").map(Number);
    if (parts.length === 2) return (parts[0] + parts[1]) / 2;
    return Number(reps) || 0;
  }
  return 0;
}

function analyzeExercise(exerciseId, logs) {
  const dates = Object.keys(logs).sort();
  const recent = dates
    .filter((d) => logs[d].entries?.some((e) => e.exerciseId === exerciseId))
    .slice(-5);

  if (recent.length < 3) return null;

  const sessions = recent.map((d) => {
    const entry = logs[d].entries.find((e) => e.exerciseId === exerciseId);
    const completedSets = entry?.sets?.filter((s) => s.done) || [];
    const totalWeight = completedSets.reduce((a, s) => a + (Number(s.weight) || 0), 0);
    const totalReps = completedSets.reduce((a, s) => a + (Number(s.reps) || 0), 0);
    const avgWeight = completedSets.length ? totalWeight / completedSets.length : 0;
    const avgReps = completedSets.length ? totalReps / completedSets.length : 0;
    return { date: d, avgWeight, avgReps, sets: completedSets };
  });

  const weights = sessions.map((s) => s.avgWeight);
  const reps = sessions.map((s) => s.avgReps);

  const allSameWeight = weights.every((w) => Math.abs(w - weights[0]) < 0.5);
  const repsIncreasing = reps.every((r, i) => i === 0 || r >= reps[i - 1] - 0.5);
  const repsIncreasingBy2 = reps[reps.length - 1] - reps[0] >= 2;
  const weightIncreasing = weights[weights.length - 1] > weights[0] + 0.5;
  const performanceDeclining =
    reps[reps.length - 1] < reps[0] - 1 || (repsIncreasing === false && weightIncreasing === false);

  if (allSameWeight && repsIncreasingBy2) {
    return {
      type: "increaseReps",
      exerciseId,
      weight: weights[0],
      detail: `avg reps: ${reps[0].toFixed(1)} → ${reps[reps.length - 1].toFixed(1)}`,
    };
  }
  if (allSameWeight && repsIncreasing && reps[0] >= 10) {
    return {
      type: "increaseWeight",
      exerciseId,
      weight: weights[0],
      detail: `all sets hit target reps at ${weights[0]}kg`,
    };
  }
  if (weightIncreasing && repsIncreasing) {
    return {
      type: "increaseWeight",
      exerciseId,
      weight: weights[0],
      detail: `both weight and reps trending up`,
    };
  }
  if (performanceDeclining) {
    return {
      type: "maintain",
      exerciseId,
      weight: weights[weights.length - 1],
      detail: `reps dropped — consolidate at ${weights[weights.length - 1]}kg`,
    };
  }

  return null;
}

export default function ProgressSuggestions() {
  const { t } = useI18n();
  const logs = useStore((s) => s.logs);
  const catalog = useStore((s) => s.catalog);

  const suggestions = useMemo(() => {
    const allExerciseIds = new Set();
    Object.values(logs).forEach((log) => {
      log.entries?.forEach((e) => allExerciseIds.add(e.exerciseId));
    });

    const results = [];
    for (const exId of allExerciseIds) {
      const suggestion = analyzeExercise(exId, logs);
      if (suggestion) results.push(suggestion);
      if (results.length >= 3) break;
    }
    return results;
  }, [logs]);

  const getExerciseName = (id) => {
    const ex = catalog.find((e) => e.exerciseId === id);
    return ex?.name || "Exercise";
  };

  const getExerciseGif = (id) => {
    const ex = catalog.find((e) => e.exerciseId === id);
    return ex?.gifUrl;
  };

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-6">
        <Lightbulb size={24} className="text-faint mx-auto mb-2" />
        <p className="text-sm text-muted">{t("prog.keepGoing") || "Keep going — suggestions will appear after a few more workouts."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {suggestions.map((s, i) => (
        <motion.div
          key={s.exerciseId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
          className="card bg-surface-2 border border-line p-3.5 flex gap-3 items-start"
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-surface border border-line">
            {getExerciseGif(s.exerciseId) ? (
              <img
                src={getExerciseGif(s.exerciseId)}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full grid place-items-center text-faint">
                <Lightbulb size={14} />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              {s.type === "increaseWeight" && <TrendingUp size={13} className="text-volt shrink-0" />}
              {s.type === "increaseReps" && <TrendingUp size={13} className="text-ice shrink-0" />}
              {s.type === "maintain" && <Minus size={13} className="text-ember shrink-0" />}
              <h4 className="text-sm font-semibold leading-snug line-clamp-1">
                {getExerciseName(s.exerciseId)}
              </h4>
            </div>
            <p className="text-xs text-muted mt-0.5">
              {t(`prog.${s.type}`)}
              {s.type === "increaseWeight" && (
                <span className="text-faint"> — {t("prog.weight")} {s.weight}kg → {s.weight + 2}kg</span>
              )}
              {s.type === "increaseReps" && (
                <span className="text-faint"> — {s.detail}</span>
              )}
              {s.type === "maintain" && (
                <span className="text-faint"> — {s.detail}</span>
              )}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
