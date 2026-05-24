import Image from "next/image";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradeTrendChart } from "@/components/charts/analytics-charts";
import { announcements, currentStudent, gradeTrend, studentGrades } from "@/lib/data/mock-data";
import { formatDate } from "@/lib/utils";
import { GraduationCap, TrendingUp, Megaphone, FileDown, BookOpen } from "lucide-react";

export default function StudentDashboardPage() {
  const studentNews = announcements.filter((a) => a.audience.includes("student")).slice(0, 3);
  const topSubjects = [...studentGrades].sort((a, b) => b.final - a.final).slice(0, 3);

  return (
    <DashboardLayout role="student" userName="Juan Miguel Santos" pageTitle="Dashboard">
      <PageHeader
        title={`Welcome, ${currentStudent.name.split(" ")[0]}!`}
        description={`${currentStudent.section} · SY ${currentStudent.schoolYear}`}
        action={
          <Link href="/student/report-card">
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4" />
              Report Card
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="General Average" value={currentStudent.gwa.toFixed(2)} change="Q4 current" trend="up" icon={GraduationCap} />
        <StatCard label="Subjects Enrolled" value={studentGrades.length} icon={BookOpen} />
        <StatCard label="Highest Grade" value={Math.max(...studentGrades.map((g) => g.final))} change="Physical Education" trend="up" icon={TrendingUp} />
        <StatCard label="Announcements" value={studentNews.length} icon={Megaphone} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" padding="lg">
          <h3 className="font-semibold text-primary mb-4">GWA Trend</h3>
          <GradeTrendChart data={gradeTrend} />
        </Card>

        <Card padding="lg">
          <div className="flex items-center gap-4 mb-4">
            <Image src={currentStudent.avatar} alt="" width={64} height={64} className="rounded-full border-2 border-primary/20" />
            <div>
              <p className="font-semibold text-primary">{currentStudent.name}</p>
              <p className="text-xs text-neutral-500">LRN: {currentStudent.lrn}</p>
              <Badge variant="accent" className="mt-1">{currentStudent.strand}</Badge>
            </div>
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-neutral-500">Adviser</dt><dd className="text-primary font-medium">{currentStudent.adviser}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Grade Level</dt><dd className="text-primary font-medium">{currentStudent.gradeLevel}</dd></div>
          </dl>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card padding="lg">
          <h3 className="font-semibold text-primary mb-4">Top Performing Subjects</h3>
          <div className="space-y-3">
            {topSubjects.map((g) => (
              <div key={g.subject} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 hover:bg-primary/5 transition-colors">
                <span className="text-sm font-medium text-primary">{g.subject}</span>
                <Badge variant="success">{g.final}</Badge>
              </div>
            ))}
          </div>
          <Link href="/student/grades" className="text-sm text-primary font-medium hover:underline mt-4 inline-block">View all grades →</Link>
        </Card>

        <Card padding="lg">
          <h3 className="font-semibold text-primary mb-4">Recent Announcements</h3>
          <div className="space-y-3">
            {studentNews.map((a) => (
              <div key={a.id} className="p-3 rounded-lg border border-neutral-100 hover:border-primary/20 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-primary">{a.title}</p>
                  <Badge variant={a.category === "urgent" ? "danger" : a.category === "academic" ? "info" : "default"}>{a.category}</Badge>
                </div>
                <p className="text-xs text-neutral-500 mt-1">{formatDate(a.date)}</p>
              </div>
            ))}
          </div>
          <Link href="/student/announcements" className="text-sm text-primary font-medium hover:underline mt-4 inline-block">View all →</Link>
        </Card>
      </div>
    </DashboardLayout>
  );
}
