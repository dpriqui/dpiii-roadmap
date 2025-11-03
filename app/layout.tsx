import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David E. Perez III — Nursing Informatics Specialist (NIS) Roadmap (2025–2030)",
  description: "CNA (exposure) → ADN→RN (required) → BSN (preferred) → Informatics coursework → ANCC RN‑BC → NI Specialist (MA market).",
  openGraph: {
    title: "David E. Perez III — NIS Roadmap (2025–2030)",
    description: "MA-focused path to Nursing Informatics Specialist.",
    type: "website",
    url: "https://example.com"
  },
  twitter: {
    card: "summary_large_image",
    title: "David E. Perez III — NIS Roadmap",
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