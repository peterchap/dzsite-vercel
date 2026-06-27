import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact — Datazag",
  description:
    "Contact Datazag about free reports, threat alerts, infrastructure intelligence, API access, data shares, MSSP partnerships, ESP partnerships and marketplace private offers.",
};

const enquiryRoutes = [
  {
    title: "Get a free domain report",
    text: "Use a work email to see DNS, email, subdomain, platform and external threat findings for one domain.",
  },
  {
    title: "Discuss threat alerts",
    text: "Scope monitoring for platform, brand or keyword-led suspicious infrastructure with evidence and de-escalation paths.",
  },
  {
    title: "Explore Infrastructure Intelligence",
    text: "Talk about API enrichment, data shares, cloud marketplace datasets, schemas, cadence and licensing.",
  },
  {
    title: "Partner with Datazag",
    text: "Discuss MSSP, MDR, ESP, platform or white-label services powered by Datazag intelligence.",
  },
];

const enquiryTypes = [
  "Get a free domain report",
  "Discuss threat alerts",
  "Infrastructure Intelligence / data shares",
  "API enrichment",
  "MSSP partnership",
  "ESP partnership",
  "Marketplace / private offer",
  "Other",
];

const nextSteps = [
  {
    title: "We route the enquiry",
    text: "The selected enquiry type tells us whether this is a report, alerting, data, API, partner or marketplace conversation.",
  },
  {
    title: "We check the scope",
    text: "Domain, portfolio size, delivery preference and use case help us avoid a generic sales call.",
  },
  {
    title: "We suggest the next action",
    text: "That may be a free report, sample schema, pilot scope, partner discussion, alert trial or private marketplace offer.",
  },
];

const errorMessages: Record<string, string> = {
  name_required: "Please add your name.",
  valid_email_required: "Please add a valid work email address.",
  company_required: "Please add your company name.",
  enquiry_type_required: "Please choose an enquiry type.",
  processing_authorisation_required: "Please authorise Datazag to process your enquiry so we can respond.",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan-300/20";

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ submitted?: string; error?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const submitted = params.submitted === "1";
  const errorMessage = params.error ? errorMessages[params.error] ?? "Please check the form and try again." : null;

  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(55,222,245,0.18),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(86,168,245,0.14),transparent_30%),radial-gradient(circle_at_46%_78%,rgba(93,73,255,0.14),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
      </div>

      <section className="relative py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Contact Datazag</p>
              <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">Tell us what you need.</h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Choose the closest enquiry type and share enough context for us to route you to the right report, alerting, data, API, partner or marketplace path.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="/#free-report" className="inline-flex items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                  Get a free report
                </a>
                <a href="/reports/sample" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  See sample report
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-cyan-950/20 md:p-7">
              <div className="rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/[0.04] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Enquiry intake</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Start with the route, then the details.</h2>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  This form posts to the Datazag enquiry endpoint. It can later be connected to email, CRM, HubSpot, Sanity or the customer portal.
                </p>
              </div>

              {submitted ? (
                <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] p-4 text-sm leading-6 text-emerald-100" role="status">
                  Thanks — your enquiry has been received. We will route it by the selected enquiry type.
                </div>
              ) : null}

              {errorMessage ? (
                <div className="mt-6 rounded-2xl border border-red-300/20 bg-red-300/[0.08] p-4 text-sm leading-6 text-red-100" role="alert">
                  {errorMessage}
                </div>
              ) : null}

              <form className="mt-6 grid gap-4" action="/api/enquiry" method="post">
                <input type="hidden" name="source" value="contact_form" />
                <input type="hidden" name="page" value="/contact" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name">
                    <input className={inputClass} name="name" type="text" placeholder="Your name" required />
                  </Field>
                  <Field label="Work email">
                    <input className={inputClass} name="email" type="email" placeholder="you@company.com" required />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Company">
                    <input className={inputClass} name="company" type="text" placeholder="Company name" required />
                  </Field>
                  <Field label="Domain or portfolio size">
                    <input className={inputClass} name="scope" type="text" placeholder="example.com, 50 domains, 1M links/month" />
                  </Field>
                </div>

                <Field label="What do you want to do?">
                  <select className={inputClass} name="enquiry_type" defaultValue="" required>
                    <option value="" disabled>
                      Choose an enquiry type
                    </option>
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#07102b] text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Tell us a little more">
                  <textarea
                    className={`${inputClass} min-h-36 resize-y`}
                    name="message"
                    placeholder="Example: We are an MSSP with 120 customer domains and want a white-label domain health and impersonation report."
                  />
                </Field>

                <div className="grid gap-3 rounded-2xl border border-white/10 bg-[#030619]/60 p-4 text-sm leading-6 text-slate-300">
                  <label className="flex gap-3">
                    <input className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10" name="processing_authorisation" type="checkbox" required />
                    <span>
                      I authorise Datazag to process the information I submit so you can respond to this enquiry, assess the relevant domain or use case, and provide the requested follow-up.
                    </span>
                  </label>
                  <label className="flex gap-3">
                    <input className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10" name="marketing_opt_in" type="checkbox" />
                    <span>
                      I would also like to receive occasional Datazag updates about reports, alerts, infrastructure intelligence and related services. I can opt out later.
                    </span>
                  </label>
                </div>

                <button className="inline-flex items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200" type="submit">
                  Send enquiry
                </button>

                <p className="text-xs leading-5 text-slate-500">
                  Processing authorisation is required so Datazag can respond to the enquiry. Marketing opt-in is optional and is not required to receive a response.
                </p>
              </form>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-white/10 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Choose the closest path</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">Your enquiry decides the route.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {enquiryRoutes.map((route) => (
                <article key={route.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-lg font-semibold text-white">{route.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{route.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-white/10 py-16 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">What happens next</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">A short route to the right conversation.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {nextSteps.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-200">0{index + 1}</div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-white/10 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-center md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Privacy note</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Processing is explicit. Marketing is optional.</h2>
            <p className="mt-5 text-sm leading-6 text-slate-300">
              Processing authorisation covers responding to the enquiry and producing any requested domain report. Marketing consent is separate, optional and not required to receive the report or response.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
