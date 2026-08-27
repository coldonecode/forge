const equipmentGuide = [
  {
    id: "leverage_machine",
    nameEn: "Pin-Loaded Machine",
    nameFa: "دستگاه وزنه‌ای (پین‌دار)",
    musclesEn: "Chest, Back, Shoulders, Arms, Legs (varies by machine)",
    musclesFa: "سینه، پشت، سرشانه، بازو، پا (بسته به دستگاه)",
    descriptionEn:
      "A machine where you select weight by inserting a pin into a stack of plates. The weight moves on a fixed track, guiding you through the movement safely.",
    descriptionFa:
      "دستگاهی که وزنه را با فرو کردن پین داخل پشته صفحه‌ها انتخاب می‌کنی. وزنه روی مسیر ثابت حرکت می‌کند و مسیر حرکت را ایمن نگه می‌دارد.",
    howToUseEn: [
      "Adjust the seat height so the machine's pivot aligns with your joint",
      "Insert the pin into your chosen weight plate",
      "Grip the handles and push or pull through the full range of motion",
      "Return slowly to the starting position",
    ],
    howToUseFa: [
      "ارتفاع صندلی را طوری تنظیم کن که محور دستگاه با مفصل هم‌راستا باشد",
      "پین را در صفحه وزنه مورد نظر فرو کن",
      "دسته‌ها را بگیر و با دامنه کامل حرکت بده یا بکش",
      "آرام به موقعیت شروع برگرد",
    ],
    adjustmentsEn:
      "Seat height, backrest angle, weight pin, pad position (varies by machine)",
    adjustmentsFa:
      "ارتفاع صندلی، زاویه پشتی، پین وزنه، موقعیت بالشتک (بسته به دستگاه)",
    mistakesEn: [
      "Using too much weight — the movement becomes jerky",
      "Not adjusting the seat — wrong joint alignment causes strain",
      "Half reps — not using the full range of motion",
    ],
    mistakesFa: [
      "وزن زیاد — حرکت تند و پرتابی می‌شود",
      "تنظیم نکردن صندلی — عدم هم‌راستایی مفصل باعث فشار می‌شود",
      "نیم تکرار — استفاده نکردن از دامنه کامل حرکت",
    ],
    exercisesEn: [
      "Chest Press",
      "Shoulder Press",
      "Leg Extension",
      "Leg Curl",
      "Lat Pulldown",
      "Seated Row",
    ],
    exercisesFa: [
      "پرس سینه",
      "پرس شانه",
      "فشار پا",
      "لانگ پا",
      "لات پول‌داون",
      "رو نشسته",
    ],
    tipsEn:
      "Start with the lightest weight to learn the movement path. The machine guides you — focus on control, not power.",
    tipsFa:
      "با سبک‌ترین وزن شروع کن تا مسیر حرکت یاد بگیری. دستگاه مسیر را هدایت می‌کند — روی کنترل تمرکز کن، نه قدرت.",
  },
  {
    id: "cable",
    nameEn: "Cable Station",
    nameFa: "ایستگاه سیم‌کش",
    musclesEn: "Chest, Back, Shoulders, Arms, Core (versatile)",
    musclesFa: "سینه، پشت، سرشانه، بازو، شکم (همه‌کاره)",
    descriptionEn:
      "A tall tower with a weight stack and a long cable ending in a handle. Cables keep constant tension on the muscle through the whole movement and allow natural paths of motion. Very safe — if you lose grip, the weight just slides back down.",
    descriptionFa:
      "برج بلندی با پشته وزنه و سیم بلندی که به دسته ختم می‌شود. سیم‌کش در تمام مسیر حرکت کشش یکنواخت روی عضله نگه می‌دارد و اجازه مسیر طبیعی حرکت را می‌دهد. بسیار ایمن — اگر دستت بخورد، وزنه فقط برمی‌گردد پایین.",
    howToUseEn: [
      "Clip the handle onto the cable carabiner and pull gently to check it's secure",
      "Adjust the pulley height to match your exercise",
      "Stand in a stable position and perform the movement slowly",
      "Let the weight return under control — don't let it slam",
    ],
    howToUseFa: [
      "دسته را به قلاب سیم وصل کن و آرام بکش تا مطمئن شوی محکم است",
      "ارتفاع قرقره را متناسب با حرکتت تنظیم کن",
      "در حالت باثبات بایست و حرکت را آهسته اجرا کن",
      "وزنه را آرام و تحت کنترل برگردان — نگذار محکم بخورد",
    ],
    adjustmentsEn: "Pulley height, handle attachment, weight stack pin",
    adjustmentsFa: "ارتفاع قرقره، نوع دسته، پین پشته وزنه",
    mistakesEn: [
      "Using momentum instead of muscle control",
      "Standing too close or too far from the machine",
      "Rushing through reps without a full stretch",
    ],
    mistakesFa: [
      "استفاده از ضربه به جای کنترل عضله",
      "ایستادن خیلی نزدیک یا خیلی دور از دستگاه",
      "تکرار سریع بدون کشش کامل",
    ],
    exercisesEn: [
      "Cable Fly",
      "Tricep Pushdown",
      "Face Pull",
      "Bicep Curl",
      "Cable Crunch",
      "Woodchop",
    ],
    exercisesFa: [
      "فلای سیم‌کش",
      "فشار پشت بازو",
      "فیس پول",
      "جلو بازو سیم‌کش",
      "کرانچ سیم‌کش",
      "وودشاپ",
    ],
    tipsEn:
      "Cables are incredibly versatile — one machine can train your entire body. Start with light weight and focus on feeling the muscle work.",
    tipsFa:
      "سیم‌کش فوق‌العاده همه‌کاره است — یک دستگاه می‌تواند کل بدنت را تمرین دهد. با وزنه سبک شروع کن و روی احساس کار عضله تمرکز کن.",
  },
  {
    id: "smith_machine",
    nameEn: "Smith Machine",
    nameFa: "دستگاه اسمیت",
    musclesEn: "Chest, Back, Shoulders, Legs",
    musclesFa: "سینه، پشت، سرشانه، پا",
    descriptionEn:
      "A barbell fixed inside steel rails so it can only move up and down. Hooks along the rails let you lock the bar at any height by rotating it — making squats and presses much safer for beginners than a free barbell.",
    descriptionFa:
      "میله‌ای که داخل ریل‌های فولادی ثابت شده و فقط بالا و پایین می‌رود. قلاب‌های روی ریل اجازه می‌دهند میله را با چرخاندن در هر ارتفاعی قفل کنی — اسکوات و پرس را برای تازه‌کارها خیلی امن‌تر از هالتر آزاد می‌کند.",
    howToUseEn: [
      "Set the safety stops below your lowest planned position",
      "To unrack: push up slightly and rotate the bar forward off the hooks",
      "Perform the movement on the fixed vertical path",
      "To rack: push up, rotate back until the hooks catch",
    ],
    howToUseFa: [
      "توقف‌کننده‌های ایمنی را زیر پایین‌ترین نقطه حرکتت تنظیم کن",
      "برای برداشتن: کمی بالا فشار بده و میله را به جلو بچرخان تا از قلاب خارج شود",
      "حرکت را روی مسیر عمودی ثابت اجرا کن",
      "برای گذاشتن: بالا فشار بده و برگردان تا قلاب بگیرد",
    ],
    adjustmentsEn: "Bar height, safety stops, weight plates",
    adjustmentsFa: "ارتفاع میله، توقف‌کننده‌های ایمنی، صفحه‌های وزنه",
    mistakesEn: [
      "Not using safety stops — dangerous if you fail a rep",
      "Twisting your wrists to unrack — push straight up first",
      "Treating it like a free-weight exercise — the bar path is fixed, adjust your stance",
    ],
    mistakesFa: [
      "استفاده نکردن از توقف‌کننده ایمنی — خطرناک است اگر نتوانی تکرار را تمام کنی",
      "چرخاندن مچ‌ها برای برداشتن میله — اول مستقیم بالا فشار بده",
      "انجام حرکت مثل هالتر آزاد — مسیر میله ثابت است، فاصله پاهایت را تنظیم کن",
    ],
    exercisesEn: [
      "Smith Squat",
      "Smith Bench Press",
      "Smith Shoulder Press",
      "Smith Deadlift",
      "Smith Lunge",
      "Smith Incline Press",
    ],
    exercisesFa: [
      "اسکوات اسمیت",
      "پرس سینه اسمیت",
      "پرس شانه اسمیت",
      "ددلیفت اسمیت",
      "لانگ اسمیت",
      "پرس سرشیب اسمیت",
    ],
    tipsEn:
      "The fixed path makes it great for learning squat and press patterns safely. Set safety stops every time — it takes 10 seconds and could save you.",
    tipsFa:
      "مسیر ثابت آن را برای یادگیری ایمن الگوهای اسکوات و پرس عالی می‌کند. هر بار توقف‌کننده ایمنی را تنظیم کن — ۱۰ ثانیه طول می‌کشد و ممکن است نجاتت بدهد.",
  },
  {
    id: "dumbbell",
    nameEn: "Dumbbells",
    nameFa: "دمبل‌ها",
    musclesEn: "Full body (chest, back, shoulders, arms, legs)",
    musclesFa: "کل بدن (سینه، پشت، سرشانه، بازو، پا)",
    descriptionEn:
      "Handheld free weights on a rack, usually in pairs. Each arm works independently which builds balanced strength. Start light — there's no track guiding the weight, so control matters more than load.",
    descriptionFa:
      "وزنه‌های دستی روی طبقه، معمولاً جفتی. هر بازو مستقل کار می‌کند و همین قدرت متعادل می‌سازد. از وزنه سبک شروع کن — هیچ ریل مسیری وجود ندارد، پس کنترل مهم‌تر از سنگینی است.",
    howToUseEn: [
      "Pick a weight you can lift with good form for all reps",
      "Sit or lie in position before lifting the dumbbells up",
      "Keep wrists straight and move in a controlled path",
      "Return dumbbells to the rack after use",
    ],
    howToUseFa: [
      "وزنه‌ای بردار که با فرم درست بتوانی همه تکرارها را انجام دهی",
      "قبل از بالا بردن دمبل‌ها، نشسته یا دراز کشیده در جایت قرار بگیر",
      "مچ‌ها را صاف نگه دار و با مسیر کنترل‌شده حرکت بده",
      "بعد از استفاده دمبل‌ها را سر جایشان بگذار",
    ],
    adjustmentsEn: "Weight selection (each dumbbell is a fixed weight)",
    adjustmentsFa: "انتخاب وزنه (هر دمبل وزن ثابتی دارد)",
    mistakesEn: [
      "Going too heavy too soon — form breaks down and injury risk rises",
      "Letting wrists bend under the weight — keep them neutral",
      "Using momentum to swing the weight up",
    ],
    mistakesFa: [
      "سنگین کردن زودهنگام — فرم خراب می‌شود و خطر آسیب بالا می‌رود",
      "خم کردن مچ‌ها زیر وزنه — آن‌ها را خنثی نگه دار",
      "استفاده از ضربه برای پرتاب وزنه به بالا",
    ],
    exercisesEn: [
      "Dumbbell Press",
      "Dumbbell Row",
      "Bicep Curl",
      "Lateral Raise",
      "Goblet Squat",
      "Chest Fly",
    ],
    exercisesFa: [
      "پرس دمبل",
      "رو دمبل",
      "جلو بازو دمبل",
      "侧 raises",
      "گابلت اسکوات",
      "فلای سینه",
    ],
    tipsEn:
      "Start with weights you can control for 12+ reps. Dumbbells are the best way to build balanced, real-world strength.",
    tipsFa:
      "با وزنه‌هایی شروع کن که بتوانی ۱۲ تکرار یا بیشتر کنترلشان کنی. دمبل‌ها بهترین راه برای ساختن قدرت متعادل و کاربردی هستند.",
  },
  {
    id: "body_weight",
    nameEn: "Bodyweight",
    nameFa: "وزن بدن",
    musclesEn: "Full body (chest, back, arms, core, legs)",
    musclesFa: "کل بدن (سینه، پشت، بازو، شکم، پا)",
    descriptionEn:
      "Exercises using your own body as resistance — push-ups, planks, crunches. No setup needed, perfect warm-ups, and they teach control before adding external weight.",
    descriptionFa:
      "حرکاتی که از وزن بدن خودت به‌عنوان مقاومت استفاده می‌کنند — شنا، پلانک، کرانچ. نه آماده‌سازی می‌خواهند نه دستگاه؛ گرم‌کردنِ عالی‌اند و پیش از افزودن وزنهٔ خارجی، کنترل را یادت می‌دهند.",
    howToUseEn: [
      "Start with easier variations (e.g., knee push-ups before full push-ups)",
      "Focus on slow, controlled reps with full range of motion",
      "Breathe out on the effort, in on the return",
      "Progress by adding reps, holds, or harder variations",
    ],
    howToUseFa: [
      "از حرکات آسان‌تر شروع کن (مثلاً شنا روی زانو قبل از شنا کامل)",
      "روی تکرارهای آهسته و کنترل‌شده با دامنه کامل تمرکز کن",
      "در فشار بازدم کن، در برگشت نفس بکش",
      "با افزودن تکرار، نگه‌داشتن، یا حرکات سخت‌تر پیشرفت کن",
    ],
    adjustmentsEn:
      "Body position, leverage (e.g., incline vs. flat), tempo, added weight",
    adjustmentsFa:
      "موقعیت بدن، اهرم (مثلاً سرشیبی یا صاف)، سرعت، وزنه اضافی",
    mistakesEn: [
      "Going too fast — momentum takes over and muscles don't work",
      "Skipping full range of motion",
      "Not progressing — staying at the same difficulty forever",
    ],
    mistakesFa: [
      "سرعت زیاد — ضربه جایگزین کار عضله می‌شود",
      "استفاده نکردن از دامنه کامل حرکت",
      "پیشرفت نکردن — ماندن در سطح دشواری یکسان برای همیشه",
    ],
    exercisesEn: [
      "Push-up",
      "Plank",
      "Squat",
      "Lunge",
      "Pull-up",
      "Crunch",
    ],
    exercisesFa: [
      "شنا",
      "پلانک",
      "اسکوات",
      "لانگ",
      "بارفیکس",
      "کرانچ",
    ],
    tipsEn:
      "Bodyweight exercises are underrated. Master these first and you'll build a solid foundation before touching any machine.",
    tipsFa:
      "حرکات وزن بدن کم‌ارزش‌گذاری شده‌اند. اول این‌ها را تسلط پیدا کن تا پایه محکمی بسازی قبل از استفاده از هر دستگاهی.",
  },
  {
    id: "barbell",
    nameEn: "Barbell",
    nameFa: "هالتر",
    musclesEn: "Full body (compound movements)",
    musclesFa: "کل بدن (حرکات ترکیبی)",
    descriptionEn:
      "A long steel bar you load with round weight plates on each end. The king of strength training — exercises like squats, deadlifts, and bench presses build the most muscle and strength. Needs more technique than machines.",
    descriptionFa:
      "میله فولادی بلندی که صفحه‌های وزنه گرد را از هر طرف بهش می‌زنی. پادشاه تمرینات قدرتی — حرکاتی مثل اسکوات، ددلیفت و پرس سینه بیشترین عضله و قدرت را می‌سازند. به تکنیک بیشتری از دستگاه‌ها نیاز دارند.",
    howToUseEn: [
      "Load lighter than you think — technique comes first",
      "Keep your core tight and spine neutral throughout",
      "Move the bar in a straight line, close to your body",
      "Use a squat rack or bench with safety bars when possible",
    ],
    howToUseFa: [
      "سبک‌تر از چیزی که فکر می‌کنی بزن — تکنیک اول می‌آید",
      "شکم را منقبض و ستون فقرات را خنثی نگه دار",
      "میله را در خط مستقیم و نزدیک بدن حرکت بده",
      "وقتی ممکن است از رک اسکوات یا نیمکت با میله ایمنی استفاده کن",
    ],
    adjustmentsEn: "Weight plates, grip width, stance width, bar position",
    adjustmentsFa: "صفحه‌های وزنه، عرض گرفتن، عرض پاها، موقعیت میله",
    mistakesEn: [
      "Ego lifting — too much weight with bad form is the #1 cause of serious injury",
      "Rounding the lower back during deadlifts",
      "Not using safety bars or a spotter for heavy sets",
    ],
    mistakesFa: [
      "وزنه زیاد با فرم بد — اولین دلیل آسیب‌های جدی است",
      "گرد کردن کمر پایین در ددلیفت",
      "استفاده نکردن از میله ایمنی یا همراه برای ست‌های سنگین",
    ],
    exercisesEn: [
      "Barbell Squat",
      "Deadlift",
      "Bench Press",
      "Overhead Press",
      "Barbell Row",
      "Barbell Curl",
    ],
    exercisesFa: [
      "اسکوات هالتر",
      "ددلیفت",
      "پرس سینه",
      "پرس بالای سر",
      "رو هالتر",
      "جلو بازو هالتر",
    ],
    tipsEn:
      "Start with just the bar (20 kg) to learn proper form. There's zero shame in going light — it's how every lifter started.",
    tipsFa:
      "فقط با خود میله (۲۰ کیلو) شروع کن تا فرم درست را یاد بگیری. سبک زدن هیچ شرمی ندارد — همه وزنه‌بردارها از همین‌جا شروع کرده‌اند.",
  },
  {
    id: "kettlebell",
    nameEn: "Kettlebell",
    nameFa: "کیتلبل",
    musclesEn: "Full body (glutes, hamstrings, core, shoulders)",
    musclesFa: "کل بدن (باسن، همسترینگ، شکم، سرشانه)",
    descriptionEn:
      "A cannonball-shaped weight with a handle on top. The offset center of gravity makes your stabilizer muscles work overtime. Excellent for explosive, full-body movements that burn fat and build endurance.",
    descriptionFa:
      "وزنه‌ای به شکل توپ توپخانه با دسته رویش. مرکز ثقل کج باعث می‌شود عضلات تثبیت‌کننده بیشتر کار کنند. عالی برای حرکات منفجرکننده تمام‌بدن که چربی می‌سوزانند و استقامت می‌سازند.",
    howToUseEn: [
      "Start with a light bell — the swing is a hip hinge, not a squat",
      "Grip the handle firmly and keep your wrist straight",
      "Drive with your hips, not your arms",
      "Control the bell back down — never let it drop",
    ],
    howToUseFa: [
      "با کیتلبل سبک شروع کن — سوئینگ یک لولای لگن است، نه اسکوات",
      "دسته را محکم بگیر و مچ را صاف نگه دار",
      "با لگن حرکت بده، نه با بازو",
      "کیتلبل را کنترل‌شده پایین بیاور — هرگز رهایش نکن",
    ],
    adjustmentsEn: "Weight (kettlebells come in fixed sizes), grip style",
    adjustmentsFa: "وزنه (کیتلبل‌ها اندازه ثابت دارند)، سبک گرفتن",
    mistakesEn: [
      "Using your arms to lift instead of driving with the hips",
      "Standing too upright during swings — hinge at the hips",
      "Starting too heavy — kettlebell moves are technical",
    ],
    mistakesFa: [
      "استفاده از بازوها به جای لگن برای بلند کردن",
      "ایستادن خیلی صاف در حین سوئینگ — در لگن لولا کن",
      "سنگین شروع کردن — حرکات کیتلبل تکنیکی هستند",
    ],
    exercisesEn: [
      "Kettlebell Swing",
      "Goblet Squat",
      "Turkish Get-Up",
      "Kettlebell Clean",
      "Kettlebell Snatch",
      "Kettlebell Press",
    ],
    exercisesFa: [
      "سوئینگ کیتلبل",
      "گابلت اسکوات",
      "ترکیش گت‌آپ",
      "کلین کیتلبل",
      "اسنچ کیتلبل",
      "پرس کیتلبل",
    ],
    tipsEn:
      "The swing is the most important kettlebell move. Learn it first — it trains your entire posterior chain in one powerful motion.",
    tipsFa:
      "سوئینگ مهم‌ترین حرکت کیتلبل است. اول آن را یاد بگیر — کل زنجیره خلفی بدنت را در یک حرکت قدرتمند تمرین می‌دهد.",
  },
  {
    id: "resistance_band",
    nameEn: "Resistance Band",
    nameFa: "کش مقاومتی",
    musclesEn: "Full body (arms, shoulders, core, legs)",
    musclesFa: "کل بدن (بازو، سرشانه، شکم، پا)",
    descriptionEn:
      "Stretchy elastic bands in different thicknesses and resistance levels. Lightweight, portable, and joint-friendly. The resistance increases as you stretch — making the hardest part of the movement at the peak contraction.",
    descriptionFa:
      "بندهای کشی در ضخامت‌ها و سطوح مقاومت مختلف. سبک، قابل حمل و مفاصل‌پسند. مقاومت با کشیده شدن بیشتر می‌شود — سخت‌ترین نقطه حرکت در بالاترین انقباض است.",
    howToUseEn: [
      "Anchor the band securely (door, pole, or under your feet)",
      "Stand or sit in a stable position",
      "Pull or push slowly through the full range",
      "Control the return — don't snap back",
    ],
    howToUseFa: [
      "بند را محکم ثابت کن (درو، میله، یا زیر پاهایت)",
      "نشسته یا ایستاده در حالت باثبات قرار بگیر",
      "آرام و با دامنه کامل فشار بده یا بکش",
      "برگشت را کنترل کن — نگذار ضربه بزند",
    ],
    adjustmentsEn: "Band thickness (light, medium, heavy), anchor point, grip",
    adjustmentsFa: "ضخامت بند (سبک، متوسط، سنگین)، نقطه ثبات، گرفتن",
    mistakesEn: [
      "Using a band that's too strong — you end up cheating the movement",
      "Letting the band snap back uncontrolled",
      "Wrapping the band around joints instead of gripping it",
    ],
    mistakesFa: [
      "استفاده از بند خیلی مقاوم — ناچار می‌شوی حرکت را تقلبی انجام دهی",
      "ره کردن بند بدون کنترل — ضربه می‌زند",
      "پیچیدن بند دور مفصل به جای گرفتن آن",
    ],
    exercisesEn: [
      "Band Pull-Apart",
      "Banded Squat",
      "Band Shoulder Press",
      "Band Bicep Curl",
      "Band Deadlift",
      "Band Woodchop",
    ],
    exercisesFa: [
      "پول‌آپارت با بند",
      "اسکوات با بند",
      "پرس شانه با بند",
      "جلو بازو با بند",
      "ددلیفت با بند",
      "وودشاپ با بند",
    ],
    tipsEn:
      "Bands are perfect for warming up, rehab, and adding resistance to bodyweight exercises. Keep a set in your gym bag.",
    tipsFa:
      "بندها برای گرم‌کردن، توانبخشی و افزودن مقاومت به حرکات وزن بدن عالی هستند. یک ست در کیف باشگاهت نگه دار.",
  },
  {
    id: "medicine_ball",
    nameEn: "Medicine Ball",
    nameFa: "توپ پزشکی",
    musclesEn: "Core, chest, shoulders, legs",
    musclesFa: "شکم، سینه، سرشانه، پا",
    descriptionEn:
      "A heavy, grippy ball used for throwing, catching, and slamming. Builds explosive power and core stability. Great for dynamic movements that traditional weights can't replicate.",
    descriptionFa:
      "توپ سنگین و چسبنده‌ای که برای پرتاب، گرفتن و کوبیدن استفاده می‌شود. قدرت منفجرکننده و ثبات شکم می‌سازد. عالی برای حرکات پویایی که وزنه‌های سنتی نمی‌توانند تکرار کنند.",
    howToUseEn: [
      "Stand with feet shoulder-width apart, hold the ball at chest height",
      "Engage your core before every throw",
      "Throw against a wall, to a partner, or slam to the ground",
      "Catch with soft hands and reset before the next rep",
    ],
    howToUseFa: [
      "پاها را به عرض شانه باز کن و توپ را در ارتفاع سینه نگه دار",
      "قبل از هر پرتاب شکمت را منقبض کن",
      "به دیوار، به هم‌تمرینی، یا روی زمین پرتاب کن",
      "با دست‌های نرم بگیر و قبل از تکرار بعدی بازنشانی کن",
    ],
    adjustmentsEn: "Ball weight, throw type, distance from wall",
    adjustmentsFa: "وزن توپ، نوع پرتاب، فاصله از دیوار",
    mistakesEn: [
      "Using only arms to throw — the power comes from the hips and core",
      "Catching with stiff arms — let the ball come to you",
      "Choosing a ball that's too heavy — form breaks down",
    ],
    mistakesFa: [
      "فقط با بازو پرتاب کردن — قدرت از لگن و شکم می‌آید",
      "گرفتن توپ با دست‌های خشک — بگذار توپ به سمتت بیاید",
      "انتخاب توپ خیلی سنگین — فرم خراب می‌شود",
    ],
    exercisesEn: [
      "Med Ball Slam",
      "Med Ball Chest Pass",
      "Med Ball Russian Twist",
      "Med Ball Wall Throw",
      "Med Ball Squat Throw",
      "Med Ball Sit-Up Throw",
    ],
    exercisesFa: [
      "کوبیدن توپ پزشکی",
      "پاس سینه با توپ",
      "تویست روسی با توپ",
      "پرتاب به دیوار با توپ",
      "پرتاب اسکوات با توپ",
      "پرتاب کرانچ با توپ",
    ],
    tipsEn:
      "Medicine balls make training fun and explosive. Start with a lighter ball and focus on speed and control.",
    tipsFa:
      "توپ‌های پزشکی تمرین را سرگرم‌کننده و منفجرکننده می‌کنند. با توپ سبک‌تر شروع کن و روی سرعت و کنترل تمرکز کن.",
  },
  {
    id: "pull_up_bar",
    nameEn: "Pull-Up Bar",
    nameFa: "بارفیکس",
    musclesEn: "Back, biceps, forearms, core",
    musclesFa: "پشت، جلو بازو، ساعد، شکم",
    descriptionEn:
      "A horizontal bar for hanging and pulling your body up. The ultimate upper-body builder — pull-ups and chin-ups develop your back width, arm strength, and grip. Difficult at first but incredibly rewarding.",
    descriptionFa:
      "میله افقی برای آویزان شدن و بالا کشیدن بدن. سازنده نهایی بالاتنه — بارفیکس و چین‌آپ عرض پشت، قدرت بازو و گیره دست را می‌سازند. در ابتدا سخت اما فوق‌العاده ارزشمند هستند.",
    howToUseEn: [
      "Grip the bar slightly wider than shoulder-width, palms facing away",
      "Hang freely with arms fully extended (dead hang)",
      "Pull your chest toward the bar by driving elbows down and back",
      "Lower yourself slowly until arms are fully extended again",
    ],
    howToUseFa: [
      "میله را کمی بیشتر از عرض شانه بگیر، کف دست‌ها رو به بیرون",
      "آزاد آویزان شو با بازوهای کاملاً کشیده (آویزان مرده)",
      "سینه‌ات را به سمت میله بکش با هل دادن آرنج‌ها به پایین و عقب",
      "آرام پایین بیا تا بازوها دوباره کاملاً کشیده شوند",
    ],
    adjustmentsEn: "Grip width, grip type (overhand, neutral, chin-up), added weight",
    adjustmentsFa: "عرض گرفتن، نوع گرفتن (رو، خنثی، چین‌آپ)، وزنه اضافی",
    mistakesEn: [
      "Kipping or swinging — that's not a pull-up, it's a cheat",
      "Half reps — not going to full dead hang at the bottom",
      "Using a resistance band for assistance without progressing over time",
    ],
    mistakesFa: [
      "ترس و بکش — آن بارفیکس نیست، تقلب است",
      "نیم تکرار — نیامدن تا آویزان مرده در پایین",
      "استفاده از بند مقاومتی برای کمک بدون پیشرفت تدریجی",
    ],
    exercisesEn: [
      "Pull-Up",
      "Chin-Up",
      "Dead Hang",
      "Hanging Leg Raise",
      "L-Sit Hold",
      "Neutral-Grip Pull-Up",
    ],
    exercisesFa: [
      "بارفیکس",
      "چین‌آپ",
      "آویزان مرده",
      "بالا بردن پا آویزان",
      "نگه‌داشتن L‌نشسته",
      "بارفیکس گرفتن خنثی",
    ],
    tipsEn:
      "Can't do a pull-up yet? Start with dead hangs and negatives (jump up, lower slowly). You'll get your first one sooner than you think.",
    tipsFa:
      "هنوز نمی‌توانی بارفیکس بزنی؟ با آویزان مرده و نزولی شروع کن (بپر بالا، آرام پایین بیا). اولین بارفیکست را زودتر از آنچه فکر می‌کنی خواهی زد.",
  },
];

export default equipmentGuide;
