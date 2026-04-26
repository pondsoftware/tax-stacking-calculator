import TaxCalculator from "@/components/TaxCalculator";

const faqData = [
  {
    question: "How much tax do I pay on side hustle income?",
    answer: "Side hustle income is subject to both federal income tax at your marginal rate and self-employment tax of 15.3% (12.4% Social Security + 2.9% Medicare). You can deduct half of SE tax from your income."
  },
  {
    question: "Do I need to pay quarterly estimated taxes?",
    answer: "Yes, if you expect to owe $1,000 or more in taxes. Quarterly payments are due April 15, June 15, September 15, and January 15. Missing payments can result in penalties."
  },
  {
    question: "What is self-employment tax?",
    answer: "Self-employment tax covers Social Security and Medicare contributions that would normally be split between you and an employer. As self-employed, you pay both halves — 15.3% total on 92.35% of net earnings."
  },
  {
    question: "What can I deduct as a side hustler?",
    answer: "Common deductions include home office expenses, equipment, software subscriptions, mileage, health insurance premiums, and retirement contributions (SEP IRA, Solo 401k)."
  },
  {
    question: "What is the QBI deduction?",
    answer: "The Qualified Business Income deduction lets sole proprietors deduct up to 20% of qualified business income, reducing taxable income. It phases out at higher income levels."
  }
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "1099 & 1040-ES Tax Calculator for Independent Contractors",
  description: "Estimate your 1099 taxes, quarterly 1040-ES payments, and take-home pay. Built for independent contractors, freelancers, and gig workers.",
  url: "https://sidehustletaxcalculator.net",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          1099 Tax Calculator for Independent Contractors &amp; Gig Workers
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Most tax calculators treat your income as one lump sum. This one shows
          what really happens when you stack 1099 income on top of your W-2
          job — including the 15.3% self-employment tax and your quarterly
          1040-ES estimated payments.
        </p>
      </div>

      <TaxCalculator />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Why Side Hustle Income Is Taxed Differently
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
            <p>
              When you earn money as a W-2 employee, your employer pays half of
              your Social Security and Medicare taxes (7.65%). You only see your
              half deducted from your paycheck.
            </p>
            <p>
              As a 1099 contractor or freelancer, you are both the employer and
              the employee. That means you pay the full 15.3% self-employment
              tax — 12.4% for Social Security (up to the wage base of $168,600
              in 2024) and 2.9% for Medicare (no cap).
            </p>
            <p>
              On top of that, your side hustle income stacks on top of your W-2
              salary, so every dollar is taxed at your highest marginal bracket.
              If your W-2 job puts you in the 22% bracket, your side hustle
              income starts there — not at the bottom.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            How to Reduce Your Side Hustle Tax Bill
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
                <strong>Track every business expense.</strong> Home office,
                internet, software, supplies, mileage — these reduce your net
                self-employment income, lowering both income tax and SE tax.
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
                <strong>Consider an S-Corp election.</strong> If your side hustle
                earns over $40-50K, forming an S-Corp lets you pay yourself a
                reasonable salary and take the rest as distributions, avoiding SE
                tax on the distribution portion.
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
                <strong>Open a Solo 401(k) or SEP IRA.</strong> You can
                contribute up to $23,000 (employee) plus 25% of net
                self-employment income (employer) to a Solo 401(k), reducing
                your taxable income significantly.
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
                <strong>Pay quarterly estimated taxes.</strong> Avoid a surprise
                tax bill (and potential penalties) by paying estimated taxes each
                quarter using IRS Form 1040-ES.
              </div>
            </li>
          </ul>
        </section>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">More Tax Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/self-employment-tax"
            className="block p-5 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50 transition"
          >
            <h3 className="font-semibold text-gray-900 mb-1">
              Self-Employment Tax Calculator
            </h3>
            <p className="text-sm text-gray-500">
              Break down the 15.3% SE tax into Social Security and Medicare components. See your deductible half.
            </p>
          </a>
          <a
            href="/quarterly-taxes"
            className="block p-5 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50 transition"
          >
            <h3 className="font-semibold text-gray-900 mb-1">
              Quarterly Estimated Tax Calculator
            </h3>
            <p className="text-sm text-gray-500">
              Figure out how much to pay each quarter to avoid underpayment penalties. Includes due dates.
            </p>
          </a>
          <a
            href="/deductions"
            className="block p-5 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50 transition"
          >
            <h3 className="font-semibold text-gray-900 mb-1">
              Deduction Estimator
            </h3>
            <p className="text-sm text-gray-500">
              Calculate tax savings from home office, mileage, software, health insurance, and retirement contributions.
            </p>
          </a>
          <a
            href="/1099-taxes"
            className="block p-5 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50 transition"
          >
            <h3 className="font-semibold text-gray-900 mb-1">
              1099 Tax Calculator
            </h3>
            <p className="text-sm text-gray-500">
              Calculate taxes on 1099-NEC and 1099-K income. Compare W-2 vs 1099 tax treatment.
            </p>
          </a>
          <a
            href="/state-taxes"
            className="block p-5 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50 transition sm:col-span-2"
          >
            <h3 className="font-semibold text-gray-900 mb-1">
              State Tax Comparison
            </h3>
            <p className="text-sm text-gray-500">
              Compare state income tax rates across all 50 states. See which no-tax states save you the most on side hustle income.
            </p>
          </a>
        </div>
      </section>
    </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sidehustletaxcalculator.net" }
            ]
          })
        }}
      />
    </>
  );
}
