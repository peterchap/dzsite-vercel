import React from "react";
import { cn } from "@/lib/utils";
import { FileText, ArrowRight } from "lucide-react";

export default function DocumentList({
    title,
    subtitle,
    documents = []
}: {
    title?: string;
    subtitle?: string;
    documents?: any[];
}) {
    return (
        <section className="py-24 bg-white relative">
            <div className="mx-auto max-w-6xl px-6">
                <div className="max-w-2xl">
                    {title && <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>}
                    {subtitle && <p className="mt-4 text-lg text-slate-500">{subtitle}</p>}
                </div>

                <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {documents.map((doc, idx) => (
                        <a
                            key={doc._key || idx}
                            href={doc.cta?.href}
                            className="group relative flex flex-col items-start gap-4 rounded-3xl border border-slate-100 bg-slate-50/30 p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 lg:flex-row lg:items-center lg:justify-between"
                        >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all group-hover:scale-110 group-hover:shadow-blue-500/10 group-hover:ring-blue-100">
                                    <FileText className="h-6 w-6 text-slate-400 transition-colors group-hover:text-blue-600" />
                                </div>
                                <div className="max-w-xl">
                                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{doc.title}</h3>
                                    {doc.description && <p className="mt-1 text-slate-500 leading-relaxed">{doc.description}</p>}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 opacity-0 transition-all group-hover:opacity-100 lg:translate-x-[-20px] lg:group-hover:translate-x-0">
                                {doc.cta?.label || "View Document"}
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
