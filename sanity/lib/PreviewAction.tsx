import type { DocumentActionComponent } from "sanity";

export const PreviewAction: DocumentActionComponent = (props) => {
  const { draft, published, onComplete } = props;
  const d = draft as any;
  const p = published as any;
  const slug = d?.slug?.current || p?.slug?.current;

  const label = "Preview";
  const disabled = !slug;

  return {
    label,
    disabled,
    onHandle: () => {
      if (!slug) {
        onComplete();
        return;
      }
      const base = (import.meta as any).env?.VITE_PREVIEW_URL || "http://localhost:3000";
      const secret = (import.meta as any).env?.VITE_PREVIEW_SECRET || "dev-preview";
      const url = `${base}/api/preview?secret=${encodeURIComponent(secret)}&slug=/${encodeURIComponent(slug)}`;
      window.open(url, "_blank");
      onComplete();
    },
  };
};
