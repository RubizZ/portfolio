import { redirect } from "next/navigation";

// The middleware handles all locale detection and redirects.
// This page is a safety net for direct navigation to "/".
export default function RootPage() {
  redirect("/es");
}
