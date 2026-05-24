import { redirect } from "next/navigation";

export default function PrincipalReportsRedirect() {
  redirect("/admin/reports");
}
