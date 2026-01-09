import React from "react";
import { Container } from "@/components/ui/Container";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { urlFor } from "@/sanity/lib/image";

interface ContactSectionProps {
    isDark?: boolean;
    title?: string;
    subtitle?: string;
    contactInfo?: {
        email?: string;
        phone?: string;
        office?: string;
        image?: any;
    };
}

export default function ContactSection({ isDark, title, subtitle, contactInfo }: ContactSectionProps) {
    return (
        <section className={`py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {title || "Get in Touch"}
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-slate-600">
                        {subtitle || "Have questions? We'd love to hear from you."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Contact Info */}
                    <div className="space-y-12">
                        <div className="space-y-8">
                            {contactInfo?.email && (
                                <div className="flex gap-4 items-start">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-200">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-slate-900">Email</h3>
                                        <p className="mt-1 text-slate-600">{contactInfo.email}</p>
                                    </div>
                                </div>
                            )}

                            {contactInfo?.phone && (
                                <div className="flex gap-4 items-start">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-200">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-slate-900">Phone</h3>
                                        <p className="mt-1 text-slate-600">{contactInfo.phone}</p>
                                    </div>
                                </div>
                            )}

                            {contactInfo?.office && (
                                <div className="flex gap-4 items-start">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-200">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-slate-900">Office</h3>
                                        <p className="mt-1 text-slate-600 whitespace-pre-line">{contactInfo.office}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {contactInfo?.image && (
                            <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition-transform hover:scale-[1.02] duration-300">
                                <img
                                    src={urlFor(contactInfo.image).width(800).height(500).url()}
                                    alt="Office"
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Send us a message</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Your name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Email address" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input id="company" placeholder="Company name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" placeholder="Phone number" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="What is this about?" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="How can we help?" className="min-h-[120px]" />
                            </div>

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100 mt-2">
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    );
}
