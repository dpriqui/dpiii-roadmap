'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, Briefcase, ExternalLink, Stethoscope, BookOpen, CheckCircle2, CheckCircle } from "lucide-react";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type Item = {
  id: string;
  year: string;
  focus: string;
  context?: string;
  certs?: string[];
  milestone?: string;
  salaryRange?: string;
  color: string;
  icon: IconType;
  links?: { label: string; href: string }[];
  tracker?: { label: string; focus: string; tasks: string[]; outcome: string }[];
};

// Stages reflect DPIII is still in school
const ROADMAP: Item[] = [
  {
    id: "2025-hs-senior",
    year: "2025 (HS Senior)",
    focus: "Finish High School Strong + Early CNA & IT Foundations",
    context: "Prioritize GPA, college apps, and foundational healthcare/IT exposure.",
    certs: ["CNA course & clinicals", "CompTIA ITF+ (optional)", "CompTIA A+ (Core 1/2)"],
    milestone: "Graduate HS with CNA complete (or in progress) and A+ underway",
    salaryRange: "Entry exposure / volunteer",
    color: "from-green-500 to-emerald-500",
    icon: Stethoscope,
    links: [
      { label: "MA Nurse Aide testing info", href: "https://www.mass.gov/service-details/nurse-aide-testing" },
      { label: "CompTIA A+", href: "https://www.comptia.org/certifications/a" }
    ],
    tracker: [
      { label: "Q1", focus: "Admissions & Aid", tasks: ["Common App finalized", "FAFSA filed", "Scholarship list created"], outcome: "Admitted + funded plan" },
      { label: "Q2", focus: "CNA Start", tasks: ["Enroll in CNA class", "HIPAA basics", "Schedule clinical hours"], outcome: "Clinical exposure begins" },
      { label: "Q3", focus: "A+ Core 1", tasks: ["Hardware/OS labs", "Help‑desk scenarios", "Ticketing practice"], outcome: "Hands‑on troubleshooting" },
      { label: "Q4", focus: "A+ Core 2", tasks: ["Security & ops", "Practice exams", "Schedule certification"], outcome: "A+ certified (or scheduled)" }
    ]
  },
  {
    id: "2026-freshman",
    year: "2026 (College Y1)",
    focus: "Pre‑Nursing Coursework + Part‑Time IT/Clinical Assistant",
    context: "Balance gen‑eds/prereqs with paid experience in healthcare or IT.",
    certs: ["CompTIA Network+", "BLS (Healthcare Provider)"],
    milestone: "Complete A&P I/II + Net+; secure campus help‑desk or unit secretary role",
    salaryRange: "$15–$25/hr (campus IT or clinical assistant)",
    color: "from-sky-500 to-indigo-500",
    icon: GraduationCap,
    links: [
      { label: "Network+ objectives", href: "https://www.comptia.org/certifications/network" }
    ],
    tracker: [
      { label: "Fall", focus: "Gen‑Ed + A&P I", tasks: ["Chem/Bio refresh", "A&P I labs", "Apply for campus/job"], outcome: "Academic base + role secured" },
      { label: "Winter/Spring", focus: "A&P II + Net+", tasks: ["Subnetting drills", "Homelab basics", "Sit for Net+"], outcome: "Networking fundamentals" }
    ]
  },
  {
    id: "2027-sophomore",
    year: "2027 (College Y2)",
    focus: "ADN/RN Pathway Decision + Security+ + More Clinical Time",
    context: "Choose ADN start or finish prereqs; deepen clinical context and security mindset.",
    certs: ["CompTIA Security+", "BLS renewal"],
    milestone: "Sit for Security+; log more hours in patient‑care support roles",
    salaryRange: "$18–$28/hr (hospital/unit roles)",
    color: "from-indigo-500 to-purple-500",
    icon: BookOpen,
    links: [
      { label: "Security+ objectives", href: "https://www.comptia.org/certifications/security" }
    ],
    tracker: [
      { label: "Q1", focus: "ADN Decision", tasks: ["Meet advisors", "Program comparison", "Application timelines"], outcome: "Clear RN path chosen" },
      { label: "Q2–Q4", focus: "Security+ + Clinical", tasks: ["Access control & PHI", "Practice tests", "Clinical shifts"], outcome: "Security baseline + context" }
    ]
  },
  {
    id: "2028-junior",
    year: "2028 (ADN/RN)",
    focus: "ADN Coursework & Clinicals → NCLEX‑RN",
    context: "Primary objective is RN licensure to unlock Informatics eligibility.",
    certs: ["ADN", "NCLEX‑RN"],
    milestone: "Graduate ADN; pass NCLEX‑RN",
    salaryRange: "$85K–$110K (MA RN entry range)",
    color: "from-purple-500 to-pink-500",
    icon: ShieldCheck,
    links: [
      { label: "NCLEX‑RN (NCSBN)", href: "https://www.ncsbn.org/nclex.htm" }
    ],
    tracker: [
      { label: "Clinicals", focus: "Med‑Surg + specialties", tasks: ["Skills checkoffs", "EHR notes", "Care plans"], outcome: "Safe, competent RN" },
      { label: "Prep", focus: "NCLEX readiness", tasks: ["Q‑banks", "CATs", "Licensure paperwork"], outcome: "RN license achieved" }
    ]
  },
  {
    id: "2029-senior",
    year: "2029 (RN + BSN)",
    focus: "RN practice + BSN (preferred) + Informatics Coursework",
    context: "Work as RN while completing BSN and informatics certificates/mini‑courses.",
    certs: ["BSN (preferred)", "Informatics certificate"],
    milestone: "Build NI portfolio (workflow, data quality, EHR build exposure)",
    salaryRange: "$100K–$120K (RN with BSN)",
    color: "from-rose-500 to-amber-500",
    icon: Briefcase,
    links: [
      { label: "ANCC Informatics overview", href: "https://www.nursingworld.org/our-certifications/informatics-nursing/" }
    ],
    tracker: [
      { label: "Q1–Q2", focus: "BSN Core", tasks: ["Evidence‑based practice", "Leadership/quality"], outcome: "Academic advancement" },
      { label: "Q3–Q4", focus: "NI Coursework", tasks: ["EHR build exposure", "Data quality/analytics", "Workflow redesign"], outcome: "NI portfolio in progress" }
    ]
  },
  {
    id: "2030-target",
    year: "2030",
    focus: "Board & Role — ANCC RN‑BC Eligible → Nursing Informatics Specialist",
    context: "Use RN experience + NI coursework to sit for RN‑BC and land NI Specialist.",
    certs: ["ANCC Informatics Nurse (RN‑BC)"],
    milestone: "Board‑certified or exam scheduled; accept NI Specialist role",
    salaryRange: "$110K–$135K (Boston est.)",
    color: "from-rose-500 to-amber-500",
    icon: ShieldCheck,
    links: [
      { label: "ANCC RN‑BC", href: "https://www.nursingworld.org/our-certifications/informatics-nursing/" }
    ],
    tracker: [
      { label: "Eligibility", focus: "Meet RN‑BC requirements", tasks: ["Active RN license", "2 yrs RN exp", "NI education/hours"], outcome: "Eligible for board exam" },
      { label: "Placement", focus: "MA Market", tasks: ["Interview plan", "Portfolio demos", "References ready"], outcome: "NI Specialist offer accepted" }
    ]
  }
];

export default function Page() {
  return <RoadmapVisual />;
}

function useRoadmapProgress(items: Item[]) {
  const [doneStage, setDoneStage] = useState<Set<string>>(new Set());
  const [doneTasks, setDoneTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const sStages = new Set<string>();
    const sTasks = new Set<string>();
    if (typeof window !== "undefined") {
      items.forEach((it) => {
        const st = localStorage.getItem(`nis:stage:${it.id}`);
        if (st === "1") sStages.add(it.id);
        it.tracker?.forEach((t, ti) => {
          t.tasks.forEach((_, xi) => {
            const key = `nis:task:${it.id}:${ti}:${xi}`;
            const v = localStorage.getItem(key);
            if (v === "1") sTasks.add(key);
          });
        });
      });
    }
    setDoneStage(sStages);
    setDoneTasks(sTasks);
  }, [items]);

  const toggleStage = (id: string) => {
    setDoneStage((prev) => {
      const next = new Set(prev);
      const key = `nis:stage:${id}`;
      if (next.has(id)) {
        next.delete(id);
        if (typeof window !== "undefined") localStorage.setItem(key, "0");
      } else {
        next.add(id);
        if (typeof window !== "undefined") localStorage.setItem(key, "1");
      }
      return next;
    });
  };

  const toggleTask = (id: string, ti: number, xi: number) => {
    const key = `nis:task:${id}:${ti}:${xi}`;
    setDoneTasks((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
        if (typeof window !== "undefined") localStorage.setItem(key, "0");
      } else {
        next.add(key);
        if (typeof window !== "undefined") localStorage.setItem(key, "1");
      }
      return next;
    });
  };

  // Compute totals
  const totalStages = items.length;
  let totalTasks = 0;
  items.forEach((it) => { it.tracker?.forEach((t) => totalTasks += t.tasks.length); });

  const completedStages = doneStage.size;
  const completedTasks = doneTasks.size;

  const completedTotal = completedStages + completedTasks;
  const grandTotal = totalStages + totalTasks;
  const pct = grandTotal > 0 ? Math.round((completedTotal / grandTotal) * 100) : 0;

  return {
    doneStage, doneTasks, toggleStage, toggleTask,
    completedStages, completedTasks, totalStages, totalTasks, pct
  };
}

function RoadmapVisual() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [scrollPct, setScrollPct] = useState(0);

  const {
    doneStage, doneTasks, toggleStage, toggleTask,
    completedStages, completedTasks, totalStages, totalTasks, pct
  } = useRoadmapProgress(ROADMAP);

  // Scroll progress relative to main content
  useEffect(() => {
    const handler = () => {
      const el = mainRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height - vh;
      // amount scrolled within the element (0..1)
      let sc = 0;
      if (rect.top >= 0) sc = 0;
      else if (rect.bottom <= vh) sc = 1;
      else sc = Math.min(1, Math.max(0, (-rect.top) / (total || 1)));
      setScrollPct(Math.round(sc * 100));
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-12 gap-6">
        {/* Left sticky progress bar: shows completion (solid) and scroll (overlay) */}
        <aside className="hidden md:block col-span-2">
          <div className="sticky top-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Progress</div>
            <div className="relative h-64 w-3 bg-gray-200 rounded-full overflow-hidden">
              {/* Completion fill (bottom-up) */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-blue-600 to-cyan-500 transition-all duration-300"
                style={{ height: `${pct}%` }}
              />
              {/* Scroll indicator overlay (semi-transparent) */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-black/20 transition-all duration-200 pointer-events-none"
                style={{ height: `${scrollPct}%` }}
                aria-hidden
              />
            </div>
            <div className="mt-2 text-xs text-gray-600">{completedStages + completedTasks}/{totalStages + totalTasks} ({pct}%)</div>
            <div className="mt-1 text-[11px] text-gray-500">{completedStages}/{totalStages} stages • {completedTasks}/{totalTasks} subtasks</div>
            <div className="mt-1 text-[11px] text-gray-500">Scroll {scrollPct}%</div>
          </div>
        </aside>

        {/* Main column (narrow, single column) */}
        <main ref={mainRef} className="col-span-12 md:col-span-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">David E. Perez III — Nursing Informatics Specialist (NIS) Roadmap (2025–2030)</h1>
          <p className="text-center md:text-left text-gray-600 mb-6">Student‑first sequence: high‑school/early college → CNA exposure → ADN→RN → BSN (preferred) → informatics coursework → ANCC RN‑BC → NI Specialist (MA market).</p>

          {/* Top horizontal progress bar for mobile */}
          <div className="md:hidden mb-6">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Progress</span>
              <span className="text-gray-600">{completedStages + completedTasks}/{totalStages + totalTasks} ({pct}%)</span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-5">
            {ROADMAP.map((r) => {
              const Icon = r.icon || CheckCircle2;
              const stageDone = doneStage.has(r.id);
              return (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  <Card className="overflow-hidden">
                    <div className={`h-1 w-full bg-gradient-to-r ${r.color}`} />
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 grid place-items-center rounded-xl bg-gray-100 text-gray-800">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-gray-500">{r.year}</div>
                            <h3 className="text-base font-semibold text-gray-900">{r.focus}</h3>
                            {r.context ? <p className="text-sm text-gray-600 mt-0.5">{r.context}</p> : null}
                            {r.certs?.length ? <p className="text-sm text-gray-600 mt-0.5">{r.certs.join(" • ")}</p> : null}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleStage(r.id)}
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs ${
                            stageDone
                              ? "bg-green-100 border-green-300 text-green-700"
                              : "bg-gray-50 border-gray-200 text-gray-700"
                          }`}
                          aria-pressed={stageDone}
                          title={stageDone ? "Mark as to do" : "Mark as done"}
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          {stageDone ? "Done" : "To do"}
                        </button>
                      </div>

                      {/* Always-visible details (no toggle) */}
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                        {r.milestone ? <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs text-gray-700 bg-gray-50 border-gray-200">Milestone: {r.milestone}</span> : null}
                        {r.salaryRange ? <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs text-gray-700 bg-gray-50 border-gray-200">Salary: {r.salaryRange}</span> : null}
                      </div>

                      {r.tracker?.length ? (
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                          {r.tracker.map((t, ti) => (
                            <li key={t.label} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                              <div className="font-medium">{t.label} — {t.focus}</div>
                              <ul className="mt-1 space-y-1">
                                {t.tasks.map((x, xi) => {
                                  const taskKey = `nis:task:${r.id}:${ti}:${xi}`;
                                  const isTaskDone = doneTasks.has(taskKey);
                                  return (
                                    <li key={x} className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => toggleTask(r.id, ti, xi)}
                                        aria-pressed={isTaskDone}
                                        className={`inline-flex items-center justify-center h-5 w-5 rounded border text-[10px] ${
                                          isTaskDone ? "bg-green-100 border-green-300 text-green-700" : "bg-white border-gray-300 text-gray-500"
                                        }`}
                                        title={isTaskDone ? "Mark as to do" : "Mark as done"}
                                      >
                                        ✓
                                      </button>
                                      <span>{x}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                              <div className="text-gray-600 mt-2"><span className="font-medium">Outcome:</span> {t.outcome}</div>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {(r.links?.length) ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {r.links?.map((l) => (
                            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-blue-700 bg-blue-50 border-blue-200 hover:underline">
                              <ExternalLink className="h-3.5 w-3.5" /> {l.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>

      <footer className="mt-8 text-center text-xs text-gray-500">
        Built with Next.js + Tailwind + Framer Motion. Completion & scroll progress shown on the left; data stored locally.
      </footer>
    </div>
  );
}
