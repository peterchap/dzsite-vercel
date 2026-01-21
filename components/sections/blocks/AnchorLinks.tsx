"use client";
import React from "react";
import { PortableText } from "next-sanity";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function AnchorLinks({ title, subtitle, selectedAnchors = [], isDark, behavior = "jump" }: any) {
  if (!selectedAnchors?.length) return null;

  // Extract IDs for the script logic (keeping fallback for legacy string data just in case)
  const items = selectedAnchors.map((v: any) =>
    typeof v === "string" ? { anchor: v, label: v } : v
  );

  const ids = items.map((i: any) => i.anchor).filter(Boolean);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    if (behavior !== "switch" || ids.length === 0) return;

    const hash = window.location.hash.replace("#", "");
    const initialId = ids.includes(hash) ? hash : ids[0];
    setActiveId(initialId);

    ids.forEach((id: string) => {
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

    ids.forEach((aid: string) => {
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

  // Determine grid columns based on item count (max 5)
  const gridClasses: Record<number, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
  };
  const gridClass = gridClasses[items.length] || "md:grid-cols-4";

  return (
    <section className={`relative overflow-hidden py-12 ${isDark ? 'bg-slate-50' : 'bg-white'} border-y border-slate-100`}>
      <Container>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12">
          {title ? (
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
          ) : null}
          {subtitle ? (
            <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className={`grid gap-6 ${gridClass} items-stretch`}>
          {items.map((item: any, idx: number) => {
            const isActive = item.anchor === activeId;
            return (
              <div key={idx} className="flex flex-col text-center h-full">
                {/* Feature Title */}
                {item.featureTitle && (
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.featureTitle}</h3>
                )}

                {/* Feature Description */}
                {item.featureDescription && (
                  <div className="text-sm text-slate-600 mb-6 flex-1 px-4">
                    <PortableText value={item.featureDescription} />
                  </div>
                )}

                {/* Button - Aligned to bottom */}
                <div className="mt-auto pt-2">
                  <ButtonLink
                    href={`#${item.anchor}`}
                    variant={isActive ? "primary" : "secondary"}
                    onClick={onClick(item.anchor)}
                    className={`rounded-full px-8 py-2.5 text-sm font-semibold transition-all duration-300 shadow-sm w-full md:w-auto inline-block ${isActive
                      ? 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700'
                      : 'border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-600'
                      }`}
                  >
                    {item.label ?? item.anchor}
                  </ButtonLink>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
