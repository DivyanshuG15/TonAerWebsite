import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ShieldCheck, Cloud, BrainCircuit, Tag, Wrench } from 'lucide-react';
import { SeriesVisual } from './SeriesVisual';
import { TrustedBy } from './TrustedBy';
import { LeadForm } from './LeadForm';
import { IntelligenceShowcase } from './IntelligenceShowcase';
import { EcosystemFlow, HardwareSoftwareFlow, PlatformDashboard } from './home/HomeVisuals';
import { Testimonials } from './home/Testimonials';
import { CoverVisual } from './insights/CoverVisual';
import { SERIES, PRODUCTS } from '../data/catalog';
import { publishedArticles, featuredArticle } from '../data/insights';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

function Section({ id, kicker, title, desc, children, tone = 'white', center = false, testId }) {
    return (
        <section
            id={id}
            className={`relative z-10 py-16 md:py-24 px-6 sm:px-12 md:px-24 ${tone === 'alt' ? 'bg-[#F8FAFC]' : 'bg-white'}`}
            data-testid={testId || `section-${id}`}
        >
            <div className={`max-w-7xl mx-auto ${center ? 'text-center' : ''}`}>
                <motion.div {...fadeUp} className={`font-mono-xu text-[11px] tracking-[0.3em] text-[#00905F] mb-5 flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
                    <span className="w-8 h-px bg-current" />
                    {kicker}
                    {center && <span className="w-8 h-px bg-current" />}
                </motion.div>
                <motion.h2 {...fadeUp} className={`font-display font-bold tracking-tight text-2xl sm:text-3xl lg:text-4xl leading-tight text-slate-900 max-w-3xl ${center ? 'mx-auto' : ''}`}>
                    {title}
                </motion.h2>
                {desc && (
                    <motion.p {...fadeUp} className={`mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-slate-600 ${center ? 'mx-auto' : ''}`}>
                        {desc}
                    </motion.p>
                )}
                {children}
            </div>
        </section>
    );
}

/* 03 — Product portfolio: one dominant visual per series */
const SERIES_CAPS = {
    d: ['Wi-Fi 7 Tri-Band', '10G SFP+ WAN', 'EasyMesh Ready', 'Cloud Managed'],
    m: ['Wi-Fi 6 / 6E', 'Volume-Ready', 'Mesh Options', 'Cloud Managed'],
    q: ['5G / LTE Cellular', 'e-SIM + Dual SIM', 'WAN Failover', 'Cloud Managed'],
    o: ['Ruggedized Outdoor', 'PoE Powered', '-40°C to +65°C', 'Cloud Managed'],
};

function PortfolioShowcase() {
    const [active, setActive] = useState('d');
    const series = SERIES.find((s) => s.id === active);
    const flagship = PRODUCTS.find((p) => p.id === { d: 'd71', m: 'm40', q: 'q20', o: 'o10' }[active]) || PRODUCTS.find((p) => p.series === active);
    return (
        <div className="mt-12" data-testid="portfolio-showcase">
            <div className="flex gap-2 flex-wrap">
                {SERIES.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setActive(s.id)}
                        data-testid={`series-pill-${s.id}`}
                        className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                            active === s.id
                                ? 'border-[#00D084] bg-[#E6FBF3] text-slate-900'
                                : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900'
                        }`}
                    >
                        {s.name}
                    </button>
                ))}
            </div>
            <div className="mt-8 grid lg:grid-cols-2 gap-10 items-center">
                <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <SeriesVisual variant={series.variant} label={`${series.name.toUpperCase()} // ${flagship?.name?.toUpperCase() || ''}`} />
                </motion.div>
                <motion.div
                    key={active + '-copy'}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                >
                    <div className="font-mono-xu text-[10px] tracking-[0.3em] text-[#00905F]">{series.name.toUpperCase()}</div>
                    <h3 className="font-display font-bold tracking-tight text-2xl sm:text-3xl text-slate-900 mt-3">
                        {flagship ? flagship.tag : series.name}
                    </h3>
                    <p className="mt-4 text-slate-600 leading-relaxed max-w-lg">{series.desc}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {SERIES_CAPS[active].map((c) => (
                            <span key={c} className="font-mono-xu text-[10px] tracking-[0.12em] border border-slate-200 text-slate-600 rounded-full px-3 py-1.5">
                                {c.toUpperCase()}
                            </span>
                        ))}
                    </div>
                    <Link
                        to={`/product?series=${active}`}
                        data-testid={`series-explore-${active}`}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#00D084] hover:bg-[#00B874] text-[#04150E] text-sm font-semibold tracking-wide px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Explore {series.name} <ArrowRight size={15} />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

/* 08 — Solutions */
const SOLUTIONS = [
    { role: 'ISPs', task: 'Deploy, manage and monitor connected devices at scale.', flow: ['Deploy', 'Manage', 'Monitor', 'Optimize'] },
    { role: 'Telecom Operators', task: 'Deliver reliable connectivity experiences with centralized visibility.', flow: ['Deploy', 'Manage', 'Monitor', 'Optimize'] },
    { role: 'Network Service Providers', task: 'Combine hardware, cloud management and intelligence.', flow: ['Deploy', 'Manage', 'Monitor', 'Optimize'] },
];

/* 09 — Why TonAer */
const WHY = [
    { icon: ShieldCheck, t: 'Advanced Hardware', d: 'Connectivity devices designed for evolving requirements.' },
    { icon: Cloud, t: 'Cloud Management', d: 'Centralized visibility and control.' },
    { icon: BrainCircuit, t: 'Network Intelligence', d: 'Turn network data into actionable insight.' },
    { icon: Tag, t: 'White-Label', d: 'Deliver technology under your own brand.' },
    { icon: Wrench, t: 'Engineering', d: 'Technology built around customer requirements.' },
];

/* 11 — Insights teaser */
function InsightsTeaser() {
    const featured = featuredArticle();
    const latest = publishedArticles().filter((a) => !a.featured).slice(0, 2);
    return (
        <div className="mt-12 grid lg:grid-cols-2 gap-5" data-testid="insights-teaser">
            {featured && (
                <Link to={`/resources/blog/${featured.slug}`} className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300" data-testid="teaser-featured">
                    <CoverVisual category={featured.category} className="aspect-[16/8]" />
                    <div className="p-7">
                        <div className="font-mono-xu text-[9px] tracking-[0.2em] text-[#00905F]">FEATURED · {featured.category.toUpperCase()}</div>
                        <div className="font-display font-semibold text-xl text-slate-900 mt-2 leading-snug group-hover:text-[#00905F] transition-colors">{featured.title}</div>
                        <p className="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-2">{featured.excerpt}</p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00905F]">
                            Read More <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </span>
                    </div>
                </Link>
            )}
            <div className="grid gap-5">
                {latest.map((a) => (
                    <Link key={a.id} to={`/resources/blog/${a.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex gap-5 items-start" data-testid={`teaser-${a.slug}`}>
                        <div className="flex-1">
                            <div className="font-mono-xu text-[9px] tracking-[0.2em] text-[#00905F]">{a.category.toUpperCase()}</div>
                            <div className="font-display font-semibold text-slate-900 mt-2 leading-snug group-hover:text-[#00905F] transition-colors">{a.title}</div>
                            <div className="font-mono-xu text-[9px] tracking-[0.15em] text-slate-400 mt-3">{a.date.toUpperCase()} · {a.readingTime} MIN READ</div>
                        </div>
                        <ArrowUpRight size={16} className="text-slate-300 group-hover:text-[#00D084] shrink-0 mt-1 transition-colors" />
                    </Link>
                ))}
                <Link to="/resources/blog" data-testid="teaser-all" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00905F] hover:text-[#00B874] transition-colors pl-1">
                    Explore all insights <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
}

export function HomeSections() {
    return (
        <div className="relative z-10 bg-white text-slate-900">
            {/* 02 — ECOSYSTEM */}
            <Section
                id="ecosystem"
                tone="alt"
                kicker="CONNECTED ECOSYSTEM"
                title="Hardware. Software. Intelligence. One Connected Ecosystem."
                desc="TonAer brings together connectivity hardware, cloud-based management and network intelligence to help service providers build and manage better connected experiences."
            >
                <EcosystemFlow />
            </Section>

            {/* 03 — PORTFOLIO */}
            <Section
                id="portfolio"
                kicker="PRODUCT PORTFOLIO"
                title="Connectivity Built Around Your Network."
                desc="Explore TonAer's gateway portfolio, designed for evolving connectivity and network requirements."
            >
                <PortfolioShowcase />
            </Section>

            {/* 04 — HARDWARE → SOFTWARE */}
            <Section
                id="flow"
                tone="alt"
                kicker="INTEGRATED FLOW"
                title="Hardware and Software, Working as One."
                desc="From physical deployment to cloud visibility — every TonAer gateway is part of a managed, intelligent ecosystem."
            >
                <HardwareSoftwareFlow />
            </Section>

            {/* 05 — PLATFORM */}
            <Section
                id="platform"
                kicker="CLOUD MANAGEMENT"
                title="One Platform to Manage the Connected Experience."
                desc="Manage devices, monitor networks, troubleshoot remotely and gain actionable visibility through a centralized cloud platform."
            >
                <div className="mt-12 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
                    <PlatformDashboard />
                    <div className="space-y-1" data-testid="platform-caps">
                        {[
                            ['Zero-Touch Provisioning', 'Devices configure themselves on first boot.'],
                            ['Live Fleet Monitoring', 'Online status, health and performance in one view.'],
                            ['Remote Troubleshooting', 'Diagnose and resolve without a truck roll.'],
                            ['Fleet Analytics', 'Usage and experience trends across deployments.'],
                            ['OTA Firmware', 'Staged, verifiable updates across the fleet.'],
                        ].map(([t, d], i) => (
                            <motion.div key={t} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                                className="border-b border-slate-100 py-5 flex gap-4 items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] mt-2 shrink-0" />
                                <div>
                                    <div className="font-display font-semibold text-slate-900">{t}</div>
                                    <p className="text-sm text-slate-500 mt-1">{d}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* 06 — INTELLIGENCE (dark contrast section) */}
            <section id="intelligence" className="relative z-10 py-16 md:py-24 px-6 sm:px-12 md:px-24 bg-[#020617] text-white" data-testid="section-intelligence">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className="font-mono-xu text-[11px] tracking-[0.3em] text-brand mb-5 flex items-center gap-3">
                        <span className="w-8 h-px bg-current" />
                        NETWORK INTELLIGENCE
                    </motion.div>
                    <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-2xl sm:text-3xl lg:text-4xl leading-tight max-w-3xl">
                        Turn Network Data Into Action.
                    </motion.h2>
                    <motion.p {...fadeUp} className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-slate-400">
                        AI-powered diagnostics analyze gateway behavior in real time — detecting issues, recommending
                        actions and optimizing networks before subscribers notice.
                    </motion.p>
                    <div className="mt-12">
                        <IntelligenceShowcase />
                    </div>
                </div>
            </section>

            {/* 07 — WHITE-LABEL INTRO (lightweight; interactive tool lives in Product → Look & Feel) */}
            <Section
                id="whitelabel"
                tone="alt"
                kicker="WHITE-LABEL TECHNOLOGY"
                title="Your Brand. Your Experience. Our Technology."
                desc="Deliver branded connectivity experiences with white-labelled hardware, software and customer-facing applications."
            >
                <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
                    <motion.div {...fadeUp} className="relative">
                        <SeriesVisual variant={{}} label="D71 // WHITE-LABEL READY" />
                        <div className="absolute top-5 right-5 rounded-full border border-[#00D084]/40 bg-white/90 backdrop-blur px-4 py-2 font-mono-xu text-[9px] tracking-[0.2em] text-[#00905F]">
                            YOUR LOGO HERE
                        </div>
                    </motion.div>
                    <motion.div {...fadeUp}>
                        <h3 className="font-display font-bold tracking-tight text-2xl text-slate-900">See it with your brand.</h3>
                        <p className="mt-4 text-slate-600 leading-relaxed max-w-md">
                            Upload your logo and preview it on real TonAer hardware — casing finishes included where the
                            model supports them. The interactive preview lives with each product.
                        </p>
                        <Link
                            to="/product?tab=look"
                            data-testid="whitelabel-intro-cta"
                            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#00D084] hover:bg-[#00B874] text-[#04150E] text-sm font-semibold tracking-wide px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Explore White-Label <ArrowRight size={15} />
                        </Link>
                    </motion.div>
                </div>
            </Section>

            {/* 08 — SOLUTIONS */}
            <Section
                id="solutions"
                kicker="INDUSTRY SOLUTIONS"
                title="Built for the Businesses That Build Connectivity."
            >
                <div className="mt-12 grid md:grid-cols-3 gap-5" data-testid="solutions">
                    {SOLUTIONS.map((s, i) => (
                        <motion.div key={s.role} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                            <div className="font-display font-semibold text-lg text-slate-900">{s.role}</div>
                            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{s.task}</p>
                            <div className="mt-6 flex flex-wrap items-center gap-1.5">
                                {s.flow.map((f, j) => (
                                    <span key={f} className="flex items-center gap-1.5">
                                        <span className={`font-mono-xu text-[9px] tracking-[0.12em] rounded-full px-2.5 py-1 border ${j === 3 ? 'border-[#00D084]/40 text-[#00905F] bg-[#E6FBF3]' : 'border-slate-200 text-slate-500'}`}>
                                            {f.toUpperCase()}
                                        </span>
                                        {j < s.flow.length - 1 && <ArrowRight size={10} className="text-slate-300" />}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* 09 — WHY TONAER */}
            <Section
                id="why"
                tone="alt"
                kicker="WHY TONAER"
                title="One Partner for the Complete Connectivity Stack."
            >
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" data-testid="why-tonaer">
                    {WHY.map((w, i) => (
                        <motion.div key={w.t} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <w.icon size={18} className="text-[#00905F]" />
                            <div className="font-display font-semibold text-sm text-slate-900 mt-3">{w.t}</div>
                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{w.d}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* 10 — TRUST: verified names + sample testimonials */}
            <TrustedBy dark={false} />
            <Section
                id="proof"
                kicker="CUSTOMER PROOF"
                title="Trusted by Teams Building Connected Experiences."
                desc="See how businesses use TonAer technology to simplify connectivity, improve visibility and deliver better connected experiences."
            >
                <Testimonials />
            </Section>

            {/* 11 — INSIGHTS */}
            <Section
                id="insights"
                tone="alt"
                kicker="TONAER INSIGHTS"
                title="What We're Learning, Building and Thinking About."
            >
                <InsightsTeaser />
            </Section>

            {/* 12 — FINAL CTA + contact form */}
            <section id="contact" className="relative z-10 py-16 md:py-24 px-6 sm:px-12 md:px-24 bg-white" data-testid="section-contact">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div {...fadeUp} className="font-mono-xu text-[11px] tracking-[0.3em] text-[#00905F] mb-5 flex items-center justify-center gap-3">
                        <span className="w-8 h-px bg-current" />
                        GET STARTED
                        <span className="w-8 h-px bg-current" />
                    </motion.div>
                    <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight text-slate-900">
                        Build the Connected Experience You Want.
                    </motion.h2>
                    <motion.p {...fadeUp} className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
                        Explore TonAer's hardware, software and intelligent connectivity solutions.
                    </motion.p>
                    <motion.div {...fadeUp} className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/product" data-testid="cta-explore-products"
                            className="rounded-full bg-[#00D084] hover:bg-[#00B874] text-[#04150E] text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#00D084]/25">
                            Explore Products
                        </Link>
                        <button
                            onClick={() => document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                            data-testid="cta-talk-to-us"
                            className="rounded-full border border-slate-300 hover:border-[#00D084] text-slate-700 hover:text-slate-900 text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300"
                        >
                            Talk to Us
                        </button>
                    </motion.div>
                    <motion.div {...fadeUp} className="mt-12 max-w-xl mx-auto text-left rounded-3xl border border-slate-200 bg-[#F8FAFC] p-7 sm:p-9 shadow-sm">
                        <LeadForm light />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
