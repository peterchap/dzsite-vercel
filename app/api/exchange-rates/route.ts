import { NextResponse } from 'next/server';

const API_KEY = process.env.EXCHANGERATE_API_KEY;

export async function GET() {
    if (!API_KEY) {
        console.error('EXCHANGERATE_API_KEY is not configured');
        return NextResponse.json({ success: false, error: 'API key not configured.' }, { status: 500 });
    }

    const ratesUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
    const codesUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`;

    try {
        const [ratesResponse, codesResponse] = await Promise.all([
            fetch(ratesUrl, { next: { revalidate: 3600 } }), // Cache rates for 1 hour
            fetch(codesUrl, { next: { revalidate: 86400 } })  // Cache codes for 1 day
        ]);

        if (!ratesResponse.ok || !codesResponse.ok) {
            throw new Error('Failed to fetch data from ExchangeRate-API');
        }

        const ratesData = await ratesResponse.json();
        const codesData = await codesResponse.json();

        if (ratesData.result === 'error' || codesData.result === 'error') {
            throw new Error('ExchangeRate-API returned an error');
        }

        // Filter to a few common currencies if we want to keep the UI clean, 
        // or provide all of them. For marketing, a subset is usually better.
        const COMMON_CODES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'SGD', 'CHF'];

        const currencies = codesData.supported_codes
            .filter(([code]: [string, string]) => COMMON_CODES.includes(code))
            .map(([code, name]: [string, string]) => ({ code, name }))
            .sort((a: any, b: any) => a.name.localeCompare(b.name));

        return NextResponse.json({
            success: true,
            rates: ratesData.conversion_rates,
            currencies
        });

    } catch (error: any) {
        console.error('Exchange rate API error:', error.message);
        return NextResponse.json({ success: false, error: 'Could not fetch exchange rates.' }, { status: 500 });
    }
}
