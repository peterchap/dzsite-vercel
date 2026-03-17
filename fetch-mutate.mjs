import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        let val = match[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) { val = val.slice(1, -1); }
        env[match[1].trim()] = val;
    }
});

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const token = env.SANITY_API_TOKEN;

const data = {
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

async function mutate() {
    try {
        const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}?returnIds=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        fs.writeFileSync('mutate-result.json', JSON.stringify(result, null, 2));
        console.log("Mutation completed.");
    } catch (e) {
        fs.writeFileSync('mutate-result.json', JSON.stringify({ error: e.message }));
        console.log("Error occurred.");
    }
}

mutate();
