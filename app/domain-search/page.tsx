"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { DomainResultsDisplay } from "@/components/tools/DomainResultsDisplay";
import { Search, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fetchDomainData } from "@/lib/api";

function DomainSearchContent() {
    const [domain, setDomain] = useState("");
    const [results, setResults] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedResults = sessionStorage.getItem('apiResults');
        const storedQuery = sessionStorage.getItem('initialQuery');

        if (storedResults && storedQuery) {
            try {
                setResults(JSON.parse(storedResults));
                setDomain(storedQuery);
                // Clean up sessionStorage after loading to avoid stale results on manual refresh if desired
                // sessionStorage.removeItem('apiResults');
            } catch (e) {
                console.error("Failed to parse stored results", e);
            }
        }
    }, []);

    const validateDomain = (d: string) => {
        const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}$/;
        return domainPattern.test(d);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!domain.trim()) return;

        setError(null);
        if (!validateDomain(domain)) {
            setError("Invalid domain name. Please enter a valid domain.");
            return;
        }

        setLoading(true);
        try {
            const data = await fetchDomainData(domain);
            setResults(data);
            sessionStorage.setItem('apiResults', JSON.stringify(data));
            sessionStorage.setItem('initialQuery', domain);
        } catch (err) {
            console.error(err);
            setError("Domain not found or API error. Please try again.");
            setResults(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* Page Header / Search Bar */}
            <div className="bg-white border-b border-slate-200 pt-32 pb-8 sticky top-0 z-30 shadow-sm">
                <Container>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="p-2 rounded-full hover:bg-slate-100 transition text-slate-400 hover:text-slate-600">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">Domain Intelligence</h1>
                                <p className="text-xs text-slate-500 font-medium">Real-time risk & infrastructure lookup</p>
                            </div>
                        </div>

                        <form onSubmit={handleSearch} className="relative flex-1 max-w-xl">
                            <input
                                type="text"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                placeholder="Search another domain..."
                                className={`w-full h-12 rounded-xl border pl-12 pr-4 text-sm font-medium shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${error ? "border-red-500 bg-red-50/10" : "border-slate-200 bg-white"
                                    }`}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            {loading && (
                                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-blue-500" />
                            )}
                            {error && (
                                <p className="absolute -bottom-6 left-0 text-[10px] font-bold text-red-500">{error}</p>
                            )}
                        </form>
                    </div>
                </Container>
            </div>

            {/* Results Area */}
            <Container className="mt-12">
                {results ? (
                    <DomainResultsDisplay data={results} />
                ) : !loading && !error && (
                    <div className="py-32 text-center">
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-100 mb-4 text-slate-400">
                            <Search className="h-10 w-10" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Ready for lookup</h2>
                        <p className="text-slate-500 mt-2">Enter a domain above to get started.</p>
                    </div>
                )}

                {loading && !results && (
                    <div className="py-32 flex flex-col items-center justify-center">
                        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                        <p className="text-slate-500 font-medium">Fetching real-time intelligence...</p>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default function DomainSearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DomainSearchContent />
        </Suspense>
    );
}
