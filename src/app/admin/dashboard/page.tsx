import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { activityLogs, accounts, schoolStats } from "@/lib/data/mock-data";
import { formatDate } from "@/lib/utils";
import { Users, UserCog, Activity, Settings } from "lucide-react";

export default function AdminDashboardPage() {
  const activeAccounts = accounts.filter((a) => a.status === "active").length;

  return (
    <DashboardLayout role="admin" userName="Ana Patricia Reyes" pageTitle="Dashboard">
      <PageHeader
        title="Admin Dashboard"
        description="System administration and school data management overview."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Students" value={schoolStats.totalStudents.toLocaleString()} icon={Users} />
        <StatCard label="Active Accounts" value={activeAccounts} icon={UserCog} />
        <StatCard label="Teachers" value={schoolStats.totalTeachers} icon={Users} />
        <StatCard label="System Users" value={accounts.length} icon={Settings} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-primary">Recent Activity</h3>
            <Link href="/admin/activity-logs" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {activityLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 hover:bg-primary/5 transition-colors">
                <Activity className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-primary">{log.action}</p>
                  <p className="text-xs text-neutral-500">{log.user} · {log.module}</p>
                  <p className="text-xs text-neutral-400">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-primary">Quick Links</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { href: "/admin/analytics", label: "School Overview" },
              { href: "/admin/teacher-deployment", label: "Teacher Deployment" },
              { href: "/admin/at-risk", label: "School's At-Risk" },
              { href: "/admin/accounts", label: "Manage Accounts" },
              { href: "/admin/archive", label: "Student Archive" },
              { href: "/admin/announcements", label: "Announcements" },
              { href: "/admin/settings", label: "System Settings" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-4 rounded-lg border border-neutral-200 text-sm font-medium text-primary hover:border-primary hover:bg-primary/5 transition-colors text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-accent/30 border border-primary/10">
            <p className="text-sm text-primary font-medium">School Status</p>
            <p className="text-xs text-neutral-500 mt-1">All systems operational · Last backup: {formatDate("2026-03-14")}</p>
            <Badge variant="success" className="mt-2">Online</Badge>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
