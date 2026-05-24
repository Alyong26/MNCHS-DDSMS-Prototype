import { redirect } from "next/navigation";

export default function PrincipalAtRiskRedirect() {
  redirect("/admin/at-risk");
}
