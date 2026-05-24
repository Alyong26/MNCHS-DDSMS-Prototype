export type UserRole = "student" | "teacher" | "admin";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  mobileLabel?: string;
}

export interface StatCard {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: "academic" | "general" | "urgent";
  audience: string[];
}

export interface Student {
  id: string;
  lrn: string;
  name: string;
  section: string;
  gradeLevel: number;
  gwa: number;
  attendance: number;
  riskLevel: "low" | "medium" | "high";
  riskScore: number;
  avatar?: string;
}

export interface GradeRecord {
  subject: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  final: number;
  remarks: string;
  teacher: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  module: string;
  timestamp: string;
  ip: string;
}

export interface ObservedValue {
  coreValue: string;
  statement: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
}

export interface AttendanceRecord {
  label: string;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  total: number;
}
