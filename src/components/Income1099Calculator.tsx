"use client";

import { useState } from "react";
import {
  FilingStatus,
  calculateFederalTax,
  calculateSETax,
  standardDeduction,
  getMarginalRate,
} from "@/data/tax-brackets";
import { calculateStateTax, stateTaxes } from "@/data/state-taxes";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

export default function Income1099Calculator() {
  const [income1099NEC, setIncome1099NEC] = useState(35000);
  const [income1099K, setIncome1099K] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [expenses, setExpenses] = useState(5000);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [stateCode, setStateCode] = useState("TX");

  const gross1099 = income1099NEC + income1099K + otherIncome;
  const netIncome = Math.max(0, gross1099 - expenses);
  const deduction = standardDeduction[status];

  // Self-employment tax
  const seTax = calculateSETax(netIncome, 0);

  // Taxable income
  const agi = netIncome - seTax.deductibleHalf;
  const taxableIncome = Math.max(0, agi - deduction);

  // Federal income tax
  const federalTax = calculateFederalTax(taxableIncome, status);

  // State tax
  const stateTax = calculateStateTax(taxableIncome, stateCode);

  // Totals
  const totalTax = federalTax + seTax.total + stateTax;
  const effectiveRate = gross1099 > 0 ? totalTax / gross1099 : 0;
  const takeHome = gross1099 - totalTax - expenses;
  const marginalRate = getMarginalRate(taxableIncome, status);

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Your 1099 Income
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="nec"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              1099-NEC Income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="nec"
                type="number"
                value={income1099NEC}
                onChange={(e) => setIncome1099NEC(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                min={0}
                step={1000}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Freelance/contractor payments ($600+)
            </p>
          </div>
          <div>
            <label
              htmlFor="k"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              1099-K Income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="k"
                type="number"
                value={income1099K}
                onChange={(e) => setIncome1099K(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                min={0}
                step={1000}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Payment platform income (Stripe, PayPal, Etsy, etc.)
            </p>
          </div>
          <div>
            <label
              htmlFor="other"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Other Self-Employment Income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="other"
                type="number"
                value={otherIncome}
                onChange={(e) => setOtherIncome(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                min={0}
                step={1000}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Cash, crypto, or income under $600 threshold
            </p>
          </div>
          <div>
            <label
              htmlFor="expenses"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Business Expenses
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="expenses"
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                min={0}
                step={500}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filing Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as FilingStatus)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-white"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="head">Head of Household</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              State
            </label>
            <select
              id="state"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-white"
            >
              {stateTaxes.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name} ({st.code})
                  {st.rate === 0 ? " — No income tax" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Result */}
      <div className="bg-emerald-600 rounded-xl p-6 text-white text-center">
        <p className="text-emerald-100 text-sm mb-1">
          Total Tax on 1099 Income
        </p>
        <p className="text-5xl font-bold mb-2">${fmt(totalTax)}</p>
        <p className="text-emerald-200 text-sm">
          Effective tax rate: {pct(effectiveRate)} | Take-home: ${fmt(takeHome)}
        </p>
      </div>

      {/* W-2 vs 1099 Comparison */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          W-2 vs 1099: Where Your Money Goes
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Gross 1099 Income</span>
            <span className="text-gray-900 font-medium">${fmt(gross1099)}</span>
          </div>
          {expenses > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Business Expenses</span>
              <span className="text-red-600 font-medium">
                -${fmt(expenses)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Net SE Income</span>
            <span className="text-gray-900 font-medium">${fmt(netIncome)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100 bg-amber-50 -mx-6 px-6">
            <div>
              <span className="text-sm font-medium text-amber-900">
                Self-Employment Tax (15.3%)
              </span>
              <p className="text-xs text-amber-700">
                SS: ${fmt(seTax.socialSecurity)} + Medicare: $
                {fmt(seTax.medicare)}
              </p>
            </div>
            <span className="text-red-600 font-medium">
              -${fmt(seTax.total)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <span className="text-sm text-gray-600">
                Federal Income Tax
              </span>
              <p className="text-xs text-gray-400">
                {pct(marginalRate)} marginal bracket
              </p>
            </div>
            <span className="text-red-600 font-medium">
              -${fmt(federalTax)}
            </span>
          </div>
          {stateTax > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">State Tax</span>
              <span className="text-red-600 font-medium">
                -${fmt(stateTax)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center py-2 font-bold bg-emerald-50 -mx-6 px-6 rounded">
            <span className="text-emerald-700">Take-Home Pay</span>
            <span className="text-emerald-700 text-lg">${fmt(takeHome)}</span>
          </div>
        </div>
      </div>

      {/* 1099-NEC vs 1099-K info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h4 className="font-semibold text-blue-900 mb-2">1099-NEC</h4>
          <p className="text-sm text-blue-800">
            Reports non-employee compensation of $600 or more. You receive this
            from clients who paid you directly for freelance or contract work.
            All income is typically self-employment income.
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
          <h4 className="font-semibold text-purple-900 mb-2">1099-K</h4>
          <p className="text-sm text-purple-800">
            Reports payments processed through third-party platforms (PayPal,
            Stripe, Etsy, Uber). The 2024 threshold is $5,000 in gross
            payments. Not all 1099-K income is profit — subtract your costs.
          </p>
        </div>
      </div>
    </div>
  );
}
