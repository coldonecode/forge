import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Flame, Play, CalendarDays, Trophy, Weight, MoonStar,
  ArrowRight, BookOpen, ChevronRight,
} from "lucide-react";
import { useStore, weekdayIndex, sessionsThisWeek, computeStreak, totalVolume } from "../store/useStore";
import ProgressRing from "../components/ProgressRing";
import { useI18n } from "../i18n/useI18n";
import { weekdayName as wdName, formatDate } from "../i18n/translations";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };

function AnimatedNumber({ value, format }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const from = prev.current;
    const start = performance.now();
    const dur = 900;
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className="tabular-nums">{format(Math.round(display))}</span>;
}

function CountUp({ value, format = (v) => v.toLocaleString() }) {
  return <AnimatedNumber value={value} format={format} />;
}

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

  const weekProgress = Math.min(stats.week.length / Math.max(profile.daysPerWeek, 1), 1);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Greeting */}
      <motion.div variants={item} className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-muted text-sm flex items-center gap-2">
            <CalendarDays size={14} />
            {formatDate(new Date(), lang)}
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-[34px] tracking-tight mt-1">
            {greeting(t)}{profile.name ? `${lang === "fa" ? "، " : ", "}${profile.name}` : ""} 💪
          </h1>
        </div>
        <button onClick={() => setPage("planner")} className="btn-ghost !py-2 !px-4 text-xs">
          {t("dash.editPlan")}
        </button>
      </motion.div>

      {/* Resume in-progress workout */}
      {activeSession && (
        <motion.button
          variants={item}
          onClick={() => setPage("session")}
          className="w-full card mt-6 p-4 flex items-center gap-4 text-start cursor-pointer hover:border-volt/60 transition-colors bg-gradient-to-r from-volt/10 to-transparent rtl:bg-gradient-to-l"
        >
          <span className="relative flex w-3 h-3 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-volt opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-volt" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-display font-semibold text-sm">{t("dash.resume1")}</div>
            <div className="text-xs text-muted truncate">{activeSession.dayName}</div>
          </div>
          <Play size={16} className="text-volt shrink-0" />
        </motion.button>
      )}

      {/* Week strip */}
      <motion.div variants={item} className="grid grid-cols-7 gap-1.5 sm:gap-2 mt-6">
        {Array.from({ length: 7 }, (_, i) => {
          const scheduled = planDays.some((d) => d.weekday === i);
          const done = stats.doneWeekdays.has(i);
          const isToday = i === today;
          return (
            <div
              key={i}
              className={`relative rounded-xl border px-1 py-2.5 sm:py-3 flex flex-col items-center gap-1 transition-colors ${
                isToday ? "border-volt/70 bg-volt/10" : "border-line bg-surface"
              }`}
            >
              <span className={`text-[10px] font-semibold ${isToday ? "text-volt" : "text-faint"}`}>
                {wdName(i, lang)}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  done ? "bg-volt shadow-glow" : scheduled ? "bg-faint" : "bg-line"
                }`}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Hero card — today's workout */}
      <motion.div variants={item}>
        {todaysDay ? (
          <div className="card mt-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-volt/15 via-transparent to-transparent pointer-events-none rtl:bg-gradient-to-bl" />
            <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <ProgressRing progress={weekProgress} size={110} stroke={9}>
                <div className="text-center">
                  <div className="font-display font-bold text-xl leading-none" dir="ltr">
                    {stats.week.length}<span className="text-faint text-sm">/{profile.daysPerWeek}</span>
                  </div>
                  <div className="text-[10px] text-faint mt-1">{t("dash.thisWeek")}</div>
                </div>
              </ProgressRing>

              <div className="flex-1 text-center sm:text-start min-w-0">
                <div className="chip !text-volt !border-volt/40 !bg-volt/10 mb-2">🔥 {t("dash.todaysWorkout")}</div>
                <h2 className="font-display font-bold text-2xl">{todaysDay.name}</h2>
                <p className="text-muted text-sm mt-1">
                  {(todaysDay.focus ? todaysDay.focus + " · " : "") +
                    `${todaysDay.exercises.reduce((a, e) => a + e.sets, 0)} ${t("hi.sets")} · ${todaysDay.exercises.length} ${t("gate.exercises")}`}
                </p>
                <button onClick={() => startSession(todaysDay.id)} className="btn-volt mt-4 group">
                  <Play size={16} /> {t("dash.startWorkout")}
                  <ArrowRight size={15} className="rtl:rotate-180 group-hover:translate-x-0.5 transition-transform rtl:group-hover:-translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="card mt-6 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 bg-gradient-to-br from-surface to-bg-soft">
            <div className="w-14 h-14 rounded-2xl bg-ice/15 grid place-items-center shrink-0">
              <MoonStar size={26} className="text-ice" />
            </div>
            <div className="flex-1 text-center sm:text-start">
              <h2 className="font-display font-bold text-xl">{t("dash.restTitle")}</h2>
              <p className="text-muted text-sm mt-1">
                {nextDay ? (
                  <>
                    {t("dash.nextUp")} <span className="text-ink font-medium">{nextDay.name}</span> {t("dash.restOn")}{" "}
                    {wdName(nextDay.weekday, lang)}.
                  </>
                ) : (
                  t("dash.noPlanYet")
                )}
              </p>
            </div>
            {nextDay && (
              <button onClick={() => setPage("planner")} className="btn-ghost !py-2 !px-4 text-sm shrink-0">
                {t("dash.preview")} <ChevronRight size={14} className="rtl:rotate-180 inline" />
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* Stats row */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
        <StatCard icon={<Flame size={17} />} label={t("dash.stat.streak")} accent="text-ember">
          <CountUp value={stats.streak} /><span> 🔥</span>
        </StatCard>
        <StatCard icon={<Trophy size={17} />} label={t("dash.stat.workouts")} accent="text-volt">
          <CountUp value={stats.totalWorkouts} />
        </StatCard>
        <StatCard icon={<Weight size={17} />} label={t("dash.stat.volume")} accent="text-lilac">
          <CountUp value={stats.volume} format={(v) => (v >= 10000 ? `${Math.round(v / 1000)}k` : v.toLocaleString())} />
        </StatCard>
      </motion.div>

      {/* Beginner tip card */}
      <motion.button
        variants={item}
        whileHover={{ y: -3 }}
        onClick={() => setPage("guide")}
        className="w-full card mt-6 p-5 flex items-center gap-4 text-start cursor-pointer hover:border-ice/50 transition-colors"
      >
        <div className="w-11 h-11 rounded-xl bg-ice/15 grid place-items-center shrink-0">
          <BookOpen size={20} className="text-ice" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold">{t("dash.promoTitle")}</div>
          <p className="text-muted text-sm mt-0.5 truncate">{t("dash.promoBody")}</p>
        </div>
        <ChevronRight size={18} className="text-faint shrink-0 rtl:rotate-180" />
      </motion.button>
    </motion.div>
  );
}

function StatCard({ icon, label, children, accent }) {
  return (
    <div className="card p-4 sm:p-5">
      <div className={`${accent} mb-2`}>{icon}</div>
      <div className="font-display font-bold text-xl sm:text-2xl leading-none">{children}</div>
      <div className="text-[10.5px] sm:text-xs text-faint mt-1.5 leading-tight">{label}</div>
    </div>
  );
}

function greeting(t) {
  const h = new Date().getHours();
  if (h < 12) return t("dash.greet.morning");
  if (h < 18) return t("dash.greet.afternoon");
  return t("dash.greet.evening");
}
