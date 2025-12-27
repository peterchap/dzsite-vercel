import { SectionUseCaseCards } from "@/sanity/types";

export function UseCaseCards({ title, subtitle, cards, isDark }: SectionUseCaseCards & { isDark?: boolean }) {
    return (
        <section className={`py-24 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
            <div className="mx-auto max-w-6xl px-6">
                {title && <h2 className="text-3xl font-semibold text-center">{title}</h2>}
                {subtitle && <p className="mt-4 max-w-2xl text-slate-600 text-center mx-auto">{subtitle}</p>}

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {cards.map((c, i) => (
                        <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{c.audience}</p>
                            <h3 className="mt-2 text-xl font-semibold text-slate-900">{c.headline}</h3>
                            {c.text && <p className="mt-3 text-slate-600 text-sm leading-relaxed">{c.text}</p>}

                            <ul className="mt-4 space-y-2 text-sm">
                                {c.bullets.map((b, j) => (
                                    <li key={j} className="flex gap-2 text-slate-600">
                                        <span className="text-blue-500">•</span>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>

                            {c.cta && (
                                <a
                                    href={c.cta.href}
                                    className="mt-6 inline-block rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50 shadow-sm"
                                >
                                    {c.cta.label}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
