import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STARTER_PLANS } from "../data/starterPlans";
import { getById } from "../api/exerciseDb";
import { translate } from "../i18n/translations";

const DATA_VERSION = 2;

export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// JS Sunday=0 … Saturday=6  ->  Monday=0 … Sunday=6
export const weekdayIndex = (date = new Date()) => (date.getDay() + 6) % 7;

const WEEKDAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const weekdayName = (i) => WEEKDAY_NAMES[i] ?? "";

function findLastLoggedWeight(logs, exerciseId) {
  let best = null;
  let bestTime = -1;
  for (const [date, entry] of Object.entries(logs)) {
    for (const ex of entry.entries ?? []) {
      if (ex.exerciseId !== exerciseId) continue;
      for (const s of ex.sets ?? []) {
        if ((s.weight ?? 0) > 0 && entry.startedAt > bestTime) {
          bestTime = entry.startedAt;
          best = s.weight;
        }
      }
    }
  }
  return best;
}

function migrateData(state) {
  const s = { ...state };
  if (s.dataVersion == null || s.dataVersion < DATA_VERSION) {
    s.dataVersion = DATA_VERSION;
  }
  return s;
}

export const useStore = create(
  persist(
    (set, get) => ({
      // ---------- persisted ----------
      profile: { name: "", goal: "", daysPerWeek: 3, onboarded: false, lang: "en", displayMode: "gif" },
      planDays: [],
      logs: {},
      activeSession: null,
      favorites: { exercises: [], equipment: [], presets: [] },
      familiarity: {},
      notes: {},
      personalRecords: {},
      dataVersion: DATA_VERSION,

      // ---------- transient ----------
      page: "dashboard",
      setPage: (page) => set({ page }),

      catalogStatus: "idle", // idle | loading | ready | error
      catalogProgress: { loaded: 0, total: 1500 },
      catalog: [],
      guideFilterEquipment: null,
      setCatalogStatus: (catalogStatus) => set({ catalogStatus }),
      setCatalog: (catalog) => set({ catalog }),

      // ---------- onboarding ----------
      completeOnboarding: ({ name, goal, templateKey }) => {
        const lang = get().profile.lang || "en";
        const template = STARTER_PLANS.find((p) => p.key === templateKey);
        const planDays =
          template?.days.map((d) => ({
            id: uid(),
            name: translate(lang, d.nameKey),
            weekday: d.weekday,
            focus: translate(lang, d.focusKey),
            exercises: d.exercises
              .map((e) => {
                const match = get().catalog.find(
                  (x) => x.name.toLowerCase() === e.name.toLowerCase()
                );
                if (!match) return null;
                return {
                  id: uid(),
                  exerciseId: match.exerciseId,
                  sets: e.sets,
                  reps: e.reps,
                  restSec: e.restSec,
                };
              })
              .filter(Boolean),
          })) ?? [];

        set({
          profile: {
            ...get().profile,
            name: name || "",
            goal,
            daysPerWeek: template?.daysPerWeek ?? 3,
            onboarded: true,
          },
          planDays,
          page: "dashboard",
        });
      },

      setLang: (lang) =>
        set({ profile: { ...get().profile, lang } }),

      setDisplayMode: (displayMode) =>
        set({ profile: { ...get().profile, displayMode } }),

      resetApp: () =>
        set({
          profile: { name: "", goal: "", daysPerWeek: 3, onboarded: false, lang: get().profile.lang || "en" },
          planDays: [],
          logs: {},
          activeSession: null,
          favorites: { exercises: [], equipment: [], presets: [] },
          familiarity: {},
          notes: {},
          personalRecords: {},
          dataVersion: DATA_VERSION,
          page: "onboarding",
        }),

      // ---------- planner ----------
      updateDay: (dayId, patch) =>
        set({
          planDays: get().planDays.map((d) => (d.id === dayId ? { ...d, ...patch } : d)),
        }),
      addDay: () =>
        set({
          planDays: [
            ...get().planDays,
            { id: uid(), name: `Workout ${get().planDays.length + 1}`, weekday: Math.min(get().planDays.length, 6), focus: "", exercises: [] },
          ],
        }),
      removeDay: (dayId) =>
        set({ planDays: get().planDays.filter((d) => d.id !== dayId) }),

      addExerciseToDay: (dayId, exerciseId, preset = {}) =>
        set({
          planDays: get().planDays.map((d) =>
            d.id === dayId
              ? {
                  ...d,
                  exercises: [
                    ...d.exercises,
                    { id: uid(), exerciseId, sets: preset.sets ?? 3, reps: preset.reps ?? "10-12", restSec: preset.restSec ?? 90 },
                  ],
                }
              : d
          ),
        }),
      updateExerciseInDay: (dayId, exRowId, patch) =>
        set({
          planDays: get().planDays.map((d) =>
            d.id === dayId
              ? { ...d, exercises: d.exercises.map((e) => (e.id === exRowId ? { ...e, ...patch } : e)) }
              : d
          ),
        }),
      removeExerciseFromDay: (dayId, exRowId) =>
        set({
          planDays: get().planDays.map((d) =>
            d.id === dayId ? { ...d, exercises: d.exercises.filter((e) => e.id !== exRowId) } : d
          ),
        }),
      moveExerciseInDay: (dayId, exRowId, dir) => {
        const days = get().planDays.map((d) => {
          if (d.id !== dayId) return d;
          const i = d.exercises.findIndex((e) => e.id === exRowId);
          const j = i + dir;
          if (i < 0 || j < 0 || j >= d.exercises.length) return d;
          const arr = [...d.exercises];
          [arr[i], arr[j]] = [arr[j], arr[i]];
          return { ...d, exercises: arr };
        });
        set({ planDays: days });
      },

      replaceExerciseInDay: (dayId, rowId, newExerciseId) =>
        set({
          planDays: get().planDays.map((d) =>
            d.id === dayId
              ? {
                  ...d,
                  exercises: d.exercises.map((e) =>
                    e.id === rowId ? { ...e, exerciseId: newExerciseId } : e
                  ),
                }
              : d
          ),
        }),

      // ---------- session ----------
      startSession: (dayId) => {
        const day = get().planDays.find((d) => d.id === dayId);
        if (!day) return;
        const logs = get().logs;
        set({
          activeSession: {
            dayId: day.id,
            dayName: day.name,
            startedAt: Date.now(),
            entries: day.exercises.map((e) => ({
              rowId: e.id,
              exerciseId: e.exerciseId,
              targetSets: e.sets,
              targetReps: e.reps,
              restSec: e.restSec,
              sets: Array.from({ length: e.sets }, () => ({
                weight: findLastLoggedWeight(logs, e.exerciseId) ?? "",
                reps: "",
                done: false,
              })),
            })),
          },
          page: "session",
        });
      },

      logSet: (entryIdx, setIdx, patch) =>
        set({
          activeSession: get().activeSession
            ? {
                ...get().activeSession,
                entries: get().activeSession.entries.map((en, i) =>
                  i !== entryIdx
                    ? en
                    : { ...en, sets: en.sets.map((s, j) => (j !== setIdx ? s : { ...s, ...patch })) }
                ),
              }
            : null,
        }),

      finishSession: () => {
        const s = get().activeSession;
        if (!s) return null;
        const entries = s.entries.map((en) => ({
          exerciseId: en.exerciseId,
          sets: en.sets.filter((x) => x.done),
        }));
        const volume = entries.reduce(
          (acc, en) => acc + en.sets.reduce((a, x) => a + (Number(x.weight) || 0) * (Number(x.reps) || 0), 0),
          0
        );
        const totalSets = entries.reduce((a, en) => a + en.sets.length, 0);
        const log = {
          dayId: s.dayId,
          dayName: s.dayName,
          startedAt: s.startedAt,
          endedAt: Date.now(),
          durationMin: Math.max(1, Math.round((Date.now() - s.startedAt) / 60000)),
          volume,
          totalSets,
          entries,
        };

        const newPersonalRecords = { ...get().personalRecords };
        for (const en of s.entries) {
          for (const set of en.sets) {
            if (!set.done) continue;
            const w = Number(set.weight) || 0;
            const r = Number(set.reps) || 0;
            const vol = w * r;
            const prev = newPersonalRecords[en.exerciseId];
            if (!prev || w > prev.maxWeight || vol > prev.maxVolume) {
              newPersonalRecords[en.exerciseId] = {
                maxWeight: Math.max(w, prev?.maxWeight ?? 0),
                maxReps: Math.max(r, prev?.maxReps ?? 0),
                maxVolume: Math.max(vol, prev?.maxVolume ?? 0),
                lastUpdated: todayISO(),
              };
            }
          }
        }

        set({
          logs: { ...get().logs, [todayISO()]: log },
          activeSession: null,
          personalRecords: newPersonalRecords,
          page: "dashboard",
        });
        return log;
      },

      discardSession: () => set({ activeSession: null }),

      // ---------- favorites ----------
      toggleFavorite: (type, id) =>
        set({
          favorites: {
            ...get().favorites,
            [type]: get().favorites[type].includes(id)
              ? get().favorites[type].filter((x) => x !== id)
              : [...get().favorites[type], id],
          },
        }),
      isFavorite: (type, id) => get().favorites[type]?.includes(id) ?? false,

      // ---------- familiarity ----------
      setFamiliarity: (exerciseId, level) =>
        set({ familiarity: { ...get().familiarity, [exerciseId]: level } }),

      // ---------- notes ----------
      setNote: (key, text) =>
        set({
          notes: text
            ? { ...get().notes, [key]: text }
            : Object.fromEntries(Object.entries(get().notes).filter(([k]) => k !== key)),
        }),
      getNote: (key) => get().notes[key] ?? "",

      // ---------- personal records ----------
      updatePersonalRecords: (exerciseId, weight, reps) => {
        const w = Number(weight) || 0;
        const r = Number(reps) || 0;
        const vol = w * r;
        const prev = get().personalRecords[exerciseId];
        if (!prev || w > prev.maxWeight || vol > prev.maxVolume) {
          set({
            personalRecords: {
              ...get().personalRecords,
              [exerciseId]: {
                maxWeight: Math.max(w, prev?.maxWeight ?? 0),
                maxReps: Math.max(r, prev?.maxReps ?? 0),
                maxVolume: Math.max(vol, prev?.maxVolume ?? 0),
                lastUpdated: todayISO(),
              },
            },
          });
        }
      },

      // ---------- export / import ----------
      exportData: () => {
        const s = get();
        return JSON.stringify({
          profile: s.profile,
          planDays: s.planDays,
          logs: s.logs,
          favorites: s.favorites,
          familiarity: s.familiarity,
          notes: s.notes,
          personalRecords: s.personalRecords,
          dataVersion: s.dataVersion,
        });
      },
      importData: (jsonString) => {
        try {
          const data = JSON.parse(jsonString);
          if (!data || typeof data !== "object") return { success: false, error: "Invalid data" };
          const patch = {};
          if (data.profile) patch.profile = { ...get().profile, ...data.profile };
          if (Array.isArray(data.planDays)) patch.planDays = data.planDays;
          if (data.logs && typeof data.logs === "object") patch.logs = data.logs;
          if (data.favorites) patch.favorites = data.favorites;
          if (data.familiarity) patch.familiarity = data.familiarity;
          if (data.notes) patch.notes = data.notes;
          if (data.personalRecords) patch.personalRecords = data.personalRecords;
          patch.dataVersion = DATA_VERSION;
          set(patch);
          return { success: true };
        } catch (e) {
          return { success: false, error: e.message };
        }
      },
    }),
    {
      name: "forge-store",
      partialize: (s) => ({
        profile: s.profile,
        planDays: s.planDays,
        logs: s.logs,
        activeSession: s.activeSession,
        favorites: s.favorites,
        familiarity: s.familiarity,
        notes: s.notes,
        personalRecords: s.personalRecords,
        dataVersion: s.dataVersion,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const migrated = migrateData(state);
          if (migrated.dataVersion !== state.dataVersion) {
            state.dataVersion = migrated.dataVersion;
          }
        }
      },
    }
  )
);

// ---------- derived helpers ----------
export function sessionsThisWeek(logs) {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  return Object.values(logs).filter((l) => l.startedAt >= monday.getTime());
}

export function computeStreak(logs, daysPerWeek) {
  // consecutive weeks (ending this one) where weekly goal was met
  let streak = 0;
  const cursor = new Date();
  cursor.setDate(cursor.getDate() - ((cursor.getDay() + 6) % 7)); // this Monday
  cursor.setHours(0, 0, 0, 0);
  for (;;) {
    const weekStart = cursor.getTime();
    const weekEnd = weekStart + 1000 * 60 * 60 * 24 * 7;
    const count = Object.values(logs).filter(
      (l) => l.startedAt >= weekStart && l.startedAt < weekEnd
    ).length;
    if (count >= daysPerWeek) {
      streak++;
      cursor.setDate(cursor.getDate() - 7);
    } else break;
  }
  return streak;
}

export function totalVolume(logs) {
  return Object.values(logs).reduce((a, l) => a + (l.volume ?? 0), 0);
}
