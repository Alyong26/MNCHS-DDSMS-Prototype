import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GradeDistributionChart } from "@/components/charts/analytics-charts";
import { announcements, atRiskStudents, gradeDistribution, teacherClasses } from "@/lib/data/mock-data";
import { formatDate } from "@/lib/utils";
import { Users, BookOpen, AlertTriangle, PenLine } from "lucide-react";

export default function TeacherDashboardPage() {
  const teacherNews = announcements.filter((a) => a.audience.includes("teacher")).slice(0, 3);
  const totalStudents = teacherClasses.reduce((s, c) => s + c.students, 0);
  const avgClassGrade = (teacherClasses.reduce((s, c) => s + c.avgGrade, 0) / teacherClasses.length).toFixed(1);

  return (
    <DashboardLayout role="teacher" userName="Maria Elena Cruz" pageTitle="Dashboard">
      <PageHeader
        title="Teacher Dashboard"
        description="Mathematics Department · School Year 2025-2026"
        action={
          <Link href="/teacher/grade-entry" className="inline-flex">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-accent text-sm font-medium hover:bg-primary-light transition-colors">
              <PenLine className="h-4 w-4" /> Grade Entry
            </span>
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Assigned Classes" value={teacherClasses.length} icon={BookOpen} />
        <StatCard label="Total Students" value={totalStudents} icon={Users} />
        <StatCard label="Class Average" value={avgClassGrade} trend="up" change="Across all sections" icon={Users} />
        <StatCard label="Students Needing Support" value={atRiskStudents.filter((s) => s.riskLevel !== "low").length} icon={AlertTriangle} trend="down" change="Follow up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card padding="lg">
          <h3 className="font-semibold text-primary mb-4">My Classes</h3>
          <div className="space-y-3">
            {teacherClasses.map((c) => (
              <Link key={c.id} href="/teacher/classes" className="block p-4 rounded-lg border border-neutral-100 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-primary">{c.name}</p>
                    <p className="text-sm text-neutral-500">{c.subject}</p>
                    <p className="text-xs text-neutral-400 mt-1">{c.schedule}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="info">{c.avgGrade} avg</Badge>
                    <p className="text-xs text-neutral-500 mt-1">{c.students} students</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card padding="lg">
          <h3 className="font-semibold text-primary mb-1">School Grade Distribution</h3>
          <p className="text-xs text-neutral-500 mb-4">Grade distribution across all your classes</p>
          <GradeDistributionChart data={gradeDistribution} />
        </Card>
      </div>

      <Card padding="lg">
        <h3 className="font-semibold text-primary mb-4">Announcements</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {teacherNews.map((a) => (
            <div key={a.id} className="p-3 rounded-lg bg-neutral-50 hover:bg-primary/5 transition-colors">
              <p className="text-sm font-medium text-primary line-clamp-2">{a.title}</p>
              <p className="text-xs text-neutral-500 mt-1">{formatDate(a.date)}</p>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
