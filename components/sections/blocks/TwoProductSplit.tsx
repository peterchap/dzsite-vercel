import { SectionTwoProductSplit } from "@/sanity/types";

export function TwoProductSplit({ title, subtitle, left, right, isDark }: SectionTwoProductSplit & { isDark?: boolean }) {
    return (
        <section className={`py-24 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
            <div className="mx-auto max-w-6xl px-6">
                {title && <h2 className="text-3xl font-semibold">{title}</h2>}
                {subtitle && <p className="mt-4 max-w-2xl text-lg text-slate-600">{subtitle}</p>}

                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    {[left, right].map((card, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            {card.label && <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{card.label}</p>}
                            <h3 className="mt-2 text-xl font-semibold text-slate-900">{card.headline}</h3>
                            {card.text && <p className="mt-3 text-slate-600 text-sm leading-relaxed">{card.text}</p>}

                            <ul className="mt-4 space-y-2 text-sm">
                                {card.bullets.map((b, i) => (
                                    <li key={i} className="flex gap-2 text-slate-600">
                                        <span className="text-blue-500">•</span>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>

                            {card.cta && (
                                <a
                                    href={card.cta.href}
                                    className="mt-6 inline-block rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50 shadow-sm"
                                >
                                    {card.cta.label}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
