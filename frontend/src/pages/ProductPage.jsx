import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Footer } from '../components/Footer';
import { MediaViewer } from '../components/catalog/MediaViewer';
import { SpecTable } from '../components/catalog/SpecTable';
import { CompareSection } from '../components/catalog/CompareSection';
import { BrandPreview } from '../components/BrandPreview';
import { SERIES, PRODUCTS, CAP_INFO, seriesById } from '../data/catalog';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'compare', label: 'Compare' },
    { id: 'look', label: 'Look & Feel' },
];

function SectionHead({ kicker, title, desc }) {
    return (
        <>
            <motion.div {...fadeUp} className="font-mono-xu text-[11px] tracking-[0.35em] text-brand mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-current" />
                {kicker}
            </motion.div>
            <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-3xl sm:text-4xl leading-tight text-white">
                {title}
            </motion.h2>
            {desc && <motion.p {...fadeUp} className="mt-4 max-w-2xl text-slate-400 leading-relaxed">{desc}</motion.p>}
        </>
    );
}

export default function ProductPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const series = SERIES.find((s) => s.id === searchParams.get('series')) || SERIES[0];
    const seriesProducts = PRODUCTS.filter((p) => p.series === series.id);
    const product = seriesProducts.find((p) => p.id === searchParams.get('model')) || seriesProducts[0];

    const tab = TABS.some((t) => t.id === searchParams.get('tab')) ? searchParams.get('tab') : 'overview';

    const selectSeries = (id) => {
        setSearchParams(tab === 'overview' ? { series: id } : { series: id, tab });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const selectProduct = (p) => {
        const target = typeof p === 'string' ? p : p.id;
        const seriesId = (typeof p === 'string' ? seriesById(PRODUCTS.find((x) => x.id === target)?.series) : seriesById(p.series)).id;
        setSearchParams(tab === 'overview' ? { series: seriesId, model: target } : { series: seriesId, model: target, tab });
        if (tab === 'overview') document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' });
    };
    const selectTab = (id) => {
        setSearchParams(id === 'overview' ? { series: series.id, model: product.id } : { series: series.id, model: product.id, tab: id });
    };

    const related = [
        ...seriesProducts.filter((p) => p.id !== product.id),
        ...PRODUCTS.filter((p) => p.series !== series.id && p.tags.some((t) => product.tags.includes(t))),
    ].slice(0, 3);

    return (
        <div className="bg-[#020617] text-white" data-testid="product-page">
            <section className="pt-32 pb-10 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
                <div className="font-mono-xu text-[11px] tracking-[0.35em] text-brand mb-8 flex items-center gap-3">
                    <span className="w-8 h-px bg-current" />
                    PRODUCT CATALOG
                </div>
                <div className="flex flex-wrap gap-3 mb-10" data-testid="series-tabs">
                    {SERIES.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => selectSeries(s.id)}
                            data-testid={`series-tab-${s.id}`}
                            className={`rounded-2xl border px-6 py-4 text-left transition-all duration-300 ${
                                series.id === s.id
                                    ? 'border-brand bg-brand/10 shadow-lg shadow-brand/5'
                                    : 'border-white/10 bg-white/5 hover:border-white/25'
                            }`}
                        >
                            <div className={`font-display font-bold text-xl ${series.id === s.id ? 'text-brand' : 'text-slate-300'}`}>
                                {s.id.toUpperCase()}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">{s.name}</div>
                        </button>
                    ))}
                </div>
                <motion.h1 key={series.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="font-display font-bold tracking-tight text-4xl sm:text-5xl leading-tight">
                    {series.name}
                </motion.h1>
                <p className="mt-4 max-w-2xl text-slate-400 leading-relaxed">{series.desc}</p>
            </section>

            <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto pb-8">
                <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500 mb-4">EXPLORE {series.name.toUpperCase()}</div>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" data-testid="model-selector">
                    {seriesProducts.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => selectProduct(p)}
                            data-testid={`model-card-${p.id}`}
                            className={`min-w-[200px] text-left rounded-2xl border p-5 transition-all duration-300 shrink-0 ${
                                product.id === p.id
                                    ? 'border-brand bg-brand/10'
                                    : 'border-white/10 bg-white/5 hover:border-white/25'
                            }`}
                        >
                            <div className={`font-display font-bold text-lg ${product.id === p.id ? 'text-brand' : 'text-white'}`}>{p.name}</div>
                            <div className="text-xs text-slate-400 mt-1">{p.tag}</div>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {p.badges.slice(0, 2).map((b) => (
                                    <span key={b} className="font-mono-xu text-[8px] tracking-[0.15em] border border-white/15 text-slate-400 rounded-full px-2 py-0.5">
                                        {b.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            <div className="sticky top-20 z-30 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
                <div className="flex gap-1 overflow-x-auto rounded-full border border-white/10 bg-slate-950/80 backdrop-blur-xl p-1.5 w-fit max-w-full" data-testid="product-tabs">
                    {TABS.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => selectTab(t.id)}
                            data-testid={`tab-${t.id}`}
                            className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                                tab === t.id ? 'bg-brand text-[#04150E]' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                    {tab === 'overview' && (
                        <>
                            <section id="overview" className="scroll-mt-32 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto py-14">
                                <div className="grid lg:grid-cols-2 gap-12 items-start">
                                    <div className="min-w-0">
                                        <MediaViewer variant={{ ...series.variant, ...(product.variant || {}) }} productName={product.name} />
                                    </div>
                                    <div>
                                        <div className="font-mono-xu text-[10px] tracking-[0.3em] text-brand">{series.name.toUpperCase()} // {product.id.toUpperCase()}</div>
                                        <h2 className="font-display font-bold tracking-tight text-4xl sm:text-5xl mt-3">{product.name}</h2>
                                        <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed max-w-lg">{product.desc}</p>
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {product.badges.map((b) => (
                                                <span key={b} className="font-mono-xu text-[10px] tracking-[0.2em] border border-brand/30 text-brand-soft rounded-full px-3 py-1">
                                                    {b.toUpperCase()}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-9 flex flex-col sm:flex-row gap-3">
                                            <Link
                                                to="/#contact"
                                                data-testid="product-cta-info"
                                                className="rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold tracking-wide px-8 py-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#00D084]/25"
                                            >
                                                Request Product Information
                                            </Link>
                                            <Link
                                                to={`/products/compare?product=${product.id}`}
                                                data-testid="product-cta-compare"
                                                className="rounded-full border border-white/20 hover:border-brand/60 text-slate-300 hover:text-white text-sm font-semibold tracking-wide px-8 py-4 text-center transition-all duration-300"
                                            >
                                                Compare This Gateway
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto py-14">
                                <SectionHead kicker="EXPLORE OTHER GATEWAYS" title="Related Products." />
                                <div className="mt-10 grid sm:grid-cols-3 gap-4">
                                    {related.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => selectProduct(p)}
                                            data-testid={`related-${p.id}`}
                                            className="text-left rounded-2xl border border-white/10 bg-white/5 hover:border-brand/40 p-6 transition-all duration-300 hover:-translate-y-1 group"
                                        >
                                            <div className="font-mono-xu text-[9px] tracking-[0.25em] text-slate-500">{seriesById(p.series).name.toUpperCase()}</div>
                                            <div className="font-display font-bold text-xl mt-2 group-hover:text-brand transition-colors">{p.name}</div>
                                            <div className="text-xs text-slate-400 mt-1">{p.tag}</div>
                                            <div className="mt-4 flex items-center gap-2 text-xs text-brand">
                                                View product <ArrowRight size={12} />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}

                    {tab === 'features' && (
                        <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto py-14">
                            <SectionHead kicker="KEY CAPABILITIES" title="Built for Modern Connectivity." />
                            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <AnimatePresence mode="popLayout">
                                    {product.caps.map((cap, i) => (
                                        <motion.div
                                            key={product.id + cap}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4, delay: i * 0.05 }}
                                            className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                        >
                                            <div className="font-mono-xu text-[10px] tracking-[0.3em] text-brand">{CAP_INFO[cap][0]}</div>
                                            <p className="text-sm text-slate-400 mt-3 leading-relaxed">{CAP_INFO[cap][1]}</p>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </section>
                    )}

                    {tab === 'specifications' && (
                        <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto py-14">
                            <SectionHead kicker="TECHNICAL SPECIFICATIONS" title={`${product.name} — Full Specification.`} desc="Expand a category to review detailed specifications. Capabilities marked — are not available on this model." />
                            <div className="mt-10">
                                <SpecTable key={product.id} specs={product.specs} />
                            </div>
                        </section>
                    )}

                    {tab === 'compare' && (
                        <section id="compare" className="scroll-mt-32 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto py-14">
                            <SectionHead
                                kicker="COMPARE GATEWAYS"
                                title="Find the Right Gateway for Your Needs."
                                desc="Select the technologies and capabilities you need. We'll show the gateways that match your requirements."
                            />
                            <div className="mt-10">
                                <CompareSection onSelect={selectProduct} />
                            </div>
                        </section>
                    )}

                    {tab === 'look' && (
                        <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto py-14" data-testid="look-and-feel-tab">
                            <BrandPreview fixedSeries={product.series} />
                        </section>
                    )}
                </motion.div>
            </AnimatePresence>

            <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto py-20">
                <div className="rounded-3xl border border-brand/20 bg-brand/5 p-10 sm:p-14 text-center">
                    <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl">Build the Right Connectivity Solution.</h2>
                    <p className="mt-4 text-slate-400 max-w-xl mx-auto leading-relaxed">
                        Talk with our team about product selection, white-label customization and deployment requirements.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/support" data-testid="catalog-cta-experts"
                            className="rounded-full border border-white/20 hover:border-brand/60 text-slate-200 hover:text-white text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300">
                            Talk to Our Experts
                        </Link>
                        <Link to="/#contact" data-testid="catalog-cta-info"
                            className="rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#00D084]/25">
                            Request Product Information
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
