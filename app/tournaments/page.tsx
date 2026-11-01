import Link from "next/link";
import { ArrowRight, CalendarDays, Gamepad2, Users } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const revalidate = 60;

type Tournament = { id: string; name: string; slug: string; game: string; description: string | null; registration_open: boolean; starts_at: string | null; registration_closes_at: string | null; max_participants: number | null; status: string };

async function getTournaments() {
  try {
    const supabase = getSupabaseServerClient();
    const { data } = await supabase.from("tournaments").select("id,name,slug,game,description,registration_open,starts_at,registration_closes_at,max_participants,status").eq("status", "published").order("starts_at", { ascending: true });
    return (data ?? []) as Tournament[];
  } catch { return []; }
}

const date = (value: string | null) => value ? new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "Date TBA";

export default async function TournamentsPage() {
  const tournaments = await getTournaments();
  return <main className="site-container py-16 sm:py-24">
    <header className="max-w-3xl"><p className="eyebrow text-[#d90429]">Competitive gaming</p><h1 className="mt-5 text-5xl font-black tracking-[-.055em] sm:text-7xl">Tournaments.</h1><p className="mt-6 text-base leading-7 text-white/48 sm:text-lg">Compete in events hosted by ANONYMOUS1270 Studios. Registration, rules and event information live here.</p></header>
    {tournaments.length === 0 ? <section className="mt-14 rounded-3xl border border-white/10 bg-[#111] p-8 sm:p-12"><span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-white/45">Coming up</span><h2 className="mt-5 text-3xl font-black tracking-[-.04em]">The tournament calendar is being prepared.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">Once an event is published by the studio, it will appear here with its schedule, rules, capacity and registration flow.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#d90429] px-5 py-3 text-sm font-bold">Host an event with us <ArrowRight size={16}/></Link></section> : <section className="mt-14 grid gap-4 lg:grid-cols-2">{tournaments.map((t) => <Link key={t.id} href={`/tournaments/${t.slug}`} className="group rounded-3xl border border-white/10 bg-[#111] p-7 transition hover:-translate-y-1 hover:border-white/20"><div className="flex items-start justify-between gap-5"><div><span className="eyebrow text-[#d90429]">{t.game}</span><h2 className="mt-3 text-2xl font-black tracking-[-.03em]">{t.name}</h2></div><span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] ${t.registration_open ? "bg-[#d90429] text-white" : "bg-white/[.06] text-white/45"}`}>{t.registration_open ? "Registration open" : "Closed"}</span></div><p className="mt-5 line-clamp-3 text-sm leading-6 text-white/45">{t.description || "Tournament details and rules will be available on the event page."}</p><div className="mt-7 grid gap-3 text-xs text-white/45 sm:grid-cols-3"><span className="flex items-center gap-2"><CalendarDays size={14}/> {date(t.starts_at)}</span><span className="flex items-center gap-2"><Users size={14}/> {t.max_participants ? `${t.max_participants} slots` : "Open capacity"}</span><span className="flex items-center gap-2"><Gamepad2 size={14}/> {t.game}</span></div><div className="mt-7 flex items-center gap-2 text-sm font-semibold text-white/65 group-hover:text-white">View tournament <ArrowRight size={16}/></div></Link>)}</section>}
  </main>;
}
