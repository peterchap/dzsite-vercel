"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortableText } from 'next-sanity';

// Common free webmail domains to validate against
const freeWebmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
const portalReportUrl = process.env.NEXT_PUBLIC_PORTAL_REPORT_URL || 'https://portal.datazag.com/threat-report';

// Block-level rendering for the rich-text body below the subheadline
const bodyComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-4 last:mb-0">{children}</p>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold text-white mb-3">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500/40 pl-4 italic mb-4">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
      >
        {children}
      </a>
    ),
  },
};

// Inline rendering for checkbox consent labels (no block margins)
const consentComponents = {
  block: { normal: ({ children }: any) => <>{children}</> },
  marks: bodyComponents.marks,
};

const defaultConsentRequired =
  'I agree that Datazag may process my email address and associated domain to generate and deliver my Domain Health Report. I have read the Privacy Policy.';
const defaultConsentOptional =
  "I'd like to receive occasional product updates, research, webinars and cybersecurity insights from Datazag. I understand I can unsubscribe at any time.";

type ThreatReportCTAProps = {
  _type?: string;
  _key?: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  body?: any[];
  placeholderText?: string;
  buttonText?: string;
  successMessage?: string;
  footerPrimaryText?: string;
  footerSecondaryText?: string;
  contactLinkText?: string;
  contactLinkAnchor?: string;
  consentRequiredText?: any[];
  consentOptionalText?: any[];
};

export default function ThreatReportCTA(props: ThreatReportCTAProps) {
  const {
    eyebrow = "PRIMARY CONVERSION PATH",
    headline = "Start free — the External Platform Threat Report",
    subheadline = "Enter your work email. We take the domain from your address, analyze its DNS and subdomains to map the platforms and vendors you actually run on — your email platform, your SaaS logins, your suppliers — then check our infrastructure feeds for spoofs targeting those exact platforms and your brand.",
    body,
    placeholderText = "Enter your work email",
    buttonText = "Get my free report",
    footerPrimaryText = "No asset list, no scoping call, no questionnaire.",
    footerSecondaryText = "The report tells you two things you probably can't see today: which platforms expose you to impersonation, and what's already been built to exploit them. Need a report on a domain that isn't your own — a client's, a subsidiary's, a vendor's? That's a quick conversation.",
    contactLinkText = "Talk to us.",
    contactLinkAnchor = "#contact",
    consentRequiredText,
    consentOptionalText,
  } = props;

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [agreedRequired, setAgreedRequired] = useState(true);
  const [agreedOptional, setAgreedOptional] = useState(false);

  const domain = email.split('@')[1]?.toLowerCase() || '';

  const handleValidateAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError('');

    if (!domain) {
      e.preventDefault();
      setError('Please enter a valid email address.');
      return;
    }

    if (freeWebmailDomains.includes(domain)) {
      e.preventDefault();
      setError('Please use a corporate email address. To audit an external or free domain, use our contact path below.');
      return;
    }

    if (!agreedRequired) {
      e.preventDefault();
      setError('Please confirm you agree to the processing of your email and domain to continue.');
    }
  };

  return (
    <section id="free-report" className="bg-slate-950 text-white pt-0 pb-24 lg:pt-0 px-6 lg:px-12 xl:px-16">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-blue-950/20 border border-blue-500/20 p-8 md:p-12 lg:p-16 rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.1)]">

          {/* Background Glow Ambient Element */}

        <div className="max-w-4xl space-y-8 relative z-10">
          {/* Header */}
          <div className="space-y-3">
            {eyebrow && (
              <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>{eyebrow}</span>
              </div>
            )}
            {headline && (
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight font-sans">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="text-slate-300 font-sans text-base max-w-3xl leading-relaxed">
                {subheadline}
              </p>
            )}
            {body && body.length > 0 && (
              <div className="text-slate-300 font-sans text-base max-w-3xl leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2">
                <PortableText value={body} components={bodyComponents} />
              </div>
            )}
          </div>

          {/* Form Processing Terminal */}
          <form action={portalReportUrl} method="get" onSubmit={handleValidateAndSubmit} className="space-y-4 max-w-2xl">
            <input type="hidden" name="domain" value={domain} />
            <input type="hidden" name="consentReport" value={agreedRequired ? '1' : '0'} />
            <input type="hidden" name="consentMarketing" value={agreedOptional ? '1' : '0'} />

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholderText}
                  className="w-full bg-[#05070F] text-white placeholder-slate-500 font-sans border border-white/10 rounded-lg px-4 py-3.5 text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3.5 rounded-lg text-base shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center whitespace-nowrap"
              >
                {buttonText}
              </button>
            </div>

            {/* Opt-in consent checkboxes */}
            <div className="space-y-3 pt-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedRequired}
                  onChange={(e) => setAgreedRequired(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-[#05070F] text-blue-600 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  required
                />
                <span className="text-sm text-slate-300 leading-relaxed font-sans">
                  {consentRequiredText && consentRequiredText.length > 0 ? (
                    <PortableText value={consentRequiredText} components={consentComponents} />
                  ) : (
                    defaultConsentRequired
                  )}
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedOptional}
                  onChange={(e) => setAgreedOptional(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-[#05070F] text-blue-600 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-slate-300 leading-relaxed font-sans">
                  {consentOptionalText && consentOptionalText.length > 0 ? (
                    <PortableText value={consentOptionalText} components={consentComponents} />
                  ) : (
                    defaultConsentOptional
                  )}
                </span>
              </label>
            </div>

            {/* Client-Side Validation Message */}
            {error && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-mono text-red-400">
                ⚠️ {error}
              </motion.p>
            )}
          </form>

          {/* The Friction Eraser Copy */}
          <div className="border-t border-white/5 pt-6 max-w-3xl space-y-4">
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              <strong className="text-slate-200">{footerPrimaryText}</strong> {footerSecondaryText}{' '}
              {contactLinkText && contactLinkAnchor && (
                <a href={contactLinkAnchor} className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors">
                  {contactLinkText}
                </a>
              )}
            </p>
            <a href="/reports/sample" className="inline-flex text-sm font-medium text-blue-300 underline underline-offset-4 hover:text-blue-200">
              See a sample report before submitting your own domain
            </a>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}
