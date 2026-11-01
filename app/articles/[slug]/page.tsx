import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const revalidate = 60;

type Article = { title: string; slug: string; excerpt: string | null; content: string | null; cover_image_url: string | null; category: string | null; published_at: string | null; seo_title: string | null; seo_description: string | null };

async function getArticle(slug: string) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("articles").select("title,slug,excerpt,content,cover_image_url,category,published_at,seo_title,seo_description").eq("slug", slug).eq("status", "published").maybeSingle<Article>();
  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found" };
  return { title: article.seo_title || article.title, description: article.seo_description || article.excerpt || undefined };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const published = article.published_at ? new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(article.published_at)) : "ANONYMOUS1270 Studios";

  return <main className="site-container py-16 sm:py-24">
    <article className="mx-auto max-w-4xl">
      <div className="max-w-3xl"><p className="eyebrow text-[#d90429]">{article.category || "Editorial"}</p><h1 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-6xl">{article.title}</h1>{article.excerpt && <p className="mt-7 text-lg leading-8 text-white/50">{article.excerpt}</p>}<p className="mt-6 text-xs uppercase tracking-[.14em] text-white/30">{published} · ANONYMOUS1270 Studios</p></div>
      {article.cover_image_url && <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#111]"><img src={article.cover_image_url} alt="" className="aspect-[16/9] w-full object-cover" /></div>}
      <div className="prose prose-invert mt-12 max-w-none whitespace-pre-wrap text-base leading-8 text-white/72">{article.content || article.excerpt}</div>
    </article>
  </main>;
}
