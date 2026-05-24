"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    schoolName: "Mati National Comprehensive High School",
    schoolId: "304325",
    schoolYear: "2025-2026",
    currentQuarter: "Q3",
    gradeSubmissionDeadline: "2026-03-28",
    maintenanceMode: false,
    allowStudentSignup: true,
    studentSupportAlerts: true,
    pwaEnabled: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("System settings saved (demo).");
  };

  return (
    <DashboardLayout role="admin" userName="Ana Patricia Reyes" pageTitle="System Settings">
      <PageHeader title="System Settings" description="Configure school information and portal options." />

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="lg">
          <h3 className="font-semibold text-primary mb-4">School Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">School Name</label>
              <input
                type="text"
                value={settings.schoolName}
                onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">School ID</label>
                <input
                  type="text"
                  value={settings.schoolId}
                  onChange={(e) => setSettings({ ...settings, schoolId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">School Year</label>
                <input
                  type="text"
                  value={settings.schoolYear}
                  onChange={(e) => setSettings({ ...settings, schoolYear: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Current Quarter</label>
                <select
                  value={settings.currentQuarter}
                  onChange={(e) => setSettings({ ...settings, currentQuarter: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm outline-none"
                >
                  {["Q1", "Q2", "Q3", "Q4"].map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Grade Deadline</label>
                <input
                  type="date"
                  value={settings.gradeSubmissionDeadline}
                  onChange={(e) => setSettings({ ...settings, gradeSubmissionDeadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm outline-none"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <h3 className="font-semibold text-primary mb-4">Portal Options</h3>
          <div className="space-y-4">
            {[
              { key: "maintenanceMode" as const, label: "Maintenance Mode", desc: "Temporarily disable portal access for all users" },
              { key: "allowStudentSignup" as const, label: "Student Self-Registration", desc: "Allow new students to create their own accounts" },
              { key: "studentSupportAlerts" as const, label: "Student Support Alerts", desc: "Notify teachers and admins about students who may need extra help" },
              { key: "pwaEnabled" as const, label: "Install on Device", desc: "Allow users to install the portal on their phone or computer" },
            ].map((opt) => (
              <label key={opt.key} className="flex items-start gap-3 p-3 rounded-lg border border-neutral-100 hover:bg-primary/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[opt.key]}
                  onChange={(e) => setSettings({ ...settings, [opt.key]: e.target.checked })}
                  className="mt-1 rounded border-neutral-300 text-primary focus:ring-primary"
                />
                <div>
                  <p className="text-sm font-medium text-primary">{opt.label}</p>
                  <p className="text-xs text-neutral-500">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2">
          <Button type="submit" icon={Save}>Save Settings</Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
