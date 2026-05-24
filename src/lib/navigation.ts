import type { NavItem, UserRole } from "@/types";

export const roleNav: Record<UserRole, NavItem[]> = {
  student: [
    { label: "Dashboard", href: "/student/dashboard", icon: "LayoutDashboard", mobileLabel: "Home" },
    { label: "View Grades", href: "/student/grades", icon: "GraduationCap", mobileLabel: "Grades" },
    { label: "Performance", href: "/student/performance", icon: "TrendingUp", mobileLabel: "Stats" },
    { label: "Announcements", href: "/student/announcements", icon: "Megaphone", mobileLabel: "News" },
    { label: "Report Card", href: "/student/report-card", icon: "FileDown", mobileLabel: "Card" },
    { label: "Profile Settings", href: "/student/profile", icon: "User", mobileLabel: "Profile" },
  ],
  teacher: [
    { label: "Dashboard", href: "/teacher/dashboard", icon: "LayoutDashboard", mobileLabel: "Home" },
    { label: "Assigned Classes", href: "/teacher/classes", icon: "Users", mobileLabel: "Classes" },
    { label: "Grade Entry", href: "/teacher/grade-entry", icon: "PenLine", mobileLabel: "Grades" },
    { label: "Class Record", href: "/teacher/class-record", icon: "BookOpen", mobileLabel: "Record" },
    { label: "Class Overview", href: "/teacher/analytics", icon: "BarChart3", mobileLabel: "Overview" },
    { label: "Student Monitoring", href: "/teacher/monitoring", icon: "Eye", mobileLabel: "Monitor" },
    { label: "Announcements", href: "/teacher/announcements", icon: "Megaphone", mobileLabel: "News" },
  ],
  admin: [
    { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard", mobileLabel: "Home" },
    { label: "School Overview", href: "/admin/analytics", icon: "BarChart3", mobileLabel: "Overview" },
    { label: "School's At-Risk", href: "/admin/at-risk", icon: "AlertTriangle", mobileLabel: "At-Risk" },
    { label: "Teacher Deployment", href: "/admin/teacher-deployment", icon: "UserPlus", mobileLabel: "Deploy" },
    { label: "Manage Accounts", href: "/admin/accounts", icon: "UserCog", mobileLabel: "Accounts" },
    { label: "Student Archive", href: "/admin/archive", icon: "Archive", mobileLabel: "Archive" },
    { label: "Announcements", href: "/admin/announcements", icon: "Megaphone", mobileLabel: "News" },
    { label: "Activity Logs", href: "/admin/activity-logs", icon: "Activity", mobileLabel: "Logs" },
    { label: "System Settings", href: "/admin/settings", icon: "Settings", mobileLabel: "Settings" },
    { label: "Role Management", href: "/admin/roles", icon: "Shield", mobileLabel: "Roles" },
  ],
};

export const roleLabels: Record<UserRole, string> = {
  student: "Student Portal",
  teacher: "Teacher Portal",
  admin: "Admin Portal",
};

export function getProfileHref(role: UserRole): string {
  switch (role) {
    case "student":
      return "/student/profile";
    case "teacher":
      return "/teacher/dashboard";
    case "admin":
      return "/admin/settings";
  }
}

export const demoUsers = [
  { role: "student" as UserRole, email: "student@mnchs.edu.ph", password: "demo123", name: "Juan Miguel Santos", redirect: "/student/dashboard" },
  { role: "teacher" as UserRole, email: "teacher@mnchs.edu.ph", password: "demo123", name: "Maria Elena Cruz", redirect: "/teacher/dashboard" },
  { role: "admin" as UserRole, email: "admin@mnchs.edu.ph", password: "demo123", name: "Ana Patricia Reyes", redirect: "/admin/dashboard" },
];
