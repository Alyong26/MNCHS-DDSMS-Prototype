import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roleNav, roleLabels } from "@/lib/navigation";
import { accounts } from "@/lib/data/mock-data";
import type { UserRole } from "@/types";
import { Shield, Users } from "lucide-react";

const roleDescriptions: Record<UserRole, string> = {
  student: "View grades, performance summary, report card download, and announcements.",
  teacher: "Grade entry, class records, class overview, and student monitoring.",
  admin: "School overview, at-risk monitoring, teacher deployment, account management, archives, announcements, and system settings.",
};

const permissions: Record<UserRole, string[]> = {
  student: ["View own grades", "Download report card", "View announcements", "Profile settings"],
  teacher: ["Grade entry (WW/PT/QA)", "Class record", "Class overview", "Student monitoring", "Announcements"],
  admin: ["School overview", "School's at-risk", "Teacher deployment", "Manage accounts", "Student archive", "System settings", "Activity logs", "Role management"],
};

export default function AdminRolesPage() {
  const roleCounts = accounts.reduce(
    (acc, a) => {
      const key = a.role.toLowerCase();
      if (key.includes("student")) acc.student = (acc.student || 0) + 1;
      else if (key.includes("teacher")) acc.teacher = (acc.teacher || 0) + 1;
      else acc.admin = (acc.admin || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <DashboardLayout role="admin" userName="Ana Patricia Reyes" pageTitle="Role Management">
      <PageHeader title="User Role Management" description="Portal roles, permissions, and navigation access." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(Object.keys(roleNav) as UserRole[]).map((role) => (
          <Card key={role} hover padding="lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-primary">{roleLabels[role]}</h3>
              </div>
              <Badge variant="accent" className="capitalize">{role}</Badge>
            </div>
            <p className="text-sm text-neutral-500 mb-4">{roleDescriptions[role]}</p>
            <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
              <Users className="h-4 w-4" />
              <span>{roleCounts[role] ?? 0} demo account(s)</span>
            </div>
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Permissions</h4>
            <ul className="space-y-1 mb-4">
              {permissions[role].map((p) => (
                <li key={p} className="text-xs text-neutral-600 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  {p}
                </li>
              ))}
            </ul>
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Navigation ({roleNav[role].length} items)</h4>
            <div className="flex flex-wrap gap-1">
              {roleNav[role].map((item) => (
                <Badge key={item.href} variant="default">{item.label}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
