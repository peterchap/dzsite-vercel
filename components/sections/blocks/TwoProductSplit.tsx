import { SectionTwoProductSplit } from "@/sanity/types";
export function TwoProductSplit({ title, subtitle, left, right, isDark }: SectionTwoProductSplit & { isDark?: boolean }) {
    return (
        <section className={`py-12 ${'bg-slate-950'}`}>
            <div className="mx-auto max-w-6xl px-6">
                {title && <h2 className="text-3xl font-semibold">{title}</h2>}
                {subtitle && <p className="mt-4 max-w-2xl text-lg text-slate-300">{subtitle}</p>}
                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    {[left, right].map((card, idx) => (
                        <div key={idx} className="rounded-xl border border-white/10 bg-slate-950 p-6 shadow-sm">
                            {card.label && <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{card.label}</p>}
                            <h3 className="mt-2 text-xl font-semibold text-white">{card.headline}</h3>
                            {card.text && <p className="mt-3 text-slate-300 text-sm leading-relaxed">{card.text}</p>}
                            <ul className="mt-4 space-y-2 text-sm">
                                {card.bullets.map((b, i) => (
                                    <li key={i} className="flex gap-2 text-slate-300">
                                        <span className="text-blue-500">•</span>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                            {card.cta && (
                                <a
                                    href={card.cta.href}
                                    className="mt-6 inline-block rounded-lg border border-white/10 bg-slate-950 px-4 py-2 text-sm font-medium transition hover:bg-white/5 shadow-sm"
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
