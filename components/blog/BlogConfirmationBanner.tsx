"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";

function BannerContent() {
    const searchParams = useSearchParams();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (searchParams.get("confirmed") === "true") {
            setShow(true);
            const timer = setTimeout(() => setShow(false), 10000);
            return () => clearTimeout(timer);
        }
    }, [searchParams]);

    if (!show) return null;

    return (
        <div className="bg-emerald-600 animate-in slide-in-from-top duration-500">
            <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-4 text-sm sm:text-base">
                <div className="flex items-center gap-2 text-white font-bold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>Your subscription is now active! Thank you for joining our newsletter.</span>
                </div>
                <button
                    onClick={() => setShow(false)}
                    className="text-white hover:text-emerald-100 p-1 shrink-0"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}

export function BlogConfirmationBanner() {
    return (
        <Suspense fallback={null}>
            <BannerContent />
        </Suspense>
    );
}
