import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { TableScroll } from "@/components/ui/table-scroll";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { archivedStudents } from "@/lib/data/mock-data";
import { Archive, GraduationCap, ArrowRightLeft } from "lucide-react";

export default function AdminArchivePage() {
  const graduated = archivedStudents.filter((s) => s.status === "Graduated").length;
  const transferred = archivedStudents.filter((s) => s.status === "Transferred").length;

  return (
    <DashboardLayout role="admin" userName="Ana Patricia Reyes" pageTitle="Student Archive">
      <PageHeader title="Student Archive" description="Historical records for graduated and transferred students." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Archived Records" value={archivedStudents.length} icon={Archive} />
        <StatCard label="Graduated" value={graduated} icon={GraduationCap} />
        <StatCard label="Transferred" value={transferred} icon={ArrowRightLeft} />
      </div>

      <Card padding="lg" className="overflow-hidden">
        <TableScroll>
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="pb-3 text-left text-primary font-semibold">Name</th>
              <th className="pb-3 text-left text-primary font-semibold">LRN</th>
              <th className="pb-3 text-left text-primary font-semibold">Last Section</th>
              <th className="pb-3 text-left text-primary font-semibold">School Year</th>
              <th className="pb-3 text-center text-primary font-semibold">Final GWA</th>
              <th className="pb-3 text-center text-primary font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {archivedStudents.map((s) => (
              <tr key={s.id} className="border-b border-neutral-100 hover:bg-primary/5 transition-colors">
                <td className="py-3.5 font-medium text-primary">{s.name}</td>
                <td className="py-3.5 text-neutral-600">{s.lrn}</td>
                <td className="py-3.5 text-neutral-600">{s.section}</td>
                <td className="py-3.5 text-neutral-500">{s.schoolYear}</td>
                <td className="py-3.5 text-center font-semibold text-primary">{s.gwa}</td>
                <td className="py-3.5 text-center">
                  <Badge variant={s.status === "Graduated" ? "success" : "info"}>{s.status}</Badge>
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
