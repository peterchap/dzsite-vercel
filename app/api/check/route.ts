import { apiVersion, dataset, projectId } from "@/sanity/env";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    const token = process.env.SANITY_API_TOKEN;
    if (!token) return Response.json({ error: "No token found" });

    // Try normal fetch (no perspective) vs perspective=published
    const query = encodeURIComponent('*[_id == "page.home"]{_id}');
    const urlDefault = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;
    const urlPublished = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?perspective=published&query=${query}`;

    try {
        const resDef = await fetch(urlDefault, { headers: { 'Authorization': `Bearer ${token}` }, cache: 'no-store' });
        const dataDef = await resDef.json();

        const resPub = await fetch(urlPublished, { headers: { 'Authorization': `Bearer ${token}` }, cache: 'no-store' });
        const dataPub = await resPub.json();

        return Response.json({ success: true, default: dataDef.result, published: dataPub.result });
    } catch (e: any) {
        return Response.json({ error: e.message });
    }
}
