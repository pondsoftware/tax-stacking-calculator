import { Metadata } from "next";
import QuarterlyTaxCalculator from "@/components/QuarterlyTaxCalculator";

export const metadata: Metadata = {
  title: "Quarterly Estimated Tax Calculator 2024 — Form 1040-ES Payments",
  description:
    "Calculate how much to pay in quarterly estimated taxes as a freelancer or side hustler. See payment due dates, safe harbor rules, and avoid underpayment penalties.",
  alternates: {
    canonical: "/quarterly-taxes",
  },
  openGraph: {
    title: "Quarterly Estimated Tax Calculator 2024",
    description:
      "Calculate how much to pay in quarterly estimated taxes as a freelancer or side hustler. See payment due dates and avoid underpayment penalties.",
    type: "website",
    url: "https://sidehustletaxcalculator.net/quarterly-taxes",
  },
};

const faqData = [
  {
    question: "When are quarterly estimated tax payments due?",
    answer:
      "For 2025, quarterly estimated tax payments are due April 15, June 16, September 15, and January 15 (2026). If a due date falls on a weekend or holiday, the deadline moves to the next business day.",
  },
  {
    question: "Do I have to pay quarterly taxes on my side hustle?",
    answer:
      "Yes, if you expect to owe $1,000 or more in taxes when you file your return. This applies to self-employment tax plus any income tax not covered by W-2 withholding.",
  },
  {
    question: "What happens if I miss a quarterly payment?",
    answer:
      "The IRS charges an underpayment penalty calculated as interest on the amount you underpaid for each quarter. The penalty rate is the federal short-term rate plus 3 percentage points, applied for each day the payment is late.",
  },
  {
    question: "How do I pay quarterly estimated taxes?",
    answer:
      "You can pay online at IRS.gov/payments using Direct Pay or EFTPS, by mailing a check with Form 1040-ES voucher, or through the IRS2Go mobile app. Most states have separate quarterly payment requirements.",
  },
  {
    question: "What is the safe harbor rule for estimated taxes?",
    answer:
      "To avoid penalties, pay at least 90% of your current year tax liability OR 100% of last year's tax (110% if your AGI was over $150,000). Meeting either threshold protects you from penalties.",
  },
  {
    question: "Can I adjust my quarterly payments throughout the year?",
    answer:
      "Yes. If your income changes, you can increase or decrease future quarterly payments. You don't have to pay the same amount each quarter. Use the annualized income installment method if your income is uneven.",
  },
];

export default function QuarterlyTaxesPage() {
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
                name: "Quarterly Tax Calculator",
                item: "https://sidehustletaxcalculator.net/quarterly-taxes",
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
          <span className="text-gray-900">Quarterly Tax Calculator</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Quarterly Estimated Tax Calculator (Form 1040-ES)
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Figure out exactly how much to pay each quarter to avoid
            underpayment penalties. Accounts for your W-2 withholding, side
            hustle income, self-employment tax, and state taxes.
          </p>
        </div>

        <QuarterlyTaxCalculator />

        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Why Side Hustlers Must Pay Quarterly
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
              <p>
                The U.S. tax system is pay-as-you-go. W-2 employees have taxes
                withheld from every paycheck, but self-employment income has no
                automatic withholding. The IRS expects you to pay taxes on this
                income throughout the year via quarterly estimated payments.
              </p>
              <p>
                If you wait until April to pay all your taxes on side hustle
                income, you&apos;ll face underpayment penalties — essentially
                interest charged on what you should have paid each quarter.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2025 Quarterly Payment Due Dates
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                      Quarter
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                      Income Period
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                      Due Date
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                      Form
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3">Q1</td>
                    <td className="px-4 py-3">Jan 1 – Mar 31</td>
                    <td className="px-4 py-3 font-medium">April 15, 2025</td>
                    <td className="px-4 py-3">1040-ES</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3">Q2</td>
                    <td className="px-4 py-3">Apr 1 – May 31</td>
                    <td className="px-4 py-3 font-medium">June 16, 2025</td>
                    <td className="px-4 py-3">1040-ES</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3">Q3</td>
                    <td className="px-4 py-3">Jun 1 – Aug 31</td>
                    <td className="px-4 py-3 font-medium">
                      September 15, 2025
                    </td>
                    <td className="px-4 py-3">1040-ES</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Q4</td>
                    <td className="px-4 py-3">Sep 1 – Dec 31</td>
                    <td className="px-4 py-3 font-medium">
                      January 15, 2026
                    </td>
                    <td className="px-4 py-3">1040-ES</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Note: Q2 covers only 2 months while Q4 covers 4 months. If your
              income isn&apos;t evenly distributed, consider the annualized
              income method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Tips for Managing Quarterly Payments
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
                  <strong>Set aside 25-30% of every payment.</strong> Transfer
                  a percentage of each side hustle payment to a separate savings
                  account immediately.
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
                  <strong>Increase W-2 withholding instead.</strong> If you have
                  a day job, you can submit a new W-4 to increase withholding and
                  skip quarterly payments entirely.
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
                  <strong>Use EFTPS for automatic payments.</strong> The
                  Electronic Federal Tax Payment System lets you schedule
                  payments in advance so you never miss a deadline.
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
                See total tax impact of 1099 income on top of W-2
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
                Break down the 15.3% SE tax in detail
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
                Lower your quarterly payments with deductions
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
