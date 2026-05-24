import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GradeTrendChart, AttendanceChart } from "@/components/charts/analytics-charts";
import { attendanceSummary, currentStudent, gradeTrend, studentGrades } from "@/lib/data/mock-data";
import { getGradeColor } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";

export default function StudentPerformancePage() {
  const avgByQuarter = [
    { label: "Q1", avg: +(studentGrades.reduce((s, g) => s + g.q1, 0) / studentGrades.length).toFixed(2) },
    { label: "Q2", avg: +(studentGrades.reduce((s, g) => s + g.q2, 0) / studentGrades.length).toFixed(2) },
    { label: "Q3", avg: +(studentGrades.reduce((s, g) => s + g.q3, 0) / studentGrades.length).toFixed(2) },
    { label: "Q4", avg: +(studentGrades.reduce((s, g) => s + g.q4, 0) / studentGrades.length).toFixed(2) },
  ];

  return (
    <DashboardLayout role="student" userName="Juan Miguel Santos" pageTitle="Performance">
      <PageHeader
        title="Academic Performance"
        description="A summary of your grades and attendance for the current school year."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Current GWA" value={currentStudent.gwa.toFixed(2)} icon={TrendingUp} trend="up" change="vs Q3 +0.05" />
        <StatCard label="Subjects ≥ 90" value={studentGrades.filter((g) => g.final >= 90).length} icon={BarChart3} />
        <StatCard label="Attendance Rate" value="94.2%" icon={Calendar} trend="neutral" change="SY 2025-2026" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card padding="lg">
          <h3 className="font-semibold text-primary mb-1">GWA Trend by Quarter</h3>
          <p className="text-xs text-neutral-500 mb-4">Your grade progression by quarter</p>
          <GradeTrendChart data={gradeTrend} />
        </Card>
        <Card padding="lg">
          <h3 className="font-semibold text-primary mb-1">Attendance Summary</h3>
          <p className="text-xs text-neutral-500 mb-4">Monthly attendance rate (%)</p>
          <AttendanceChart data={attendanceSummary} />
        </Card>
      </div>

      <Card padding="lg">
        <h3 className="font-semibold text-primary mb-4">Quarterly Subject Averages</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {avgByQuarter.map((q) => (
            <div key={q.label} className="text-center p-4 rounded-xl bg-neutral-50 hover:bg-primary/5 transition-colors">
              <p className="text-sm text-neutral-500">{q.label}</p>
              <p className={cn("text-2xl font-bold mt-1 px-2 py-1 rounded-lg inline-block", getGradeColor(q.avg))}>{q.avg}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          {studentGrades.map((g) => {
            const trend = g.q4 >= g.q1 ? "up" : "down";
            return (
              <div key={g.subject} className="flex items-center justify-between p-3 rounded-lg border border-neutral-100">
                <span className="text-sm text-primary font-medium">{g.subject}</span>
                <Badge variant={trend === "up" ? "success" : "warning"}>{trend === "up" ? "Improving" : "Declining"}</Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </DashboardLayout>
  );
}
