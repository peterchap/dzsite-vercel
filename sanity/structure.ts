import type { StructureResolver } from "sanity/structure";

// Custom desk structure with Home Page singleton and regular lists
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Home Page singleton
      S.listItem()
        .title("Home Page")
        .id("home-page-singleton")
        .child(
          S.editor()
            .id("homePage")
            .schemaType("page")
            .title("Home Page")
            // Point the singleton at the existing seeded page document id
            .documentId("page.home")
        ),

      // Site Settings singleton (ONLY place it appears)
      S.listItem()
        .title("Site Settings")
        .id("siteSettings-singleton")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .title("Site Settings")
            // Use a stable singleton id
            .documentId("siteSettings")
        ),

      S.divider(),

      // Pages list (excluding Home)
      S.listItem()
        .title("Pages")
        .schemaType("page")
        .child(
          S.documentTypeList("page")
            .title("Pages")
            .filter('_id != "page.home"')
        ),

      // Other document types, excluding ones we surface as singletons
      ...S.documentTypeListItems().filter(
        (li) => !["page", "siteSettings"].includes(li.getId() as string)
      ),
    ]);

