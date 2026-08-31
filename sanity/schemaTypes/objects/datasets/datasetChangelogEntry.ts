export default {
    name: "dataset.changelogEntry",
    title: "Changelog Entry",
    type: "object",
    fields: [
        { name: "date", title: "Date", type: "date", validation: (r: any) => r.required() },
        {
            name: "summary",
            title: "Summary",
            type: "text",
            rows: 2,
            validation: (r: any) => r.required(),
        },
    ],
    preview: {
        select: { title: "summary", subtitle: "date" },
    },
};
