export default {
    name: "section.dataDictionary",
    title: "Section: Data Dictionary",
    type: "object",
    fields: [
        {
            name: "buttonText",
            title: "Button Text",
            type: "string",
            description: "Text to display on the button that triggers the dictionary popup (e.g. 'View Data Dictionary')",
            initialValue: "View Data Dictionary",
            validation: (r: any) => r.required(),
        },
        {
            name: "title",
            title: "Modal Title",
            type: "string",
            description: "Title shown inside the modal popup",
            initialValue: "Data Dictionary",
        },
        {
            name: "description",
            title: "Modal Description",
            type: "text",
            rows: 2,
            description: "Optional introductory text inside the modal",
        },
        {
            name: "csvFile",
            title: "CSV File",
            type: "file",
            options: {
                accept: ".csv",
            },
            description: "Upload the data dictionary as a CSV file. First row should be headers.",
            validation: (r: any) => r.required(),
        },
    ],
    preview: {
        select: {
            title: "buttonText",
        },
        prepare({ title }: any) {
            return {
                title: title || "Data Dictionary",
                subtitle: "Popup Modal",
            };
        },
    },
};
