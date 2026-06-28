export function LivingInternetBackdrop() {
  const nodes = [[6, 18, 2.8], [18, 30, 2.1], [31, 19, 2.4], [43, 42, 3.1], [59, 34, 2.2], [72, 18, 2.6], [88, 36, 2.4], [78, 62, 3.2], [52, 67, 2.5], [28, 72, 2.2], [12, 58, 1.8], [64, 78, 1.9], [91, 68, 1.7]];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(55,222,245,0.18),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(86,168,245,0.14),transparent_30%),radial-gradient(circle_at_48%_78%,rgba(93,73,255,0.16),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <svg className="absolute inset-0 h-full w-full opacity-85" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M6 18 C18 30 23 17 31 19 S39 40 43 42 S55 34 59 34 S68 20 72 18 S82 34 88 36" fill="none" stroke="#37DEF5" strokeOpacity="0.22" strokeWidth="0.35" />
        <path d="M12 58 C25 74 36 72 52 67 S68 62 78 62 S85 48 88 36" fill="none" stroke="#37DEF5" strokeOpacity="0.2" strokeWidth="0.35" />
        {nodes.map(([cx, cy, r], index) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={index % 4 === 0 ? "#37DEF5" : "#56A8F5"} fillOpacity={index % 4 === 0 ? 0.8 : 0.38} />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030619] to-transparent" />
    </div>
  );
}
