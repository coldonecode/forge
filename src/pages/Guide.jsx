import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, ChevronDown, Lightbulb, ShieldCheck,
  ClipboardCheck, Droplets, Clock3,
} from "lucide-react";
import { EQUIPMENT_META } from "../api/exerciseDb";
import { useStore } from "../store/useStore";
import GifImage from "../components/GifImage";
import { useI18n } from "../i18n/useI18n";

const ICONS = {
  machine: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/></svg>,
  cable: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 3v18"/><circle cx="6" cy="20" r="1.5"/><path d="M6 5c6 0 10 3 10 9v3"/><circle cx="16" cy="19.5" r="1.5"/></svg>,
  smith: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 3v18M19 3v18"/><path d="M7 8h10M7 16h10"/></svg>,
  dumbbell: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/></svg>,
  body: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v6M12 14l-4 6M12 14l4 6M6 10l6-1 6 1"/></svg>,
};

const COLOR_CLASSES = {
  volt: "text-volt bg-volt/12 border-volt/30",
  ice: "text-ice bg-ice/12 border-ice/30",
  ember: "text-ember bg-ember/12 border-ember/30",
  lilac: "text-lilac bg-lilac/12 border-lilac/30",
  muted: "text-muted bg-surface-2 border-line",
};

export default function Guide() {
  const catalog = useStore((s) => s.catalog);
  const [openKey, setOpenKey] = useState("leverage machine");
  const { t } = useI18n();

  const sections = useMemo(() => {
    return Object.entries(EQUIPMENT_META).map(([key, meta]) => {
      const items = catalog.filter((x) => x.equipments.includes(key));
      return { key, meta, count: items.length, samples: items.slice(0, 2) };
    }).filter((s) => s.count > 0);
  }, [catalog]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="font-display font-bold text-3xl tracking-tight">{t("gd.title")}</h1>
        <p className="text-muted text-sm mt-1.5">{t("gd.sub")}</p>
      </motion.div>

      {/* Beginner golden rules */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="card p-5 sm:p-6 mb-6"
      >
        <div className="flex items-center gap-2 font-display font-semibold mb-4">
          <ShieldCheck size={17} className="text-volt" /> {t("gd.rulesTitle")}
        </div>
        <ul className="grid sm:grid-cols-2 gap-3">
          {[
            ["gd.r1t", "gd.r1b", Lightbulb],
            ["gd.r2t", "gd.r2b", Clock3],
            ["gd.r3t", "gd.r3b", ClipboardCheck],
            ["gd.r4t", "gd.r4b", Droplets],
          ].map(([titleKey, bodyKey, Icon]) => (
            <li key={titleKey} className="flex gap-3 rounded-xl bg-surface-2/70 border border-line p-3.5">
              <span className="mt-0.5 w-7 h-7 shrink-0 rounded-lg bg-volt/12 text-volt grid place-items-center">
                <Icon size={14} />
              </span>
              <div>
                <div className="text-sm font-semibold">{t(titleKey)}</div>
                <p className="text-xs text-muted mt-1 leading-relaxed">{t(bodyKey)}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Equipment accordions */}
      <div className="space-y-3">
        {sections.map((s, idx) => {
          const open = openKey === s.key;
          const colorCls = COLOR_CLASSES[s.meta.color] ?? COLOR_CLASSES.muted;
          return (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + idx * 0.06 }}
              className={`card overflow-hidden transition-colors ${open ? "border-faint/60" : ""}`}
            >
              <button
                onClick={() => setOpenKey(open ? null : s.key)}
                className="w-full flex items-center gap-4 p-5 cursor-pointer text-start"
              >
                <span className={`w-11 h-11 rounded-xl grid place-items-center border shrink-0 ${colorCls}`}>
                  {ICONS[s.meta.icon]}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="font-display font-bold block">{t(`eq.${s.meta.i18nKey}.label`)}</span>
                  <span className="text-xs text-faint">{t("gd.inLibrary", { n: s.count })}</span>
                </span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                  <ChevronDown size={18} className="text-faint" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-5 pb-5 space-y-4">
                      <p className="text-sm text-muted leading-relaxed">{t(`eq.${s.meta.i18nKey}.blurb`)}</p>
                      <ul className="space-y-1.5">
                        {[1, 2, 3].map((n) => {
                          const key = `eq.${s.meta.i18nKey}.t${n}`;
                          if (!t(key) || t(key) === key) return null;
                          return (
                            <li key={key} className="flex gap-2 text-[13px] text-muted">
                              <span className="text-volt mt-0.5 rtl:-scale-x-100">▸</span> {t(key)}
                            </li>
                          );
                        })}
                      </ul>
                      <div className="grid grid-cols-2 gap-3">
                        {s.samples.map((ex) => (
                          <div key={ex.exerciseId}>
                            <GifImage src={ex.gifUrl} alt={ex.name} exerciseName={ex.name} className="aspect-video rounded-xl border border-line" />
                            <div className={`text-[11.5px] text-faint mt-1.5 truncate ${s.meta.i18nKey ? "" : ""}`}>
                              {t("gd.eg", { name: ex.name })}
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          useStore.setState({ guideFilterEquipment: s.key });
                          useStore.getState().setPage("library");
                        }}
                        className="text-xs text-ice hover:underline cursor-pointer"
                      >
                        {t("gd.browseAll")}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Gym etiquette */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="card p-5 sm:p-6 mt-6"
      >
        <div className="font-display font-semibold mb-3">{t("gd.etiquette")}</div>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <li key={n} className="flex gap-2 py-0.5">
              <span className="text-volt mt-0.5">✓</span> {t(`gd.e${n}`)}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
