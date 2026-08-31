export default {
    name: "dataset.column",
    title: "Schema Column",
    type: "object",
    fields: [
        {
            name: "name",
            title: "Column Name",
            type: "string",
            description: "Exact shipped column name, e.g. ip_start_int",
            validation: (r: any) => r.required(),
        },
        {
            name: "type",
            title: "Type",
            type: "string",
            description: "Warehouse type as shipped, e.g. NUMBER / VARCHAR / DATE",
            validation: (r: any) => r.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            rows: 2,
            validation: (r: any) => r.required(),
        },
        {
            name: "isJoinKey",
            title: "Join key",
            type: "boolean",
            description: "Highlights the column in the schema table as a join key.",
            initialValue: false,
        },
    ],
    preview: {
        select: { title: "name", subtitle: "type" },
    },
};
