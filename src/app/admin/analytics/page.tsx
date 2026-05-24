import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { TableScroll } from "@/components/ui/table-scroll";
import { Badge } from "@/components/ui/badge";
import { GradeDistributionChart, QuarterlyTrendChart, AttendanceChart } from "@/components/charts/analytics-charts";
import { attendanceSummary, departmentPerformance, gradeDistribution, quarterlyTrends, schoolStats } from "@/lib/data/mock-data";
import { BarChart3, Users, TrendingUp } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout role="admin" userName="Ana Patricia Reyes" pageTitle="School Overview">
      <PageHeader
        title="School Overview"
        description="School-wide performance summaries — grade trends, attendance, and department breakdowns."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="School GWA" value={schoolStats.avgGWA} icon={BarChart3} />
        <StatCard label="Total Sections" value={schoolStats.totalSections} icon={Users} />
        <StatCard label="Pass Rate" value={`${schoolStats.passRate}%`} icon={TrendingUp} trend="up" change="Q4" />
        <StatCard label="Enrollment Growth" value={`+${schoolStats.enrollmentGrowth}%`} icon={Users} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card padding="lg">
          <h3 className="font-semibold text-primary mb-4">Quarterly Trends</h3>
          <QuarterlyTrendChart data={quarterlyTrends} />
        </Card>
        <Card padding="lg">
          <h3 className="font-semibold text-primary mb-4">Grade Distribution</h3>
          <GradeDistributionChart data={gradeDistribution} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="lg">
          <h3 className="font-semibold text-primary mb-4">School Attendance Summary</h3>
          <AttendanceChart data={attendanceSummary} />
        </Card>
        <Card padding="lg" className="overflow-hidden">
          <h3 className="font-semibold text-primary mb-4">Department Breakdown</h3>
          <TableScroll>
            <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="pb-2 text-left text-primary">Department</th>
                <th className="pb-2 text-center text-primary">Students</th>
                <th className="pb-2 text-center text-primary">Avg Grade</th>
                <th className="pb-2 text-center text-primary">Pass Rate</th>
              </tr>
            </thead>
            <tbody>
              {departmentPerformance.map((d) => (
                <tr key={d.department} className="border-b border-neutral-100 hover:bg-primary/5">
                  <td className="py-3 font-medium text-primary max-w-[140px] truncate">{d.department}</td>
                  <td className="py-3 text-center text-neutral-600">{d.students}</td>
                  <td className="py-3 text-center"><Badge variant="info">{d.avgGrade}</Badge></td>
                  <td className="py-3 text-center"><Badge variant="success">{d.passRate}%</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          </TableScroll>
        </Card>
      </div>
    </DashboardLayout>
  );
}
