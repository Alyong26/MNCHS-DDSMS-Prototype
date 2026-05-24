"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthBackButton } from "@/components/ui/auth-back-button";
import { AuthSplitLayout } from "@/components/layout/auth-split-layout";
import { SchoolLogo } from "@/components/ui/school-logo";
import { UserPlus } from "lucide-react";
import { APP_NAME, APP_SHORT, DATA_PRIVACY_NOTICE } from "@/lib/constants";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [lrn, setLrn] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!privacyAccepted) {
      setError("You must accept the Data Privacy notice to continue.");
      return;
    }
    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!address.trim()) {
      setError("Address is required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (lrn.length !== 12) {
      setError("LRN must be exactly 12 digits.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      router.push("/student/dashboard");
    }, 800);
  };

  return (
    <AuthSplitLayout
      brandTitle={`Join ${APP_SHORT}`}
      brandDescription="Create your student account to view grades, download your report card, and stay updated with school news."
    >
      <AuthBackButton />
          <div className="lg:hidden flex justify-center mb-6">
            <SchoolLogo size={64} className="rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-1">Signup</h2>
          <p className="text-neutral-500 text-sm mb-6">Create your {APP_NAME} student account</p>

          <div className="mb-6 p-4 rounded-lg bg-accent/40 border border-primary/10 text-sm text-primary">
            <p className="font-medium mb-1">Student registration only</p>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Teacher accounts are created by the school IT office. If you are a teacher, contact your administrator for access.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Miguel Santos"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@mnchs.edu.ph"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09XX XXX XXXX"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House No., Street, Barangay, City"
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Learner Reference Number (LRN)</label>
              <input
                type="text"
                value={lrn}
                onChange={(e) => setLrn(e.target.value.replace(/\D/g, "").slice(0, 12))}
                placeholder="123456789012"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                required
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
              />
            </div>
            <div className="flex items-start gap-2">
              <input
                id="privacy"
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary/30"
                required
              />
              <label htmlFor="privacy" className="text-xs text-neutral-600 leading-relaxed">
                {DATA_PRIVACY_NOTICE}
              </label>
            </div>
            {error && <p className="text-danger text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
            <Button type="submit" className="w-full" icon={UserPlus} disabled={loading || !privacyAccepted}>
              {loading ? "Signing up..." : "Signup"}
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
    </AuthSplitLayout>
  );
}
