import { redirect } from "next/navigation";

export default function PrincipalAnnouncementsRedirect() {
  redirect("/admin/announcements");
}
