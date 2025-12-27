import { redirect } from "next/navigation";

export default function HomeAlias() {
  // Redirect legacy /home path to the real homepage
  redirect("/");
}