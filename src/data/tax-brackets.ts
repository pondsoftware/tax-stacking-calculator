import { calculateStateTax } from "./state-taxes";

// 2024 Federal Income Tax Brackets
export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export const federalBrackets: Record<string, TaxBracket[]> = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  head: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
};

export const standardDeduction: Record<string, number> = {
  single: 14600,
  married: 29200,
  head: 21900,
};

// Self-employment tax constants (2024)
export const SE_TAX_RATE = 0.153; // 15.3% (12.4% SS + 2.9% Medicare)
export const SS_WAGE_BASE = 168600; // Social Security wage base for 2024
export const SS_RATE = 0.124;
export const MEDICARE_RATE = 0.029;
export const ADDITIONAL_MEDICARE_THRESHOLD_SINGLE = 200000;
export const ADDITIONAL_MEDICARE_THRESHOLD_MARRIED = 250000;
export const ADDITIONAL_MEDICARE_RATE = 0.009;

export type FilingStatus = "single" | "married" | "head";

export function calculateFederalTax(
  taxableIncome: number,
  status: FilingStatus
): number {
  const brackets = federalBrackets[status];
  let tax = 0;
  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket =
      Math.min(taxableIncome, bracket.max) - bracket.min;
    tax += taxableInBracket * bracket.rate;
  }
  return tax;
}

export function getMarginalRate(
  taxableIncome: number,
  status: FilingStatus
): number {
  const brackets = federalBrackets[status];
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome > brackets[i].min) {
      return brackets[i].rate;
    }
  }
  return brackets[0].rate;
}

export function calculateSETax(selfEmploymentIncome: number, w2Wages: number) {
  // 92.35% of SE income is subject to SE tax
  const seEarnings = selfEmploymentIncome * 0.9235;

  // Social Security portion: 12.4% up to wage base, reduced by W-2 wages already taxed
  const ssRemaining = Math.max(0, SS_WAGE_BASE - w2Wages);
  const ssTaxableEarnings = Math.min(seEarnings, ssRemaining);
  const ssTax = ssTaxableEarnings * SS_RATE;

  // Medicare portion: 2.9% on all SE earnings (no cap)
  const medicareTax = seEarnings * MEDICARE_RATE;

  return {
    socialSecurity: ssTax,
    medicare: medicareTax,
    total: ssTax + medicareTax,
    seEarnings,
    deductibleHalf: (ssTax + medicareTax) / 2,
  };
}

// QBI deduction thresholds (2024)
export const QBI_RATE = 0.20;
export const QBI_THRESHOLD_SINGLE = 191950;
export const QBI_THRESHOLD_MARRIED = 383900;

export interface TaxBreakdown {
  // W-2 only
  w2TaxableIncome: number;
  w2FederalTax: number;
  w2EffectiveRate: number;
  w2MarginalRate: number;

  // Combined (W-2 + 1099)
  grossSideIncome: number;
  seTax: {
    socialSecurity: number;
    medicare: number;
    total: number;
    deductibleHalf: number;
  };
  qbiDeduction: number;
  stateTax: number;
  stateCode: string;
  combinedTaxableIncome: number;
  combinedFederalTax: number;
  combinedEffectiveRate: number;
  combinedMarginalRate: number;

  // Marginal impact of side hustle
  additionalFederalTax: number;
  totalAdditionalTax: number;
  marginalTaxRate: number;
  takeHomePer1099Dollar: number;
  sideHustleTakeHome: number;

  // Quarterly estimates
  quarterlyPayment: number;
}

export function calculateFullBreakdown(
  w2Salary: number,
  sideIncome: number,
  status: FilingStatus,
  businessExpenses: number = 0,
  stateCode: string = "TX"
): TaxBreakdown {
  const deduction = standardDeduction[status];

  // W-2 only
  const w2TaxableIncome = Math.max(0, w2Salary - deduction);
  const w2FederalTax = calculateFederalTax(w2TaxableIncome, status);
  const w2EffectiveRate = w2Salary > 0 ? w2FederalTax / w2Salary : 0;
  const w2MarginalRate = getMarginalRate(w2TaxableIncome, status);

  // Side hustle
  const netSideIncome = Math.max(0, sideIncome - businessExpenses);
  const seTax = calculateSETax(netSideIncome, w2Salary);

  // QBI Deduction: 20% of (net side income - half of SE tax)
  const qbiThreshold =
    status === "married" ? QBI_THRESHOLD_MARRIED : QBI_THRESHOLD_SINGLE;
  const combinedAGIPreQBI = w2Salary + netSideIncome - seTax.deductibleHalf;
  const combinedTaxablePreQBI = Math.max(0, combinedAGIPreQBI - deduction);
  const qbiEligible = combinedTaxablePreQBI <= qbiThreshold;
  const qbiDeduction = qbiEligible
    ? Math.max(0, (netSideIncome - seTax.deductibleHalf) * QBI_RATE)
    : 0;

  // Combined taxable income (with QBI deduction)
  const combinedTaxableIncome = Math.max(0, combinedTaxablePreQBI - qbiDeduction);
  const combinedFederalTax = calculateFederalTax(combinedTaxableIncome, status);
  const totalIncome = w2Salary + sideIncome;

  // State tax on combined taxable income
  const stateTax = calculateStateTax(combinedTaxableIncome, stateCode);

  const combinedEffectiveRate =
    totalIncome > 0
      ? (combinedFederalTax + seTax.total + stateTax) / totalIncome
      : 0;
  const combinedMarginalRate = getMarginalRate(combinedTaxableIncome, status);

  // Marginal impact
  const additionalFederalTax = combinedFederalTax - w2FederalTax;
  const totalAdditionalTax = additionalFederalTax + seTax.total + stateTax;
  const marginalTaxRate =
    netSideIncome > 0 ? totalAdditionalTax / netSideIncome : 0;
  const takeHomePer1099Dollar =
    netSideIncome > 0 ? 1 - totalAdditionalTax / netSideIncome : 1;
  const sideHustleTakeHome = netSideIncome - totalAdditionalTax;

  // Quarterly estimated payment (total tax liability / 4)
  const totalTaxLiability = combinedFederalTax + seTax.total + stateTax;
  const quarterlyPayment = totalTaxLiability / 4;

  return {
    w2TaxableIncome,
    w2FederalTax,
    w2EffectiveRate,
    w2MarginalRate,
    grossSideIncome: sideIncome,
    seTax,
    qbiDeduction,
    stateTax,
    stateCode,
    combinedTaxableIncome,
    combinedFederalTax,
    combinedEffectiveRate,
    combinedMarginalRate,
    additionalFederalTax,
    totalAdditionalTax,
    marginalTaxRate,
    takeHomePer1099Dollar,
    sideHustleTakeHome,
    quarterlyPayment,
  };
}
