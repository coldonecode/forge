import { useMemo } from "react";
import { motion } from "framer-motion";
import { History as HistoryIcon, Weight, Clock3, ChevronDown, Sparkles } from "lucide-react";
import { useStore } from "../store/useStore";
import { getById } from "../api/exerciseDb";
import GifImage from "../components/GifImage";
import { useI18n } from "../i18n/useI18n";

export default function History() {
  const logs = useStore((s) => s.logs);
  const { t, lang } = useI18n();

  const entries = useMemo(
    () => Object.entries(logs).sort((a, b) => b[1].startedAt - a[1].startedAt),
    [logs]
  );

  // weekly volume, last 8 weeks
  const weeks = useMemo(() => {
    const arr = [];
    const now = new Date();
    for (let i = 7; i >= 0; i--) {
      const monday = new Date(now);
      monday.setDate(now.getDate() - ((now.getDay() + 6) % 7) - i * 7);
      monday.setHours(0, 0, 0, 0);
      const end = monday.getTime() + 1000 * 60 * 60 * 24 * 7;
      const vol = Object.values(logs)
        .filter((l) => l.startedAt >= monday.getTime() && l.startedAt < end)
        .reduce((a, l) => a + (l.volume ?? 0), 0);
      arr.push({ label: `${monday.getMonth() + 1}/${monday.getDate()}`, vol });
    }
    return arr;
  }, [logs]);

  const maxVol = Math.max(...weeks.map((w) => w.vol), 1);
  const totalVol = entries.reduce((a, [, l]) => a + (l.volume ?? 0), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="font-display font-bold text-3xl tracking-tight">{t("hi.title")}</h1>
        <p className="text-muted text-sm mt-1.5">{t("hi.sub")}</p>
      </motion.div>

      {/* Volume chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-5 mb-6">
        <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
          <div className="font-display font-semibold text-sm">{t("hi.weeklyVolume")}</div>
          <div className="text-xs text-faint flex items-center gap-1.5">
            <Weight size={12} /> {t("hi.kgTotal", { v: totalVol.toLocaleString() })}
          </div>
        </div>
        <div className="flex items-end gap-2 h-32" dir="ltr">
          {weeks.map((w, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="relative w-full flex justify-end" style={{ height: "100%" }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(w.vol / maxVol) * 100}%` }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute bottom-0 w-full max-w-[34px] rounded-t-lg ${w.vol > 0 ? "bg-volt/70" : "bg-surface-2"}`}
                  title={`${w.vol.toLocaleString()} kg`}
                />
              </div>
              <span className="text-[9.5px] tabular-nums" style={{ color: i === weeks.length - 1 ? "var(--color-volt)" : "var(--color-faint)" }}>
                {w.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Sessions */}
      {entries.length === 0 ? (
        <EmptyHistory />
      ) : (
        <div className="space-y-3.5">
          {entries.map(([date, log], idx) => (
            <SessionEntry key={date} date={date} log={log} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

function SessionEntry({ log, index }) {
  const { t, lang } = useI18n();
  return (
    <motion.details
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.06, 0.4) }}
      className="card overflow-hidden group"
    >
      <summary className="flex items-center gap-4 p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <div className="w-11 h-11 rounded-xl bg-volt/10 border border-volt/25 grid place-items-center shrink-0">
          <Sparkles size={18} className="text-volt" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-[15px]">{log.dayName}</div>
          <div className="text-xs text-faint mt-0.5">
            {new Date(log.startedAt).toLocaleDateString(lang === "fa" ? "fa-IR" : undefined, {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs text-muted shrink-0">
          <span className="flex items-center gap-1"><Clock3 size={13} /> {log.durationMin} {t("hi.min")}</span>
          <span className="flex items-center gap-1"><Weight size={13} /> {log.volume.toLocaleString()} kg</span>
          <span>{log.totalSets} {t("hi.sets")}</span>
        </div>
        <ChevronDown size={16} className="text-faint transition-transform group-open:rotate-180 shrink-0" />
      </summary>
      <div className="border-t border-line px-4 py-3 space-y-2.5">
        {log.entries.map((en, i) => {
          const ex = getById(en.exerciseId);
          if (!ex || en.sets.length === 0) return null;
          return (
            <div key={i} className="flex items-center gap-3">
              <GifImage src={ex.gifUrl} alt={ex.name} exerciseName={ex.name} className="w-9 h-9 rounded-lg border border-line shrink-0" />
              <div className="min-w-0 flex-1">
                <div className={`text-sm truncate ${lang === "en" ? "capitalize" : ""}`}>{ex.name}</div>
                <div className="text-[11px] text-faint mt-0.5" dir="ltr" style={{ textAlign: "start" }}>
                  {en.sets.map((s, j) => `${s.weight || "BW"}×${s.reps || "?"}`).join("  ·  ")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.details>
  );
}

function EmptyHistory() {
  const setPage = useStore((s) => s.setPage);
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
      className="card p-10 text-center"
    >
      <HistoryIcon size={38} strokeWidth={1.5} className="text-faint mx-auto" />
      <h2 className="font-display font-semibold mt-4">{t("hi.emptyTitle")}</h2>
      <p className="text-muted text-sm mt-1.5">{t("hi.emptyBody")}</p>
      <button onClick={() => setPage("dashboard")} className="btn-volt mt-6 !py-2.5 !px-6 text-sm">
        {t("hi.emptyBtn")}
      </button>
    </motion.div>
  );
}
