import { SectionJsonExample } from "@/sanity/types";

export function JsonExample({ title, intro, json, callouts, isDark }: SectionJsonExample & { isDark?: boolean }) {
    return (
        <section className={`py-12 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
            <div className="mx-auto max-w-6xl px-6">
                <h2 className="text-3xl font-semibold">{title}</h2>
                {intro && <p className="mt-4 max-w-2xl opacity-80">{intro}</p>}

                <div className="mt-8 grid gap-8 lg:grid-cols-3">
                    <pre className="lg:col-span-2 overflow-x-auto rounded-xl bg-neutral-900 p-6 text-sm text-neutral-100">
                        <code>{json}</code>
                    </pre>

                    {callouts && (
                        <div className="space-y-4">
                            {callouts.map((c, i) => (
                                <div key={i} className="rounded-lg border p-4">
                                    <p className="font-medium">{c.label}</p>
                                    {c.text && <p className="mt-1 text-sm opacity-80">{c.text}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
