import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, ShieldCheck, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { TournamentRegistrationForm } from "@/components/tournament-registration-form";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const revalidate = 60;

type Tournament = { id: string; name: string; slug: string; game: string; description: string | null; rules: string | null; registration_open: boolean; starts_at: string | null; registration_closes_at: string | null; max_participants: number | null; status: string };

async function getTournament(slug: string) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("tournaments").select("id,name,slug,game,description,rules,registration_open,starts_at,registration_closes_at,max_participants,status").eq("slug", slug).eq("status", "published").maybeSingle<Tournament>();
  if (error || !data) return null;
  return data;
}

export async function generateStaticParams() {
  try {
    const supabase = getSupabaseServerClient();
    const { data } = await supabase.from("tournaments").select("slug").eq("status", "published");
    return (data ?? []).map(({ slug }) => ({ slug }));
  } catch { return []; }
}

const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeStyle: "short" }).format(new Date(value)) : "TBA";

export default async function TournamentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tournament = await getTournament(slug);
  if (!tournament) notFound();

  return <main className="site-container py-16 sm:py-24">
    <Link href="/tournaments" className="inline-flex items-center gap-2 text-sm font-semibold text-white/45 hover:text-white"><ArrowLeft size={16}/> All tournaments</Link>
    <header className="mt-12 max-w-4xl"><p className="eyebrow text-[#d90429]">{tournament.game}</p><div className="mt-5 flex flex-wrap items-center gap-3"><span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] ${tournament.registration_open ? "bg-[#d90429]" : "bg-white/[.06] text-white/45"}`}>{tournament.registration_open ? "Registration open" : "Registration closed"}</span>{tournament.max_participants && <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-white/45">{tournament.max_participants} slots</span>}</div><h1 className="mt-6 text-5xl font-black tracking-[-.055em] sm:text-7xl">{tournament.name}</h1>{tournament.description && <p className="mt-7 max-w-3xl text-base leading-8 text-white/48 sm:text-lg">{tournament.description}</p>}</header>
    <div className="mt-12 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-[#111] p-5"><CalendarDays size={18} className="text-[#d90429]"/><p className="eyebrow mt-5">Starts</p><p className="mt-2 text-sm font-semibold">{formatDate(tournament.starts_at)}</p></div><div className="rounded-2xl border border-white/10 bg-[#111] p-5"><Clock3 size={18} className="text-[#d90429]"/><p className="eyebrow mt-5">Registration closes</p><p className="mt-2 text-sm font-semibold">{formatDate(tournament.registration_closes_at)}</p></div><div className="rounded-2xl border border-white/10 bg-[#111] p-5"><Users size={18} className="text-[#d90429]"/><p className="eyebrow mt-5">Capacity</p><p className="mt-2 text-sm font-semibold">{tournament.max_participants ? `${tournament.max_participants} participants` : "Open"}</p></div></div>
    <div className="mt-14 grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start"><section className="rounded-3xl border border-white/10 bg-[#111] p-7 sm:p-8"><div className="flex items-center gap-3"><ShieldCheck className="text-[#d90429]" size={20}/><h2 className="text-2xl font-black">Rules & eligibility</h2></div><div className="mt-6 whitespace-pre-wrap text-sm leading-7 text-white/48">{tournament.rules || "Tournament rules will be published by the organizer before registration closes."}</div></section>{tournament.registration_open ? <TournamentRegistrationForm tournamentId={tournament.id} game={tournament.game}/> : <section className="rounded-3xl border border-white/10 bg-[#111] p-8"><p className="eyebrow text-[#d90429]">Registration</p><h2 className="mt-4 text-3xl font-black">Registration is closed.</h2><p className="mt-4 text-sm leading-7 text-white/45">Follow the event page for updates, results and future tournament announcements.</p></section>}</div>
  </main>;
}
