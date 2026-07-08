import React from "react";
import { cn } from "@/lib/utils";

// WU21 "Dz" square app/favicon mark (README app-mark spec). Token-driven via
// the .dz-mark selectors in globals.css; size the box with className (e.g.
// "h-8 w-8 text-lg"). The SVG favicon at app/icon.svg is the canonical asset;
// this is for in-app square contexts (avatars, compact headers).
export function DzMark({ className }: { className?: string }) {
    return (
        <span className={cn("dz-mark", className)} aria-label="Datazag">
            <span className="dz-mark-d">D</span><span className="dz-mark-z">z</span>
        </span>
    );
}
