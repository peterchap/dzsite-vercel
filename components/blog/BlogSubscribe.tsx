"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2 } from "lucide-react";

export function BlogSubscribe() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage(data.message || "Thank you for subscribing!");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Something went wrong.");
            }
        } catch (err) {
            setStatus("error");
            setMessage("Failed to connect to the server.");
        }
    };

    return (
        <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-16 shadow-2xl rounded-3xl sm:px-24 xl:py-24">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-black tracking-tight text-white sm:text-4xl uppercase">
                Stay <span className="text-blue-400">Updated</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-8 text-slate-300 font-medium">
                Get the latest domain intelligence insights and product updates delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                    Email address
                </label>
                <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-w-0 flex-auto rounded-xl border-0 bg-white/5 px-4 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                    disabled={status === "loading" || status === "success"}
                />
                <Button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="flex-none rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-black text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all uppercase"
                >
                    {status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        "Subscribe"
                    )}
                </Button>
            </form>

            {status === "success" && (
                <div className="mt-6 flex justify-center items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>{message}</span>
                </div>
            )}

            {status === "error" && (
                <div className="mt-6 text-center text-rose-400 font-bold">
                    {message}
                </div>
            )}

            <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                aria-hidden="true"
            >
                <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
                <defs>
                    <radialGradient id="gradient">
                        <stop stopColor="#3b82f6" />
                        <stop offset={1} stopColor="#1e3a8a" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
}
