import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "./store/useStore";
import Layout from "./components/Layout";
import CatalogGate from "./components/CatalogGate";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Library from "./pages/Library";
import Guide from "./pages/Guide";
import Session from "./pages/Session";
import History from "./pages/History";
import Settings from "./pages/Settings";
import { translate } from "./i18n/translations";
import { getById } from "./api/exerciseDb";
import { prefetchGifs } from "./utils/prefetch";

const PAGES = {
  dashboard: Dashboard,
  planner: Planner,
  library: Library,
  guide: Guide,
  history: History,
  session: Session,
  settings: Settings,
};

export default function App() {
  const page = useStore((s) => s.page);
  const onboarded = useStore((s) => s.profile.onboarded);
  const lang = useStore((s) => s.profile.lang) || "en";

  // Apply language direction + document title
  useEffect(() => {
    const dir = lang === "fa" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.title = translate(lang, "app.title");
  }, [lang]);

  // Preload demo GIFs for the current plan (offline-first for workouts)
  useEffect(() => {
    if (!onboarded) return;
    const st = useStore.getState();
    if (st.catalogStatus !== "ready") return;
    const urls = new Set();
    for (const day of st.planDays) {
      for (const row of day.exercises) {
        const ex = getById(row.exerciseId);
        if (ex?.gifUrl) urls.add(ex.gifUrl);
      }
    }
    prefetchGifs([...urls]);
  }, [onboarded, page]);

  const Page = !onboarded ? Onboarding : (PAGES[page] ?? Dashboard);

  return (
    <CatalogGate>
      {onboarded ? (
        <Layout>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
            >
              <Page />
            </motion.div>
          </AnimatePresence>
        </Layout>
      ) : (
        <Onboarding />
      )}
    </CatalogGate>
  );
}
