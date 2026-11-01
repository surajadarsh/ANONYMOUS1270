"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type Props = { tournamentId: string; game: string };
type Mode = "individual" | "team";

export function TournamentRegistrationForm({ tournamentId, game }: Props) {
  const [mode, setMode] = useState<Mode>("individual");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const ign = String(form.get("ign") || "").trim();
    const rules = form.get("accepted_rules") === "on";
    const privacy = form.get("accepted_privacy") === "on";
    const teamName = String(form.get("team_name") || "").trim();
    const roster = String(form.get("roster") || "").split("\n").map((value) => value.trim()).filter(Boolean).map((value) => ({ ign: value }));

    if (!name || !email || !ign || !rules || !privacy || (mode === "team" && (!teamName || roster.length < 1))) {
      setStatus("error");
      setMessage("Please complete the required fields and accept the rules and privacy terms.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("tournament_registrations").insert({
      tournament_id: tournamentId,
      registration_type: mode,
      name,
      ign,
      uid: String(form.get("uid") || "").trim() || null,
      discord: String(form.get("discord") || "").trim() || null,
      email,
      phone: String(form.get("phone") || "").trim() || null,
      country: String(form.get("country") || "").trim() || null,
      state: String(form.get("state") || "").trim() || null,
      city: String(form.get("city") || "").trim() || null,
      platform: String(form.get("platform") || "").trim() || null,
      team_name: mode === "team" ? teamName : null,
      roster: mode === "team" ? roster : [],
      accepted_rules: rules,
      accepted_privacy: privacy,
    });

    if (error) {
      setStatus("error");
      setMessage("Registration could not be submitted. Please try again in a moment.");
      return;
    }
    setStatus("success");
    setMessage("Registration received. The tournament team will review it and contact you by email.");
    event.currentTarget.reset();
  }

  if (status === "success") return <div className="rounded-3xl border border-white/10 bg-[#111] p-8 sm:p-10"><CheckCircle2 className="text-[#d90429]" size={32}/><h3 className="mt-5 text-2xl font-black">Registration received.</h3><p className="mt-3 max-w-xl text-sm leading-7 text-white/45">{message}</p></div>;

  const input = "rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-[#d90429]";
  return <form onSubmit={submit} className="grid gap-5 rounded-3xl border border-white/10 bg-[#111] p-6 sm:p-8">
    <div><p className="eyebrow text-[#d90429]">Registration</p><h3 className="mt-3 text-2xl font-black">Enter the competition.</h3><p className="mt-2 text-sm text-white/40">{game} · Your submission will be reviewed before approval.</p></div>
    <div className="grid grid-cols-2 rounded-xl border border-white/10 bg-black/20 p-1"><button type="button" onClick={() => setMode("individual")} className={`rounded-lg px-4 py-2.5 text-sm font-bold ${mode === "individual" ? "bg-white text-black" : "text-white/45"}`}>Individual</button><button type="button" onClick={() => setMode("team")} className={`rounded-lg px-4 py-2.5 text-sm font-bold ${mode === "team" ? "bg-white text-black" : "text-white/45"}`}>Team</button></div>
    <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm"><span className="text-white/55">Full name *</span><input required name="name" className={input}/></label><label className="grid gap-2 text-sm"><span className="text-white/55">Email *</span><input required type="email" name="email" className={input}/></label><label className="grid gap-2 text-sm"><span className="text-white/55">In-game name *</span><input required name="ign" className={input}/></label><label className="grid gap-2 text-sm"><span className="text-white/55">Game UID</span><input name="uid" className={input}/></label><label className="grid gap-2 text-sm"><span className="text-white/55">Discord</span><input name="discord" className={input}/></label><label className="grid gap-2 text-sm"><span className="text-white/55">Phone</span><input name="phone" type="tel" className={input}/></label><label className="grid gap-2 text-sm"><span className="text-white/55">Country</span><input name="country" className={input}/></label><label className="grid gap-2 text-sm"><span className="text-white/55">State / City</span><input name="state" placeholder="State" className={input}/><input name="city" placeholder="City" className={input}/></label><label className="grid gap-2 text-sm sm:col-span-2"><span className="text-white/55">Platform</span><input name="platform" placeholder="PC / PlayStation / Xbox / Mobile" className={input}/></label></div>
    {mode === "team" && <div className="grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-5"><label className="grid gap-2 text-sm"><span className="text-white/55">Team name *</span><input required name="team_name" className={input}/></label><label className="grid gap-2 text-sm"><span className="text-white/55">Roster *</span><textarea required name="roster" rows={5} placeholder="One IGN per line" className={`${input} resize-y`}/></label></div>}
    <div className="grid gap-3 border-t border-white/10 pt-5"><label className="flex gap-3 text-sm text-white/55"><input required type="checkbox" name="accepted_rules" className="mt-1 accent-[#d90429]"/>I agree to the tournament rules and eligibility requirements.</label><label className="flex gap-3 text-sm text-white/55"><input required type="checkbox" name="accepted_privacy" className="mt-1 accent-[#d90429]"/>I agree to the privacy terms for tournament registration.</label></div>
    <button disabled={status === "sending"} className="w-fit rounded-full bg-[#d90429] px-6 py-3 text-sm font-bold hover:bg-[#ef163b] disabled:opacity-50">{status === "sending" ? "Submitting…" : "Submit registration"}</button>
    {status === "error" && <p role="alert" className="text-sm text-[#ff6b7f]">{message}</p>}
  </form>;
}
