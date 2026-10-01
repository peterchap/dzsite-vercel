// Machine clicks — implementation guide (machine-clicks package, 2026-10-01).
//
// Publishing rule, non-negotiable: every specific value on this page comes from
// a vendor's own published source or from Datazag's own measurement. No ASNs,
// IP ranges, user-agent strings or fingerprint rules we have not verified. The
// page publishes method and tells implementers to source specifics from each
// vendor, on a refresh schedule.
//
// No figures here, so nothing to render from site-stats. No link to the
// per-domain dataset or a free file until each has a live URL (lib/machine-clicks.ts).

export const REVIEWED = "2026-10-01";

export const GUIDE = {
  eyebrow: "Email intelligence · Implementation guide",
  title: "Classify machine clicks in your own traffic",
  lead: [
    "Security products inspect links in email. Some retrieve the destination, and your platform can record that request as a click.",
    "This guide shows how to separate those requests from human ones. It uses telemetry you already collect.",
  ],

  supply: {
    title: "What we supply, and what you build",
    body: [
      "Datazag identifies the mail infrastructure for a recipient domain. The record names the mailbox platform and, where one is visible, the gateway in front of it. It also records what each vendor documents about URL inspection.",
      "That tells you where automated URL interaction is plausible. It does not tell you which interactions a machine produced. You classify those from your own telemetry.",
    ],
  },

  signals: {
    title: "Four signals, each with a failure mode",
    intro: "No signal is conclusive alone. Combine them.",
    items: [
      {
        key: "timing",
        title: "Timing relative to delivery",
        text: "Automated interactions cluster near delivery. People act later. Timing is the cheapest signal, and you already hold it.",
        fails: "A recipient with a push notification clicks within seconds. Or a product analyzes the message well after delivery.",
      },
      {
        key: "network",
        title: "Source network",
        text: "A request from a security vendor's own infrastructure is strong evidence.",
        fails: "The network belongs to a hyperscaler. Those networks carry scanners, corporate proxies and ordinary users alike.",
      },
      {
        key: "user-agent",
        title: "User agent",
        text: "Some scanners identify themselves.",
        fails: "A product presents a desktop browser string. The absence of a bot string proves nothing.",
      },
      {
        key: "tls",
        title: "TLS fingerprint",
        text: "A request can claim to be a browser but use a handshake no browser produces. That mismatch is a reliable machine signal.",
        fails: "You do not terminate TLS yourself. Behind most CDNs you will not see it.",
      },
    ],
  },

  hiddenLink: {
    title: "The hidden link gives you ground truth",
    body: [
      "This is the strongest technique available. It needs no vendor cooperation.",
      "Place a unique link in the HTML body and hide it with CSS. No recipient can see or click it. Any request to that URL came from software.",
      "Make each hidden URL unique per recipient and per send. When one fires, you learn the source address, user agent, fingerprint and delay. You can tie the request to a recipient domain whose infrastructure you already know.",
      "That gives you a labeled dataset from your own traffic. Everything else is inference. This is observation.",
    ],
    cautions: [
      "Keep the element truly invisible. Do not just position it off-screen.",
      "Do not make the link look like an unsubscribe or login link. Some products treat those differently.",
      "Accessibility tools may expose hidden content. Test with a screen reader before you rely on silence from human recipients.",
    ],
  },

  log: {
    title: "What to log",
    intro: "Capture these fields for every pixel and link request:",
    items: [
      "The token, resolving to recipient, send and link type",
      "The request timestamp, and the delivery timestamp to compare against",
      "The source IP address",
      "The full user-agent string",
      "The TLS fingerprint, where available",
      "The request method",
      "Whether redirects were followed",
    ],
    outro: "Store raw values. Classification rules will change. The telemetry will not.",
  },

  networks: {
    title: "Source provider networks from the vendor",
    body: [
      "Do not maintain a hand-written list of IP ranges. Take ranges from each vendor's published source, and refresh them on a schedule. Record the source and date of every entry.",
      "Where a vendor publishes nothing, your own hidden-link data is the better source.",
    ],
  },

  pitfalls: {
    title: "Pitfalls",
    items: [
      {
        key: "frozen-ua",
        title: "Frozen user-agent strings.",
        text: "Modern Apple platforms report a fixed OS version. Matching on it classifies large numbers of real people as machines.",
      },
      {
        key: "tls-version",
        title: "TLS version is not a machine signal.",
        text: "A JA4 fingerprint starts with the transport and TLS version. That says nothing about browser versus library. The signal is the mismatch between the claimed browser and its real handshake.",
      },
      {
        key: "cloud",
        title: "Cloud networks are shared.",
        text: "Always combine source network with another signal.",
      },
      {
        key: "selective",
        title: "Analysis is often selective.",
        text: "A quiet domain is not evidence that its product never fetches.",
      },
      {
        key: "two-layers",
        title: "Two layers can act.",
        text: "A gateway in front of a mailbox platform puts two products on one delivery path.",
      },
      {
        key: "client-proxy",
        title: "Client-side proxying is invisible to us.",
        text: "Image proxying by a mail app depends on the recipient's client, not their domain. No DNS observation reaches it. That part of machine engagement is yours to detect, not ours to predict.",
      },
    ],
  },

  evidenceLink: {
    title: "The vendor documentation behind the classification",
    text: "Every product entry, what its vendor documents, the source and the date we reviewed it.",
  },
};
