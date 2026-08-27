import { motion } from "framer-motion";
import {
  Dumbbell, LayoutDashboard, CalendarRange, LibraryBig,
  BookOpen, History, Flame, Globe, Settings, BookMarked,
} from "lucide-react";
import { useStore } from "../store/useStore";
import { useI18n } from "../i18n/useI18n";
import { LANGUAGES } from "../i18n/translations";
import { APP_VERSION } from "../config";

const NAV = [
  { key: "dashboard", labelKey: "nav.today", icon: LayoutDashboard },
  { key: "planner", labelKey: "nav.plan", icon: CalendarRange },
  { key: "library", labelKey: "nav.library", icon: LibraryBig },
  { key: "guide", labelKey: "nav.guide", icon: BookOpen },
  { key: "history", labelKey: "nav.history", icon: History },
  { key: "equipment", labelKey: "nav.equipment", icon: BookMarked },
];

export default function Layout({ children }) {
  const page = useStore((s) => s.page);
  const setPage = useStore((s) => s.setPage);
  const lang = useStore((s) => s.profile.lang) || "en";
  const setLang = useStore((s) => s.setLang);
  const { t } = useI18n();

  const toggleLang = () => setLang(lang === "en" ? "fa" : "en");

  return (
    <div className="min-h-screen flex">
      {/* ---------- Desktop sidebar ---------- */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-e border-line bg-bg-soft/60 backdrop-blur sticky top-0 h-screen p-5">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-10 h-10 rounded-xl bg-volt grid place-items-center shadow-glow">
            <Dumbbell size={22} className="text-bg" strokeWidth={2.4} />
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-none tracking-tight">Forge</div>
            <div className="text-[11px] text-faint mt-0.5 tracking-wide uppercase">{t("app.tagline")}</div>
          </div>
        </div>

        <nav className="mt-9 flex flex-col gap-1.5">
          {NAV.map(({ key, labelKey, icon: Icon }) => {
            const active = page === key;
            return (
              <button
                key={key}
                onClick={() => setPage(key)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
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
                <Icon size={18} className="relative z-10 shrink-0" />
                <span className="relative z-10">{t(labelKey)}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3">
          <button
            onClick={() => setPage("settings")}
            className={`w-full flex items-center gap-3 rounded-xl p-3 text-sm font-medium transition-colors cursor-pointer ${
              page === "settings" ? "text-volt bg-volt/10 border border-volt/25" : "text-muted hover:text-ink hover:bg-surface/70 border border-transparent"
            }`}
          >
            <Settings size={16} /> {t("nav.settings")}
          </button>

          <button
            onClick={toggleLang}
            className="w-full flex items-center justify-between rounded-xl bg-surface/80 border border-line p-3 text-sm text-muted hover:text-ink hover:border-volt/40 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <Globe size={16} /> {LANGUAGES[lang]?.name ?? lang}
            </span>
            <span className="chip !py-1 !px-2 !text-[11px]">{lang === "en" ? "فارسی ←" : "→ EN"}</span>
          </button>

          <div className="rounded-xl bg-surface/80 border border-line p-3.5 flex gap-3 items-start">
            <Flame size={16} className="text-ember shrink-0 mt-0.5" />
            <p className="text-[11.5px] text-muted leading-relaxed">
              {t("side.tip1")}
              <button onClick={() => setPage("guide")} className="text-ice hover:underline cursor-pointer">
                {t("side.guideLink")}
              </button>
              {t("side.tip2")}
            </p>
          </div>
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
      <main className="flex-1 min-w-0 pb-24 lg:pb-8">{children}</main>

      {/* ---------- Mobile floating buttons ---------- */}
      {page !== "session" && (
        <>
          <button
            onClick={toggleLang}
            aria-label="Language"
            className="lg:hidden fixed bottom-[78px] end-3 z-30 h-10 px-3 flex items-center gap-1.5 rounded-full bg-bg/85 backdrop-blur border border-line text-xs font-semibold text-muted hover:text-volt hover:border-volt/40 transition-colors cursor-pointer shadow-card"
          >
            <Globe size={15} />
            {lang === "en" ? "فا" : "EN"}
          </button>
          <button
            onClick={() => setPage("settings")}
            aria-label="Settings"
            className="lg:hidden fixed bottom-[78px] start-3 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-bg/85 backdrop-blur border border-line text-muted hover:text-volt hover:border-volt/40 transition-colors cursor-pointer shadow-card"
          >
            <Settings size={16} />
          </button>
        </>
      )}

      {/* ---------- Mobile bottom nav ---------- */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-bg/90 backdrop-blur-md border-t border-line pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5">
          {NAV.map(({ key, labelKey, icon: Icon }) => {
            const active = page === key;
            return (
              <button
                key={key}
                onClick={() => setPage(key)}
                className="relative flex flex-col items-center gap-1 py-2.5 cursor-pointer"
              >
                {active && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute top-0 h-0.5 w-10 rounded-full bg-volt"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon size={20} className={active ? "text-volt" : "text-faint"} />
                <span className={`text-[10px] font-medium ${active ? "text-volt" : "text-faint"}`}>{t(labelKey)}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
