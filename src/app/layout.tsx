import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sidehustletaxcalculator.net"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
  title: "Side Hustle Tax Calculator — 1099 vs W-2 Tax Impact",
  description:
    "See exactly how much tax you'll pay on side hustle income stacked on top of your W-2 job. Includes self-employment tax, marginal brackets, and take-home calculation.",
  openGraph: {
    title: "Side Hustle Tax Calculator",
    description:
      "See exactly how much tax you'll pay on side hustle income stacked on top of your W-2 job. Includes self-employment tax, marginal brackets, and take-home calculation.",
    type: "website",
    url: "https://sidehustletaxcalculator.net",
    siteName: "Side Hustle Tax Calculator",
  },
  twitter: {
    card: "summary",
    title: "Side Hustle Tax Calculator",
    description:
      "See exactly how much tax you'll pay on side hustle income stacked on top of your W-2 job. Includes self-employment tax, marginal brackets, and take-home calculation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-K7FMZ8XELQ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-K7FMZ8XELQ');
        `}
      </Script>
      <body className="min-h-full flex flex-col font-sans bg-gray-50 text-gray-900">
        <header className="bg-emerald-600 text-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center gap-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-xl font-bold">Side Hustle Tax Calculator</span>
            </a>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 text-center mb-2">More Free Tools</p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
                <a href="https://appliancecostcalculator.net" className="text-emerald-600 hover:underline">Appliance Cost Calculator</a>
                <a href="https://imageconverters.net" className="text-emerald-600 hover:underline">Image Converter</a>
                <a href="https://photometadata.net" className="text-emerald-600 hover:underline">Photo Metadata Viewer</a>
                <a href="https://freelancerates.net" className="text-emerald-600 hover:underline">Freelance Rate Calculator</a>
                <a href="https://imageresizers.net" className="text-emerald-600 hover:underline">Social Image Resizer</a>
                <a href="https://lendingcalculator.net" className="text-emerald-600 hover:underline">Mortgage Calculator</a>
                <a href="https://compoundinterestcalc.app" className="text-emerald-600 hover:underline">Compound Interest Calculator</a>
                <a href="https://salaryconverter.net" className="text-emerald-600 hover:underline">Salary Converter</a>
                <a href="https://printablepolly.com" className="text-emerald-600 hover:underline">Printable Polly</a>
                <a href="https://biblegarden.net" className="text-emerald-600 hover:underline">Bible Garden</a>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center">
              This calculator provides estimates based on 2024 federal tax
              brackets and self-employment tax rates. It does not include state
              taxes, FICA from your W-2 employer, credits, or deductions beyond
              the standard deduction. Consult a tax professional for advice
              specific to your situation.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
