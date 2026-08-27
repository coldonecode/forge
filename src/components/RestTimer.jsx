import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, X } from "lucide-react";
import { useI18n } from "../i18n/useI18n";

export default function RestTimer({ seconds, onDone, onSkip }) {
  const [left, setLeft] = useState(seconds);
  const doneRef = useRef(false);
  const { t } = useI18n();

  useEffect(() => {
    const timer = setInterval(() => {
      setLeft((v) => {
        if (v <= 1) {
          clearInterval(timer);
          if (!doneRef.current) {
            doneRef.current = true;
            setTimeout(onDone, 400);
          }
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onDone]);

  const pct = seconds > 0 ? left / seconds : 0;
  const R = 54;
  const C = 2 * Math.PI * R;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-bg/85 backdrop-blur-sm grid place-items-center p-6"
      >
        <motion.div
          initial={{ scale: 0.8, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="card p-10 flex flex-col items-center gap-5 relative"
        >
          <button
            onClick={onSkip}
            className="absolute top-4 end-4 text-muted hover:text-ink transition-colors cursor-pointer"
            aria-label={t("rest.skip")}
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 text-volt font-display font-semibold uppercase text-sm">
            <Timer size={18} /> {t("rest.title")}
          </div>

          <div className="relative w-[140px] h-[140px]">
            <svg width="140" height="140" className="-rotate-90">
              <circle cx="70" cy="70" r={R} fill="none" stroke="var(--color-line)" strokeWidth="9" />
              <circle
                cx="70" cy="70" r={R} fill="none"
                stroke={left === 0 ? "var(--color-volt)" : "var(--color-volt-dim)"}
                strokeWidth="9" strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - pct)}
                style={{ transition: "stroke-dashoffset 1s linear, stroke .3s" }}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              {left === 0 ? (
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-volt text-xl font-display font-bold"
                >
                  GO!
                </motion.span>
              ) : (
                <span className="text-3xl font-display font-bold tabular-nums" dir="ltr">{left}s</span>
              )}
            </div>
          </div>

          <button onClick={onSkip} className="btn-ghost !py-2 !px-4 text-sm">
            {t("rest.skip")}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
