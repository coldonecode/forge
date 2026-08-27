import { useMemo } from "react";
import { motion } from "framer-motion";
import { Play, MoonStar, ChevronRight, BookOpen, Dumbbell } from "lucide-react";
import {
  useStore, weekdayIndex, sessionsThisWeek, computeStreak, totalVolume,
} from "../store/useStore";
import { useI18n } from "../i18n/useI18n";
import { weekdayName as wdName } from "../i18n/translations";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function Dashboard() {
  const profile = useStore((s) => s.profile);
  const planDays = useStore((s) => s.planDays);
  const logs = useStore((s) => s.logs);
  const setPage = useStore((s) => s.setPage);
  const startSession = useStore((s) => s.startSession);
  const activeSession = useStore((s) => s.activeSession);
  const { t, lang } = useI18n();

  const today = weekdayIndex();

  const stats = useMemo(() => {
    const week = sessionsThisWeek(logs);
    return {
      week,
      streak: computeStreak(logs, profile.daysPerWeek),
      totalWorkouts: Object.keys(logs).length,
      volume: totalVolume(logs),
      doneWeekdays: new Set(week.map((l) => weekdayIndex(new Date(l.startedAt)))),
    };
  }, [logs, profile.daysPerWeek]);

  const todaysDay = planDays.find((d) => d.weekday === today) ?? null;
  const nextDay =
    planDays
      .filter((d) => d.weekday > today)
      .sort((a, b) => a.weekday - b.weekday)[0] ??
    [...planDays].sort((a, b) => a.weekday - b.weekday)[0] ??
    null;

  const fmtVol = (v) => (v >= 10000 ? `${Math.round(v / 1000)}k` : v.toLocaleString());

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      className="max-w-lg mx-auto px-4 py-6 space-y-4"
    >
      {/* 1. Greeting */}
      <motion.div variants={fade}>
        <h1 className="font-display font-bold text-2xl tracking-tight">
          {greeting(t)}{profile.name ? `${lang === "fa" ? "، " : ", "}${profile.name}` : ""}
        </h1>
      </motion.div>

      {/* 3. Resume banner (above hero) */}
      {activeSession && (
        <motion.button
          variants={fade}
          onClick={() => setPage("session")}
          className="w-full card !p-3.5 flex items-center gap-3 text-start cursor-pointer hover:border-volt/60 transition-colors bg-gradient-to-r from-volt/10 to-transparent rtl:bg-gradient-to-l"
        >
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-volt opacity-75 animate-ping" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-volt" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-display font-semibold text-sm">{t("dash.resume1")}</div>
            <div className="text-xs text-muted truncate">{activeSession.dayName}</div>
          </div>
          <Play size={15} className="text-volt shrink-0" />
        </motion.button>
      )}

      {/* 2. Today's Workout Hero */}
      <motion.div variants={fade}>
        {todaysDay ? (
          <div className="card overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-volt/15 via-transparent to-volt/5 pointer-events-none rtl:bg-gradient-to-bl" />
            <div className="relative p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-volt font-semibold uppercase tracking-wider">
                    {t("dash.todaysWorkout")}
                  </span>
                  <div className="text-faint text-xs mt-0.5">
                    {todaysDay.exercises.length} {t("gate.exercises")} · {todaysDay.exercises.reduce((a, e) => a + e.sets, 0)} {t("hi.sets")}
                  </div>
                </div>
                <h2 className="font-display font-bold text-xl">{todaysDay.name}</h2>
              </div>
              <button onClick={() => startSession(todaysDay.id)} className="btn-volt w-full justify-center group">
                <Play size={16} />
                {t("dash.startWorkout")}
                <ChevronRight size={15} className="rtl:rotate-180 group-hover:translate-x-0.5 transition-transform rtl:group-hover:-translate-x-0.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="card p-5 flex items-center gap-4 bg-gradient-to-br from-surface to-bg-soft">
            <div className="w-12 h-12 rounded-2xl bg-ice/15 grid place-items-center shrink-0">
              <MoonStar size={22} className="text-ice" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-lg">{t("dash.restTitle")}</h2>
              <p className="text-muted text-sm mt-0.5">
                {nextDay ? (
                  <>
                    {t("dash.nextUp")}{" "}
                    <span className="text-ink font-medium">{nextDay.name}</span>{" "}
                    {t("dash.restOn")} {wdName(nextDay.weekday, lang)}.
                  </>
                ) : (
                  t("dash.noPlanYet")
                )}
              </p>
            </div>
            {nextDay && (
              <button onClick={() => setPage("planner")} className="btn-ghost !py-1.5 !px-3 text-xs shrink-0">
                {t("dash.preview")} <ChevronRight size={13} className="rtl:rotate-180 inline" />
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* 4. Week strip */}
      <motion.div variants={fade} className="flex items-center justify-between px-1">
        {Array.from({ length: 7 }, (_, i) => {
          const scheduled = planDays.some((d) => d.weekday === i);
          const done = stats.doneWeekdays.has(i);
          const isToday = i === today;
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className={`text-[10px] font-medium ${isToday ? "text-volt" : "text-faint"}`}>
                {wdName(i, lang)}
              </span>
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  done ? "bg-volt shadow-glow" : isToday ? "bg-volt/40" : scheduled ? "bg-faint" : "bg-line"
                }`}
              />
            </div>
          );
        })}
      </motion.div>

      {/* 5. Quick stats */}
      <motion.div variants={fade} className="grid grid-cols-3 gap-3">
        <div className="card !p-3 text-center">
          <div className="font-display font-bold text-lg leading-none tabular-nums" dir="ltr">
            {stats.streak}<span className="text-faint text-xs">🔥</span>
          </div>
          <div className="text-[10px] text-faint mt-1 leading-tight">{t("dash.stat.streak")}</div>
        </div>
        <div className="card !p-3 text-center">
          <div className="font-display font-bold text-lg leading-none tabular-nums" dir="ltr">
            {stats.totalWorkouts}
          </div>
          <div className="text-[10px] text-faint mt-1 leading-tight">{t("dash.stat.workouts")}</div>
        </div>
        <div className="card !p-3 text-center">
          <div className="font-display font-bold text-lg leading-none tabular-nums" dir="ltr">
            {fmtVol(stats.volume)}
          </div>
          <div className="text-[10px] text-faint mt-1 leading-tight">{t("dash.stat.volume")}</div>
        </div>
      </motion.div>

      {/* 6. Bottom shortcuts */}
      <motion.div variants={fade} className="grid grid-cols-2 gap-3">
        <button onClick={() => setPage("guide")} className="btn-ghost !py-3 justify-center gap-2 text-sm">
          <BookOpen size={15} /> {t("nav.guide")}
        </button>
        <button onClick={() => setPage("equipment")} className="btn-ghost !py-3 justify-center gap-2 text-sm">
          <Dumbbell size={15} /> {t("nav.equipment")}
        </button>
      </motion.div>
    </motion.div>
  );
}

function greeting(t) {
  const h = new Date().getHours();
  if (h < 12) return t("dash.greet.morning");
  if (h < 18) return t("dash.greet.afternoon");
  return t("dash.greet.evening");
}
