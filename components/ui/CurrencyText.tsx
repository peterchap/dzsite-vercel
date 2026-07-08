'use client';

import { useCurrency } from "@/components/providers/CurrencyProvider";

/**
 * Renders a string containing {{PRICE:cents}} markers (USD-base cents) through
 * the currency converter, so marketing prices in server-rendered pages respond
 * to the nav currency widget. Non-marker text (e.g. "Free", "Custom", "Banded")
 * passes through unchanged.
 */
export function CurrencyText({ value }: { value?: string }) {
  const { convertText } = useCurrency();
  return <>{convertText(value ?? "")}</>;
}
