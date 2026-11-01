import Link from "next/link";

type Props = { label: string; title: string; href: string; meta?: string; featured?: boolean };

export function ContentCard({ label, title, href, meta, featured }: Props) {
  return (
    <Link href={href} className={`group block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111] transition hover:-translate-y-1 hover:border-white/[0.16] ${featured ? "min-h-[340px]" : "min-h-[230px]"}`}>
      <div className="flex h-full min-h-[inherit] flex-col justify-between bg-[radial-gradient(circle_at_80%_20%,rgba(217,4,41,.16),transparent_32%)] p-6">
        <div><span className="eyebrow text-[#d90429]">{label}</span><div className="mt-8 h-px w-10 bg-[#d90429]" /></div>
        <div><h3 className={`max-w-xl font-bold tracking-[-0.025em] transition group-hover:text-white/85 ${featured ? "text-3xl" : "text-xl"}`}>{title}</h3>{meta && <p className="mt-3 text-xs text-white/35">{meta}</p>}</div>
      </div>
    </Link>
  );
}
