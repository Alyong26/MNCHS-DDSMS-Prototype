import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { TableScroll } from "@/components/ui/table-scroll";
import { Badge } from "@/components/ui/badge";
import { activityLogs } from "@/lib/data/mock-data";
import { Activity } from "lucide-react";

export default function AdminActivityLogsPage() {
  return (
    <DashboardLayout role="admin" userName="Ana Patricia Reyes" pageTitle="Activity Logs">
      <PageHeader title="Activity Logs" description="Audit trail of user actions across the system." />

      <Card padding="lg" className="overflow-hidden">
        <TableScroll>
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="pb-3 text-left text-primary font-semibold">Timestamp</th>
              <th className="pb-3 text-left text-primary font-semibold">User</th>
              <th className="pb-3 text-left text-primary font-semibold">Action</th>
              <th className="pb-3 text-left text-primary font-semibold">Module</th>
              <th className="pb-3 text-left text-primary font-semibold">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {activityLogs.map((log) => (
              <tr key={log.id} className="border-b border-neutral-100 hover:bg-primary/5 transition-colors">
                <td className="py-3.5 text-neutral-500 font-mono text-xs">{log.timestamp}</td>
                <td className="py-3.5 font-medium text-primary">{log.user}</td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2">
                    <Activity className="h-3.5 w-3.5 text-primary" />
                    {log.action}
                  </div>
                </td>
                <td className="py-3.5"><Badge variant="default">{log.module}</Badge></td>
                <td className="py-3.5 text-neutral-400 font-mono text-xs">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </TableScroll>
      </Card>
    </DashboardLayout>
  );
}
