import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Armchair, CircleCheckBig, Ruler, Wind,
  TriangleAlert, ShieldAlert, ArrowRight, GraduationCap,
} from "lucide-react";
import { findEducation } from "../data/exerciseEducation";
import { useI18n } from "../i18n/useI18n";

function Section({ id, icon, title, tone = "", children, defaultOpen = false }) {
  return (
    <details className={`rounded-xl border border-line bg-surface-2/60 overflow-hidden ${tone}`} open={defaultOpen}>
      <summary className="flex items-center gap-2.5 px-3.5 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
        {icon}
        <span className="font-display font-semibold text-sm flex-1">{title}</span>
        <ChevronDown size={15} className="text-faint transition-transform [[open]>&]:rotate-180" />
      </summary>
      <div className="px-3.5 pb-3.5 pt-0 text-[13px] leading-relaxed">{children}</div>
    </details>
  );
}

export default function EducationPanel({ exerciseName }) {
  const { t, lang } = useI18n();
  const edu = useMemo(() => findEducation(exerciseName), [exerciseName]);

  if (!edu) return null;
  const L = (field) => field?.[lang] ?? field?.en ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2 text-volt font-display font-semibold text-sm pt-1">
        <GraduationCap size={16} /> {t("edu.title")}
      </div>

      {L(edu.setup).length > 0 && (
        <Section
          icon={<Armchair size={16} className="text-ice shrink-0" />}
          title={t("edu.setup")}
        >
          <ol className="space-y-1.5">
            {L(edu.setup).map((s, i) => (
              <li key={i} className="flex gap-2 text-muted">
                <span className="text-ice font-bold shrink-0" dir="ltr">{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {L(edu.cues).length > 0 && (
        <Section
          icon={<CircleCheckBig size={16} className="text-volt shrink-0" />}
          title={t("edu.cues")}
          defaultOpen
        >
          <ul className="space-y-1.5">
            {L(edu.cues).map((c, i) => (
              <li key={i} className="flex gap-2 text-muted">
                <span className="text-volt mt-0.5 shrink-0">✓</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {(edu.rom || edu.breathing) && (
        <Section
          icon={<Ruler size={16} className="text-lilac shrink-0" />}
          title={t("edu.rom")}
          defaultOpen
        >
          {edu.rom && <p className="text-muted">{edu.rom[lang] ?? edu.rom.en}</p>}
          {edu.breathing && (
            <p className="text-muted flex items-start gap-2 mt-2 rounded-lg bg-surface px-2.5 py-2 border border-line">
              <Wind size={14} className="text-ice shrink-0 mt-0.5" />
              <span>{edu.breathing[lang] ?? edu.breathing.en}</span>
            </p>
          )}
        </Section>
      )}

      {edu.mistakes?.length > 0 && (
        <Section
          icon={<TriangleAlert size={16} className="text-ember shrink-0" />}
          title={t("edu.mistakes")}
          tone="!border-ember/25"
          defaultOpen
        >
          <ul className="space-y-2.5">
            {edu.mistakes.map((m, i) => (
              <li key={i} className="space-y-1">
                <p className="text-ember/90 flex gap-1.5"><TriangleAlert size={13} className="shrink-0 mt-0.5" />{m.wrong[lang] ?? m.wrong.en}</p>
                <p className="text-volt/90 flex gap-1.5 ps-5">
                  <ArrowRight size={13} className="shrink-0 mt-0.5 rtl:rotate-180" />
                  {m.fix[lang] ?? m.fix.en}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {L(edu.safety).length > 0 && (
        <Section
          icon={<ShieldAlert size={16} className="text-ember shrink-0" />}
          title={t("edu.safety")}
          tone="!border-ember/20"
        >
          <ul className="space-y-1.5">
            {L(edu.safety).map((s, i) => (
              <li key={i} className="flex gap-2 text-muted">
                <ShieldAlert size={13} className="text-ember/70 shrink-0 mt-0.5" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </motion.div>
  );
}
