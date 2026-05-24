"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { ReportCardPreview } from "@/components/report-card/report-card-preview";
import { currentStudent } from "@/lib/data/mock-data";
import { Download } from "lucide-react";

export default function StudentReportCardPage() {
  const handleDownload = () => {
    alert("Report card PDF download would be generated for " + currentStudent.name);
  };

  return (
    <DashboardLayout role="student" userName="Juan Miguel Santos" pageTitle="Report Card">
      <PageHeader
        title="Download Report Card"
        description={`School Year ${currentStudent.schoolYear} · ${currentStudent.section}`}
        action={
          <Button icon={Download} onClick={handleDownload} className="hidden sm:inline-flex w-full sm:w-auto">
            Download PDF
          </Button>
        }
      />

      <div className="max-w-4xl mx-auto overflow-x-hidden">
        <ReportCardPreview />
        <div className="mt-4 sm:hidden">
          <Button className="w-full" icon={Download} onClick={handleDownload}>
            Download PDF
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
