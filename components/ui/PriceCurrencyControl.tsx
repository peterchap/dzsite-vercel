'use client';

import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { cn } from "@/lib/utils";

/**
 * The currency choice, shown beside the prices it changes.
 *
 * It used to sit unlabelled in the header of every page. Only /pricing and
 * /reports show prices, so on every other page it did nothing a visitor could
 * see. Here it has a label, and the note says what a converted price is.
 * The choice is kept in localStorage (CurrencyProvider), so it carries between
 * the two pages.
 */
export function PriceCurrencyControl({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-400", className)}>
            <span id="price-currency-label" className="font-medium text-slate-200">Show prices in</span>
            <CurrencySelector className="h-9 w-[110px] border-white/15 bg-white/[0.06] text-xs text-white" />
            <span>Converted prices are a guide at current exchange rates. We can invoice in your currency.</span>
        </div>
    );
}
