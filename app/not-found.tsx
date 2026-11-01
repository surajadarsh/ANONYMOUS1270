import Link from "next/link";

export default function NotFound() { return <main className="site-container flex min-h-[65vh] items-center py-20"><div><p className="eyebrow text-[#d90429]">404</p><h1 className="mt-4 text-6xl font-black tracking-[-.06em]">Page not found.</h1><p className="mt-5 max-w-lg text-white/45">The page you requested does not exist or has moved.</p><Link href="/" className="mt-8 inline-flex rounded-full bg-[#d90429] px-6 py-3 text-sm font-bold">Back home</Link></div></main>; }
