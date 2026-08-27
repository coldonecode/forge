import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell, LayoutDashboard, CalendarRange, LibraryBig,
  BookOpen, History, Globe, Settings, BookMarked, MoreHorizontal,
} from "lucide-react";
import { useStore } from "../store/useStore";
import { useI18n } from "../i18n/useI18n";
import { LANGUAGES } from "../i18n/translations";
import { APP_VERSION } from "../config";

const MORE_ITEMS = [
  { key: "guide", labelKey: "nav.guide", icon: BookOpen },
  { key: "equipment", labelKey: "nav.equipment", icon: BookMarked },
  { key: "history", labelKey: "nav.history", icon: History },
  { key: "settings", labelKey: "nav.settings", icon: Settings },
];

const DESKTOP_NAV = [
  { key: "dashboard", labelKey: "nav.today", icon: LayoutDashboard },
  { key: "planner", labelKey: "nav.plan", icon: CalendarRange },
  { key: "library", labelKey: "nav.library", icon: LibraryBig },
  { key: "guide", labelKey: "nav.guide", icon: BookOpen },
  { key: "equipment", labelKey: "nav.equipment", icon: BookMarked },
  { key: "history", labelKey: "nav.history", icon: History },
];

const MOBILE_NAV = [
  { key: "dashboard", labelKey: "nav.today", icon: LayoutDashboard },
  { key: "planner", labelKey: "nav.plan", icon: CalendarRange },
  { key: "library", labelKey: "nav.library", icon: LibraryBig },
];

export default function Layout({ children }) {
  const page = useStore((s) => s.page);
  const setPage = useStore((s) => s.setPage);
  const lang = useStore((s) => s.profile.lang) || "en";
  const setLang = useStore((s) => s.setLang);
  const { t } = useI18n();
  const [moreOpen, setMoreOpen] = useState(false);

  const toggleLang = () => setLang(lang === "en" ? "fa" : "en");

  const handleMoreSelect = useCallback((key) => {
    setPage(key);
    setMoreOpen(false);
  }, [setPage]);

  return (
    <div className="min-h-screen flex">
      {/* ---------- Desktop sidebar ---------- */}
      <aside className="hidden lg:flex w-56 shrink-0 flex-col border-e border-line bg-bg-soft/60 backdrop-blur sticky top-0 h-screen p-4">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-9 h-9 rounded-xl bg-volt grid place-items-center shadow-glow">
            <Dumbbell size={20} className="text-bg" strokeWidth={2.4} />
          </div>
          <div>
            <div className="font-display font-bold text-base leading-none tracking-tight">Forge</div>
            <div className="text-[10px] text-faint mt-0.5 tracking-wide uppercase">{t("app.tagline")}</div>
          </div>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {DESKTOP_NAV.map(({ key, labelKey, icon: Icon }) => {
            const active = page === key;
            return (
              <button
                key={key}
                onClick={() => setPage(key)}
                className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  active ? "text-volt" : "text-muted hover:text-ink hover:bg-surface/70"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-volt/10 border border-volt/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon size={17} className="relative z-10 shrink-0" />
                <span className="relative z-10">{t(labelKey)}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2">
          <button
            onClick={() => setPage("settings")}
            className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              page === "settings" ? "text-volt bg-volt/10 border border-volt/25" : "text-muted hover:text-ink hover:bg-surface/70 border border-transparent"
            }`}
          >
            <Settings size={15} /> {t("nav.settings")}
          </button>

          <button
            onClick={toggleLang}
            className="w-full flex items-center justify-between rounded-xl bg-surface/80 border border-line px-3 py-2.5 text-sm text-muted hover:text-ink hover:border-volt/40 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Globe size={15} /> {LANGUAGES[lang]?.name ?? lang}
            </span>
            <span className="chip !py-0.5 !px-2 !text-[10px]">{lang === "en" ? "فارسی ←" : "→ EN"}</span>
          </button>

          <p className="text-[10px] text-faint leading-relaxed px-1">
            {t("side.credit")}{" "}
            <a href="https://oss.exercisedb.dev" target="_blank" rel="noreferrer" className="underline hover:text-muted" dir="ltr">
              ExerciseDB (AscendAPI)
            </a>
            <span className="block mt-0.5" dir="ltr">Forge v{APP_VERSION}</span>
          </p>
        </div>
      </aside>

      {/* ---------- Main content ---------- */}
      <main className="flex-1 min-w-0 pb-20 lg:pb-6">{children}</main>

      {/* ---------- Mobile bottom nav ---------- */}
      {page !== "session" && (
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-bg/95 backdrop-blur-lg border-t border-line/50 pb-[env(safe-area-inset-bottom)]">
          <div className="grid grid-cols-4 h-14">
            {MOBILE_NAV.map(({ key, labelKey, icon: Icon }) => {
              const active = page === key;
              return (
                <button
                  key={key}
                  onClick={() => setPage(key)}
                  className="relative flex flex-col items-center justify-center gap-0.5 cursor-pointer"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill-mobile"
                      className="absolute top-0 h-[3px] w-8 rounded-full bg-volt"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon size={20} className={active ? "text-volt" : "text-faint"} strokeWidth={active ? 2.2 : 1.8} />
                  <span className={`text-[10px] font-medium ${active ? "text-volt" : "text-faint"}`}>{t(labelKey)}</span>
                </button>
              );
            })}

            {/* More tab */}
            <button
              onClick={() => setMoreOpen(true)}
              className="relative flex flex-col items-center justify-center gap-0.5 cursor-pointer"
            >
              <MoreHorizontal size={20} className="text-faint" strokeWidth={1.8} />
              <span className="text-[10px] font-medium text-faint">More</span>
            </button>
          </div>
        </nav>
      )}

      {/* ---------- More bottom sheet ---------- */}
      <AnimatePresence>
        {moreOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="more-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/60"
              onClick={() => setMoreOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              key="more-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 36 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 400) setMoreOpen(false);
              }}
              className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-surface rounded-t-3xl pb-[env(safe-area-inset-bottom)]"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-faint/60" />
              </div>

              {/* Items */}
              <div className="px-4 pb-3">
                {MORE_ITEMS.map(({ key, labelKey, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => handleMoreSelect(key)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
                  >
                    <Icon size={18} className="shrink-0" />
                    <span>{t(labelKey)}</span>
                  </button>
                ))}

                {/* Language toggle */}
                <div className="mt-1 border-t border-line/50 pt-3">
                  <button
                    onClick={toggleLang}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium text-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <Globe size={18} className="shrink-0" />
                      {LANGUAGES[lang]?.name ?? lang}
                    </span>
                    <span className="chip !py-0.5 !px-2 !text-[10px]">{lang === "en" ? "فارسی ←" : "→ EN"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
