"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { APP_SHORT } from "@/lib/constants";
import { AuthBackButton } from "@/components/ui/auth-back-button";
import { AuthSplitLayout } from "@/components/layout/auth-split-layout";
import { SchoolLogo } from "@/components/ui/school-logo";
import { AuthLoadingOverlay } from "@/components/ui/auth-loading-overlay";

const AUTH_DELAY_MS = 1000;

export default function TeacherSignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!employeeId.trim()) {
      setError("Employee ID is required.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      router.push("/teacher/dashboard");
    }, AUTH_DELAY_MS);
  };

  return (
    <>
      {loading && <AuthLoadingOverlay message="Creating your account…" />}
      <AuthSplitLayout
      brandTitle="Teacher Registration"
      brandDescription={`Staff-only registration for ${APP_SHORT}. Use your school-issued employee ID.`}
    >
      <AuthBackButton />
          <div className="lg:hidden flex justify-center mb-6">
            <SchoolLogo size={64} className="rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-1">Register as a Teacher</h2>
          <p className="text-neutral-500 text-sm mb-6">Create your teacher portal account</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Maria Elena Cruz"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@mnchs.edu.ph"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Employee ID</label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="EMP-2026-001"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                required
                minLength={8}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                required
                disabled={loading}
              />
            </div>
            {error && <p className="text-danger text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
            <Button type="submit" className="w-full" icon={UserPlus} disabled={loading}>
              Create Teacher Account
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
    </AuthSplitLayout>
    </>
  );
}
