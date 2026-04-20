"use client";

import { useState } from "react";
import { FilingStatus, getMarginalRate, standardDeduction, calculateFederalTax } from "@/data/tax-brackets";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

interface DeductionCategory {
  id: string;
  label: string;
  description: string;
  placeholder: number;
}

const deductionCategories: DeductionCategory[] = [
  {
    id: "homeOffice",
    label: "Home Office",
    description: "Simplified method: $5/sq ft up to 300 sq ft ($1,500 max), or actual expenses",
    placeholder: 1500,
  },
  {
    id: "mileage",
    label: "Business Mileage",
    description: "2024 rate: $0.67/mile for business use",
    placeholder: 3000,
  },
  {
    id: "supplies",
    label: "Supplies & Equipment",
    description: "Computer, phone, printer, office supplies, tools",
    placeholder: 2000,
  },
  {
    id: "software",
    label: "Software & Subscriptions",
    description: "SaaS tools, hosting, domains, professional services",
    placeholder: 1200,
  },
  {
    id: "internet",
    label: "Internet & Phone",
    description: "Business-use portion of internet and cell phone bills",
    placeholder: 600,
  },
  {
    id: "healthInsurance",
    label: "Health Insurance Premiums",
    description: "Self-employed health insurance deduction (100% of premiums)",
    placeholder: 6000,
  },
  {
    id: "retirement",
    label: "Retirement Contributions",
    description: "SEP IRA, Solo 401(k), or SIMPLE IRA contributions",
    placeholder: 5000,
  },
  {
    id: "education",
    label: "Education & Training",
    description: "Courses, books, certifications related to your business",
    placeholder: 500,
  },
  {
    id: "marketing",
    label: "Marketing & Advertising",
    description: "Website, ads, business cards, networking events",
    placeholder: 1000,
  },
  {
    id: "other",
    label: "Other Business Expenses",
    description: "Insurance, legal fees, bank fees, professional memberships",
    placeholder: 500,
  },
];

export default function DeductionEstimator() {
  const [deductions, setDeductions] = useState<Record<string, number>>({});
  const [grossIncome, setGrossIncome] = useState(50000);
  const [w2Salary, setW2Salary] = useState(65000);
  const [status, setStatus] = useState<FilingStatus>("single");

  const totalDeductions = Object.values(deductions).reduce(
    (sum, val) => sum + (val || 0),
    0
  );

  // Calculate tax savings
  const netIncomeWithout = grossIncome;
  const netIncomeWith = Math.max(0, grossIncome - totalDeductions);

  // SE tax savings (15.3% * 92.35% = ~14.13%)
  const seTaxSavings = totalDeductions * 0.153 * 0.9235;

  // Income tax savings at marginal rate
  const deduction = standardDeduction[status];
  const combinedTaxableWithout = Math.max(0, w2Salary + netIncomeWithout - deduction);
  const combinedTaxableWith = Math.max(0, w2Salary + netIncomeWith - deduction);
  const incomeTaxWithout = calculateFederalTax(combinedTaxableWithout, status);
  const incomeTaxWith = calculateFederalTax(combinedTaxableWith, status);
  const incomeTaxSavings = incomeTaxWithout - incomeTaxWith;

  const totalTaxSavings = seTaxSavings + incomeTaxSavings;
  const marginalRate = getMarginalRate(combinedTaxableWithout, status);

  const updateDeduction = (id: string, value: number) => {
    setDeductions((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Income Context */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Your Income (for tax savings estimate)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="grossIncome"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Gross Side Hustle Income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="grossIncome"
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                min={0}
                step={1000}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="w2"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              W-2 Salary
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
                className="w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                min={0}
                step={1000}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="filingStatus"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filing Status
            </label>
            <select
              id="filingStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value as FilingStatus)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-white"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="head">Head of Household</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deduction Inputs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Enter Your Business Deductions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deductionCategories.map((cat) => (
            <div key={cat.id} className="p-4 bg-gray-50 rounded-lg">
              <label
                htmlFor={cat.id}
                className="block text-sm font-medium text-gray-900 mb-1"
              >
                {cat.label}
              </label>
              <p className="text-xs text-gray-500 mb-2">{cat.description}</p>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
                <input
                  id={cat.id}
                  type="number"
                  value={deductions[cat.id] || ""}
                  onChange={(e) =>
                    updateDeduction(cat.id, Number(e.target.value))
                  }
                  placeholder={cat.placeholder.toString()}
                  className="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  min={0}
                  step={100}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-emerald-600 rounded-xl p-6 text-white text-center">
        <p className="text-emerald-100 text-sm mb-1">Estimated Tax Savings</p>
        <p className="text-5xl font-bold mb-2">${fmt(totalTaxSavings)}</p>
        <p className="text-emerald-200 text-sm">
          From ${fmt(totalDeductions)} in deductions at{" "}
          {(marginalRate * 100).toFixed(0)}% bracket + SE tax
        </p>
      </div>

      {/* Savings Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          How Deductions Save You Money
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Total Deductions</span>
            <span className="text-gray-900 font-medium">
              ${fmt(totalDeductions)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <span className="text-sm text-gray-600">
                Income Tax Savings
              </span>
              <p className="text-xs text-gray-400">
                At {(marginalRate * 100).toFixed(0)}% marginal rate
              </p>
            </div>
            <span className="text-green-600 font-medium">
              ${fmt(incomeTaxSavings)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <span className="text-sm text-gray-600">
                Self-Employment Tax Savings
              </span>
              <p className="text-xs text-gray-400">
                15.3% on 92.35% of deductions
              </p>
            </div>
            <span className="text-green-600 font-medium">
              ${fmt(seTaxSavings)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 font-bold bg-emerald-50 -mx-6 px-6 rounded">
            <span className="text-emerald-700">Total Tax Savings</span>
            <span className="text-emerald-700 text-lg">
              ${fmt(totalTaxSavings)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Every $1 in deductions saves you approximately $
            {totalDeductions > 0
              ? (totalTaxSavings / totalDeductions).toFixed(2)
              : "0.00"}{" "}
            in taxes.
          </p>
        </div>
      </div>
    </div>
  );
}
