"use client";
import React from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function AnchorLinks({ title, subtitle, selectedAnchors = [], isDark, behavior = "jump" }: any) {
  if (!selectedAnchors?.length) return null;
  const items: { anchor: string; label?: string }[] = selectedAnchors.map((v: any) =>
    typeof v === "string" ? { anchor: v, label: v } : v
  );

  const ids = items.map((i) => i.anchor).filter(Boolean);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    if (behavior !== "switch" || ids.length === 0) return;

    const hash = window.location.hash.replace("#", "");
    const initialId = ids.includes(hash) ? hash : ids[0];
    setActiveId(initialId);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        if (id === initialId) {
          el.classList.remove("hidden");
        } else {
          el.classList.add("hidden");
        }
      }
    });
  }, [behavior, ids]);

  const onClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (behavior !== "switch") return;
    e.preventDefault();
    setActiveId(id);

    ids.forEach((aid) => {
      const el = document.getElementById(aid);
      if (el) {
        if (aid !== id) {
          el.classList.add("hidden");
        } else {
          el.classList.remove("hidden");
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          try { window.history.replaceState(null, "", `#${id}`); } catch { }
        }
      }
    });
  };

  if (!isMounted) return null;

  return (
    <section className={`relative overflow-hidden py-12 ${isDark ? 'bg-slate-50' : 'bg-white'} border-y border-slate-100`}>
      <Container>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {title ? (
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
          ) : null}
          {subtitle ? (
            <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base">
              {subtitle}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {items.map((item) => {
              const isActive = item.anchor === activeId;
              return (
                <ButtonLink
                  key={item.anchor}
                  href={`#${item.anchor}`}
                  variant={isActive ? "primary" : "outline"}
                  onClick={onClick(item.anchor)}
                  className={`rounded-full px-8 py-2.5 text-sm font-semibold transition-all duration-300 shadow-sm ${isActive
                      ? 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700'
                      : 'border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-600'
                    }`}
                >
                  {item.label ?? item.anchor}
                </ButtonLink>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
