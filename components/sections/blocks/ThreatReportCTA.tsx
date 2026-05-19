"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Common free webmail domains to validate against
const freeWebmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];

type ThreatReportCTAProps = {
  _type?: string;
  _key?: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  placeholderText?: string;
  buttonText?: string;
  successMessage?: string;
  footerPrimaryText?: string;
  footerSecondaryText?: string;
  contactLinkText?: string;
  contactLinkAnchor?: string;
};

export default function ThreatReportCTA(props: ThreatReportCTAProps) {
  const {
    eyebrow = "PRIMARY CONVERSION PATH",
    headline = "Start free — the External Platform Threat Report",
    subheadline = "Enter your work email. We take the domain from your address, analyse its DNS and subdomains to map the platforms and vendors you actually run on — your email platform, your SaaS logins, your suppliers — then check our infrastructure feeds for spoofs targeting those exact platforms and your brand.",
    placeholderText = "Enter your work email",
    buttonText = "Get my free report",
    successMessage = "[✓] Domain isolated. Mapping DNS infrastructure and footprint... Check your inbox shortly for your custom target report payload.",
    footerPrimaryText = "No asset list, no scoping call, no questionnaire.",
    footerSecondaryText = "The report tells you two things you probably can't see today: which platforms expose you to impersonation, and what's already been built to exploit them. Need a report on a domain that isn't your own — a client's, a subsidiary's, a vendor's? That's a quick conversation.",
    contactLinkText = "Talk to us.",
    contactLinkAnchor = "#contact",
  } = props;

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleValidateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const domain = email.split('@')[1]?.toLowerCase();

    if (!domain) {
      setError('Please enter a valid email address.');
      return;
    }

    if (freeWebmailDomains.includes(domain)) {
      setError('Please use a corporate email address. To audit an external or free domain, use our contact path below.');
      return;
    }

    // Success state or trigger your Sanity/API webhook here
    setIsSubmitted(true);
  };

  return (
    <section className="bg-slate-950 text-white pt-0 pb-24 lg:pt-0 px-6 lg:px-12 xl:px-16">
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
          </div>

          {/* Form Processing Terminal */}
          {!isSubmitted ? (
            <form onSubmit={handleValidateAndSubmit} className="space-y-4 max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
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

              {/* Client-Side Validation Message */}
              {error && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-mono text-red-400">
                  ⚠️ {error}
                </motion.p>
              )}
            </form>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg max-w-2xl">
              <p className="text-sm font-mono text-blue-300">
                {successMessage}
              </p>
            </motion.div>
          )}

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
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}
