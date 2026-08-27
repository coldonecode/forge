// Warm the browser cache (via service worker) with demo GIFs the user's plan
// needs, so a fresh install works offline from day one.
export function prefetchGifs(urls) {
  for (const u of urls) {
    try {
      fetch(u, { mode: "no-cors", priority: "low" }).catch(() => {});
    } catch {
      /* ignore */
    }
  }
}
