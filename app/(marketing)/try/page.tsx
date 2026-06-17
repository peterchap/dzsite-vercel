import type { Metadata } from "next";
import TryDemo from "@/components/tools/TryDemo";

export const metadata: Metadata = {
  title: "Try Datazag — see what we know about any domain",
  description:
    "Enter any domain to see 50+ infrastructure attributes from the Datazag Graph — DNS, certificates, hosting, routing posture, email authentication and platform classification.",
};

export default function TryPage() {
  return <TryDemo />;
}
