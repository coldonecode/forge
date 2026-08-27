import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Check, Trophy, Weight, Clock3, PartyPopper, Flag,
} from "lucide-react";
import { useStore, todayISO } from "../store/useStore";
import { getById } from "../api/exerciseDb";
import GifImage from "../components/GifImage";
import RestTimer from "../components/RestTimer";
import WorkoutNotes from "../components/WorkoutNotes";
import { useI18n } from "../i18n/useI18n";
import { formatDate } from "../i18n/translations";
import { haptic, hapticSuccess, keepScreenAwake } from "../utils/mobile";
import EducationQuickGuide from "../components/EducationQuickGuide";

export default function Session() {
  const session = useStore((s) => s.activeSession);
  const logSet = useStore((s) => s.logSet);
  const finishSession = useStore((s) => s.finishSession);
  const discardSession = useStore((s) => s.discardSession);
  const setPage = useStore((s) => s.setPage);
  const { t, lang } = useI18n();

  const [resting, setResting] = useState(null); // { seconds, id }
  const [elapsed, setElapsed] = useState(0);
  const [finishedLog, setFinishedLog] = useState(null);
  const [noteModal, setNoteModal] = useState(null);

  useEffect(() => {
    if (!session) return;
    setElapsed(Math.floor((Date.now() - session.startedAt) / 1000));
    const timer = setInterval(
      () => setElapsed(Math.floor((Date.now() - session.startedAt) / 1000)),
      1000
    );
    return () => clearInterval(timer);
  }, [session?.startedAt]);

  // Keep the screen on during workouts (re-acquires after backgrounding)
  useEffect(() => {
    if (!session) return;
    keepScreenAwake(true);
    const onVisible = () => {
      if (document.visibilityState === "visible") keepScreenAwake(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      keepScreenAwake(false);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [session?.startedAt]);

  const totals = useMemo(() => {
    if (!session) return { done: 0, all: 0 };
    let done = 0;
    let all = 0;
    for (const en of session.entries) {
      for (const s of en.sets) {
        all++;
        if (s.done) done++;
      }
    }
    return { done, all };
  }, [session]);

  if (finishedLog) {
    return <FinishScreen log={finishedLog} />;
  }

  if (!session) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-muted mb-5">{t("ss.none")}</p>
        <button onClick={() => setPage("dashboard")} className="btn-volt">{t("ss.backToday")}</button>
      </div>
    );
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const handleFinish = () => {
    const log = finishSession();
    if (log) setFinishedLog(log);
  };

  const onSetDone = (ei, si) => {
    const set = session.entries[ei].sets[si];
    if (set.done) {
      logSet(ei, si, { done: false });
      haptic(15);
      return;
    }
    if (!String(set.reps).trim()) return; // need reps before completing
    logSet(ei, si, { done: true });
    hapticSuccess();
    setResting({ seconds: session.entries[ei].restSec ?? 90, id: `${ei}-${si}` });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-32 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            if (confirm(t("ss.discardConfirm"))) {
              discardSession();
              setPage("dashboard");
            }
          }}
          className="w-9 h-9 grid place-items-center rounded-full bg-surface border border-line text-muted hover:text-ember hover:border-ember/50 transition-colors cursor-pointer shrink-0"
          aria-label="Exit workout"
        >
          <X size={17} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-bold text-xl truncate">{session.dayName}</h1>
          <div className="text-xs text-faint truncate">
            {t("ss.inProgress")} · {formatDate(new Date(session.startedAt), lang)}
          </div>
        </div>
        <div className="chip !text-volt !border-volt/40 !bg-volt/10 tabular-nums !font-bold shrink-0" dir="ltr">
          {mm}:{ss}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-2.5 rounded-full bg-surface-2 overflow-hidden border border-line">
          <motion.div
            className="h-full bg-volt shadow-glow"
            animate={{ width: `${totals.all ? (totals.done / totals.all) * 100 : 0}%` }}
            transition={{ ease: "easeOut", duration: 0.4 }}
          />
        </div>
        <span className="text-xs text-muted tabular-nums shrink-0" dir="ltr">
          {t("ss.setsCount", { done: totals.done, all: totals.all })}
        </span>
      </div>

      {/* Exercises */}
      <div className="mt-7 space-y-5">
        {session.entries.map((en, ei) => {
          const ex = getById(en.exerciseId);
          const entryDone = en.sets.every((s) => s.done);
          return (
            <motion.section
              key={en.rowId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: entryDone ? 0.55 : 1, y: 0 }}
              transition={{ duration: 0.4, delay: ei * 0.05 }}
              className="card p-4 sm:p-5"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <GifImage src={ex?.gifUrl} alt={ex?.name} exerciseName={ex?.name} eager={ei === 0} className="w-14 h-14 rounded-xl border border-line shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className={`font-display font-semibold leading-tight line-clamp-2 ${lang === "en" ? "capitalize" : ""}`}>{ex?.name}</h2>
                    <button
                      onClick={() => setNoteModal({ exerciseId: en.exerciseId, date: todayISO() })}
                      className="shrink-0 text-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Add note"
                    >
                      📝
                    </button>
                  </div>
                  <div className="text-xs text-faint mt-0.5" dir="ltr" style={{ textAlign: "start" }}>
                    {t("ss.target")} {en.targetSets} × {en.targetReps}
                  </div>
                </div>
                {entryDone && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="chip !bg-volt !text-bg !border-volt !font-bold shrink-0"
                  >
                    ✓ {t("ss.done")}
                  </motion.span>
                )}
              </div>

              <EducationQuickGuide exerciseName={ex?.name} />

              <div className="space-y-2">
                <div className="grid grid-cols-[24px_minmax(0,1fr)_minmax(0,1fr)_44px] gap-1.5 text-[10px] text-faint px-1">
                  <span className="text-center">{t("ss.col.set")}</span>
                  <span className="text-center">{t("ss.col.weight")}</span>
                  <span className="text-center">{t("ss.col.reps")}</span>
                  <span />
                </div>
                {en.sets.map((set, si) => (
                  <div
                    key={si}
                    className={`grid grid-cols-[24px_minmax(0,1fr)_minmax(0,1fr)_44px] gap-1.5 items-center rounded-xl border px-1 py-1 transition-colors ${
                      set.done ? "border-volt/40 bg-volt/10" : "border-line bg-surface-2/50"
                    }`}
                  >
                    <span className={`text-center text-xs font-bold tabular-nums ${set.done ? "text-volt" : "text-faint"}`}>
                      {si + 1}
                    </span>
                    <input
                      type="number" inputMode="decimal" placeholder="—"
                      value={set.weight}
                      onChange={(e) => logSet(ei, si, { weight: e.target.value })}
                      disabled={set.done}
                      dir="ltr"
                      className="bg-bg/60 border border-line rounded-lg px-1.5 py-2 text-sm text-center outline-none focus:border-volt/60 disabled:opacity-50 transition-colors min-w-0 w-full"
                    />
                    <input
                      type="number" inputMode="numeric" placeholder={en.targetReps}
                      value={set.reps}
                      onChange={(e) => logSet(ei, si, { reps: e.target.value })}
                      disabled={set.done}
                      dir="ltr"
                      className="bg-bg/60 border border-line rounded-lg px-1.5 py-2 text-sm text-center outline-none focus:border-volt/60 disabled:opacity-50 transition-colors placeholder:text-faint min-w-0 w-full"
                    />
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      onClick={() => onSetDone(ei, si)}
                      aria-label={set.done ? "Uncheck set" : "Complete set"}
                      className={`w-10 h-10 mx-auto grid place-items-center rounded-xl cursor-pointer transition-all ${
                        set.done
                          ? "bg-volt text-bg shadow-glow"
                          : "bg-surface-2 border border-line text-faint hover:border-volt/60 hover:text-volt"
                      }`}
                    >
                      <Check size={17} strokeWidth={3} />
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Finish bar */}
      <div className="fixed bottom-16 lg:bottom-6 inset-x-0 z-30 px-4 pointer-events-none">
        <motion.div
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="max-w-3xl mx-auto card p-3 flex items-center gap-3 pointer-events-auto bg-surface/95 backdrop-blur"
        >
          <div className="items-center gap-2 text-xs text-muted ps-1 shrink-0 hidden sm:flex">
            <Clock3 size={14} /> <span className="tabular-nums" dir="ltr">{mm}:{ss}</span>
          </div>
          <div className="flex-1 h-2 rounded-full bg-surface-2 overflow-hidden border border-line min-w-0">
            <motion.div
              className="h-full bg-volt"
              animate={{ width: `${totals.all ? (totals.done / totals.all) * 100 : 0}%` }}
            />
          </div>
          <button
            onClick={() => {
              const completeAll =
                totals.done > 0 &&
                session.entries.every((en) => en.sets.every((s) => s.done));
              if (completeAll || confirm(t("ss.finishConfirm"))) handleFinish();
            }}
            disabled={totals.done === 0}
            className="btn-volt !py-2 !px-4 text-sm shrink-0"
          >
            <Flag size={14} /> {t("ss.finish")}
          </button>
        </motion.div>
      </div>

      {/* Rest overlay */}
      <AnimatePresence>
        {resting != null && (
          <RestTimer
            key={resting.id}
            seconds={resting.seconds}
            onSkip={() => setResting(null)}
            onDone={() => setResting(null)}
          />
        )}
      </AnimatePresence>

      {/* Notes modal */}
      <AnimatePresence>
        {noteModal && (
          <WorkoutNotes
            exerciseId={noteModal.exerciseId}
            date={noteModal.date}
            onClose={() => setNoteModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function FinishScreen({ log }) {
  const setPage = useStore((s) => s.setPage);
  const { t, lang } = useI18n();
  return (
    <div className="min-h-[80vh] grid place-items-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="card max-w-sm w-full p-8 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-volt/12 to-transparent pointer-events-none" />
        {[...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            animate={{ opacity: 0, y: -120 - Math.random() * 80, x: (Math.random() - 0.5) * 160, rotate: Math.random() * 240 }}
            transition={{ duration: 1.6 + Math.random(), delay: 0.15 + i * 0.06 }}
            className="absolute left-1/2 top-1/3 w-2 h-2 rounded-sm pointer-events-none"
            style={{ background: ["#a3e635", "#ff6b35", "#38bdf8", "#a78bfa"][i % 4] }}
          />
        ))}
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 14 }}
          className="w-20 h-20 mx-auto rounded-full bg-volt grid place-items-center shadow-glow"
        >
          <Trophy size={36} className="text-bg" strokeWidth={2.2} />
        </motion.div>

        <h1 className="font-display font-bold text-2xl mt-5">{t("ss.complete")}</h1>
        <p className="text-muted text-sm mt-1.5">{t("ss.savedTo", { day: log.dayName })}</p>

        <div className="grid grid-cols-3 gap-2 mt-6">
          <MiniStat icon={<Clock3 size={15} />} value={`${log.durationMin}`} label={t("ss.minutes")} />
          <MiniStat icon={<Check size={15} />} value={`${log.totalSets}`} label={t("ss.setsDone")} />
          <MiniStat icon={<Weight size={15} />} value={log.volume >= 10000 ? `${Math.round(log.volume / 1000)}k` : log.volume.toLocaleString()} label={t("ss.kgVolume")} />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <button onClick={() => setPage("dashboard")} className="btn-volt w-full mt-7">
            <PartyPopper size={16} /> {t("ss.backTodayBtn")}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MiniStat({ icon, value, label }) {
  return (
    <div className="rounded-xl bg-surface-2 border border-line py-3">
      <div className="text-volt flex justify-center">{icon}</div>
      <div className="font-display font-bold text-lg mt-1 tabular-nums" dir="ltr">{value}</div>
      <div className="text-[10px] text-faint leading-tight mt-0.5 px-1">{label}</div>
    </div>
  );
}
