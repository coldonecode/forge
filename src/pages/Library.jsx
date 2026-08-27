import { useEffect } from "react";
import { motion } from "framer-motion";
import { LibraryBig } from "lucide-react";
import ExerciseBrowser from "../components/ExerciseBrowser";
import { useStore } from "../store/useStore";
import { useI18n } from "../i18n/useI18n";

export default function Library() {
  const catalog = useStore((s) => s.catalog);
  const guideFilter = useStore((s) => s.guideFilterEquipment);
  const { t } = useI18n();

  // Reset the guide deep-link filter once we leave the page
  useEffect(
    () => () => {
      if (useStore.getState().guideFilterEquipment)
        useStore.setState({ guideFilterEquipment: null });
    },
    []
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="font-display font-bold text-3xl tracking-tight">{t("lib.title")}</h1>
        <p className="text-muted text-sm mt-1.5">
          {t("lib.sub", { count: catalog.length.toLocaleString() })}
        </p>
      </motion.div>
      <ExerciseBrowser
        key={guideFilter ?? "all"}
        exercises={catalog}
        initialEquipment={guideFilter ?? "all"}
      />
    </div>
  );
}
