import { useCallback } from "react";
import { useStore } from "../store/useStore";
import { translate, LANGUAGES } from "./translations";

export function useI18n() {
  const lang = useStore((s) => s.profile.lang) || "en";
  const t = useCallback(
    (key, params) => translate(lang, key, params),
    [lang]
  );
  return { lang, t, dir: LANGUAGES[lang]?.dir ?? "ltr" };
}

export function currentLang() {
  return useStore.getState().profile.lang || "en";
}
