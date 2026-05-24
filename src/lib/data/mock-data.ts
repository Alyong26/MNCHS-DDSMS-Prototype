import type { Announcement, GradeRecord, Student, ActivityLog, ObservedValue, AttendanceRecord } from "@/types";

export const currentStudent = {
  name: "Juan Miguel Santos",
  lrn: "123456789012",
  section: "Grade 11 - STEM A",
  gradeLevel: 11,
  strand: "STEM",
  schoolYear: "2025-2026",
  adviser: "Maria Elena Cruz",
  gwa: 88.45,
  avatar: "/images/profile-placeholder.png",
};

export const studentGrades: GradeRecord[] = [
  { subject: "General Mathematics", q1: 90, q2: 88, q3: 92, q4: 89, final: 90, remarks: "PASSED", teacher: "Maria Elena Cruz" },
  { subject: "General Physics 1", q1: 85, q2: 87, q3: 86, q4: 88, final: 87, remarks: "PASSED", teacher: "Roberto Mendoza" },
  { subject: "English for Academic Purposes", q1: 92, q2: 91, q3: 93, q4: 90, final: 92, remarks: "PASSED", teacher: "Patricia Reyes" },
  { subject: "Komunikasyon at Pananaliksik", q1: 88, q2: 90, q3: 89, q4: 91, final: 90, remarks: "PASSED", teacher: "Ana Lopez" },
  { subject: "Physical Education and Health", q1: 95, q2: 94, q3: 96, q4: 95, final: 95, remarks: "PASSED", teacher: "Carlos Tan" },
  { subject: "Practical Research 1", q1: 87, q2: 89, q3: 88, q4: 90, final: 89, remarks: "PASSED", teacher: "Maria Elena Cruz" },
  { subject: "Earth and Life Science", q1: 84, q2: 86, q3: 85, q4: 87, final: 86, remarks: "PASSED", teacher: "Roberto Mendoza" },
  { subject: "Understanding Culture, Society and Politics", q1: 91, q2: 90, q3: 92, q4: 89, final: 91, remarks: "PASSED", teacher: "Patricia Reyes" },
];

export const gradingScale = [
  { range: "90-100", label: "Outstanding" },
  { range: "85-89", label: "Very Satisfactory" },
  { range: "80-84", label: "Satisfactory" },
  { range: "75-79", label: "Fairly Satisfactory" },
  { range: "Below 75", label: "Did Not Meet Expectations" },
];

export const observedValues: ObservedValue[] = [
  { coreValue: "Maka-Diyos", statement: "Expresses one's spiritual beliefs while respecting the spiritual beliefs of others.", q1: "AO", q2: "AO", q3: "SO", q4: "AO" },
  { coreValue: "Maka-Tao", statement: "Shows adherence to ethical principles by upholding truth.", q1: "AO", q2: "SO", q3: "AO", q4: "AO" },
  { coreValue: "Maka-Kalikasan", statement: "Cares for the environment and utilizes resources wisely.", q1: "SO", q2: "AO", q3: "AO", q4: "SO" },
  { coreValue: "Maka-Bansa", statement: "Demonstrates pride in being a Filipino; exercises the rights and responsibilities of a Filipino citizen.", q1: "AO", q2: "AO", q3: "AO", q4: "AO" },
];

export const attendanceRecords: AttendanceRecord[] = [
  { label: "No. of School Days", jun: 0, jul: 22, aug: 21, sep: 22, oct: 20, nov: 21, dec: 15, jan: 22, feb: 20, mar: 22, apr: 0, total: 185 },
  { label: "No. of Days Present", jun: 0, jul: 21, aug: 20, sep: 21, oct: 19, nov: 20, dec: 14, jan: 21, feb: 19, mar: 21, apr: 0, total: 176 },
  { label: "No. of Days Absent", jun: 0, jul: 1, aug: 1, sep: 1, oct: 1, nov: 1, dec: 1, jan: 1, feb: 1, mar: 1, apr: 0, total: 9 },
];

export interface SummaryFinalGradeRow {
  id: string;
  name: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  finalGrade: number;
  generalAverage: number;
  remarks: string;
}

export const summaryFinalGrades: SummaryFinalGradeRow[] = [
  { id: "1", name: "Juan Miguel Santos", q1: 90, q2: 88, q3: 92, q4: 89, finalGrade: 90, generalAverage: 88.45, remarks: "PASSED" },
  { id: "2", name: "Ana Sofia Reyes", q1: 88, q2: 90, q3: 87, q4: 91, finalGrade: 89, generalAverage: 89.0, remarks: "PASSED" },
  { id: "3", name: "Miguel Angelo Tan", q1: 82, q2: 84, q3: 83, q4: 85, finalGrade: 84, generalAverage: 83.5, remarks: "PASSED" },
  { id: "4", name: "Patricia Mae Lopez", q1: 91, q2: 93, q3: 92, q4: 94, finalGrade: 93, generalAverage: 92.5, remarks: "PASSED" },
  { id: "5", name: "Carlos Eduardo Cruz", q1: 72, q2: 74, q3: 73, q4: 71, finalGrade: 73, generalAverage: 72.5, remarks: "FAILED" },
];

export const gradeTrend = [
  { quarter: "Q1", gwa: 89.0 },
  { quarter: "Q2", gwa: 88.1 },
  { quarter: "Q3", gwa: 89.5 },
  { quarter: "Q4", gwa: 88.45 },
];

export const gradeDistribution = [
  { range: "90-100", count: 245, label: "Outstanding" },
  { range: "85-89", count: 412, label: "Very Satisfactory" },
  { range: "80-84", count: 328, label: "Satisfactory" },
  { range: "75-79", count: 156, label: "Fairly Satisfactory" },
  { range: "Below 75", count: 42, label: "Did Not Meet" },
];

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "Quarter 3 Grade Submission Deadline",
    content: "All teachers are reminded to submit final grades for Quarter 3 by March 28, 2026. Please coordinate with the registrar if you need an extension.",
    author: "Dr. Roberto Mendoza",
    date: "2026-03-15",
    category: "academic",
    audience: ["teacher", "admin"],
  },
  {
    id: "2",
    title: "Report Cards Available for Download",
    content: "Grade 11 and 12 students may now download their report cards for School Year 2025-2026 through the student portal.",
    author: "Registrar's Office",
    date: "2026-03-10",
    category: "general",
    audience: ["student"],
  },
  {
    id: "3",
    title: "Students Needing Extra Support",
    content: "Advisers and subject teachers are requested to coordinate with the guidance office for students who may need additional academic support this quarter.",
    author: "Guidance Office",
    date: "2026-03-08",
    category: "urgent",
    audience: ["teacher", "admin"],
  },
  {
    id: "4",
    title: "Portal Maintenance Schedule",
    content: "The SMS Portal will undergo scheduled maintenance on March 22, 2026 from 11:00 PM to 2:00 AM. Please save all grade entries before this period.",
    author: "IT Administrator",
    date: "2026-03-05",
    category: "general",
    audience: ["admin", "teacher", "student"],
  },
];

export const atRiskStudents: Student[] = [
  { id: "1", lrn: "123456789001", name: "Mark Anthony Rivera", section: "Grade 10 - HUMSS B", gradeLevel: 10, gwa: 74.2, attendance: 82, riskLevel: "high", riskScore: 87, avatar: "/images/profile-placeholder.png" },
  { id: "2", lrn: "123456789002", name: "Sarah Jane Dela Cruz", section: "Grade 11 - STEM B", gradeLevel: 11, gwa: 76.8, attendance: 88, riskLevel: "high", riskScore: 79, avatar: "/images/profile-placeholder.png" },
  { id: "3", lrn: "123456789003", name: "Kevin James Ocampo", section: "Grade 9 - Einstein", gradeLevel: 9, gwa: 78.5, attendance: 91, riskLevel: "medium", riskScore: 65, avatar: "/images/profile-placeholder.png" },
  { id: "4", lrn: "123456789004", name: "Angelica Mae Torres", section: "Grade 12 - ABM A", gradeLevel: 12, gwa: 79.1, attendance: 85, riskLevel: "medium", riskScore: 58, avatar: "/images/profile-placeholder.png" },
  { id: "5", lrn: "123456789005", name: "Rafael Santos Jr.", section: "Grade 10 - TVL-ICT", gradeLevel: 10, gwa: 80.3, attendance: 93, riskLevel: "low", riskScore: 42, avatar: "/images/profile-placeholder.png" },
];

export const teacherClasses = [
  { id: "1", name: "Grade 11 - STEM A", subject: "General Mathematics", students: 42, avgGrade: 87.5, schedule: "MWF 7:30-8:30 AM" },
  { id: "2", name: "Grade 11 - STEM B", subject: "General Mathematics", students: 40, avgGrade: 85.2, schedule: "TTh 9:30-10:30 AM" },
  { id: "3", name: "Grade 12 - STEM A", subject: "Practical Research 2", students: 38, avgGrade: 88.9, schedule: "MWF 1:30-2:30 PM" },
  { id: "4", name: "Grade 11 - HUMSS A", subject: "Statistics and Probability", students: 35, avgGrade: 86.7, schedule: "TTh 2:30-3:30 PM" },
];

export const schoolStats = {
  totalStudents: 2847,
  totalTeachers: 98,
  totalSections: 72,
  avgGWA: 84.6,
  passRate: 92.4,
  atRiskCount: 47,
  enrollmentGrowth: 3.2,
};

export const departmentPerformance = [
  { department: "STEM", avgGrade: 86.2, students: 892, passRate: 94.1 },
  { department: "ABM", avgGrade: 85.8, students: 645, passRate: 93.5 },
  { department: "HUMSS", avgGrade: 84.3, students: 578, passRate: 91.8 },
  { department: "TVL", avgGrade: 83.9, students: 732, passRate: 90.2 },
];

export const quarterlyTrends = [
  { quarter: "Q1", avgGrade: 83.2, passRate: 90.1, atRisk: 52 },
  { quarter: "Q2", avgGrade: 84.1, passRate: 91.5, atRisk: 49 },
  { quarter: "Q3", avgGrade: 84.8, passRate: 92.0, atRisk: 47 },
  { quarter: "Q4", avgGrade: 84.6, passRate: 92.4, atRisk: 47 },
];

export const activityLogs: ActivityLog[] = [
  { id: "1", user: "Maria Elena Cruz", action: "Submitted Q3 grades", module: "Grade Entry", timestamp: "2026-03-15 14:32:00", ip: "192.168.1.45" },
  { id: "2", user: "Ana Patricia Reyes", action: "Created new teacher account", module: "Manage Accounts", timestamp: "2026-03-15 11:15:00", ip: "192.168.1.12" },
  { id: "3", user: "Juan Miguel Santos", action: "Downloaded report card", module: "Student Portal", timestamp: "2026-03-14 16:48:00", ip: "10.0.0.88" },
  { id: "4", user: "Ana Patricia Reyes", action: "Reviewed students needing support", module: "School Overview", timestamp: "2026-03-14 09:22:00", ip: "192.168.1.12" },
  { id: "5", user: "Ana Patricia Reyes", action: "Updated system settings", module: "System Settings", timestamp: "2026-03-13 15:05:00", ip: "192.168.1.12" },
];

export const accounts = [
  { id: "1", name: "Juan Miguel Santos", email: "student@mnchs.edu.ph", role: "Student", section: "Grade 11 - STEM A", status: "active", lastLogin: "2026-03-15" },
  { id: "2", name: "Maria Elena Cruz", email: "teacher@mnchs.edu.ph", role: "Teacher", section: "Mathematics Dept.", status: "active", lastLogin: "2026-03-15" },
  { id: "3", name: "Ana Patricia Reyes", email: "admin@mnchs.edu.ph", role: "Administrator", section: "IT Office", status: "active", lastLogin: "2026-03-15" },
  { id: "4", name: "Dr. Roberto Mendoza", email: "roberto.mendoza@mnchs.edu.ph", role: "Administrator", section: "School Administration", status: "active", lastLogin: "2026-03-14" },
  { id: "5", name: "Mark Anthony Rivera", email: "mark.rivera@mnchs.edu.ph", role: "Student", section: "Grade 10 - HUMSS B", status: "active", lastLogin: "2026-03-12" },
];

export const archivedStudents = [
  { id: "1", name: "Carlos Mendez", lrn: "123456788001", section: "Grade 12 - STEM A", schoolYear: "2024-2025", status: "Graduated", gwa: 91.2 },
  { id: "2", name: "Lisa Fernandez", lrn: "123456788002", section: "Grade 12 - ABM B", schoolYear: "2024-2025", status: "Graduated", gwa: 89.5 },
  { id: "3", name: "James Wilson", lrn: "123456788003", section: "Grade 11 - HUMSS A", schoolYear: "2024-2025", status: "Transferred", gwa: 85.0 },
];

export const attendanceSummary = [
  { month: "Jul", rate: 96.2 },
  { month: "Aug", rate: 95.8 },
  { month: "Sep", rate: 94.5 },
  { month: "Oct", rate: 95.1 },
  { month: "Nov", rate: 93.8 },
  { month: "Dec", rate: 92.4 },
  { month: "Jan", rate: 94.9 },
  { month: "Feb", rate: 95.6 },
  { month: "Mar", rate: 94.2 },
];

export const riskPredictionData = [
  { factor: "Low Q1-Q2 Average", impact: 35 },
  { factor: "Attendance Below 85%", impact: 28 },
  { factor: "Multiple Failing Subjects", impact: 22 },
  { factor: "Declining Grade Trend", impact: 15 },
];

export const schoolYears = ["2025-2026", "2024-2025", "2023-2024"];

export const gradesBySchoolYear: Record<string, { gwa: number; grades: GradeRecord[] }> = {
  "2025-2026": { gwa: 88.45, grades: studentGrades },
  "2024-2025": {
    gwa: 87.2,
    grades: studentGrades.map((g) => ({
      ...g,
      q1: g.q1 - 2,
      q2: g.q2 - 1,
      q3: g.q3 - 2,
      q4: g.q4 - 1,
      final: Math.max(75, g.final - 2),
    })),
  },
  "2023-2024": {
    gwa: 86.8,
    grades: studentGrades.map((g) => ({
      ...g,
      q1: g.q1 - 3,
      q2: g.q2 - 2,
      q3: g.q3 - 3,
      q4: g.q4 - 2,
      final: Math.max(75, g.final - 3),
    })),
  },
};

export const atRiskByDepartment = [
  { department: "STEM", atRisk: 14, sections: 8, passRate: 94.1, totalStudents: 892 },
  { department: "ABM", atRisk: 11, sections: 6, passRate: 93.5, totalStudents: 645 },
  { department: "HUMSS", atRisk: 12, sections: 7, passRate: 91.8, totalStudents: 578 },
  { department: "TVL", atRisk: 10, sections: 9, passRate: 90.2, totalStudents: 732 },
];

export const atRiskByGradeLevel = [
  { level: "Grade 7", track: "Junior High", atRisk: 4, sections: 6, passRate: 93.8, students: 412 },
  { level: "Grade 8", track: "Junior High", atRisk: 5, sections: 6, passRate: 92.9, students: 398 },
  { level: "Grade 9", track: "Junior High", atRisk: 6, sections: 6, passRate: 92.1, students: 405 },
  { level: "Grade 10", track: "Junior High", atRisk: 8, sections: 6, passRate: 91.5, students: 392 },
  { level: "Grade 11", track: "Senior High", atRisk: 12, sections: 12, passRate: 92.8, students: 620 },
  { level: "Grade 12", track: "Senior High", atRisk: 12, sections: 12, passRate: 93.2, students: 620 },
];

export const atRiskBySection = [
  { section: "Grade 10 - HUMSS B", atRisk: 5, avgGwa: 78.2, passRate: 88.1 },
  { section: "Grade 11 - STEM B", atRisk: 4, avgGwa: 79.5, passRate: 89.0 },
  { section: "Grade 9 - Einstein", atRisk: 3, avgGwa: 80.1, passRate: 90.2 },
  { section: "Grade 12 - ABM A", atRisk: 3, avgGwa: 81.0, passRate: 91.5 },
  { section: "Grade 10 - TVL-ICT", atRisk: 2, avgGwa: 82.3, passRate: 92.0 },
];

export const teacherDeployments = [
  { id: "1", teacher: "Maria Elena Cruz", email: "teacher@mnchs.edu.ph", subject: "General Mathematics", section: "Grade 11 - STEM A", role: "Subject Teacher", department: "Mathematics" },
  { id: "2", teacher: "Roberto Mendoza", email: "roberto.mendoza@mnchs.edu.ph", subject: "General Physics 1", section: "Grade 11 - STEM A", role: "Head of Department", department: "Science" },
  { id: "3", teacher: "Patricia Reyes", email: "patricia.reyes@mnchs.edu.ph", subject: "English", section: "Grade 11 - HUMSS A", role: "Subject Teacher", department: "English" },
  { id: "4", teacher: "Carlos Tan", email: "carlos.tan@mnchs.edu.ph", subject: "PE & Health", section: "Grade 10 - Einstein", role: "Class Adviser", department: "MAPEH" },
];

export const classRecordOptions = {
  schoolYears: ["2025-2026", "2024-2025"],
  classes: teacherClasses.map((c) => ({ id: c.id, label: `${c.name} — ${c.subject}` })),
};
