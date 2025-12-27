import React from "react";
import { Container } from "@/components/ui/Container";
import * as Icons from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface IntegrationMethodsProps {
    isDark?: boolean;
    title?: string;
    methods?: {
        icon?: string;
        headline?: string;
        benefits?: string[];
        listTitle?: string;
        listItems?: string[];
        codeSnippet?: {
            language?: string;
            code?: string;
        };
    }[];
    diagram?: any;
}

export default function IntegrationMethods({ isDark, title, methods, diagram }: IntegrationMethodsProps) {
    return (
        <section className={`py-24 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                {title && (
                    <h2 className="mb-16 text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        {title}
                    </h2>
                )}
                <div className="grid gap-8 lg:grid-cols-2">
                    {methods?.map((method, i) => {
                        const IconComponent = (Icons as any)[method.icon || "Code"];
                        return (
                            <div key={i} className="flex flex-col h-full p-8 rounded-3xl border border-slate-200 bg-white shadow-md">
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        {IconComponent && <IconComponent className="h-6 w-6" />}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">{method.headline}</h3>
                                </div>

                                <div className="mb-8 grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Benefits</h4>
                                        <ul className="space-y-2">
                                            {method.benefits?.map((b, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <Icons.Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">{method.listTitle || "Details"}</h4>
                                        <ul className="space-y-2">
                                            {method.listItems?.map((li, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                                                    {li}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {method.codeSnippet && (
                                    <div className="mt-auto overflow-hidden rounded-xl bg-slate-900 p-4 text-xs font-mono text-slate-300">
                                        <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2">
                                            <span className="text-slate-500">{method.codeSnippet.language}</span>
                                            <Icons.Copy className="h-3 w-3 text-slate-500 hover:text-slate-300 cursor-pointer" />
                                        </div>
                                        <pre className="overflow-x-auto whitespace-pre">
                                            <code>{method.codeSnippet.code}</code>
                                        </pre>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {diagram && (
                    <div className="mt-16 relative aspect-[16/6] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                        <Image
                            src={urlFor(diagram).url()}
                            alt="Integration Diagram"
                            fill
                            className="object-contain p-8"
                        />
                    </div>
                )}
            </Container>
        </section>
    );
}
