import Link from "next/link";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#090909]">
      <div className="site-container py-14 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-xl font-black tracking-[-0.04em]">{site.shortName}<span className="text-[#d90429]">.</span></Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/45">{site.tagline} Independent gaming, technology and creator-led media from ANONYMOUS1270 Studios.</p>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <div className="mt-4 grid gap-3 text-sm text-white/55">{footerNav.map((item) => <Link key={item.href} href={item.href} className="hover:text-white">{item.label}</Link>)}</div>
          </div>
          <div>
            <p className="eyebrow">Connect</p>
            <div className="mt-4 grid gap-3 text-sm text-white/55">
              <a href={site.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-white">YouTube</a>
              <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
              <a href={site.socials.x} target="_blank" rel="noreferrer" className="hover:text-white">X</a>
              <a href={site.socials.kick} target="_blank" rel="noreferrer" className="hover:text-white">Kick</a>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ANONYMOUS1270 Studios. All rights reserved.</p>
          <div className="flex gap-5"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/affiliate-disclosure">Affiliate Disclosure</Link></div>
        </div>
      </div>
    </footer>
  );
}
