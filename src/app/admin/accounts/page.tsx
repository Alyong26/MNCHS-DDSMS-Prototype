"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { TableScroll } from "@/components/ui/table-scroll";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { accounts } from "@/lib/data/mock-data";
import { formatDate } from "@/lib/utils";
import { Plus, Pencil, Trash2, UserCog } from "lucide-react";

export default function AdminAccountsPage() {
  return (
    <DashboardLayout role="admin" userName="Ana Patricia Reyes" pageTitle="Manage Accounts">
      <PageHeader
        title="Manage Accounts"
        description="Create, edit, and deactivate portal user accounts."
        action={<Button icon={Plus} size="sm">Add Account</Button>}
      />

      <Card padding="lg" className="overflow-hidden">
        <TableScroll>
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="pb-3 text-left text-primary font-semibold">Name</th>
              <th className="pb-3 text-left text-primary font-semibold">Email</th>
              <th className="pb-3 text-left text-primary font-semibold">Role</th>
              <th className="pb-3 text-left text-primary font-semibold">Section/Dept</th>
              <th className="pb-3 text-center text-primary font-semibold">Status</th>
              <th className="pb-3 text-left text-primary font-semibold">Last Login</th>
              <th className="pb-3 text-right text-primary font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.id} className="border-b border-neutral-100 hover:bg-primary/5 transition-colors">
                <td className="py-3.5 font-medium text-primary max-w-[120px] truncate">{a.name}</td>
                <td className="py-3.5 text-neutral-600 max-w-[140px] truncate">{a.email}</td>
                <td className="py-3.5"><Badge variant="accent">{a.role}</Badge></td>
                <td className="py-3.5 text-neutral-500">{a.section}</td>
                <td className="py-3.5 text-center">
                  <Badge variant={a.status === "active" ? "success" : "warning"}>{a.status}</Badge>
                </td>
                <td className="py-3.5 text-neutral-500">{formatDate(a.lastLogin)}</td>
                <td className="py-3.5 text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" icon={Pencil} aria-label="Edit" />
                    <Button variant="ghost" size="sm" icon={Trash2} aria-label="Delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </TableScroll>
      </Card>

      <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
        <UserCog className="h-4 w-4 text-primary" />
        <span>{accounts.length} accounts registered · {accounts.filter((a) => a.status === "active").length} active</span>
      </div>
    </DashboardLayout>
  );
}
