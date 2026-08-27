import { motion } from "framer-motion";
import { Dumbbell, RefreshCcw, WifiOff } from "lucide-react";
import { useStore } from "../store/useStore";
import { useCatalog } from "../hooks/useCatalog";
import { useI18n } from "../i18n/useI18n";

export default function CatalogGate({ children }) {
  const { status, progress } = useCatalog();
  const setCatalogStatus = useStore((s) => s.setCatalogStatus);
  const { t } = useI18n();

  if (status === "ready") return children;

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-md w-full p-10 flex flex-col items-center text-center gap-6"
      >
        <motion.div
          animate={status === "loading" ? { rotate: [0, 8, -8, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="w-16 h-16 rounded-2xl bg-volt grid place-items-center shadow-glow"
        >
          <Dumbbell size={30} className="text-bg" strokeWidth={2.4} />
        </motion.div>

        <div>
          <h1 className="font-display text-2xl font-bold">Forge</h1>
          <p className="text-muted text-sm mt-2 leading-relaxed">
            {status === "loading" && (
              <>
                {t("gate.loading1")}
                <br />
                <span className="text-faint">{t("gate.loading2")}</span>
              </>
            )}
            {status === "error" && (
              <>
                {t("gate.err1")}
                <br />
                <span className="text-faint">{t("gate.err2")}</span>
              </>
            )}
          </p>
        </div>

        {status === "loading" ? (
          <div className="w-full space-y-3">
            <div className="h-2.5 rounded-full bg-surface-2 overflow-hidden border border-line">
              <motion.div
                className="h-full rounded-full bg-volt shadow-glow"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.round((progress.loaded / progress.total) * 100)}%` }}
                transition={{ ease: "easeOut", duration: 0.4 }}
              />
            </div>
            <div className="flex justify-between text-xs text-faint tabular-nums" dir="ltr">
              <span>{progress.loaded} {t("gate.exercises")}</span>
              <span>{Math.round((progress.loaded / progress.total) * 100)}%</span>
            </div>
          </div>
        ) : (
          <>
            <WifiOff size={22} className="text-ember" />
            <button
              onClick={() => setCatalogStatus("idle")}
              className="btn-volt w-full !py-2.5"
            >
              <RefreshCcw size={15} /> {t("gate.retry")}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
