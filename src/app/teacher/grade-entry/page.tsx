"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { TableScroll } from "@/components/ui/table-scroll";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { teacherClasses, summaryFinalGrades } from "@/lib/data/mock-data";
import { Save, Calculator, Pencil } from "lucide-react";

const sampleStudents = [
  { id: "1", name: "Juan Miguel Santos" },
  { id: "2", name: "Ana Sofia Reyes" },
  { id: "3", name: "Miguel Angelo Tan" },
  { id: "4", name: "Patricia Mae Lopez" },
  { id: "5", name: "Carlos Eduardo Cruz" },
];

type Scores = { ww: number; pt: number; qa: number };

function computeGrade({ ww, pt, qa }: Scores) {
  const wwScore = ww * 0.2;
  const ptScore = pt * 0.5;
  const qaScore = qa * 0.3;
  return Math.round(wwScore + ptScore + qaScore);
}

export default function TeacherGradeEntryPage() {
  const [activeTab, setActiveTab] = useState<"quarter" | "summary">("quarter");
  const [selectedClass, setSelectedClass] = useState(teacherClasses[0].id);
  const [quarter, setQuarter] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q3");
  const [scores, setScores] = useState<Record<string, Scores>>(
    Object.fromEntries(sampleStudents.map((s) => [s.id, { ww: 85, pt: 88, qa: 90 }]))
  );

  const cls = teacherClasses.find((c) => c.id === selectedClass)!;

  const updateScore = (studentId: string, field: keyof Scores, value: number) => {
    setScores((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: Math.min(100, Math.max(0, value)) },
    }));
  };

  const handleSave = () => alert("Grades saved for " + cls.name + " — " + quarter + " (demo)");
  const handleEdit = (name: string) => alert(`Edit grades for ${name}`);

  return (
    <DashboardLayout role="teacher" userName="Maria Elena Cruz" pageTitle="Grade Entry">
      <PageHeader
        title="Grade Entry"
        description="Enter quarterly scores and review final grades for your class."
        action={<Button icon={Save} onClick={handleSave} className="w-full sm:w-auto">Save Grades</Button>}
      />

      <div className="flex gap-2 mb-6 border-b border-neutral-200">
        <button
          type="button"
          onClick={() => setActiveTab("quarter")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "quarter"
              ? "border-primary text-primary"
              : "border-transparent text-neutral-500 hover:text-primary"
          }`}
        >
          Quarter Entry
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("summary")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "summary"
              ? "border-primary text-primary"
              : "border-transparent text-neutral-500 hover:text-primary"
          }`}
        >
          Summary Final Grades
        </button>
      </div>

      {activeTab === "quarter" ? (
        <>
          <Card padding="lg" className="mb-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Class Section</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                >
                  {teacherClasses.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} — {c.subject}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Quarter</label>
                <select
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value as typeof quarter)}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                >
                  {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <div className="flex items-center gap-2 text-sm text-neutral-500 bg-accent/50 px-4 py-2.5 rounded-lg border border-primary/10 w-full">
                  <Calculator className="h-4 w-4 text-primary" />
                  Grades are computed automatically per DepEd guidelines
                </div>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="overflow-hidden">
            <TableScroll>
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="pb-3 text-left text-primary font-semibold min-w-[120px]">Student</th>
                  <th className="pb-3 text-center text-primary font-semibold">
                    <span className="sm:hidden">WW</span>
                    <span className="hidden sm:inline">Written Work (20%)</span>
                  </th>
                  <th className="pb-3 text-center text-primary font-semibold">
                    <span className="sm:hidden">PT</span>
                    <span className="hidden sm:inline">Performance Task (50%)</span>
                  </th>
                  <th className="pb-3 text-center text-primary font-semibold">
                    <span className="sm:hidden">QA</span>
                    <span className="hidden sm:inline">Quarterly Assessment (30%)</span>
                  </th>
                  <th className="pb-3 text-center text-primary font-semibold">Quarter Grade</th>
                  <th className="pb-3 text-center text-primary font-semibold w-16">Edit</th>
                </tr>
              </thead>
              <tbody>
                {sampleStudents.map((s) => {
                  const sc = scores[s.id];
                  const grade = computeGrade(sc);
                  return (
                    <tr key={s.id} className="border-b border-neutral-100 hover:bg-primary/5">
                      <td className="py-3 font-medium text-primary max-w-[140px] truncate">{s.name}</td>
                      {(["ww", "pt", "qa"] as const).map((field) => (
                        <td key={field} className="py-3 text-center">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={sc[field]}
                            onChange={(e) => updateScore(s.id, field, Number(e.target.value))}
                            className="w-16 px-2 py-1 text-center rounded border border-neutral-200 focus:ring-2 focus:ring-primary/30 outline-none"
                          />
                        </td>
                      ))}
                      <td className="py-3 text-center">
                        <Badge variant={grade >= 75 ? "success" : "danger"}>{grade}</Badge>
                      </td>
                      <td className="py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleEdit(s.name)}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-primary hover:bg-primary/5 transition-colors"
                          aria-label={`Edit grades for ${s.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </TableScroll>
          </Card>
        </>
      ) : (
        <Card padding="lg" className="overflow-hidden">
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary mb-1.5">Class Section</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full sm:w-80 px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
            >
              {teacherClasses.map((c) => (
                <option key={c.id} value={c.id}>{c.name} — {c.subject}</option>
              ))}
            </select>
          </div>
          <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Learning Area</p>
            <p className="font-semibold text-primary break-words">{cls.subject}</p>
            <p className="text-sm text-neutral-500">{cls.name}</p>
          </div>
          <TableScroll>
          <table className="w-full text-sm min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-primary/5">
                <th className="pb-3 pt-1 text-left text-primary font-semibold px-2">Student Name</th>
                <th className="pb-3 pt-1 text-center text-primary font-semibold px-2">Q1</th>
                <th className="pb-3 pt-1 text-center text-primary font-semibold px-2">Q2</th>
                <th className="pb-3 pt-1 text-center text-primary font-semibold px-2">Q3</th>
                <th className="pb-3 pt-1 text-center text-primary font-semibold px-2">Q4</th>
                <th className="pb-3 pt-1 text-center text-primary font-semibold px-2">Final Grade</th>
                <th className="pb-3 pt-1 text-center text-primary font-semibold px-2">General Average</th>
                <th className="pb-3 pt-1 text-center text-primary font-semibold px-2">Remarks</th>
                <th className="pb-3 pt-1 text-center text-primary font-semibold px-2 w-16">Edit</th>
              </tr>
            </thead>
            <tbody>
              {summaryFinalGrades.map((row) => (
                <tr key={row.id} className="border-b border-neutral-100 hover:bg-primary/5">
                  <td className="py-3 px-2 font-medium text-primary">{row.name}</td>
                  <td className="py-3 px-2 text-center">{row.q1}</td>
                  <td className="py-3 px-2 text-center">{row.q2}</td>
                  <td className="py-3 px-2 text-center">{row.q3}</td>
                  <td className="py-3 px-2 text-center">{row.q4}</td>
                  <td className="py-3 px-2 text-center font-semibold">{row.finalGrade}</td>
                  <td className="py-3 px-2 text-center">{row.generalAverage.toFixed(2)}</td>
                  <td className="py-3 px-2 text-center">
                    <Badge variant={row.remarks === "PASSED" ? "success" : "danger"}>{row.remarks}</Badge>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(row.name)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </TableScroll>
        </Card>
      )}
    </DashboardLayout>
  );
}
