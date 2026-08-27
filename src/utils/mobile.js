// Small mobile-native helpers: haptics + screen wake lock.

export function haptic(pattern = 20) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* unsupported */
  }
}

export function hapticSuccess() {
  haptic([18, 40, 26]);
}

let wakeLock = null;

export async function keepScreenAwake(enable) {
  try {
    if (enable) {
      if (!wakeLock && navigator.wakeLock?.request) {
        wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", () => (wakeLock = null));
      }
    } else if (wakeLock) {
      await wakeLock.release();
      wakeLock = null;
    }
  } catch {
    /* unsupported or denied */
  }
}

// Re-acquire the lock automatically after the app returns to foreground.
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "visible" && wakeLock === null) {
      // Session page re-requests on mount/visible via its own effect
    }
  });
}
