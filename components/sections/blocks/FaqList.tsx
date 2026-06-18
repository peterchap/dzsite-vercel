import { SectionFaqList } from "@/sanity/types";
export function FaqList({ title, items, isDark }: SectionFaqList & { isDark?: boolean }) {
    return (
        <section className={`py-12 ${'bg-slate-950'}`}>
            <div className="mx-auto max-w-4xl px-6">
                {title && <h2 className="text-3xl font-semibold text-white">{title}</h2>}
                <div className="mt-10 space-y-6">
                    {items?.map((faq, i) => (
                        <div key={i} className="rounded-xl border border-white/10 bg-slate-950 p-6 shadow-sm">
                            <h3 className="font-medium text-white">{faq.question}</h3>
                            <p className="mt-2 text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
