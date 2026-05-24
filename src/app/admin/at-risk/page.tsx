"use client";

import { useState } from "react";
import Image from "next/image";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  atRiskStudents,
  atRiskByDepartment,
  atRiskByGradeLevel,
  atRiskBySection,
  schoolStats,
} from "@/lib/data/mock-data";
import { getRiskColor } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AlertTriangle, Building2, ChevronDown, ChevronUp } from "lucide-react";

type TabKey = "department" | "gradeLevel" | "section";

export default function AdminAtRiskPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("department");
  const [showSampleStudents, setShowSampleStudents] = useState(false);

  const departmentsAffected = atRiskByDepartment.filter((d) => d.atRisk > 0).length;
  const juniorHigh = atRiskByGradeLevel.filter((g) => g.track === "Junior High");
  const seniorHigh = atRiskByGradeLevel.filter((g) => g.track === "Senior High");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "department", label: "By Department" },
    { key: "gradeLevel", label: "By Grade Level" },
    { key: "section", label: "By Section" },
  ];

  return (
    <DashboardLayout role="admin" userName="Ana Patricia Reyes" pageTitle="School's At-Risk">
      <PageHeader
        title="School's At-Risk"
        description="A friendly overview of learners who may need extra academic support — grouped by department, grade level, and section."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="School Pass Rate" value={`${schoolStats.passRate}%`} icon={AlertTriangle} trend="up" />
        <StatCard label="Total At-Risk Learners" value={schoolStats.atRiskCount} icon={AlertTriangle} trend="down" change="Needs follow-up" />
        <StatCard label="Departments Affected" value={departmentsAffected} icon={Building2} />
      </div>

      <div className="flex gap-2 mb-6 border-b border-neutral-200 overflow-x-auto table-scroll pb-px -mx-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-neutral-500 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "department" && (
        <Card padding="lg" className="overflow-x-auto mb-6">
          <h3 className="font-semibold text-primary mb-4">At-Risk Learners by Department</h3>
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="pb-3 text-left text-primary">Department</th>
                <th className="pb-3 text-center text-primary">At-Risk</th>
                <th className="pb-3 text-center text-primary">Sections</th>
                <th className="pb-3 text-center text-primary">Pass Rate</th>
                <th className="pb-3 text-center text-primary">Total Students</th>
              </tr>
            </thead>
            <tbody>
              {atRiskByDepartment.map((row) => (
                <tr key={row.department} className="border-b border-neutral-100 hover:bg-primary/5">
                  <td className="py-3 font-medium text-primary">{row.department}</td>
                  <td className="py-3 text-center"><Badge variant={row.atRisk > 10 ? "danger" : "warning"}>{row.atRisk}</Badge></td>
                  <td className="py-3 text-center">{row.sections}</td>
                  <td className="py-3 text-center">{row.passRate}%</td>
                  <td className="py-3 text-center">{row.totalStudents.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {activeTab === "gradeLevel" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card padding="lg" className="overflow-x-auto">
            <h3 className="font-semibold text-primary mb-1">Junior High School</h3>
            <p className="text-xs text-neutral-500 mb-4">Grades 7–10</p>
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="pb-3 text-left text-primary">Grade Level</th>
                  <th className="pb-3 text-center text-primary">At-Risk</th>
                  <th className="pb-3 text-center text-primary">Pass Rate</th>
                </tr>
              </thead>
              <tbody>
                {juniorHigh.map((row) => (
                  <tr key={row.level} className="border-b border-neutral-100">
                    <td className="py-3 font-medium text-primary">{row.level}</td>
                    <td className="py-3 text-center">{row.atRisk}</td>
                    <td className="py-3 text-center">{row.passRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card padding="lg" className="overflow-x-auto">
            <h3 className="font-semibold text-primary mb-1">Senior High School</h3>
            <p className="text-xs text-neutral-500 mb-4">Grades 11–12</p>
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="pb-3 text-left text-primary">Grade Level</th>
                  <th className="pb-3 text-center text-primary">At-Risk</th>
                  <th className="pb-3 text-center text-primary">Pass Rate</th>
                </tr>
              </thead>
              <tbody>
                {seniorHigh.map((row) => (
                  <tr key={row.level} className="border-b border-neutral-100">
                    <td className="py-3 font-medium text-primary">{row.level}</td>
                    <td className="py-3 text-center">{row.atRisk}</td>
                    <td className="py-3 text-center">{row.passRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {activeTab === "section" && (
        <Card padding="lg" className="overflow-x-auto mb-6">
          <h3 className="font-semibold text-primary mb-4">Sections That May Need Attention</h3>
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="pb-3 text-left text-primary">Section</th>
                <th className="pb-3 text-center text-primary">At-Risk</th>
                <th className="pb-3 text-center text-primary">Avg GWA</th>
                <th className="pb-3 text-center text-primary">Pass Rate</th>
              </tr>
            </thead>
            <tbody>
              {atRiskBySection.map((row) => (
                <tr key={row.section} className="border-b border-neutral-100 hover:bg-primary/5">
                  <td className="py-3 font-medium text-primary">{row.section}</td>
                  <td className="py-3 text-center">{row.atRisk}</td>
                  <td className="py-3 text-center">{row.avgGwa}</td>
                  <td className="py-3 text-center">{row.passRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <Card padding="lg">
        <button
          type="button"
          onClick={() => setShowSampleStudents(!showSampleStudents)}
          className="flex items-center justify-between w-full text-left"
        >
          <div>
            <h3 className="font-semibold text-primary">Sample Students</h3>
            <p className="text-xs text-neutral-500 mt-0.5">Optional list for adviser follow-up (demo data)</p>
          </div>
          {showSampleStudents ? <ChevronUp className="h-5 w-5 text-neutral-400" /> : <ChevronDown className="h-5 w-5 text-neutral-400" />}
        </button>
        {showSampleStudents && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="pb-3 text-left text-primary">Student</th>
                  <th className="pb-3 text-left text-primary">Section</th>
                  <th className="pb-3 text-center text-primary">GWA</th>
                  <th className="pb-3 text-center text-primary">Attendance</th>
                  <th className="pb-3 text-center text-primary">Priority</th>
                </tr>
              </thead>
              <tbody>
                {atRiskStudents.map((s) => (
                  <tr key={s.id} className="border-b border-neutral-100 hover:bg-primary/5">
                    <td className="py-3 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <Image src={s.avatar || "/images/profile-placeholder.png"} alt="" width={32} height={32} className="rounded-full flex-shrink-0" />
                        <span className="font-medium text-primary truncate">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-neutral-600">{s.section}</td>
                    <td className="py-3 text-center font-semibold">{s.gwa}</td>
                    <td className="py-3 text-center">{s.attendance}%</td>
                    <td className="py-3 text-center">
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border capitalize", getRiskColor(s.riskLevel))}>
                        {s.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}
