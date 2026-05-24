import {
  LayoutDashboard, GraduationCap, TrendingUp, Megaphone, FileDown, User,
  Users, PenLine, BookOpen, BarChart3, Eye, FileText, AlertTriangle,
  UserCog, Archive, Activity, Settings, Shield, UserPlus, type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard, GraduationCap, TrendingUp, Megaphone, FileDown, User,
  Users, PenLine, BookOpen, BarChart3, Eye, FileText, AlertTriangle,
  UserCog, Archive, Activity, Settings, Shield, UserPlus,
};

export function getNavIcon(name: string): LucideIcon {
  return iconMap[name] || LayoutDashboard;
}
