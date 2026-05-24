"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SchoolLogo } from "@/components/ui/school-logo";
import { Button } from "@/components/ui/button";
import { demoUsers } from "@/lib/navigation";
import { DEMO_CREDENTIALS, APP_NAME, APP_SHORT } from "@/lib/constants";
import { AuthBackButton } from "@/components/ui/auth-back-button";
import { AuthSplitLayout } from "@/components/layout/auth-split-layout";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const user = demoUsers.find((u) => u.email === email && u.password === password);
      if (user) router.push(user.redirect);
      else {
        setError("Invalid credentials. Use a demo account below.");
        setLoading(false);
      }
    }, 800);
  };

  const fillDemo = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
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
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@mnchs.edu.ph" className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm" required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-primary mb-1.5">Password</label>
          <div className="relative">
            <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm pr-10" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {error && <p className="text-danger text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
        <Button type="submit" className="w-full" icon={LogIn} disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
      </form>

      <p className="text-center text-sm text-neutral-500 mt-4">
        Don&apos;t have an account? <Link href="/signup" className="text-primary font-medium hover:underline">Register now</Link>
      </p>

      <div className="mt-8 pt-6 border-t border-neutral-200">
        <p className="text-sm font-medium text-primary text-center mb-4">Demo Accounts</p>
            <div className="overflow-x-auto rounded-lg border border-neutral-200 mb-4 hidden sm:block">
              <table className="w-full text-xs sm:text-sm min-w-[360px]">
            <thead>
              <tr className="bg-primary/5 border-b border-neutral-200">
                <th className="px-3 py-2 text-left text-primary font-semibold">Role</th>
                <th className="px-3 py-2 text-left text-primary font-semibold">Email</th>
                <th className="px-3 py-2 text-left text-primary font-semibold">Password</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_CREDENTIALS.map((c) => (
                <tr key={c.role} className="border-b border-neutral-100 last:border-0">
                  <td className="px-3 py-2 font-medium text-primary">{c.role}</td>
                  <td className="px-3 py-2 text-neutral-600">{c.email}</td>
                  <td className="px-3 py-2 text-neutral-600">{c.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-2">
          {DEMO_CREDENTIALS.map((c) => (
            <button
              key={c.role}
              type="button"
              onClick={() => fillDemo(c.email, c.password)}
              className="text-left px-4 py-3 rounded-lg border border-neutral-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <span className="text-sm font-medium text-primary">Sign in as {c.role}</span>
              <span className="block text-xs text-neutral-500 mt-0.5">{c.email}</span>
            </button>
          ))}
        </div>
      </div>
    </AuthSplitLayout>
  );
}
