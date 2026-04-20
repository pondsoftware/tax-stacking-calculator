// State income tax rates (flat or approximate effective mid-range rates)
export interface StateTax {
  code: string;
  name: string;
  rate: number; // Decimal (e.g., 0.05 for 5%)
}

export const stateTaxes: StateTax[] = [
  { code: "AL", name: "Alabama", rate: 0.04 },
  { code: "AK", name: "Alaska", rate: 0 },
  { code: "AZ", name: "Arizona", rate: 0.025 },
  { code: "AR", name: "Arkansas", rate: 0.044 },
  { code: "CA", name: "California", rate: 0.093 },
  { code: "CO", name: "Colorado", rate: 0.044 },
  { code: "CT", name: "Connecticut", rate: 0.0699 },
  { code: "DE", name: "Delaware", rate: 0.066 },
  { code: "DC", name: "District of Columbia", rate: 0.085 },
  { code: "FL", name: "Florida", rate: 0 },
  { code: "GA", name: "Georgia", rate: 0.0549 },
  { code: "HI", name: "Hawaii", rate: 0.0825 },
  { code: "ID", name: "Idaho", rate: 0.058 },
  { code: "IL", name: "Illinois", rate: 0.0495 },
  { code: "IN", name: "Indiana", rate: 0.0305 },
  { code: "IA", name: "Iowa", rate: 0.057 },
  { code: "KS", name: "Kansas", rate: 0.057 },
  { code: "KY", name: "Kentucky", rate: 0.04 },
  { code: "LA", name: "Louisiana", rate: 0.0425 },
  { code: "ME", name: "Maine", rate: 0.0715 },
  { code: "MD", name: "Maryland", rate: 0.0575 },
  { code: "MA", name: "Massachusetts", rate: 0.05 },
  { code: "MI", name: "Michigan", rate: 0.0425 },
  { code: "MN", name: "Minnesota", rate: 0.0785 },
  { code: "MS", name: "Mississippi", rate: 0.05 },
  { code: "MO", name: "Missouri", rate: 0.0495 },
  { code: "MT", name: "Montana", rate: 0.0675 },
  { code: "NE", name: "Nebraska", rate: 0.0664 },
  { code: "NV", name: "Nevada", rate: 0 },
  { code: "NH", name: "New Hampshire", rate: 0 },
  { code: "NJ", name: "New Jersey", rate: 0.0637 },
  { code: "NM", name: "New Mexico", rate: 0.059 },
  { code: "NY", name: "New York", rate: 0.0685 },
  { code: "NC", name: "North Carolina", rate: 0.045 },
  { code: "ND", name: "North Dakota", rate: 0.0195 },
  { code: "OH", name: "Ohio", rate: 0.035 },
  { code: "OK", name: "Oklahoma", rate: 0.0475 },
  { code: "OR", name: "Oregon", rate: 0.099 },
  { code: "PA", name: "Pennsylvania", rate: 0.0307 },
  { code: "RI", name: "Rhode Island", rate: 0.0599 },
  { code: "SC", name: "South Carolina", rate: 0.065 },
  { code: "SD", name: "South Dakota", rate: 0 },
  { code: "TN", name: "Tennessee", rate: 0 },
  { code: "TX", name: "Texas", rate: 0 },
  { code: "UT", name: "Utah", rate: 0.0465 },
  { code: "VT", name: "Vermont", rate: 0.066 },
  { code: "VA", name: "Virginia", rate: 0.0575 },
  { code: "WA", name: "Washington", rate: 0 },
  { code: "WV", name: "West Virginia", rate: 0.065 },
  { code: "WI", name: "Wisconsin", rate: 0.053 },
  { code: "WY", name: "Wyoming", rate: 0 },
];

export function getStateTax(stateCode: string): StateTax | undefined {
  return stateTaxes.find((s) => s.code === stateCode);
}

export function calculateStateTax(taxableIncome: number, stateCode: string): number {
  const state = getStateTax(stateCode);
  if (!state) return 0;
  return Math.max(0, taxableIncome) * state.rate;
}
