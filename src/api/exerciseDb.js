const BASE = "https://oss.exercisedb.dev/api/v1";
const CACHE_KEY = "catalog_v1";
const CACHE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
const PAGE_LIMIT = 25;
const PAGE_DELAY_MS = 1500;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- IndexedDB (tiny kv) ----------
function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("forge-db", 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains("kv")) req.result.createObjectStore("kv");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet(key) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("kv", "readonly");
    const req = tx.objectStore("kv").get(key);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function idbPut(key, value) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("kv", "readwrite");
    tx.objectStore("kv").put(value, key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

// ---------- fetch with retry/backoff (handles Cloudflare 1015 / 429) ----------
async function getJson(url, tries = 6) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
      lastErr = new Error(`HTTP ${res.status}`);
      console.warn(`exerciseDb: ${lastErr.message} — attempt ${i + 1}`);
    } catch (e) {
      lastErr = e;
      console.warn(`exerciseDb: ${e.message} — attempt ${i + 1}`);
    }
    if (i < tries - 1) await sleep(Math.min(2500 * Math.pow(2, i), 60000));
  }
  throw lastErr;
}

// ---------- full catalog download ----------
export async function downloadCatalog(onProgress) {
  const exercises = [];
  let after = "";
  let page = 0;
  for (;;) {
    const url = `${BASE}/exercises?limit=${PAGE_LIMIT}${after ? `&after=${after}` : ""}`;
    const r = await getJson(url);
    exercises.push(...r.data);
    page++;
    onProgress?.({ loaded: exercises.length, total: r.meta?.total ?? 1500, page });
    if (!r.meta?.hasNextPage || !r.meta?.nextCursor) break;
    after = r.meta.nextCursor;
    await sleep(PAGE_DELAY_MS);
  }
  const payload = { fetchedAt: Date.now(), exercises };
  await idbPut(CACHE_KEY, payload);
  return exercises;
}

// ---------- public: get catalog (cache -> bundled -> network) ----------
export async function getCatalog(onProgress) {
  try {
    const cached = await idbGet(CACHE_KEY);
    if (cached && Array.isArray(cached.exercises) && cached.exercises.length > 500 &&
        Date.now() - cached.fetchedAt < CACHE_MAX_AGE_MS) {
      return cached.exercises;
    }
  } catch (e) {
    console.warn("exerciseDb: cache read failed", e);
  }

  // Bundled snapshot ships inside the app — instant, works fully offline
  let bundled = null;
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}catalog.json`);
    if (res.ok) bundled = await res.json();
  } catch { /* offline & not bundled: fall through to network */ }
  if (Array.isArray(bundled) && bundled.length > 500) {
    await idbPut(CACHE_KEY, { fetchedAt: Date.now(), exercises: bundled }).catch(() => {});
    return bundled;
  }

  return downloadCatalog(onProgress);
}

let refreshing = false;
// Quietly re-download the catalog if our copy is older than 7 days.
export async function backgroundRefresh() {
  if (refreshing) return null;
  refreshing = true;
  try {
    const c = await idbGet(CACHE_KEY);
    if (c && Date.now() - c.fetchedAt < 1000 * 60 * 60 * 24 * 7) return null;
    return await downloadCatalog(null);
  } catch {
    return null;
  } finally {
    refreshing = false;
  }
}

// ---------- helpers over the catalog ----------
let index = null;
export function buildIndex(exercises) {
  index = new Map(exercises.map((x) => [x.exerciseId, x]));
}
export function getById(id) {
  return index?.get(id) ?? null;
}

export function searchLocal(exercises, { q = "", bodyPart = "all", equipment = "all" } = {}) {
  const needle = q.trim().toLowerCase();
  return exercises.filter((x) => {
    if (bodyPart !== "all" && !x.bodyParts.includes(bodyPart)) return false;
    if (equipment !== "all" && !x.equipments.includes(equipment)) return false;
    if (!needle) return true;
    const hay = `${x.name} ${x.targetMuscles.join(" ")} ${x.equipments.join(" ")}`;
    return hay.toLowerCase().includes(needle);
  });
}

// Visual identity per equipment type; labels/descriptions live in i18n
// (translations.js under "eq.<key>.*" where key = name with spaces -> _).
export const EQUIPMENT_META = {
  "leverage machine": { icon: "machine", color: "volt", i18nKey: "leverage_machine" },
  cable: { icon: "cable", color: "ice", i18nKey: "cable" },
  "smith machine": { icon: "smith", color: "ember", i18nKey: "smith_machine" },
  dumbbell: { icon: "dumbbell", color: "lilac", i18nKey: "dumbbell" },
  "body weight": { icon: "body", color: "muted", i18nKey: "body_weight" },
};
