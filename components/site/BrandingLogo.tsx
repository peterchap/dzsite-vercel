import React from "react";
import { cn } from "@/lib/utils";

// WU21 two-tone wordmark (option 2a). Gradient and colours come from the
// logo.* token namespace; Manrope is scoped to .dz-logo in globals.css.
// `variant`: "mono" (flat off-white) / "knockout" (navy on light chip) are the
// README fallbacks for single-colour print or gradient-less contexts.
export function BrandingLogo({ className, variant }: { className?: string; variant?: "mono" | "knockout" }) {
    return (
        <span
            className={cn(
                "dz-logo leading-tight transition-transform duration-200 py-1",
                variant === "mono" && "dz-logo--mono",
                variant === "knockout" && "dz-logo--knockout",
                className,
            )}
        >
            <span className="dz-logo-data">Data</span>
            <span className="dz-logo-zag">zag</span>
        </span>
    );
}
