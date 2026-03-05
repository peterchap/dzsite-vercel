import https from 'https';
import fs from 'fs';

// Read .env.local manually
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

const data = JSON.stringify({
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
});

const options = {
    hostname: `${projectId}.api.sanity.io`,
    port: 443,
    path: `/v2024-01-01/data/mutate/${dataset}?returnIds=true`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => responseBody += chunk);
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response:', responseBody);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
