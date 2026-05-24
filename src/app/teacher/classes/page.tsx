import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { teacherClasses } from "@/lib/data/mock-data";
import { Users, Clock, GraduationCap } from "lucide-react";

export default function TeacherClassesPage() {
  const totalStudents = teacherClasses.reduce((s, c) => s + c.students, 0);

  return (
    <DashboardLayout role="teacher" userName="Maria Elena Cruz" pageTitle="Assigned Classes">
      <PageHeader title="Assigned Classes" description="Your teaching load for School Year 2025-2026." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Sections" value={teacherClasses.length} icon={GraduationCap} />
        <StatCard label="Total Students" value={totalStudents} icon={Users} />
        <StatCard label="Subjects" value={new Set(teacherClasses.map((c) => c.subject)).size} icon={Clock} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teacherClasses.map((c) => (
          <Card key={c.id} hover padding="lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-primary text-lg">{c.name}</h3>
                <p className="text-sm text-neutral-500">{c.subject}</p>
              </div>
              <Badge variant="accent">{c.students} students</Badge>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-t border-neutral-100">
                <dt className="text-neutral-500">Schedule</dt>
                <dd className="font-medium text-primary">{c.schedule}</dd>
              </div>
              <div className="flex justify-between py-2 border-t border-neutral-100">
                <dt className="text-neutral-500">Class Average</dt>
                <dd><Badge variant="success">{c.avgGrade}</Badge></dd>
              </div>
              <div className="flex justify-between py-2 border-t border-neutral-100">
                <dt className="text-neutral-500">Status</dt>
                <dd><Badge variant="success">Active</Badge></dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
