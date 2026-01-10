'use client';

import * as React from "react";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CurrencySelectorProps {
    className?: string;
}

export function CurrencySelector({ className }: CurrencySelectorProps) {
    const { selectedCurrency, setSelectedCurrency, currencies, isLoading } = useCurrency();

    if (isLoading || currencies.length === 0) {
        return (
            <div className={cn("h-10 w-[120px] animate-pulse rounded-md bg-slate-100", className)} />
        );
    }

    return (
        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger className={cn("w-[140px] bg-white border-slate-200 text-slate-700", className)}>
                <SelectValue placeholder="Select currency">
                    {selectedCurrency}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {currencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                        <span className="font-medium">{c.code}</span>
                        <span className="ml-2 text-xs text-slate-500">- {c.name}</span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
