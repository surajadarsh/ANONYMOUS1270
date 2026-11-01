import Link from "next/link";
import {
  ArrowRight,
  CirclePlay,
  Cpu,
  Gamepad2,
  Radio,
  Trophy,
  Video,
  Zap,
} from "lucide-react";
import { ContentCard } from "@/components/content-card";

const pillars = [
  {
    number: "01",
    title: "Gaming",
    description:
      "Reviews, news, guides, esports and the games worth putting your time into.",
    icon: Gamepad2,
  },
  {
    number: "02",
    title: "Technology",
    description:
      "Hardware, creator gear, software and the technology powering modern play.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "Beyond",
    description:
      "Events, tournaments, creators and stories shaping gaming culture.",
    icon: Zap,
  },
];

const contentTracks = [
  ["Gaming", "Reviews, news, guides & esports", "/gaming"],
  ["Technology", "Hardware, software & creator gear", "/technology"],
  ["Reviews", "Tested with a clear methodology", "/reviews"],
  ["Videos", "Watch, learn & go deeper", "/videos"],
];

export default function Home() {
  return (
    <main>
      <section className="relative min-h-[calc(100svh-104px)] overflow-hidden border-b border-white/[0.08]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(217,4,41,.20),transparent_26%),radial-gradient(circle_at_15%_75%,rgba(255,255,255,.045),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#090909] to-transparent" />

        <div className="site-container relative flex min-h-[calc(100svh-104px)] flex-col justify-between gap-14 py-16 sm:py-20 lg:py-24">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-[#d90429]">ANONYMOUS1270 Studios</p>
            <span className="hidden items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-white/35 sm:flex">
              <i className="h-1.5 w-1.5 rounded-full bg-[#d90429]" />
              GAMING · TECH · MEDIA
            </span>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <h1 className="display max-w-5xl">
                Gaming.
                <br />
                Tech.
                <br />
                <span className="text-white/25">Beyond.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
                A modern gaming and technology media studio covering the games we
                play, the hardware we use and the stories shaping the industry.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/livestream"
                  className="inline-flex items-center gap-2 rounded-full bg-[#d90429] px-6 py-3 text-sm font-bold transition hover:bg-[#ef163b]"
                >
                  Watch Live <CirclePlay size={16} />
                </Link>
                <Link
                  href="/reviews"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-bold transition hover:border-white/35"
                >
                  Explore Reviews <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#101010]/90 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl lg:mb-1">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <span className="eyebrow">Live status</span>
                <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-white/40">
                  <i className="h-2 w-2 rounded-full bg-white/25" /> OFFLINE
                </span>
              </div>
              <div className="py-9">
                <Radio size={22} className="text-[#d90429]" />
                <h2 className="mt-4 text-2xl font-bold tracking-tight">
                  The next era starts here.
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/42">
                  Editorial, video, livestreams and events — built around gaming
                  and technology.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/[0.035] p-4">
                  <p className="eyebrow">Focus</p>
                  <p className="mt-2 text-sm font-semibold">Gaming + Tech</p>
                </div>
                <div className="rounded-xl bg-white/[0.035] p-4">
                  <p className="eyebrow">Format</p>
                  <p className="mt-2 text-sm font-semibold">Media + Live</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden items-center justify-between border-t border-white/10 pt-5 text-[10px] font-bold tracking-[0.18em] text-white/30 sm:flex">
            <span>01 / 04</span>
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.08] bg-[#111111]">
        <div className="site-container grid md:grid-cols-3">
          {pillars.map(({ number, title, description, icon: Icon }) => (
            <div
              key={number}
              className="group border-b border-white/[0.08] py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <div className="flex items-start justify-between">
                <span className="eyebrow text-[#d90429]">{number}</span>
                <Icon size={19} className="text-white/20 transition group-hover:text-[#d90429]" />
              </div>
              <h2 className="mt-5 text-2xl font-bold tracking-tight">{title}</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/42">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="site-container py-20 sm:py-28">
        <div className="mb-9 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-[#d90429]">Explore the studio</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.04em] sm:text-5xl">
              One place. Every side of play.
            </h2>
          </div>
          <Link
            href="/news"
            className="hidden items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-white sm:flex"
          >
            All stories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contentTracks.map(([label, description, href], index) => (
            <Link
              key={label}
              href={href}
              className="group relative min-h-44 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-6 transition hover:-translate-y-1 hover:border-white/20"
            >
              <span className="eyebrow text-white/25">0{index + 1}</span>
              <h3 className="mt-10 text-xl font-bold">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-white/40">{description}</p>
              <ArrowRight
                size={17}
                className="absolute bottom-6 right-6 text-white/20 transition group-hover:translate-x-1 group-hover:text-[#d90429]"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#111111]">
        <div className="site-container grid gap-5 py-20 sm:grid-cols-2 sm:py-24">
          <ContentCard
            featured
            label="Gaming"
            title="The games, updates and competitive moments shaping the week."
            href="/gaming"
            meta="Gaming • Editorial"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <ContentCard
              label="Technology"
              title="Hardware and creator gear, tested and explained."
              href="/technology"
            />
            <ContentCard
              label="Reviews"
              title="Independent verdicts with a clear methodology."
              href="/reviews"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.08]">
        <div className="site-container grid gap-12 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-28">
          <div>
            <p className="eyebrow text-[#d90429]">Events & tournaments</p>
            <h2 className="mt-4 max-w-xl text-4xl font-black tracking-[-.04em] sm:text-6xl">
              Play. Compete. Experience.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-7 text-white/48">
              Discover tournaments, esports coverage, creator-led events and the
              competitive side of gaming — from registration to results.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tournaments"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black"
              >
                <Trophy size={16} /> Tournaments
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold transition hover:border-white/30"
              >
                <Zap size={16} /> Explore events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-20 sm:py-28">
        <div className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_85%_20%,rgba(217,4,41,.24),transparent_30%),#111111] p-8 sm:p-14">
          <div className="flex items-start justify-between gap-6">
            <p className="eyebrow text-[#d90429]">For brands & partners</p>
            <Video size={20} className="text-white/20" />
          </div>
          <div className="mt-5 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="max-w-2xl text-4xl font-black tracking-[-.04em] sm:text-5xl">
              Build something worth remembering.
            </h2>
            <Link
              href="/brands"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#d90429] px-6 py-3 text-sm font-bold transition hover:bg-[#ef163b]"
            >
              Work with us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
