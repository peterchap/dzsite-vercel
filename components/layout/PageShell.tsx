export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-slate-950">
      <div className="relative">{children}</div>
    </div>
  );
}
