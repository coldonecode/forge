import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { getCatalog, buildIndex, backgroundRefresh } from "../api/exerciseDb";

export function useCatalog() {
  const status = useStore((s) => s.catalogStatus);
  const progress = useStore((s) => s.catalogProgress);

  useEffect(() => {
    if (status !== "idle") return;
    useStore.getState().setCatalogStatus("loading");
    getCatalog(({ loaded, total }) =>
      useStore.setState({ catalogProgress: { loaded, total: total || 1500 } })
    )
      .then((exercises) => {
        buildIndex(exercises);
        useStore.getState().setCatalog(exercises);
        useStore.getState().setCatalogStatus("ready");
      })
      .catch((e) => {
        console.error("catalog load failed", e);
        useStore.getState().setCatalogStatus("error");
      });
  }, [status]);

  // Silent weekly refresh once the app is usable (no-op offline)
  useEffect(() => {
    if (status !== "ready") return;
    const t = setTimeout(() => {
      backgroundRefresh().then((fresh) => {
        if (Array.isArray(fresh) && fresh.length > 500) {
          buildIndex(fresh);
          useStore.getState().setCatalog(fresh);
        }
      });
    }, 4000);
    return () => clearTimeout(t);
  }, [status]);

  return { status, progress };
}
