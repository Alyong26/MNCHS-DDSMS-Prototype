"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SchoolLogo } from "@/components/ui/school-logo";
import { Button } from "@/components/ui/button";
import { demoUsers } from "@/lib/navigation";
import { APP_NAME, APP_SHORT } from "@/lib/constants";
import { AuthBackButton } from "@/components/ui/auth-back-button";
import { AuthSplitLayout } from "@/components/layout/auth-split-layout";
import { AuthLoadingOverlay } from "@/components/ui/auth-loading-overlay";
import { Eye, EyeOff, LogIn } from "lucide-react";
import type { UserRole } from "@/types";

const QUICK_LOGIN = [
  { role: "student" as UserRole, label: "Sign in as Student" },
  { role: "teacher" as UserRole, label: "Sign in as Teacher" },
  { role: "admin" as UserRole, label: "Sign in as Admin" },
];

const AUTH_DELAY_MS = 1000;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Signing you in…");

  const completeLogin = (redirect: string, message = "Signing you in…") => {
    setLoadingMessage(message);
    setLoading(true);
    setTimeout(() => router.push(redirect), AUTH_DELAY_MS);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const user = demoUsers.find((u) => u.email === email && u.password === password);
    if (user) {
      completeLogin(user.redirect);
    } else {
      setError("Invalid credentials. Try one of the quick sign-in options below.");
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    setError("");
    const user = demoUsers.find((u) => u.role === role);
    if (user) completeLogin(user.redirect);
  };

  return (
    <>
      {loading && <AuthLoadingOverlay message={loadingMessage} />}

      <AuthSplitLayout
        brandTitle={APP_SHORT}
        brandDescription={`${APP_NAME} — sign in to view grades, manage classes, and stay connected with your school.`}
      >
        <AuthBackButton />
        <div className="lg:hidden flex justify-center mb-6">
          <SchoolLogo size={64} className="rounded-full" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-1">Welcome Back</h2>
        <p className="text-neutral-500 text-sm mb-6">Sign in to your {APP_SHORT} account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@mnchs.edu.ph"
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary mb-1.5">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm pr-10"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {error && <p className="text-danger text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
          <Button type="submit" className="w-full" icon={LogIn} disabled={loading}>
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-neutral-500 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary font-medium hover:underline">Register now</Link>
        </p>

        <div className="mt-8 pt-6 border-t border-neutral-200">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Demo Accounts</p>
          <div className="space-y-2">
          {QUICK_LOGIN.map(({ role, label }) => (
            <button
              key={role}
              type="button"
              onClick={() => handleQuickLogin(role)}
              disabled={loading}
              className="w-full text-left px-4 py-3 rounded-lg border border-neutral-200 hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
            >
              <span className="text-sm font-medium text-primary">{label}</span>
            </button>
          ))}
          </div>
        </div>
      </AuthSplitLayout>
    </>
  );
}
