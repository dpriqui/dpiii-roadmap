import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David E. Perez III — Nursing Informatics Specialist (NIS) Roadmap (2025–2030)",
  description: "Student-first NIS path: high‑school/early college → CNA exposure → ADN→RN → BSN (preferred) → informatics coursework → ANCC RN‑BC → NI Specialist (MA market)."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
