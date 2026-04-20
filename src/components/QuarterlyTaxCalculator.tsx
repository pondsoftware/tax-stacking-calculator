"use client";

import { useState } from "react";
import {
  FilingStatus,
  calculateFederalTax,
  calculateSETax,
  standardDeduction,
} from "@/data/tax-brackets";
import { calculateStateTax, stateTaxes } from "@/data/state-taxes";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export default function QuarterlyTaxCalculator() {
  const [annualSideIncome, setAnnualSideIncome] = useState(40000);
  const [w2Salary, setW2Salary] = useState(60000);
  const [expenses, setExpenses] = useState(5000);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [stateCode, setStateCode] = useState("TX");
  const [w2Withholding, setW2Withholding] = useState(8000);

  const netSideIncome = Math.max(0, annualSideIncome - expenses);
  const seTax = calculateSETax(netSideIncome, w2Salary);

  const deduction = standardDeduction[status];
  const combinedAGI = w2Salary + netSideIncome - seTax.deductibleHalf;
  const combinedTaxableIncome = Math.max(0, combinedAGI - deduction);
  const totalFederalTax = calculateFederalTax(combinedTaxableIncome, status);
  const stateTax = calculateStateTax(combinedTaxableIncome, stateCode);

  const totalTaxLiability = totalFederalTax + seTax.total + stateTax;
  const remainingTax = Math.max(0, totalTaxLiability - w2Withholding);
  const quarterlyPayment = remainingTax / 4;

  const quarters = [
    { label: "Q1 (Jan-Mar)", due: "April 15, 2025", period: "January 1 – March 31" },
    { label: "Q2 (Apr-May)", due: "June 16, 2025", period: "April 1 – May 31" },
    { label: "Q3 (Jun-Aug)", due: "September 15, 2025", period: "June 1 – August 31" },
    { label: "Q4 (Sep-Dec)", due: "January 15, 2026", period: "September 1 – December 31" },
  ];

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Estimate Your Quarterly Payments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="sideIncome"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Expected Annual Side Hustle Income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="sideIncome"
                type="number"
                value={annualSideIncome}
                onChange={(e) => setAnnualSideIncome(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                min={0}
                step={1000}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="w2Income"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              W-2 Salary (if any)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="w2Income"
                type="number"
                value={w2Salary}
                onChange={(e) => setW2Salary(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                min={0}
                step={1000}
              />
            </div>
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
              htmlFor="withholding"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Annual W-2 Tax Withholding
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="withholding"
                type="number"
                value={w2Withholding}
                onChange={(e) => setW2Withholding(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                min={0}
                step={500}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Federal tax already withheld from W-2 paychecks
            </p>
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
          Estimated Quarterly Payment
        </p>
        <p className="text-5xl font-bold mb-2">${fmt(quarterlyPayment)}</p>
        <p className="text-emerald-200 text-sm">
          Total annual estimated tax: ${fmt(remainingTax)} (after W-2 withholding)
        </p>
      </div>

      {/* Quarterly Schedule */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          2025 Quarterly Payment Schedule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quarters.map((q) => (
            <div
              key={q.label}
              className="bg-gray-50 rounded-lg p-4 border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{q.label}</p>
                  <p className="text-xs text-gray-500">{q.period}</p>
                </div>
                <p className="text-xl font-bold text-gray-900">
                  ${fmt(quarterlyPayment)}
                </p>
              </div>
              <p className="text-sm text-emerald-600 mt-2 font-medium">
                Due: {q.due}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tax Liability Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          How Your Payment Was Calculated
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">
              Total Federal Income Tax
            </span>
            <span className="text-gray-900 font-medium">
              ${fmt(totalFederalTax)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Self-Employment Tax</span>
            <span className="text-gray-900 font-medium">
              ${fmt(seTax.total)}
            </span>
          </div>
          {stateTax > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">State Tax</span>
              <span className="text-gray-900 font-medium">
                ${fmt(stateTax)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center py-2 border-b border-gray-100 font-semibold">
            <span className="text-sm text-gray-900">Total Tax Liability</span>
            <span className="text-gray-900">${fmt(totalTaxLiability)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-green-600">
              Minus: W-2 Withholding
            </span>
            <span className="text-green-600 font-medium">
              -${fmt(w2Withholding)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 font-bold">
            <span className="text-gray-900">Remaining Tax to Pay</span>
            <span className="text-gray-900">${fmt(remainingTax)}</span>
          </div>
          <div className="flex justify-between items-center py-2 bg-emerald-50 -mx-6 px-6 rounded">
            <span className="text-emerald-700 font-medium">
              Each Quarter (÷ 4)
            </span>
            <span className="text-emerald-700 font-bold text-lg">
              ${fmt(quarterlyPayment)}
            </span>
          </div>
        </div>
      </div>

      {/* Safe Harbor Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-semibold text-amber-900 mb-3">
          Safe Harbor Rules
        </h3>
        <div className="text-sm text-amber-800 space-y-2">
          <p>
            To avoid underpayment penalties, you generally must pay at least:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>90%</strong> of the tax shown on your current year return,
              OR
            </li>
            <li>
              <strong>100%</strong> of the tax shown on your prior year return
              (110% if AGI exceeds $150,000)
            </li>
          </ul>
          <p className="mt-2">
            If your income varies throughout the year, you can use the
            annualized income installment method (Form 2210, Schedule AI) to
            potentially reduce earlier quarter payments.
          </p>
        </div>
      </div>
    </div>
  );
}
