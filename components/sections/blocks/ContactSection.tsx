"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { urlFor } from "@/sanity/lib/image";
import { useForm } from "react-hook-form";

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

type FormData = {
    name: string;
    email: string;
    company: string;
    phone: string;
    subject: string;
    message: string;
};

export default function ContactSection({ isDark, title, subtitle, contactInfo }: ContactSectionProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data: FormData) => {
        setStatus("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
                reset();
            } else {
                const result = await response.json();
                setStatus("error");
                setErrorMessage(result.error || "Failed to send message.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("An unexpected error occurred.");
        }
    };

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

                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                                <div className="mb-4 rounded-full bg-emerald-50 p-3 text-emerald-600 ring-1 ring-emerald-100">
                                    <CheckCircle2 className="h-12 w-12" />
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900">Message Sent!</h4>
                                <p className="mt-2 text-slate-600">
                                    Thank you for reaching out. We've received your message and will get back to you shortly.
                                </p>
                                <Button
                                    onClick={() => setStatus("idle")}
                                    variant="outline"
                                    className="mt-8"
                                >
                                    Send another message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Your name"
                                            {...register("name", { required: "Name is required" })}
                                            className={errors.name ? "border-red-500" : ""}
                                        />
                                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Email address"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            className={errors.email ? "border-red-500" : ""}
                                        />
                                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Company</Label>
                                        <Input id="company" placeholder="Company name" {...register("company")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" placeholder="Phone number" {...register("phone")} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" placeholder="What is this about?" {...register("subject")} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="How can we help?"
                                        className={`min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                                        {...register("message", { required: "Message is required" })}
                                    />
                                    {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                                </div>

                                {status === "error" && (
                                    <p className="text-sm font-medium text-red-500">{errorMessage}</p>
                                )}

                                <Button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100 mt-2"
                                >
                                    {status === "loading" ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="mr-2 h-4 w-4" />
                                    )}
                                    {status === "loading" ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}
