"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { TableScroll } from "@/components/ui/table-scroll";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { teacherDeployments } from "@/lib/data/mock-data";
import { UserPlus, Pencil, Trash2 } from "lucide-react";

const teacherOptions = [
  "Maria Elena Cruz",
  "Roberto Mendoza",
  "Patricia Reyes",
  "Carlos Tan",
  "Ana Patricia Reyes",
];

const roleOptions = [
  "Subject Teacher",
  "Class Adviser",
  "Head of Department",
  "School Principal",
];

const sectionOptions = [
  "Grade 11 - STEM A",
  "Grade 11 - STEM B",
  "Grade 11 - HUMSS A",
  "Grade 12 - STEM A",
  "Grade 10 - Einstein",
];

const subjectOptions = [
  "General Mathematics",
  "General Physics 1",
  "English",
  "PE & Health",
  "Practical Research 2",
  "Statistics and Probability",
];

export default function AdminTeacherDeploymentPage() {
  const [teacher, setTeacher] = useState(teacherOptions[0]);
  const [subject, setSubject] = useState(subjectOptions[0]);
  const [section, setSection] = useState(sectionOptions[0]);
  const [role, setRole] = useState(roleOptions[0]);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Assigned ${teacher} as ${role} for ${subject} — ${section} (demo)`);
  };

  const handleEdit = (name: string) => alert(`Edit deployment for ${name} (demo)`);
  const handleRemove = (name: string) => alert(`Remove deployment for ${name} (demo)`);

  return (
    <DashboardLayout role="admin" userName="Ana Patricia Reyes" pageTitle="Teacher Deployment">
      <PageHeader
        title="Teacher Deployment"
        description="Assign teachers to subjects, sections, and leadership roles."
      />

      <Card padding="lg" className="mb-6">
        <h3 className="font-semibold text-primary mb-4">Assign Teacher</h3>
        <form onSubmit={handleAssign} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Teacher</label>
            <select
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            >
              {teacherOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            >
              {subjectOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Section / Class</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            >
              {sectionOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            >
              {roleOptions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button type="submit" className="w-full" icon={UserPlus}>Assign</Button>
          </div>
        </form>
      </Card>

      <Card padding="lg" className="overflow-hidden">
        <h3 className="font-semibold text-primary mb-4">Current Deployments</h3>
        <TableScroll>
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="pb-3 text-left text-primary">Teacher</th>
              <th className="pb-3 text-left text-primary">Subject</th>
              <th className="pb-3 text-left text-primary">Section</th>
              <th className="pb-3 text-left text-primary">Role</th>
              <th className="pb-3 text-left text-primary hidden md:table-cell">Department</th>
              <th className="pb-3 text-right text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teacherDeployments.map((d) => (
              <tr key={d.id} className="border-b border-neutral-100 hover:bg-primary/5">
                <td className="py-3 font-medium text-primary max-w-[120px] truncate">{d.teacher}</td>
                <td className="py-3 text-neutral-600 max-w-[120px] truncate">{d.subject}</td>
                <td className="py-3 text-neutral-600">{d.section}</td>
                <td className="py-3"><Badge variant="info">{d.role}</Badge></td>
                <td className="py-3 text-neutral-500 hidden md:table-cell">{d.department}</td>
                <td className="py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" icon={Pencil} onClick={() => handleEdit(d.teacher)}>Edit</Button>
                    <Button variant="ghost" size="sm" icon={Trash2} onClick={() => handleRemove(d.teacher)}>Remove</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </TableScroll>
      </Card>
    </DashboardLayout>
  );
}
