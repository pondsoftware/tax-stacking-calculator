import { Metadata } from "next";
import StateTaxTable from "@/components/StateTaxTable";

export const metadata: Metadata = {
  title: "State Income Tax Rates for Side Hustlers — All 50 States Compared",
  description:
    "Compare state income tax rates across all 50 states for freelancers and side hustlers. See which states have no income tax and how state taxes impact your take-home pay.",
  alternates: {
    canonical: "/state-taxes",
  },
  openGraph: {
    title: "State Income Tax Rates for Side Hustlers — All 50 States",
    description:
      "Compare state income tax rates across all 50 states. See which states have no income tax and how state taxes impact your side hustle take-home pay.",
    type: "website",
    url: "https://sidehustletaxcalculator.net/state-taxes",
  },
};

const faqData = [
  {
    question: "Which states have no income tax?",
    answer:
      "Nine states have no state income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. New Hampshire and Tennessee historically taxed interest and dividends but have phased those taxes out.",
  },
  {
    question: "Do I pay state tax on side hustle income?",
    answer:
      "Yes, if your state has an income tax. Side hustle income (self-employment income) is treated the same as other earned income for state tax purposes. You report it on your state return along with W-2 income.",
  },
  {
    question: "What if I work in a different state than where I live?",
    answer:
      "Generally, you pay state tax where you live (resident state). Some states also tax income earned within their borders, but most have reciprocal agreements. For remote freelance work, you typically pay tax in your state of residence.",
  },
  {
    question: "Can I deduct state taxes on my federal return?",
    answer:
      "Yes, if you itemize deductions. The SALT (State and Local Tax) deduction lets you deduct state income taxes paid, but it's capped at $10,000 per year ($5,000 if married filing separately) under current tax law through 2025.",
  },
  {
    question: "Do states have self-employment tax?",
    answer:
      "No. Self-employment tax (15.3%) is a federal tax only. States do not impose a separate self-employment tax. However, your net SE income is subject to your state's income tax rate.",
  },
  {
    question: "Should I move to a no-income-tax state to save on side hustle taxes?",
    answer:
      "It depends on the full picture. No-income-tax states may have higher property taxes or sales taxes. Moving just for tax savings on a moderate side hustle may not offset the cost. However, for high earners in high-tax states, the savings can be substantial.",
  },
];

export default function StateTaxesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://sidehustletaxcalculator.net",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "State Tax Rates",
                item: "https://sidehustletaxcalculator.net/state-taxes",
              },
            ],
          }),
        }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-emerald-600">
            Home
          </a>{" "}
          &rsaquo;{" "}
          <span className="text-gray-900">State Tax Rates</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            State Income Tax Rates for Side Hustlers (2024)
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Compare how state income taxes affect your side hustle take-home pay
            across all 50 states. Nine states charge no income tax at all —
            see which states save you the most.
          </p>
        </div>

        <StateTaxTable />

        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How State Taxes Affect Side Hustlers
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
              <p>
                While federal taxes and self-employment tax are the biggest
                components of a side hustler&apos;s tax burden, state income tax can
                add a significant additional cost. In high-tax states like
                California (9.3%), Oregon (9.9%), and New York (6.85% + NYC
                local), state taxes can consume an additional 5-10% of your
                income.
              </p>
              <p>
                Conversely, living in a no-income-tax state (Texas, Florida,
                Nevada, etc.) means every dollar earned from your side hustle
                avoids state taxation entirely. On $50,000 of side hustle
                income, the difference between Texas (0%) and California (9.3%)
                is roughly $3,000-$4,000 in state taxes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              States With No Income Tax
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                "Alaska",
                "Florida",
                "Nevada",
                "New Hampshire",
                "South Dakota",
                "Tennessee",
                "Texas",
                "Washington",
                "Wyoming",
              ].map((state) => (
                <div
                  key={state}
                  className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center"
                >
                  <p className="font-medium text-emerald-800">{state}</p>
                  <p className="text-xs text-emerald-600">0% income tax</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Note: New Hampshire and Washington have no income tax on earned
              income. Washington does have a 7% capital gains tax on gains over
              $270,000. New Hampshire taxes interest and dividends at 3% (phasing
              out).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Flat Tax vs. Progressive Tax States
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
              <p>
                States use two approaches to income tax:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Flat tax states</strong> (e.g., Illinois 4.95%,
                  Colorado 4.4%, Utah 4.65%): Same rate regardless of income.
                  Simple to calculate but proportionally higher for lower
                  earners.
                </li>
                <li>
                  <strong>Progressive tax states</strong> (e.g., California,
                  New York, Minnesota): Higher rates on higher income. May be
                  lower for small side hustles but increases as income grows.
                </li>
              </ul>
              <p>
                The rates in our table are effective/approximate rates. For
                progressive states, your actual rate depends on your total
                taxable income level.
              </p>
            </div>
          </section>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqData.map((item, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Related Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/"
              className="block p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition"
            >
              <p className="font-medium text-gray-900">
                Side Hustle Tax Calculator
              </p>
              <p className="text-sm text-gray-500">
                Calculate total taxes with your state selected
              </p>
            </a>
            <a
              href="/self-employment-tax"
              className="block p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition"
            >
              <p className="font-medium text-gray-900">
                Self-Employment Tax Calculator
              </p>
              <p className="text-sm text-gray-500">
                Federal SE tax breakdown
              </p>
            </a>
            <a
              href="/1099-taxes"
              className="block p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition"
            >
              <p className="font-medium text-gray-900">
                1099 Tax Calculator
              </p>
              <p className="text-sm text-gray-500">
                Full 1099 income tax calculation
              </p>
            </a>
            <a
              href="/deductions"
              className="block p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition"
            >
              <p className="font-medium text-gray-900">
                Deduction Estimator
              </p>
              <p className="text-sm text-gray-500">
                Reduce your taxable income
              </p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
