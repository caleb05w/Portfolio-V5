import { Geist, Geist_Mono } from "next/font/google";
import { ppNeueMontreal } from "../../font";
import { CaseProvider } from "../../utils/caseContext";
import { ToolTipProvider } from "../../utils/toolTipContext";
import "./globals.css";
import "@qpokychuk/sf-pro-display/index.css";
import "@qpokychuk/sf-pro-display/normal.css";
import "@qpokychuk/sf-pro-display/italic.css";
import { Analytics } from "@vercel/analytics/next";

import ToolTip from "../../components/toolTip";
import Navbar from "../../components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Caleb Wu",
  description: "Product Designer | Seeking Summer & Winter 2026 Internships",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ppNeueMontreal.variable} antialiased`}
      > 
        <ToolTipProvider>
          <CaseProvider>
            <Navbar />
            {children}
            <ToolTip />
          </CaseProvider>
        </ToolTipProvider>
        <Analytics />
      </body>
    </html>
  );
}
