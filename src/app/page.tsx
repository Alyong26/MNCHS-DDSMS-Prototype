"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SchoolLogo } from "@/components/ui/school-logo";
import {
  APP_NAME,
  APP_SHORT,
  SCHOOL_NAME,
  SCHOOL_ADDRESS,
  SCHOOL_ID,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  MAP_EMBED_URL,
  DEVELOPERS,
} from "@/lib/constants";
import {
  GraduationCap,
  Shield,
  BookOpen,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { smoothScrollToElement } from "@/lib/utils";

const landingSections = ["about", "features", "contact"] as const;
type LandingSection = (typeof landingSections)[number];

const roleFeatures = [
  {
    role: "Administration",
    icon: Shield,
    description: "Manage school accounts, view school-wide performance, monitor at-risk students, and assign teacher deployments.",
    items: ["School Overview", "School's At-Risk", "Teacher Deployment", "Account Management", "Announcements"],
  },
  {
    role: "Teachers",
    icon: BookOpen,
    description: "Enter grades, maintain class records, track student progress, and stay updated with school announcements.",
    items: ["Grade Entry", "Class Records", "Class Overview", "Student Monitoring"],
  },
  {
    role: "Students",
    icon: GraduationCap,
    description: "View your grades, track your progress, download your report card, and read school announcements.",
    items: ["View Grades", "Performance Summary", "Report Card Download", "Announcements"],
  },
];

export default function LandingPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const scrollToSection = (sectionId: LandingSection) => {
    smoothScrollToElement(sectionId);
    window.history.replaceState(null, "", `#${sectionId}`);
    setMobileNavOpen(false);
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1) as LandingSection;
    if (!landingSections.includes(hash)) return;

    requestAnimationFrame(() => smoothScrollToElement(hash, { duration: 1000 }));
  }, []);

  return (
    <div className="min-h-screen pb-4">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/landing-bg.png"
          alt="MNCHS Campus"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-primary-dark/85" />

        <div className="absolute top-0 left-0 right-0 z-30 flex flex-col">
        <nav className="relative z-20 px-4 sm:px-8 py-4">
          <div className="relative flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <SchoolLogo size={56} priority />
            <div className="hidden sm:block">
              <p className="text-accent font-bold text-sm leading-tight">{APP_SHORT}</p>
              <p className="text-accent/70 text-xs">School Management System Portal</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-accent/90">
            {landingSections.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => scrollToSection(section)}
                className="capitalize hover:text-accent transition-colors duration-200"
              >
                {section}
              </button>
            ))}
            <Link href="/login" className="hover:text-accent transition-colors duration-200">Student Portal</Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 rounded-lg text-accent hover:bg-white/10"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/login">
              <Button variant="secondary" size="sm">Log In</Button>
            </Link>
          </div>

        {mobileNavOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 z-30 bg-primary/95 backdrop-blur-md border-t border-accent/20 px-4 py-4 space-y-2">
            {landingSections.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => scrollToSection(section)}
                className="block w-full text-left capitalize px-3 py-2.5 rounded-lg text-accent hover:bg-white/10"
              >
                {section}
              </button>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileNavOpen(false)}
              className="block w-full px-3 py-2.5 rounded-lg text-accent hover:bg-white/10"
            >
              Student Portal
            </Link>
          </div>
        )}
          </div>
        </nav>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-accent leading-tight mb-4">
            Empowering Education Through Digital Transformation
          </h1>
          <p className="text-accent/80 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Welcome to the {APP_NAME} — your one-stop School Management System Portal for grades,
            class records, report cards, and school updates at {SCHOOL_NAME}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/login">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <ArrowRight className="h-4 w-4" />
                Access Portal
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-accent/60 text-accent hover:bg-accent hover:text-primary"
              onClick={() => scrollToSection("about")}
            >
              Learn More
            </Button>
          </div>
          <p className="text-accent/50 text-xs mt-6">School ID: {SCHOOL_ID} · City of Mati, Davao Oriental</p>
        </div>
      </section>

      <section id="about" className="py-16 sm:py-24 px-4 bg-background scroll-mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">About the System</h2>
          <p className="text-neutral-600 leading-relaxed mb-6">
            The {APP_SHORT} is a digital platform built for {SCHOOL_NAME}. It helps students,
            teachers, and school administrators manage everyday school tasks — from viewing grades
            and entering class records to downloading report cards and sharing announcements.
          </p>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Designed with teachers and students in mind, the portal makes it easy to stay on top of
            academic progress and school communication, all in one place.
          </p>
        </div>
      </section>

      <section id="features" className="py-16 sm:py-24 px-4 bg-neutral-50 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">Key Features by Role</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              Everything you need to manage school life — tailored for administrators, teachers, and students.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {roleFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.role} className="bg-card rounded-xl border border-neutral-200/80 p-6 text-center">
                  <div className="flex flex-col items-center mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 w-fit mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-primary">{f.role}</h3>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">{f.description}</p>
                  <ul className="space-y-1.5 flex flex-col items-center">
                    {f.items.map((item) => (
                      <li key={item} className="text-xs text-neutral-600 flex items-center gap-2 text-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 sm:py-24 px-4 bg-background scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">Contact &amp; Support</h2>
            <p className="text-neutral-500">Have questions about the portal? Reach out to us.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="w-full min-w-0">
                  <p className="font-medium text-primary">Address</p>
                  <div className="mt-4 rounded-xl border border-neutral-200 overflow-hidden">
                    <iframe
                      src={MAP_EMBED_URL}
                      title="MNCHS Location Map"
                      className="w-full h-[280px] border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">{SCHOOL_ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary">Email</p>
                  <p className="text-sm text-neutral-500 mt-1">{SUPPORT_EMAIL}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary">Phone</p>
                  <p className="text-sm text-neutral-500 mt-1">{SUPPORT_PHONE}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 bg-card rounded-xl border border-neutral-200 p-6">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Your Name</label>
                <input type="text" placeholder="Juan Miguel Santos" className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Email Address</label>
                <input type="email" placeholder="you@email.com" className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Message</label>
                <textarea rows={4} placeholder="How can we help you?" className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              </div>
              <Button type="button" className="w-full">Send Message</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 px-4 bg-neutral-900 text-neutral-400 text-sm">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <p className="font-medium text-neutral-300">{SCHOOL_NAME}</p>
          <p>&copy; 2026 {SCHOOL_NAME} · {APP_SHORT}</p>
          <div className="pt-4 border-t border-neutral-700 text-xs text-neutral-500 space-y-1">
            <p>Frontend: {DEVELOPERS.frontend}</p>
            <p>Backend: {DEVELOPERS.backend}</p>
            <p>UI/UX Tester: {DEVELOPERS.uiux}</p>
            <p>Special Contribution: {DEVELOPERS.specialContribution.name}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
