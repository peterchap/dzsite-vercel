import React from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface Callout {
    label: string;
    text?: string;
}

interface CTA {
    label: string;
    href?: string;
    externalHref?: string;
    variant?: "primary" | "secondary" | "ghost";
}

interface CodeExampleProps {
    title: string;
    intro?: string;
    code?: string;
    json?: string; // Support existing content
    language: "json" | "sql" | "python";
    callouts?: Callout[];
    cta?: CTA;
    isDark?: boolean;
}

export function CodeExample({ title, intro, code, json, language, callouts, cta, isDark }: CodeExampleProps) {
    const finalCode = code || json || "";
    // Simple syntax highlighting using regex
    const highlight = (code: string, lang: string) => {
        if (!code) return "";

        let highlighted = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        if (lang === "json") {
            highlighted = highlighted
                .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
                    let cls = 'text-blue-400'; // Default: values
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'text-purple-400'; // Keys
                        } else {
                            cls = 'text-green-400'; // Strings
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'text-orange-400';
                    } else if (/null/.test(match)) {
                        cls = 'text-slate-400';
                    }
                    return `<span class="${cls}">${match}</span>`;
                });
        } else if (lang === "sql") {
            const keywords = /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP BY|ORDER BY|HAVING|LIMIT|UNION|ALL|AS|DISTINCT|CREATE|DROP|TABLE|DATABASE|INTO|VALUES|SET|AND|OR|NOT|IN|LIKE|IS|NULL|CASE|WHEN|THEN|ELSE|END|WITH)\b/gi;
            highlighted = highlighted
                .replace(keywords, '<span class="text-blue-400">$1</span>')
                .replace(/'([^']*)'/g, '<span class="text-green-400">\'$1\'</span>')
                .replace(/--.*$/gm, '<span class="text-slate-500">$&</span>');
        } else if (lang === "python") {
            const keywords = /\b(def|class|if|else|elif|for|while|try|except|finally|import|from|as|return|yield|with|lambda|in|is|not|and|or|True|False|None)\b/g;
            highlighted = highlighted
                .replace(keywords, '<span class="text-purple-400">$1</span>')
                .replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>')
                .replace(/'([^']*)'/g, '<span class="text-green-400">\'$1\'</span>')
                .replace(/#.*$/gm, '<span class="text-slate-500">$&</span>')
                .replace(/\b([a-zA-Z_]\w*)(?=\s*\()/g, '<span class="text-blue-400">$1</span>'); // Functions
        }

        return highlighted;
    };

    return (
        <section className={`py-12 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
            <div className="mx-auto max-w-6xl px-6">
                <h2 className="text-3xl font-semibold">{title}</h2>
                {intro && <p className="mt-4 max-w-2xl opacity-80">{intro}</p>}

                <div className="mt-8 grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 relative">
                        <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500 bg-neutral-800 px-2 py-1 rounded">
                            {language}
                        </div>
                        <pre className="overflow-x-auto rounded-xl bg-neutral-900 p-6 text-sm text-neutral-100 font-mono leading-relaxed">
                            <code
                                dangerouslySetInnerHTML={{ __html: highlight(finalCode, language) }}
                            />
                        </pre>
                    </div>

                    {(callouts || cta) && (
                        <div className="space-y-6">
                            {callouts && callouts.length > 0 && (
                                <div className="space-y-4">
                                    {callouts.map((c, i) => (
                                        <div key={i} className="rounded-lg border border-slate-200 p-4 bg-white shadow-sm">
                                            <p className="font-semibold text-slate-900">{c.label}</p>
                                            {c.text && <p className="mt-1 text-sm text-slate-600">{c.text}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {cta && cta.label && (
                                <div className="pt-2">
                                    <ButtonLink
                                        size="lg"
                                        variant={cta.variant || "primary"}
                                        className="w-full justify-center"
                                        href={cta.href || cta.externalHref || "#"}
                                    >
                                        {cta.label}
                                    </ButtonLink>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
