"use client";

import { FormEvent, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

const inquiryTypes = ["Business / Sponsorship", "Brand Collaboration", "Press / Media", "Tournament / Event", "Creator", "General"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      company: String(form.get("company") || "").trim() || null,
      inquiry_type: String(form.get("inquiry_type") || "General"),
      message: String(form.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("contact_submissions").insert(payload);
    setStatus(error ? "error" : "success");
    if (!error) event.currentTarget.reset();
  }

  return <form onSubmit={submit} className="grid gap-4 rounded-3xl border border-white/10 bg-[#111] p-6 sm:p-8">
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-2 text-sm"><span className="text-white/55">Name</span><input required name="name" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d90429]" /></label>
      <label className="grid gap-2 text-sm"><span className="text-white/55">Email</span><input required type="email" name="email" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d90429]" /></label>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-2 text-sm"><span className="text-white/55">Company</span><input name="company" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d90429]" /></label>
      <label className="grid gap-2 text-sm"><span className="text-white/55">Inquiry</span><select name="inquiry_type" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d90429]"><option className="bg-[#111]">Business / Sponsorship</option>{inquiryTypes.slice(1).map((type) => <option className="bg-[#111]" key={type}>{type}</option>)}</select></label>
    </div>
    <label className="grid gap-2 text-sm"><span className="text-white/55">Message</span><textarea required name="message" rows={7} className="resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#d90429]" /></label>
    <button disabled={status === "sending"} className="w-fit rounded-full bg-[#d90429] px-6 py-3 text-sm font-bold transition hover:bg-[#ef163b] disabled:cursor-wait disabled:opacity-50">{status === "sending" ? "Sending…" : "Send inquiry"}</button>
    {status === "success" && <p role="status" className="text-sm text-white/60">Thanks — your inquiry has been received.</p>}
    {status === "error" && <p role="alert" className="text-sm text-[#ff6b7f]">We couldn&apos;t submit that yet. Check the required fields and try again.</p>}
  </form>;
}
