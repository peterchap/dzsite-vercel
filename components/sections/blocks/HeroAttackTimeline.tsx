import Image from "next/image"
import Link from "next/link"

type Cta = {
  label?: string
  href?: string
}

type SanityImage = {
  asset?: {
    url?: string
  }
  alt?: string
}

type TimelineStage = {
  label?: string
  time?: string
}

type DetectionMarker = {
  title?: string
  description?: string
}

type HeroAttackTimelineProps = {
  _type?: string
  _key?: string
  eyebrow?: string
  headline?: string
  subheadline?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  heroImageDesktop?: SanityImage
  heroImageMobile?: SanityImage
  timelineStages?: TimelineStage[]
  detectionMarker?: DetectionMarker
}

const DEFAULT_STAGES: TimelineStage[] = [
  { label: "Earliest signals", time: "Seconds" },
  { label: "Fake login page live", time: "Minutes–hours" },
  { label: "Identity compromised", time: "Hours–days" },
  { label: "Trusted abuse", time: "Days–weeks" },
]

const stagePositions = ["36%", "51%", "67%", "84%"]

export default function HeroAttackTimeline(props: HeroAttackTimelineProps) {
  const {
    eyebrow,
    headline,
    subheadline,
    primaryCta,
    secondaryCta,
    heroImageDesktop,
    heroImageMobile,
    timelineStages,
    detectionMarker,
  } = props

  const stages =
    timelineStages && timelineStages.length > 0
      ? timelineStages.slice(0, 4)
      : DEFAULT_STAGES

  const desktopImage = heroImageDesktop?.asset?.url
  const mobileImage = heroImageMobile?.asset?.url || desktopImage

  return (
    <section className="relative min-h-[720px] overflow-hidden bg-slate-950 text-white flex items-center">
      {/* 2-Column Grid Container (Expanded width to allow image to scale up) */}
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 sm:py-28 lg:px-12 xl:px-16 lg:py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-4 z-30">

        {/* Column 1: Text (40%) */}
        <div className="w-full lg:w-[40%] shrink-0">
          <div className="max-w-lg">
            {eyebrow && (
              <div className="mb-6 inline-flex rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-200">
                {eyebrow}
              </div>
            )}

            {headline && (
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                {headline}
              </h1>
            )}

            {subheadline && (
              <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
                {subheadline}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta?.href && primaryCta?.label && (
                <Link
                  href={primaryCta.href}
                  className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500"
                >
                  {primaryCta.label}
                </Link>
              )}

              {secondaryCta?.href && secondaryCta?.label && (
                <Link
                  href={secondaryCta.href}
                  className="rounded-lg border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>

            <p className="mt-6 text-sm text-slate-400">
              One intelligence core. Detect earlier.{" "}
              <span className="text-blue-300">Delivered as data.</span>
            </p>
          </div>
        </div>

        {/* Column 2: Image & Timeline Overlays (60%) */}
        <div className="w-full lg:w-[60%] relative">
          <div className="relative w-full aspect-[1717/916]">
            {/* Desktop Image */}
            {desktopImage && (
              <Image
                src={desktopImage}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="hidden object-contain lg:block"
              />
            )}

            {/* Mobile Image */}
            {mobileImage && (
              <Image
                src={mobileImage}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 0vw"
                className="block object-contain lg:hidden"
              />
            )}

            {/* Timeline overlay — desktop only. Bounded to the image's coordinate space! */}
            <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
              {/* The horizontal axis line */}
              {/*<div className="absolute top-[8%] right-[2%] h-px w-[70%] bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400" />*/}

              {/* Stages */}
              {stages.map((stage, index) => (
                <div
                  key={`${stage.label}-${index}`}
                  className="absolute -translate-x-1/3 text-center"
                  style={{ left: stagePositions[index], top: 'calc(5% - 0px)' }}
                >
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-blue-200 drop-shadow-md">
                    {stage.label}
                  </div>
                  <div className="mt-1.5 text-[9px] text-slate-300 drop-shadow-md">{stage.time}</div>
                  {/*<div className="mx-auto mt-2 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_15px_rgba(59,130,246,0.95)]" />*/}
                </div>
              ))}

              {/* Detection marker */}
              <div className="absolute -translate-x-1/2 flex flex-col items-center" style={{ bottom: '-57px', left: 'calc(40% - 50px)' }}>
                <div className="h-10 w-px bg-blue-300/80 mb-2" />
                <div className="rounded-lg border border-blue-300/60 bg-blue-600/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider shadow-[0_0_25px_rgba(37,99,235,0.75)]">
                  {detectionMarker?.title || "Datazag detects here"}
                </div>
                <p className="mt-2 w-52 text-center text-[11px] leading-relaxed text-slate-300 drop-shadow-md">
                  {detectionMarker?.description ||
                    "At the infrastructure layer — before abuse reaches users."}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
