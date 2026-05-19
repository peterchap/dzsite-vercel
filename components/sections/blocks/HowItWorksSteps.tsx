import { SectionHowItWorksSteps } from "@/sanity/types";
export function HowItWorksSteps({ title, subtitle, steps, isDark }: SectionHowItWorksSteps & { isDark?: boolean }) {
    return (
        <section className={`py-12 ${'bg-slate-950'}`}>
            <div className="mx-auto max-w-6xl px-6">
                {title && <h2 className="text-3xl font-semibold">{title}</h2>}
                {subtitle && <p className="mt-4 max-w-2xl text-slate-300">{subtitle}</p>}
                <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, i) => (
                        <li key={i} className="rounded-xl border border-white/10 bg-slate-950 p-6 shadow-sm">
                            <div className="mb-2 text-sm text-blue-600 font-medium tracking-tight">Step {i + 1}</div>
                            <h3 className="font-semibold text-white">{step.title}</h3>
                            {step.text && <p className="mt-2 text-sm text-slate-300 leading-relaxed">{step.text}</p>}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
