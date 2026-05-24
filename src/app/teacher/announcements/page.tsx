import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { announcements } from "@/lib/data/mock-data";
import { formatDate } from "@/lib/utils";

const categoryVariant = {
  academic: "info" as const,
  general: "default" as const,
  urgent: "danger" as const,
};

export default function TeacherAnnouncementsPage() {
  const items = announcements.filter((a) => a.audience.includes("teacher"));

  return (
    <DashboardLayout role="teacher" userName="Maria Elena Cruz" pageTitle="Announcements">
      <PageHeader title="Announcements" description="Updates for teachers from administration and guidance." />

      <div className="space-y-4">
        {items.map((a) => (
          <Card key={a.id} hover padding="lg">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-primary">{a.title}</h3>
              <Badge variant={categoryVariant[a.category]}>{a.category}</Badge>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">{a.content}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-neutral-500">
              <span>By {a.author}</span>
              <span>{formatDate(a.date)}</span>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
