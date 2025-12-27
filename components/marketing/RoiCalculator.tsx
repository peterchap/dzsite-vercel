"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"

export function RoiCalculator() {
    const [attacks, setAttacks] = useState(3)
    const ATTACK_COST = 50000
    const DATAZAG_COST = 35988

    const totalLoss = attacks * ATTACK_COST
    const netBenefit = totalLoss - DATAZAG_COST
    const roi = Math.round((netBenefit / DATAZAG_COST) * 100)
    const payback = (DATAZAG_COST / (totalLoss / 12)).toFixed(1)

    return (
        <div className="bg-[#1E1E38] rounded-2xl p-8 border border-white/10 text-white">
            <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-6 w-6 text-[#56A8F5]" />
                <h3 className="text-xl font-bold">Calculate Your ROI</h3>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Average cost of successful phishing attack
                    </label>
                    <div className="text-2xl font-bold">£50,000</div>
                </div>

                <div>
                    <label htmlFor="attacks" className="block text-sm font-medium text-gray-400 mb-2">
                        Number of attacks prevented per year
                    </label>
                    <input
                        type="number"
                        id="attacks"
                        value={attacks}
                        onChange={(e) => setAttacks(Number(e.target.value) || 0)}
                        className="w-full bg-[#131326] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#56A8F5]"
                    />
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Total prevented losses:</span>
                        <span className="font-bold text-[#F27108]">£{totalLoss.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Datazag Professional cost:</span>
                        <span className="font-bold">£{DATAZAG_COST.toLocaleString()}/year</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#56A8F5]/10 p-3 rounded-lg border border-[#56A8F5]/20">
                        <span className="text-[#56A8F5] font-bold">Net benefit:</span>
                        <span className="text-2xl font-bold text-[#56A8F5]">£{netBenefit.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-[#131326] rounded-lg">
                            <div className="text-sm text-gray-400">ROI</div>
                            <div className="text-xl font-bold text-green-400">{roi > 0 ? roi : 0}%</div>
                        </div>
                        <div className="text-center p-3 bg-[#131326] rounded-lg">
                            <div className="text-sm text-gray-400">Payback Period</div>
                            <div className="text-xl font-bold text-green-400">{Number(payback) > 0 ? payback : 0} months</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
