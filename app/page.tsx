'use client';

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ShieldCheck, Briefcase, ChevronDown, ExternalLink, Stethoscope, BookOpen, CheckCircle2, CheckCircle } from "lucide-react";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type Item = {
  id: string;
  year: string;
  focus: string;
  certs?: string[];
  milestone?: string;
  salaryRange?: string;
  color: string;
  icon: IconType;
  status?: "active" | "planned" | "done";
  links?: { label: string; href: string }[];
  scheduleLink?: { label: string; href: string };
  tracker?: { label: string; focus: string; tasks: string[]; outcome: string }[];
};

const ROADMAP: Item[] = [
  {
    id: "2025-q4",
    year: "2025 (Q4)",
    focus: "Clinical Entry & IT Foundations — CNA/LNA + CompTIA A+/Net+/Sec+",
    certs: ["CNA/LNA", "CompTIA A+", "CompTIA Network+", "CompTIA Security+"],
    milestone: "Earn CNA/LNA, complete A+/Net+/Sec+ foundations",
    salaryRange: "$40K–$55K (entry clinical/IT support)",
    color: "from-green-500 to-emerald-500",
    icon: Stethoscope,
    status: "active",
    links: [
      { label: "MA Nurse Aide (testing info)", href: "https://www.mass.gov/service-details/nurse-aide-testing" },
      { label: "CompTIA A+", href: "https://www.comptia.org/certifications/a" },
      { label: "CompTIA Network+", href: "https://www.comptia.org/certifications/network" },
      { label: "CompTIA Security+", href: "https://www.comptia.org/certifications/security" }
    ],
    tracker: [
      { label: "Weeks 1–2", focus: "CNA enrollment & HIPAA basics", tasks: ["Enroll in CNA/LNA", "Study HIPAA/PHI basics", "Shadow clinical workflow"], outcome: "Clinical context + privacy foundations" },
      { label: "Weeks 3–6", focus: "A+ labs & ticketing", tasks: ["PC build/OS images", "Help‑desk scenarios", "Documentation habits"], outcome: "Hands‑on troubleshooting ready" },
      { label: "Weeks 7–10", focus: "Network+ core", tasks: ["Subnets & VLANs", "Basic routing/DNS", "Small homelab"], outcome: "Connectivity fundamentals" },
      { label: "Weeks 11–14", focus: "Security+ essentials", tasks: ["Access control", "Threats & response", "Map to HIPAA"], outcome: "Security baseline for healthcare" }
    ]
  },
  {
    id: "2026",
    year: "2026 (Q1–Q4)",
    focus: "ADN Program → RN Licensure (required for informatics roles)",
    certs: ["ADN + NCLEX‑RN"],
    milestone: "Sit for NCLEX‑RN by end of 2026",
    salaryRange: "$85K–$110K (MA RN, early career)",
    color: "from-sky-500 to-indigo-500",
    icon: GraduationCap,
    status: "planned",
    links: [
      { label: "NCLEX‑RN (NCSBN)", href: "https://www.ncsbn.org/nclex.htm" }
    ],
    tracker: [
      { label: "Sem 1", focus: "Fundamentals & Med‑Surg I", tasks: ["Skills labs", "Clinical rotations", "EHR exposure (Epic/Cerner)"], outcome: "Safe beginner nurse" },
      { label: "Sem 2", focus: "Med‑Surg II, Pharm", tasks: ["Medication safety", "Care plans", "Begin informatics shadowing"], outcome: "Strong clinical workflow understanding" },
      { label: "Sem 3", focus: "Specialties", tasks: ["Peds/OB/Psych", "Preceptorship"], outcome: "Rounded clinical experience" },
      { label: "Sem 4", focus: "NCLEX prep", tasks: ["Question banks", "Practice CATs", "Licensure paperwork"], outcome: "RN licensure achieved" }
    ]
  },
  {
    id: "2027",
    year: "2027",
    focus: "BSN Completion (preferred) + Informatics Coursework/Certificate",
    certs: ["BSN", "Informatics certificate (or MSN‑NI start)"],
    milestone: "Complete BSN while working as RN",
    salaryRange: "$100K–$120K (RN with BSN)",
    color: "from-indigo-500 to-purple-500",
    icon: BookOpen,
    status: "planned",
    links: [
      { label: "ANCC Informatics Nursing overview", href: "https://www.nursingworld.org/our-certifications/informatics-nursing/" }
    ],
    tracker: [
      { label: "Q1", focus: "BSN core", tasks: ["Evidence‑based practice", "Leadership/quality"], outcome: "Academic advancement" },
      { label: "Q2–Q4", focus: "Informatics coursework", tasks: ["EHR build exposure", "Data quality/analytics", "Workflow redesign"], outcome: "NI portfolio projects started" }
    ]
  },
  {
    id: "2028",
    year: "2028",
    focus: "Board & Industry Validators — ANCC RN‑BC + (Optional) HIMSS CPHIMS",
    certs: ["ANCC Informatics Nurse (RN‑BC)", "HIMSS CPHIMS (optional)"],
    milestone: "Earn RN‑BC; sit for CPHIMS if helpful",
    salaryRange: "$110K–$130K (MA NI specialist)",
    color: "from-purple-500 to-pink-500",
    icon: ShieldCheck,
    status: "planned",
    links: [
      { label: "ANCC RN‑BC", href: "https://www.nursingworld.org/our-certifications/informatics-nursing/" },
      { label: "HIMSS CPHIMS", href: "https://www.himss.org/resources/cphims" }
    ],
    tracker: [
      { label: "Reqs", focus: "Qualify for RN‑BC", tasks: ["RN license active", "2 years RN exp", "NI hours/education"], outcome: "Eligibility met" },
      { label: "Exam", focus: "RN‑BC prep", tasks: ["Blueprint review", "Practice tests", "Schedule & sit"], outcome: "Board‑certified NI" }
    ]
  },
  {
    id: "2029-2030",
    year: "2029–2030",
    focus: "Target Role — Nursing Informatics Specialist (MA market)",
    certs: ["RN (active)", "BSN (preferred)", "RN‑BC (recommended)"],
    milestone: "Secure NI Specialist / Clinical Analyst role",
    salaryRange: "$115K–$135K (Boston est.)",
    color: "from-rose-500 to-amber-500",
    icon: Briefcase,
    status: "planned",
    links: [
      { label: "MA job search — Glassdoor", href: "https://www.glassdoor.com/Job/massachusetts-nursing-informatics-jobs-SRCH_IL.0,13_IS3395_KO14,33.htm" },
      { label: "MA salaries — LinkedIn", href: "https://www.linkedin.com/salary/search?keywords=Nursing%20Informatics&location=Massachusetts" }
    ]
  }
];

export default function Page() {
  return <RoadmapVisual />;
}

function useRoadmapProgress(items: Item[]) {
  const [doneStage, setDoneStage] = useState<Set<string>>(new Set());
  const [doneTasks, setDoneTasks] = useState<Set<string>>(new Set());

  // Build a flat list of all completion keys (stages + tasks)
  const allKeys: string[] = useMemo(() => {
    const keys: string[] = [];
    items.forEach((it) => {
      // stage key
      keys.push(`nis:stage:${it.id}`);
      // task keys
      it.tracker?.forEach((t, ti) => {
        t.tasks.forEach((_, xi) => {
          keys.push(`nis:task:${it.id}:${ti}:${xi}`);
        });
      });
    });
    return keys;
  }, [items]);

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
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const {
    doneStage, doneTasks, toggleStage, toggleTask,
    completedStages, completedTasks, totalStages, totalTasks, pct
  } = useRoadmapProgress(ROADMAP);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">David E. Perez III — Nursing Informatics Specialist (NIS) Roadmap (2025–2030)</h1>
      <p className="text-center text-gray-600 mb-6">CNA (exposure) → ADN→RN (required) → BSN (preferred) → Informatics coursework → ANCC RN‑BC → NI Specialist (MA market).</p>

      {/* Progress Bar (stages + subtasks) */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">Overall progress (stages + subtasks)</span>
          <span className="text-gray-600">{completedStages + completedTasks}/{totalStages + totalTasks} ({pct}%)</span>
        </div>
        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-gray-500">{completedStages}/{totalStages} stages • {completedTasks}/{totalTasks} subtasks</div>
      </div>

      {/* Single-column layout */}
      <div className="max-w-3xl mx-auto space-y-5">
        {ROADMAP.map((r, idx) => {
          const Icon = r.icon || CheckCircle2;
          const isOpen = openIdx === idx;
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
                        {r.certs?.length ? <p className="text-sm text-gray-600 mt-0.5">{r.certs.join(" • ")}</p> : null}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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

                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenIdx((v) => (v === idx ? null : idx))}
                        className="inline-flex items-center gap-1 text-xs text-gray-700 hover:text-gray-900 focus:outline-none focus:ring focus:ring-blue-200 rounded"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        {isOpen ? "Hide" : "Details"}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
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

                        {(r.links?.length || r.scheduleLink) ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {r.links?.map((l) => (
                              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-blue-700 bg-blue-50 border-blue-200 hover:underline">
                                <ExternalLink className="h-3.5 w-3.5" /> {l.label}
                              </a>
                            ))}
                            {r.scheduleLink ? (
                              <a href={r.scheduleLink.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-blue-700 bg-blue-50 border-blue-200 hover:underline">
                                <ExternalLink className="h-3.5 w-3.5" /> {r.scheduleLink.label}
                              </a>
                            ) : null}
                          </div>
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <footer className="mt-8 text-center text-xs text-gray-500">
        Built with Next.js + Tailwind + Framer Motion. Progress (stages + subtasks) is stored locally in your browser.
      </footer>
    </div>
  );
}
