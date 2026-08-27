// Curated beginner routines. Exercise names must match the ExerciseDB catalog
// exactly; they are resolved to exercise IDs at runtime against the cached
// catalog. Day names / focus lines reference i18n keys and are localized when
// the plan is created (see store.completeOnboarding).
// Machine-first choices: guided, safe, and easy to set up for a beginner.

const T = {
  chest: { sets: 3, reps: "10-12", restSec: 90 },
  back: { sets: 3, reps: "10-12", restSec: 90 },
  legs: { sets: 3, reps: "10-12", restSec: 90 },
  arms: { sets: 2, reps: "12-15", restSec: 60 },
  core: { sets: 3, reps: "12-15", restSec: 60 },
};

export const FULL_BODY_3 = {
  key: "fullbody3",
  nameKey: "plan.fb3.name",
  descKey: "plan.fb3.desc",
  daysPerWeek: 3,
  days: [
    {
      nameKey: "day.fullbody.a",
      weekday: 0,
      focusKey: "focus.chestBackLegs",
      exercises: [
        { name: "lever chest press", ...T.chest },
        { name: "reverse grip machine lat pulldown", ...T.back },
        { name: "lever leg extension", ...T.legs },
        { name: "lever lying leg curl", ...T.legs },
      ],
    },
    {
      nameKey: "day.fullbody.b",
      weekday: 2,
      focusKey: "focus.backShouldersArms",
      exercises: [
        { name: "lever seated row", ...T.back },
        { name: "smith squat", ...T.legs },
        { name: "lever shoulder press", ...T.chest },
        { name: "cable pushdown", ...T.arms },
        { name: "cable hammer curl (with rope)", ...T.arms },
      ],
    },
    {
      nameKey: "day.fullbody.c",
      weekday: 4,
      focusKey: "focus.chestLegsCore",
      exercises: [
        { name: "lever incline chest press", ...T.chest },
        { name: "lever front pulldown", ...T.back },
        { name: "smith leg press", ...T.legs },
        { name: "lever standing calf raise", ...T.legs },
        { name: "lever seated crunch", ...T.core },
      ],
    },
  ],
};

export const UPPER_LOWER_4 = {
  key: "upperlower4",
  nameKey: "plan.ul4.name",
  descKey: "plan.ul4.desc",
  daysPerWeek: 4,
  days: [
    {
      nameKey: "day.upper.a",
      weekday: 0,
      focusKey: "focus.upperA",
      exercises: [
        { name: "lever chest press", ...T.chest },
        { name: "lever seated row", ...T.back },
        { name: "lever lateral raise", ...T.arms },
        { name: "lever bicep curl", ...T.arms },
        { name: "lever triceps extension", ...T.arms },
      ],
    },
    {
      nameKey: "day.lower.a",
      weekday: 1,
      focusKey: "focus.lowerA",
      exercises: [
        { name: "smith squat", ...T.legs },
        { name: "lever leg extension", ...T.legs },
        { name: "lever lying leg curl", ...T.legs },
        { name: "lever standing calf raise", ...T.legs },
        { name: "lever seated crunch", ...T.core },
      ],
    },
    {
      nameKey: "day.upper.b",
      weekday: 3,
      focusKey: "focus.upperB",
      exercises: [
        { name: "lever incline chest press", ...T.chest },
        { name: "lever front pulldown", ...T.back },
        { name: "lever seated reverse fly", ...T.arms },
        { name: "cable curl", ...T.arms },
        { name: "cable pushdown", ...T.arms },
      ],
    },
    {
      nameKey: "day.lower.b",
      weekday: 4,
      focusKey: "focus.lowerB",
      exercises: [
        { name: "smith leg press", ...T.legs },
        { name: "lever kneeling leg curl", ...T.legs },
        { name: "lever seated hip abduction", ...T.legs },
        { name: "lever seated calf raise", ...T.legs },
        { name: "lever back extension", ...T.core },
      ],
    },
  ],
};

export const STARTER_PLANS = [FULL_BODY_3, UPPER_LOWER_4];
