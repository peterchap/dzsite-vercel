export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-white" />
      <div className="pointer-events-none absolute -left-48 -top-40 h-[520px] w-[520px] rounded-full bg-blue-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-56 -bottom-48 h-[520px] w-[520px] rounded-full bg-cyan-200/20 blur-3xl" />
      <div className="relative">{children}</div>
    </div>
  );
}
