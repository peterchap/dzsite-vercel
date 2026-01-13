import React from "react";
import { cn } from "@/lib/utils";

export function BrandingLogo({ className }: { className?: string }) {
    return (
        <span className={cn(
            "font-bold leading-tight tracking-tight bg-gradient-to-r from-[#00509d] to-[#0088ed] bg-clip-text text-transparent transition-transform duration-200 py-1",
            className
        )}>
            Datazag
        </span>
    );
}
