import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const envFile = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        let val = match[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) { val = val.slice(1, -1); }
        env[match[1].trim()] = val;
    }
});

try {
    console.log("Running Sanity dataset import...");
    execSync(`npx sanity dataset import seed-data.ndjson ${env.NEXT_PUBLIC_SANITY_DATASET} --project ${env.NEXT_PUBLIC_SANITY_PROJECT_ID} --replace`, {
        env: { ...process.env, SANITY_AUTH_TOKEN: env.SANITY_API_TOKEN },
        stdio: 'inherit'
    });
    console.log("Import successful!");
} catch (error) {
    console.error("Import failed:", error.message);
}
