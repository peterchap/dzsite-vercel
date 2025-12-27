import { SectionHowItWorksSteps } from "@/sanity/types";

export function HowItWorksSteps({ title, subtitle, steps, isDark }: SectionHowItWorksSteps & { isDark?: boolean }) {
    return (
        <section className={`py-24 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
            <div className="mx-auto max-w-6xl px-6">
                {title && <h2 className="text-3xl font-semibold">{title}</h2>}
                {subtitle && <p className="mt-4 max-w-2xl text-slate-600">{subtitle}</p>}

                <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, i) => (
                        <li key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-2 text-sm text-blue-600 font-medium tracking-tight">Step {i + 1}</div>
                            <h3 className="font-semibold text-slate-900">{step.title}</h3>
                            {step.text && <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.text}</p>}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
