import React from "react";
import { Container } from "@/components/ui/Container";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Check, Zap, Clock, ShieldCheck, ShieldAlert } from "lucide-react";

interface Step {
  title: string;
  subtitle?: string;
  icon?: string;
  features?: string[];
  isDetectionPoint?: boolean;
}

interface Lane {
  label?: string;
  variant?: "positive" | "negative";
  timing?: string;
  detectionNote?: string;
  steps?: Step[];
}

interface AttackChainComparisonProps {
  isDark?: boolean;
  kicker?: string;
  title?: string;
  subtitle?: string;
  lanes?: Lane[];
  highlightTitle?: string;
  highlightBody?: string;
}

const IconMapper = ({ iconName, className }: { iconName?: string; className?: string }) => {
  if (!iconName) return null;
  const IconComponent = (LucideIcons as any)[iconName];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

const BASE_STEPS: Step[] = [
  { title: "Domain registration", subtitle: "New domain created", icon: "Globe" },
  { title: "DNS setup", subtitle: "Records & hosting configured", icon: "Network" },
  { title: "SSL issuance", subtitle: "Certificate issued", icon: "KeyRound" },
  { title: "Campaign live", subtitle: "Phishing pages & emails", icon: "MailWarning" },
];

const DEFAULT_LANES: Lane[] = [
  {
    label: "Datazag",
    variant: "positive",
    timing: "Seconds",
    detectionNote:
      "We flag the impersonating domain the moment its certificate hits the transparency logs — before a single phishing email is sent.",
    steps: BASE_STEPS.map((s, i) => ({ ...s, isDetectionPoint: i === 2 })),
  },
  {
    label: "Typical competitor",
    variant: "negative",
    timing: "Hours to days",
    detectionNote:
      "Signature- and report-based tools only react once pages are live and victims start reporting phishing emails — long after the damage begins.",
    steps: BASE_STEPS.map((s, i) => ({ ...s, isDetectionPoint: i === 3 })),
  },
];

const VARIANT_STYLES = {
  positive: {
    accentBorder: "border-emerald-500/40",
    accentRing: "ring-emerald-500/60",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    iconBg: "bg-emerald-500/15 ring-emerald-500/30",
    iconText: "text-emerald-400",
    badgeIcon: Zap,
    detectIcon: ShieldCheck,
    detectLabel: "Detected here",
  },
  negative: {
    accentBorder: "border-rose-500/40",
    accentRing: "ring-rose-500/60",
    accentText: "text-rose-400",
    accentBg: "bg-rose-500/10",
    iconBg: "bg-rose-500/15 ring-rose-500/30",
    iconText: "text-rose-400",
    badgeIcon: Clock,
    detectIcon: ShieldAlert,
    detectLabel: "Detected here",
  },
} as const;

function LaneDiagram({ lane }: { lane: Lane }) {
  const variant = lane.variant === "negative" ? "negative" : "positive";
  const styles = VARIANT_STYLES[variant];
  const steps = lane.steps && lane.steps.length > 0 ? lane.steps : BASE_STEPS;
  const BadgeIcon = styles.badgeIcon;

  return (
    <div className={`rounded-3xl border ${styles.accentBorder} bg-slate-950/80 p-6 sm:p-8 shadow-sm backdrop-blur`}>
      {/* Lane header: label + timing badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${variant === "positive" ? "bg-emerald-400" : "bg-rose-400"}`} />
          <span className="text-base font-semibold text-white">{lane.label}</span>
        </div>
        {lane.timing && (
          <div
            className={`inline-flex items-center gap-2 rounded-full border ${styles.accentBorder} ${styles.accentBg} px-3 py-1.5`}
          >
            <BadgeIcon className={`h-4 w-4 ${styles.accentText}`} />
            <span className={`text-xs font-semibold uppercase tracking-wide ${styles.accentText}`}>
              Detection: {lane.timing}
            </span>
          </div>
        )}
      </div>

      {/* Steps */}
      <div className="overflow-x-auto">
        <div
          className="grid gap-4 min-w-[800px] md:min-w-0 md:items-stretch"
          style={{
            gridTemplateColumns: steps
              .map((_, i) => (i === steps.length - 1 ? "1fr" : "1fr 2rem"))
              .join(" "),
          }}
        >
          {steps.map((s, i) => {
            const DetectIcon = styles.detectIcon;
            return (
              <React.Fragment key={i}>
                <div
                  className={`relative rounded-2xl border p-5 shadow-sm h-full min-w-0 ${
                    s.isDetectionPoint
                      ? `${styles.accentBorder} ${styles.accentBg} ring-2 ${styles.accentRing}`
                      : "border-white/10 bg-slate-950"
                  }`}
                >
                  {s.isDetectionPoint && (
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full border ${styles.accentBorder} bg-slate-950 px-2.5 py-1 whitespace-nowrap`}
                    >
                      <DetectIcon className={`h-3.5 w-3.5 ${styles.accentText}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${styles.accentText}`}>
                        {styles.detectLabel}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-2xl p-3 ring-1 shrink-0 ${
                          s.isDetectionPoint ? styles.iconBg : "bg-blue-500/10 ring-blue-500/20"
                        }`}
                      >
                        <IconMapper
                          iconName={s.icon}
                          className={`h-5 w-5 ${s.isDetectionPoint ? styles.iconText : "text-blue-400"}`}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-white leading-tight">{s.title}</div>
                        {s.subtitle && <div className="mt-1 text-xs text-slate-300">{s.subtitle}</div>}
                      </div>
                    </div>
                    {s.features && s.features.length > 0 && (
                      <ul className="space-y-2 mt-2 pt-4 border-t border-white/10">
                        {s.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check className={`h-3 w-3 mt-0.5 shrink-0 ${styles.accentText}`} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {i < steps.length - 1 ? (
                  <div className="hidden md:flex items-center justify-center h-full">
                    <ArrowRight className="h-5 w-5 text-slate-500" />
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {lane.detectionNote && (
        <p className="mt-6 text-sm text-slate-300 leading-relaxed">
          <span className={`font-semibold ${styles.accentText}`}>{lane.label}:</span> {lane.detectionNote}
        </p>
      )}
    </div>
  );
}

export default function AttackChainComparison({
  isDark,
  kicker = "Detection timing",
  title = "Seconds, not days",
  subtitle =
    "The same attack chain, two very different response windows. We detect impersonation infrastructure the moment a certificate is issued — competitors only react once the campaign is already live.",
  lanes,
  highlightTitle = "Where Datazag wins: pre-attack visibility",
  highlightBody =
    "By watching certificate transparency, DNS and routing in real time, we surface the threat at SSL issuance — hours or days before signature- and report-based tools catch up.",
}: AttackChainComparisonProps) {
  const displayLanes = lanes && lanes.length > 0 ? lanes : DEFAULT_LANES;

  return (
    <section className={`py-12 ${"bg-slate-950"}`}>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {kicker && <p className="text-sm font-medium text-slate-400">{kicker}</p>}
          {title && (
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white text-center">{title}</h2>
          )}
          {subtitle && <p className="mt-4 text-lg text-slate-300">{subtitle}</p>}
        </div>

        <div className="mt-10 space-y-4">
          {displayLanes.map((lane, i) => (
            <React.Fragment key={i}>
              <LaneDiagram lane={lane} />
              {i < displayLanes.length - 1 && (
                <div className="flex items-center justify-center" aria-hidden="true">
                  <span className="rounded-full border border-white/10 bg-slate-900 px-4 py-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                    vs
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {(highlightTitle || highlightBody) && (
          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 mx-auto max-w-4xl">
            {highlightTitle && (
              <div className="text-sm font-semibold text-center text-white">{highlightTitle}</div>
            )}
            {highlightBody && <p className="mt-2 text-sm text-slate-300 text-center">{highlightBody}</p>}
          </div>
        )}
      </Container>
    </section>
  );
}
