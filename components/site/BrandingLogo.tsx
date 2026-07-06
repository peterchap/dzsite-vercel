import React from "react";
import { cn } from "@/lib/utils";

// WU21 two-tone wordmark (option 2a). Gradient and colours come from the
// logo.* token namespace; Manrope is scoped to .dz-logo in globals.css.
export function BrandingLogo({ className }: { className?: string }) {
    return (
        <span className={cn("dz-logo leading-tight transition-transform duration-200 py-1", className)}>
            <span className="dz-logo-data">Data</span>
            <span className="dz-logo-zag">zag</span>
        </span>
    );
}
