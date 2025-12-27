import { SectionFaqList } from "@/sanity/types";

export function FaqList({ title, items, isDark }: SectionFaqList & { isDark?: boolean }) {
    return (
        <section className={`py-24 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
            <div className="mx-auto max-w-4xl px-6">
                {title && <h2 className="text-3xl font-semibold">{title}</h2>}

                <div className="mt-10 space-y-6">
                    {items?.map((faq, i) => (
                        <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="font-medium text-slate-900">{faq.question}</h3>
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
