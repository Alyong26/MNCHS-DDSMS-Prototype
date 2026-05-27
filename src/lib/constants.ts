export const APP_NAME = "MNCHS-DDSMS Portal";
export const APP_SHORT = "MNCHS-DDSMS Portal";
/** Name shown when installing the PWA / home-screen shortcut */
export const PWA_INSTALL_NAME = "MNCHS-DDSMS PORTAL";
export const SCHOOL_NAME = "Mati National Comprehensive High School";
export const SCHOOL_ADDRESS = "X66C+7CR, Mangga St, City of Mati, Davao Oriental, Philippines";
export const SCHOOL_ID = "304325";
export const SUPPORT_EMAIL = "support@mnchs.edu.ph";
export const SUPPORT_PHONE = "(087) 388-3427";
export const SCHOOL_COORDINATES = { lat: 6.9615378, lng: 126.2216107 } as const;
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${SCHOOL_COORDINATES.lat},${SCHOOL_COORDINATES.lng}&z=17&output=embed`;

/** Secret path for teacher self-registration (not linked publicly) */
export const TEACHER_SIGNUP_PATH = "/signup/teacher";

export const DEVELOPERS = {
  frontend: "Camille B. Atibagos",
  backend: "Al James S. Lopez",
  uiux: "Jasper S. Sagon",
  specialContribution: {
    name: "Mrs. Jessica M. Lumapas",
    role: "School Principal (S.Y. 2026–2027)",
    note: "Provided school information, processes, and guidance during system planning.",
  },
};

export const DEMO_CREDENTIALS = [
  { role: "Student", email: "student@mnchs.edu.ph", password: "demo123" },
  { role: "Teacher", email: "teacher@mnchs.edu.ph", password: "demo123" },
  { role: "Admin", email: "admin@mnchs.edu.ph", password: "demo123" },
];

export const DATA_PRIVACY_NOTICE =
  "I agree to the Terms and Conditions and consent to the collection and processing of my personal data in accordance with the Data Privacy Act of 2012 (Republic Act No. 10173) of the Philippines.";
