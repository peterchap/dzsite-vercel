/**
 * Blog post — "Machine clicks leave clues in the MX record" (evidence package,
 * 2026-10-01). The final text, kept in source so the claim, lexicon and
 * pre-production guards read it before it reaches Sanity.
 * scripts/seedMachineClicksPost.ts converts it to Portable Text.
 *
 * Pre-publish checklist (scripts/check-post.mjs, 2026-10-01): figures carry their
 * date ({{CORP_MAIL_AS_OF}}) and link the Observatory card that defines them; one
 * contextual CTA (/esp-partners; /datasets/email-suppression does not exist yet);
 * and because vendors are named, the "count domains, not revenue" line.
 *
 * Figures: corpus and population figures are tokens, resolved at request time
 * (lib/blog-tokens.ts). The group counts (32 entries; 8/7/10/7) come from the
 * Observatory evidence file, whose tests pin them — change them together.
 *
 * {{EVIDENCE_URL}} is filled by the seed script from lib/machine-clicks.ts,
 * and the script refuses to publish while that URL is null.
 *
 * Authoring format: one entry per block. `**bold**` and `[text](href)` inline.
 */
export type PostBlock =
  | { style: "normal" | "h2"; text: string }
  | { style: "bullet"; text: string };

export const MACHINE_CLICKS_POST = {
  id: "blog-machine-clicks-mx-record",
  slug: "machine-clicks-mx-record",
  title: "Machine clicks leave clues in the MX record",
  excerpt:
    "Which recipient domains might produce machine clicks? Part of the answer is visible in the MX record, before you send.",
  tags: ["Email", "Research"],
  body: [
    { style: "normal", text: "**Question: which recipient domains might produce machine clicks?**" },
    {
      style: "normal",
      text: "Here is a rule many senders use. If opens and clicks arrive within seconds of delivery, a machine probably produced them. A security product inspected the message, and the sending platform recorded the interaction as engagement.",
    },
    {
      style: "normal",
      text: "Timing is useful evidence. But it cannot tell you which product acted. It cannot tell you whether another product also inspected the message. And it cannot tell you which domains to expect similar activity from next time.",
    },
    {
      style: "normal",
      text: "It can also mislead in both directions. A recipient with a push notification can click within seconds. Automated analysis can continue after delivery, outside a short detection window.",
    },
    { style: "normal", text: "Part of the answer is visible before you send." },
    {
      style: "normal",
      text: "An MX record identifies the infrastructure that receives a domain's inbound mail. That infrastructure may identify a mailbox platform or security gateway. If so, it can point to products with documented URL inspection capabilities.",
    },
    {
      style: "normal",
      text: "Some products check a URL against reputation data. Others retrieve the destination, or analyze it in a browser or sandbox.",
    },
    { style: "normal", text: "Reputation checking alone does not create a machine click. A request to a tracking URL can." },
    {
      style: "normal",
      text: "Whether that request becomes a recorded click depends on two things. One is what the security product requests. The other is how the sending platform counts it.",
    },

    { style: "h2", text: "What vendors document" },
    {
      style: "normal",
      text: "Our accompanying CSV reviews 32 product entries, using public vendor documentation. They fall into four groups:",
    },
    {
      style: "bullet",
      text: "**8 entries** document pre-delivery URL retrieval or deeper analysis capability, subject to configuration and deployment.",
    },
    {
      style: "bullet",
      text: "**7 entries** document URL retrieval or dynamic analysis. The reviewed evidence does not establish whether it completes before delivery.",
    },
    {
      style: "bullet",
      text: "**10 entries** document click-time checking without establishing pre-delivery fetching.",
    },
    {
      style: "bullet",
      text: "**7 entries** lack sufficient evidence to establish the pre-delivery retrieval mechanism.",
    },
    {
      style: "normal",
      text: "These are product entries, not counts of distinct vendors or customer deployments. Some entries cover related product families. The list is not a complete market census.",
    },
    {
      style: "normal",
      text: "The first group also needs a qualification. Five entries document a pre-delivery capability. Three of them — Barracuda, Microsoft and Sublime — carry explicit configuration or delivery-mode caveats. Mimecast documents pre-delivery deep scanning. Destination retrieval is an inference from that description.",
    },
    {
      style: "normal",
      text: "We therefore describe this group as retrieval or deeper analysis. We do not claim that all eight explicitly document pre-delivery HTTP requests.",
    },
    {
      style: "normal",
      text: "The click-time group needs equally careful reading. Documentation of checking when a person clicks does not prove that a product never fetches links earlier. It does not justify a \"no machine clicks\" label.",
    },

    { style: "h2", text: "Scale matters more than the gateway market suggests" },
    { style: "normal", text: "Dedicated email security gateways are a small part of the picture." },
    {
      style: "normal",
      text: "As of {{CORP_MAIL_AS_OF}}, Datazag observes the inbound mail path for {{CORP_MAIL_DOMAINS}} [corporate domains](https://observatory.datazag.com/email/providers#corp_mail_domains). Microsoft and Google together handle mail for {{CORP_MAIL_MS_GOOGLE_PCT}} of them. Dedicated gateway products account for {{CORP_MAIL_GATEWAY_PCT}}.",
    },
    {
      style: "normal",
      text: "So treating machine clicks as a secure email gateway problem misses most of the infrastructure that can produce them.",
    },
    {
      style: "normal",
      text: "These shares count domains. They are not statements about revenue, customer numbers or product quality.",
    },

    { style: "h2", text: "Microsoft needs separate treatment" },
    {
      style: "normal",
      text: "Microsoft Defender for Office 365 shows the difference between visible infrastructure and invisible policy.",
    },
    {
      style: "normal",
      text: "Microsoft documents Safe Links scanning before message delivery and selective URL detonation. It also documents a setting that can hold messages until scanning finishes. Depending on the policy, delivery can also proceed before analysis completes.",
    },
    { style: "normal", text: "A Microsoft MX record does not reveal those settings." },
    {
      style: "normal",
      text: "It can identify Microsoft mail infrastructure. It cannot tell you whether Defender for Office 365 is licensed. It cannot tell you whether Safe Links covers the recipient, or which scanning options apply.",
    },
    {
      style: "normal",
      text: "Microsoft-hosted domains are therefore a population in which this behavior may occur. They are not a count of domains that definitely generate machine clicks.",
    },
    {
      style: "normal",
      text: "Google needs a different classification. The reviewed documentation establishes Gmail click-time protection. It does not establish routine pre-delivery fetching of email-body links. On that evidence, Google hosting should not count as confirmed fetching infrastructure.",
    },

    { style: "h2", text: "Three limits of the MX signal" },
    {
      style: "normal",
      text: "**The MX record identifies infrastructure, not policy.** Deeper analysis can depend on entitlement, configuration, exclusions and risk thresholds. Customer-owned gateway names, resellers and upstream services can also hide the underlying product.",
    },
    {
      style: "normal",
      text: "**URL analysis is often selective.** Vendors describe inspecting suspicious, unknown or higher-risk destinations. Scanning every message does not necessarily mean visiting every link. A capability documented for a product does not establish what happened to a particular email.",
    },
    {
      style: "normal",
      text: "**Some protection is invisible in MX.** API and connector integrations can inspect mail without a distinctive public MX record. This is not limited to post-delivery inspection. Sublime, for example, documents optional pre-delivery protection without MX changes. A Microsoft- or Google-hosted domain may therefore have other security products inspecting its links.",
    },

    { style: "h2", text: "Timing adds another piece of evidence" },
    {
      style: "normal",
      text: "Infrastructure tells you where automated URL interactions are plausible. Timing and behavior help assess individual events.",
    },
    {
      style: "normal",
      text: "Some patterns support a machine-interaction classification. Requests cluster around delivery. Several links are visited in quick succession. The same pattern repeats across messages. None is conclusive by itself.",
    },
    {
      style: "normal",
      text: "The distinction between pre-delivery and later analysis matters here. Trellix/FireEye documents live website analysis while allowing delivery to proceed. Other products also support asynchronous or post-delivery processing. A timing rule focused only on the first few seconds can miss that activity.",
    },
    { style: "normal", text: "Datazag supplies the infrastructure signal. Senders already hold the engagement signal." },
    {
      style: "normal",
      text: "For ESPs, [email intelligence under your brand](/esp-partners) explains how the infrastructure data joins your engagement data.",
    },
    {
      style: "normal",
      text: "Joining them gives a stronger basis for judging engagement. A rapid run of requests means more when the recipient's mail infrastructure has documented URL retrieval or deeper analysis.",
    },
    { style: "normal", text: "MX records provide a clue to machine clicks. They do not prove that a click was automated." },
    {
      style: "normal",
      text: "The [vendor evidence page]({{EVIDENCE_URL}}) and its CSV record the evidence we reviewed on 2026-10-01. They include sources, confidence, delivery-timing caveats and our original classifications for comparison.",
    },
  ] satisfies PostBlock[],
};
