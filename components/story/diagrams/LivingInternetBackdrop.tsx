const infrastructureNodes = [
  { id: "dns", label: "DNS", x: 16, y: 28, r: 3.2, tone: "primary" },
  { id: "cert", label: "CERT", x: 34, y: 18, r: 2.7, tone: "secondary" },
  { id: "domain", label: "DOMAIN", x: 50, y: 34, r: 4.4, tone: "core" },
  { id: "host", label: "HOSTING", x: 68, y: 24, r: 3.1, tone: "primary" },
  { id: "asn", label: "ASN", x: 78, y: 44, r: 2.9, tone: "secondary" },
  { id: "platform", label: "PLATFORM", x: 60, y: 62, r: 4.1, tone: "core" },
  { id: "threat", label: "THREAT", x: 36, y: 68, r: 3, tone: "alert" },
  { id: "intel", label: "INTEL", x: 52, y: 82, r: 3.6, tone: "core" },
  { id: "mx", label: "MX", x: 20, y: 58, r: 2.5, tone: "secondary" },
  { id: "sub", label: "SUBDOMAIN", x: 72, y: 76, r: 2.6, tone: "primary" },
];

const edges = [
  ["dns", "cert"],
  ["cert", "domain"],
  ["dns", "domain"],
  ["domain", "host"],
  ["host", "asn"],
  ["domain", "platform"],
  ["mx", "domain"],
  ["mx", "threat"],
  ["threat", "platform"],
  ["platform", "intel"],
  ["sub", "platform"],
  ["asn", "sub"],
  ["threat", "intel"],
] as const;

function nodeColour(tone: string) {
  if (tone === "core") return "#37DEF5";
  if (tone === "alert") return "#F59E0B";
  if (tone === "secondary") return "#8B5CF6";
  return "#56A8F5";
}

export function LivingInternetBackdrop() {
  const byId = Object.fromEntries(infrastructureNodes.map((node) => [node.id, node]));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(55,222,245,0.18),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(86,168,245,0.14),transparent_30%),radial-gradient(circle_at_48%_78%,rgba(93,73,255,0.16),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <div className="absolute right-0 top-16 hidden h-[660px] w-[680px] opacity-80 lg:block xl:right-12 2xl:right-28">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="dz-node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#37DEF5" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#37DEF5" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="dz-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#37DEF5" stopOpacity="0.08" />
              <stop offset="55%" stopColor="#56A8F5" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.12" />
            </linearGradient>
            <filter id="dz-soft-glow">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g opacity="0.75">
            {edges.map(([from, to], index) => {
              const a = byId[from];
              const b = byId[to];
              return (
                <line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="url(#dz-edge)"
                  strokeWidth={index % 3 === 0 ? 0.42 : 0.28}
                  strokeLinecap="round"
                />
              );
            })}
          </g>

          {infrastructureNodes.map((node, index) => {
            const colour = nodeColour(node.tone);
            return (
              <g key={node.id} filter="url(#dz-soft-glow)">
                <circle cx={node.x} cy={node.y} r={node.r * 2.8} fill="url(#dz-node-glow)" opacity={node.tone === "core" ? 0.28 : 0.14} />
                <circle cx={node.x} cy={node.y} r={node.r} fill={colour} fillOpacity={node.tone === "alert" ? 0.78 : 0.62} />
                <circle cx={node.x} cy={node.y} r={node.r + 1.4} fill="none" stroke={colour} strokeOpacity="0.28" strokeWidth="0.3" />
                <text x={node.x + node.r + 2} y={node.y + 0.9} fill="#D9F8FF" fillOpacity={index % 2 === 0 ? 0.52 : 0.36} fontSize="2.2" fontWeight="600" letterSpacing="0.22em">
                  {node.label}
                </text>
              </g>
            );
          })}

          <g opacity="0.82">
            <path d="M12 88 C28 78 38 88 52 82 S73 71 88 82" fill="none" stroke="#37DEF5" strokeOpacity="0.18" strokeWidth="0.4" />
            <path d="M8 12 C28 28 36 14 50 34 S73 24 90 42" fill="none" stroke="#8B5CF6" strokeOpacity="0.12" strokeWidth="0.36" />
          </g>
        </svg>
      </div>

      <svg className="absolute inset-0 h-full w-full opacity-35 lg:opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M6 18 C18 30 23 17 31 19 S39 40 43 42 S55 34 59 34 S68 20 72 18 S82 34 88 36" fill="none" stroke="#37DEF5" strokeOpacity="0.22" strokeWidth="0.35" />
        <path d="M12 58 C25 74 36 72 52 67 S68 62 78 62 S85 48 88 36" fill="none" stroke="#37DEF5" strokeOpacity="0.2" strokeWidth="0.35" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030619] to-transparent" />
    </div>
  );
}
