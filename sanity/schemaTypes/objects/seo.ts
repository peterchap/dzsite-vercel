export default {
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
        { name: "metaTitle", title: "Meta title", type: "string" },
        { name: "metaDescription", title: "Meta description", type: "text", rows: 3 },
        { name: "ogTitle", title: "OG title", type: "string" },
        { name: "ogDescription", title: "OG description", type: "text", rows: 3 },
        { name: "ogImage", title: "OG image", type: "image", options: { hotspot: true } },
    ],
};
