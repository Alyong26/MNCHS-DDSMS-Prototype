"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { TableScroll } from "@/components/ui/table-scroll";
import { Badge } from "@/components/ui/badge";
import { classRecordOptions, teacherClasses } from "@/lib/data/mock-data";
import { getGradeColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

const classRecord = [
  { no: 1, name: "Juan Miguel Santos", ww: 88, pt: 90, qa: 92, q1: 90, q2: 88, q3: 92, q4: 89, final: 90, remarks: "PASSED" },
  { no: 2, name: "Ana Sofia Reyes", ww: 92, pt: 91, qa: 93, q1: 93, q2: 92, q3: 94, q4: 91, final: 93, remarks: "PASSED" },
  { no: 3, name: "Miguel Angelo Tan", ww: 78, pt: 80, qa: 82, q1: 80, q2: 79, q3: 81, q4: 80, final: 80, remarks: "PASSED" },
  { no: 4, name: "Patricia Mae Lopez", ww: 85, pt: 87, qa: 88, q1: 87, q2: 86, q3: 88, q4: 87, final: 87, remarks: "PASSED" },
  { no: 5, name: "Mark Anthony Rivera", ww: 72, pt: 74, qa: 76, q1: 74, q2: 73, q3: 75, q4: 74, final: 74, remarks: "FAILED" },
];

export default function TeacherClassRecordPage() {
  const [schoolYear, setSchoolYear] = useState(classRecordOptions.schoolYears[0]);
  const [classId, setClassId] = useState(classRecordOptions.classes[0].id);
  const selected = teacherClasses.find((c) => c.id === classId) ?? teacherClasses[0];

  return (
    <DashboardLayout role="teacher" userName="Maria Elena Cruz" pageTitle="Class Record">
      <PageHeader
        title="Digital Class Record"
        description={`${selected.name} · ${selected.subject} · School Year ${schoolYear}`}
      />

      <Card padding="lg" className="mb-6">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">School Year</label>
            <select
              value={schoolYear}
              onChange={(e) => setSchoolYear(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
            >
              {classRecordOptions.schoolYears.map((sy) => (
                <option key={sy} value={sy}>{sy}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Class</label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
            >
              {classRecordOptions.classes.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-sm">
          <p><span className="text-neutral-500">Adviser:</span> <span className="font-medium text-primary">Maria Elena Cruz</span></p>
          <p><span className="text-neutral-500">Subject:</span> <span className="font-medium text-primary">{selected.subject}</span></p>
          <p><span className="text-neutral-500">Section:</span> <span className="font-medium text-primary">{selected.name}</span></p>
        </div>
      </Card>

      <Card padding="lg" className="overflow-hidden">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="accent">{selected.students} Students</Badge>
          <Badge variant="info">Q3 Active</Badge>
          <Badge variant="success">Submitted: 38/42</Badge>
        </div>
        <TableScroll>
        <table className="w-full text-xs sm:text-sm min-w-[1000px]">
          <thead>
            <tr className="border-b border-neutral-200 bg-primary/5">
              <th className="py-2 px-2 text-primary font-semibold">#</th>
              <th className="py-2 px-2 text-left text-primary font-semibold">Learner Name</th>
              <th className="py-2 px-1 text-center text-primary font-semibold">WW</th>
              <th className="py-2 px-1 text-center text-primary font-semibold">PT</th>
              <th className="py-2 px-1 text-center text-primary font-semibold">QA</th>
              <th className="py-2 px-1 text-center text-primary font-semibold">Q1</th>
              <th className="py-2 px-1 text-center text-primary font-semibold">Q2</th>
              <th className="py-2 px-1 text-center text-primary font-semibold">Q3</th>
              <th className="py-2 px-1 text-center text-primary font-semibold">Q4</th>
              <th className="py-2 px-1 text-center text-primary font-semibold">Final Grade</th>
              <th className="py-2 px-1 text-center text-primary font-semibold">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {classRecord.map((row) => (
              <tr key={row.no} className="border-b border-neutral-100 hover:bg-primary/5 transition-colors">
                <td className="py-2.5 px-2 text-neutral-500">{row.no}</td>
                <td className="py-2.5 px-2 font-medium text-primary">{row.name}</td>
                <td className="py-2.5 text-center">{row.ww}</td>
                <td className="py-2.5 text-center">{row.pt}</td>
                <td className="py-2.5 text-center">{row.qa}</td>
                {[row.q1, row.q2, row.q3, row.q4, row.final].map((g, i) => (
                  <td key={i} className="py-2.5 text-center">
                    <span className={cn("px-1.5 py-0.5 rounded text-xs font-semibold", getGradeColor(g))}>{g}</span>
                  </td>
                ))}
                <td className="py-2.5 text-center">
                  <Badge variant={row.remarks === "PASSED" ? "success" : "danger"}>{row.remarks}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </TableScroll>
      </Card>
    </DashboardLayout>
  );
}
