import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
    projectId: "w8wq190o",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
});

async function checkPricing() {
    const docs = await client.fetch(`*[_type == "pricingPage"]{ _id, _createdAt, title, "slug": slug.current }`);
    console.log("Pricing Pages found:", docs);
}

checkPricing();
