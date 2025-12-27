"use client"

import Link from "next/link"

const THREATS = [
    { domain: 'amaz0n-secure-login.com', risk: 98, pattern: 'Typosquatting', asn: 'Russia', time: '47s ago' },
    { domain: 'paypa1-verify-account.net', risk: 96, pattern: 'Homoglyph attack', asn: 'Nigeria', time: '2m ago' },
    { domain: 'stripe-customer-portal.com', risk: 94, pattern: 'Brand impersonation', asn: 'China', time: '8m ago' },
]

export function LiveThreatFeed({ className }: { className?: string }) {
    return (
        <div className={`bg-[#131326] rounded-xl shadow-2xl overflow-hidden border border-gray-200 ${className}`}>
            <div className="p-4 border-b border-white/10 bg-[#1E1E38] flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm font-mono text-gray-300">LIVE FEED</span>
                </div>
                <span className="text-xs text-gray-500">2.8M certificates analyzed daily</span>
            </div>
            <div className="divide-y divide-white/10">
                {THREATS.map((item, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-[#1E1E38]/50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-red-400 font-mono text-sm">🚨 {item.domain}</span>
                            <span className="text-xs text-gray-500 hidden sm:inline">|</span>
                            <span className="text-xs text-gray-400">Risk: {item.risk}/100</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="hidden sm:inline">Pattern: {item.pattern}</span>
                            <span className="hidden sm:inline">ASN: {item.asn}</span>
                            <span>{item.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-[#1E1E38] text-center">
                <Link href="/brand-protection" className="text-sm text-[#56A8F5] hover:text-[#56A8F5]/80 font-medium">
                    View All Detections →
                </Link>
            </div>
        </div>
    )
}
