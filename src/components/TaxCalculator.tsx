"use client";

import { useState } from "react";
import {
  FilingStatus,
  calculateFullBreakdown,
  TaxBreakdown,
} from "@/data/tax-brackets";
import { stateTaxes } from "@/data/state-taxes";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

export default function TaxCalculator() {
  const [w2Salary, setW2Salary] = useState(65000);
  const [sideIncome, setSideIncome] = useState(20000);
  const [expenses, setExpenses] = useState(0);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [stateCode, setStateCode] = useState("TX");

  const breakdown = calculateFullBreakdown(
    w2Salary,
    sideIncome,
    status,
    expenses,
    stateCode
  );

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Your Income
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="w2"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              W-2 Salary (annual gross)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="w2"
                type="number"
                value={w2Salary}
                onChange={(e) => setW2Salary(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                min={0}
                step={1000}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="side"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              1099 / Side Hustle Income (annual)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="side"
                type="number"
                value={sideIncome}
                onChange={(e) => setSideIncome(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
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
              Business Expenses (deductible)
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
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                min={0}
                step={100}
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white"
            >
              {stateTaxes.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name} ({st.code}){st.rate === 0 ? " — No income tax" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Result */}
      <div className="bg-blue-600 rounded-xl p-6 text-white text-center">
        <p className="text-blue-100 text-sm mb-1">
          For every $1 you earn from your side hustle, you keep
        </p>
        <p className="text-5xl font-bold mb-2">
          ${breakdown.takeHomePer1099Dollar.toFixed(2)}
        </p>
        <p className="text-blue-200 text-sm">
          Your side hustle is taxed at an effective{" "}
          {pct(breakdown.marginalTaxRate)} (federal income tax +
          self-employment tax{breakdown.stateTax > 0 ? " + state tax" : ""})
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-3 text-center bg-gray-50 border-b border-gray-200">
          <div className="py-3 px-4 text-sm font-medium text-gray-500"></div>
          <div className="py-3 px-4 text-sm font-semibold text-gray-700 border-l border-gray-200">
            W-2 Only
          </div>
          <div className="py-3 px-4 text-sm font-semibold text-blue-700 bg-blue-50 border-l border-gray-200">
            W-2 + Side Hustle
          </div>
        </div>
        <ComparisonRow
          label="Gross Income"
          w2={`$${fmt(w2Salary)}`}
          combined={`$${fmt(w2Salary + sideIncome)}`}
        />
        <ComparisonRow
          label="Taxable Income"
          w2={`$${fmt(breakdown.w2TaxableIncome)}`}
          combined={`$${fmt(breakdown.combinedTaxableIncome)}`}
        />
        <ComparisonRow
          label="Federal Income Tax"
          w2={`$${fmt(breakdown.w2FederalTax)}`}
          combined={`$${fmt(breakdown.combinedFederalTax)}`}
        />
        <ComparisonRow
          label="Self-Employment Tax"
          w2="$0"
          combined={`$${fmt(breakdown.seTax.total)}`}
          highlight
        />
        {breakdown.qbiDeduction > 0 && (
          <ComparisonRow
            label="QBI Deduction (20%)"
            w2="$0"
            combined={`-$${fmt(breakdown.qbiDeduction)}`}
          />
        )}
        <ComparisonRow
          label={`State Tax (${breakdown.stateCode})`}
          w2={`$${fmt(breakdown.stateTax > 0 ? breakdown.stateTax * (breakdown.w2TaxableIncome / (breakdown.combinedTaxableIncome || 1)) : 0)}`}
          combined={`$${fmt(breakdown.stateTax)}`}
        />
        <ComparisonRow
          label="Total Tax"
          w2={`$${fmt(breakdown.w2FederalTax)}`}
          combined={`$${fmt(breakdown.combinedFederalTax + breakdown.seTax.total + breakdown.stateTax)}`}
          bold
        />
        <ComparisonRow
          label="Effective Tax Rate"
          w2={pct(breakdown.w2EffectiveRate)}
          combined={pct(breakdown.combinedEffectiveRate)}
        />
        <ComparisonRow
          label="Marginal Tax Bracket"
          w2={pct(breakdown.w2MarginalRate)}
          combined={pct(breakdown.combinedMarginalRate)}
        />
      </div>

      {/* SE Tax Breakdown */}
      <SEBreakdown breakdown={breakdown} />

      {/* Side Hustle Summary */}
      <SideHustleSummary breakdown={breakdown} expenses={expenses} />

      {/* Quarterly Estimated Tax Payments */}
      <QuarterlySchedule breakdown={breakdown} />
    </div>
  );
}

function ComparisonRow({
  label,
  w2,
  combined,
  bold,
  highlight,
}: {
  label: string;
  w2: string;
  combined: string;
  bold?: boolean;
  highlight?: boolean;
}) {
  const labelCls = bold
    ? "font-semibold text-gray-900"
    : "text-sm text-gray-600";
  const valueCls = bold ? "font-semibold text-gray-900" : "text-gray-900";
  const rowCls = highlight ? "bg-amber-50" : "";
  const combinedBg = highlight ? "bg-amber-50" : "bg-blue-50/30";

  return (
    <div
      className={`grid grid-cols-3 text-center border-b border-gray-100 ${rowCls}`}
    >
      <div className={`py-3 px-4 text-left ${labelCls}`}>{label}</div>
      <div
        className={`py-3 px-4 ${valueCls} border-l border-gray-100`}
      >
        {w2}
      </div>
      <div
        className={`py-3 px-4 ${valueCls} border-l border-gray-100 ${combinedBg}`}
      >
        {combined}
      </div>
    </div>
  );
}

function SEBreakdown({ breakdown }: { breakdown: TaxBreakdown }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
      <h3 className="font-semibold text-amber-900 mb-3">
        Self-Employment Tax Breakdown
      </h3>
      <p className="text-sm text-amber-800 mb-4">
        As a 1099 contractor, you pay both the employer and employee portions of
        Social Security and Medicare taxes — 15.3% total on 92.35% of your net
        self-employment income.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/60 rounded-lg p-4">
          <p className="text-sm text-amber-700">Social Security (12.4%)</p>
          <p className="text-xl font-semibold text-amber-900">
            ${fmt(breakdown.seTax.socialSecurity)}
          </p>
        </div>
        <div className="bg-white/60 rounded-lg p-4">
          <p className="text-sm text-amber-700">Medicare (2.9%)</p>
          <p className="text-xl font-semibold text-amber-900">
            ${fmt(breakdown.seTax.medicare)}
          </p>
        </div>
        <div className="bg-white/60 rounded-lg p-4">
          <p className="text-sm text-amber-700">Deductible Half</p>
          <p className="text-xl font-semibold text-green-700">
            -${fmt(breakdown.seTax.deductibleHalf)}
          </p>
        </div>
      </div>
      <p className="text-xs text-amber-700 mt-3">
        You can deduct 50% of your SE tax from your adjusted gross income,
        reducing your federal income tax slightly.
      </p>
    </div>
  );
}

function SideHustleSummary({
  breakdown,
  expenses,
}: {
  breakdown: TaxBreakdown;
  expenses: number;
}) {
  const netSideIncome = breakdown.grossSideIncome - expenses;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">
        Your Side Hustle Bottom Line
      </h3>
      <div className="space-y-3">
        <SummaryLine
          label="Gross 1099 income"
          value={`$${fmt(breakdown.grossSideIncome)}`}
        />
        {expenses > 0 && (
          <SummaryLine
            label="Business expenses"
            value={`-$${fmt(expenses)}`}
            color="red"
          />
        )}
        <SummaryLine
          label="Net self-employment income"
          value={`$${fmt(netSideIncome)}`}
        />
        {breakdown.qbiDeduction > 0 && (
          <SummaryLine
            label="QBI Deduction (20%)"
            value={`-$${fmt(breakdown.qbiDeduction)}`}
            color="green"
          />
        )}
        <SummaryLine
          label="Additional federal income tax"
          value={`-$${fmt(breakdown.additionalFederalTax)}`}
          color="red"
        />
        <SummaryLine
          label="Self-employment tax"
          value={`-$${fmt(breakdown.seTax.total)}`}
          color="red"
        />
        <SummaryLine
          label={`State tax (${breakdown.stateCode})`}
          value={`-$${fmt(breakdown.stateTax)}`}
          color="red"
        />
        <div className="border-t border-gray-200 pt-3">
          <SummaryLine
            label="What you actually keep"
            value={`$${fmt(breakdown.sideHustleTakeHome)}`}
            bold
            color="green"
          />
        </div>
      </div>
    </div>
  );
}

function QuarterlySchedule({ breakdown }: { breakdown: TaxBreakdown }) {
  const quarters = [
    { label: "Q1", due: "April 15" },
    { label: "Q2", due: "June 15" },
    { label: "Q3", due: "September 15" },
    { label: "Q4", due: "January 15" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-2">
        Quarterly Estimated Tax Payments
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        To avoid underpayment penalties, pay estimated taxes each quarter. Each
        payment is 1/4 of your total estimated tax liability (federal + SE +
        state).
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quarters.map((q) => (
          <div
            key={q.label}
            className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100"
          >
            <p className="text-xs font-medium text-gray-500 uppercase">
              {q.label}
            </p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              ${fmt(breakdown.quarterlyPayment)}
            </p>
            <p className="text-xs text-gray-400 mt-1">Due {q.due}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">
        Total annual estimated tax: ${fmt(breakdown.quarterlyPayment * 4)}
      </p>
    </div>
  );
}

function SummaryLine({
  label,
  value,
  bold,
  color,
}: {
  label: string;
  value: string;
  bold?: boolean;
  color?: "red" | "green";
}) {
  const labelCls = bold
    ? "font-semibold text-gray-900"
    : "text-sm text-gray-600";
  const valueColors = {
    red: "text-red-600",
    green: "text-green-600",
    default: "text-gray-900",
  };
  const valueCls = `${bold ? "text-xl font-bold" : "text-base"} ${valueColors[color || "default"]}`;

  return (
    <div className="flex justify-between items-center">
      <span className={labelCls}>{label}</span>
      <span className={valueCls}>{value}</span>
    </div>
  );
}
