"use client";

import { useState } from "react";
import { stateTaxes } from "@/data/state-taxes";
import {
  calculateSETax,
  calculateFederalTax,
  standardDeduction,
} from "@/data/tax-brackets";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export default function StateTaxTable() {
  const [sideIncome, setSideIncome] = useState(50000);
  const [sortBy, setSortBy] = useState<"name" | "rate" | "total">("name");

  // Calculate federal + SE tax (same for all states)
  const seTax = calculateSETax(sideIncome, 0);
  const agi = sideIncome - seTax.deductibleHalf;
  const taxableIncome = Math.max(0, agi - standardDeduction["single"]);
  const federalTax = calculateFederalTax(taxableIncome, "single");

  const statesWithCalc = stateTaxes.map((st) => {
    const stateTax = Math.max(0, taxableIncome) * st.rate;
    const totalTax = federalTax + seTax.total + stateTax;
    const takeHome = sideIncome - totalTax;
    const effectiveRate = sideIncome > 0 ? totalTax / sideIncome : 0;
    return { ...st, stateTax, totalTax, takeHome, effectiveRate };
  });

  const sorted = [...statesWithCalc].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "rate") return a.rate - b.rate;
    return a.totalTax - b.totalTax;
  });

  return (
    <div className="space-y-8">
      {/* Income Input */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Compare State Taxes on Self-Employment Income
        </h2>
        <div className="max-w-sm">
          <label
            htmlFor="income"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Net Self-Employment Income
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              $
            </span>
            <input
              id="income"
              type="number"
              value={sideIncome}
              onChange={(e) => setSideIncome(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
              min={0}
              step={5000}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Shows taxes for a single filer with only SE income (no W-2)
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
          <p className="text-sm text-emerald-700">
            Best Case (No State Tax)
          </p>
          <p className="text-2xl font-bold text-emerald-900">
            ${fmt(statesWithCalc.find((s) => s.rate === 0)?.takeHome || 0)}
          </p>
          <p className="text-xs text-emerald-600">take-home</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-sm text-amber-700">Average State</p>
          <p className="text-2xl font-bold text-amber-900">
            ${fmt(
              statesWithCalc.reduce((sum, s) => sum + s.stateTax, 0) /
                statesWithCalc.length
            )}
          </p>
          <p className="text-xs text-amber-600">in state tax</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-sm text-red-700">Highest State Tax</p>
          <p className="text-2xl font-bold text-red-900">
            ${fmt(Math.max(...statesWithCalc.map((s) => s.stateTax)))}
          </p>
          <p className="text-xs text-red-600">
            ({statesWithCalc.reduce((max, s) => (s.stateTax > max.stateTax ? s : max), statesWithCalc[0]).name})
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th
                  className="px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer hover:text-emerald-600"
                  onClick={() => setSortBy("name")}
                >
                  State {sortBy === "name" && "▼"}
                </th>
                <th
                  className="px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer hover:text-emerald-600 text-right"
                  onClick={() => setSortBy("rate")}
                >
                  State Rate {sortBy === "rate" && "▼"}
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-right">
                  State Tax
                </th>
                <th
                  className="px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer hover:text-emerald-600 text-right"
                  onClick={() => setSortBy("total")}
                >
                  Total Tax {sortBy === "total" && "▼"}
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-right">
                  Effective Rate
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-right">
                  Take-Home
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((st) => (
                <tr
                  key={st.code}
                  className={`border-b border-gray-100 ${
                    st.rate === 0 ? "bg-emerald-50/50" : ""
                  }`}
                >
                  <td className="px-4 py-2.5 text-sm">
                    <span className="font-medium text-gray-900">
                      {st.name}
                    </span>{" "}
                    <span className="text-gray-400">({st.code})</span>
                  </td>
                  <td className="px-4 py-2.5 text-sm text-right text-gray-900">
                    {st.rate === 0 ? (
                      <span className="text-emerald-600 font-medium">
                        No tax
                      </span>
                    ) : (
                      `${(st.rate * 100).toFixed(2)}%`
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-sm text-right text-gray-900">
                    ${fmt(st.stateTax)}
                  </td>
                  <td className="px-4 py-2.5 text-sm text-right text-gray-900 font-medium">
                    ${fmt(st.totalTax)}
                  </td>
                  <td className="px-4 py-2.5 text-sm text-right text-gray-900">
                    {(st.effectiveRate * 100).toFixed(1)}%
                  </td>
                  <td className="px-4 py-2.5 text-sm text-right font-medium text-emerald-700">
                    ${fmt(st.takeHome)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-semibold text-amber-900 mb-3">
          Important Notes About State Taxes
        </h3>
        <ul className="text-sm text-amber-800 space-y-2 list-disc pl-5">
          <li>
            Rates shown are approximate flat/effective rates. Many states have
            progressive brackets — actual tax may vary.
          </li>
          <li>
            Some states (NH, TN historically) only tax interest and dividend
            income, not earned income.
          </li>
          <li>
            Local taxes (city, county) are not included. NYC, for example, adds
            3-3.9% on top of NY state tax.
          </li>
          <li>
            State tax is deductible on your federal return if you itemize (SALT
            deduction, capped at $10,000).
          </li>
        </ul>
      </div>
    </div>
  );
}
