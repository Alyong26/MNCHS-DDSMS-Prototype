"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { GradeDistributionChart } from "@/components/charts/analytics-charts";
import { gradeDistribution, teacherClasses } from "@/lib/data/mock-data";
import { BarChart3, TrendingUp, Users } from "lucide-react";

const classDistributions = teacherClasses.map((c) => ({
  classId: c.id,
  name: c.name,
  subject: c.subject,
  data: gradeDistribution.map((d, i) => ({
    ...d,
    count: Math.max(1, Math.round(d.count * (c.students / 200) * (0.85 + (i % 3) * 0.05))),
  })),
}));

export default function TeacherAnalyticsPage() {
  const classAvg = (teacherClasses.reduce((s, c) => s + c.avgGrade, 0) / teacherClasses.length).toFixed(1);

  return (
    <DashboardLayout role="teacher" userName="Maria Elena Cruz" pageTitle="Class Overview">
      <PageHeader
        title="Class Overview"
        description="Performance summaries for your assigned classes only."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Combined Class Average" value={classAvg} icon={BarChart3} trend="up" change="Your sections" />
        <StatCard label="Highest Section Avg" value={Math.max(...teacherClasses.map((c) => c.avgGrade))} icon={TrendingUp} />
        <StatCard label="Students Taught" value={teacherClasses.reduce((s, c) => s + c.students, 0)} icon={Users} />
      </div>

      <Card padding="lg" className="mb-6">
        <h3 className="font-semibold text-primary mb-1">Section Performance Comparison</h3>
        <p className="text-xs text-neutral-500 mb-4">Average grade by your assigned classes</p>
        <div className="space-y-3">
          {teacherClasses.map((c) => (
            <div key={c.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-primary font-medium">{c.name} · {c.subject}</span>
                <span className="font-semibold text-primary">{c.avgGrade}%</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${c.avgGrade}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classDistributions.map((item) => (
          <Card key={item.classId} padding="lg">
            <h3 className="font-semibold text-primary text-sm mb-0.5">{item.name}</h3>
            <p className="text-xs text-neutral-500 mb-3">{item.subject} — Grade distribution</p>
            <GradeDistributionChart data={item.data} />
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
