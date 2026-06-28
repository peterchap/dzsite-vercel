import React from "react";

import { Container } from "@/components/ui/Container";
import type { Card, CopySection } from "./types";

export function StoryButton({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300/70 focus:ring-offset-2 focus:ring-offset-[#030619] ${
        secondary
          ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
          : "border-cyan-300/50 bg-cyan-300 text-slate-950 hover:bg-cyan-200"
      }`}
    >
      {children}
    </a>
  );
}

export function StorySection({ section, children, id }: { section: CopySection; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="relative border-t border-white/10 py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{section.kicker}</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">{section.title}</h2>
          <div className="mt-8">{children}</div>
        </div>
      </Container>
    </section>
  );
}

export function StoryParagraphs({ body }: { body?: string[] }) {
  return (
    <>
      {body?.map((paragraph) => (
        <p key={paragraph} className="mt-5 max-w-3xl text-lg leading-8 text-slate-300 first:mt-0">
          {paragraph}
        </p>
      ))}
    </>
  );
}

export function StoryCardGrid({ items, columns = "md:grid-cols-2 lg:grid-cols-3" }: { items: Card[]; columns?: string }) {
  return (
    <div className={`grid gap-4 ${columns}`}>
      {items.map((item) => (
        <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
