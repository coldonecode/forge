import { motion } from "framer-motion";
import { Settings as SettingsIcon, RotateCcw, Image, Film, Globe, Trash2 } from "lucide-react";
import { useStore } from "../store/useStore";
import { useI18n } from "../i18n/useI18n";
import { LANGUAGES } from "../i18n/translations";
import { APP_VERSION } from "../config";

const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

export default function Settings() {
  const profile = useStore((s) => s.profile);
  const setLang = useStore((s) => s.setLang);
  const setDisplayMode = useStore((s) => s.setDisplayMode);
  const resetApp = useStore((s) => s.resetApp);
  const setPage = useStore((s) => s.setPage);
  const { t } = useI18n();

  return (
    <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} initial="hidden" animate="show" className="max-w-lg mx-auto px-4 py-8">
      <motion.div variants={item} className="mb-6">
        <h1 className="font-display font-bold text-3xl tracking-tight">{t("st.title")}</h1>
        <p className="text-muted text-sm mt-1.5">{t("st.sub")}</p>
      </motion.div>

      {/* Display mode */}
      <motion.section variants={item} className="card p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Image size={16} className="text-volt" />
          <h2 className="font-display font-semibold text-sm">{t("st.displayMode")}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setDisplayMode("gif")}
            className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
              profile.displayMode === "gif"
                ? "border-volt bg-volt/10 text-volt"
                : "border-line bg-surface-2 text-muted hover:border-volt/40"
            }`}
          >
            <Film size={24} className="mx-auto mb-2" />
            <div className="font-display font-semibold text-sm">{t("st.gif")}</div>
            <div className="text-[10px] text-faint mt-1">{t("st.gifDesc")}</div>
          </button>
          <button
            onClick={() => setDisplayMode("svg")}
            className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
              profile.displayMode === "svg"
                ? "border-volt bg-volt/10 text-volt"
                : "border-line bg-surface-2 text-muted hover:border-volt/40"
            }`}
          >
            <SettingsIcon size={24} className="mx-auto mb-2" />
            <div className="font-display font-semibold text-sm">{t("st.svg")}</div>
            <div className="text-[10px] text-faint mt-1">{t("st.svgDesc")}</div>
          </button>
        </div>
        {profile.displayMode === "svg" && (
          <p className="text-[11px] text-ember/80 mt-3 px-1">{t("st.svgNote")}</p>
        )}
      </motion.section>

      {/* Language */}
      <motion.section variants={item} className="card p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={16} className="text-ice" />
          <h2 className="font-display font-semibold text-sm">{t("st.language")}</h2>
        </div>
        <div className="flex gap-2">
          {Object.entries(LANGUAGES).map(([code, label]) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`flex-1 py-3 rounded-xl text-sm font-display font-semibold transition-all cursor-pointer ${
                profile.lang === code
                  ? "bg-volt text-bg"
                  : "bg-surface-2 border border-line text-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Danger zone */}
      <motion.section variants={item} className="card p-5 border-ember/30">
        <div className="flex items-center gap-2 mb-3">
          <Trash2 size={16} className="text-ember" />
          <h2 className="font-display font-semibold text-sm">{t("st.danger")}</h2>
        </div>
        <p className="text-xs text-muted mb-3">{t("st.resetDesc")}</p>
        <button
          onClick={() => {
            if (confirm(t("st.resetConfirm"))) {
              resetApp();
              setPage("onboarding");
            }
          }}
          className="btn-ghost !border-ember/40 !text-ember hover:!bg-ember/10 text-xs !py-2"
        >
          <RotateCcw size={14} /> {t("st.reset")}
        </button>
      </motion.section>

      <motion.p variants={item} className="text-center text-[10px] text-faint mt-6" dir="ltr">
        Forge v{APP_VERSION}
      </motion.p>
    </motion.div>
  );
}
