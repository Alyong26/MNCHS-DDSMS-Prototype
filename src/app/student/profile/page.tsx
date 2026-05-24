"use client";

import Image from "next/image";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currentStudent } from "@/lib/data/mock-data";
import { Save } from "lucide-react";
import { useState } from "react";

export default function StudentProfilePage() {
  const [form, setForm] = useState({
    name: currentStudent.name,
    email: "student@mnchs.edu.ph",
    phone: "09171234567",
    address: "Poblacion, City of Mati, Davao Oriental",
    emergencyContact: "Maria Santos (Mother) - 09189876543",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile settings saved (demo).");
  };

  return (
    <DashboardLayout role="student" userName="Juan Miguel Santos" pageTitle="Profile Settings">
      <PageHeader title="Profile Settings" description="Update your contact information and account preferences." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding="lg" className="text-center">
          <Image
            src={currentStudent.avatar}
            alt=""
            width={120}
            height={120}
            className="rounded-full mx-auto border-4 border-primary/20"
          />
          <h3 className="font-semibold text-primary mt-4">{currentStudent.name}</h3>
          <p className="text-sm text-neutral-500">{currentStudent.section}</p>
          <p className="text-xs text-neutral-400 mt-1">LRN: {currentStudent.lrn}</p>
          <button type="button" className="text-sm text-primary font-medium mt-4 hover:underline">
            Change photo
          </button>
        </Card>

        <Card className="lg:col-span-2" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Mobile Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Strand</label>
                <input
                  type="text"
                  value={currentStudent.strand}
                  disabled
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Home Address</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Emergency Contact</label>
              <input
                type="text"
                value={form.emergencyContact}
                onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              />
            </div>
            <Button type="submit" icon={Save}>Save Changes</Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
