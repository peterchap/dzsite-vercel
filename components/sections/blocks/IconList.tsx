import React from "react";
import { Container } from "@/components/ui/Container";
import { urlFor } from "@/sanity/lib/image";

type Item = { text?: string; iconEmoji?: string; iconImage?: any };

interface IconListProps {
  isDark?: boolean;
  title?: string;
  description?: string;
  items?: Item[];
}

export default function IconList({ isDark, title, description, items }: IconListProps) {
  return (
    <section className={`py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {title ? (
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h2>
          ) : null}
          {description ? (
            <p className="mt-5 whitespace-pre-line text-lg text-slate-600">{description}</p>
          ) : null}
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <ul className="space-y-4">
            {items?.map((item, i) => {
              const hasImage = !!item.iconImage;
              const imgUrl = hasImage ? urlFor(item.iconImage).width(40).height(40).fit("crop").url() : undefined;

              return (
                <li key={i} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                    {hasImage && imgUrl ? (
                      <img src={imgUrl} alt="" className="h-6 w-6" />
                    ) : (
                      <span className="text-xl">{item.iconEmoji ?? "•"}</span>
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}