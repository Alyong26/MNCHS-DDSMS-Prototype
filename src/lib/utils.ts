import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Eased scroll to a page section — smoother than native anchor jumps */
export function smoothScrollToElement(
  elementId: string,
  options?: { offset?: number; duration?: number },
) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(elementId);
  if (!element) return;

  const offset = options?.offset ?? 80;
  const duration = options?.duration ?? 900;
  const start = window.scrollY;
  const target = element.getBoundingClientRect().top + window.scrollY - offset;
  const distance = target - start;

  if (Math.abs(distance) < 2) return;

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

  const step = (currentTime: number, startTime: number) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame((time) => step(time, startTime));
  };

  requestAnimationFrame((time) => step(time, time));
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function getGradeColor(grade: number) {
  if (grade >= 90) return "text-success bg-green-50";
  if (grade >= 85) return "text-info bg-blue-50";
  if (grade >= 75) return "text-warning bg-amber-50";
  return "text-danger bg-red-50";
}

export function getRiskColor(level: "low" | "medium" | "high") {
  switch (level) {
    case "low":
      return "text-success bg-green-50 border-green-200";
    case "medium":
      return "text-warning bg-amber-50 border-amber-200";
    case "high":
      return "text-danger bg-red-50 border-red-200";
  }
}
