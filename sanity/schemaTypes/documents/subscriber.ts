import { defineType, defineField } from 'sanity'

export default defineType({
    name: "subscriber",
    title: "Blog Subscriber",
    type: "document",
    fields: [
        defineField({
            name: "email",
            title: "Email Address",
            type: "string",
            validation: (Rule: any) => Rule.required().email(),
        }),
        defineField({
            name: "subscribedAt",
            title: "Subscribed At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending Confirmation", value: "pending" },
                    { title: "Active", value: "active" },
                    { title: "Unsubscribed", value: "unsubscribed" },
                ],
            },
            initialValue: "pending",
        }),
        defineField({
            name: "confirmationToken",
            title: "Confirmation Token",
            type: "string",
            readOnly: true,
        }),
        defineField({
            name: "usedConfirmationToken",
            title: "Used Confirmation Token",
            type: "string",
            readOnly: true,
            description:
                "The token that confirmed this subscription, kept after use. Mail security scanners follow links in email, so a confirmation link is often opened twice — once by the scanner and once by the subscriber. Matching a used token lets the second visit say 'already confirmed' instead of 'invalid'.",
        }),
        defineField({
            name: "confirmedAt",
            title: "Confirmed At",
            type: "datetime",
            readOnly: true,
        }),
    ],
    preview: {
        select: {
            title: "email",
            subtitle: "subscribedAt",
        },
    },
});
