import Link from "next/link";

const nav = ["Gaming", "Technology", "Reviews", "News", "Videos", "Events", "Tournaments"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <div className="border-b border-white/10 bg-[#d90429] px-4 py-2 text-center text-xs font-semibold tracking-[0.18em] uppercase">
        ANONYMOUS1270 Studios is building a new era of gaming & technology media.
      </div>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#090909]/90 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between gap-8">
          <Link href="/" className="shrink-0 text-lg font-black tracking-tight">
            ANONYMOUS<span className="text-[#d90429]">1270</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {nav.map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm text-white/70 transition hover:text-white">
                {item}
              </Link>
            ))}
          </nav>
          <Link href="/search" className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium hover:border-white/30">
            Search
          </Link>
        </div>
      </header>

      <section className="container grid min-h-[680px] items-center gap-12 py-24 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-[#d90429]">ANONYMOUS1270 Studios</p>
          <h1 className="max-w-4xl text-6xl font-black leading-[0.92] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
            Gaming.<br />Tech.<br /><span className="text-white/45">Beyond.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
            A premium gaming and technology media platform covering the games we play, the hardware we use, and the stories shaping the industry.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/livestream" className="rounded-full bg-[#d90429] px-6 py-3 text-sm font-bold transition hover:bg-[#ef163b]">Watch Live</Link>
            <Link href="/reviews" className="rounded-full border border-white/15 px-6 py-3 text-sm font-bold transition hover:border-white/35">Explore Reviews</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-2xl">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d90429]/20 blur-3xl" />
          <div className="relative">
            <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Live status</span>
              <span className="flex items-center gap-2 text-xs font-bold text-[#ff5a74]"><i className="h-2 w-2 rounded-full bg-[#d90429]" /> OFFLINE</span>
            </div>
            <p className="text-sm text-white/45">The platform is being rebuilt from the ground up.</p>
            <p className="mt-3 text-2xl font-bold">The next era starts here.</p>
            <div className="mt-12 grid grid-cols-3 gap-3">
              {["Gaming", "Technology", "Events"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-white/45">Focus</p>
                  <p className="mt-2 text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#111111]">
        <div className="container grid gap-8 py-14 sm:grid-cols-3">
          {[["01", "Editorial", "News, reviews, guides and industry coverage."], ["02", "Video", "Livestreams, highlights, tutorials and original formats."], ["03", "Events", "Tournaments, esports coverage and creator-led events."]].map(([num, title, text]) => (
            <div key={num}>
              <p className="text-xs font-bold text-[#d90429]">{num}</p>
              <h2 className="mt-3 text-2xl font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/50">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="container flex flex-col gap-4 py-12 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ANONYMOUS1270 Studios. All rights reserved.</p>
        <div className="flex gap-5"><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></div>
      </footer>
    </main>
  );
}
