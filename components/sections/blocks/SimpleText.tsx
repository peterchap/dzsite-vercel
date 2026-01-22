import React from "react";
import { PortableText } from "next-sanity";

export default function SimpleText({
  kicker,
  title,
  subtitle,
  body,
  fontStyle = "sans",
  isDark
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  body: any[]; // PortableTextBlock[]
  fontStyle?: string;
  isDark?: boolean
}) {
  const fontClasses: Record<string, string> = {
    sans: "font-sans",
    heading: "font-heading",
    mono: "font-mono",
  };

  const selectedFont = fontClasses[fontStyle] || "font-sans";

  
  const components = {
    block: {
      normal: ({ children }: any) => <p className="mb-4 text-left">{children}</p>,
      center: ({ children }: any) => <p className="mb-4 !text-center">{children}</p>,
      right: ({ children }: any) => <p className="mb-4 !text-right">{children}</p>,
      justify: ({ children }: any) => <p className="mb-4 !text-justify">{children}</p>,
      h1: ({ children }: any) => <h1 className="text-3xl font-bold mb-4 text-left">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-2xl font-bold mb-4 text-left">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-xl font-bold mb-4 text-left">{children}</h3>,
      blockquote: ({ children }: any) => <blockquote className="border-l-4 border-slate-300 pl-4 italic mb-4 text-left">{children}</blockquote>,
    }
  };

  return (
    <section className={`py-12 ${isDark ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {kicker ? <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-3">{kicker}</p> : null}
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
          {subtitle ? <p className="mt-4 text-xl text-slate-600">{subtitle}</p> : null}
          {body && (
            <div className={`mt-6 text-lg text-slate-600 leading-8 text-left ${selectedFont} [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2`}>
              <PortableText value={body} components={components} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

