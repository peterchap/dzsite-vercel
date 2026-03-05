import { apiVersion, dataset, projectId } from "@/sanity/env";

export async function GET() {
    const token = process.env.SANITY_API_TOKEN;
    if (!token) return Response.json({ error: "No token found" });

    const mutation = {
        mutations: [
            {
                patch: {
                    id: "homePage",
                    set: {
                        slug: {
                            _type: "slug",
                            current: "home"
                        }
                    }
                }
            }
        ]
    };

    try {
        const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}?returnIds=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(mutation)
        });

        const data = await res.json();
        return Response.json({ success: true, data });
    } catch (e: any) {
        return Response.json({ error: e.message });
    }
}
