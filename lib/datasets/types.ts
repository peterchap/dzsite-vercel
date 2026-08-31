/**
 * Shape of a dataset documentation page.
 *
 * The same type covers both sources: the Sanity `dataset` document (editable)
 * and the committed fallback in ./fallback.ts (durable). Anything the renderer
 * reads must exist on this type, so a field added to the CMS schema and not to
 * the fallback is a type error rather than a page that silently loses a
 * section when Sanity is unreachable.
 */

export type DatasetColumn = {
  _key?: string;
  name: string;
  type: string;
  description: string;
  isJoinKey?: boolean;
};

export type DatasetCodeBlock = {
  _key?: string;
  title: string;
  description?: string;
  language: "sql" | "json" | "python";
  code: string;
  note?: string;
};

export type DatasetNote = {
  _key?: string;
  title: string;
  body: string;
  tone?: "neutral" | "caveat";
};

export type DatasetFact = {
  _key?: string;
  label: string;
  value: string;
  /** Short qualifier under the value — what the figure covers, and of what. */
  note?: string;
};

export type DatasetChangelogEntry = {
  _key?: string;
  date: string;
  summary: string;
};

export type DatasetRelated = {
  _id?: string;
  title: string;
  slug: string;
  summary?: string;
  /** Set when the related dataset has no page yet — rendered as plain text. */
  unpublished?: boolean;
};

export type DatasetDoc = {
  _id?: string;
  title: string;
  slug: string;
  eyebrow?: string;
  summary: string;
  overview: string[];
  facts?: DatasetFact[];
  tableName?: string;
  columns: DatasetColumn[];
  schemaNote?: string;
  joinGuideTitle?: string;
  joinGuideIntro?: string;
  codeExamples?: DatasetCodeBlock[];
  methodology?: DatasetNote[];
  relatedDatasets?: DatasetRelated[];
  changelog?: DatasetChangelogEntry[];
  listingUrl?: string;
  listingLabel?: string;
  contactNote?: string;
  order?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: unknown;
  };
};

export type DatasetSummary = Pick<
  DatasetDoc,
  "title" | "slug" | "summary" | "eyebrow" | "order"
> & { columnCount?: number };
