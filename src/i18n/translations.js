// Complete UI dictionary. Persian copy is written naturally, not literally.

export const LANGUAGES = {
  en: { name: "English", short: "EN", dir: "ltr" },
  fa: { name: "فارسی", short: "فا", dir: "rtl" },
};

export const translations = {
  en: {
    "app.title": "Forge — Gym Workout Planner",
    "app.tagline": "Your beginner-friendly gym companion",

    // Nav
    "nav.today": "Today",
    "nav.plan": "My Plan",
    "nav.library": "Exercises",
    "nav.guide": "Machines 101",
    "nav.history": "History",
    "nav.settings": "Settings",

    // Catalog gate
    "gate.loading1": "Preparing your exercise database —",
    "gate.loading2": "one-time download, then it's instant forever.",
    "gate.err1": "Couldn't reach the exercise database.",
    "gate.err2": "Check your internet connection and retry.",
    "gate.retry": "Retry",
    "gate.exercises": "exercises",

    // Sidebar
    "side.tip1": "New here? Check ",
    "side.tip2": " before your first workout.",
    "side.guideLink": "Machines 101",
    "side.credit": "Exercise data & GIFs by",

    // Onboarding
    "onb.step.welcome": "Welcome",
    "onb.step.goal": "Your goal",
    "onb.step.week": "Your week",
    "onb.h1a": "Never touched a gym machine?",
    "onb.h1b": "Perfect.",
    "onb.b1": "A ready-made plan for 3–4 gym days a week",
    "onb.b2": "Every exercise shown as an animated demo GIF",
    "onb.b3": "Plain-English guides to every machine",
    "onb.cta0": "Let's set you up",
    "onb.goalTitle": "What's your main goal?",
    "onb.namePh": "Your first name (optional)",
    "onb.goal.muscle": "Build muscle",
    "onb.goal.muscle.d": "Gain size & tone up",
    "onb.goal.fat": "Lose fat",
    "onb.goal.fat.d": "Burn & lean out",
    "onb.goal.strong": "Get stronger",
    "onb.goal.strong.d": "Lift heavier over time",
    "onb.goal.fit": "General fitness",
    "onb.goal.fit.d": "Feel healthy & energetic",
    "onb.continue": "Continue",
    "onb.daysTitle": "How many days a week{name}?",
    "onb.daysSub": "Pick what fits your schedule — both plans are beginner-perfect.",
    "onb.perWeek": "{n}× / week",
    "onb.create": "Create my plan",
    "onb.creating": "Loading exercises…",

    // Plans
    "plan.fb3.name": "Full Body Foundation",
    "plan.fb3.desc": "The classic beginner split. Every session trains the whole body with safe, guided machines — maximum results with minimum confusion.",
    "plan.ul4.name": "Upper / Lower Split",
    "plan.ul4.desc": "Four focused sessions alternating upper body and lower body — a touch more volume, still built around beginner-safe machines.",

    // Focus tags
    "focus.chestBackLegs": "Chest · Back · Legs",
    "focus.backShouldersArms": "Back · Shoulders · Arms",
    "focus.chestLegsCore": "Chest · Legs · Core",
    "focus.upperA": "Chest · Back · Arms",
    "focus.lowerA": "Quads · Hamstrings",
    "focus.upperB": "Chest · Back · Delts",
    "focus.lowerB": "Glutes · Calves · Core",

    // Day names
    "day.fullbody.a": "Full Body A",
    "day.fullbody.b": "Full Body B",
    "day.fullbody.c": "Full Body C",
    "day.upper.a": "Upper Body A",
    "day.lower.a": "Lower Body A",
    "day.upper.b": "Upper Body B",
    "day.lower.b": "Lower Body B",

    // Dashboard
    "dash.greet.morning": "Good morning",
    "dash.greet.afternoon": "Good afternoon",
    "dash.greet.evening": "Good evening",
    "dash.editPlan": "Edit plan",
    "dash.thisWeek": "this week",
    "dash.todaysWorkout": "Today's workout",
    "dash.startWorkout": "Start workout",
    "dash.resume1": "Workout in progress — resume?",
    "dash.restTitle": "Rest day — recovery is training too",
    "dash.nextUp": "Next up:",
    "dash.restOn": "on",
    "dash.noPlanYet": "No workouts planned yet — build your plan first.",
    "dash.preview": "Preview",
    "dash.stat.streak": "Week streak",
    "dash.stat.workouts": "Total workouts",
    "dash.stat.volume": "Volume lifted (kg)",
    "dash.promoTitle": "Not sure what those machines do?",
    "dash.promoBody": "Machines 101 explains every station in plain English — with demo videos.",

    // Planner
    "pl.title": "My Plan",
    "pl.sub": "Your weekly routine — tap an exercise to see how it's done.",
    "pl.start": "Start",
    "pl.missing": "Missing exercise data — remove this row.",
    "pl.remove": "Remove",
    "pl.addExercise": "Add exercise",
    "pl.addDay": "Add training day",
    "pl.pickerTitle": "Add exercises",
    "pl.pickerSub": "Tap any card to add it to the selected day",
    "pl.undoExercise": "{name} removed",
    "pl.undoDay": "{name} day removed",

    // Presets
    "pr.title": "Quick-add by muscle",
    "pr.byMuscle": "By muscle",
    "pr.browseAll": "Browse all",

    // Library
    "lib.title": "Exercise Library",
    "lib.sub": "{count} exercises · every card shows the actual movement in action. Tap one for full instructions.",
    "lib.search": "Search exercises or muscles…",
    "lib.allEquipment": "All equipment",
    "lib.all": "All",
    "lib.empty": "No exercises match your filters.",
    "lib.more": "Show more ({n} left)",

    // Exercise modal
    "ex.primary": "Primary muscles",
    "ex.secondary": "Also works",
    "ex.how": "How to do it",
    "ex.addTo": "Add to:",

    // Education panel
    "edu.title": "Coach's notes",
    "edu.setup": "Machine setup",
    "edu.cues": "Form & posture",
    "edu.rom": "Range of motion & breathing",
    "edu.mistakes": "Common mistakes",
    "edu.safety": "Safety first",
    "edu.quickGuide": "Quick form guide",

    // Guide
    "gd.title": "Machines 101",
    "gd.sub": "Every type of equipment in your gym, explained like a friend would — no jargon.",
    "gd.rulesTitle": "Golden rules for your first weeks",
    "gd.r1t": "Start lighter than you think",
    "gd.r1b": 'Leave 2–3 reps "in the tank" every set. Add a little weight only when all sets feel easy.',
    "gd.r2t": "Slow beats fast",
    "gd.r2b": "Lower the weight in 2–3 seconds. Control is what grows muscle and keeps joints happy.",
    "gd.r3t": "Log every workout",
    "gd.r3b": "Your plan app remembers your weights — just try to beat last session by a little.",
    "gd.r4t": "Rest between sets",
    "gd.r4b": "60–90s for small muscles, up to 2 min for big ones (legs, chest, back).",
    "gd.inLibrary": "{n} exercises in library",
    "gd.eg": 'e.g. “{name}”',
    "gd.browseAll": "Browse all of these in the Exercise Library →",
    "gd.etiquette": "Unwritten gym rules 🤝",
    "gd.e1": "Put weights back on the rack when done",
    "gd.e2": "Wipe down machines after use",
    "gd.e3": "Don't hog a machine while resting long — let people work in",
    "gd.e4": "Phone calls away from the floor, headphones for music",
    "gd.e5": "Ask staff — they're happy to show how a machine works",
    "gd.e6": "Nobody is judging you. Everyone started somewhere.",

    // Settings
    "st.title": "Settings",
    "st.sub": "Customize your Forge experience.",
    "st.displayMode": "Exercise display",
    "st.gif": "GIF animations",
    "st.gifDesc": "Animated demos from ExerciseDB",
    "st.svg": "SVG illustrations",
    "st.svgDesc": "Clean vector animations",
    "st.svgNote": "SVG animations are available for starter-plan exercises only. Other exercises will fall back to GIF.",
    "st.language": "Language",
    "st.danger": "Danger zone",
    "st.resetDesc": "Erase all data and start fresh. This cannot be undone.",
    "st.resetConfirm": "This will delete ALL your workouts, logs, and settings. Continue?",
    "st.reset": "Reset everything",

    // Equipment
    "eq.leverage_machine.label": "Pin-Loaded Machines",
    "eq.leverage_machine.blurb": "The most beginner-friendly equipment in the gym. You set the weight by moving a metal pin into a stack of plates, adjust the seat height, and push or pull a padded handle. The weight travels on a fixed track, so it guides you through the movement safely — no spotter needed.",
    "eq.leverage_machine.t1": "Always adjust the seat so the machine's pivot lines up with the joint you're training",
    "eq.leverage_machine.t2": "Move the pin fully into a plate slot before you start",
    "eq.leverage_machine.t3": "Use the pin to pick a weight you can control for all reps",
    "eq.cable.label": "Cable Stations",
    "eq.cable.blurb": "A tall tower with a weight stack and a long cable ending in a handle bar. Cables keep constant tension on the muscle through the whole movement and allow natural paths of motion. Very safe — if you lose grip, the weight just slides back down.",
    "eq.cable.t1": "Clip the handle on securely and pull the pin out slightly to test it's attached",
    "eq.cable.t2": "Stand stable and let the cable pull from where it hangs",
    "eq.cable.t3": "Great for arms, shoulders, and finishing exercises",
    "eq.smith_machine.label": "Smith Machine",
    "eq.smith_machine.blurb": "A barbell fixed inside steel rails so it can only move up and down. Hooks along the rails let you lock the bar at any height by rotating it — making squats and presses much safer for beginners than a free barbell.",
    "eq.smith_machine.t1": "To unrack: rotate the bar forward off the hooks",
    "eq.smith_machine.t2": "To rack: push up, rotate back until hooks catch",
    "eq.smith_machine.t3": "Set the safety stops below your lowest position",
    "eq.dumbbell.label": "Dumbbells",
    "eq.dumbbell.blurb": "Handheld free weights on a rack, usually in pairs. Each arm works independently which builds balanced strength. Start light — there's no track guiding the weight, so control matters more than load.",
    "eq.dumbbell.t1": "Pick weights you can lift with good form for all reps",
    "eq.dumbbell.t2": "Return dumbbells to the rack after use",
    "eq.dumbbell.t3": "Keep wrists straight and movements slow",
    "eq.body_weight.label": "Bodyweight",
    "eq.body_weight.blurb": "Exercises using your own body as resistance — push-ups, planks, crunches. No setup needed, perfect warm-ups, and they teach control before adding external weight.",
    "eq.body_weight.t1": "Slow, controlled reps beat fast sloppy ones",
    "eq.body_weight.t2": "Great between machine sets while resting other muscles",

    // Session
    "ss.discardConfirm": "Discard this workout? Logged sets will be lost.",
    "ss.inProgress": "In progress",
    "ss.setsCount": "{done}/{all} sets",
    "ss.target": "Target:",
    "ss.done": "Done",
    "ss.col.set": "Set",
    "ss.col.weight": "Weight (kg)",
    "ss.col.reps": "Reps",
    "ss.finish": "Finish",
    "ss.finishConfirm": "Some sets aren't checked — finish anyway?",
    "ss.none": "No workout in progress.",
    "ss.backToday": "Back to Today",
    "ss.complete": "Workout complete!",
    "ss.savedTo": "{day} · saved to your history",
    "ss.minutes": "minutes",
    "ss.setsDone": "sets done",
    "ss.kgVolume": "kg volume",
    "ss.backTodayBtn": "Back to today",
    "rest.title": "Rest",
    "rest.skip": "Skip rest",

    // History
    "hi.title": "History",
    "hi.sub": "Every workout you've completed.",
    "hi.weeklyVolume": "Weekly volume",
    "hi.kgTotal": "{v} kg total",
    "hi.emptyTitle": "No workouts yet",
    "hi.emptyBody": "Finish your first session and it will show up here.",
    "hi.emptyBtn": "Go to today's plan",
    "hi.min": "min",
    "hi.sets": "sets",

    // Misc words
    "w.exercise_one": "exercise",
  },

  fa: {
    "app.title": "فورج — برنامه‌ساز تمرین باشگاه",
    "app.tagline": "همراه باشگاهی شما، مخصوص تازه‌کارها",

    // Nav
    "nav.today": "امروز",
    "nav.plan": "برنامه من",
    "nav.library": "حرکات",
    "nav.guide": "آموزش دستگاه‌ها",
    "nav.history": "تاریخچه",
    "nav.settings": "تنظیمات",

    // Catalog gate
    "gate.loading1": "در حال آماده‌سازی بانک حرکات —",
    "gate.loading2": "فقط برای بار اول دانلود می‌شود، بعد از آن همیشه فوری است.",
    "gate.err1": "اتصال به بانک حرکات ممکن نشد.",
    "gate.err2": "اتصال اینترنت را بررسی کنید و دوباره تلاش کنید.",
    "gate.retry": "تلاش مجدد",
    "gate.exercises": "حرکت",

    // Sidebar
    "side.tip1": "تازه‌واردی؟ قبل از اولین تمرین، ",
    "side.tip2": " را ببین.",
    "side.guideLink": "آموزش دستگاه‌ها",
    "side.credit": "اطلاعات و تصاویر متحرک از",

    // Onboarding
    "onb.step.welcome": "خوش آمدید",
    "onb.step.goal": "هدفت",
    "onb.step.week": "هفته‌ات",
    "onb.h1a": "تا حالا دستگاه باشگاه لمس نکردی؟",
    "onb.h1b": "عالیه!",
    "onb.b1": "یک برنامه آماده برای ۳ تا ۴ روز باشگاه در هفته",
    "onb.b2": "نمایش متحرک (GIF) برای تک‌تک حرکات",
    "onb.b3": "راهنمای ساده و بدون اصطلاحات پیچیده برای هر دستگاه",
    "onb.cta0": "شروع کنیم",
    "onb.goalTitle": "هدف اصلی چیه؟",
    "onb.namePh": "اسم کوچکت (اختیاری)",
    "onb.goal.muscle": "عضله‌سازی",
    "onb.goal.muscle.d": "حجم گرفتن و فرم گرفتن بدن",
    "onb.goal.fat": "چربی‌سوزی",
    "onb.goal.fat.d": "کالری‌سوزی و خوش‌فرم شدن",
    "onb.goal.strong": "قوی‌تر شدن",
    "onb.goal.strong.d": "افزایش تدریجی وزنه‌ها",
    "onb.goal.fit": "تناسب اندام عمومی",
    "onb.goal.fit.d": "سلامت و پرانرژی بودن",
    "onb.continue": "ادامه",
    "onb.daysTitle": "چند روز در هفته{name}؟",
    "onb.daysSub": "هرچی با برنامه‌ات جورتره انتخاب کن — هر دو برنامه برای شروع عالی‌اند.",
    "onb.perWeek": "{n} روز در هفته",
    "onb.create": "برنامه‌ام را بساز",
    "onb.creating": "در حال دریافت حرکات…",

    // Plans
    "plan.fb3.name": "کل بدن — پایه",
    "plan.fb3.desc": "برنامه کلاسیک تازه‌کارها. هر جلسه کل بدن را با دستگاه‌های ایمن و هدایت‌شده تمرین می‌دهد — بیشترین نتیجه، کمترین سردرگمی.",
    "plan.ul4.name": "بالاه تنه / پایین‌تنه",
    "plan.ul4.desc": "چهار جلسه متمرکز که بالاتنه و پایین‌تنه را یک در میان تمرین می‌دهند — حجم کمی بیشتر، باز هم با دستگاه‌های امن برای تازه‌کارها.",

    // Focus tags
    "focus.chestBackLegs": "سینه · پشت · پا",
    "focus.backShouldersArms": "پشت · سرشانه · بازو",
    "focus.chestLegsCore": "سینه · پا · شکم",
    "focus.upperA": "سینه · پشت · بازو",
    "focus.lowerA": "چهارسر · همسترینگ",
    "focus.upperB": "سینه · پشت · سرشانه",
    "focus.lowerB": "باسن · ساق · شکم",

    // Day names
    "day.fullbody.a": "کل بدن الف",
    "day.fullbody.b": "کل بدن ب",
    "day.fullbody.c": "کل بدن ج",
    "day.upper.a": "بالاه تنه الف",
    "day.lower.a": "پایین‌تنه الف",
    "day.upper.b": "بالاه تنه ب",
    "day.lower.b": "پایین‌تنه ب",

    // Dashboard
    "dash.greet.morning": "صبح بخیر",
    "dash.greet.afternoon": "ظهر بخیر",
    "dash.greet.evening": "شب بخیر",
    "dash.editPlan": "ویرایش برنامه",
    "dash.thisWeek": "این هفته",
    "dash.todaysWorkout": "تمرین امروز",
    "dash.startWorkout": "شروع تمرین",
    "dash.resume1": "تمرینی در جریان است — ادامه می‌دهی؟",
    "dash.restTitle": "روز استراحت — ریکاوری هم بخشی از تمرینه",
    "dash.nextUp": "بعدی:",
    "dash.restOn": "روز",
    "dash.noPlanYet": "هنوز تمرینی برنامه‌ریزی نشده — اول برنامه‌ات را بساز.",
    "dash.preview": "مشاهده",
    "dash.stat.streak": "هفته‌های پیاپی",
    "dash.stat.workouts": "کل تمرین‌ها",
    "dash.stat.volume": "حجم تمرین (کیلوگرم)",
    "dash.promoTitle": "مطمئن نیستی هر دستگاه چه کاری می‌کند؟",
    "dash.promoBody": "«آموزش دستگاه‌ها» هر ایستگاه را با زبان ساده و فیلم نمایشی توضیح می‌دهد.",

    // Planner
    "pl.title": "برنامه من",
    "pl.sub": "برنامه هفتگی‌ات — روی هر حرکت بزن تا نحوه اجرایش را ببینی.",
    "pl.start": "شروع",
    "pl.missing": "اطلاعات این حرکت یافت نشد — این ردیف را حذف کن.",
    "pl.remove": "حذف",
    "pl.addExercise": "افزودن حرکت",
    "pl.addDay": "افزودن روز تمرین",
    "pl.pickerTitle": "افزودن حرکت",
    "pl.pickerSub": "روی هر کارت بزن تا به روز انتخاب‌شده اضافه شود",
    "pl.undoExercise": "{name} حذف شد",
    "pl.undoDay": "روز {name} حذف شد",

    // Presets
    "pr.title": "افزودن سریع بر اساس عضله",
    "pr.byMuscle": "بر اساس عضله",
    "pr.browseAll": "مشاهده همه",

    // Library
    "lib.title": "بانک حرکات",
    "lib.sub": "{count} حرکت · هر کارت اجرای واقعی حرکت را نشان می‌دهد. برای راهنمای کامل رویش بزن.",
    "lib.search": "جستجوی حرکت یا عضله…",
    "lib.allEquipment": "همه تجهیزات",
    "lib.all": "همه",
    "lib.empty": "هیچ حرکتی با فیلترهای شما پیدا نشد.",
    "lib.more": "نمایش بیشتر ({n} مورد دیگر)",

    // Exercise modal
    "ex.primary": "عضلات اصلی",
    "ex.secondary": "عضلات کمکی",
    "ex.how": "روش اجرا",
    "ex.addTo": "افزودن به:",

    // Education panel
    "edu.title": "یادداشت مربی",
    "edu.setup": "تنظیم دستگاه",
    "edu.cues": "فرم و وضعیت بدن",
    "edu.rom": "دامنه حرکت و تنفس",
    "edu.mistakes": "اشتباه‌های رایج",
    "edu.safety": "اول ایمنی",
    "edu.quickGuide": "راهنمای سریع فرم",

    // Guide
    "gd.title": "آموزش دستگاه‌ها",
    "gd.sub": "هر نوع تجهیزات باشگاه، همان‌طور که یک دوست توضیح می‌داد — بدون اصطلاحات قلمبه.",
    "gd.rulesTitle": "قوانین طلایی برای هفته‌های اول",
    "gd.r1t": "از چیزی که فکر می‌کنی سبک‌تر شروع کن",
    "gd.r1b": "در هر ست ۲ تا ۳ تکرار را ذخیره نگه دار. فقط وقتی همه ست‌ها آسان شدند، کمی وزنه اضافه کن.",
    "gd.r2t": "آهسته بهتر از سریع است",
    "gd.r2b": "وزنه را در ۲ تا ۳ ثانیه پایین بیاور. کنترل است که عضله می‌سازد و مفاصل را سالم نگه می‌دارد.",
    "gd.r3t": "همه تمرین‌ها را ثبت کن",
    "gd.r3b": "برنامه‌ات وزنه‌هایت را به خاطر می‌سپارد — فقط سعی کن هر جلسه کمی از قبلی بهتر باشی.",
    "gd.r4t": "بین ست‌ها استراحت کن",
    "gd.r4b": "برای عضلات کوچک ۶۰ تا ۹۰ ثانیه، برای عضلات بزرگ (پا، سینه، پشت) تا ۲ دقیقه.",
    "gd.inLibrary": "{n} حرکت در بانک حرکات",
    "gd.eg": "مثلاً «{name}»",
    "gd.browseAll": "دیدن همه این‌ها در بانک حرکات ←",
    "gd.etiquette": "قوانین نوشته‌نشده باشگاه 🤝",
    "gd.e1": "وزنه‌ها را بعد از استفاده سر جای خودشان بگذار",
    "gd.e2": "بعد از استفاده دستگاه را تمیز کن",
    "gd.e3": "وسط استراحت طولانی دستگاه را نگه ندار — بگذار دیگران هم استفاده کنند",
    "gd.e4": "تماس تلفنی خارج از سالن، موسیقی با هدفون",
    "gd.e5": "از مربیان بپرس — با کمال میل نحوه کار دستگاه را نشان می‌دهند",
    "gd.e6": "هیچ‌کس دارد قضاوتت می‌کند نیست. همه از جایی شروع کرده‌اند.",

    // Settings
    "st.title": "تنظیمات",
    "st.sub": "تجربه Forge خود را سفارشی کنید.",
    "st.displayMode": "نمایش حرکات",
    "st.gif": "انیمیشن GIF",
    "st.gifDesc": "دموهای متحرک از ExerciseDB",
    "st.svg": "تصاویر SVG",
    "st.svgDesc": "انیمیشن‌های وکتور ساده",
    "st.svgNote": "انیمیشن‌های SVG فقط برای حرکات برنامه شروع موجود هستند. سایر حرکات به GIF بازمی‌گردند.",
    "st.language": "زبان",
    "st.danger": "ناحیه خطر",
    "st.resetDesc": "همه چیز را پاک کن و از اول شروع کن. قابل بازگشت نیست.",
    "st.resetConfirm": "تمام تمرین‌ها، لاگ‌ها و تنظیمات حذف می‌شوند. ادامه می‌دهید؟",
    "st.reset": "بازنشانی همه چیز",

    // Equipment
    "eq.leverage_machine.label": "دستگاه‌های وزنه‌ای (پین‌دار)",
    "eq.leverage_machine.blurb": "دوست‌داشتنی‌ترین تجهیزات باشگاه برای تازه‌کارها. وزنه را با جابه‌جا کردن یک پین فلزی داخل پشته صفحه‌ها تنظیم می‌کنی، ارتفاع صندلی را درست می‌کنی و دستهٔ پدینگ‌دار را هل می‌دهی یا می‌کشی. وزنه روی مسیر ثابت حرکت می‌کند، پس مسیر حرکت را برایت ایمن نگه می‌دارد — بدون نیاز به همراه.",
    "eq.leverage_machine.t1": "صندلی را طوری تنظیم کن که محور دستگاه با مفصل مورد تمرین هم‌راستا باشد",
    "eq.leverage_machine.t2": "قبل از شروع، پین را کاملاً در شیار صفحه فرو کن",
    "eq.leverage_machine.t3": "وزنه‌ای را انتخاب کن که برای همه تکرارها بتوانی کنترلش کنی",
    "eq.cable.label": "ایستگاه‌های سیم‌کش",
    "eq.cable.blurb": "برج بلندی با پشته وزنه و سیم بلندی که به دسته ختم می‌شود. سیم‌کش در تمام مسیر حرکت کشش یکنواخت روی عضله نگه می‌دارد و اجازه مسیر طبیعی حرکت را می‌دهد. بسیار ایمن — اگر دستت بخورد، وزنه فقط برمی‌گردد پایین.",
    "eq.cable.t1": "دسته را محکم قلاب کن و پین را کمی بالا بکش تا مطمئن شوی وصل است",
    "eq.cable.t2": "ایستاده و باثبات بمان و بگذار سیم از همان‌جایی که آویزان است بکشد",
    "eq.cable.t3": "برای بازو، سرشانه و حرکات پایانی فوق‌العاده است",
    "eq.smith_machine.label": "دستگاه اسمیت",
    "eq.smith_machine.blurb": "میله‌ای که داخل ریل‌های فولادی ثابت شده و فقط بالا و پایین می‌رود. قلاب‌های روی ریل اجازه می‌دهند میله را با چرخاندن در هر ارتفاعی قفل کنی — اسکوات و پرس را برای تازه‌کارها خیلی امن‌تر از هالتر آزاد می‌کند.",
    "eq.smith_machine.t1": "برای برداشتن: میله را به جلو چرخانده و از قلاب خارج کن",
    "eq.smith_machine.t2": "برای گذاشتن: بالا فشار بده و برگردان تا قلاب بگیرد",
    "eq.smith_machine.t3": "توقف‌کننده‌های ایمنی را زیر پایین‌ترین نقطه حرکتت تنظیم کن",
    "eq.dumbbell.label": "دمبل‌ها",
    "eq.dumbbell.blurb": "وزنه‌های دستی روی طبقه، معمولاً جفتی. هر بازو مستقل کار می‌کند و همین قدرت متعادل می‌سازد. از وزنه سبک شروع کن — هیچ ریل مسیری وجود ندارد، پس کنترل مهم‌تر از سنگینی است.",
    "eq.dumbbell.t1": "وزنه‌ای بردار که با فرم درست بتوانی همه تکرارها را انجام دهی",
    "eq.dumbbell.t2": "بعد از استفاده دمبل‌ها را سر جایشان بگذار",
    "eq.dumbbell.t3": "مچ‌ها را صاف و حرکات را آهسته نگه دار",
    "eq.body_weight.label": "وزن بدن",
    "eq.body_weight.blurb": "حرکاتی که از وزن بدن خودت به‌عنوان مقاومت استفاده می‌کنند — شنا، پلانک، کرانچ. نه آماده‌سازی می‌خواهند نه دستگاه؛ گرم‌کردنِ عالی‌اند و پیش از افزودن وزنهٔ خارجی، کنترل را یادت می‌دهند.",
    "eq.body_weight.t1": "تکرارهای آهسته و کنترل‌شده از تکرارهای سریع و شلخته بهترند",
    "eq.body_weight.t2": "بین ست‌های دستگاهی، وقتی عضلات دیگر استراحت می‌کنند عالی‌اند",

    // Session
    "ss.discardConfirm": "این تمرین کنار گذاشته شود؟ ست‌های ثبت‌شده از بین می‌روند.",
    "ss.inProgress": "در جریان",
    "ss.setsCount": "{done}/{all} ست",
    "ss.target": "هدف:",
    "ss.done": "تمام",
    "ss.col.set": "ست",
    "ss.col.weight": "وزنه (کیلو)",
    "ss.col.reps": "تکرار",
    "ss.finish": "پایان",
    "ss.finishConfirm": "بعضی ست‌ها تیک نخورده‌اند — همین‌طور تمامش می‌کنی؟",
    "ss.none": "تمرینی در جریان نیست.",
    "ss.backToday": "بازگشت به امروز",
    "ss.complete": "تمرین کامل شد!",
    "ss.savedTo": "{day} · در تاریخچه‌ات ذخیره شد",
    "ss.minutes": "دقیقه",
    "ss.setsDone": "ست انجام‌شده",
    "ss.kgVolume": "کیلو حجم",
    "ss.backTodayBtn": "بازگشت به امروز",
    "rest.title": "استراحت",
    "rest.skip": "رد شدن",

    // History
    "hi.title": "تاریخچه",
    "hi.sub": "همه تمرین‌هایی که کامل کرده‌ای.",
    "hi.weeklyVolume": "حجم هفتگی",
    "hi.kgTotal": "مجموع {v} کیلوگرم",
    "hi.emptyTitle": "هنوز تمرینی ثبت نشده",
    "hi.emptyBody": "اولین جلسه‌ات را تمام کن تا اینجا نمایش داده شود.",
    "hi.emptyBtn": "رفتن به برنامه امروز",
    "hi.min": "دقیقه",
    "hi.sets": "ست",

    // Muscles
    "mu.pectorals": "سینه",
    "mu.lats": "زیربغل",
    "mu.upper back": "پشت بالایی",
    "mu.middle back": "پشت میانی",
    "mu.lower back": "کمر",
    "mu.traps": "ذوزنقه",
    "mu.shoulders": "سرشانه",
    "mu.delts": "سرشانه",
    "mu.biceps": "جلو بازو",
    "mu.triceps": "پشت بازو",
    "mu.forearms": "ساعد",
    "mu.abs": "شکم",
    "mu.obliques": "پهلو (مورب شکم)",
    "mu.waist": "میان‌تنه",
    "mu.quads": "چهارسر",
    "mu.hamstrings": "همسترینگ",
    "mu.glutes": "باسن",
    "mu.calves": "ساق",
    "mu.abductors": "دورکننده ران",
    "mu.adductors": "نزدیک‌کننده ران",
    "mu.spine": "ستون فقرات",
    "mu.cardiovascular system": "قلبی ـ عروقی",
    "mu.neck": "گردن",
    "mu.full body": "کل بدن",

    // Body parts
    "bp.chest": "سینه",
    "bp.back": "پشت",
    "bp.shoulders": "سرشانه",
    "bp.upper arms": "بازو",
    "bp.lower arms": "ساعد",
    "bp.upper legs": "ران",
    "bp.lower legs": "ساق پا",
    "bp.waist": "شکم و میان‌تنه",
    "bp.cardio": "هوازی",
    "bp.neck": "گردن",

    // Equipment names
    "eqn.barbell": "هالتر",
    "eqn.olympic barbell": "هالتر المپیکی",
    "eqn.ez barbell": "هالتر خم (EZ)",
    "eqn.trap bar": "هالتر شش‌گوش",
    "eqn.dumbbell": "دمبل",
    "eqn.kettlebell": "کیتلبل",
    "eqn.cable": "سیم‌کش",
    "eqn.leverage machine": "دستگاه وزنه‌ای",
    "eqn.smith machine": "دستگاه اسمیت",
    "eqn.body weight": "وزن بدن",
    "eqn.band": "کش مقاومتی",
    "eqn.resistance band": "کش مقاومتی",
    "eqn.rope": "طناب",
    "eqn.medicine ball": "توپ پزشکی",
    "eqn.stability ball": "توپ سوئیسی",
    "eqn.bosu ball": "نیم‌توپ بوسو",
    "eqn.assisted": "دستگاه کمک‌یار",
    "eqn.wheel roller": "غلتک شکم",
    "eqn.roller": "فوم رولر",
    "eqn.hammer": "چکش",
    "eqn.tire": "لاستیک",
    "eqn.weighted": "وزنه‌دار",
    "eqn.sled machine": "دستگاه سورتمه",
    "eqn.stairmaster": "پله‌زن",
    "eqn.stepmill machine": "پله‌زن",
    "eqn.elliptical machine": "الپتیکال",
    "eqn.stationary bike": "دوچرخه ثابت",
    "eqn.skierg machine": "اسکی ارگ",
    "eqn.upper body ergometer": "ارگ دستی",
  },
};

// Fix two intentional typos above
translations.fa["plan.ul4.name"] = "بالاتنه / پایین‌تنه";
translations.fa["day.upper.a"] = "بالاتنه الف";
translations.fa["day.upper.b"] = "بالاتنه ب";

export function translate(lang, key, params) {
  let str = translations[lang]?.[key] ?? translations.en[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}

const WEEKDAYS = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  fa: ["دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه", "یکشنبه"],
};
export function weekdayName(i, lang = "en") {
  return WEEKDAYS[lang]?.[i] ?? WEEKDAYS.en[i] ?? "";
}

export function formatDate(dateish, lang = "en") {
  const d = dateish instanceof Date ? dateish : new Date(dateish);
  try {
    return d.toLocaleDateString(lang === "fa" ? "fa-IR" : "en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  } catch {
    return d.toLocaleDateString();
  }
}

export function formatMuscleLocal(m, lang) {
  return translate(lang, `mu.${m}`, undefined) !== `mu.${m}`
    ? translate(lang, `mu.${m}`)
    : m.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatBodyPart(bp, lang) {
  const key = `bp.${bp}`;
  return translate(lang, key) !== key
    ? translate(lang, key)
    : bp.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatEquipment(eq, lang) {
  const key = `eqn.${eq}`;
  return translate(lang, key) !== key
    ? translate(lang, key)
    : eq.replace(/\b\w/g, (c) => c.toUpperCase());
}
