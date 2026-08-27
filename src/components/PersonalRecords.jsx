import { useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, Flame, Target, Repeat } from "lucide-react";
import { useStore } from "../store/useStore";
import { useI18n } from "../i18n/useI18n";
import GifImage from "./GifImage";

export default function PersonalRecords() {
  const { t, lang } = useI18n();
  const personalRecords = useStore((s) => s.personalRecords);
  const catalog = useStore((s) => s.catalog);

  const records = useMemo(() => {
    const entries = Object.entries(personalRecords)
      .map(([exerciseId, pr]) => ({
        exerciseId,
        ...pr,
      }))
      .sort((a, b) => {
        const da = a.lastUpdated || "";
        const db = b.lastUpdated || "";
        return db.localeCompare(da);
      });
    return entries;
  }, [personalRecords]);

  const getExercise = (id) => catalog.find((e) => e.exerciseId === id);

  if (records.length === 0) {
    return (
      <div className="text-center py-8">
        <Trophy size={28} className="text-faint mx-auto mb-2" />
        <p className="text-sm text-muted font-semibold">{t("prog.pr.none") || "No personal records yet."}</p>
        <p className="text-xs text-faint mt-1">{t("prog.pr.start") || "Complete your first workout to start tracking PRs."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {records.map((pr, i) => {
        const ex = getExercise(pr.exerciseId);
        return (
          <motion.div
            key={pr.exerciseId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            className="card bg-surface-2 border border-line p-3 flex gap-3 items-center"
          >
            <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-surface border border-line">
              {ex?.gifUrl ? (
                <GifImage src={ex.gifUrl} alt={ex.name} exerciseName={ex.name} className="w-full h-full" />
              ) : (
                <div className="w-full h-full grid place-items-center text-faint">
                  <Trophy size={14} />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className={`text-sm font-semibold leading-snug line-clamp-1 ${lang === "en" ? "capitalize" : ""}`}>
                {ex?.name || "Exercise"}
              </h4>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                <span className="inline-flex items-center gap-1 text-[11px] text-volt font-semibold" dir="ltr">
                  <Flame size={10} />
                  {pr.maxWeight}kg
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-ice font-semibold" dir="ltr">
                  <Repeat size={10} />
                  {pr.maxReps} reps
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-lilac font-semibold" dir="ltr">
                  <Target size={10} />
                  {pr.maxVolume} vol
                </span>
              </div>
            </div>

            {pr.lastUpdated && (
              <span className="text-[10px] text-faint shrink-0" dir="ltr">
                {pr.lastUpdated}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
