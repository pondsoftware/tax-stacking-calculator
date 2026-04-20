import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Side Hustle Tax Calculator — 1099 vs W-2 Tax Impact",
  description:
    "See exactly how much tax you'll pay on side hustle income stacked on top of your W-2 job. Includes self-employment tax, marginal brackets, and take-home calculation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <p className="text-xl font-bold text-gray-900">
              Side Hustle Tax Calculator
            </p>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
