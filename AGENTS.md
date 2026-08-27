# Forge — Gym Workout Planner (Agent Handoff Document)

> **Read this file first.** It contains everything needed to continue developing
> this app without any prior context. Keep it updated as the project evolves.

## 1. What this project is

A bilingual (English 🇬🇧 / Persian 🇮🇷 with full RTL) gym workout planner built for
a **complete beginner** who trains 3–4 days/week and doesn't know gym machines.
Ships as both a web PWA and an installable Android APK (offline-first).

- **Owner/user:** Ocanel (non-developer). Runs it personally.
- **Current version:** see `src/config.js` → `APP_VERSION`.

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| UI | React 19 + Vite 7 | SPA, no router lib (zustand `page` state) |
| Styling | Tailwind CSS v4 | Config lives in `src/index.css` via `@theme`; custom `@utility card/chip/btn-*` |
| Animations | framer-motion v12 | Page transitions in `App.jsx`, layout animations in nav |
| State | zustand v5 + persist middleware | Persists profile, planDays, logs, activeSession to localStorage |
| Icons | lucide-react | |
| Exercise data | ExerciseDB API (AscendAPI) free tier | See §5 constraints |
| Mobile | Capacitor 7 (`@capacitor/*`) | Android project in `android/` |

## 3. File map (what lives where)

```
src/
├── config.js                  # APP_VERSION — bump on releases
├── main.jsx                   # entry + SW registration + storage.persist()
├── App.jsx                    # page switcher, dir/lang effect, GIF prefetch
├── index.css                  # ALL design tokens (@theme), RTL rules, mobile feel
├── api/exerciseDb.js          # API client: throttle/backoff, IndexedDB cache,
│                              #   bundled-catalog loader, EQUIPMENT_META visuals
├── data/
│   ├── starterPlans.js        # 2 beginner templates (names must match catalog!)
│   ├── catalog.json           # FULL 1500-exercise snapshot (public/, ships in APK)
│   └── exerciseEducation.js   # ⭐ coach notes per exercise {setup,cues,rom,
│                              #   breathing,mistakes,safety} each {en,fa}
├── i18n/
│   ├── translations.js        # en+fa dictionaries (~110 keys), helpers:
│   │                          #   translate/weekdayName/formatDate/formatMuscleLocal/
│   │                          #   formatBodyPart/formatEquipment
│   └── useI18n.js             # useI18n() -> { t, lang, dir }
├── store/useStore.js          # zustand store: profile/planDays/logs/activeSession,
│                              #   planner+session actions, streak/volume selectors
├── hooks/useCatalog.js        # loads catalog once; silent weekly backgroundRefresh
├── utils/{mobile.js,prefetch.js}  # haptics, wake lock / plan-GIF preloader
├── components/                # Layout(nav+lang toggle), CatalogGate(progress),
│                              #   GifImage(skeleton+error), ExerciseCard/Browser/
│                              #   Modal(+EducationPanel), RestTimer, ProgressRing,
│                              #   EducationPanel, EducationQuickGuide
└── pages/                     # Onboarding(wizard), Dashboard, Planner, Library,
                               # Guide("Machines 101"), Session(player), History
android/                       # Capacitor native shell (don't hand-edit res/)
public/                        # sw.js (PWA cache), manifest, icons, catalog.json
assets/                        # source icon/splash for @capacitor/assets
START-APP.bat                  # double-click → web server for LAN/PWA install
BUILD-APK.bat                  # double-click → rebuilds Forge.apk to Desktop
```

## 4. Critical architecture facts (don't break these)

1. **Two persistence layers, different jobs:** user data → `localStorage`
   (zustand persist key `forge-store`); exercise catalog → **IndexedDB**
   (`forge-db` / kv / `catalog_v1`, refreshed if >30 days).
2. **Bundled fallback chain:** IDB cache → `public/catalog.json` snapshot → live API.
   The bundle makes the APK work offline from first launch. Regenerate it via the
   pagination loop in §5 when you want fresher data.
3. **ExerciseDB rate limits are REAL** (Cloudflare 1015/429): max `limit=25`,
   cursor param is `after`. All requests go through `getJson()` backoff +
   `PAGE_DELAY_MS=1500`. Never parallelize catalog downloads.
4. **Starter plans resolve by exact lowercase exercise NAME** against the catalog at
   onboarding time (`completeOnboarding`). If a name stops existing in the API, that
   row silently drops — check with a quick filter script after catalog refreshes.
5. **Language switching:** `profile.lang` drives `document.dir/lang` in `App.jsx`.
   Every user-visible string goes through `t()` — **new strings MUST be added to BOTH
   `en` and `fa` blocks** in translations.js. Fonts auto-swap to Vazirmatn via
   `html[lang="fa"]` overrides in index.css. Use logical CSS utilities
   (`ps-/pe-/ms-/me-/start-/end-/text-start`) never left/right; flip directional
   icons with `rtl:rotate-180`.
6. **RTL-safe numbers:** wrap counters/timers in `dir="ltr"` spans (done throughout).
7. **Rest timer keys** use stable ids (`${ei}-${si}`) — do NOT reintroduce
   `Date.now()` keys or the countdown remounts every second (fixed bug, keep fixed).

## 5. ExerciseDB API cheatsheet

- Base: `https://oss.exercisedb.dev/api/v1` (free tier, NO auth; attribution shown in-app — required by license)
- `GET /exercises?limit=25&after={cursor}` → `{data, meta:{total,nextCursor,hasNextPage}}`
- Filters: `/exercises/equipments?equipments=Cable`, `/search?search=...`,
  meta lists: `/bodyparts /muscles /equipments /exercisetypes`
- Free media = single 180p `gifUrl` per exercise. Paid fields (tips, mistakes,
  multi-res) exist but are NOT available — that's why we author education locally.

## 6. Build & release workflows

| Task | Command |
|---|---|
| Web dev server (https!) | `npm run dev` → https://localhost:5173 (self-signed cert warning is normal) |
| Web production | `npm run build` → `dist/` |
| PWA preview (LAN) | `npm run preview` → https://localhost:4173 (+ PC IP) |
| Android APK | double-click `BUILD-APK.bat` (= build + cap sync + gradlew assembleDebug) → copies `Forge.apk` to Desktop |
| New app icon/splash | replace `assets/icon.png` (1024²) & `assets/splash.png` (2732²) → `npx capacitor-assets generate --android` |

**Release checklist:** bump `APP_VERSION` in `src/config.js` AND
`android/app/build.gradle` (`versionCode` +1, `versionName`). Rebuild APK. Installing
the new APK over the old one preserves all user data (same signing key = debug key;
do not delete `android/app/debug.keystore` or updates will refuse to install).

## 7. Extending content (the "updatable over time" design)

- **New exercise coaching notes:** append an entry to `EDUCATION` in
  `exerciseEducation.js` keyed by exact catalog name; both languages; done — modal &
  session pick it up automatically (fuzzy prefix match handles "v. 2" variants).
- **New starter template:** add object to `starterPlans.js` with `nameKey/descKey`
  translation keys + day `nameKey/focusKey`s.
- **Fresh catalog snapshot:** run the paginated download (§5 pattern, limit=25,
  1.5 s delay, ~60 pages ≈ 100 s) → save array JSON → overwrite
  `public/catalog.json` → rebuild.
- **New UI string:** add to BOTH language blocks; verify with the grep-based key
  audit used previously (all `t("...")` literals vs dictionary).

## 8. Verification checklist (run before any release)

1. `npm run build` — zero errors.
2. `npm run dev`, open https://localhost:5173 — onboarding wizard completes,
   dashboard shows today's workout, start a session, log a set, rest timer counts
   down correctly (does NOT reset every second), finish → history row appears.
3. Reload mid-workout → resume banner appears on dashboard.
4. Toggle language to فارسی → whole UI mirrors RTL, Vazirmatn font loads, Jalali
   dates show. Toggle back.
5. Exercise detail modal shows Coach's notes sections for starter-plan exercises.
6. Planner: add/remove/reorder exercises, edit sets/reps, picker adds with ✓ chip.
7. `BUILD-APK.bat` succeeds; install over previous APK keeping data.

## 9. Known limitations / roadmap ideas

- GIFs stream from CDN (cached by HTTP cache/SW after first view); fully offline
  *brand-new* exercises need one online view. Could bundle top-50 GIFs into APK.
- No progressive overload suggestions yet — compare-with-last-session exists only
  as prefilled weights. Natural next feature.
- History chart is simple weekly volume; body-part split charts would help.
- iOS wrapper not configured (Capacitor supports it if ever needed).
- Windows Firewall prompt appears on first `START-APP.bat` run on new machines.

## 10. Environment notes (original machine)

- Node 24, npm 11. JDK: `C:\Program Files\Android\Android Studio\jbr` (21).
- ANDROID SDK: `%LOCALAPPDATA%\Android\Sdk` (platforms 34–36, licenses accepted).
- `android/local.properties` holds `sdk.dir` — regenerate per machine if missing.
