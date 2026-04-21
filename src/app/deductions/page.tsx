import { Metadata } from "next";
import DeductionEstimator from "@/components/DeductionEstimator";

export const metadata: Metadata = {
  title: "Side Hustle Tax Deductions Calculator — Estimate Your Savings",
  description:
    "Calculate tax savings from common side hustle deductions: home office, mileage, supplies, software, health insurance, and retirement contributions. See how much each deduction saves.",
  alternates: {
    canonical: "/deductions",
  },
  openGraph: {
    title: "Side Hustle Tax Deductions Calculator",
    description:
      "Calculate tax savings from common side hustle deductions: home office, mileage, supplies, software, health insurance, and retirement contributions.",
    type: "website",
    url: "https://sidehustletaxcalculator.net/deductions",
  },
};

const faqData = [
  {
    question: "What are the most common side hustle tax deductions?",
    answer:
      "The most common deductions include home office expenses, business mileage (67 cents/mile in 2024), supplies and equipment, software subscriptions, internet/phone (business portion), health insurance premiums, retirement contributions, and education related to your business.",
  },
  {
    question: "Can I deduct my home office if I also have a W-2 job?",
    answer:
      "Yes. The home office deduction is available for your self-employment income regardless of whether you also have a W-2 job. The space must be used regularly and exclusively for business. You can use the simplified method ($5/sq ft, up to 300 sq ft) or calculate actual expenses.",
  },
  {
    question: "How does the mileage deduction work?",
    answer:
      "For 2024, you can deduct 67 cents per business mile. Track all miles driven for business purposes (client meetings, supply runs, etc.). Commuting to a regular office does NOT count. You must keep a mileage log with dates, destinations, and business purpose.",
  },
  {
    question: "Can I deduct health insurance as a side hustler?",
    answer:
      "If you're self-employed and not eligible for an employer-sponsored health plan (or your spouse's plan), you can deduct 100% of health insurance premiums for yourself, your spouse, and dependents. This is an above-the-line deduction.",
  },
  {
    question: "What retirement accounts can side hustlers use for deductions?",
    answer:
      "Side hustlers can contribute to a SEP IRA (up to 25% of net SE income, max $69,000), Solo 401(k) ($23,000 employee + 25% employer contributions), or SIMPLE IRA ($16,000 + 3% match). These reduce both income tax and potentially QBI deduction calculations.",
  },
  {
    question: "Do deductions reduce self-employment tax too?",
    answer:
      "Yes! Business deductions reduce your net self-employment income, which lowers both your income tax AND your 15.3% self-employment tax. A $1,000 deduction saves approximately $141 in SE tax alone, plus additional income tax savings at your marginal rate.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tax Deductions Calculator",
  description: "Calculate tax savings from common side hustle deductions: home office, mileage, supplies, software, health insurance, and retirement contributions. See how much each deduction saves.",
  url: "https://sidehustletaxcalculator.net/deductions",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function DeductionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
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
                name: "Tax Deductions Calculator",
                item: "https://sidehustletaxcalculator.net/deductions",
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
          <span className="text-gray-900">Tax Deductions Calculator</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Side Hustle Tax Deductions Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Every dollar you deduct reduces both your income tax and
            self-employment tax. Use this calculator to estimate how much common
            business deductions will save you.
          </p>
        </div>

        <DeductionEstimator />

        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Why Deductions Matter More for Side Hustlers
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
              <p>
                As a W-2 employee, your deductions only reduce income tax. But
                as a self-employed side hustler, deductions reduce both income
                tax AND the 15.3% self-employment tax. This means every $1,000
                in business deductions saves you approximately $350-$500 in
                total taxes, depending on your bracket.
              </p>
              <p>
                Business deductions are reported on Schedule C (Profit or Loss
                from Business) and reduce your net self-employment income before
                any tax calculations. The lower your Schedule C profit, the less
                you owe in both income tax and SE tax.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Common Side Hustle Deductions Guide
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Home Office Deduction
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  If you use a dedicated space in your home regularly and
                  exclusively for business, you can deduct home office expenses.
                  Two methods:
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>
                    <strong>Simplified method:</strong> $5 per square foot, up
                    to 300 sq ft (max $1,500/year)
                  </li>
                  <li>
                    <strong>Regular method:</strong> Calculate actual expenses
                    (rent/mortgage interest, utilities, insurance, repairs)
                    proportional to office square footage
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Business Mileage
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Deduct miles driven for business purposes at the standard
                  mileage rate:
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>
                    <strong>2024 rate:</strong> $0.67 per mile
                  </li>
                  <li>Includes client meetings, supply runs, bank trips</li>
                  <li>
                    Does NOT include regular commuting to a fixed office location
                  </li>
                  <li>Keep a mileage log with date, destination, and purpose</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Health Insurance (Self-Employed)
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Deduct 100% of health, dental, and vision insurance premiums if:
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>You have net self-employment income</li>
                  <li>
                    You&apos;re not eligible for employer-sponsored coverage
                    (including spouse&apos;s plan)
                  </li>
                  <li>
                    Deduction can&apos;t exceed net SE income for the year
                  </li>
                  <li>
                    This is an above-the-line deduction (reduces AGI, not
                    Schedule C)
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Retirement Contributions
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Self-employed retirement plans offer large deductions:
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>
                    <strong>Solo 401(k):</strong> $23,000 employee + 25% of net
                    SE income as employer (up to $69,000 total)
                  </li>
                  <li>
                    <strong>SEP IRA:</strong> Up to 25% of net SE income (max
                    $69,000)
                  </li>
                  <li>
                    <strong>SIMPLE IRA:</strong> $16,000 employee + 3% employer
                    match
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Software & Technology
                </h3>
                <p className="text-gray-600 text-sm">
                  Deduct business-use software, hosting, domains, cloud
                  services, and the business-use percentage of your internet and
                  phone bills. If you use your phone 60% for business, you can
                  deduct 60% of the bill.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Deduction Record-Keeping Tips
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3">
                <span className="text-green-500 mt-0.5 shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <strong>Keep receipts for everything.</strong> Use an app to
                  photograph receipts immediately — paper fades. The IRS
                  requires documentation for all deductions.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-0.5 shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <strong>Use a separate business bank account.</strong> Mixing
                  personal and business expenses makes it harder to identify
                  deductions and raises audit risk.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-0.5 shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <strong>Track mileage as you drive.</strong> Reconstructing a
                  mileage log at tax time is inaccurate and won&apos;t hold up to
                  an audit. Use a mileage tracking app.
                </div>
              </li>
            </ul>
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
                See total tax with deductions applied
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
                See how deductions lower SE tax
              </p>
            </a>
            <a
              href="/quarterly-taxes"
              className="block p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition"
            >
              <p className="font-medium text-gray-900">
                Quarterly Tax Calculator
              </p>
              <p className="text-sm text-gray-500">
                Lower quarterly payments with deductions
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
                Calculate total taxes on 1099 income
              </p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
