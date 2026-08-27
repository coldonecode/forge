// Curated exercise presets — 5-6 per muscle group.
// Names MUST match the ExerciseDB catalog exactly (lowercase).
// Resolved to exercise IDs at runtime against the cached catalog.

export const MUSCLE_GROUPS = [
  { key: "chest",       icon: "🫁", color: "ember" },
  { key: "back",        icon: "🔙", color: "ice" },
  { key: "shoulders",   icon: "🏔️", color: "lilac" },
  { key: "biceps",      icon: "💪", color: "volt" },
  { key: "triceps",     icon: "🦾", color: "ice" },
  { key: "quadriceps",  icon: "🦵", color: "ember" },
  { key: "hamstrings",  icon: "🦵", color: "lilac" },
  { key: "glutes",      icon: "🍑", color: "volt" },
  { key: "calves",      icon: "🦶", color: "ice" },
  { key: "abs",         icon: "🎯", color: "lilac" },
];

export const PRESETS = {
  chest: [
    { name: "lever chest press",             sets: 3, reps: "10-12", restSec: 90 },
    { name: "lever incline chest press",     sets: 3, reps: "10-12", restSec: 90 },
    { name: "cable standing fly",            sets: 3, reps: "12-15", restSec: 60 },
    { name: "lever seated fly",              sets: 3, reps: "12-15", restSec: 60 },
    { name: "dumbbell bench press",          sets: 3, reps: "10-12", restSec: 90 },
    { name: "push-up",                       sets: 3, reps: "8-15",  restSec: 60 },
  ],
  back: [
    { name: "lever seated row",              sets: 3, reps: "10-12", restSec: 90 },
    { name: "reverse grip machine lat pulldown", sets: 3, reps: "10-12", restSec: 90 },
    { name: "lever front pulldown",          sets: 3, reps: "10-12", restSec: 90 },
    { name: "cable seated row",              sets: 3, reps: "10-12", restSec: 90 },
    { name: "dumbbell single arm row",       sets: 3, reps: "10-12", restSec: 90 },
  ],
  shoulders: [
    { name: "lever shoulder press",          sets: 3, reps: "10-12", restSec: 90 },
    { name: "lever lateral raise",           sets: 3, reps: "12-15", restSec: 60 },
    { name: "lever seated reverse fly",      sets: 3, reps: "12-15", restSec: 60 },
    { name: "cable front raise",             sets: 3, reps: "12-15", restSec: 60 },
    { name: "dumbbell lateral raise",        sets: 3, reps: "12-15", restSec: 60 },
  ],
  biceps: [
    { name: "lever bicep curl",              sets: 3, reps: "12-15", restSec: 60 },
    { name: "cable hammer curl (with rope)",  sets: 3, reps: "12-15", restSec: 60 },
    { name: "cable curl",                    sets: 3, reps: "12-15", restSec: 60 },
    { name: "dumbbell bicep curl",           sets: 3, reps: "12-15", restSec: 60 },
  ],
  triceps: [
    { name: "lever triceps extension",       sets: 3, reps: "12-15", restSec: 60 },
    { name: "cable pushdown",                sets: 3, reps: "12-15", restSec: 60 },
    { name: "dumbbell triceps extension",    sets: 3, reps: "12-15", restSec: 60 },
    { name: "cable overhead triceps extension", sets: 3, reps: "12-15", restSec: 60 },
  ],
  quadriceps: [
    { name: "smith squat",                   sets: 3, reps: "10-12", restSec: 120 },
    { name: "lever leg extension",           sets: 3, reps: "10-12", restSec: 90 },
    { name: "smith leg press",               sets: 3, reps: "10-12", restSec: 120 },
    { name: "lever front squat",             sets: 3, reps: "10-12", restSec: 90 },
  ],
  hamstrings: [
    { name: "lever lying leg curl",          sets: 3, reps: "10-12", restSec: 90 },
    { name: "lever kneeling leg curl",       sets: 3, reps: "10-12", restSec: 90 },
    { name: "lever seated leg curl",         sets: 3, reps: "10-12", restSec: 90 },
  ],
  glutes: [
    { name: "lever seated hip abduction",    sets: 3, reps: "12-15", restSec: 60 },
    { name: "lever hip extension",           sets: 3, reps: "12-15", restSec: 60 },
    { name: "cable pull through",            sets: 3, reps: "12-15", restSec: 60 },
    { name: "smith squat",                   sets: 3, reps: "10-12", restSec: 120 },
  ],
  calves: [
    { name: "lever standing calf raise",     sets: 3, reps: "12-15", restSec: 60 },
    { name: "lever seated calf raise",       sets: 3, reps: "12-15", restSec: 60 },
    { name: "leg press calf raise",          sets: 3, reps: "15-20", restSec: 45 },
  ],
  abs: [
    { name: "lever seated crunch",           sets: 3, reps: "12-15", restSec: 60 },
    { name: "lever back extension",          sets: 3, reps: "12-15", restSec: 60 },
    { name: "plank",                         sets: 3, reps: "30-60s", restSec: 45 },
    { name: "cable Crunch",                  sets: 3, reps: "12-15", restSec: 60 },
  ],
};
