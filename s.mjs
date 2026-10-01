import fs from "node:fs";
const f = "scripts/check-post.mjs";
let t = fs.readFileSync(f, "utf8");
const R = (a, b) => { if (!t.includes(a)) throw new Error(a.slice(0, 60)); t = t.replace(a, b); };
R(`const dir = join("app", "(marketing)", "intelligence", slug);
console.log(\`\nPre-publish check: \${slug}\`);

// 1. Listing
const research = readFileSync(join("lib", "research.ts"), "utf8");
const entries = [...research.matchAll(/slug:\s*"([^"]+)"[\s\S]*?publishedOn:\s*"(\d{4}-\d{2}-\d{2})"/g)].map((m) => ({ slug: m[1], date: m[2] }));
const entry = entries.find((e) => e.slug === slug);`,
`console.log(\`\nPre-publish check: \${slug}\`);

// 1. Listing
const research = readFileSync(join("lib", "research.ts"), "utf8");
const blocks = research.split(/\n  \{\n/).slice(1);
const entries = blocks.flatMap((b) => {
  const s = b.match(/slug:\s*"([^"]+)"/), d = b.match(/publishedOn:\s*"(\d{4}-\d{2}-\d{2})"/), h = b.match(/href:\s*"([^"]+)"/);
  return s && d ? [{ slug: s[1], date: d[1], href: h ? h[1] : null }] : [];
});
const entry = entries.find((e) => e.slug === slug);
// A guide lives where its href says (/resources/...); research lives at /intelligence/<slug>.
const path = entry?.href ?? \`/intelligence/\${slug}\`;
const dir = join("app", "(marketing)", ...path.split("/").filter(Boolean));`);
R(`if (sitemap.includes(\`/intelligence/\${slug}"\`)) ok("in app/sitemap.ts");
else fail(\`not in app/sitemap.ts: add { path: "/intelligence/\${slug}" }\`);`,
`if (sitemap.includes(\`"\${path}"\`)) ok("in app/sitemap.ts");
else fail(\`not in app/sitemap.ts: add { path: "\${path}" }\`);`);
R("  const url = `${base.replace(/\/$/, \"\")}/intelligence/${slug}`;", "  const url = `${base.replace(/\/$/, \"\")}${path}`;");
fs.writeFileSync(f, t);
console.log("ok");
