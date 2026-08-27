import { weekdayIndex } from "../store/useStore";

// ---------------------------------------------------------------------------
// Muscle-group → catalog bodyPart mapping
// Each key is a user-facing muscle group; values are bodyPart strings as they
// appear in the ExerciseDB catalog (see public/catalog.json).
// ---------------------------------------------------------------------------
const MUSCLE_BODY_PARTS = {
  chest: ["chest"],
  back: ["back"],
  shoulders: ["shoulders"],
  arms: ["upper arms", "lower arms"],
  legs: ["upper legs", "lower legs"],
  core: ["waist"],
};

// All muscle group labels in a stable order for display
export const MUSCLE_GROUPS = Object.keys(MUSCLE_BODY_PARTS);

// Recovery thresholds (milliseconds)
const MS_PER_HOUR = 1000 * 60 * 60;
const READY_MS = 48 * MS_PER_HOUR;   // 48+ hours → fully recovered
const RECENT_MS = 24 * MS_PER_HOUR;  // 24–48 hours → still recovering

// ---------------------------------------------------------------------------
// buildBodyPartIndex
// Builds a Map from bodyPart → Set<exerciseId> using the catalog array.
// This lets us quickly check which muscle group an exercise belongs to.
// ---------------------------------------------------------------------------
function buildBodyPartIndex(catalog) {
  const map = {};
  for (const bp of Object.values(MUSCLE_BODY_PARTS).flat()) {
    map[bp] = new Set();
  }
  for (const ex of catalog) {
    for (const bp of ex.bodyParts ?? []) {
      if (map[bp]) map[bp].add(ex.exerciseId);
    }
  }
  return map;
}

// ---------------------------------------------------------------------------
// getLastTrainingByMuscle
// Scans the last 7 days of logs and returns, for each muscle group, the
// most recent timestamp when any exercise targeting that group was performed.
// ---------------------------------------------------------------------------
function getLastTrainingByMuscle(logs, catalog) {
  const bpIndex = buildBodyPartIndex(catalog);
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * MS_PER_HOUR;

  // Collect all log entries from the last 7 days, sorted newest-first
  const recentLogs = Object.values(logs)
    .filter((l) => l.startedAt >= sevenDaysAgo)
    .sort((a, b) => b.startedAt - a.startedAt);

  // For each muscle group, find the most recent training timestamp
  const result = {};
  for (const muscle of MUSCLE_GROUPS) {
    result[muscle] = null; // null = never trained in the window
  }

  for (const log of recentLogs) {
    for (const entry of log.entries ?? []) {
      // Look up this exercise in the catalog to get its bodyParts
      const exercise = catalog.find((x) => x.exerciseId === entry.exerciseId);
      if (!exercise) continue;

      for (const muscle of MUSCLE_GROUPS) {
        // Skip if we already found a newer training for this muscle
        if (result[muscle] !== null) continue;

        // Check if this exercise targets this muscle group
        const targetBps = MUSCLE_BODY_PARTS[muscle];
        const matches = exercise.bodyParts.some((bp) => targetBps.includes(bp));
        if (matches) {
          result[muscle] = log.startedAt;
        }
      }
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// classifyRecovery
// Given a timestamp (or null) of last training, returns a recovery status:
//   "ready"      → 48+ hours since last training (or never trained)
//   "recent"     → 24–48 hours (still recovering)
//   "needs_rest" → <24 hours (muscle needs rest)
// ---------------------------------------------------------------------------
function classifyRecovery(lastTrained) {
  if (lastTrained === null) return "ready";
  const elapsed = Date.now() - lastTrained;
  if (elapsed >= READY_MS) return "ready";
  if (elapsed >= RECENT_MS) return "recent";
  return "needs_rest";
}

// ---------------------------------------------------------------------------
// getRecoveryStatus
// Returns a map of muscle group → { lastTrained, daysSince, ready, status }
// ---------------------------------------------------------------------------
function getRecoveryStatus(logs, catalog) {
  const lastTraining = getLastTrainingByMuscle(logs, catalog);
  const now = Date.now();
  const status = {};

  for (const muscle of MUSCLE_GROUPS) {
    const lt = lastTraining[muscle];
    const daysSince = lt !== null ? Math.floor((now - lt) / (24 * MS_PER_HOUR)) : null;
    const recoveryStatus = classifyRecovery(lt);
    status[muscle] = {
      lastTrained: lt,
      daysSince,
      ready: recoveryStatus === "ready",
      status: recoveryStatus, // "ready" | "recent" | "needs_rest"
    };
  }

  return status;
}

// ---------------------------------------------------------------------------
// getMuscleReadiness
// Returns an array of muscle readiness objects sorted by recovery status
// (needs_rest first → recent → ready) for display in the UI.
// ---------------------------------------------------------------------------
function getMuscleReadiness(recoveryStatus) {
  const order = { needs_rest: 0, recent: 1, ready: 2 };

  return MUSCLE_GROUPS.map((muscle) => {
    const info = recoveryStatus[muscle];
    const label =
      info.status === "ready" ? "ready" :
      info.status === "recent" ? "recent" :
      "needsRest";

    return {
      muscle,
      ready: info.ready,
      daysSince: info.daysSince,
      status: info.status,
      label,
    };
  }).sort((a, b) => order[a.status] - order[b.status]);
}

// ---------------------------------------------------------------------------
// findScheduledDay
// Returns the planDay that matches today's weekday, or null.
// ---------------------------------------------------------------------------
function findScheduledDay(planDays) {
  const today = weekdayIndex();
  return planDays.find((d) => d.weekday === today) ?? null;
}

// ---------------------------------------------------------------------------
// getLastTrainingTimestamp
// Returns the most recent startedAt across all logs, or null if no logs.
// ---------------------------------------------------------------------------
function getLastTrainingTimestamp(logs) {
  let latest = null;
  for (const log of Object.values(logs)) {
    if (log.startedAt > (latest ?? 0)) latest = log.startedAt;
  }
  return latest;
}

// ---------------------------------------------------------------------------
// findMostRecoveredDay
// For each planDay, compute how many of its exercises target muscles that are
// ready (48+ hours). Return the day with the highest readiness score.
// ---------------------------------------------------------------------------
function findMostRecoveredDay(planDays, recoveryStatus, catalog) {
  if (planDays.length === 0) return null;

  let bestDay = null;
  let bestScore = -1;

  for (const day of planDays) {
    let readyCount = 0;
    let totalMuscles = 0;
    const seenMuscles = new Set();

    for (const exRow of day.exercises ?? []) {
      const exercise = catalog.find((x) => x.exerciseId === exRow.exerciseId);
      if (!exercise) continue;

      for (const muscle of MUSCLE_GROUPS) {
        if (seenMuscles.has(muscle)) continue;
        const targetBps = MUSCLE_BODY_PARTS[muscle];
        const matches = exercise.bodyParts.some((bp) => targetBps.includes(bp));
        if (matches) {
          seenMuscles.add(muscle);
          totalMuscles++;
          if (recoveryStatus[muscle]?.ready) readyCount++;
        }
      }
    }

    const score = totalMuscles > 0 ? readyCount / totalMuscles : 0;
    if (score > bestScore) {
      bestScore = score;
      bestDay = day;
    }
  }

  return bestDay;
}

// ---------------------------------------------------------------------------
// findMostOverdueMuscleDay
// If the user hasn't trained in 2+ days, find which planDay trains the most
// overdue muscles (muscles not trained in the longest time).
// ---------------------------------------------------------------------------
function findMostOverdueMuscleDay(planDays, recoveryStatus, catalog) {
  if (planDays.length === 0) return null;

  let bestDay = null;
  let bestScore = -1;

  for (const day of planDays) {
    let overdueScore = 0;
    const seenMuscles = new Set();

    for (const exRow of day.exercises ?? []) {
      const exercise = catalog.find((x) => x.exerciseId === exRow.exerciseId);
      if (!exercise) continue;

      for (const muscle of MUSCLE_GROUPS) {
        if (seenMuscles.has(muscle)) continue;
        const targetBps = MUSCLE_BODY_PARTS[muscle];
        const matches = exercise.bodyParts.some((bp) => targetBps.includes(bp));
        if (matches) {
          seenMuscles.add(muscle);
          // More days since last trained = higher priority
          overdueScore += recoveryStatus[muscle]?.daysSince ?? 7;
        }
      }
    }

    if (overdueScore > bestScore) {
      bestScore = overdueScore;
      bestDay = day;
    }
  }

  return bestDay;
}

// ---------------------------------------------------------------------------
// getTodayRecommendation — main export
//
// Pure function: takes store state, returns recommendation object.
// No side effects, no store access.
//
// Parameters:
//   planDays — array of day objects from the store
//   logs     — object of { "YYYY-MM-DD": logEntry } from the store
//   profile  — user profile object from the store
//   catalog  — full exercise catalog array (needed for bodyPart lookup)
//
// Returns:
//   {
//     recommendedDay: dayObject | null,
//     reason: string,           // i18n key
//     reasonParams: {},         // params for the i18n key
//     recoveryStatus: { ... },  // muscle group → recovery info
//     muscleReadiness: [ ... ]  // sorted array for display
//   }
// ---------------------------------------------------------------------------
export function getTodayRecommendation(planDays, logs, profile, catalog) {
  // 1. Compute muscle recovery status
  const recoveryStatus = getRecoveryStatus(logs, catalog);
  const muscleReadiness = getMuscleReadiness(recoveryStatus);

  // 2. Check for in-progress session
  // (activeSession is passed separately since it's transient state)
  // The caller should check this before calling, but we handle it here too
  // by accepting it as an optional 5th param — NOT stored in the return.
  // NOTE: activeSession is checked by the component, not here.

  // 3. If today is a scheduled training day, recommend it
  const scheduledDay = findScheduledDay(planDays);
  if (scheduledDay) {
    return {
      recommendedDay: scheduledDay,
      reason: "rec.scheduled",
      reasonParams: { day: scheduledDay.name },
      recoveryStatus,
      muscleReadiness,
    };
  }

  // 4. If user hasn't trained in 2+ days, suggest the most overdue muscle group
  const lastTraining = getLastTrainingTimestamp(logs);
  const hoursSinceLastTraining = lastTraining
    ? (Date.now() - lastTraining) / MS_PER_HOUR
    : Infinity;

  if (hoursSinceLastTraining >= 48) {
    const overdueDay = findMostOverdueMuscleDay(planDays, recoveryStatus, catalog);
    if (overdueDay) {
      return {
        recommendedDay: overdueDay,
        reason: "rec.overdue",
        reasonParams: { day: overdueDay.name },
        recoveryStatus,
        muscleReadiness,
      };
    }
  }

  // 5. If user trained yesterday (within 24 hours), suggest rest
  if (hoursSinceLastTraining < 24) {
    const restMuscles = muscleReadiness
      .filter((m) => m.status === "needs_rest")
      .map((m) => m.muscle);

    return {
      recommendedDay: null,
      reason: "rec.rest",
      reasonParams: { muscles: restMuscles },
      recoveryStatus,
      muscleReadiness,
    };
  }

  // 6. Otherwise suggest the day with the most recovered muscles
  const bestDay = findMostRecoveredDay(planDays, recoveryStatus, catalog);
  if (bestDay) {
    return {
      recommendedDay: bestDay,
      reason: "rec.scheduled",
      reasonParams: { day: bestDay.name },
      recoveryStatus,
      muscleReadiness,
    };
  }

  // 7. Fallback: no plan days at all
  return {
    recommendedDay: null,
    reason: "rec.rest",
    reasonParams: {},
    recoveryStatus,
    muscleReadiness,
  };
}
