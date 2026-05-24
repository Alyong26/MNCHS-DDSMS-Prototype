"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";

const COLORS = ["#520A0E", "#7a1520", "#d97706", "#2563eb", "#16a34a"];

interface ChartProps {
  data: Record<string, unknown>[];
  className?: string;
}

export function GradeTrendChart({ data, className }: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
          <YAxis domain={[70, 100]} tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e5e5" }} />
          <Line type="monotone" dataKey="gwa" stroke="#520A0E" strokeWidth={2.5} dot={{ fill: "#520A0E", r: 4 }} name="GWA" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GradeDistributionChart({ data, className }: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis dataKey="range" type="category" width={56} tick={{ fontSize: 10 }} />
          <Tooltip contentStyle={{ borderRadius: 8 }} />
          <Bar dataKey="count" fill="#520A0E" radius={[0, 4, 4, 0]} name="Students" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AttendanceChart({ data, className }: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis domain={[85, 100]} tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ borderRadius: 8 }} />
          <Area type="monotone" dataKey="rate" stroke="#520A0E" fill="#520A0E" fillOpacity={0.15} name="Attendance %" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RiskFactorsChart({ data, className }: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} dataKey="impact" nameKey="factor" cx="50%" cy="50%" outerRadius={70} label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 8 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function QuarterlyTrendChart({ data, className }: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ borderRadius: 8 }} />
          <Bar yAxisId="left" dataKey="avgGrade" fill="#520A0E" name="Avg Grade" radius={[4, 4, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="atRisk" stroke="#dc2626" strokeWidth={2} name="At-Risk Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
