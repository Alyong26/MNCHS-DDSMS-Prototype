"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { announcements } from "@/lib/data/mock-data";
import { formatDate } from "@/lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminAnnouncementsPage() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"academic" | "general" | "urgent">("general");
  const [audience, setAudience] = useState<"Whole School" | "Staff Only" | "Students Only">("Whole School");

  const audienceLabel = (a: string[]) => {
    if (a.includes("student") && a.includes("teacher") && a.includes("admin")) return "Whole School";
    if (a.includes("teacher") && a.includes("admin") && !a.includes("student")) return "Staff Only";
    if (a.includes("student") && !a.includes("teacher") && !a.includes("admin")) return "Students Only";
    if (a.includes("teacher") && !a.includes("student")) return "Staff Only";
    return "Whole School";
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Announcement created: ${title} (${audience}) (demo)`);
    setShowForm(false);
    setTitle("");
    setContent("");
  };

  return (
    <DashboardLayout role="admin" userName="Ana Patricia Reyes" pageTitle="Announcements">
      <PageHeader
        title="Manage Announcements"
        description="Create and manage school-wide announcements."
        action={<Button icon={Plus} size="sm" onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "New Announcement"}</Button>}
      />

      {showForm && (
        <Card padding="lg" className="mb-6">
          <h3 className="font-semibold text-primary mb-4">Create Announcement</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm outline-none"
              >
                <option value="general">General</option>
                <option value="academic">Academic</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Audience</label>
              <div className="flex flex-wrap gap-4">
                {(["Whole School", "Staff Only", "Students Only"] as const).map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
                    <input
                      type="radio"
                      name="audience"
                      value={opt}
                      checked={audience === opt}
                      onChange={() => setAudience(opt)}
                      className="h-4 w-4 text-primary focus:ring-primary/30"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 outline-none resize-none"
                required
              />
            </div>
            <Button type="submit">Publish</Button>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {announcements.map((a) => (
          <Card key={a.id} padding="lg">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-primary">{a.title}</h3>
                  <Badge variant={a.category === "urgent" ? "danger" : a.category === "academic" ? "info" : "default"}>{a.category}</Badge>
                  <Badge variant="accent">{audienceLabel(a.audience)}</Badge>
                </div>
                <p className="text-sm text-neutral-600">{a.content}</p>
                <p className="text-xs text-neutral-400 mt-2">{formatDate(a.date)} · {a.author}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" icon={Pencil} />
                <Button variant="ghost" size="sm" icon={Trash2} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
