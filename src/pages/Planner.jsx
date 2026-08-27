import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, ChevronUp, ChevronDown, Play, X, Search,
} from "lucide-react";
import { useStore } from "../store/useStore";
import ExerciseBrowser from "../components/ExerciseBrowser";
import ExercisePresets from "../components/ExercisePresets";
import GifImage from "../components/GifImage";
import ExerciseModal from "../components/ExerciseModal";
import UndoToast from "../components/UndoToast";
import { getById } from "../api/exerciseDb";
import { useI18n } from "../i18n/useI18n";
import { formatEquipment, weekdayName as wdName } from "../i18n/translations";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const UNDO_MS = 5000;

export default function Planner() {
  const planDays = useStore((s) => s.planDays);
  const addDay = useStore((s) => s.addDay);
  const removeDay = useStore((s) => s.removeDay);
  const updateDay = useStore((s) => s.updateDay);
  const removeExerciseFromDay = useStore((s) => s.removeExerciseFromDay);
  const updateExerciseInDay = useStore((s) => s.updateExerciseInDay);
  const moveExerciseInDay = useStore((s) => s.moveExerciseInDay);
  const startSession = useStore((s) => s.startSession);
  const { t, lang } = useI18n();

  const [pickerDayId, setPickerDayId] = useState(null);
  const [detailEx, setDetailEx] = useState(null);

  // Undo buffer
  const [undo, setUndo] = useState(null); // { type: "exercise"|"day", data, message }
  const timerRef = useRef(null);

  const clearUndoTimer = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };

  const dismissUndo = useCallback(() => { clearUndoTimer(); setUndo(null); }, []);

  const handleRemoveExercise = (dayId, exRowId) => {
    const day = planDays.find((d) => d.id === dayId);
    const row = day?.exercises.find((e) => e.id === exRowId);
    const ex = row ? getById(row.exerciseId) : null;
    const name = ex?.name ?? "Exercise";

    // Snapshot the full row data for restore
    const snapshot = { dayId, row: { ...row } };

    removeExerciseFromDay(dayId, exRowId);
    clearUndoTimer();
    setUndo({ type: "exercise", data: snapshot, message: t("pl.undoExercise", { name }) });
    timerRef.current = setTimeout(dismissUndo, UNDO_MS);
  };

  const handleRemoveDay = (dayId) => {
    const day = planDays.find((d) => d.id === dayId);
    if (!day) return;

    // Snapshot the full day for restore
    const snapshot = { day: JSON.parse(JSON.stringify(day)) };

    removeDay(dayId);
    clearUndoTimer();
    setUndo({ type: "day", data: snapshot, message: t("pl.undoDay", { name: day.name }) });
    timerRef.current = setTimeout(dismissUndo, UNDO_MS);
  };

  const handleUndo = () => {
    clearUndoTimer();
    if (!undo) return;
    if (undo.type === "exercise") {
      // Re-insert the exercise row into the day
      const { dayId, row } = undo.data;
      const day = planDays.find((d) => d.id === dayId);
      if (day) {
        // useStore direct update — insert at original position by appending (closest we can get)
        useStore.setState({
          planDays: useStore.getState().planDays.map((d) =>
            d.id === dayId ? { ...d, exercises: [...d.exercises, row] } : d
          ),
        });
      }
    } else if (undo.type === "day") {
      // Re-insert the full day
      useStore.setState({
        planDays: [...useStore.getState().planDays, undo.data.day],
      });
    }
    setUndo(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="font-display font-bold text-3xl tracking-tight">{t("pl.title")}</h1>
        <p className="text-muted text-sm mt-1.5">{t("pl.sub")}</p>
      </motion.div>

      <div className="space-y-5">
        <AnimatePresence mode="popLayout">
          {planDays.map((day) => (
            <motion.section
              layout
              key={day.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="card overflow-hidden"
            >
              {/* Day header */}
              <div className="p-5 pb-4 flex flex-wrap items-center gap-3 border-b border-line">
                <select
                  value={day.weekday}
                  onChange={(e) => updateDay(day.id, { weekday: Number(e.target.value) })}
                  className="appearance-none bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm font-display font-semibold outline-none cursor-pointer hover:border-volt/50 transition-colors"
                >
                  {WEEKDAYS.map((w, i) => (
                    <option key={w} value={i}>{wdName(i, lang)}</option>
                  ))}
                </select>
                <input
                  value={day.name}
                  onChange={(e) => updateDay(day.id, { name: e.target.value })}
                  className="bg-transparent font-display font-bold text-lg outline-none min-w-0 flex-1 focus:text-volt transition-colors"
                />
                <div className="flex items-center gap-2 ms-auto">
                  {day.exercises.length > 0 && (
                    <button onClick={() => startSession(day.id)} className="btn-volt !py-2 !px-3.5 text-xs">
                      <Play size={13} /> {t("pl.start")}
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveDay(day.id)}
                    className="w-8 h-8 grid place-items-center rounded-lg text-faint hover:text-ember hover:bg-ember/10 transition-colors cursor-pointer"
                    aria-label="Delete day"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Exercises */}
              <ul className="divide-y divide-line/60">
                {day.exercises.map((row, i) => {
                  const ex = getById(row.exerciseId);
                  if (!ex)
                    return (
                      <li key={row.id} className="px-5 py-3.5 text-sm text-faint flex items-center gap-2 flex-wrap">
                        <X size={14} className="text-ember" /> {t("pl.missing")}
                        <button
                          onClick={() => handleRemoveExercise(day.id, row.id)}
                          className="ms-auto chip cursor-pointer hover:!border-ember/60 hover:!text-ember"
                        >
                          {t("pl.remove")}
                        </button>
                      </li>
                    );
                  return (
                    <motion.li layout key={row.id} className="px-4 sm:px-5 py-3 flex items-center gap-3 group">
                      <span className="text-faint text-xs font-bold w-5 shrink-0 tabular-nums" dir="ltr">{i + 1}</span>
                      <button onClick={() => setDetailEx(ex)} className="shrink-0 cursor-pointer">
                        <GifImage src={ex.gifUrl} alt={ex.name} exerciseName={ex.name} className="w-12 h-12 rounded-lg border border-line" eager={i < 3} />
                      </button>
                      <button
                        onClick={() => setDetailEx(ex)}
                        className="min-w-0 flex-1 text-start cursor-pointer"
                      >
                        <div className="font-medium text-sm capitalize truncate group-hover:text-volt transition-colors">
                          {ex.name}
                        </div>
                        <div className="text-xs text-faint mt-0.5">{formatEquipment(ex.equipments[0], lang)}</div>
                      </button>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <label className="flex items-center gap-1 text-xs text-faint">
                          <input
                            type="number" min="1" max="10" value={row.sets}
                            onChange={(e) => updateExerciseInDay(day.id, row.id, { sets: Math.max(1, Math.min(10, Number(e.target.value) || 1)) })}
                            className="w-11 bg-surface-2 border border-line rounded-md px-1.5 py-1 text-center text-ink outline-none focus:border-volt/60"
                            dir="ltr"
                          />
                          ×
                          <input
                            value={row.reps}
                            onChange={(e) => updateExerciseInDay(day.id, row.id, { reps: e.target.value })}
                            className="w-12 bg-surface-2 border border-line rounded-md px-1.5 py-1 text-center text-ink outline-none focus:border-volt/60"
                            dir="ltr"
                          />
                        </label>
                        <div className="hidden sm:flex flex-col">
                          <button
                            onClick={() => moveExerciseInDay(day.id, row.id, -1)}
                            disabled={i === 0}
                            className="text-faint hover:text-volt disabled:opacity-25 cursor-pointer leading-none"
                            aria-label="Move up"
                          >
                            <ChevronUp size={15} />
                          </button>
                          <button
                            onClick={() => moveExerciseInDay(day.id, row.id, 1)}
                            disabled={i === day.exercises.length - 1}
                            className="text-faint hover:text-volt disabled:opacity-25 cursor-pointer leading-none"
                            aria-label="Move down"
                          >
                            <ChevronDown size={15} />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveExercise(day.id, row.id)}
                          className="w-7 h-7 grid place-items-center rounded-md text-faint hover:text-ember hover:bg-ember/10 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                          aria-label="Remove exercise"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="p-4 pt-3">
                <button
                  onClick={() => setPickerDayId(day.id)}
                  className="btn-ghost !py-2 !px-4 text-xs w-full sm:w-auto"
                >
                  <Plus size={14} /> {t("pl.addExercise")}
                </button>
              </div>
            </motion.section>
          ))}
        </AnimatePresence>

        <motion.button
          layout
          whileTap={{ scale: 0.98 }}
          onClick={addDay}
          className="w-full border-2 border-dashed border-line rounded-2xl py-5 text-muted hover:border-volt/50 hover:text-volt transition-all cursor-pointer flex items-center justify-center gap-2 text-sm font-display font-semibold"
        >
          <Plus size={16} /> {t("pl.addDay")}
        </motion.button>
      </div>

      {/* Picker modal */}
      <AnimatePresence>
        {pickerDayId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/85 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="card max-w-4xl mx-auto my-4 relative"
            >
              <div className="sticky top-0 z-10 bg-surface/95 backdrop-blur border-b border-line px-5 py-4 flex items-center gap-3 rounded-t-2xl">
                <Search size={17} className="text-volt shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold">{t("pl.pickerTitle")}</div>
                  <div className="text-xs text-faint">{t("pl.pickerSub")}</div>
                </div>
                <button
                  onClick={() => setPickerDayId(null)}
                  className="w-9 h-9 grid place-items-center rounded-full bg-bg/70 border border-line text-muted hover:text-ink transition-colors cursor-pointer shrink-0"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-5">
                <PickerList dayId={pickerDayId} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detailEx && <ExerciseModal exercise={detailEx} onClose={() => setDetailEx(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {undo && (
          <UndoToast
            key="undo"
            message={undo.message}
            onUndo={handleUndo}
            onDismiss={dismissUndo}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PickerList({ dayId }) {
  const catalog = useStore((s) => s.catalog);
  const addExerciseToDay = useStore((s) => s.addExerciseToDay);
  const [addedIds, setAddedIds] = useState(() => new Set());
  const { t } = useI18n();
  const [view, setView] = useState("presets"); // presets | browse

  const select = (ex) => {
    if (!addedIds.has(ex.exerciseId)) {
      addExerciseToDay(dayId, ex.exerciseId);
      setAddedIds((prev) => new Set(prev).add(ex.exerciseId));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setView("presets")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-display font-semibold transition-colors cursor-pointer ${
            view === "presets" ? "bg-volt text-bg" : "bg-surface-2 border border-line text-muted hover:text-ink"
          }`}
        >
          ⚡ {t("pr.byMuscle")}
        </button>
        <button
          onClick={() => setView("browse")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-display font-semibold transition-colors cursor-pointer ${
            view === "browse" ? "bg-volt text-bg" : "bg-surface-2 border border-line text-muted hover:text-ink"
          }`}
        >
          🔍 {t("pr.browseAll")}
        </button>
      </div>

      {view === "presets" ? (
        <ExercisePresets dayId={dayId} onAdded={() => {}} />
      ) : (
        <ExerciseBrowser exercises={catalog} onSelect={select} selectedIds={addedIds} />
      )}
    </div>
  );
}
