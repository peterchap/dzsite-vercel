"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { fetchDomainData } from "@/lib/api";

interface DomainLookupProps {
    isDark?: boolean;
    title?: string;
    content?: string;
    placeholder?: string;
    buttonText?: string;
}

export default function DomainLookup({ isDark, title, content, placeholder, buttonText }: DomainLookupProps) {
    const [domain, setDomain] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // The validation logic is now expected to be handled by fetchDomainData or is no longer needed here.
        // If client-side validation is still desired, it should be re-added.
        if (!domain.trim()) {
            setError("Please enter a domain name.");
            return;
        }

        setLoading(true);

        try {
            const data = await fetchDomainData(domain);

            // Store results in sessionStorage to facilitate redirect to the results page
            sessionStorage.setItem('apiResults', JSON.stringify(data));
            sessionStorage.setItem('initialQuery', domain);

            router.push('/domain-search');
        } catch (err) {
            console.error(err);
            setError("Domain not found or API error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={`py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                <div className="mx-auto max-w-4xl text-center">
                    {title && (
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            {title}
                        </h2>
                    )}
                    {content && (
                        <p className="mb-10 text-lg text-slate-600">
                            {content}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="relative mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                placeholder={placeholder || "Enter domain name..."}
                                className={`h-14 w-full rounded-2xl border px-6 text-lg shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${error ? "border-red-500" : "border-slate-200"
                                    }`}
                                disabled={loading}
                            />
                            {error && (
                                <p className="mt-2 text-left text-sm text-red-500">{error}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !domain.trim()}
                            className="flex h-14 items-center justify-center rounded-2xl bg-blue-600 px-10 text-lg font-bold text-white shadow-lg shadow-blue-500/25 transition enabled:hover:bg-blue-700 enabled:hover:shadow-blue-500/40 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                buttonText || "Check Domain"
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-slate-400 italic">
                        * This is a demonstration of our real-time API. Full results available in our portal.
                    </p>
                </div>
            </Container>
        </section>
    );
}
