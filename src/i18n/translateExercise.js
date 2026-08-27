// Common exercise instruction phrase translations (EN → FA).
// Used to translate ExerciseDB API instructions that don't have
// manually-authored education content. Covers the most frequent
// ~200 patterns found across beginner exercises.

const PHRASES = [
  // Positions
  [/sit on the (?:machine|bench|chair)/gi, "روی $1 بنشینید"],
  [/stand (?:in front of|facing) the (?:machine|cable)/gi, "روبه‌روی $2 بایستید"],
  [/lie (?:face up|on your back|down|face down)/gi, "به پشت دراز بکشید"],
  [/kneel on the (?:pad|mat|bench)/gi, "روی $1 زانو بزنید"],
  [/place your (?:feet|hands|knees|shoulders)/gi, "$1 خود را قرار دهید"],
  [/adjust the (?:seat|pad|handle|height)/gi, "$1 را تنظیم کنید"],
  [/sit (?:upright|straight|comfortably)/gi, "صاف بنشینید"],
  [/stand (?:upright|straight|with feet)/gi, "صاف بایستید"],
  [/position yourself/i, "خود را در جای مناسب قرار دهید"],

  // Grips & holds
  [/grasp (?:the |your )?(?:handles?|bar|rope|cable)/gi, "$1 را بگیرید"],
  [/hold the (?:handles?|bar|rope)/gi, "$1 را نگه دارید"],
  [/grip (?:the |your )?(?:bar|handles?)/gi, "$1 را بگیرید"],
  [/grab (?:the )?(?:bar|handles?|rope)/gi, "$1 را بگیرید"],
  [/place your hands? on/i, "دست‌های خود را روی قرار دهید"],
  [/keep your (?:hands?|arms?) (?:shoulder|hip|width)/gi, "$1 خود را $2 فاصله نگه دارید"],

  // Movements
  [/push (?:the |away|up|forward)/gi, "فشار دهید"],
  [/pull (?:the |toward|down|back)/gi, "بکشید"],
  [/press (?:the |up|down)/gi, "فشار دهید"],
  [/lower (?:the |slowly|with control)/gi, "آرام پایین بیاورید"],
  [/raise (?:the |up|your)/gi, "بالا بیاورید"],
  [/lift (?:the |up|your)/gi, "بالا بیاورید"],
  [/extend (?:your|the)/gi, "$1 را صاف کنید"],
  [/flex (?:your|the)/gi, "$1 را خم کنید"],
  [/bend (?:your|the)/gi, "$1 را خم کنید"],
  [/rotate (?:your|the)/gi, "$1 را بچرخانید"],
  [/curl (?:the|your)/gi, "$1 را خم کنید"],
  [/swing (?:the|your)/gi, "$1 را تاب دهید"],
  [/slide (?:the|your)/gi, "$1 را حرکت دهید"],
  [/squeeze (?:the|your|at)/gi, "$1 را منقبض کنید"],
  [/hold (?:for|at|the)/gi, "$1 نگه دارید"],
  [/return to (?:the |start|starting)/gi, "به موقعیت شروع برگردید"],
  [/slowly (?:return|lower|release|bring)/gi, "آرام $1 بیاورید"],

  // Body cues
  [/keep your (?:back|spine) (?:straight|neutral|flat)/gi, "پشت خود را صاف نگه دارید"],
  [/keep your (?:core|abs|abdomen) (?:tight|engaged|braced)/gi, "شکم خود را سفت نگه دارید"],
  [/keep your (?:head|neck|chin) (?:neutral|straight|aligned)/gi, "$1 خود را صاف نگه دهید"],
  [/keep your (?:shoulders?) (?:back|down|relaxed|square)/gi, "$1 خود را $2 نگه دارید"],
  [/keep your (?:elbows?|knees?|wrists?) (?:close|tight|straight|slightly bent)/gi, "$1 خود را $2 نگه دارید"],
  [/don'?t (?:lock|swing|arch|round|shrug)/gi, "نکنید"],
  [/avoid (?:locking|swinging|arching|rounding|shrugging)/gi, "از اجتناب کنید"],
  [/maintain (?:a )?(?:slight|natural|slight) (?:bend|curve|arch)/gi, "$1 طبیعی را حفظ کنید"],
  [/brace your (?:core|abdominals?)/gi, "شکم خود را سفت کنید"],

  // Breathing
  [/inhale (?:as you|on the|while)/gi, "دم بگیرید $1"],
  [/exhale (?:as you|on the|while)/gi, "بازدم کنید $1"],
  [/breathe (?:in|out)/gi, "$1 بگیرید"],
  [/breathe (?:normally|evenly)/gi, "طبیعی نفس بکشید"],
  [/exhale as you (?:push|press|lift|raise|extend)/gi, "بازدم کنید $1"],
  [/inhale as you (?:lower|return|release|bend)/gi, "دم بگیرید $1"],

  // Tempo
  [/for (?:a )?(\d+)[–-](\d+) second/gi, "به مدت $1-$2 ثانیه"],
  [/for (?:a )?(\d+) seconds?/gi, "به مدت $1 ثانیе"],
  [/count (\d+)/gi, "$1 بشمارید"],
  [/pause (?:for|at|briefly)/gi, "مکث کنید"],
  [/hold for (\d+)/gi, "$1 ثانیه نگه دارید"],
  [/slow and controlled/gi, "آرام و با کنترل"],
  [/with control/gi, "با کنترل"],

  // Reps & sets
  [/repeat (?:for|this|the movement)/gi, "تکرار کنید"],
  [/complete (?:the |this )?(\d+)/gi, "$1 تکرار انجام دهید"],
  [/perform (\d+)/gi, "$1 بار انجام دهید"],
  [/do (\d+)/gi, "$1 بار انجام دهید"],

  // Machine-specific
  [/adjust the (?:weight|stack|pin)/gi, "وزن را تنظیم کنید"],
  [/select (?:your|the|a) (?:weight|resistance)/gi, "وزن را انتخاب کنید"],
  [/choose (?:an? )?(?:appropriate|suitable|comfortable) weight/gi, "وزن مناسب انتخاب کنید"],
  [/start (?:with|lighter|with a)/gi, "شروع کنید"],
  [/pad (?:against|on|touching)/gi, "بالشتک مقابل"],
  [/rest (?:the |against|pad)/gi, "تکیه دهید"],

  // Safety
  [/don'?t (?:use|lift|push|pull) (?:too much|heavy)/gi, "از وزن سنگین استفاده نکنید"],
  [/use (?:a )?(?:light|controlled|steady)/gi, "از وزن سبک استفاده کنید"],
  [/keep (?:the|your) movement (?:smooth|controlled)/gi, "حرکت را روان نگه دارید"],
  [/stop (?:if|when|exercise)/gi, "متوقف شوید"],
  [/if you feel (?:pain|discomfort)/gi, "اگر درد احساس کردید"],
];

// Translate a single instruction string by applying phrase replacements.
// Returns the translated string. Unmatched phrases stay in English.
export function translateInstruction(text) {
  if (!text) return text;
  let out = text;
  for (const [pattern, replacement] of PHRASES) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

// Translate an array of instruction steps.
export function translateInstructions(steps) {
  if (!Array.isArray(steps)) return steps;
  return steps.map(translateInstruction);
}
