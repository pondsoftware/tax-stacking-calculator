import { Metadata } from "next";
import SelfEmploymentTaxCalculator from "@/components/SelfEmploymentTaxCalculator";

export const metadata: Metadata = {
  title: "Self-Employment Tax Calculator 2024 — Calculate 15.3% SE Tax",
  description:
    "Calculate your self-employment tax (15.3%) including Social Security (12.4%) and Medicare (2.9%). See how the SE tax deduction reduces your income tax.",
  alternates: {
    canonical: "/self-employment-tax",
  },
  openGraph: {
    title: "Self-Employment Tax Calculator 2024",
    description:
      "Calculate your self-employment tax (15.3%) including Social Security (12.4%) and Medicare (2.9%). See how the SE tax deduction reduces your income tax.",
    type: "website",
    url: "https://sidehustletaxcalculator.net/self-employment-tax",
  },
};

const faqData = [
  {
    question: "What is the self-employment tax rate for 2024?",
    answer:
      "The self-employment tax rate is 15.3%, consisting of 12.4% for Social Security and 2.9% for Medicare. This is applied to 92.35% of your net self-employment income.",
  },
  {
    question: "Who has to pay self-employment tax?",
    answer:
      "Anyone who earns $400 or more in net self-employment income must pay SE tax. This includes freelancers, independent contractors, gig workers, sole proprietors, and partners in a partnership.",
  },
  {
    question: "Can I deduct self-employment tax?",
    answer:
      "Yes, you can deduct the employer-equivalent portion (half) of your self-employment tax when calculating your adjusted gross income. This is an above-the-line deduction on Schedule SE.",
  },
  {
    question: "What is the Social Security wage base for 2024?",
    answer:
      "The Social Security wage base for 2024 is $168,600. You only pay the 12.4% Social Security portion on earnings up to this amount. Any W-2 wages count toward this cap first.",
  },
  {
    question: "Is self-employment tax the same as income tax?",
    answer:
      "No. Self-employment tax covers Social Security and Medicare contributions (similar to FICA for employees). You pay SE tax in addition to federal and state income tax on your earnings.",
  },
  {
    question: "How do I reduce my self-employment tax?",
    answer:
      "Reduce SE tax by maximizing legitimate business deductions (which lower net SE income), electing S-Corp status if income is high enough, or hiring family members. You cannot avoid SE tax through retirement contributions.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Self-Employment Tax Calculator",
  description: "Calculate your self-employment tax (15.3%) including Social Security (12.4%) and Medicare (2.9%). See how the SE tax deduction reduces your income tax.",
  url: "https://sidehustletaxcalculator.net/self-employment-tax",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function SelfEmploymentTaxPage() {
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
                name: "Self-Employment Tax Calculator",
                item: "https://sidehustletaxcalculator.net/self-employment-tax",
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
          <span className="text-gray-900">Self-Employment Tax Calculator</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Self-Employment Tax Calculator (2024)
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Calculate the 15.3% self-employment tax on your freelance, gig, or
            side hustle income. See exactly how much goes to Social Security
            (12.4%) and Medicare (2.9%), and how much you can deduct.
          </p>
        </div>

        <SelfEmploymentTaxCalculator />

        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Understanding the 15.3% Self-Employment Tax
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
              <p>
                When you work as a W-2 employee, your employer pays half of your
                Social Security and Medicare taxes (7.65%), and you pay the other
                half through payroll deductions. As a self-employed individual,
                you are both the employer and employee — so you pay the full
                15.3%.
              </p>
              <p>
                The 15.3% breaks down into two components: 12.4% for Social
                Security (capped at the wage base of $168,600 in 2024) and 2.9%
                for Medicare (no income cap). If your earnings exceed $200,000
                ($250,000 married filing jointly), you also pay an additional
                0.9% Medicare surtax.
              </p>
              <p>
                The IRS applies SE tax to 92.35% of your net self-employment
                income rather than 100%. This adjustment simulates the fact that
                employers don&apos;t pay FICA tax on the employer&apos;s share of
                FICA — it reduces your taxable base slightly.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              The Half-of-SE-Tax Deduction
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
              <p>
                You can deduct the employer-equivalent portion (50%) of your
                self-employment tax when calculating your adjusted gross income
                (AGI). This is reported on Schedule SE and transferred to Form
                1040.
              </p>
              <p>
                This deduction reduces your income tax but does not reduce your
                self-employment tax itself. For example, if your SE tax is
                $7,650, you can deduct $3,825 from your AGI, which might save
                you $840-$1,415 in income tax depending on your bracket.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              SE Tax vs. FICA: What&apos;s the Difference?
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
              <p>
                FICA (Federal Insurance Contributions Act) and self-employment
                tax fund the same programs — Social Security and Medicare. The
                difference is who pays:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>FICA:</strong> Split 50/50 between employer (7.65%) and
                  employee (7.65%). Total: 15.3%.
                </li>
                <li>
                  <strong>SE Tax:</strong> You pay the full 15.3% because
                  you&apos;re both employer and employee. But you get to deduct
                  half.
                </li>
              </ul>
              <p>
                The net cost is slightly less than 15.3% because of the 92.35%
                adjustment and the half-deduction. Your effective SE tax rate
                ends up around 14.1% of net income.
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
                See total tax impact of 1099 income on top of W-2
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
                Estimate quarterly estimated tax payments
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
                Calculate tax savings from business deductions
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
                Calculate taxes on 1099-NEC and 1099-K income
              </p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
