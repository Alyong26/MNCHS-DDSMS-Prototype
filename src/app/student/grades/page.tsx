"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { TableScroll } from "@/components/ui/table-scroll";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { currentStudent, schoolYears, gradesBySchoolYear } from "@/lib/data/mock-data";
import { getGradeColor } from "@/lib/utils";
import { GraduationCap, Award, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentGradesPage() {
  const [selectedYear, setSelectedYear] = useState(schoolYears[0]);
  const yearData = gradesBySchoolYear[selectedYear];
  const grades = yearData?.grades ?? [];
  const gwa = yearData?.gwa ?? 0;
  const passing = grades.filter((g) => g.final >= 75).length;

  return (
    <DashboardLayout role="student" userName="Juan Miguel Santos" pageTitle="View Grades">
      <PageHeader
        title="My Grades"
        description={`${currentStudent.section}`}
      />

      <div className="mb-6">
        <label className="block text-sm font-medium text-primary mb-1.5">School Year</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full sm:w-64 px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 outline-none bg-card"
        >
          {schoolYears.map((sy) => (
            <option key={sy} value={sy}>{sy}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="General Average" value={gwa.toFixed(2)} icon={GraduationCap} trend="up" change="All quarters" />
        <StatCard label="Passing Subjects" value={`${passing}/${grades.length}`} icon={Award} />
        <StatCard label="Lowest Grade" value={grades.length ? Math.min(...grades.map((g) => g.final)) : "—"} icon={Target} />
      </div>

      <Card padding="lg" className="overflow-hidden">
        <TableScroll>
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-neutral-200 text-left">
              <th className="pb-3 font-semibold text-primary min-w-[140px]">Learning Areas</th>
              <th className="pb-3 font-semibold text-primary text-center">Q1</th>
              <th className="pb-3 font-semibold text-primary text-center">Q2</th>
              <th className="pb-3 font-semibold text-primary text-center">Q3</th>
              <th className="pb-3 font-semibold text-primary text-center">Q4</th>
              <th className="pb-3 font-semibold text-primary text-center">Final Grade</th>
              <th className="pb-3 font-semibold text-primary text-center">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g) => (
              <tr key={g.subject} className="border-b border-neutral-100 hover:bg-primary/5 transition-colors">
                <td className="py-3.5 font-medium text-primary max-w-[160px] truncate">{g.subject}</td>
                {[g.q1, g.q2, g.q3, g.q4].map((grade, i) => (
                  <td key={i} className="py-3.5 text-center">
                    <span className={cn("inline-block px-2 py-0.5 rounded-md text-xs font-semibold", getGradeColor(grade))}>
                      {grade}
                    </span>
                  </td>
                ))}
                <td className="py-3.5 text-center">
                  <span className={cn("inline-block px-2 py-0.5 rounded-md text-xs font-semibold", getGradeColor(g.final))}>
                    {g.final}
                  </span>
                </td>
                <td className="py-3.5 text-center">
                  <Badge variant={g.remarks === "PASSED" ? "success" : "danger"}>{g.remarks}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-primary/5">
              <td className="py-3 font-bold text-primary">General Average</td>
              <td colSpan={4} />
              <td className="py-3 text-center">
                <Badge variant="success" className="text-base px-3">{gwa.toFixed(2)}</Badge>
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
        </TableScroll>
      </Card>
    </DashboardLayout>
  );
}
