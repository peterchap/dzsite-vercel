import React from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { PortableText } from "next-sanity";

interface GridItem {
  eyebrow?: {
    text: string;
    color?: string;
    icon?: string;
  };
  headline: string;
  subtitle?: string;
  lists?: Array<{
    title: string;
    items: string[];
  }>;
  footer?: {
    leftColumn?: string;
    rightColumn?: string;
  };
}

interface GridContentProps {
  title?: any[];
  subtitle?: any[];
  columns?: number;
  items?: GridItem[];
  isDark?: boolean;
  anchor?: string;
}

const getColorClass = (color?: string) => {
  switch (color) {
    case 'primary': return 'text-blue-600';
    case 'secondary': return 'text-slate-600';
    case 'accent': return 'text-purple-600';
    case 'success': return 'text-green-600';
    case 'warning': return 'text-yellow-600';
    case 'error': return 'text-red-600';
    case 'gray': return 'text-gray-600';
    case 'black': return 'text-black';
    default: return 'text-blue-600';
  }
};

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="text-slate-700">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-2xl font-bold text-slate-900">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-xl font-bold text-slate-900">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-lg font-bold text-slate-900">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-600">{children}</blockquote>,
  },
};

export function GridContent({ title, subtitle, columns = 3, items = [], isDark, anchor }: GridContentProps) {
  const gridCols = columns === 4
    ? "lg:grid-cols-4"
    : columns === 2
      ? "lg:grid-cols-2"
      : "lg:grid-cols-3";

  return (
    <section className={cn("py-16", isDark ? 'bg-slate-50' : 'bg-white')} id={anchor}>
      <Container>
        {/* Title and Subtitle */}
        {(title || subtitle) && (
          <div className="max-w-4xl mx-auto text-center mb-16">
            {title && (
              <div className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-6">
                <PortableText value={title} components={portableTextComponents} />
              </div>
            )}
            {subtitle && (
              <div className="text-lg text-slate-600 max-w-3xl mx-auto">
                <PortableText value={subtitle} components={portableTextComponents} />
              </div>
            )}
          </div>
        )}

        {/* Grid Items */}
        <div className={cn("grid gap-8", gridCols)}>
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
              {/* Eyebrow */}
              {item.eyebrow && (
                <div className="flex items-center gap-2 mb-4">
                  {item.eyebrow.icon && (
                    <span className="text-lg">{item.eyebrow.icon}</span>
                  )}
                  <span className={cn("text-sm font-semibold uppercase tracking-wide", getColorClass(item.eyebrow.color))}>
                    {item.eyebrow.text}
                  </span>
                </div>
              )}

              {/* Headline */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {item.headline}
              </h3>

              {/* Subtitle */}
              {item.subtitle && (
                <p className="text-slate-600 mb-6">
                  {item.subtitle}
                </p>
              )}

              {/* Lists */}
              {item.lists && item.lists.length > 0 && (
                <div className="space-y-6 mb-6">
                  {item.lists.map((list, listIndex) => (
                    <div key={listIndex}>
                      <h4 className="font-semibold text-slate-900 mb-3">
                        {list.title}
                      </h4>
                      <ul className="space-y-2">
                        {list.items.map((listItem, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3 text-slate-600">
                            <span className="text-blue-600 mt-1.5 flex-shrink-0">•</span>
                            <span>{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer */}
              {item.footer && (item.footer.leftColumn || item.footer.rightColumn) && (
                <div className="border-t border-slate-200 pt-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.footer.leftColumn && (
                      <div className="font-semibold text-slate-900">
                        {item.footer.leftColumn}
                      </div>
                    )}
                    {item.footer.rightColumn && (
                      <div className="text-slate-600 text-sm">
                        {item.footer.rightColumn}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}