/**
 * Captures prototype screenshots into SCREENSHOT FOLDER/
 * Run: node scripts/capture-screenshots.mjs
 * Requires: dev server at http://localhost:3000
 */
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const BASE_URL = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3000";
const ROOT = join(PROJECT_ROOT, "SCREENSHOT FOLDER");

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, label: "Desktop View" },
  mobile: { width: 390, height: 844, label: "Mobile View", isMobile: true },
};

const SECTIONS = [
  "Landing Page",
  "Sign in",
  "Signup",
  "Student",
  "Teacher",
  "Administrator",
];

for (const section of SECTIONS) {
  for (const vp of Object.values(VIEWPORTS)) {
    mkdirSync(join(ROOT, section, vp.label), { recursive: true });
  }
}

function outPath(section, viewportLabel, filename) {
  return join(ROOT, section, viewportLabel, filename);
}

async function waitForPage(page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(600);
}

async function scrollToId(page, id) {
  await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo(0, top);
    }
  }, id);
  await page.waitForTimeout(400);
}

async function shot(page, filePath, { fullPage = true, viewportOnly = false } = {}) {
  mkdirSync(dirname(filePath), { recursive: true });
  if (viewportOnly) {
    await page.screenshot({ path: filePath, fullPage: false, type: "png" });
  } else {
    await page.screenshot({ path: filePath, fullPage, type: "png" });
  }
  console.log(`  ✓ ${filePath.replace(PROJECT_ROOT + "\\", "").replace(PROJECT_ROOT + "/", "")}`);
}

async function captureLanding(page, viewportLabel) {
  const section = "Landing Page";
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await waitForPage(page);
  await shot(page, outPath(section, viewportLabel, "01-hero-section.png"), { viewportOnly: true });
  await shot(page, outPath(section, viewportLabel, "02-full-landing-page.png"), { fullPage: true });

  await scrollToId(page, "about");
  await shot(page, outPath(section, viewportLabel, "03-about-section.png"), { viewportOnly: true });

  await scrollToId(page, "features");
  await shot(page, outPath(section, viewportLabel, "04-features-section.png"), { viewportOnly: true });

  await scrollToId(page, "contact");
  await shot(page, outPath(section, viewportLabel, "05-contact-section.png"), { viewportOnly: true });
}

async function captureSignIn(page, viewportLabel) {
  const section = "Sign in";
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  await waitForPage(page);
  await shot(page, outPath(section, viewportLabel, "01-login-page.png"), { viewportOnly: true });
}

async function captureSignup(page, viewportLabel) {
  const section = "Signup";
  await page.goto(`${BASE_URL}/signup`, { waitUntil: "networkidle" });
  await waitForPage(page);
  await shot(page, outPath(section, viewportLabel, "01-student-signup.png"), { fullPage: true });

  await page.goto(`${BASE_URL}/signup/teacher`, { waitUntil: "networkidle" });
  await waitForPage(page);
  await shot(page, outPath(section, viewportLabel, "02-teacher-signup.png"), { viewportOnly: true });
}

async function captureRolePages(page, section, routes, viewportLabel, isMobile) {
  for (const { file, path, interactions } of routes) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle" });
    await waitForPage(page);
    await shot(page, outPath(section, viewportLabel, file), { fullPage: true });

    if (interactions) {
      for (const interaction of interactions) {
        await interaction(page, section, viewportLabel);
      }
    }

    if (isMobile && path.includes("dashboard")) {
      const menuBtn = page.getByRole("button", { name: "Open menu" });
      if ((await menuBtn.count()) > 0) {
        await menuBtn.click();
        await page.waitForTimeout(500);
        await shot(
          page,
          outPath(section, viewportLabel, file.replace(".png", "-mobile-menu-open.png")),
          { viewportOnly: true },
        );
      }
    }
  }
}

const studentRoutes = [
  { file: "01-dashboard.png", path: "/student/dashboard" },
  { file: "02-view-grades.png", path: "/student/grades" },
  { file: "03-performance.png", path: "/student/performance" },
  { file: "04-announcements.png", path: "/student/announcements" },
  { file: "05-report-card.png", path: "/student/report-card" },
  { file: "06-profile-settings.png", path: "/student/profile" },
];

const teacherRoutes = [
  { file: "01-dashboard.png", path: "/teacher/dashboard" },
  { file: "02-assigned-classes.png", path: "/teacher/classes" },
  {
    file: "03-grade-entry-quarter.png",
    path: "/teacher/grade-entry",
    interactions: [
      async (p, section, vp) => {
        await p.getByRole("button", { name: "Summary Final Grades" }).click();
        await p.waitForTimeout(300);
        await shot(p, outPath(section, vp, "04-grade-entry-summary.png"), { fullPage: true });
      },
    ],
  },
  { file: "05-class-record.png", path: "/teacher/class-record" },
  { file: "06-class-overview.png", path: "/teacher/analytics" },
  { file: "07-student-monitoring.png", path: "/teacher/monitoring" },
  { file: "08-announcements.png", path: "/teacher/announcements" },
];

const adminRoutes = [
  { file: "01-dashboard.png", path: "/admin/dashboard" },
  { file: "02-school-overview.png", path: "/admin/analytics" },
  {
    file: "03-at-risk-by-department.png",
    path: "/admin/at-risk",
    interactions: [
      async (p, section, vp) => {
        await p.getByRole("button", { name: "By Grade Level" }).click();
        await p.waitForTimeout(300);
        await shot(p, outPath(section, vp, "04-at-risk-by-grade-level.png"), { fullPage: true });
        await p.getByRole("button", { name: "By Section" }).click();
        await p.waitForTimeout(300);
        await shot(p, outPath(section, vp, "05-at-risk-by-section.png"), { fullPage: true });
      },
    ],
  },
  { file: "06-teacher-deployment.png", path: "/admin/teacher-deployment" },
  { file: "07-manage-accounts.png", path: "/admin/accounts" },
  { file: "08-student-archive.png", path: "/admin/archive" },
  { file: "09-announcements.png", path: "/admin/announcements" },
  { file: "10-activity-logs.png", path: "/admin/activity-logs" },
  { file: "11-system-settings.png", path: "/admin/settings" },
  { file: "12-role-management.png", path: "/admin/roles" },
];

async function runViewport(browser, key, config) {
  console.log(`\n📸 ${config.label} (${config.width}×${config.height})`);
  const context = await browser.newContext({
    viewport: { width: config.width, height: config.height },
    isMobile: config.isMobile ?? false,
    deviceScaleFactor: config.isMobile ? 2 : 1,
  });
  const page = await context.newPage();

  await captureLanding(page, config.label);
  await captureSignIn(page, config.label);
  await captureSignup(page, config.label);
  await captureRolePages(page, "Student", studentRoutes, config.label, config.isMobile);
  await captureRolePages(page, "Teacher", teacherRoutes, config.label, config.isMobile);
  await captureRolePages(page, "Administrator", adminRoutes, config.label, config.isMobile);

  await context.close();
}

async function main() {
  console.log(`Capturing screenshots from ${BASE_URL}`);
  console.log(`Output: ${ROOT}`);

  const browser = await chromium.launch({ headless: true });

  try {
    for (const [key, config] of Object.entries(VIEWPORTS)) {
      await runViewport(browser, key, config);
    }
    console.log("\n✅ All screenshots captured successfully.");
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
