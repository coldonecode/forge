import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { X, StickyNote } from "lucide-react";
import { useStore } from "../store/useStore";
import { useI18n } from "../i18n/useI18n";

function buildNoteKey(exerciseId, date, setIdx) {
  if (exerciseId == null) return `workout:${date}`;
  if (setIdx != null) return `set:${date}:${exerciseId}:${setIdx}`;
  return `exercise:${date}:${exerciseId}`;
}

export default function WorkoutNotes({ exerciseId, date, setIdx, onClose }) {
  const { t } = useI18n();
  const textareaRef = useRef(null);
  const getNote = useStore((s) => s.getNote);
  const setNote = useStore((s) => s.setNote);

  const key = buildNoteKey(exerciseId, date, setIdx);
  const existing = getNote(key);
  const [text, setText] = useState(existing);

  useEffect(() => {
    setText(existing);
  }, [existing]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const save = () => {
    setNote(key, text.trim());
    onClose();
  };

  const label =
    exerciseId == null
      ? "Workout note"
      : setIdx != null
        ? `Set ${setIdx + 1} note`
        : "Exercise note";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
    >
      <motion.div
        initial={{ y: 40, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 30, scale: 0.97, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="card w-full max-w-md bg-surface border border-line rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 pb-0">
          <div className="flex items-center gap-2">
            <StickyNote size={16} className="text-volt" />
            <span className="text-sm font-display font-semibold">{label}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 grid place-items-center rounded-full bg-surface-2 border border-line text-muted hover:text-ink transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-4">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder={t("notes.placeholder") || "Add a note…"}
            className="w-full bg-surface-2 border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder-faint resize-none focus:outline-none focus:border-volt/50 transition-colors"
          />
          <div className="flex gap-2 mt-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-muted border border-line hover:border-faint transition-colors cursor-pointer"
            >
              {t("ss.backToday") || "Cancel"}
            </button>
            <button
              onClick={save}
              className="px-4 py-2 rounded-xl text-sm font-bold text-bg bg-volt hover:brightness-110 transition-all cursor-pointer"
            >
              {t("ss.done") || "Save"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
