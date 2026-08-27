import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ChevronDown, PackageOpen } from "lucide-react";
import ExerciseCard from "./ExerciseCard";
import ExerciseModal from "./ExerciseModal";
import { searchLocal } from "../api/exerciseDb";
import { useI18n } from "../i18n/useI18n";
import { formatBodyPart, formatEquipment } from "../i18n/translations";

const BODY_PARTS = [
  "chest", "back", "shoulders", "upper arms", "lower arms",
  "upper legs", "lower legs", "waist", "cardio",
];

const PAGE = 48;

export default function ExerciseBrowser({ exercises, initialBodyPart = "all", initialEquipment = "all", onSelect, selectedIds }) {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const [bodyPart, setBodyPart] = useState(initialBodyPart);
  const [equipment, setEquipment] = useState(initialEquipment);
  const [visible, setVisible] = useState(PAGE);
  const [selected, setSelected] = useState(null);

  const equipmentOptions = useMemo(
    () => [...new Set(exercises.flatMap((x) => x.equipments))].sort(),
    [exercises]
  );

  const filtered = useMemo(
    () => searchLocal(exercises, { q, bodyPart, equipment }),
    [exercises, q, bodyPart, equipment]
  );

  const shown = filtered.slice(0, visible);

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={17} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-faint pointer-events-none" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setVisible(PAGE); }}
            placeholder={t("lib.search")}
            className="w-full bg-surface border border-line rounded-xl ps-10 pe-4 py-2.5 text-sm outline-none focus:border-volt/60 transition-colors placeholder:text-faint"
          />
        </div>
        <div className="relative">
          <select
            value={equipment}
            onChange={(e) => { setEquipment(e.target.value); setVisible(PAGE); }}
            className="appearance-none bg-surface border border-line rounded-xl ps-4 pe-9 py-2.5 text-sm outline-none focus:border-volt/60 transition-colors cursor-pointer w-full sm:w-auto"
          >
            <option value="all">{t("lib.allEquipment")}</option>
            {equipmentOptions.map((eq) => (
              <option key={eq} value={eq}>{formatEquipment(eq, lang)}</option>
            ))}
          </select>
          <ChevronDown size={15} className="absolute end-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none" />
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {[["all", t("lib.all")], ...BODY_PARTS.map((b) => [b, formatBodyPart(b, lang)])].map(([val, label]) => (
          <button
            key={val}
            onClick={() => { setBodyPart(val); setVisible(PAGE); }}
            className={`chip cursor-pointer transition-all shrink-0 ${
              bodyPart === val ? "!bg-volt !text-bg !border-volt font-bold" : "hover:!text-ink hover:!border-faint"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Results */}
      {shown.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <PackageOpen size={40} strokeWidth={1.5} className="text-faint" />
          <p className="text-muted">{t("lib.empty")}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
            <AnimatePresence mode="popLayout">
              {shown.map((ex, i) => (
                <div key={ex.exerciseId} className="relative">
                  <ExerciseCard
                    exercise={ex}
                    index={i % PAGE}
                    onClick={() => (onSelect ? onSelect(ex) : setSelected(ex))}
                  />
                  {selectedIds?.has(ex.exerciseId) && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-2 end-2 chip !bg-volt !text-bg !border-volt font-bold pointer-events-none shadow-glow"
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
              ))}
            </AnimatePresence>
          </div>
          {visible < filtered.length && (
            <div className="flex justify-center pt-2">
              <button onClick={() => setVisible((v) => v + PAGE)} className="btn-ghost !py-2.5 !px-6 text-sm">
                {t("lib.more", { n: filtered.length - visible })}
              </button>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {selected && <ExerciseModal exercise={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
