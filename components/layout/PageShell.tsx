export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    // `dark` switches the shadcn design tokens to their dark values (see the
    // `.dark` block in app/globals.css) and `text-foreground` makes anything
    // inside that omits an explicit text colour default to near-white instead
    // of the light theme's near-black.
    <div className="dark relative overflow-hidden bg-slate-950 text-foreground">
      <div className="relative">{children}</div>
    </div>
  );
}
