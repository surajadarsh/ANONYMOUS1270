import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/content-card";
import { ContactForm } from "@/components/contact-form";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const revalidate = 60;

type Section = { title: string; intro: string; cards: [string, string, string][] };

const sections: Record<string, Section> = {
  gaming: { title: "Gaming", intro: "News, reviews, guides, esports and the games worth your time.", cards: [["Reviews", "Independent verdicts on the games we play.", "/reviews"], ["News", "Updates, announcements and industry stories.", "/news"], ["Videos", "Highlights, tutorials and original gaming formats.", "/videos"], ["Esports", "Competitive gaming, tournaments and event coverage.", "/tournaments"]] },
  technology: { title: "Technology", intro: "Hardware, creator gear, software and the technology powering play.", cards: [["Gaming Phones", "Performance-focused devices and mobile gaming.", "/technology"], ["PC Hardware", "GPUs, CPUs, monitors and the parts behind the setup.", "/technology"], ["Creator Gear", "Microphones, cameras, capture cards and streaming equipment.", "/technology"], ["Software", "Apps, platforms, tools and the software creators use.", "/technology"]] },
  reviews: { title: "Reviews", intro: "Clear, independent verdicts backed by a consistent review methodology.", cards: [["Gaming", "Game reviews and first impressions.", "/reviews"], ["Hardware", "PCs, components and gaming hardware.", "/reviews"], ["Peripherals", "Keyboards, mice, headsets and creator gear.", "/reviews"], ["Methodology", "How we test, score and reach a verdict.", "/about"]] },
  news: { title: "News", intro: "The stories, updates and announcements shaping gaming, technology and the creator economy.", cards: [["Gaming News", "Game updates, launches and announcements.", "/news"], ["Technology", "Hardware, software and platform news.", "/technology"], ["Esports", "Competitive gaming and event developments.", "/events"], ["Industry", "The business and culture behind the games industry.", "/news"]] },
  videos: { title: "Videos", intro: "Gaming, technology, reviews, tutorials, vlogs, shorts and livestreams.", cards: [["Gaming", "Gameplay, highlights and original formats.", "/videos"], ["Technology", "Hands-on coverage and practical guides.", "/videos"], ["Reviews", "Video reviews and buying guidance.", "/reviews"], ["Livestreams", "Watch live coverage and past streams.", "/livestream"]] },
  livestream: { title: "Livestream", intro: "Live gaming, events and creator-led coverage from ANONYMOUS1270.", cards: [["Watch Live", "Join the next broadcast on Kick.", "https://kick.com/anonymous1270"], ["Schedule", "See upcoming broadcast slots.", "/livestream"], ["Highlights", "Catch the best moments after the stream.", "/videos"], ["YouTube", "Clips, VODs and original video.", "https://www.youtube.com/@ANONYMOUS127X"]] },
  events: { title: "Events", intro: "Esports events, gaming shows, creator experiences and coverage from the field.", cards: [["Upcoming", "Find the next events on the calendar.", "/events"], ["Coverage", "Stories, videos and galleries.", "/news"], ["Media Accreditation", "Request access for event coverage.", "/contact"], ["Tournaments", "Compete in ANONYMOUS1270 events.", "/tournaments"]] },
  tournaments: { title: "Tournaments", intro: "Compete, register and follow competitive gaming events hosted or covered by ANONYMOUS1270 Studios.", cards: [["Upcoming", "Registration and event details.", "/tournaments"], ["Rules", "Tournament rules and eligibility.", "/tournaments"], ["Results", "Results, standings and event coverage.", "/tournaments"], ["Partner with us", "Bring your event to our community.", "/brands"]] },
  "media-kit": { title: "Media Kit", intro: "Creator, media and partnership information for brands, agencies and event organizers.", cards: [["Creator", "Gaming, technology and live content.", "/about"], ["Audience", "Platform reach and content formats.", "/media-kit"], ["Services", "Campaigns, integrations and event coverage.", "/brands"], ["Contact", "Start a business conversation.", "/contact"]] },
  brands: { title: "Brands", intro: "Campaigns, collaborations and media solutions built for gaming and technology audiences.", cards: [["Campaigns", "Integrated content across video and editorial.", "/brands"], ["Events", "Creator-led and esports activations.", "/events"], ["Media", "Reviews, coverage and product storytelling.", "/reviews"], ["Business inquiry", "Tell us what you want to build.", "/contact"]] },
  about: { title: "About", intro: "ANONYMOUS1270 Studios is an independent gaming and technology media venture.", cards: [["Our mission", "Make gaming and technology coverage useful, sharp and entertaining.", "/about"], ["Editorial", "Transparent standards for publishing and reviews.", "/reviews"], ["Partnerships", "Work with the studio on campaigns and events.", "/brands"], ["Contact", "Reach the studio directly.", "/contact"]] },
  contact: { title: "Contact", intro: "Business, sponsorship, press, event and general inquiries for ANONYMOUS1270 Studios.", cards: [] },
  search: { title: "Search", intro: "Search across stories, reviews, videos, products, games and events.", cards: [["Gaming", "Browse gaming coverage.", "/gaming"], ["Technology", "Browse technology coverage.", "/technology"], ["Reviews", "Browse reviews.", "/reviews"], ["Videos", "Browse videos.", "/videos"]] },
  privacy: { title: "Privacy", intro: "We are building the privacy and data practices for the platform as the product moves toward launch.", cards: [] },
  terms: { title: "Terms", intro: "Platform terms and conditions will be published before public launch and registrations.", cards: [] },
  "affiliate-disclosure": { title: "Affiliate Disclosure", intro: "Commercial relationships and affiliate links will be clearly disclosed wherever they appear.", cards: [] },
};

export function generateStaticParams() { return Object.keys(sections).map((section) => ({ section })); }

async function getRecentArticles(section: string) {
  if (!['gaming', 'news'].includes(section)) return [] as { title: string; slug: string; category: string | null }[];
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from('articles').select('title,slug,category,published_at').eq('status', 'published').order('published_at', { ascending: false }).limit(8);
    if (error) return [];
    return (data ?? []).filter((article) => !article.category || article.category.toLowerCase().includes(section)).slice(0, 4);
  } catch { return []; }
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const data = sections[section];
  if (!data) notFound();
  const recentArticles = await getRecentArticles(section);

  return <main className="site-container py-20 sm:py-28">
    <div className="max-w-3xl"><p className="eyebrow text-[#d90429]">ANONYMOUS1270 Studios</p><h1 className="mt-5 text-5xl font-black tracking-[-.055em] sm:text-7xl">{data.title}</h1><p className="mt-6 text-base leading-7 text-white/48 sm:text-lg">{data.intro}</p></div>
    {section === "contact" && <div className="mt-14 grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start"><div><p className="eyebrow text-[#d90429]">Business enquiries</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em]">Let&apos;s build something.</h2><p className="mt-4 text-sm leading-7 text-white/45">For partnerships, sponsorships, media requests, events and creator opportunities, send the studio a message.</p><a href="mailto:business@anonymous1270.com" className="mt-6 inline-block text-sm font-semibold text-white/70 hover:text-white">business@anonymous1270.com</a></div><ContactForm /></div>}
    {section === "search" && <div className="mt-12 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-[#111] px-5 py-4"><Search size={18} className="text-white/35"/><span className="text-sm text-white/35">Search is being connected to the content database.</span></div>}
    {recentArticles.length > 0 && <section className="mt-16"><p className="eyebrow text-[#d90429]">Latest from the database</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em]">Fresh coverage</h2><div className="mt-7 grid gap-4 sm:grid-cols-2">{recentArticles.map((article) => <ContentCard key={article.slug} label={article.category ?? "Editorial"} title={article.title} href={`/articles/${article.slug}`} meta="Published editorial" />)}</div></section>}
    {section !== "contact" && data.cards.length > 0 && <div className="mt-14 grid gap-4 sm:grid-cols-2">{data.cards.map(([label,title,href]) => <ContentCard key={label} label={label} title={title} href={href} />)}</div>}
    {data.cards.length === 0 && section !== "contact" && <div className="mt-14 rounded-3xl border border-white/10 bg-[#111] p-8 text-sm text-white/45">This policy page is part of the launch foundation. Final legal copy will be added before public launch.</div>}
    <div className="mt-16"><Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 hover:text-white">Back home <ArrowRight size={16}/></Link></div>
  </main>;
}
