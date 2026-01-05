import React from "react";
import { normalizeHref } from "@/lib/links";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function ButtonLink({ href, children, variant = "primary", className = "", onClick }: Props) {
  const safeHref = normalizeHref(href);
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ring-offset-white " +
    "active:translate-y-[1px]";

  const styles =
    variant === "primary"
      ? // Primary: confident, brand-forward
      "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white shadow-sm " +
      "hover:brightness-95 hover:shadow-md"

      : variant === "secondary"
        ? // Secondary: enterprise-safe
        "border border-slate-200 bg-white text-slate-900 shadow-sm " +
        "hover:bg-slate-50 hover:shadow-md"

        : // Ghost: subtle action
        "text-slate-700 hover:bg-slate-100";

  if (!safeHref) return null;

  return (
    <a href={safeHref} className={`${base} ${styles} ${className}`} onClick={onClick}>
      {children}
    </a>
  );
}

