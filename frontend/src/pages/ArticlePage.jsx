import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Link2, Linkedin, Twitter } from 'lucide-react';
import { toast } from 'sonner';
import { Footer } from '../components/Footer';
import { CoverVisual } from '../components/insights/CoverVisual';
import { articleBySlug, relatedArticles } from '../data/insights';
import { useSEO } from '../hooks/useSEO';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function ArticlePage() {
    const { slug } = useParams();
    const article = articleBySlug(slug);
    const url = `${window.location.origin}/resources/blog/${slug}`;

    useSEO({
        title: article ? `${article.title} | TonAer Insights` : 'Article Not Found | TonAer Insights',
        description: article ? article.excerpt : 'The requested TonAer insight could not be found.',
        canonical: url,
        ogType: 'article',
        jsonLd: article
            ? {
                  '@context': 'https://schema.org',
                  '@type': 'Article',
                  headline: article.title,
                  description: article.excerpt,
                  author: { '@type': 'Organization', name: article.author },
                  publisher: { '@type': 'Organization', name: 'TonAer' },
                  mainEntityOfPage: url,
                  keywords: article.tags.join(', '),
              }
            : null,
    });

    if (!article) {
        return (
            <div className="bg-[#020617] text-white min-h-screen flex items-center justify-center px-6" data-testid="article-not-found">
                <div className="text-center">
                    <div className="font-mono-xu text-[10px] tracking-[0.3em] text-brand mb-4">404</div>
                    <h1 className="font-display font-bold text-3xl">Insight not found.</h1>
                    <Link to="/resources/blog" className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-brand hover:text-brand-soft transition-colors">
                        <ArrowLeft size={14} /> Back to Insights
                    </Link>
                </div>
            </div>
        );
    }

    const related = relatedArticles(article, 3);
    const { content: c } = article;

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard.');
        } catch {
            toast.error('Could not copy the link.');
        }
    };

    return (
        <div className="bg-[#020617] text-white" data-testid="article-page">
            <article className="pt-32 px-6 sm:px-12 md:px-24 max-w-4xl mx-auto">
                <Link
                    to="/resources/blog"
                    data-testid="article-back"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand transition-colors"
                >
                    <ArrowLeft size={13} /> All Insights
                </Link>

                <div className="mt-8 flex items-center gap-3">
                    <span className="font-mono-xu text-[10px] tracking-[0.25em] text-brand">{article.category.toUpperCase()}</span>
                    {article.isDemo && (
                        <span className="font-mono-xu text-[8px] tracking-[0.2em] text-slate-500 border border-white/10 rounded-full px-2 py-0.5">
                            SAMPLE CONTENT
                        </span>
                    )}
                </div>
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.08] mt-4"
                >
                    {article.title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.08 }}
                    className="mt-5 text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl"
                >
                    {article.subtitle}
                </motion.p>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-5">
                    <div className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-full bg-brand/15 border border-brand/30 flex items-center justify-center font-display font-bold text-brand text-sm">
                            T
                        </span>
                        <div>
                            <div className="text-sm font-semibold" data-testid="article-author">{article.author}</div>
                            <div className="font-mono-xu text-[9px] tracking-[0.15em] text-slate-500 mt-0.5">
                                {article.date.toUpperCase()} · {article.readingTime} MIN READ
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2" data-testid="article-share">
                        <button onClick={copyLink} data-testid="share-copy" aria-label="Copy link"
                            className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-brand hover:border-brand/50 transition-all duration-300">
                            <Link2 size={15} />
                        </button>
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer"
                            data-testid="share-linkedin" aria-label="Share on LinkedIn"
                            className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-brand hover:border-brand/50 transition-all duration-300">
                            <Linkedin size={15} />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer"
                            data-testid="share-x" aria-label="Share on X"
                            className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-brand hover:border-brand/50 transition-all duration-300">
                            <Twitter size={15} />
                        </a>
                    </div>
                </div>
            </article>

            <div className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto mt-10">
                <CoverVisual category={article.category} className="rounded-3xl border border-white/10 aspect-[21/9]" />
            </div>

            <div className="px-6 sm:px-12 md:px-24 max-w-3xl mx-auto py-14" data-testid="article-body">
                <motion.p {...fadeUp} className="text-base md:text-lg text-slate-300 leading-relaxed">{c.intro}</motion.p>

                <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-2xl mt-12">Key Concepts</motion.h2>
                <motion.ul {...fadeUp} className="mt-5 space-y-3">
                    {c.concepts.map((k) => (
                        <li key={k} className="flex gap-3 text-slate-400 leading-relaxed">
                            <span className="w-5 h-px bg-brand mt-3 shrink-0" />
                            {k}
                        </li>
                    ))}
                </motion.ul>

                <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-2xl mt-12">Under the Hood</motion.h2>
                {c.technical.map((p, i) => (
                    <motion.p key={i} {...fadeUp} className="mt-5 text-slate-400 leading-relaxed">{p}</motion.p>
                ))}

                <motion.blockquote {...fadeUp} className="mt-10 border-l-2 border-brand pl-6 py-1 font-display font-semibold text-xl text-slate-200 leading-relaxed">
                    {c.callout}
                </motion.blockquote>

                <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-2xl mt-12">Why It Matters for Your Business</motion.h2>
                <motion.p {...fadeUp} className="mt-5 text-slate-400 leading-relaxed">{c.business}</motion.p>

                <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-2xl mt-12">Practical Considerations</motion.h2>
                <motion.ul {...fadeUp} className="mt-5 space-y-3">
                    {c.practical.map((p) => (
                        <li key={p} className="flex gap-3 text-slate-400 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 shrink-0" />
                            {p}
                        </li>
                    ))}
                </motion.ul>

                <motion.div {...fadeUp} className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                    <div className="font-mono-xu text-[10px] tracking-[0.3em] text-brand mb-3">THE TAKEAWAY</div>
                    <p className="text-slate-300 leading-relaxed">{c.conclusion}</p>
                </motion.div>

                <motion.div {...fadeUp} className="mt-10 flex flex-wrap gap-2" data-testid="article-tags">
                    {article.tags.map((t) => (
                        <span key={t} className="font-mono-xu text-[9px] tracking-[0.15em] border border-white/15 text-slate-400 rounded-full px-3 py-1.5">
                            {t.toUpperCase()}
                        </span>
                    ))}
                </motion.div>

                {article.isDemo && (
                    <p className="mt-10 font-mono-xu text-[9px] tracking-[0.15em] text-slate-600 leading-relaxed" data-testid="article-demo-note">
                        THIS IS DEMONSTRATION CONTENT CREATED TO PREVIEW THE TONAER INSIGHTS EXPERIENCE. IT IS NOT A PUBLISHED TONAER EDITORIAL ARTICLE.
                    </p>
                )}
            </div>

            {/* RELATED */}
            {related.length > 0 && (
                <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto py-14 border-t border-white/5" data-testid="related-insights">
                    <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500 mb-6">RELATED INSIGHTS</div>
                    <div className="grid sm:grid-cols-3 gap-5">
                        {related.map((a) => (
                            <Link
                                key={a.id}
                                to={`/resources/blog/${a.slug}`}
                                data-testid={`related-${a.slug}`}
                                className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-brand/40 transition-all duration-300 hover:-translate-y-1"
                            >
                                <CoverVisual category={a.category} className="aspect-[16/9]" />
                                <div className="p-5">
                                    <div className="font-mono-xu text-[9px] tracking-[0.2em] text-brand">{a.category.toUpperCase()}</div>
                                    <div className="font-display font-semibold text-sm mt-2 leading-snug group-hover:text-brand transition-colors duration-300">
                                        {a.title}
                                    </div>
                                    <div className="font-mono-xu text-[9px] tracking-[0.15em] text-slate-600 mt-3">
                                        {a.date.toUpperCase()} · {a.readingTime} MIN READ
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto pb-20">
                <motion.div {...fadeUp} className="rounded-3xl border border-brand/20 bg-brand/5 p-10 sm:p-12 text-center">
                    <h2 className="font-display font-bold tracking-tight text-2xl sm:text-3xl">Have a Connectivity Challenge?</h2>
                    <p className="mt-3 text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
                        Talk with the TonAer team about connectivity hardware, cloud platforms, device management and
                        intelligent network solutions.
                    </p>
                    <Link
                        to="/#contact"
                        data-testid="article-cta-demo"
                        className="inline-flex items-center gap-2 mt-7 rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Request a Demo <ArrowRight size={15} />
                    </Link>
                </motion.div>
            </section>
            <Footer />
        </div>
    );
}
