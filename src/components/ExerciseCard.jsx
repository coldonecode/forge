import { motion } from "framer-motion";
import GifImage from "./GifImage";
import { useI18n } from "../i18n/useI18n";
import { formatMuscleLocal, formatEquipment } from "../i18n/translations";

export default function ExerciseCard({ exercise, index = 0, onClick }) {
  const { lang } = useI18n();
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="card overflow-hidden text-start group cursor-pointer w-full"
    >
      <div className="relative">
        <GifImage src={exercise.gifUrl} alt={exercise.name} exerciseName={exercise.name} className="aspect-[4/3]" />
        <div className="absolute top-2 start-2 flex gap-1.5 flex-wrap max-w-[90%]">
          {exercise.equipments.slice(0, 2).map((eq) => (
            <span key={eq} className="chip !bg-bg/70 !border-line backdrop-blur-sm">
              {formatEquipment(eq, lang)}
            </span>
          ))}
        </div>
      </div>
      <div className="p-3.5">
        <h3 className={`font-display font-semibold text-[15px] leading-snug group-hover:text-volt transition-colors line-clamp-2 ${lang === "en" ? "capitalize" : ""}`}>
          {exercise.name}
        </h3>
        <p className="text-muted text-xs mt-1.5">
          🎯 {exercise.targetMuscles.map((m) => formatMuscleLocal(m, lang)).join(lang === "fa" ? "، " : ", ")}
        </p>
      </div>
    </motion.button>
  );
}
