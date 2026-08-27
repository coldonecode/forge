# PROJECT_CONTEXT.md — Forge Gym Workout Planner

> This file contains everything an AI agent needs to continue developing Forge.
> Read this before making any changes.

## 1. Project Identity

Forge is a bilingual (English 🇬🇧 / Persian 🇮🇷 with full RTL) gym workout planner designed for a
complete beginner who doesn't know gym machines. Ships as web PWA + Android APK (offline-first).

- **Owner/user**: Ocanel (non-developer). Runs it personally.
- **Version**: `2.0.0` (see `src/config.js` → `APP_VERSION`)
- **Repo**: https://github.com/coldonecode/forge
- **Android package**: `com.ocanel.forge`
- **Node**: 24, npm 11, JDK 21

## 2. Architecture Overview

| Layer | Choice | Version | Notes |
|---|---|---|---|
| UI | React | 19.0.0 | SPA, no router library |
| Build | Vite | 7.0.0 | `@vitejs/plugin-basic-ssl` for dev HTTPS |
| Styling | Tailwind CSS | 4.0.0 | Config in `src/index.css` via `@theme`; custom `@utility card/chip/btn-*` |
| Animations | framer-motion | 12.0.0 | Page transitions in `App.jsx`, layout animations in nav |
| State | zustand | 5.0.0 | `persist` middleware → localStorage key `forge-store` |
| Icons | lucide-react | 0.545.0 | |
| Exercise data | ExerciseDB API | free tier | No auth; 180p GIFs only; attribution required |
| Mobile | Capacitor | 8.5.0 | Android project in `android/` |
| Routing | zustand `page` state | — | No router lib; `PAGES` map in `App.jsx` |

**Key design principle:** No server. Everything runs client-side. Data lives in localStorage (user state) and IndexedDB (exercise catalog). The APK bundles a 1500-exercise catalog snapshot for offline-first usage.

## 3. File Map

```
src/
├── config.js                  # APP_VERSION ("2.0.0"), APP_NAME ("Forge")
├── main.jsx                   # Entry point: renders <App/>, registers SW, calls navigator.storage.persist()
├── App.jsx                    # Page switcher via zustand `page` state, dir/lang effect, GIF prefetch,
│                              #   wraps in CatalogGate + Layout + AnimatePresence
├── index.css                  # ALL design tokens (@theme), RTL rules, mobile feel, custom utilities
│
├── api/
│   └── exerciseDb.js          # API client: getJson() with exponential backoff, downloadCatalog(),
│                              #   getCatalog() (IDB → bundled → network), backgroundRefresh(),
│                              #   buildIndex(), getById(), searchLocal(), EQUIPMENT_META visuals
│
├── data/
│   ├── starterPlans.js        # 2 beginner templates: FULL_BODY_3 (3-day) + UPPER_LOWER_4 (4-day)
│   │                          #   Exercise names MUST match catalog exactly (lowercase)
│   ├── exerciseEducation.js   # 31 exercises with bilingual coach notes: {setup,cues,rom,breathing,
│   │                          #   mistakes,safety} each {en,fa}. Keyed by exact catalog name.
│   ├── exercisePresets.js     # 10 muscle groups × 3-6 exercises each = quick-add presets
│   ├── exerciseAlternatives.js # 32 exercise→alternative mappings (for equipment substitution)
│   └── equipmentGuide.js      # 10 equipment types with bilingual descriptions, how-to-use, mistakes,
│                              #   adjustments, beginner tips
│
├── i18n/
│   ├── translations.js        # en + fa dictionaries (~110 keys each), plus helpers:
│   │                          #   translate(), weekdayName(), formatDate(), formatMuscleLocal(),
│   │                          #   formatBodyPart(), formatEquipment()
│   │                          #   LANGUAGES map: { en: {dir:"ltr"}, fa: {dir:"rtl"} }
│   └── useI18n.js             # useI18n() → { t, lang, dir } — the main i18n hook
│
├── store/
│   └── useStore.js            # zustand store with persist middleware (key: "forge-store")
│                              #   Persisted fields: profile, planDays, logs, activeSession,
│                              #   favorites, familiarity, notes, personalRecords, dataVersion
│                              #   Transient fields: page, catalogStatus, catalog, guideFilterEquipment
│                              #   Actions: completeOnboarding, planner CRUD, session lifecycle,
│                              #   favorites, familiarity, notes, personalRecords, export/import
│                              #   Selectors: sessionsThisWeek(), computeStreak(), totalVolume()
│
├── hooks/
│   └── useCatalog.js          # Loads catalog once on mount; triggers backgroundRefresh() after 4s
│                              #   if ready. Returns { status, progress }.
│
├── utils/
│   ├── mobile.js              # haptic(), hapticSuccess(), keepScreenAwake() — mobile-native helpers
│   ├── prefetch.js            # prefetchGifs() — warms SW cache with plan GIFs for offline use
│   └── recommendation.js      # getTodayRecommendation() — pure function: analyzes logs + muscle
│                              #   recovery (48h threshold), scheduled day, overdue muscles, returns
│                              #   recommended day + reason + muscleReadiness array
│
├── components/
│   ├── Layout.jsx             # Desktop sidebar (6 nav items) + mobile bottom bar + lang toggle
│   ├── CatalogGate.jsx        # Loading/error gate for catalog (progress bar, retry)
│   ├── GifImage.jsx           # Lazy-loaded GIF with skeleton + error fallback
│   ├── ExerciseCard.jsx       # Card component for exercise in library/planner
│   ├── ExerciseModal.jsx      # Full exercise detail modal (GIF/SVG + muscles + instructions)
│   ├── ExerciseBrowser.jsx    # Filterable exercise list for picker
│   ├── ExercisePresets.jsx    # Quick-add by muscle group (presets from exercisePresets.js)
│   ├── EducationPanel.jsx     # Coach's notes panel (setup, cues, ROM, breathing, mistakes, safety)
│   ├── EducationQuickGuide.jsx # Condensed form guide for session view
│   ├── RestTimer.jsx          # Countdown timer between sets (stable key: ${exerciseIdx}-${setIdx})
│   ├── ProgressRing.jsx       # SVG circular progress indicator
│   ├── ProgressSuggestions.jsx # Smart weight/rep suggestions based on last session
│   ├── PersonalRecords.jsx    # PR badge display per exercise
│   ├── FamiliarityBadge.jsx   # never_tried/learning/comfortable/mastered indicator
│   ├── FavoriteButton.jsx     # Heart toggle for exercises/equipment/presets
│   ├── TodayRecommendation.jsx # "What should I train today?" widget with muscle recovery status
│   ├── WorkoutCalendar.jsx    # Monthly calendar view of workouts
│   ├── WorkoutNotes.jsx       # Inline note editor (per workout/exercise/set)
│   ├── UndoToast.jsx          # Undo notification after exercise/day removal
│   └── AnimationControls.jsx  # Play/pause/slow/replay for SVG animations
│
├── components/svg/
│   ├── index.js               # Registry: exercise name (lowercase) → React component
│   ├── ChestPressSvg.jsx      # Animated stick figure (maps lever chest press + incline variant)
│   ├── LatPulldownSvg.jsx     # Maps reverse grip + front pulldown
│   ├── LegExtensionSvg.jsx
│   ├── SquatSvg.jsx           # Maps smith squat
│   ├── ShoulderPressSvg.jsx
│   ├── BicepCurlSvg.jsx       # Maps lever bicep curl + cable curl + hammer curl
│   ├── TricepsPushdownSvg.jsx # Maps cable pushdown + lever triceps extension
│   ├── LateralRaiseSvg.jsx
│   ├── LegCurlSvg.jsx         # Maps lying + kneeling leg curl
│   └── SeatedRowSvg.jsx       # Maps lever seated row + cable seated row
│
└── pages/
    ├── Onboarding.jsx         # 3-step wizard: welcome → goal → week plan (creates starter plan)
    ├── Dashboard.jsx          # Today's workout, stats (streak, workouts, volume), resume banner
    ├── Planner.jsx            # Weekly plan editor: add/remove/reorder exercises, edit sets/reps
    ├── Library.jsx            # Filterable exercise catalog browser with search + equipment filter
    ├── Guide.jsx              # "Machines 101" — golden rules, gym etiquette, equipment links
    ├── EquipmentGuide.jsx     # Detailed equipment guide per type (how-to, adjustments, mistakes)
    ├── Session.jsx            # Workout player: log sets, rest timer, finish/discard
    ├── History.jsx            # Past workouts list + weekly volume chart
    └── Settings.jsx           # Display mode (GIF/SVG), language toggle, reset, backup/restore

android/                       # Capacitor native shell (don't hand-edit res/)
├── app/build.gradle           # applicationId: com.ocanel.forge, versionCode 2, versionName "2.0.0"
├── local.properties           # sdk.dir (regenerate per machine)
└── debug.keystore             # Signing key — do NOT delete or APK updates won't install

public/
├── catalog.json               # FULL 1500-exercise snapshot (ships in APK for offline-first)
├── sw.js                      # Service worker: app shell cache + GIF cache (600 limit) + font cache
├── manifest.webmanifest       # PWA manifest: name, icons, display:standalone, orientation:portrait
├── icon-192.png               # PWA icon 192×192
└── icon-512.png               # PWA icon 512×512 (maskable)

assets/                        # Source icon/splash for @capacitor/assets generation
START-APP.bat                  # Double-click → npm run build + npm run preview (LAN HTTPS server)
BUILD-APK.bat                  # Double-click → build + cap sync + gradlew assembleDebug → Desktop/Forge.apk
```

## 4. Data Architecture

### 4.1 State Management

The Zustand store (`src/store/useStore.js`) uses `persist` middleware with localStorage key `"forge-store"`. A `DATA_VERSION` constant (currently `2`) enables future migration support via `migrateData()`.

**Persisted fields** (saved to localStorage):

| Field | Type | Purpose |
|---|---|---|
| `profile` | `{ name, goal, daysPerWeek, onboarded, lang, displayMode }` | User identity + preferences |
| `planDays` | `PlanDay[]` | Weekly workout plan |
| `logs` | `{ "YYYY-MM-DD": Log }` | Completed workout history |
| `activeSession` | `ActiveSession \| null` | In-progress workout (survives page reload) |
| `favorites` | `{ exercises, equipment, presets }` | Heart-marked items |
| `familiarity` | `{ [exerciseId]: level }` | User's comfort level per exercise |
| `notes` | `{ [key]: string }` | Freeform notes (per workout/exercise/set) |
| `personalRecords` | `{ [exerciseId]: { maxWeight, maxReps, maxVolume, lastUpdated } }` | PR tracking |
| `dataVersion` | `number` | Migration version |

**Transient fields** (not persisted):

| Field | Type | Purpose |
|---|---|---|
| `page` | `string` | Current page ("dashboard", "planner", etc.) |
| `catalogStatus` | `"idle" \| "loading" \| "ready" \| "error"` | Catalog loading state |
| `catalogProgress` | `{ loaded, total }` | Download progress |
| `catalog` | `Exercise[]` | Full exercise array in memory |
| `guideFilterEquipment` | `string \| null` | Equipment filter for guide page |

**Migration:** `onRehydrateStorage` runs `migrateData()` on every app load. Currently just bumps `dataVersion` if needed. Extend this when schema changes.

### 4.2 Exercise Catalog

Three-layer fallback chain (fastest to slowest):

1. **IndexedDB cache** (`forge-db` / kv / `catalog_v1`) — refreshed if >30 days old
2. **Bundled snapshot** (`public/catalog.json`) — ships inside the app, ~1500 exercises, works offline
3. **Live API** (`https://oss.exercisedb.dev/api/v1`) — paginated download (limit=25, 1.5s delay between pages)

`getCatalog()` tries each layer in order. `backgroundRefresh()` silently re-downloads if cache is >7 days old (runs once after 4s on app start). `buildIndex()` creates a `Map<exerciseId, exercise>` for O(1) lookups.

### 4.3 Data Persistence

- **User data** → localStorage via zustand persist (survives app updates)
- **Exercise catalog** → IndexedDB (separate concern, 30-day refresh cycle)
- **Both survive app updates** as long as `DATA_VERSION` migration is handled
- `navigator.storage.persist()` is called on app load to prevent browser auto-clearing

### 4.4 Backup/Restore

- `exportData()` → returns JSON string of all persisted state fields
- `importData(jsonString)` → validates, merges with current state, returns `{ success, error? }`
- Export does NOT include activeSession (intentional — don't restore in-progress workouts)
- UI accessible from Settings page

## 5. Key Components

### Layout (`src/components/Layout.jsx`)
Desktop: sticky sidebar with logo, 6 nav items (Dashboard, Plan, Exercises, Guide, History, Equipment), version badge, language toggle. Mobile: bottom bar with same nav items. Navigation is driven by `setPage()` on zustand store.

### CatalogGate (`src/components/CatalogGate.jsx`)
Wrapper that blocks app rendering until catalog is loaded. Shows progress bar during download, error with retry button on failure. Renders children only when `catalogStatus === "ready"`.

### ExerciseModal (`src/components/ExerciseModal.jsx`)
Full exercise detail: GIF/SVG animation, muscle tags, instructions, "Add to:" planner picker, education panel (coach's notes), alternatives, favorites toggle. Uses fuzzy prefix matching for education lookup (handles "v. 2" variants).

### EducationPanel (`src/components/EducationPanel.jsx`)
Renders coach's notes from `exerciseEducation.js`: setup, cues, ROM & breathing, common mistakes, safety. Each section has bilingual `{en, fa}` content. Falls back gracefully if exercise has no education entry.

### RestTimer (`src/components/RestTimer.jsx`)
Countdown timer between sets. Uses stable keys (`${exerciseIdx}-${setIdx}`) — does NOT use `Date.now()` keys (would cause re-mount every second).

### Session (`src/pages/Session.jsx`)
Workout player: iterates exercises, shows target vs actual sets, weight/reps input, done checkbox, rest timer between sets, finish/discard buttons. Presets weights from last session (`findLastLoggedWeight`). Acquires screen wake lock while active.

### TodayRecommendation (`src/components/TodayRecommendation.jsx`)
Smart "what should I train today?" widget. Analyzes muscle recovery (48h = ready, 24-48h = recent, <24h = needs rest), scheduled day, overdue muscles. Returns recommended day + reason + muscle readiness array.

### Recommendation Engine (`src/utils/recommendation.js`)
Pure function `getTodayRecommendation(planDays, logs, profile, catalog)` — no store access. Maps exercises to muscle groups via `bodyParts`, computes last training timestamp per group, classifies recovery, suggests best day.

## 6. i18n / RTL System

- **Two language blocks** in `src/i18n/translations.js`: `en` (~110 keys) + `fa` (~110 keys)
- **All user strings** go through `t(key, params)` hook — new strings MUST be added to BOTH blocks
- **RTL switching:** `document.documentElement.dir = "rtl"` + `document.documentElement.lang = "fa"` in `App.jsx`
- **Font swap:** `html[lang="fa"]` overrides in `index.css` load Vazirmatn font
- **Logical CSS only:** Use `ps-/pe-/ms-/me-/start-/end-/text-start` — never `left/right`
- **Directional icons:** Flip with `rtl:rotate-180`
- **RTL-safe numbers:** Wrap counters/timers in `dir="ltr"` spans
- **Date formatting:** `formatDate()` uses `toLocaleDateString("fa-IR")` for Jalali dates in Persian
- **Helpers:** `translate()`, `weekdayName()`, `formatMuscleLocal()`, `formatBodyPart()`, `formatEquipment()`
- **Note:** Persian translations are phrase-based, not literal word-for-word. Some typos are fixed post-definition (lines 793-795 in translations.js)

## 7. SVG Animation System

- **10 stick-figure animations** in `src/components/svg/` (11 files including index)
- **Registry** (`svg/index.js`) maps exercise names (lowercase, exact catalog match) → React components
- **One SVG can cover multiple exercises** (e.g., `ChestPressSvg` covers both `lever chest press` and `lever incline chest press`)
- **`AnimationControls`** component provides play/pause/slow/replay buttons
- **Toggle:** User chooses in Settings (`displayMode: "gif" | "svg"`) — stored in `profile.displayMode`
- **Fallback:** When no SVG is registered for an exercise, automatically falls back to GIF
- **SVG coverage:** Covers most starter-plan exercises (~17 name mappings). Other exercises fall back to GIF.

## 8. PWA / Offline

- **Service worker** (`public/sw.js`): caches app shell + exercise GIFs (max 600) + Google Fonts
- **Cache strategy:** Network-first for navigations, cache-first for GIFs and fonts
- **Manifest** (`public/manifest.webmanifest`): standalone, portrait, dark theme (`#0b0f14`)
- **Icons:** 192×192 + 512×512 (maskable)
- **Storage persistence:** `navigator.storage.persist()` called on load to prevent auto-clearing
- **GIF prefetch:** On app start, prefetches GIFs for current plan exercises to warm SW cache
- **Catalog bundled:** `public/catalog.json` (1500 exercises) ships in APK for instant offline launch
- **ExerciseDB API requests are NOT cached by SW** (catalog lives in IndexedDB instead)

## 9. Build & Deploy

### Commands

| Task | Command | Output |
|---|---|---|
| Web dev server (HTTPS) | `npm run dev` | https://localhost:5173 (self-signed cert) |
| Web production build | `npm run build` | `dist/` directory |
| PWA preview (LAN) | `npm run preview` | https://localhost:4173 |
| Android APK | `BUILD-APK.bat` | `Desktop/Forge.apk` |
| LAN server for phone | `START-APP.bat` | Builds + runs preview server |

### Vite Config (`vite.config.js`)
- Plugins: `react()`, `tailwindcss()`, `basicSsl()`
- Dev server: port 5173, host: true (LAN accessible)
- Preview server: port 4173, host: true, https: true

### APK Build Process (`BUILD-APK.bat`)
1. `npm run build` → produces `dist/`
2. `npx cap sync android` → copies web assets to Android project
3. `cd android && gradlew.bat assembleDebug` → produces `app-debug.apk`
4. Copies APK to `Desktop/Forge.apk`

### Release Checklist
1. Bump `APP_VERSION` in `src/config.js`
2. Bump `versionCode` (+1) and `versionName` in `android/app/build.gradle`
3. Run `BUILD-APK.bat`
4. Install new APK over old one (preserves data if same signing key)
5. **Never delete** `android/app/debug.keystore` — APK updates will refuse to install

## 10. Data Model Reference

### Profile
```js
{
  name: "",              // User's first name (optional)
  goal: "",              // "muscle" | "fat" | "strong" | "fit"
  daysPerWeek: 3,        // 3 or 4
  onboarded: false,      // true after onboarding wizard completes
  lang: "en",            // "en" | "fa"
  displayMode: "gif"     // "gif" | "svg"
}
```

### PlanDay
```js
{
  id: "string",          // uid() — stable unique ID
  name: "Full Body A",   // Localized day name
  weekday: 0,            // 0=Monday … 6=Sunday
  focus: "Chest · Back · Legs",  // Localized focus tag
  exercises: [
    {
      id: "string",      // uid() — row ID (used in session entries)
      exerciseId: "string",  // ExerciseDB exerciseId
      sets: 3,
      reps: "10-12",     // String range or number
      restSec: 90
    }
  ]
}
```

### Log (keyed by date `"YYYY-MM-DD"`)
```js
{
  dayId: "string",       // planDay.id
  dayName: "Full Body A",
  startedAt: 1234567890, // Date.now() timestamp
  endedAt: 1234569999,
  durationMin: 45,
  volume: 1250,          // sum of (weight × reps) across all sets
  totalSets: 12,
  entries: [
    {
      exerciseId: "string",
      sets: [
        { weight: 20, reps: 10, done: true },
        { weight: 20, reps: 8, done: true }
      ]
    }
  ]
}
```

### ActiveSession
```js
{
  dayId: "string",       // planDay.id
  dayName: "Full Body A",
  startedAt: 1234567890,
  entries: [
    {
      rowId: "string",   // planDay.exercises[].id (stable row reference)
      exerciseId: "string",
      targetSets: 3,
      targetReps: "10-12",
      restSec: 90,
      sets: [
        { weight: 20, reps: "", done: false },  // weight prefilled from last session
        { weight: "", reps: "", done: false },
        { weight: "", reps: "", done: false }
      ]
    }
  ]
}
```

### Favorites
```js
{
  exercises: ["exerciseId", ...],   // Exercise IDs
  equipment: ["leverage_machine", ...],  // Equipment IDs
  presets: ["chest", ...]           // Muscle group preset keys
}
```

### Familiarity
```js
{
  "exerciseId": "never_tried" | "learning" | "comfortable" | "mastered"
}
```

### Notes
```js
{
  "workout:YYYY-MM-DD": "text",                    // Per-workout note
  "exercise:YYYY-MM-DD:exerciseId": "text",        // Per-exercise note
  "set:YYYY-MM-DD:exerciseId:setIdx": "text"       // Per-set note
}
```

### PersonalRecords
```js
{
  "exerciseId": {
    maxWeight: 30,        // kg
    maxReps: 12,
    maxVolume: 360,       // weight × reps
    lastUpdated: "2026-08-25"  // ISO date string
  }
}
```

## 11. Exercise Data

### ExerciseDB Fields
```js
{
  exerciseId: "string",     // Unique ID
  name: "lever chest press",// Exact name (lowercase) — used for plan resolution
  bodyParts: ["chest"],     // Array of body part strings
  equipments: ["leverage machine"],
  targetMuscles: ["pectorals"],
  secondaryMuscles: ["triceps", "shoulders"],
  gifUrl: "https://...",   // Single 180p GIF (free tier only)
  instructions: ["Step 1...", "Step 2..."]
}
```

### Starter Plans (`src/data/starterPlans.js`)
Two templates resolve exercises by **exact lowercase name match** against the catalog at onboarding time:
- **FULL_BODY_3**: 3 days/week, 4-5 exercises per day (lever chest press, lat pulldown, leg extension, etc.)
- **UPPER_LOWER_4**: 4 days/week, 5 exercises per day (upper/lower split)

**Critical:** If a name stops existing in the API after a catalog refresh, that exercise row silently drops. Always verify names match after updating the catalog.

### Education Content (`src/data/exerciseEducation.js`)
31 exercises with bilingual coach notes. Each entry has: `setup`, `cues`, `rom`, `breathing`, `mistakes`, `safety` — each with `{ en, fa }` arrays/strings. Fuzzy prefix match handles name variants (e.g., "lever chest press" matches "lever chest press v. 2").

### Exercise Presets (`src/data/exercisePresets.js`)
10 muscle groups (chest, back, shoulders, biceps, triceps, quadriceps, hamstrings, glutes, calves, abs) with 3-6 exercises each. Used by the "Quick-add by muscle" picker in Planner.

### Exercise Alternatives (`src/data/exerciseAlternatives.js`)
32 exercise→alternative mappings. Shows "Don't have this equipment?" suggestions when viewing an exercise that requires unavailable equipment.

### Equipment Guide (`src/data/equipmentGuide.js`)
10 equipment types (leverage machine, cable, smith machine, dumbbell, body weight, barbell, kettlebell, resistance band, assisted, stability ball) with bilingual: description, how-to-use steps, adjustments, common mistakes, beginner tips, example exercises.

## 12. Known Limitations

- **GIFs stream from CDN** — cached by HTTP cache/SW after first view, but brand-new exercises need one online view. Could bundle top-50 GIFs into APK.
- **SVG animations only for ~10 exercises** (~17 name mappings). All others fall back to GIF.
- **Persian instruction translation is phrase-based** — not every API field has a Persian translation.
- **No progressive overload automation** — compare-with-last-session exists only as prefilled weights. Suggestions are basic (increase weight/reps/consolidate).
- **No cloud sync** — local-only by design (localStorage/IndexedDB). Data loss possible if browser storage is cleared (mitigated by `navigator.storage.persist()` and backup/restore).
- **No iOS build configured** — Capacitor supports it if ever needed.
- **Windows Firewall prompt** appears on first `START-APP.bat` run on new machines.
- **ExerciseDB rate limits are real** — Cloudflare 1015/429. Never parallelize API requests. Use 1.5s delay between pages.

## 13. Future Roadmap

- More SVG animations (currently 10 exercises / 17 name mappings)
- Full Persian instruction translation (currently phrase-based, ~80% coverage)
- Progressive overload automation (smarter suggestions based on PR trends)
- Body composition tracking (weight, measurements, photos)
- Social features / sharing (export plan images, compare with friends)
- iOS Capacitor build (Capacitor supports it)
- Body-part split charts in History (currently only weekly volume chart)
- Bundle top-50 GIFs into APK for fully offline brand-new exercises

## 14. Emergency Procedures

### Data Recovery
If user reports data loss:
1. Check localStorage key `"forge-store"` — if empty, data was cleared
2. Ask if user previously exported a backup JSON file
3. Use `importData(jsonString)` to restore from backup
4. If no backup exists, data is lost (no server-side storage)

### Build Failures
- **Vite fails:** Check for syntax errors, missing imports, or Tailwind config issues in `index.css`
- **Capacitor sync fails:** Verify `JAVA_HOME` and `ANDROID_HOME` env vars; check `android/local.properties` has `sdk.dir`
- **APK install fails:** Verify `android/app/debug.keystore` exists; if deleted, must uninstall old APK first (loses data)
- **gradlew fails:** Run `gradlew.bat clean` first, then retry

### Rate Limiting
ExerciseDB has strict Cloudflare limits (1015/429). If catalog download fails:
1. Wait 60+ seconds
2. Use the bundled `catalog.json` fallback (works offline)
3. Never parallelize requests — use `PAGE_DELAY_MS=1500` between pages
4. `getJson()` has built-in exponential backoff (up to 6 retries, max 60s wait)

### Catalog Name Mismatch
After refreshing the catalog, verify starter plan exercise names still exist:
```bash
# Quick check: are all starter plan names in the new catalog?
node -e "const c=require('./public/catalog.json'); const names=new Set(c.map(e=>e.name.toLowerCase())); const plans=['lever chest press','reverse grip machine lat pulldown','lever leg extension','lever lying leg curl','lever seated row','smith squat','lever shoulder press','cable pushdown','cable hammer curl (with rope)','lever incline chest press','lever front pulldown','smith leg press','lever standing calf raise','lever seated crunch','lever lateral raise','lever bicep curl','lever triceps extension','lever seated reverse fly','cable curl','lever kneeling leg curl','lever seated hip abduction','lever seated calf raise','lever back extension','lever seated hip abduction']; plans.filter(n=>!names.has(n)).forEach(n=>console.log('MISSING:',n))"
```
