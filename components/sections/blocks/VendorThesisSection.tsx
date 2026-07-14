"use client";

import { motion } from "framer-motion";

type PlatformData = {
  name?: string;
  value?: number;
  isOthers?: boolean;
};

type VendorThesisSectionProps = {
  _type?: string;
  _key?: string;
  headline?: string;
  subheadline?: string;
  metric?: string;
  metricDescription?: string;
  platforms?: PlatformData[];
  sourceText?: string;
};

export default function VendorThesisSection(props: VendorThesisSectionProps) {
  const {
    headline = "Before attackers spoof your brand, they impersonate the platforms and vendors you trust.",
    subheadline = "That infrastructure exists in DNS and certificate data before it's used against anyone — and that's where we catch it.",
    metric = "85%+",
    metricDescription = "of brand impersonations targeting the top 100 brands spoof just four platforms.",
    platforms = [
      { name: "Amazon", value: 35 },
      { name: "Microsoft", value: 25 },
      { name: "PayPal", value: 15 },
      { name: "Google", value: 10 },
      { name: "All others combined", value: 15, isOthers: true },
    ],
    sourceText = "Datazag CertStream analysis, April 2026 \u00B7 1.2M+ certificates analyzed."
  } = props;

  return (
    <section className="bg-slate-950 text-white pt-0 pb-20 lg:pt-0 lg:pb-24 px-6 lg:px-12 xl:px-16 overflow-hidden">
      <div className="mx-auto w-full max-w-[1600px] flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
        {/* Left side (~40% width) - The argument, sticky */}
        <div className="w-full lg:w-[40%] pt-2">
          <div className="lg:sticky lg:top-32 max-w-lg">
            {headline && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="mt-6 text-lg text-slate-300">
                {subheadline}
              </p>
            )}
          </div>
        </div>

        {/* Right side (~60% width) - The evidence, visual */}
        <div className="w-full lg:w-[60%] flex flex-col pt-2">
          {/* Above the chart */}
          <div className="mb-10">
            {metric && (
              <div className="text-3xl font-bold tracking-tight sm:text-4xl font-mono bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent inline-block mb-4">
                {metric}
              </div>
            )}
            {metricDescription && (
              <p className="text-lg text-slate-200 max-w-2xl">
                {metricDescription}
              </p>
            )}
          </div>

          {/* The Chart */}
          {platforms && platforms.length > 0 && (
            <div className="space-y-5 mb-10 w-full max-w-2xl">
              {platforms.map((platform, i) => (
                <div key={platform.name || i} className="relative">
                  <div className="flex justify-between text-sm font-medium mb-2 text-slate-300">
                    <span>{platform.name}</span>
                  </div>
                  <div className="h-4 w-full bg-white/5/50 rounded-full overflow-hidden flex">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${platform.value || 0}%` }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        platform.isOthers ? "bg-slate-600" : "bg-gradient-to-r from-blue-500 to-indigo-500"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Below the chart */}
          {sourceText && (
            <div className="border-t border-white/10 pt-6">
              <p className="font-mono text-sm text-slate-400 uppercase tracking-wider">
                {sourceText}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
