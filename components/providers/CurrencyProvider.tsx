'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react';

interface Currency {
    code: string;
    name: string;
}

interface CurrencyContextType {
    rates: { [key: string]: number } | null;
    selectedCurrency: string;
    currencies: Currency[];
    setSelectedCurrency: (currency: string) => void;
    formatPrice: (basePriceInCents: number) => string;
    convertText: (text: string) => string;
    isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [selectedCurrency, setSelectedCurrencyState] = useState('USD');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load saved currency from localStorage if available
        const saved = localStorage.getItem('dz_currency');
        if (saved) {
            setSelectedCurrencyState(saved);
        }

        fetch('/api/exchange-rates')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setRates(data.rates);
                    setCurrencies(data.currencies);
                }
            })
            .catch(error => console.error("Failed to load currency data:", error))
            .finally(() => setIsLoading(false));
    }, []);

    const setSelectedCurrency = (currency: string) => {
        setSelectedCurrencyState(currency);
        localStorage.setItem('dz_currency', currency);
    };

    const formatPrice = useCallback((basePriceInCents: number): string => {
        if (isLoading || !rates || !rates[selectedCurrency]) {
            // Fallback to deterministic USD format while loading or if rate is missing.
            // Avoid Intl.NumberFormat here for hydration safety as its output (whitespace/symbols) 
            // can vary slightly between Node.js and Browser.
            const usdPrice = basePriceInCents / 100;
            return `$${Math.round(usdPrice).toLocaleString()}`;
        }

        const convertedAmount = (basePriceInCents * rates[selectedCurrency]) / 100;

        // Japanese Yen (JPY) usually doesn't have decimals
        const fractionDigits = selectedCurrency === 'JPY' ? 0 : 0; // We want clear marketing prices, so 0 decimals is usually preferred

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: selectedCurrency,
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits,
        }).format(convertedAmount);
    }, [rates, selectedCurrency, isLoading]);

    const convertText = useCallback((text: string): string => {
        if (!text) return text;
        return text.replace(/\{\{PRICE:(\d+)\}\}/g, (_, cents) => {
            return formatPrice(parseInt(cents, 10));
        });
    }, [formatPrice]);

    const value = useMemo(() => ({
        rates,
        currencies,
        selectedCurrency,
        setSelectedCurrency,
        formatPrice,
        convertText,
        isLoading
    }), [rates, currencies, selectedCurrency, formatPrice, convertText, isLoading]);

    return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export const useCurrency = (): CurrencyContextType => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
