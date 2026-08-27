import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useI18n } from "../i18n/useI18n";
import { useStore, todayISO, weekdayIndex } from "../store/useStore";
import { weekdayName as weekdayNameFromTr } from "../i18n/translations";

const MONTH_NAMES_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_NAMES_FA = [
  "ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن",
  "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر",
];

function toISO(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function daysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate();
}

function startDayOfWeekMon(y, m) {
  return (new Date(y, m, 1).getDay() + 6) % 7;
}

export default function WorkoutCalendar() {
  const { lang, t } = useI18n();
  const logs = useStore((s) => s.logs);
  const planDays = useStore((s) => s.planDays);
  const catalog = useStore((s) => s.catalog);

  const today = todayISO();
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [popupDay, setPopupDay] = useState(null);

  const monthNames = lang === "fa" ? MONTH_NAMES_FA : MONTH_NAMES_EN;

  const prevMonth = useCallback(() => {
    setPopupDay(null);
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }, [viewMonth]);

  const nextMonth = useCallback(() => {
    setPopupDay(null);
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }, [viewMonth]);

  const plannedWeekdays = useMemo(
    () => new Set(planDays.map((d) => d.weekday)),
    [planDays]
  );

  const calendarCells = useMemo(() => {
    const total = daysInMonth(viewYear, viewMonth);
    const startOffset = startDayOfWeekMon(viewYear, viewMonth);
    const cells = [];

    for (let i = 0; i < startOffset; i++) {
      cells.push({ key: `empty-${i}`, empty: true });
    }

    for (let day = 1; day <= total; day++) {
      const iso = toISO(viewYear, viewMonth, day);
      const d = new Date(viewYear, viewMonth, day);
      const wd = weekdayIndex(d);
      const hasLog = !!logs[iso];
      const isPlanned = plannedWeekdays.has(wd);
      const isToday = iso === today;

      let status = null;
      if (hasLog) status = "completed";
      else if (isPlanned && iso < today) status = "missed";

      cells.push({ key: iso, iso, day, status, isToday, isPlanned, hasLog });
    }

    return cells;
  }, [viewYear, viewMonth, logs, plannedWeekdays, today]);

  const popupData = useMemo(() => {
    if (!popupDay || !logs[popupDay]) return null;
    const log = logs[popupDay];
    const exerciseNames = (log.entries ?? []).map((e) => {
      const ex = catalog.find((c) => c.exerciseId === e.exerciseId);
      return ex?.name ?? "Exercise";
    });
    return {
      dayName: log.dayName,
      exercises: exerciseNames,
      volume: log.volume ?? 0,
      duration: log.durationMin ?? 0,
    };
  }, [popupDay, logs, catalog]);

  const weekdays = Array.from({ length: 7 }, (_, i) =>
    weekdayNameFromTr(i, lang)
  );

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-xl bg-surface-2 border border-line text-muted hover:text-ink hover:border-volt/50 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-display font-semibold text-ink text-base">
          {monthNames[viewMonth]}{" "}
          <span dir="ltr" className="text-muted text-sm">
            {viewYear}
          </span>
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-xl bg-surface-2 border border-line text-muted hover:text-ink hover:border-volt/50 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map((name) => (
          <div
            key={name}
            className="text-center text-xs font-semibold text-faint py-1"
          >
            {name}
          </div>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${viewYear}-${viewMonth}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-1"
        >
          {calendarCells.map((cell) => {
            if (cell.empty) {
              return <div key={cell.key} className="min-h-[44px]" />;
            }

            return (
              <button
                key={cell.key}
                onClick={() => cell.hasLog && setPopupDay(popupDay === cell.iso ? null : cell.iso)}
                className={`
                  relative min-h-[44px] min-w-[40px] rounded-xl flex flex-col items-center justify-center gap-1
                  transition-all duration-150
                  ${cell.isToday ? "border-2 border-volt bg-volt/10" : "border border-transparent"}
                  ${cell.hasLog ? "bg-surface-2 hover:bg-surface" : ""}
                  ${cell.status === "missed" ? "bg-ember/5 border-ember/40" : ""}
                  ${cell.hasLog ? "cursor-pointer active:scale-95" : "cursor-default"}
                `}
              >
                <span
                  className={`text-sm ${
                    cell.isToday
                      ? "font-bold text-volt"
                      : cell.hasLog
                      ? "text-ink"
                      : "text-muted"
                  }`}
                >
                  {cell.day}
                </span>

                {cell.status === "completed" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-volt" />
                )}
                {cell.status === "missed" && (
                  <span className="w-1.5 h-1.5 rounded-full border border-ember bg-transparent" />
                )}
                {!cell.hasLog && cell.isPlanned && cell.iso >= today && (
                  <span className="w-1.5 h-1.5 rounded-full bg-faint/50" />
                )}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {popupDay && popupData && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="mt-3 p-3 rounded-xl bg-surface-2 border border-line shadow-card"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-ink">
                {popupData.dayName}
              </span>
              <button
                onClick={() => setPopupDay(null)}
                className="p-1 rounded-lg text-faint hover:text-ink transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-1 mb-2">
              {popupData.exercises.map((name, i) => (
                <div key={i} className="text-xs text-muted flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-volt shrink-0" />
                  {name}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-faint">
              <span>
                {popupData.volume.toLocaleString()} kg
              </span>
              <span>·</span>
              <span>
                {popupData.duration} {t("hi.min")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-line text-xs text-faint">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-volt" />
          {lang === "fa" ? "تمرین انجام‌شده" : "Completed"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full border border-ember bg-transparent" />
          {lang === "fa" ? "از دست رفته" : "Missed"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-faint/50" />
          {lang === "fa" ? "برنامه‌ریزی شده" : "Planned"}
        </span>
      </div>
    </div>
  );
}
