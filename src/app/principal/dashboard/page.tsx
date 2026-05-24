import { redirect } from "next/navigation";

export default function PrincipalDashboardRedirect() {
  redirect("/admin/dashboard");
}
