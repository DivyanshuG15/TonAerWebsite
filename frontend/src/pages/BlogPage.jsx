import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import { Footer } from '../components/Footer';
import { CoverVisual } from '../components/insights/CoverVisual';
import { CATEGORIES, TOPICS, publishedArticles, featuredArticle, filterArticles } from '../data/insights';
import { useSEO } from '../hooks/useSEO';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const PAGE_SIZE = 9;

function DemoTag() {
    return (
        <span className="font-mono-xu text-[8px] tracking-[0.2em] text-slate-500 border border-white/10 rounded-full px-2 py-0.5">
            SAMPLE
        </span>
    );
}

function ArticleCard({ a }) {
    return (
        <motion.div {...fadeUp} data-testid={`article-card-${a.slug}`}>
            <Link
                to={`/resources/blog/${a.slug}`}
                className="group block h-full rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-brand/40 transition-all duration-300 hover:-translate-y-1"
            >
                <CoverVisual category={a.category} className="aspect-[16/9]" />
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <span className="font-mono-xu text-[9px] tracking-[0.25em] text-brand">{a.category.toUpperCase()}</span>
                        {a.isDemo && <DemoTag />}
                    </div>
                    <h3 className="font-display font-semibold text-lg mt-3 tracking-tight leading-snug group-hover:text-brand transition-colors duration-300">
                        {a.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed line-clamp-2">{a.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between">
                        <span className="font-mono-xu text-[9px] tracking-[0.15em] text-slate-500">
                            {a.date.toUpperCase()} · {a.readingTime} MIN READ
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-brand transition-colors duration-300">
                            Read Article
                            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function BlogPage() {
    const [category, setCategory] = useState('All');
    const [query, setQuery] = useState('');
    const [shown, setShown] = useState(PAGE_SIZE);
    const [email, setEmail] = useState('');

    useSEO({
        title: 'TonAer Insights | Connectivity, Wi-Fi & Network Technology',
        description:
            'Explore TonAer insights on Wi-Fi, networking, connected devices, cloud platforms, AI, network intelligence and the future of connectivity.',
        canonical: `${window.location.origin}/resources/blog`,
    });

    const articles = useMemo(() => publishedArticles().filter((a) => !a.featured), []);
    const featured = featuredArticle();
    const filtered = filterArticles(articles, { category, query });
    const visible = filtered.slice(0, shown);
    // Curated "most read" — no fabricated metrics, just editorial picks.
    const mostRead = articles.filter((a) => a.mostRead);

    const pickCategory = (c) => {
        setCategory(c);
        setShown(PAGE_SIZE);
    };
    const pickTopic = (t) => {
        pickCategory(t.category);
        document.querySelector('#latest')?.scrollIntoView({ behavior: 'smooth' });
    };

    const subscribe = (e) => {
        e.preventDefault();
        // Demo state: subscriptions are not connected to an email backend yet.
        setEmail('');
        toast.info('Subscriptions are not live yet — this is a preview. Your address was not stored.');
    };

    return (
        <div className="bg-[#020617] text-white" data-testid="blog-page">
            {/* HERO */}
            <section className="pt-32 pb-12 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto" data-testid="blog-hero">
                <motion.div {...fadeUp} className="font-mono-xu text-[11px] tracking-[0.35em] text-brand mb-5 flex items-center gap-3">
                    <span className="w-8 h-px bg-current" />
                    TONAER INSIGHTS
                </motion.div>
                <motion.h1 {...fadeUp} className="font-display font-bold tracking-tight text-4xl sm:text-5xl leading-[1.06] max-w-3xl">
                    Ideas, Technology & Insights From the World of Connectivity.
                </motion.h1>
                <motion.p {...fadeUp} className="mt-5 max-w-2xl text-slate-400 leading-relaxed">
                    Explore perspectives from TonAer on Wi-Fi, connected devices, network intelligence, cloud platforms,
                    AI, product engineering and the technologies shaping the future of connectivity.
                </motion.p>
            </section>

            {/* FEATURED */}
            {featured && (
                <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto pb-16" data-testid="featured-article">
                    <motion.div {...fadeUp}>
                        <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500 mb-4">FEATURED</div>
                        <Link
                            to={`/resources/blog/${featured.slug}`}
                            className="group grid lg:grid-cols-2 rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:border-brand/40 transition-colors duration-300"
                        >
                            <CoverVisual category={featured.category} className="aspect-[16/9] lg:aspect-auto lg:min-h-[340px]" />
                            <div className="p-8 sm:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono-xu text-[10px] tracking-[0.25em] text-brand">{featured.category.toUpperCase()}</span>
                                    {featured.isDemo && <DemoTag />}
                                </div>
                                <h2 className="font-display font-bold tracking-tight text-2xl sm:text-3xl lg:text-4xl mt-4 leading-tight group-hover:text-brand transition-colors duration-300">
                                    {featured.title}
                                </h2>
                                <p className="mt-4 text-slate-400 leading-relaxed">{featured.excerpt}</p>
                                <div className="mt-6 font-mono-xu text-[10px] tracking-[0.15em] text-slate-500">
                                    {featured.category.toUpperCase()} · {featured.readingTime} MIN READ · {featured.date.toUpperCase()}
                                </div>
                                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                                    Read Article
                                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                </section>
            )}

            {/* EXPLORE BY TOPIC */}
            <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto pb-14" data-testid="explore-topics">
                <motion.div {...fadeUp} className="font-mono-xu text-[11px] tracking-[0.35em] text-brand mb-5 flex items-center gap-3">
                    <span className="w-8 h-px bg-current" />
                    EXPLORE BY TOPIC
                </motion.div>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
                    {TOPICS.map((t) => (
                        <motion.button
                            key={t.id}
                            {...fadeUp}
                            onClick={() => pickTopic(t)}
                            data-testid={`topic-${t.id}`}
                            className="shrink-0 rounded-full border border-white/10 bg-white/5 hover:border-brand/50 hover:text-white px-5 py-2.5 text-xs font-medium text-slate-300 transition-all duration-300"
                        >
                            {t.label}
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* SEARCH + CATEGORY FILTER + GRID */}
            <section id="latest" className="scroll-mt-28 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto pb-8" data-testid="latest-insights">
                <motion.div {...fadeUp} className="font-mono-xu text-[11px] tracking-[0.35em] text-brand mb-3 flex items-center gap-3">
                    <span className="w-8 h-px bg-current" />
                    LATEST INSIGHTS
                </motion.div>
                <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-3xl sm:text-4xl">
                    What We're Thinking About.
                </motion.h2>

                <div className="relative max-w-md mt-8 mb-6">
                    <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShown(PAGE_SIZE);
                        }}
                        placeholder="Search TonAer Insights"
                        data-testid="insights-search"
                        className="w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-300"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 mb-10" data-testid="category-nav">
                    {['All', ...CATEGORIES].map((c) => (
                        <button
                            key={c}
                            onClick={() => pickCategory(c)}
                            data-testid={`category-${c.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-')}`}
                            className={`shrink-0 rounded-full border px-4 py-2 font-mono-xu text-[10px] tracking-[0.15em] transition-all duration-300 ${
                                category === c
                                    ? 'border-brand bg-brand/15 text-brand-soft'
                                    : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200'
                            }`}
                        >
                            {c.toUpperCase()}
                        </button>
                    ))}
                </div>

                {visible.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center" data-testid="no-insights">
                        <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-400">NO INSIGHTS FOUND</div>
                        <p className="text-sm text-slate-500 mt-3">Try another search term or explore our topics.</p>
                        <button
                            onClick={() => {
                                setQuery('');
                                pickCategory('All');
                            }}
                            data-testid="clear-insights-search"
                            className="mt-5 rounded-full border border-brand/40 text-brand text-xs font-semibold px-6 py-2.5 hover:bg-brand/10 transition-all duration-300"
                        >
                            Clear Search & Filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {visible.map((a) => (
                                <ArticleCard key={a.id} a={a} />
                            ))}
                        </div>
                        {filtered.length > shown && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={() => setShown((s) => s + PAGE_SIZE)}
                                    data-testid="load-more"
                                    className="rounded-full border border-white/20 hover:border-brand/60 text-slate-300 hover:text-white text-sm font-semibold tracking-wide px-8 py-3.5 transition-all duration-300"
                                >
                                    Load More Insights
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* MOST READ */}
            <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto py-14 border-t border-white/5" data-testid="most-read">
                <motion.div {...fadeUp} className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500 mb-6">MOST READ</motion.div>
                <div className="grid sm:grid-cols-3 gap-5">
                    {mostRead.map((a, i) => (
                        <motion.div key={a.id} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}>
                            <Link to={`/resources/blog/${a.slug}`} className="group flex gap-5 items-start" data-testid={`most-read-${a.slug}`}>
                                <span className="font-display font-bold text-3xl text-white/10 group-hover:text-brand/40 transition-colors duration-300">
                                    0{i + 1}
                                </span>
                                <div>
                                    <div className="font-mono-xu text-[9px] tracking-[0.2em] text-brand">{a.category.toUpperCase()}</div>
                                    <div className="font-display font-semibold text-sm mt-1.5 leading-snug group-hover:text-brand transition-colors duration-300">
                                        {a.title}
                                    </div>
                                    <div className="font-mono-xu text-[9px] tracking-[0.15em] text-slate-600 mt-2">
                                        {a.readingTime} MIN READ
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* NEWSLETTER (demo state — no backend connected) */}
            <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto py-16 border-t border-white/5" data-testid="newsletter">
                <motion.div {...fadeUp} className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 sm:p-14 text-center">
                    <h2 className="font-display font-bold tracking-tight text-2xl sm:text-3xl">Stay Connected With TonAer.</h2>
                    <p className="mt-4 text-slate-400 max-w-xl mx-auto leading-relaxed text-sm">
                        Get occasional insights on connectivity technology, networking, product engineering and the
                        technologies shaping connected experiences.
                    </p>
                    <form onSubmit={subscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" data-testid="newsletter-form">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            data-testid="newsletter-email"
                            className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-300"
                        />
                        <button
                            type="submit"
                            data-testid="newsletter-submit"
                            className="rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold tracking-wide px-7 py-3.5 transition-all duration-300"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="mt-4 font-mono-xu text-[9px] tracking-[0.15em] text-slate-600" data-testid="newsletter-note">
                        SUBSCRIPTIONS ARE NOT LIVE YET — PREVIEW ONLY. NO ADDRESSES ARE STORED.
                    </p>
                </motion.div>
            </section>

            {/* FINAL CTA */}
            <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto pb-20" data-testid="blog-cta">
                <motion.div {...fadeUp} className="rounded-3xl border border-brand/20 bg-brand/5 p-10 sm:p-14 text-center">
                    <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl">Have a Connectivity Challenge?</h2>
                    <p className="mt-4 text-slate-400 max-w-xl mx-auto leading-relaxed">
                        Talk with the TonAer team about connectivity hardware, cloud platforms, device management and
                        intelligent network solutions.
                    </p>
                    <Link
                        to="/#contact"
                        data-testid="blog-cta-demo"
                        className="inline-flex items-center gap-2 mt-8 rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#00D084]/25"
                    >
                        Request a Demo <ArrowUpRight size={15} />
                    </Link>
                </motion.div>
            </section>
            <Footer />
        </div>
    );
}
