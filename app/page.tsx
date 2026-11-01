import Link from "next/link";
import { ArrowRight, CirclePlay, Radio, Trophy, Zap } from "lucide-react";
import { ContentCard } from "@/components/content-card";

const pillars = [
  ["01", "Gaming", "Reviews, news, guides, esports and the games worth your time."],
  ["02", "Technology", "Hardware, creator gear, software and the tech powering play."],
  ["03", "Beyond", "Events, tournaments, creators and stories shaping the culture."],
];

export default function Home() {
  return <main>
    <section className="relative overflow-hidden border-b border-white/[0.08]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(217,4,41,.16),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,.035),transparent_25%)]" />
      <div className="site-container relative grid min-h-[calc(100vh-104px)] items-end gap-12 py-20 lg:grid-cols-[1.35fr_.65fr] lg:py-28">
        <div>
          <p className="eyebrow mb-7 text-[#d90429]">ANONYMOUS1270 Studios</p>
          <h1 className="display max-w-5xl">Gaming.<br />Tech.<br /><span className="text-white/35">Beyond.</span></h1>
          <p className="mt-9 max-w-2xl text-base leading-7 text-white/52 sm:text-lg">A premium gaming and technology media platform covering the games we play, the hardware we use and the stories shaping the industry.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/livestream" className="inline-flex items-center gap-2 rounded-full bg-[#d90429] px-6 py-3 text-sm font-bold hover:bg-[#ef163b]">Watch Live <CirclePlay size={16} /></Link>
            <Link href="/reviews" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-bold hover:border-white/30">Explore Reviews <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#101010]/90 p-6 backdrop-blur-xl lg:mb-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-5"><span className="eyebrow">Live status</span><span className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/45"><i className="h-2 w-2 rounded-full bg-white/25" /> OFFLINE</span></div>
          <div className="py-10"><Radio size={22} className="text-[#d90429]" /><h2 className="mt-4 text-2xl font-bold tracking-tight">The next era starts here.</h2><p className="mt-2 text-sm leading-6 text-white/42">Editorial, video and events — built around gaming and technology.</p></div>
          <div className="grid grid-cols-2 gap-2"><div className="rounded-xl bg-white/[0.035] p-4"><p className="eyebrow">Focus</p><p className="mt-2 text-sm font-semibold">Gaming + Tech</p></div><div className="rounded-xl bg-white/[0.035] p-4"><p className="eyebrow">Format</p><p className="mt-2 text-sm font-semibold">Media + Live</p></div></div>
        </div>
      </div>
    </section>

    <section className="border-b border-white/[0.08] bg-[#111111]">
      <div className="site-container grid md:grid-cols-3">{pillars.map(([num,title,text]) => <div key={num} className="border-b border-white/[0.08] px-0 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><span className="eyebrow text-[#d90429]">{num}</span><h2 className="mt-3 text-2xl font-bold">{title}</h2><p className="mt-2 max-w-sm text-sm leading-6 text-white/42">{text}</p></div>)}</div>
    </section>

    <section className="site-container py-20 sm:py-28">
      <div className="mb-8 flex items-end justify-between gap-6"><div><p className="eyebrow text-[#d90429]">Featured</p><h2 className="mt-3 text-4xl font-black tracking-[-.04em] sm:text-5xl">What&apos;s happening</h2></div><Link href="/news" className="hidden items-center gap-2 text-sm font-semibold text-white/55 hover:text-white sm:flex">All stories <ArrowRight size={16} /></Link></div>
      <div className="grid gap-4 lg:grid-cols-2"><ContentCard featured label="Gaming" title="The games, updates and competitive moments shaping the week." href="/gaming" meta="Gaming • Editorial" /><div className="grid gap-4 sm:grid-cols-2"><ContentCard label="Technology" title="Hardware and creator gear, tested and explained." href="/technology" /><ContentCard label="Reviews" title="Independent verdicts with a clear methodology." href="/reviews" /></div></div>
    </section>

    <section className="border-y border-white/[0.08] bg-[#111111]">
      <div className="site-container grid gap-12 py-20 lg:grid-cols-[1fr_1fr] lg:items-center"><div><p className="eyebrow text-[#d90429]">Events & tournaments</p><h2 className="mt-4 max-w-xl text-4xl font-black tracking-[-.04em] sm:text-6xl">Play. Compete. Experience.</h2></div><div><p className="text-base leading-7 text-white/48">Discover tournaments, esports coverage, creator-led events and the competitive side of gaming.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/tournaments" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black"><Trophy size={16} /> Tournaments</Link><Link href="/events" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold"><Zap size={16} /> Explore events</Link></div></div></div>
    </section>

    <section className="site-container py-20 sm:py-28"><div className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_85%_20%,rgba(217,4,41,.22),transparent_30%),#111111] p-8 sm:p-14"><p className="eyebrow text-[#d90429]">For brands & partners</p><div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><h2 className="max-w-2xl text-4xl font-black tracking-[-.04em] sm:text-5xl">Build something worth remembering.</h2><Link href="/brands" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#d90429] px-6 py-3 text-sm font-bold">Work with us <ArrowRight size={16} /></Link></div></div></section>
  </main>;
}
