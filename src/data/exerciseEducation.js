// ============================================================
// EXERCISE EDUCATION PACK — beginner-focused, coach-voice notes.
// Keyed by exact ExerciseDB catalog name (lowercase).
// Each field: { en, fa }. Extend freely — new entries are picked
// up automatically by EducationPanel (name lookup + fuzzy match).
// Fields:
//   setup     – how to adjust the machine BEFORE starting
//   cues      – form/posture checkpoints during the set
//   rom       – range of motion & tempo
//   breathing – when to inhale/exhale
//   mistakes  – common errors: wrong -> fix
//   safety    – injury-prevention notes
// ============================================================

const E = (data) => data;

export const EDUCATION = {
  // ================= CHEST =================
  "lever chest press": E({
    setup: {
      en: [
        "Adjust the seat so the handles line up with the middle of your chest (not your neck or belly).",
        "Sit fully back — your head, upper back and hips touch the pad.",
        "Plant both feet flat on the floor, about hip-width apart.",
      ],
      fa: [
        "صندلی را جوری تنظیم کن که دسته‌ها در ارتفاع وسط سینه‌ات باشند (نه گردن، نه شکم).",
        "کاملاً به عقب تکیه بده؛ سر، بالای کمر و باسن به پد بچسبد.",
        "دو پا صاف روی زمین، هم‌عرض لگن.",
      ],
    },
    cues: {
      en: [
        "Shoulders DOWN and BACK — pin them to the pad before every rep.",
        "Grip slightly wider than shoulder width; wrists stacked straight over elbows.",
        "Press until arms are almost straight, but don't snap the elbows locked.",
        "Squeeze your chest for a beat at the end of each press.",
      ],
      fa: [
        "سرشانه‌ها پایین و عقب — قبل از هر تکرار آن‌ها را به پد بچسبان.",
        "دست‌ها کمی بازتر از عرض شانه؛ مچ‌ها دقیقاً روی آرنج و صاف.",
        "پرس کن تا نزدیک صاف شدن دست‌ها، ولی آرنج را با ضربه قفل نکن.",
        "در پایان هر پرس یک لحظه سینه را منقبض کن.",
      ],
    },
    rom: {
      en: "Start with elbows around 90° (or a light chest stretch), finish just short of locked elbows. 2 seconds down, no bounce, 1–2 seconds up.",
      fa: "شروع با آرنج حدود ۹۰ درجه (یا کشش ملایم سینه)، پایان کمی قبل از قفل کامل آرنج. ۲ ثانیه پایین، بدون پرش، ۱ تا ۲ ثانیه بالا.",
    },
    breathing: {
      en: "Inhale as the weight comes toward you, exhale as you press away.",
      fa: "وقتی وزنه به سمتت می‌آید دم، وقتی پرس می‌کنی بازدم.",
    },
    mistakes: [
      { wrong: { en: "Elbows flared up level with shoulders", fa: "آرنج‌ها هم‌سطح شانه‌ها بالا می‌روند" }, fix: { en: "Keep elbows ~45° below shoulder line — protects the shoulder joint", fa: "آرنج‌ها حدود ۴۵ درجه زیر خط شانه بمانند — مفصل شانه را محافظت می‌کند" } },
      { wrong: { en: "Hips and back lifting off the pad to push heavier", fa: "بالا رفتن باسن و کمر از پد برای وزنه سنگین‌تر" }, fix: { en: "Lower the weight — if your body moves, it's too heavy", fa: "وزنه را کم کن — اگر بدنت حرکت می‌کند، سنگین است" } },
      { wrong: { en: "Half reps in the middle", fa: "تکرارهای نصفه در وسط مسیر" }, fix: { en: "Use the FULL range slowly; lighter weight, more growth", fa: "کل دامنه را آهسته بزن؛ وزنه سبک‌تر، رشد بیشتر" } },
    ],
    safety: {
      en: [
        "Never let the stack slam down between reps.",
        "Feel a pinch in the front of your shoulder? Reduce depth or weight immediately.",
      ],
      fa: [
        "هرگز بین تکرارها نگذار وزنه با ضربه پایین بیاید.",
        "درختی جلوی سرشانه حس کردی؟ فوراً دامنه یا وزنه را کم کن.",
      ],
    },
  }),

  "lever incline chest press": E({
    setup: {
      en: [
        "Seat height: handles at nipple-to-upper-chest line.",
        "Back pressed fully into the inclined pad; feet planted.",
      ],
      fa: [
        "ارتفاع صندلی: دسته‌ها در خط نوک سینه تا بالای سینه.",
        "کمر کامل به پد شیبدار چسبیده؛ کف پاها ثابت.",
      ],
    },
    cues: {
      en: [
        "This angle targets UPPER chest — think 'press up and slightly together'.",
        "Elbows about 45° from your torso, not wide.",
        "Stop the press just before elbows lock.",
      ],
      fa: [
        "این زاویه سینهٔ بالایی را هدف می‌گیرد — به «پرس به بالا و کمی به هم» فکر کن.",
        "آرنج‌ها حدود ۴۵ درجه نسبت به تنه، نه بازتر.",
        "پرس را کمی قبل از قفل شدن آرنج قطع کن.",
      ],
    },
    rom: {
      en: "Controlled full range: hands from chest level to almost-straight arms. Slow 2-second lowering phase always.",
      fa: "دامنه کامل و کنترل‌شده: دست‌ها از سطح سینه تا تقریباً صاف. مرحله پایین آمدن همیشه ۲ ثانیه‌ای و آهسته.",
    },
    breathing: { en: "Exhale pressing up, inhale lowering.", fa: "هنگام پرس به بالا بازدم، هنگام پایین آوردن دم." },
    mistakes: [
      { wrong: { en: "Sliding hips forward off the seat", fa: "لغزاندن لگن به جلو از روی صندلی" }, fix: { en: "Keep hips glued to the seat corner; drop weight if needed", fa: "لگن به گوشه صندلی چسبیده بماند؛ اگر لازم شد وزنه را کم کن" } },
      { wrong: { en: "Shrugging shoulders up toward ears", fa: "بالا کشیدن شانه‌ها به سمت گوش‌ها" }, fix: { en: "Push shoulders down into the pad throughout", fa: "در تمام حرکت شانه‌ها را داخل پد فشار بده" } },
    ],
    safety: { en: ["Go ~20% lighter than flat chest press at first — incline feels harder."], fa: ["اول ۲۰٪ سبک‌تر از پرس تخت شروع کن — حالت شیبدار سخت‌تر است."] },
  }),

  "lever seated fly": E({
    setup: {
      en: [
        "Set handles at chest height; seat so pads (or handles) are level with your chest.",
        "Slight bend in elbows that stays fixed the whole set.",
      ],
      fa: [
        "دسته‌ها در ارتفاع سینه؛ صندلی طوری که پدها هم‌سطح سینه باشند.",
        "آرنج خمِ ملایمی که در کل ست ثابت می‌ماند.",
      ],
    },
    cues: {
      en: [
        "Hug a big tree: move hands together in an arc, not backward.",
        "Squeeze pecs hard for 1 second where hands meet.",
        "Open slowly — feel the chest stretch, not shoulder pain.",
      ],
      fa: [
        "مثل بغل کردن یک درخت بزرگ: دست‌ها در قوس به هم برسند، نه به عقب.",
        "جایی که دست‌ها به هم می‌رسند ۱ ثانیه سینه را محکم فشار بده.",
        "آرام باز کن — کشش سینه را حس کن، نه درد شانه.",
      ],
    },
    rom: { en: "From a comfortable chest stretch (in front of the body) to hands touching or nearly touching. No leaning forward.", fa: "از یک کشش راحت سینه (جلوی بدن) تا لحظه تماس دست‌ها یا نزدیک آن. بدون خم شدن به جلو." },
    breathing: { en: "Exhale squeezing in, inhale opening out.", fa: "هنگام فشرده‌کردن بازدم، هنگام بازکردن دم." },
    mistakes: [
      { wrong: { en: "Bending/straightening elbows during the rep", fa: "خم و راست کردن آرنج‌ها حین تکرار" }, fix: { en: "Freeze your elbow angle — only the arms' position changes", fa: "زاویه آرنج را منجمد کن — فقط جای دست‌ها عوض شود" } },
      { wrong: { en: "Using shoulders to shove the weight", fa: "استفاده از سرشانه برای هل دادن وزنه" }, fix: { en: "Lighten it; think 'squeeze chest', not 'push handles'", fa: "وزنه را کم کن؛ به «فشار سینه» فکر کن نه «هل دادن دسته»" } },
    ],
    safety: { en: ["Stop at a pain-free stretch — flys stress the shoulder at deep positions."], fa: ["در نقطه بدون درد متوقف شو — حرکات قفسه‌ای در عمق زیاد به شانه فشار می‌آورند."] },
  }),

  "cable standing fly": E({
    setup: {
      en: [
        "Set both pulleys to shoulder/chest height; take one handle in each hand.",
        "Step forward into a staggered stance; small forward lean from the hips.",
      ],
      fa: [
        "هر دو قرقره در ارتفاع شانه/سینه؛ هر دست یک دسته.",
        "یک قدم جلو بیا با پاهای یکی جلو یکی عقب؛ خمِ کمی از لگن به جلو.",
      ],
    },
    cues: {
      en: [
        "Elbows softly bent and LOCKED at that angle.",
        "Bring hands together in front of your belly button / lower chest.",
        "Cross slightly past mid-line for a stronger squeeze.",
      ],
      fa: [
        "آرنج‌ها با خمِ ملایم و «قفل» در همان زاویه.",
        "دست‌ها جلوی ناف یا پایین سینه به هم برسانند.",
        "کمی از خط وسط رد شو برای انقباض قوی‌تر.",
      ],
    },
    rom: { en: "Wide open armpit stretch → hands meeting in front. 2s open, 1s squeeze.", fa: "باز شدن کامل زیربغل → دست‌ها جلوی بدن. ۲ ثانیه باز شدن، ۱ ثانیه فشار." },
    breathing: { en: "Exhale on the squeeze, inhale returning.", fa: "هنگام فشار بازدم، موقع برگشت دم." },
    mistakes: [
      { wrong: { en: "Standing perfectly upright (turns it into a shoulder move)", fa: "ایستادن کاملاً صاف (حرکت تبدیل به سرشانه می‌شود)" }, fix: { en: "Keep the small hip lean for the whole set", fa: "خمِ کوچک لگن در کل ست حفظ شود" } },
      { wrong: { en: "Letting the stack pull your arms back fast", fa: "رها کردن سریع وزنه که دست‌ها را می‌کشد" }, fix: { en: "Resist on the way back — the negative builds muscle too", fa: "برگشت را مقاومت‌دار انجام بده — فاز منفی هم عضله می‌سازد" } },
    ],
    safety: { en: ["Cables pull continuously — never let go with tension on.", "Attach handles securely before starting."], fa: ["سیم‌کش همیشه کشش دارد — هرگز با کششِ فعال رهایش نکن.", "قبل از شروع، اتصال دسته‌ها را چک کن."] },
  }),

  // ================= BACK =================
  "reverse grip machine lat pulldown": E({
    setup: {
      en: [
        "Sit with thighs snug under the knee pads — you shouldn't lift off the seat.",
        "Grab the bar UNDERHAND, hands about shoulder width.",
        "Lean back very slightly (~10°); chest proud.",
      ],
      fa: [
        "بنشین تا ران‌ها زیر پدهای زانو محکم شوند — نباید از صندلی بلند شوی.",
        "میله را از زیر بگیر (دست برعکس)، هم‌عرض شانه.",
        "خیلی کم (~۱۰ درجه) به عقب خم شو؛ سینه باز.",
      ],
    },
    cues: {
      en: [
        "Start each rep by pulling shoulder blades DOWN first, then bend the elbows.",
        "Pull the bar to your upper chest / collarbone line.",
        "Think 'elbows to back pockets' — the biceps help but the BACK does the work.",
        "Underhand grip means biceps assist more — great for beginners learning pulldowns.",
      ],
      fa: [
        "هر تکرار را با پایین کشیدن تیغه‌های شانه شروع کن، بعد آرنج را خم کن.",
        "میله را تا خط بالای سینه / ترقوه بکش.",
        "به «آرنج به سمت جیب عقب» فکر کن — جلوبازو کمک می‌کند ولی کار اصلی با پشت است.",
        "دستِ برعکس یعنی کمک بیشتر جلوبازو — برای یادگیری پول‌داون عالی است.",
      ],
    },
    rom: { en: "Full stretch at the top (let arms straighten, shoulders rise) → bar to collarbone. 2s return.", fa: "کشش کامل در بالا (دست‌ها صاف، شانه‌ها بالا) → میله تا ترقوه. ۲ ثانیه برگشت." },
    breathing: { en: "Exhale pulling down, inhale letting up slowly.", fa: "کشیدن پایین بازدم، بالا آمدن آهسته دم." },
    mistakes: [
      { wrong: { en: "Leaning way back and rowing with momentum", fa: "خم شدن زیاد به عقب و کشیدن با تکان" }, fix: { en: "Torso stays near-vertical; slight lean max", fa: "تنه تقریباً عمودی؛ حداکثر خمِ کم" } },
      { wrong: { en: "Pulling with bent wrists / forearms doing everything", fa: "کشیدن با مچ خم / کار اصلی ساعد" }, fix: { en: "Hook the bar like a hook — relax grip, drive ELBOWS down", fa: "میله مثل قلاب بگیر — گریپ آزاد، آرنج‌ها را پایین بران" } },
      { wrong: { en: "Yanking the stack fast", fa: "پرتابی کشیدن وزنه" }, fix: { en: "1s pull, 1s squeeze, 2s return", fa: "۱ ثانیه کشش، ۱ ثانیه انقباض، ۲ ثانیه برگشت" } },
    ],
    safety: { en: ["Don't let the bar fly up — control it to full stretch.", "If shoulders roll forward at the top, reduce the stretch slightly."], fa: ["بگذار میله با شتاب بالا نرود — تا کشش کامل کنترلش کن.", "اگر در بالا شانه‌ها به جلو غلتیدند، کشش را کمتر کن."] },
  }),

  "lever front pulldown": E({
    setup: {
      en: ["Thighs locked under pads; grab bar OVERHAND, slightly wider than shoulders.", "Chest lifted, tiny backward lean."],
      fa: ["ران‌ها زیر پدها قفل؛ میله از رو بگیر، کمی بازتر از شانه.", "سینه بالا، خمِ بسیار کم به عقب."],
    },
    cues: {
      en: ["Drive ELBOWS down and slightly back.", "Bar path: down to upper chest.", "Pause 1 second with blades squeezed at the bottom."],
      fa: ["آرنج‌ها را پایین و کمی عقب بران.", "مسیر میله: تا بالای سینه.", "در پایین ۱ ثانیه با تیغه‌های جمع‌شده مکث کن."],
    },
    rom: { en: "Arms fully straight at top → bar at upper chest. Full stretch matters for lats!", fa: "بالای حرکت دست‌ها کاملاً صاف → میله تا بالای سینه. کشش کامل برای زیربغل خیلی مهم است!" },
    breathing: { en: "Exhale down, inhale up.", fa: "پایین بازدم، بالا دم." },
    mistakes: [
      { wrong: { en: "Too wide a grip (shoulder risk)", fa: "گریپ خیلی باز (ریسک شانه)" }, fix: { en: "Just outside shoulder width is plenty", fa: "کمی بازتر از شانه کافی است" } },
      { wrong: { en: "Half reps, never straightening arms", fa: "تکرار نیمه، هیچ‌وقت دست‌ها صاف نمی‌شود" }, fix: { en: "Straighten fully each rep for lat stretch", fa: "هر تکرار دست‌ها را کامل صاف کن برای کشش زیربغل" } },
    ],
    safety: { en: ["Keep wrists firm and straight.", "Warm up with 1 lighter set before working sets."], fa: ["مچ‌ها محکم و صاف بمانند.", "قبل از ست‌های اصلی با یک ست سبک‌تر گرم کن."] },
  }),

  "lever seated row": E({
    setup: {
      en: [
        "Seat height so the handle is at lower-chest level and arms can extend straight.",
        "Feet on footplates, soft knees; sit tall.",
      ],
      fa: [
        "ارتفاع صندلی طوری که دسته هم‌سطح پایین سینه باشد و دست‌ها کاملاً صاف شوند.",
        "پاها روی صفحه‌ها، زانو کمی باز؛ قدبلند بنشین.",
      ],
    },
    cues: {
      en: [
        "Do NOT lean back far — torso maybe 10–15° from vertical.",
        "Pull handle to your NAVEL, not your chin.",
        "Finish by squeezing shoulder blades together like holding a pencil between them.",
      ],
      fa: [
        "زیاد به عقب تکیه نده — تنه حداکثر ۱۰ تا ۱۵ درجه.",
        "دسته را تا «ناف» بکش، نه تا چانه.",
        "در پایان تیغه‌های شانه را مثل نگه داشتن یک مداد بینشان فشار بده.",
      ],
    },
    rom: { en: "Arms fully extended forward (upper back stretches) → handle to navel with 1s squeeze. Slow return.", fa: "دست‌ها کاملاً جلو (کشش پشت بالا) → دسته تا ناف با ۱ ثانیه فشار. برگشت آهسته." },
    breathing: { en: "Exhale pulling in, inhale extending out.", fa: "کشیدن بازدم، باز کردن دم." },
    mistakes: [
      { wrong: { en: "Rocking back and forth like a rowing boat", fa: "تلوتلو دادن بدن مثل قایق‌رانی" }, fix: { en: "Brace abs; only ARMS and shoulder blades move", fa: "شکم را سفت کن؛ فقط دست‌ها و تیغه‌های شانه حرکت کنند" } },
      { wrong: { en: "Shrugging shoulders to ears during pull", fa: "بالا آوردن شانه‌ها هنگام کشش" }, fix: { en: "Keep shoulders down; lead with elbows", fa: "شانه‌ها پایین؛ با آرنج شروع کن" } },
    ],
    safety: { en: ["Keep lower-back neutral — never round then pull heavy.", "Knees stay softly bent all set."], fa: ["کمر در حالت خنثی — هرگز خم بعد وزنه سنگین.", "زانوها در کل ست کمی باز."] },
  }),

  "assisted pull-up": E({
    setup: {
      en: [
        "Set the assistance HIGH at first (more help). Kneel or stand on the pad/platform.",
        "Grip bar OVERHAND, slightly wider than shoulders.",
      ],
      fa: [
        "اول کمک دستگاه را زیاد بگذار (کمک بیشتر). زانو یا پا روی پد/سکو.",
        "میله از رو، کمی بازتر از شانه گرفته شود.",
      ],
    },
    cues: {
      en: [
        "Start from FULL hang with shoulders active (not shrugged to ears).",
        "Pull until chin clears the bar; imagine elbows to the floor.",
        "Lower yourself SLOWLY — most people skip this half of the exercise.",
      ],
      fa: [
        "از آویزان کامل شروع کن با شانه‌های فعال (نریخته به گوش).",
        "تا جایی که چانه از میله رد شود بکش؛ تصور کن آرنج‌ها به زمین می‌روند.",
        "پایین آمدن را «آهسته» انجام بده — بیشتر مردم نیمی از حرکت را حذف می‌کنند.",
      ],
    },
    rom: { en: "Dead hang → chin over bar. Over weeks, gradually REDUCE assistance to get stronger.", fa: "آویزان کامل → چانه از میله. در طول هفته‌ها کمک دستگاه را کم کم «کاهش» بده تا قوی‌تر شوی." },
    breathing: { en: "Exhale pulling up, inhale lowering.", fa: "بالا کشیدن بازدم، پایین آمدن دم." },
    mistakes: [
      { wrong: { en: "Kipping/swinging legs", fa: "تکان دادن پاها برای بالا رفتن" }, fix: { en: "Cross ankles, brace abs, strict pulls", fa: "مچ پاها ضربدری، شکم سفت، کشش تمیز" } },
      { wrong: { en: "Too much assistance forever", fa: "همیشه کمک زیاد" }, fix: { en: "Every 1–2 weeks try less help; even 1 extra rep matters", fa: "هر ۱–۲ هفته کمک را کمتر کن؛ حتی یک تکرار بیشتر ارزشمند است" } },
    ],
    safety: { en: ["Step off carefully — pad pushes up!", "Skip if shoulder pain; do lat pulldown instead."], fa: ["پیاده شدن با احتیاط — پد فشار به بالا دارد!", "اگر درد شانه داری انجام نده؛ پول‌داون جایگزین است."] },
  }),

  "lever shrug": E({
    setup: { en: ["Stand at the machine, handles at your sides, arms straight.", "Feet hip-width, abs braced."], fa: ["جلوی دستگاه بایست، دسته‌ها کنار بدن، دست‌ها صاف.", "پاها هم‌عرض لگن، شکم سفت."] },
    cues: {
      en: ["Shrug STRAIGHT UP toward your ears — like asking 'I don't know'.", "Hold the top for 1–2 seconds.", "Arms stay straight the whole time — this is a trap move, not an arm move."],
      fa: ["سرشانه‌ها «مستقیم بالا» به سمت گوش‌ها — مثل وقتی می‌گویی نمی‌دانم.", "۱ تا ۲ ثانیه بالا نگه دار.", "دست‌ها در کل حرکت صاف — این حرکت ذوزنقه است نه بازو."],
    },
    rom: { en: "Arms hanging → shoulders at ears → slow lower to full stretch. Small range, big squeezes.", fa: "دست‌ها آویزان → شانه‌ها تا گوش → پایین آمدن آهسته تا کشش کامل. دامنه کوچک، انقباض بزرگ." },
    breathing: { en: "Exhale shrugging up, inhale lowering.", fa: "بالا بردن بازدم، پایین آوردن دم." },
    mistakes: [
      { wrong: { en: "Rolling shoulders backward in circles", fa: "چرخاندن شانه‌ها به صورت دایره‌ای به عقب" }, fix: { en: "Straight up-and-down only — rolling adds nothing", fa: "فقط مستقیم بالا و پایین — چرخاندن فایده ندارد" } },
      { wrong: { en: "Bending elbows to lift", fa: "خم کردن آرنج برای بلند کردن" }, fix: { en: "Arms are ropes; only shoulders climb", fa: "دست‌ها مثل طناب؛ فقط شانه بالا می‌رود" } },
    ],
    safety: { en: ["Lighter than you think — traps respond to squeezes not ego weight."], fa: ["سبک‌تر از تصورت — ذوزنقه به انقباض جواب می‌دهد نه وزنه غرورآمیز."] },
  }),

  // ================= SHOULDERS =================
  "lever shoulder press": E({
    setup: {
      en: [
        "Seat so handles are at EAR / top-of-shoulder height.",
        "Back and head against the pad; core braced.",
      ],
      fa: [
        "صندلی طوری که دسته‌ها هم‌سطح «گوش» یا بالای شانه باشند.",
        "کمر و سر به پد؛ شکم سفت.",
      ],
    },
    cues: {
      en: [
        "Press UP and slightly IN (handles end above shoulders, not colliding).",
        "Wrists stacked over elbows at the start.",
        "Ribs DOWN — don't arch lower back to cheat the press.",
      ],
      fa: [
        "به بالا و کمی به داخل پرس کن (دسته‌ها بالای شانه تمام شوند، نه برخورد).",
        "شروع: مچ دقیقاً روی آرنج.",
        "دنده‌ها پایین — برای تقلب کمر را قوس نده.",
      ],
    },
    rom: { en: "Handles at ear level → arms almost straight overhead. Don't clank the stack at the bottom.", fa: "دسته‌ها هم‌سطح گوش → دست‌ها تقریباً صاف بالای سر. وزنه در پایین با ضربه نخورد." },
    breathing: { en: "Exhale pressing up; inhale lowering to ear level.", fa: "پرس بازدم؛ پایین تا سطح گوش دم." },
    mistakes: [
      { wrong: { en: "Lower back arching off the pad", fa: "گرفتن قوس کمر و جدا شدن از پد" }, fix: { en: "Tighten abs, tilt pelvis slightly; reduce weight", fa: "شکم را سفت کن، لگن کمی بچرخان؛ وزنه کمتر" } },
      { wrong: { en: "Pressing in front of the face with flared elbows", fa: "پرس جلوی صورت با آرنج باز" }, fix: { en: "Elbows under wrists, track slightly forward of shoulders", fa: "آرنج زیر مچ، کمی جلوی خط شانه" } },
    ],
    safety: { en: ["Neck pain means seat is too low — raise it.", "Head stays on the pad."], fa: ["درد گردن یعنی صندلی کم است — بالا ببر.", "سر روی پد بماند."] },
  }),

  "lever lateral raise": E({
    setup: { en: ["Pads/handles at hip level; stand or sit tall with slight forward lean.", "Soft, almost straight elbows."], fa: ["پدها/دسته‌ها هم‌سطح لگن؛ ایستاده یا نشسته با خمِ کمی به جلو.", "آرنج‌ها نرم و تقریباً صاف."] },
    cues: {
      en: [
        "Raise out to the side leading with ELBOWS, hands just follow.",
        "Stop at shoulder height (arms parallel to floor).",
        "Pinkies slightly higher than thumbs on the way up (like pouring water).",
      ],
      fa: [
        "به طرفین با «رهبری آرنج» بالا ببر، دست فقط همراهی می‌کند.",
        "در ارتفاع شانه توقف (بازو موازی زمین).",
        "در مسیر بالا انگشت کوچک کمی بالاتر از شست (مثل ریختن آب از بطری).",
      ],
    },
    rom: { en: "Hands at hips → parallel to floor → 3s lower. Lighter than you think — these are small muscles.", fa: "دست‌ها کنار لگن → موازی زمین → ۳ ثانیه پایین. سبک‌تر از تصورت — عضلات کوچکی‌اند." },
    breathing: { en: "Exhale raising, inhale lowering slowly.", fa: "بالا بردن بازدم، پایین آوردن آهسته دم." },
    mistakes: [
      { wrong: { en: "Swinging weights up with body english", fa: "پرتابی بالا بردن با تکان بدن" }, fix: { en: "If you must swing, halve the weight", fa: "اگر تکان می‌خوری، وزنه را نصف کن" } },
      { wrong: { en: "Raising above shoulder height", fa: "بالاتر از سطح شانه بردن" }, fix: { en: "Above parallel = traps take over + impingement risk", fa: "بالاتر از موازی = گرفتن کار توسط ذوزنقه + ریسک گیرافتادن شانه" } },
    ],
    safety: { en: ["Sharp pinch at top of movement = stop, reduce range."], fa: ["سوزش تیز در بالای حرکت = توقف، کاهش دامنه."] },
  }),

  "lever seated reverse fly": E({
    setup: {
      en: [
        "Face the machine; chest against the pad, or sit leaning forward over thighs.",
        "Handles set to meet in FRONT of you at start.",
      ],
      fa: [
        "روبه‌روی دستگاه؛ سینه به پد، یا نشسته با خم به جلو روی ران‌ها.",
        "دسته‌ها طوری که ابتدا جلوی بدن به هم برسند.",
      ],
    },
    cues: {
      en: [
        "Target = REAR shoulders & upper back (posture muscles!).",
        "Open arms wide leading with pinkies, elbows soft.",
        "Squeeze blades together 1s at the widest point.",
      ],
      fa: [
        "هدف = سرشانه «عقب» و بالای پشت (عضلات وضعیت بدن!).",
        "بازوها را باز کن، با انگشت کوچک جلوتر، آرنج نرم.",
        "در بازترین نقطه ۱ ثانیه تیغه‌ها را به هم فشار بده.",
      ],
    },
    rom: { en: "Hands together in front → wide open at shoulder height → slow close. Tiny weights win here.", fa: "دست‌ها جلو → باز کامل در ارتفاع شانه → بستن آهسته. اینجا وزنه‌های کوچک برنده‌اند." },
    breathing: { en: "Exhale opening, inhale closing.", fa: "باز کردن بازدم، بستن دم." },
    mistakes: [
      { wrong: { en: "Going heavy and shrugging", fa: "وزنه سنگین و بالا انداختن شانه" }, fix: { en: "Shoulders stay down-away from ears", fa: "شانه‌ها از گوش دور و پایین بمانند" } },
      { wrong: { en: "Lifting chest off the pad", fa: "جداشدن سینه از پد" }, fix: { en: "Body fixed; only arms sweep open", fa: "بدن ثابت؛ فقط بازوها باز می‌شوند" } },
    ],
    safety: { en: ["These muscles are usually weak in beginners — expect humble weights."], fa: ["این عضلات در تازه‌کارها معمولاً ضعیف‌اند — وزنه‌های متواضع انتظار بکش."] },
  }),

  // ================= ARMS =================
  "lever bicep curl": E({
    setup: { en: ["Seat so arm pads hug the back of your arms with elbows aligned to the machine's pivot.", "Grasp handles, palms up."], fa: ["صندلی طوری که پدها پشت بازوها را بگیرند و آرنج با محور دستگاه هم‌راستا شود.", "دسته‌ها را بگیر، کف دست‌ها رو به بالا."] },
    cues: {
      en: [
        "Elbows PINNED to the pad — they never travel.",
        "Curl up, squeeze at top WITHOUT letting elbows slide forward.",
        "Lower SLOWLY to almost-straight (keep a hair of bend).",
      ],
      fa: [
        "آرنج‌ها «میخ‌کوب شده» به پد — هیچ جابه‌جا نمی‌شوند.",
        "بالا بکش و در بالا فشار بده بدون اینکه آرنج‌ها جلو بلغزند.",
        "آهسته پایین تا تقریباً صاف (یک تار خم بماند).",
      ],
    },
    rom: { en: "Almost straight → fully curled. The slow LOWERING is where biceps grow.", fa: "تقریباً صاف → خمش کامل. پایین آمدنِ آهسته همان‌جایی است که جلوبازو رشد می‌کند." },
    breathing: { en: "Exhale curling up, inhale lowering.", fa: "بالا کشیدن بازدم، پایین آوردن دم." },
    mistakes: [
      { wrong: { en: "Hips sliding forward / back arching to finish reps", fa: "لغزش لگن / قوس کمر برای تمام کردن تکرارها" }, fix: { en: "Butt stays planted; last honest rep ends the set", fa: "باسن ثابت؛ آخرین تکرارِ تمیز پایان ست است" } },
      { wrong: { en: "Half-bottom reps (never straightening)", fa: "نیمه‌پایینی (هرگز صاف نمی‌شود)" }, fix: { en: "Full stretch each rep — it builds the muscle's long head", fa: "هر تکرار کشش کامل — سر طولانی عضله را می‌سازد" } },
    ],
    safety: { en: ["Wrist discomfort? Try a slightly looser grip."], fa: ["اگر مچ اذیت شد، گریپ را کمی شل‌تر بگیر."] },
  }),

  "cable curl": E({
    setup: { en: ["Low pulley with straight/EZ bar; stand facing it, one step back.", "Overhand-under grip: palms up, hands shoulder width."], fa: ["قرقره پایین با میله صاف/EZ؛ روبه‌رویش بایست، یک قدم عقب.", "کف دست‌ها بالا، دست‌ها هم‌عرض شانه."] },
    cues: {
      en: ["Elbows glue to your SIDES all set.", "Curl toward shoulders; squeeze 1s at top.", "Resist the cable pulling arms down — 2–3s negative.", "Constant tension: cables never let the muscle rest."],
      fa: ["آرنج‌ها در کل ست به پهلوها چسبیده.", "تا سینه/شانه بکش؛ ۱ ثانیه بالا فشار.", "مقاومت کن که سیم‌کش دست‌ها را نکشد — ۲ تا ۳ ثانیه منفی.", "کشش دائمی: سیم‌کش هرگز به عضله استراحت نمی‌دهد."],
    },
    rom: { en: "Full straight arms → bar to shoulder height, body rock-still.", fa: "دست کاملاً صاف → میله تا ارتفاع شانه، بدن مثل مجسمه." },
    breathing: { en: "Exhale curling, inhale resisting down.", fa: "بالا کشیدن بازدم، مقاومت در پایین دم." },
    mistakes: [
      { wrong: { en: "Elbows drifting forward at the top", fa: "رفتن آرنج‌ها به جلو در بالا" }, fix: { en: "Pin them; shorten the range if needed", fa: "محکم سر جایشان؛ اگر لازم شد دامنه را کم کن" } },
      { wrong: { en: "Leaning back to heave the bar", fa: "عقب خم شدن برای پرتاب میله" }, fix: { en: "Abs tight, ribs down, honest weight", fa: "شکم سفت، دنده‌ها پایین، وزنه صادقانه" } },
    ],
    safety: { en: ["Step back from stack so plates can't land on feet if grip slips."], fa: ["یک قدم از وزنه‌ها فاصله بگیر تا اگر دست لغزید پلیت روی پایت نیفتد."] },
  }),

  "cable hammer curl (with rope)": E({
    setup: { en: ["Rope on low pulley; hold ends with THUMBS UP (neutral grip).", "Staggered stance, abs braced."], fa: ["طناب روی قرقره پایین؛ دو سر طناب با «شست رو به بالا» بگیر.", "پاها یکی جلو یکی عقب، شکم سفت."] },
    cues: {
      en: [
        "Neutral grip trains brachialis → thicker-looking arms.",
        "Curl rope ends toward YOUR SHOULDERS (not chin).",
        "Elbows pinned to sides; zero swinging.",
      ],
      fa: [
        "گریپ خنثی عضله براکیالیس را تمرین می‌دهد → بازو ضخیم‌تر دیده می‌شود.",
        "سرهای طناب را به سمت «شانه‌های خودت» بکش (نه چانه).",
        "آرنج‌ها چسبیده به پهلو؛ صفر تکان.",
      ],
    },
    rom: { en: "Straight arms → rope ends beside shoulders. Slow 3s return fights the cable.", fa: "دست صاف → سر طناب کنار شانه. ۳ ثانیه برگشت آهسته در برابر سیم‌کش." },
    breathing: { en: "Exhale up, inhale down.", fa: "بالا بازدم، پایین دم." },
    mistakes: [
      { wrong: { en: "Turning it into a row by pulling elbows back", fa: "تبدیل به زیربغل با عقب بردن آرنج" }, fix: { en: "Upper arms frozen vertical", fa: "بازو کاملاً عمودی و ثابت" } },
    ],
    safety: { en: ["Great first cable exercise — very forgiving. Start light, learn the tension."], fa: ["عالی برای اولین تجربه سیم‌کش — بسیار بخشنده. سبک شروع کن، کشش را یاد بگیر."] },
  }),

  "cable pushdown": E({
    setup: { en: ["Bar/rope on HIGH pulley. Stand tall, small lean forward, feet hip-width.", "Elbows bent ~90° at start, glued to sides."], fa: ["میله/طناب روی قرقره بالا. قدبلند بایست، خمِ کم جلو، پاها هم‌عرض لگن.", "شروع با آرنج ~۹۰ درجه، چسبیده به پهلو."] },
    cues: {
      en: [
        "UPPER arms frozen at your sides — only FOREARMS move.",
        "Push down until arms fully straight; squeeze triceps 1s.",
        "Let the bar rise ONLY to elbow-height 90°.",
      ],
      fa: [
        "بازو «منجمد» کنار بدن — فقط «ساعد» حرکت می‌کند.",
        "پایین فشار بده تا دست کاملاً صاف؛ ۱ ثانیه سه‌سر را فشار بده.",
        "میله فقط تا زاویه ۹۰ درجه آرنج بالا بیاید.",
      ],
    },
    rom: { en: "90° elbow bend → full lockout → controlled return to 90°. Body upright, no diving.", fa: "آرنج ۹۰ درجه → قفل کامل → برگشت کنترل‌شده به ۹۰. بدن صاف، بدون شیرجه." },
    breathing: { en: "Exhale pushing down, inhale letting up.", fa: "فشار پایین بازدم، اجازه بالا آمدن دم." },
    mistakes: [
      { wrong: { en: "Elbows flying forward/backward turning it into a dip-row hybrid", fa: "پریدن آرنج به جلو/عقب و ترکیبی شدن حرکت" }, fix: { en: "Imagine elbows pinned between two boards", fa: "تصور کن آرنج‌ها بین دو تخته گیر کرده‌اند" } },
      { wrong: { en: "Leaning heavily over the bar to press with bodyweight", fa: "خم شدن زیاد روی میله و پرس با وزن بدن" }, fix: { en: "Upright torso; smaller weight, pure triceps", fa: "تنه صاف؛ وزنه کمتر، فقط سه‌سر" } },
    ],
    safety: { en: ["Perfect beginner triceps move — safe joints, clear feedback."], fa: ["بهترین حرکت سه‌سر برای تازه‌کار — مفاصل امن، بازخورد واضح."] },
  }),

  "lever triceps extension": E({
    setup: { en: ["Seat/pads so upper arms rest on the pad, elbows at the pivot.", "Handles gripped, palms facing each other."], fa: ["صندلی/پد طوری که بازو روی پد باشد و آرنج روی محور دستگاه.", "دسته‌ها گرفته شود، کف دست‌ها رو به هم."] },
    cues: { en: ["Extend to FULL straight arms; squeeze 1s.", "Upper arms never leave the pad.", "Return slowly until elbows reach ~90°."], fa: ["تا «صاف کامل» باز کن؛ ۱ ثانیه فشار.", "بازو هرگز از پد جدا نمی‌شود.", "آهسته برگرد تا آرنج ~۹۰ درجه."] },
    rom: { en: "~90° → full extension → slow back. Machine keeps it honest.", fa: "~۹۰ درجه → صاف کامل → برگشت آهسته. دستگاه مسیر را درست نگه می‌دارد." },
    breathing: { en: "Exhale extending, inhale returning.", fa: "باز کردن بازدم، برگشت دم." },
    mistakes: [{ wrong: { en: "Hunching shoulders up during press", fa: "بالا انداختن شانه‌ها حین پرس" }, fix: { en: "Relaxed neck, shoulders down", fa: "گردن آزاد، شانه‌ها پایین" } }],
    safety: { en: ["Elbow tweak? Reduce weight and range slightly — never force lockout with pain."], fa: ["آرنج اذیت شد؟ وزنه و دامنه را کمی کم کن — با درد هرگز قفل نکن."] },
  }),

  "lever seated dip": E({
    setup: { en: ["Back against pad, grips at sides level with lower chest.", "Feet flat, core tight."], fa: ["کمر به پد، دسته‌ها کنار بدن هم‌سطح پایین سینه.", "کف پا صاف، شکم سفت."] },
    cues: { en: ["Machine-guided dips target triceps safely.", "Press down/forward to straight arms, squeeze.", "Control the return — don't let pads slam you."], fa: ["دیپ دستگاه‌ی به شکل امن سه‌سر را هدف می‌گیرد.", "به پایین/جلو فشار تا صافی دست، فشار انقباضی.", "برگشت کنترل‌شده — بگذار پد توپرتابت نکند."] },
    rom: { en: "Deep enough to feel triceps stretch, out to straight arms.", fa: "به عمقی که کشش سه‌سر حس شود، تا صاف شدن دست." },
    breathing: { en: "Exhale pressing, inhale returning.", fa: "پرس بازدم، برگشت دم." },
    mistakes: [{ wrong: { en: "Shrugging while pressing", fa: "بالا رفتن شانه‌ها هنگام پرس" }, fix: { en: "Neck long, shoulders down-away", fa: "گردن کشیده، شانه‌ها پایین و دور" } }],
    safety: { en: ["Shoulder-friendly alternative to bar dips."], fa: ["جایگزین امن دیپ میله برای شانه."] },
  }),

  // ================= LEGS =================
  "lever leg extension": E({
    setup: {
      en: [
        "Seat so knees line up exactly with the machine's pivot point.",
        "Ankle pad rests ON the shin just ABOVE the foot (not on the foot itself).",
        "Sit back fully; grab side handles.",
      ],
      fa: [
        "صندلی طوری که زانو دقیقاً با محور چرخشی دستگاه هم‌راستا شود.",
        "پد مچ روی ساق و کمی «بالای مچ پا» باشد (نه روی پنجه).",
        "کامل تکیه بده؛ دسته‌های کناری را بگیر.",
      ],
    },
    cues: {
      en: [
        "Kick up until legs are STRAIGHT, toes pulled toward shin.",
        "Squeeze quads hard 1 second at the top.",
        "Lower in 2–3 seconds — resist, don't drop.",
      ],
      fa: [
        "پاها را تا «صاف کامل» بالا ببر، پنجه‌ها به سمت ساق کشیده.",
        "در بالا ۱ ثانیه چهارسر را محکم فشار بده.",
        "در ۲ تا ۳ ثانیه پایین بیاور — مقاومت کن، ول نکن.",
      ],
    },
    rom: { en: "Start ~90° (or slight more) → full straight → slow return. Pause at BOTH ends.", fa: "شروع ~۹۰ درجه (یا کمی بیشتر) → صاف کامل → برگشت آهسته. در دو سر مکث." },
    breathing: { en: "Exhale kicking up, inhale lowering.", fa: "بالا بردن بازدم، پایین آوردن دم." },
    mistakes: [
      { wrong: { en: "Swinging weight with hip thrust / grabbing and lifting hips", fa: "پرش وزنه با هل لگن / بالا آوردن لگن با دسته‌ها" }, fix: { en: "Hips glued to seat; honest weight", fa: "لگن به صندلی چسبیده؛ وزنه صادقانه" } },
      { wrong: { en: "Letting stack crash at the bottom", fa: "خوردن وزنه‌ها به هم در پایین" }, fix: { en: "Touch lightly, keep tension, go again", fa: "سبک مماس شود، کشش نقطع نشود، ادامه بده" } },
    ],
    safety: {
      en: ["Knee pain (not muscle burn) = stop; check pad position or reduce weight.", "Great starter quad builder — very safe when done controlled."],
      fa: ["درد زانو (نه سوزش عضله) = توقف؛ جای پد یا وزنه را بررسی کن.", "عالی برای شروع چهارسر — با اجرای کنترل‌شده کاملاً امن است."],
    },
  }),

  "lever lying leg curl": E({
    setup: {
      en: [
        "Lie face down; ankle pad on the lower calf, NOT the Achilles tendon.",
        "Kneecap just off the edge of the bench; hips DOWN.",
        "Grip the handles to anchor your body.",
      ],
      fa: [
        "رو به پایین بخواب؛ پد مچ روی پایین ساق، نه روی تاندون آشیل.",
        "کاسه زانو کمی بیرون لبه تخت؛ لگن «پایین».",
        "دسته‌ها را بگیر تا بدنت ثابت شود.",
      ],
    },
    cues: {
      en: [
        "Curl heels toward your GLUTES (not straight up).",
        "Hips stay glued down — lifting them cheats and strains.",
        "Toes pointed (plantarflexed) increases hamstring work.",
      ],
      fa: [
        "پاشنه‌ها را به سمت «باسن» بکش (نه مستقیم بالا).",
        "لگن چسبیده پایین — بالا آمدنش تقلب و فشار است.",
        "پنجه کشیده (به پایین) کار همسترینگ را بیشتر می‌کند.",
      ],
    },
    rom: { en: "Legs straight → heels to glutes → 2–3s lower. Squeeze hamstrings at the top.", fa: "پاها صاف → پاشنه به باسن → ۲ تا ۳ ثانیه پایین. در بالا همسترینگ را فشار بده." },
    breathing: { en: "Exhale curling up, inhale lowering.", fa: "بالا کشیدن بازدم، پایین آوردن دم." },
    mistakes: [
      { wrong: { en: "Hips popping up as heels rise", fa: "بالا پریدن لگن وقتی پاشنه بالا می‌رود" }, fix: { en: "Drop the weight; press hips into bench", fa: "وزنه را کم کن؛ لگن را به تخت فشار بده" } },
      { wrong: { en: "Neck craned up", fa: "گردن بالا و کشیده" }, fix: { en: "Face down, cheek on bench, relaxed neck", fa: "صرو رو به پایین، گونه روی تخت، گردن آزاد" } },
    ],
    safety: { en: ["Cramp in hamstrings? Common at first — stretch gently between sets."], fa: ["گرفتگی همسترینگ؟ اولش رایج است — بین ست‌ها ملایم کشش بده."] },
  }),

  "lever seated leg curl": E({
    setup: { en: ["Sit with back against pad; legs under ankle roller, pads on lower calf.", "Thigh pad (if present) locks legs down."], fa: ["کمر به پد بنشین؛ پاها زیر غلتک مچ، پدها روی ساق پایین.", "پد ران (اگر داشت) ران‌ها را ثابت کند."] },
    cues: { en: ["Pull heels DOWN and UNDER the seat toward glutes.", "Point toes; squeeze hamstrings 1s.", "Slow return, keep tension."], fa: ["پاشنه‌ها را «پایین و زیر» صندلی به سمت باسن بکش.", "پنجه کشیده؛ ۱ ثانیه فشار همسترینگ.", "برگشت آهسته، بدون قطع کشش."] },
    rom: { en: "Legs nearly straight → heels pulled fully under → controlled out.", fa: "پاها تقریباً صاف → پاشنه کاملاً زیر کشیده → خروج کنترل‌شده." },
    breathing: { en: "Exhale pulling under, inhale returning.", fa: "کشیدن زیر بازدم، برگشت دم." },
    mistakes: [{ wrong: { en: "Rounding back and lifting chest to help", fa: "گِرد کردن کمر و بالا بردن سینه برای کمک" }, fix: { en: "Sit tall; this is legs-only", fa: "قدبلند بنشین؛ اینجا فقط پاها کار می‌کنند" } }],
    safety: { en: ["Often MORE comfortable than lying curl for beginners."], fa: ["برای تازه‌کارها معمولاً «راحت‌تر» از حالت خوابیده است."] },
  }),

  "lever kneeling leg curl": E({
    setup: { en: ["Kneel on the pad as designed; one leg at a time into the roller.", "Core braced, hands gripping handles."], fa: ["طبق طراحی دستگاه روی پد زانو بزن؛ پا یکی‌یکی در غلتک.", "شکم سفت، دست‌ها روی دسته‌ها."] },
    cues: { en: ["Single-leg focus — great for fixing imbalances.", "Curl heel to glute; no twisting hips.", "Match reps both sides."], fa: ["تمرکز تک‌پا — برای اصلاح عدم تعادل عالی.", "پاشنه به باسن؛ چرخش لگن ممنوع.", "تعداد تکرار دو طرف برابر."] },
    rom: { en: "Straight → heel to glute → slow. Same tempo both legs.", fa: "صاف → پاشنه به باسن → آهسته. تمپو یکسان هر دو پا." },
    breathing: { en: "Exhale curl, inhale return.", fa: "خمش بازدم، برگشت دم." },
    mistakes: [{ wrong: { en: "Rotating torso toward working leg", fa: "چرخش تنه به سمت پای در حال کار" }, fix: { en: "Square hips the entire rep", fa: "لگن در تمام تکرار روبه‌جلو" } }],
    safety: { en: ["Start with the WEAKER leg; match its reps with the strong one."], fa: ["با پای «ضعیف‌تر» شروع کن؛ پای قوی هم به همان تعداد."] },
  }),

  "smith squat": E({
    setup: {
      en: [
        "Bar on your TRAPS (shelf of muscle on upper back), NOT your neck.",
        "Hands just outside shoulders; elbows pointing down.",
        "Feet slightly FORWARD of the bar (~15–20 cm) — lets you sit back safely.",
        "Rotate the bar to unhook; hooks behind you catch it again at the end.",
      ],
      fa: [
        "میله روی «تراپس» (قله عضلانی بالای کمر)، نه روی گردن!",
        "دست‌ها کمی بازتر از شانه؛ آرنج‌ها رو به پایین.",
        "پاها کمی «جلوتر» از میله (~۱۵ تا ۲۰ سانت) — تا بتوانی امن به عقب بنشینی.",
        "با چرخاندن میله از قلاب دربیاور؛ در پایان دوباره قلاب کن.",
      ],
    },
    cues: {
      en: [
        "Chest up, eyes forward; brace abs like expecting a poke.",
        "Sit BACK and DOWN between your heels — knees track over toes.",
        "Depth: thighs about parallel to floor is plenty at first.",
        "Heels stay FLAT the whole rep.",
      ],
      fa: [
        "سینه بالا، نگاه جلو؛ شکم سفت مثل اینکه قرار است ضربه بخوری.",
        "به «عقب و پایین» بین پاشنه‌ها بنشین — زانوها در راستای پنجه.",
        "عمق: اول همین که ران‌ها حدوداً موازی زمین شوند کافی است.",
        "پاشنه‌ها در کل تکرار «چسبیده به زمین».",
      ],
    },
    rom: { en: "Standing tall → sit back to ~parallel → drive through whole foot to stand. 2s down, powerful up.", fa: "ایستاده کامل → نشستن به موازی زمین → با فشار تمام کف پا بلند شو. ۲ ثانیه پایین، قدرتمند بالا." },
    breathing: { en: "Big breath IN at the top, hold briefly while descending (brace!), exhale past the hardest point.", fa: "در بالا نفس «عمیق» بگیر، موقع پایین رفتن لحظه‌ای نگه دار (بریس!)، از سخت‌ترین نقطه که رد شدی بازدم." },
    mistakes: [
      { wrong: { en: "Bar resting on the NECK", fa: "میله روی «گردن»" }, fix: { en: "Pain = wrong spot; re-rack onto the muscle shelf", fa: "درد = جای اشتباه؛ دوباره روی قله عضله بگذار" } },
      { wrong: { en: "Heels lifting / knees caving inward", fa: "بالا آمدن پاشنه / جمع شدن زانوها به داخل" }, fix: { en: "Push knees OUT over pinky toes; lighter load", fa: "زانوها را «بیرون» به سمت انگشت کوچک فشار بده؛ وزنه کمتر" } },
      { wrong: { en: "Quarter-depth ego squats", fa: "اسکوات‌های ربع عمق" }, fix: { en: "Own your depth: parallel with control beats deep-and-sloppy", fa: "عمقت را مالک شو: موازی با کنترل از عمقِ بی‌فرم بهتر است" } },
    ],
    safety: {
      en: [
        "The Smith's hooks ARE your safety — re-rack by rotating back EVERY set end.",
        "Practice the empty bar for a full session first; it teaches the groove.",
        "No spotter needed thanks to the rails — one more reason it's beginner-perfect.",
      ],
      fa: [
        "قلاب‌های اسمیت «ایمنی تو» هستند — پایان هر ست حتماً چرخان و قلاب کن.",
        "اول یک جلسه کامل فقط با میله خالی تمرین کن؛ الگوی حرکت را یادت می‌دهد.",
        "به لطف ریل‌ها نیازی به همراه نیست — دلیل دیگر مناسب بودن برای تازه‌کار.",
      ],
    },
  }),

  "smith leg press": E({
    setup: {
      en: [
        "Lie on your back under the bar; place FEET flat on it, hip-width.",
        "Unhook and bring bar over; knees bent comfortably.",
        "The empty-bar version is a gentle intro to pressing patterns.",
      ],
      fa: [
        "به پشت زیر میله دراز بکش؛ «کف پاها» صاف روی آن، هم‌عرض لگن.",
        "از قلاب دربیاور و میله را بیار بالا؛ زانوها راحت خم.",
        "نسخه میله خالی، معرفی ملایم به الگوی پرس پا است.",
      ],
    },
    cues: {
      en: [
        "Press through HEELS and mid-foot; never toes only.",
        "Knees track over toes, don't cave inward.",
        "Stop the press just before elbows… sorry — knees lock! Soft knees always.",
      ],
      fa: [
        "با «پاشنه و وسط کف» فشار بده؛ هرگز فقط پنجه.",
        "زانوها در راستای پنجه؛ جمع شدن به داخل ممنوع.",
        "پرس را کمی قبل از قفل زانو قطع کن! زانو نرم بماند.",
      ],
    },
    rom: { en: "Knees toward chest (controlled) → press to almost-straight. Lower back stays on floor throughout.", fa: "زانو به سمت سینه (کنترل‌شده) → پرس تا تقریباً صاف. کمر در کل حرکت روی زمین." },
    breathing: { en: "Inhale lowering knees, exhale pressing away.", fa: "پایین آوردن زانو دم، پرس بازدم." },
    mistakes: [
      { wrong: { en: "Hips rolling OFF the floor at the bottom", fa: "بلند شدن لگن از زمین در پایین" }, fix: { en: "Reduce depth — protect the spine", fa: "عمق را کم کن — از ستون فقرات محافظت کن" } },
      { wrong: { en: "Pressing with toes / high heels position", fa: "فشار با پنجه / پا روی نوک" }, fix: { en: "Whole foot flat on bar; heels drive", fa: "تمام کف پا روی میله؛ راننده پاشنه است" } },
    ],
    safety: { en: ["Always rotate-hook the bar back securely before relaxing legs.", "If available, prefer the dedicated LEG PRESS machine — same pattern, even safer."], fa: ["قبل از آزاد کردن پاها حتماً میله را بچرخان و قلاب کن.", "اگر دستگاه «پرس پا» جدا داشته باشی باشگاه، همان را ترجیح بده — همین الگو، حتی امن‌تر."] },
  }),

  "lever seated hip abduction": E({
    setup: { en: ["Sit with back supported; legs inside pads (outside of knees against pads).", "Select light weight — small muscles."], fa: ["با تکیه بنشین؛ پاها داخل پدها (بیرون زانو به پد).", "وزنه سبک انتخاب کن — عضلات کوچکی‌اند."] },
    cues: { en: ["Open legs outward against resistance — lead with KNEES not feet.", "Brief pause open; slow close but DON'T let stack slam.", "Upper body still."], fa: ["پاها را در برابر مقاومت «به بیرون» باز کن — با «زانو» هدایت کن نه پا.", "لحظه‌ای مکث در باز؛ بستن آهسته بدون کوبیدن وزنه.", "بالاتنه بی‌حرکت."] },
    rom: { en: "Comfortable closed → open to a firm (not painful) stop → controlled return.", fa: "بسته راحت → باز تا توقف محکم (نه دردناک) → برگشت کنترل‌شده." },
    breathing: { en: "Exhale opening, inhale closing.", fa: "باز کردن بازدم، بستن دم." },
    mistakes: [{ wrong: { en: "Leaning back hard to yank legs open", fa: "عقب خم شدن شدید برای باز کردن پاها" }, fix: { en: "Stay tall; lighter weight opens honestly", fa: "قدبلند بمان؛ وزنه سبک‌تر واقعاً باز می‌شود" } }],
    safety: { en: ["Burn in outer hip/glute = correct. Joint pinch = reduce range."], fa: ["سوزش بیرون لگن/باسن = درست. گیر مفصلی = کاهش دامنه."] },
  }),

  "lever standing calf raise": E({
    setup: {
      en: [
        "Balls of feet (NOT heels) firmly on the platform edge.",
        "Heels hang off into free space below platform level.",
        "Shoulders under pads; legs nearly straight.",
      ],
      fa: [
        "«پنجه‌ها» (نه پاشنه) محکم روی لبه سکو.",
        "پاشنه‌ها از لبه سکو بیرون و آزاد.",
        "شانه‌ها زیر پدها؛ پاها تقریباً صاف.",
      ],
    },
    cues: {
      en: [
        "Rise as HIGH as possible onto toes — actually reach taller.",
        "Pause 1–2s at the TOP, squeeze calves.",
        "Lower SLOWLY to a deep stretch below platform level.",
      ],
      fa: [
        "تا «بالاترین» نقطه روی پنجه بلند شو — واقعاً قد بکش.",
        "در بالا ۱ تا ۲ ثانیه مکث، ساق را فشار بده.",
        "«آهسته» پایین تا کشش عمیق زیر سطح سکو.",
      ],
    },
    rom: { en: "Deep heel-below stretch → tiptoe maximum. Calves love LONG ranges and pauses.", fa: "کشش عمیق پایین → اوج پنجه. ساق‌ها دامنه‌های «بلند» و مکث‌ها را دوست دارند." },
    breathing: { en: "Exhale rising, inhale lowering.", fa: "بالا رفتن بازدم، پایین آمدن دم." },
    mistakes: [
      { wrong: { en: "Fast bouncy mini-reps", fa: "تکرارهای کوچک و فنری" }, fix: { en: "Pause top AND bottom — tempo is the exercise", fa: "مکث در بالا و پایین — تمپو خودِ تمرین است" } },
      { wrong: { en: "Bending knees to cheat upward", fa: "خم کردن زانو برای بالا رفتن" }, fix: { en: "Legs stay nearly straight", fa: "پاها تقریباً صاف بمانند" } },
    ],
    safety: { en: ["Mild ache mid-calf is normal at first; sharp pain is not."], fa: ["درد مبهم وسط ساق اولش طبیعی است؛ درد تیز نه."] },
  }),

  "lever seated calf raise": E({
    setup: { en: ["Sit; balls of feet on platform, knee pad on lower THIGHS.", "Heels hanging free."], fa: ["بنشین؛ پنجه‌ها روی سکو، پد زانو روی «ران».", "پاشنه‌ها آزاد."] },
    cues: { en: ["Seated angle shifts work to the SOLEUS (deep calf) — pairs well with standing raises.", "Same rules: full stretch, tall top, pauses."], fa: ["زاویه نشسته کار را به «سولئوس» (ساق عمقی) می‌دهد — مکمل پرس ایستاده است.", "همان قوانین: کشش کامل، اوج بلند، مکث‌ها."] },
    rom: { en: "Identical philosophy: deep bottom, 1–2s top squeeze, slow negative.", fa: "همان فلسفه: پایین عمیق، ۱ تا ۲ ثانیه فشار بالا، منفی آهسته." },
    breathing: { en: "Exhale up, inhale down.", fa: "بالا بازدم، پایین دم." },
    mistakes: [{ wrong: { en: "Bouncing with knee drive", fa: "پرش با فشار زانو" }, fix: { en: "Muscle lifts the weight, not momentum", fa: "عضله وزنه را بلند می‌کند، نه اینرسی" } }],
    safety: { en: ["Very joint-friendly — good first calf station."], fa: ["برای مفاصل بسیار امن — ایستگاه خوب شروع ساق."] },
  }),

  "lever back extension": E({
    setup: {
      en: [
        "Pad tops hit you at the hip crease when lying on it (not stomach, not chest).",
        "Feet secured on plate; ankles locked.",
        "Cross arms on chest to start (no weight needed).",
      ],
      fa: [
        "بالای پد هنگام دراز کشیدن روی «چین خوردن لگن» بیفتد (نه شکم، نه سینه).",
        "پاها روی صفحه ثابت؛ مچ قفل.",
        "دست‌ها ضربدری روی سینه برای شروع (بدون وزنه کافی است).",
      ],
    },
    cues: {
      en: [
        "This trains the lower-back chain (glutes+hams+spinal muscles).",
        "Hinge DOWN with a long spine — like a slow bow.",
        "Rise until body makes ONE straight line — do NOT over-arch skyward.",
      ],
      fa: [
        "این حرکت زنجیره کمر (باسن+همسترینگ+عضلات ستون فقرات) را تمرین می‌دهد.",
        "با ستون فقرات بلند به پایین لولا کن — مثل تعظیم آهسته.",
        "تا جایی بالا بیا که بدن «یک خط صاف» شود — به سمت آسمان قوس بیش از حد نده!",
      ],
    },
    rom: { en: "Torso down ~45–90° → rise to straight line with legs. Slow, smooth, no jerking.", fa: "تنه پایین ~۴۵ تا ۹۰ درجه → بالا تا خط صاف با پاها. آهسته و نرم، بدون پرتاب." },
    breathing: { en: "Inhale descending, exhale rising to straight.", fa: "پایین رفتن دم، بالا آمدن تا صافی بازدم." },
    mistakes: [
      { wrong: { en: "Hyperextending (bending far backward at top)", fa: "قوس شدید به عقب در بالا" }, fix: { en: "'Tall and straight' is the finish — squeezing glutes stops you there", fa: "«بلند و صاف» پایان حرکت است — باسنی سفت همان‌جا نگهت دارد" } },
      { wrong: { en: "Initiating by yanking the neck/head up", fa: "شروع حرکت با پرتاب سر و گردن" }, fix: { en: "Eyes down, neck neutral; chest leads", fa: "نگاه پایین، گردن خنثی؛ سینه پیشتاز است" } },
    ],
    safety: {
      en: ["Bodyweight only for your first month.", "Felt in glutes/hamstrings ✓ — sharp lower-back pain ✗ stop and ask staff to check your setup."],
      fa: ["ماه اول فقط وزن بدن.", "حس در باسن/همسترینگ ✓ — درد تیز کمر ✗ توقف و از مربی بخواه جایگاه را چک کند."],
    },
  }),

  "lever seated crunch": E({
    setup: { en: ["Sit; chest pad against upper chest, hands gripping handles.", "Feet flat, secured."], fa: ["بنشین؛ پد سینه به بالای سینه، دست‌ها روی دسته‌ها.", "کف پا صاف و ثابت."] },
    cues: {
      en: [
        "Crunch = curl your RIBS toward PELVIS, not pulling with arms.",
        "Exhale HARD as you crunch — feel abs wrinkle.",
        "Arms are just hooks; abs do the moving.",
      ],
      fa: [
        "کرانچ = جمع کردن «دنده‌ها به سمت لگن»، نه کشیدن با دست.",
        "موقع جمع شدن «محکم» بازدم کن — چروک شدن شکم را حس کن.",
        "دست‌ها فقط قلاب‌اند؛ حرکت دهنده شکم است.",
      ],
    },
    rom: { en: "Short, focused range: slight back-bend → ribs-to-pelvis squeeze → slow release with a stretch.", fa: "دامنه کوتاه و متمرکز: قوسِ کم کمر → فشار دنده به لگن → باز شدن آهسته با کشش." },
    breathing: { en: "Sharp exhale crunching; inhale returning.", fa: "کرانچ با بازدم تند؛ برگشت دم." },
    mistakes: [
      { wrong: { en: "Yanking handles to drag the pad down", fa: "کشیدن دسته‌ها برای پایین آوردن پد" }, fix: { en: "Lighten weight; initiate from ABS", fa: "وزنه کم؛ حرکت از «شکم» شروع شود" } },
      { wrong: { en: "Holding breath through reps", fa: "نگه داشتن نفش در تکرارها" }, fix: { en: "The exhale IS part of the contraction", fa: "بازدم بخشی از انقباض است" } },
    ],
    safety: { en: ["Neck stays relaxed — chin roughly neutral."], fa: ["گردن آزاد — چانه تقریباً خنثی."] },
  }),

  // ================= BODYWEIGHT BASICS =================
  "push-up": E({
    setup: { en: ["Hands slightly wider than shoulders, directly under chest line.", "Body: one rigid plank from head to heels."], fa: ["دست‌ها کمی بازتر از شانه، دقیقاً زیر خط سینه.", "بدن: یک تخته صاف از سر تا پاشنه."] },
    cues: { en: ["Elbows ~45° from torso as you descend.", "Chest approaches floor, hips travel WITH chest (no sagging).", "Push the FLOOR away; full arm lockout soft."], fa: ["موقع پایین رفتن آرنج ~۴۵ درجه نسبت به تنه.", "سینه نزدیک زمین، لگن همراه سینه (شکم نچسبد به زمین).", "زمین را «هل بده»؛ قفل آرنج نرم."] },
    rom: { en: "Arms straight → chest a fist from floor → press up.", fa: "دست صاف → سینه به اندازه مشت از زمین → پرس بالا." },
    breathing: { en: "Inhale down, exhale press.", fa: "پایین دم، پرس بازدم." },
    mistakes: [{ wrong: { en: "Hips sagging or piking", fa: "افتادن یا تیز شدن لگن" }, fix: { en: "Squeeze glutes + abs; shorter reps with perfect line", fa: "باسن و شکم سفت؛ تکرار کوتاه‌تر با خط کامل" } }],
    safety: { en: ["Too hard? Hands on a bench (incline) until stronger."], fa: ["سخت بود؟ دست‌ها روی نیمکت (شیبدار) تا قوی‌تر شوی."] },
  }),

  "plank": E({
    setup: { en: ["Forearms down, elbows under shoulders.", "Feet hip-width."], fa: ["ساعد روی زمین، آرنج زیر شانه.", "پاها هم‌عرض لگن."] },
    cues: { en: ["One straight line: ears-shoulders-hips-heels.", "Squeeze glutes + brace abs hard.", "BREATHE steadily — planks are breathing practice too."], fa: ["یک خط صاف: گوش-شانه-لگن-پاشنه.", "باسن و شکم را سفت کن.", "نفش «منظم» بکش — پلانک تمرین تنفس هم هست."] },
    rom: { en: "Static hold. Quality over duration: 20 perfect seconds > 90 sloppy.", fa: "نگهداشت ثابت. کیفیت بر زمان: ۲۰ ثانیه بی‌نقص از ۹۰ ثانیه شل بهتر است." },
    breathing: { en: "Slow continuous breaths — never hold.", fa: "نفش آهسته پیوسته — هرگز حبس نکن." },
    mistakes: [{ wrong: { en: "Hips high (resting) or low (straining spine)", fa: "لگن بالا (استراحت) یا پایین (فشار به کمر)" }, fix: { en: "Mirror check or film yourself once", fa: "یک بار در آینه یا با فیلم چک کن" } }],
    safety: { en: ["Lower-back pinch = lift hips slightly higher."], fa: ["فشار کمر = لگن را کمی بالاتر ببر."] },
  }),
};

// Lookup helpers -----------------------------------------------------------
const norm = (s) => s.toLowerCase().trim().replace(/\s+/g, " ");

export function findEducation(exerciseName) {
  if (!exerciseName) return null;
  const key = norm(exerciseName);
  if (EDUCATION[key]) return EDUCATION[key];
  // fuzzy: "lever chest press v. 2" -> startsWith match on base names
  for (const [k, v] of Object.entries(EDUCATION)) {
    if (key.startsWith(k) || k.startsWith(key.replace(/ v\.? ?\d*$/, ""))) return v;
  }
  return null;
}

export function educationCoverage() {
  return Object.keys(EDUCATION).length;
}
