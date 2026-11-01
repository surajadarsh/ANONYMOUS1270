"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { primaryNav, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#090909]/85 backdrop-blur-2xl">
      <div className="site-container flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="shrink-0 text-[17px] font-black tracking-[-0.04em]" onClick={() => setOpen(false)}>
          {site.shortName}<span className="text-[#d90429]">.</span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          {primaryNav.map((item) => <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/search" aria-label="Search" className="icon-button"><Search size={18} /></Link>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} className="icon-button xl:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/[0.08] bg-[#0b0b0b] px-5 py-4 xl:hidden" aria-label="Mobile navigation">
          <div className="site-container grid grid-cols-2 gap-1 sm:grid-cols-3">
            {primaryNav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm text-white/70 hover:bg-white/[0.05] hover:text-white">{item.label}</Link>)}
          </div>
        </nav>
      )}
    </header>
  );
}
