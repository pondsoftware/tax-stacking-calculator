"use client";

import { useState } from "react";
import { SS_WAGE_BASE, SS_RATE, MEDICARE_RATE } from "@/data/tax-brackets";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export default function SelfEmploymentTaxCalculator() {
  const [netIncome, setNetIncome] = useState(50000);
  const [w2Wages, setW2Wages] = useState(0);

  // 92.35% of net SE income is subject to SE tax
  const seEarnings = netIncome * 0.9235;

  // Social Security: 12.4% up to wage base, reduced by W-2 wages
  const ssRemaining = Math.max(0, SS_WAGE_BASE - w2Wages);
  const ssTaxableEarnings = Math.min(seEarnings, ssRemaining);
  const socialSecurityTax = ssTaxableEarnings * SS_RATE;

  // Medicare: 2.9% on all SE earnings (no cap)
  const medicareTax = seEarnings * MEDICARE_RATE;

  // Additional Medicare Tax (0.9% over $200k/$250k)
  const additionalMedicareThreshold = 200000;
  const additionalMedicare =
    seEarnings > additionalMedicareThreshold
      ? (seEarnings - additionalMedicareThreshold) * 0.009
      : 0;

  const totalSETax = socialSecurityTax + medicareTax + additionalMedicare;
  const deductibleHalf = totalSETax / 2;
  const effectiveRate = netIncome > 0 ? totalSETax / netIncome : 0;

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Calculate Your Self-Employment Tax
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="netIncome"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Net Self-Employment Income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="netIncome"
                type="number"
                value={netIncome}
                onChange={(e) => setNetIncome(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                min={0}
                step={1000}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Gross income minus business expenses
            </p>
          </div>
          <div>
            <label
              htmlFor="w2Wages"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              W-2 Wages (if any)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="w2Wages"
                type="number"
                value={w2Wages}
                onChange={(e) => setW2Wages(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                min={0}
                step={1000}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Reduces Social Security portion if near wage base
            </p>
          </div>
        </div>
      </div>

      {/* Key Result */}
      <div className="bg-emerald-600 rounded-xl p-6 text-white text-center">
        <p className="text-emerald-100 text-sm mb-1">
          Total Self-Employment Tax
        </p>
        <p className="text-5xl font-bold mb-2">${fmt(totalSETax)}</p>
        <p className="text-emerald-200 text-sm">
          Effective SE tax rate: {(effectiveRate * 100).toFixed(1)}% of net
          income
        </p>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Tax Breakdown</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Net SE Income
              </p>
              <p className="text-xs text-gray-500">Your starting amount</p>
            </div>
            <span className="text-gray-900 font-medium">${fmt(netIncome)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Taxable SE Earnings (92.35%)
              </p>
              <p className="text-xs text-gray-500">
                ${fmt(netIncome)} x 0.9235
              </p>
            </div>
            <span className="text-gray-900 font-medium">
              ${fmt(seEarnings)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Social Security Tax (12.4%)
              </p>
              <p className="text-xs text-gray-500">
                On ${fmt(ssTaxableEarnings)} (wage base: $
                {fmt(SS_WAGE_BASE)})
              </p>
            </div>
            <span className="text-red-600 font-medium">
              ${fmt(socialSecurityTax)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Medicare Tax (2.9%)
              </p>
              <p className="text-xs text-gray-500">On all SE earnings (no cap)</p>
            </div>
            <span className="text-red-600 font-medium">
              ${fmt(medicareTax)}
            </span>
          </div>
          {additionalMedicare > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Additional Medicare Tax (0.9%)
                </p>
                <p className="text-xs text-gray-500">
                  On earnings over ${fmt(additionalMedicareThreshold)}
                </p>
              </div>
              <span className="text-red-600 font-medium">
                ${fmt(additionalMedicare)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center py-2 border-b border-gray-100 bg-amber-50 -mx-6 px-6">
            <div>
              <p className="text-sm font-bold text-gray-900">
                Total Self-Employment Tax
              </p>
            </div>
            <span className="text-red-600 font-bold text-lg">
              ${fmt(totalSETax)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="text-sm font-medium text-green-700">
                Deductible Half (reduces AGI)
              </p>
              <p className="text-xs text-gray-500">
                You deduct 50% of SE tax from income
              </p>
            </div>
            <span className="text-green-600 font-medium">
              -${fmt(deductibleHalf)}
            </span>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-semibold text-amber-900 mb-3">
          How Self-Employment Tax Works
        </h3>
        <div className="space-y-3 text-sm text-amber-800">
          <p>
            <strong>Step 1:</strong> Multiply net SE income by 92.35% to get
            taxable SE earnings. This adjustment accounts for the
            &quot;employer&quot; half of FICA.
          </p>
          <p>
            <strong>Step 2:</strong> Apply 12.4% Social Security tax on earnings
            up to ${fmt(SS_WAGE_BASE)} (minus any W-2 wages already taxed).
          </p>
          <p>
            <strong>Step 3:</strong> Apply 2.9% Medicare tax on all SE earnings
            (no cap). Add 0.9% Additional Medicare Tax on earnings over $200,000.
          </p>
          <p>
            <strong>Step 4:</strong> Deduct half of the total SE tax from your
            adjusted gross income on Form 1040.
          </p>
        </div>
      </div>
    </div>
  );
}
