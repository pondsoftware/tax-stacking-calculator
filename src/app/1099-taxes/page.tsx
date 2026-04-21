import { Metadata } from "next";
import Income1099Calculator from "@/components/Income1099Calculator";

export const metadata: Metadata = {
  title: "1099 Tax Calculator 2024 — Calculate Taxes on 1099 Income",
  description:
    "Calculate how much tax you owe on 1099-NEC and 1099-K income. Includes federal income tax, self-employment tax, and state taxes. See W-2 vs 1099 comparison.",
  alternates: {
    canonical: "/1099-taxes",
  },
  openGraph: {
    title: "1099 Tax Calculator 2024",
    description:
      "Calculate how much tax you owe on 1099-NEC and 1099-K income. Includes federal income tax, self-employment tax, and state taxes.",
    type: "website",
    url: "https://sidehustletaxcalculator.net/1099-taxes",
  },
};

const faqData = [
  {
    question: "How much tax do I pay on 1099 income?",
    answer:
      "1099 income is subject to federal income tax (10-37% depending on bracket), self-employment tax (15.3% on 92.35% of net income), and state income tax if applicable. Most 1099 workers pay 25-40% total in taxes on their net income.",
  },
  {
    question: "What is the difference between 1099-NEC and 1099-K?",
    answer:
      "1099-NEC reports direct payments of $600+ from clients for freelance/contract work. 1099-K reports payments processed through third-party platforms (PayPal, Stripe, Venmo, etc.) with the threshold being $5,000 in 2024. Both represent taxable income, but 1099-K gross amounts may include refunds, shipping, or sales tax you need to subtract.",
  },
  {
    question: "Do I pay taxes on 1099 income if I also have a W-2 job?",
    answer:
      "Yes. Your 1099 income is taxed in addition to your W-2 income. The 1099 income stacks on top of your W-2 salary, so it's taxed at your highest marginal bracket. You also owe self-employment tax on the 1099 portion, which your W-2 job doesn't cover.",
  },
  {
    question: "What expenses can I deduct from 1099 income?",
    answer:
      "You can deduct ordinary and necessary business expenses on Schedule C: home office, mileage, supplies, software, internet/phone (business portion), health insurance, retirement contributions, professional development, and marketing costs. These reduce both income tax and SE tax.",
  },
  {
    question: "Do I need to file taxes if I made less than $600 on 1099?",
    answer:
      "Yes. The $600 threshold only determines whether the payer must send you a 1099 form. You must report ALL self-employment income regardless of amount. If net SE income exceeds $400, you must file Schedule SE and pay self-employment tax.",
  },
  {
    question: "What is the 1099-K threshold for 2024?",
    answer:
      "For 2024, payment platforms must issue a 1099-K if they processed $5,000 or more in gross payments to you. This was a transitional threshold — it was originally supposed to drop to $600 but has been delayed. Remember: you owe tax on all income regardless of whether you receive a 1099.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "1099 Tax Calculator",
  description: "Calculate how much tax you owe on 1099-NEC and 1099-K income. Includes federal income tax, self-employment tax, and state taxes. See W-2 vs 1099 comparison.",
  url: "https://sidehustletaxcalculator.net/1099-taxes",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Taxes1099Page() {
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
                name: "1099 Tax Calculator",
                item: "https://sidehustletaxcalculator.net/1099-taxes",
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
          <span className="text-gray-900">1099 Tax Calculator</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            1099 Tax Calculator — How Much Do You Owe?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Calculate taxes on your 1099-NEC and 1099-K income. See exactly how
            much goes to federal income tax, self-employment tax, and state
            taxes — and what you actually keep.
          </p>
        </div>

        <Income1099Calculator />

        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How 1099 Income Is Taxed vs. W-2 Income
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
              <p>
                The biggest shock for new freelancers is realizing that 1099
                income is taxed significantly more than W-2 income. Here&apos;s
                why:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>No employer FICA match:</strong> W-2 employees only
                  pay 7.65% for Social Security and Medicare — their employer
                  pays the other 7.65%. As a 1099 contractor, you pay both
                  halves (15.3%).
                </li>
                <li>
                  <strong>No tax withholding:</strong> Nothing is withheld from
                  1099 payments, so you must plan ahead and pay quarterly.
                </li>
                <li>
                  <strong>No employer benefits:</strong> You fund your own
                  health insurance, retirement, and paid time off from
                  pre-tax dollars.
                </li>
              </ul>
              <p>
                The trade-off: 1099 workers can deduct business expenses that
                W-2 employees cannot (since the 2017 Tax Cuts and Jobs Act
                eliminated unreimbursed employee expense deductions).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Understanding Your 1099 Forms
            </h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  1099-NEC (Non-Employee Compensation)
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  You receive this from any client who paid you $600 or more
                  during the year for services. Key points:
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>Reports gross payments — no taxes withheld</li>
                  <li>
                    Filed by the payer by January 31 each year
                  </li>
                  <li>
                    All amounts are generally subject to SE tax
                  </li>
                  <li>
                    You must report income even if you don&apos;t receive a 1099
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  1099-K (Payment Card and Third-Party Transactions)
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Issued by payment platforms when you exceed the reporting
                  threshold. Important distinctions:
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>
                    Reports GROSS transaction volume — includes refunds, shipping,
                    sales tax
                  </li>
                  <li>
                    2024 threshold: $5,000 in gross payments
                  </li>
                  <li>
                    Your taxable income is gross minus returns, cost of goods
                    sold, and expenses
                  </li>
                  <li>
                    May overlap with 1099-NEC — don&apos;t double-count
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  1099-MISC (Miscellaneous Income)
                </h3>
                <p className="text-gray-600 text-sm">
                  Less common for side hustlers since 2020. Now mainly used for
                  rent payments, royalties, prizes, and other non-service
                  income. If you receive this for services, it may be a payer
                  error — the correct form is usually 1099-NEC.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Steps to File Taxes on 1099 Income
            </h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex gap-4 items-start">
                <span className="bg-emerald-100 text-emerald-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shrink-0">
                  1
                </span>
                <div>
                  <p className="font-medium text-gray-900">
                    Gather all 1099 forms and income records
                  </p>
                  <p className="text-sm">
                    Include any income not reported on a 1099 (under $600
                    payments, cash, crypto).
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="bg-emerald-100 text-emerald-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shrink-0">
                  2
                </span>
                <div>
                  <p className="font-medium text-gray-900">
                    Total your business expenses
                  </p>
                  <p className="text-sm">
                    Organize by category (supplies, mileage, home office, etc.)
                    for Schedule C.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="bg-emerald-100 text-emerald-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shrink-0">
                  3
                </span>
                <div>
                  <p className="font-medium text-gray-900">
                    Complete Schedule C (Profit or Loss)
                  </p>
                  <p className="text-sm">
                    Report gross income, subtract expenses, calculate net profit.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="bg-emerald-100 text-emerald-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shrink-0">
                  4
                </span>
                <div>
                  <p className="font-medium text-gray-900">
                    Complete Schedule SE (Self-Employment Tax)
                  </p>
                  <p className="text-sm">
                    Calculate 15.3% SE tax on net profit and the deductible
                    half.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="bg-emerald-100 text-emerald-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shrink-0">
                  5
                </span>
                <div>
                  <p className="font-medium text-gray-900">
                    File Form 1040 with all schedules
                  </p>
                  <p className="text-sm">
                    Include Schedule C, SE, and estimated tax payments made
                    (Form 1040-ES).
                  </p>
                </div>
              </div>
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
                See 1099 income stacked on W-2 salary
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
                Deep dive into the 15.3% SE tax
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
                Figure out your quarterly payments
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
                Reduce your 1099 tax bill with deductions
              </p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
