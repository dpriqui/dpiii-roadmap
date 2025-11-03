import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DPIII — Nursing Informatics Specialist (NIS) Roadmap",
  description: "CNA (exposure) → ADN→RN (required) → BSN (preferred) → Informatics coursework → ANCC RN‑BC → NI Specialist (MA market).",
  openGraph: {
    title: "DPIII — NIS Roadmap",
    description: "MA-focused path to Nursing Informatics Specialist.",
    type: "website",
    url: "https://example.com"
  },
  twitter: {
    card: "summary_large_image",
    title: "DPIII — NIS Roadmap",
    description: "From CNA exposure to RN, BSN, informatics coursework, then ANCC RN-BC → NI Specialist (MA)."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}