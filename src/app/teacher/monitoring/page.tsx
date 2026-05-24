import Image from "next/image";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskFactorsChart } from "@/components/charts/analytics-charts";
import { atRiskStudents, riskPredictionData } from "@/lib/data/mock-data";
import { getRiskColor, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AlertTriangle, Users, TrendingDown } from "lucide-react";

export default function TeacherMonitoringPage() {
  const high = atRiskStudents.filter((s) => s.riskLevel === "high").length;
  const medium = atRiskStudents.filter((s) => s.riskLevel === "medium").length;

  return (
    <DashboardLayout role="teacher" userName="Maria Elena Cruz" pageTitle="Monitoring">
      <PageHeader
        title="Student Monitoring"
        description="Students in your classes who may benefit from additional academic support."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="High Priority" value={high} icon={AlertTriangle} trend="down" change="Needs follow-up" />
        <StatCard label="Medium Priority" value={medium} icon={Users} />
        <StatCard label="Students Monitored" value={atRiskStudents.length} icon={TrendingDown} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2" padding="lg">
          <h3 className="font-semibold text-primary mb-4">Flagged Students</h3>
          <div className="space-y-3">
            {atRiskStudents.map((s) => (
              <div key={s.id} className="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 hover:border-primary/20 hover:bg-primary/5 transition-colors">
                <Image src={s.avatar || "/images/profile-placeholder.png"} alt="" width={48} height={48} className="rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-primary">{s.name}</p>
                  <p className="text-xs text-neutral-500">{s.section} · LRN {s.lrn}</p>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs">
                    <span className="text-neutral-500">GWA: <strong className="text-primary">{s.gwa}</strong></span>
                    <span className="text-neutral-500">Attendance: <strong className="text-primary">{s.attendance}%</strong></span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={cn("inline-block px-2.5 py-1 rounded-full text-xs font-medium border capitalize", getRiskColor(s.riskLevel))}>
                    {s.riskLevel}
                  </span>
                  <p className="text-lg font-bold text-primary mt-1">{s.riskScore}%</p>
                  <p className="text-xs text-neutral-400">risk score</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="lg">
          <h3 className="font-semibold text-primary mb-1">Risk Factor Distribution</h3>
          <p className="text-xs text-neutral-500 mb-4">Common factors affecting student performance (%)</p>
          <RiskFactorsChart data={riskPredictionData} />
          <ul className="mt-4 space-y-2 text-xs text-neutral-600">
            {riskPredictionData.map((r) => (
              <li key={r.factor} className="flex justify-between">
                <span>{r.factor}</span>
                <Badge variant="default">{r.impact}%</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card padding="md">
        <p className="text-xs text-neutral-500">
          Last model run: {formatDate("2026-03-14")} · Data reflects Q1–Q3 performance and attendance patterns.
        </p>
      </Card>
    </DashboardLayout>
  );
}
