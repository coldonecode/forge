import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell, ArrowRight, ArrowLeft, Flame, HeartPulse,
  TrendingUp, Sparkles, Check, Zap, BookOpen, Globe,
} from "lucide-react";
import { useStore } from "../store/useStore";
import { STARTER_PLANS } from "../data/starterPlans";
import { useI18n } from "../i18n/useI18n";
import { LANGUAGES } from "../i18n/translations";

const GOALS = [
  { key: "build-muscle", labelKey: "onb.goal.muscle", descKey: "onb.goal.muscle.d", icon: Flame, color: "text-ember" },
  { key: "lose-fat", labelKey: "onb.goal.fat", descKey: "onb.goal.fat.d", icon: HeartPulse, color: "text-ice" },
  { key: "get-stronger", labelKey: "onb.goal.strong", descKey: "onb.goal.strong.d", icon: TrendingUp, color: "text-volt" },
  { key: "general", labelKey: "onb.goal.fit", descKey: "onb.goal.fit.d", icon: Sparkles, color: "text-lilac" },
];

const fadeSlide = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

export default function Onboarding() {
  const completeOnboarding = useStore((s) => s.completeOnboarding);
  const catalogReady = useStore((s) => s.catalogStatus === "ready");
  const lang = useStore((s) => s.profile.lang) || "en";
  const setLang = useStore((s) => s.setLang);
  const { t } = useI18n();
  const rtlArrow = "rtl:rotate-180";

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [templateKey, setTemplateKey] = useState("fullbody3");

  const steps = ["onb.step.welcome", "onb.step.goal", "onb.step.week"];

  return (
    <div className="min-h-screen grid place-items-center p-5">
      <div className="w-full max-w-lg relative">
        {/* Language picker */}
        <div className="absolute -top-2 end-0 flex gap-1.5">
          {Object.entries(LANGUAGES).map(([code, l]) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`chip cursor-pointer transition-all ${
                lang === code ? "!bg-volt !text-bg !border-volt font-bold" : "hover:!text-ink"
              }`}
            >
              <Globe size={12} /> {l.short}
            </button>
          ))}
        </div>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center gap-3 mb-8 pt-4"
        >
          <motion.div
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl bg-volt grid place-items-center shadow-glow"
          >
            <Dumbbell size={26} className="text-bg" strokeWidth={2.4} />
          </motion.div>
          <h1 className="font-display font-bold text-3xl tracking-tight">Forge</h1>
          <p className="text-muted text-sm -mt-1">{t("app.tagline")}</p>
        </motion.div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((key, i) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full grid place-items-center text-[11px] font-bold transition-all duration-300 border ${
                  i < step
                    ? "bg-volt text-bg border-volt"
                    : i === step
                    ? "border-volt text-volt bg-volt/10"
                    : "border-line text-faint"
                }`}
              >
                {i < step ? <Check size={13} /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-px ${i < step ? "bg-volt/60" : "bg-line"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="card p-7 sm:p-9 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" {...fadeSlide} className="flex flex-col h-full">
                <h2 className="font-display text-2xl font-bold leading-snug">
                  {t("onb.h1a")}<br />
                  <span className="text-volt">{t("onb.h1b")}</span>
                </h2>
                <ul className="mt-6 space-y-3.5 text-sm text-muted flex-1">
                  {[
                    ["onb.b1", Zap],
                    ["onb.b2", Dumbbell],
                    ["onb.b3", BookOpen],
                  ].map(([key, Icon]) => (
                    <li key={key} className="flex items-start gap-3">
                      <span className="mt-0.5 w-6 h-6 rounded-lg bg-volt/12 text-volt grid place-items-center shrink-0">
                        <Icon size={13} />
                      </span>
                      {t(key)}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setStep(1)} className="btn-volt w-full mt-8 group">
                  {t("onb.cta0")} <ArrowRight size={16} className={`${rtlArrow} group-hover:translate-x-0.5 transition-transform rtl:group-hover:-translate-x-0.5`} />
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" {...fadeSlide} className="flex flex-col h-full">
                <h2 className="font-display text-xl font-bold">{t("onb.goalTitle")}</h2>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("onb.namePh")}
                  className="mt-5 w-full bg-surface-2 border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-volt/60 transition-colors placeholder:text-faint"
                />
                <div className="grid grid-cols-2 gap-3 mt-4 flex-1 content-start">
                  {GOALS.map((g) => {
                    const active = goal === g.key;
                    return (
                      <motion.button
                        key={g.key}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setGoal(g.key)}
                        className={`rounded-xl border p-4 text-start cursor-pointer transition-all ${
                          active ? "border-volt bg-volt/10 shadow-glow" : "border-line bg-surface-2 hover:border-faint"
                        }`}
                      >
                        <g.icon size={20} className={`${active ? "text-volt" : g.color} mb-2`} />
                        <div className="font-display font-semibold text-sm">{t(g.labelKey)}</div>
                        <div className="text-xs text-faint mt-0.5">{t(g.descKey)}</div>
                      </motion.button>
                    );
                  })}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="btn-ghost !px-4"><ArrowLeft size={15} className={rtlArrow} /></button>
                  <button disabled={!goal} onClick={() => setStep(2)} className="btn-volt flex-1">
                    {t("onb.continue")} <ArrowRight size={16} className={rtlArrow} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" {...fadeSlide} className="flex flex-col h-full">
                <h2 className="font-display text-xl font-bold">
                  {t("onb.daysTitle", { name: name ? `، ${name}` : "" })}
                </h2>
                <p className="text-muted text-sm mt-1.5">{t("onb.daysSub")}</p>

                <div className="space-y-3 mt-5 flex-1">
                  {STARTER_PLANS.map((p) => {
                    const active = templateKey === p.key;
                    return (
                      <motion.button
                        key={p.key}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTemplateKey(p.key)}
                        className={`w-full rounded-xl border p-4 text-start cursor-pointer transition-all ${
                          active ? "border-volt bg-volt/10 shadow-glow" : "border-line bg-surface-2 hover:border-faint"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-display font-semibold">{t(p.nameKey)}</div>
                          <span className={`chip !py-1 shrink-0 ${active ? "!bg-volt !text-bg !border-volt !font-bold" : ""}`}>
                            {t("onb.perWeek", { n: p.daysPerWeek })}
                          </span>
                        </div>
                        <div className="text-xs text-muted mt-1.5 leading-relaxed">{t(p.descKey)}</div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-ghost !px-4"><ArrowLeft size={15} className={rtlArrow} /></button>
                  <button
                    disabled={!catalogReady}
                    onClick={() => completeOnboarding({ name, goal, templateKey })}
                    className="btn-volt flex-1"
                  >
                    {catalogReady ? (
                      <>{t("onb.create")} <Sparkles size={16} /></>
                    ) : (
                      t("onb.creating")
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
