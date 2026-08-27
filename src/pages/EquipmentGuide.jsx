import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ChevronDown, Wrench, AlertTriangle, CheckCircle,
  ListChecks, Settings2, Zap, Target, Lightbulb, X,
} from "lucide-react";
import equipmentGuide from "../data/equipmentGuide";
import { useI18n } from "../i18n/useI18n";

const MUSCLE_GROUPS = [
  { en: "Chest", fa: "سینه" },
  { en: "Back", fa: "پشت" },
  { en: "Shoulders", fa: "سرشانه" },
  { en: "Arms", fa: "بازو" },
  { en: "Core", fa: "شکم" },
  { en: "Legs", fa: "پا" },
  { en: "Full body", fa: "کل بدن" },
];

const MUSCLE_COLORS = {
  Chest: "text-ember bg-ember/12 border-ember/30",
  Back: "text-ice bg-ice/12 border-ice/30",
  Shoulders: "text-lilac bg-lilac/12 border-lilac/30",
  Arms: "text-volt bg-volt/12 border-volt/30",
  Core: "text-violet-400 bg-violet-400/12 border-violet-400/30",
  Legs: "text-amber-400 bg-amber-400/12 border-amber-400/30",
  "Full body": "text-muted bg-surface-2 border-line",
};

function EquipmentCard({ item, lang, isExpanded, onToggle }) {
  const isFa = lang === "fa";
  const name = isFa ? item.nameFa : item.nameEn;
  const muscles = isFa ? item.musclesFa : item.musclesEn;
  const description = isFa ? item.descriptionFa : item.descriptionEn;
  const howToUse = isFa ? item.howToUseFa : item.howToUseEn;
  const adjustments = isFa ? item.adjustmentsFa : item.adjustmentsEn;
  const mistakes = isFa ? item.mistakesFa : item.mistakesEn;
  const exercises = isFa ? item.exercisesFa : item.exercisesEn;
  const tips = isFa ? item.tipsFa : item.tipsEn;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="card overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3.5 p-4 cursor-pointer text-start"
      >
        <span className="w-10 h-10 rounded-xl grid place-items-center bg-volt/12 border border-volt/30 text-volt shrink-0">
          <Wrench size={18} />
        </span>
        <span className="flex-1 min-w-0">
          <span className="font-display font-bold text-sm block">{name}</span>
          <span className="text-[11.5px] text-faint leading-tight line-clamp-1">
            {muscles}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown size={18} className="text-faint" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Description */}
              <p className="text-sm text-muted leading-relaxed">
                {description}
              </p>

              {/* How to use */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-volt mb-2">
                  <CheckCircle size={14} />
                  {isFa ? "نحوه استفاده" : "How to Use"}
                </div>
                <ol className="space-y-1.5">
                  {howToUse.map((step, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-muted">
                      <span className="text-volt font-semibold mt-px shrink-0" dir="ltr">
                        {i + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Adjustments */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-ice mb-2">
                  <Settings2 size={14} />
                  {isFa ? "تنظیمات" : "Adjustments"}
                </div>
                <p className="text-[13px] text-muted leading-relaxed">
                  {adjustments}
                </p>
              </div>

              {/* Common mistakes */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-ember mb-2">
                  <AlertTriangle size={14} />
                  {isFa ? "اشتباه‌های رایج" : "Common Mistakes"}
                </div>
                <ul className="space-y-1.5">
                  {mistakes.map((m, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-muted">
                      <span className="text-ember mt-0.5 shrink-0">
                        <X size={12} />
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exercises */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-lilac mb-2">
                  <Target size={14} />
                  {isFa ? "حرکات ممکن" : "Exercises You Can Do"}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exercises.map((ex, i) => (
                    <span key={i} className="chip text-[11px]">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pro tip */}
              <div className="rounded-xl bg-volt/8 border border-volt/20 p-3">
                <div className="flex items-start gap-2">
                  <Lightbulb
                    size={14}
                    className="text-volt mt-0.5 shrink-0"
                  />
                  <p className="text-[13px] text-muted leading-relaxed">
                    {tips}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EquipmentGuide() {
  const { lang, t } = useI18n();
  const isFa = lang === "fa";
  const [search, setSearch] = useState("");
  const [activeMuscle, setActiveMuscle] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const needle = search.trim().toLowerCase();

  const filtered = useMemo(() => {
    return equipmentGuide.filter((item) => {
      // Search filter
      if (needle) {
        const haystack = `${item.nameEn} ${item.nameFa} ${item.musclesEn} ${item.musclesFa} ${item.descriptionEn} ${item.descriptionFa}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }

      // Muscle group filter
      if (activeMuscle) {
        const muscleEn = activeMuscle.toLowerCase();
        const muscleFa = MUSCLE_GROUPS.find(
          (m) => m.en.toLowerCase() === muscleEn
        )?.fa;
        const musclesEn = item.musclesEn.toLowerCase();
        const musclesFa = item.musclesFa;
        if (!musclesEn.includes(muscleEn) && !musclesFa.includes(muscleFa)) {
          return false;
        }
      }

      return true;
    });
  }, [needle, activeMuscle]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-display font-bold text-3xl tracking-tight">
          {isFa ? "راهنمای تجهیزات" : "Equipment Guide"}
        </h1>
        <p className="text-muted text-sm mt-1.5">
          {isFa
            ? "هر نوع تجهیزات باشگاه، با زبان ساده و بدون اصطلاحات قلمبه."
            : "Every type of equipment in your gym, explained like a friend would."}
        </p>
      </motion.div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative mb-4"
      >
        <Search
          size={16}
          className="absolute start-3 top-1/2 -translate-y-1/2 text-faint"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            isFa ? "جستجوی تجهیزات…" : "Search equipment…"
          }
          className="w-full ps-9 pe-4 py-2.5 rounded-xl bg-surface border border-line text-ink text-sm placeholder:text-faint focus:outline-none focus:border-volt/50 transition-colors"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-faint hover:text-ink"
          >
            <X size={14} />
          </button>
        )}
      </motion.div>

      {/* Muscle group filter chips */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-6"
      >
        <button
          onClick={() => setActiveMuscle(null)}
          className={`chip transition-colors ${
            !activeMuscle
              ? "bg-volt/15 border-volt/40 text-volt"
              : "hover:border-faint/60"
          }`}
        >
          <Zap size={12} />
          {isFa ? "همه" : "All"}
        </button>
        {MUSCLE_GROUPS.map((mg) => {
          const label = isFa ? mg.fa : mg.en;
          const isActive =
            activeMuscle?.toLowerCase() === mg.en.toLowerCase();
          const colorCls = isActive
            ? MUSCLE_COLORS[mg.en]
            : "hover:border-faint/60";
          return (
            <button
              key={mg.en}
              onClick={() =>
                setActiveMuscle(isActive ? null : mg.en)
              }
              className={`chip transition-colors ${colorCls}`}
            >
              {label}
            </button>
          );
        })}
      </motion.div>

      {/* Equipment grid */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <EquipmentCard
              key={item.id}
              item={item}
              lang={lang}
              isExpanded={expandedId === item.id}
              onToggle={() =>
                setExpandedId(expandedId === item.id ? null : item.id)
              }
            />
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Wrench size={32} className="mx-auto text-faint mb-3" />
            <p className="text-muted text-sm">
              {isFa
                ? "هیچ تجهیزاتی با فیلترهای شما پیدا نشد."
                : "No equipment matches your search."}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
