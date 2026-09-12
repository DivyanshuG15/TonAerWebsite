import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Chapter, fadeUp } from './home/Chapter';
import { EcosystemArchitecture, ConnectivityBridge, SignatureFlow, PlatformDashboard, IntelligenceMoment } from './home/HomeVisuals';
import { Testimonials } from './home/Testimonials';
import { RequestDemoForm } from './home/RequestDemoForm';
import { SeriesVisual } from './SeriesVisual';
import { TrustedBy } from './TrustedBy';
import { CoverVisual } from './insights/CoverVisual';
import { SERIES, PRODUCTS } from '../data/catalog';
import { publishedArticles, featuredArticle } from '../data/insights';

/* CH 03 — Hardware showcase: engineering annotations from real catalog data */
const SERIES_NOTES = {
    d: ['Wi-Fi 7 Tri-Band', '10G SFP+ WAN', 'EasyMesh Ready', 'Cloud Managed'],
    m: ['Wi-Fi 6E Tri-Band', '2.5G WAN', 'EasyMesh Ready', 'Cloud Managed'],
    q: ['5G + e-SIM', 'Dual SIM Failover', 'Voice (RJ11)', 'Cloud Managed'],
    o: ['IP-Rated Outdoor', 'PoE 802.3at', '-40°C to +65°C', 'Cloud Managed'],
};
const FLAGSHIP = { d: 'd71', m: 'm40', q: 'q20', o: 'o10' };

function HardwareShowcase() {
    const [active, setActive] = useState('d');
    const series = SERIES.find((s) => s.id === active);
    const product = PRODUCTS.find((p) => p.id === FLAGSHIP[active]);
    return (
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 items-center" data-testid="hardware-showcase">
            <motion.div key={active} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <SeriesVisual variant={series.variant} label={`${product.name.toUpperCase()} // ${series.name.toUpperCase()}`} />
            </motion.div>
            <motion.div key={active + '-copy'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
                <div className="flex gap-2 flex-wrap">
                    {SERIES.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setActive(s.id)}
                            data-testid={`series-pill-${s.id}`}
                            className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${
                                active === s.id
                                    ? 'border-[#00D084] bg-[#E6FBF3] text-slate-900'
                                    : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900'
                            }`}
                        >
                            {s.name}
                        </button>
                    ))}
                </div>
                <h3 className="font-display font-bold tracking-tight text-3xl text-slate-900 mt-7">{product.name} — {product.tag}</h3>
                <p className="mt-4 text-[17px] text-slate-600 leading-relaxed">{product.desc}</p>
                <div className="mt-7 divide-y divide-slate-100 border-y border-slate-100">
                    {SERIES_NOTES[active].map((n) => (
                        <div key={n} className="flex items-center gap-3 py-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
                            <span className="font-mono-xu text-[12px] tracking-[0.12em] text-slate-700">{n.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
                <Link
                    to={`/product?series=${active}&model=${product.id}`}
                    data-testid={`series-explore-${active}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#00D084] hover:bg-[#00B874] text-[#04150E] text-sm font-semibold tracking-wide px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
                >
                    Explore {series.name} <ArrowRight size={15} />
                </Link>
            </motion.div>
        </div>
    );
}

/* CH 08 — Business value: editorial rows, not cards */
const OUTCOMES = [
    { id: 'connect', word: 'Connect', desc: 'Reliable connected infrastructure — hardware engineered for real deployments.' },
    { id: 'manage', word: 'Manage', desc: 'Centralized visibility and control across every device in the fleet.' },
    { id: 'understand', word: 'Understand', desc: 'Actionable network intelligence, from live telemetry to root cause.' },
    { id: 'grow', word: 'Grow', desc: 'Scalable connected experiences under your own brand.' },
];

/* CH 09 — Solutions: editorial rows */
const SOLUTIONS = [
    { role: 'Internet Service Providers', task: 'Deploy, manage and monitor connected devices at scale — with fewer truck rolls and faster resolution.', flow: ['Deploy', 'Manage', 'Monitor', 'Optimize'] },
    { role: 'Telecom Operators', task: 'Deliver reliable connectivity experiences with centralized visibility across the installed base.', flow: ['Deploy', 'Manage', 'Monitor', 'Optimize'] },
    { role: 'Network Service Providers', task: 'Combine hardware, cloud management and intelligence into one managed offering.', flow: ['Deploy', 'Manage', 'Monitor', 'Optimize'] },
];

/* CH 11 — Insights teaser (editorial) */
function InsightsTeaser() {
    const featured = featuredArticle();
    const latest = publishedArticles().filter((a) => !a.featured).slice(0, 2);
    return (
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start" data-testid="insights-teaser">
            {featured && (
                <Link to={`/resources/blog/${featured.slug}`} className="group block" data-testid="teaser-featured">
                    <div className="rounded-2xl overflow-hidden border border-slate-200">
                        <CoverVisual category={featured.category} className="aspect-[16/9]" />
                    </div>
                    <div className="font-mono-xu text-[10px] tracking-[0.2em] text-[#00905F] mt-5">FEATURED · {featured.category.toUpperCase()}</div>
                    <div className="font-display font-semibold text-2xl text-slate-900 mt-2 leading-snug group-hover:text-[#00905F] transition-colors">{featured.title}</div>
                    <p className="text-[15px] text-slate-500 mt-3 leading-relaxed line-clamp-2">{featured.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00905F]">
                        Read More <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                </Link>
            )}
            <div className="divide-y divide-slate-200 border-y border-slate-200">
                {latest.map((a) => (
                    <Link key={a.id} to={`/resources/blog/${a.slug}`} className="group flex gap-5 items-start py-7 first:pt-0 last:pb-0 lg:first:pt-7 lg:last:pb-7" data-testid={`teaser-${a.slug}`}>
                        <div className="flex-1">
                            <div className="font-mono-xu text-[10px] tracking-[0.2em] text-[#00905F]">{a.category.toUpperCase()}</div>
                            <div className="font-display font-semibold text-lg text-slate-900 mt-2 leading-snug group-hover:text-[#00905F] transition-colors">{a.title}</div>
                            <div className="font-mono-xu text-[9px] tracking-[0.15em] text-slate-400 mt-3">{a.date.toUpperCase()} · {a.readingTime} MIN READ</div>
                        </div>
                        <ArrowUpRight size={18} className="text-slate-300 group-hover:text-[#00D084] shrink-0 mt-1.5 transition-colors" />
                    </Link>
                ))}
                <div className="py-6">
                    <Link to="/resources/blog" data-testid="teaser-all" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00905F] hover:text-[#00B874] transition-colors">
                        Explore all insights <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export function HomeSections() {
    return (
        <div className="relative z-10 bg-white text-slate-900">
            {/* CH 02 — ECOSYSTEM */}
            <Chapter
                id="ecosystem"
                kicker="Integrated Flow"
                tone="alt"
                title="Hardware and Software, Working as One."
                desc="From the device in the field to the data in the cloud, TonAer brings connectivity, management and intelligence together in one ecosystem."
            >
                <EcosystemArchitecture />
            </Chapter>

            {/* CH — HARDWARE */}
            <Chapter
                id="hardware"
                kicker="Hardware"
                title="Built to Connect. Designed to Perform."
                desc="A gateway portfolio engineered for evolving connectivity and network requirements — from flagship broadband to outdoor and cellular deployments."
            >
                <HardwareShowcase />
            </Chapter>

            {/* CH — CONNECTIVITY */}
            <Chapter
                id="connectivity"
                kicker="Connectivity"
                title="Connectivity Built Around Your Network."
                desc="TonAer hardware is never isolated. Every gateway connects into the same managed ecosystem from the moment it powers on."
            >
                <ConnectivityBridge />
            </Chapter>

            {/* CH — SOFTWARE */}
            <Chapter
                id="platform"
                kicker="Software"
                tone="alt"
                title="One Platform. Complete Visibility."
                desc="Manage devices, monitor networks, troubleshoot remotely and gain actionable visibility through a centralized cloud platform."
            >
                <PlatformDashboard />
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6" data-testid="platform-caps">
                    {[
                        ['Device Visibility', 'Every gateway, online status and health in one view.'],
                        ['Network Monitoring', 'Live performance across the deployment.'],
                        ['Remote Management', 'Configure and troubleshoot without a site visit.'],
                        ['Analytics & Alerts', 'Fleet trends and issues surfaced early.'],
                    ].map(([t, d]) => (
                        <div key={t} className="border-t-2 border-slate-200 pt-4">
                            <div className="font-display font-semibold text-slate-900">{t}</div>
                            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{d}</p>
                        </div>
                    ))}
                </div>
            </Chapter>

            {/* CH — HARDWARE TO INTELLIGENCE (signature) */}
            <Chapter
                id="journey"
                kicker="The TonAer Flow"
                title="From Hardware to Intelligence."
                desc="One continuous journey — the connection captured by the device becomes the intelligence that improves it."
            >
                <SignatureFlow />
            </Chapter>

            {/* CH — DATA / INTELLIGENCE (one deliberate dark technology moment) */}
            <Chapter
                id="intelligence"
                kicker="Intelligence"
                dark
                title={<>Turn Network Data <span className="text-brand">Into Action.</span></>}
            >
                <IntelligenceMoment />
            </Chapter>

            {/* CH — BUSINESS VALUE */}
            <Chapter
                id="value"
                kicker="Business Value"
                title="Technology That Works for Your Business."
            >
                <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200" data-testid="business-value">
                    {OUTCOMES.map((o, i) => (
                        <motion.div key={o.id} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                            className="grid md:grid-cols-[80px_1fr_1.4fr] gap-3 md:gap-8 py-8 items-baseline" data-testid={`outcome-${o.id}`}>
                            <span className="font-mono-xu text-[12px] tracking-[0.2em] text-[#00905F]">0{i + 1}</span>
                            <span className="font-display font-bold tracking-tight text-3xl md:text-4xl text-slate-900">{o.word}</span>
                            <span className="text-[16px] text-slate-600 leading-relaxed">{o.desc}</span>
                        </motion.div>
                    ))}
                </div>
            </Chapter>

            {/* CH 09 — SOLUTIONS + WHITE-LABEL */}
            <Chapter
                id="solutions"
                kicker="Connected Experience"
                tone="alt"
                title="Built for the Businesses That Build Connectivity."
            >
                <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200" data-testid="solutions">
                    {SOLUTIONS.map((s, i) => (
                        <motion.div key={s.role} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.07 }}
                            className="grid md:grid-cols-[1fr_1.4fr_auto] gap-4 md:gap-10 py-8 items-center">
                            <div className="font-display font-semibold text-xl text-slate-900">{s.role}</div>
                            <p className="text-[15px] text-slate-600 leading-relaxed">{s.task}</p>
                            <div className="flex flex-wrap items-center gap-1.5">
                                {s.flow.map((f, j) => (
                                    <span key={f} className="flex items-center gap-1.5">
                                        <span className={`font-mono-xu text-[9px] tracking-[0.12em] rounded-full px-2.5 py-1 border ${j === s.flow.length - 1 ? 'border-[#00D084]/40 text-[#00905F] bg-[#E6FBF3]' : 'border-slate-200 text-slate-500'}`}>
                                            {f.toUpperCase()}
                                        </span>
                                        {j < s.flow.length - 1 && <ArrowRight size={10} className="text-slate-300" />}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* White-label — editorial band */}
                <motion.div {...fadeUp} className="mt-14 grid md:grid-cols-[1.6fr_1fr] gap-8 items-center rounded-2xl bg-[#020617] p-8 sm:p-12" data-testid="whitelabel-band">
                    <div>
                        <div className="font-mono-xu text-[10px] tracking-[0.25em] text-brand">WHITE-LABEL TECHNOLOGY</div>
                        <div className="font-display font-bold tracking-tight text-2xl sm:text-3xl text-white mt-4">
                            Your Brand. Your Experience. Our Technology.
                        </div>
                        <p className="mt-3 text-[15px] text-slate-400 leading-relaxed max-w-xl">
                            Deliver branded connectivity experiences with white-labelled hardware, software and customer-facing applications.
                        </p>
                    </div>
                    <div className="md:text-right">
                        <Link
                            to="/product?tab=look"
                            data-testid="whitelabel-intro-cta"
                            className="inline-flex items-center gap-2 rounded-full bg-[#00D084] hover:bg-[#00B874] text-[#04150E] text-sm font-semibold tracking-wide px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Explore White-Label <ArrowRight size={15} />
                        </Link>
                    </div>
                </motion.div>
            </Chapter>

            {/* CH 10 — PROOF */}
            <TrustedBy dark={false} />
            <Chapter
                id="proof"
                kicker="Proof"
                title="Trusted by Teams Building Connected Experiences."
                desc="See how businesses use TonAer technology to simplify connectivity, improve visibility and deliver better connected experiences."
            >
                <Testimonials />
            </Chapter>

            {/* CH — INSIGHTS */}
            <Chapter
                id="insights"
                kicker="Insights"
                tone="alt"
                title="What We're Learning, Building and Thinking About."
            >
                <InsightsTeaser />
            </Chapter>

            {/* CH 12 — LET'S CONNECT */}
            <section id="contact" className="relative z-10 py-24 md:py-32 px-6 sm:px-10 bg-white" data-testid="chapter-contact">
                <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-8 h-[2px] bg-[#00D084]" />
                            <span className="text-[13px] max-sm:text-[12px] font-semibold tracking-[0.16em] text-[#00905F] uppercase">Let's Connect</span>
                        </div>
                        <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-[clamp(2.1rem,4.2vw,3.75rem)] leading-[1.08] text-slate-900">
                            Build the Connected Experience You Want.
                        </motion.h2>
                        <motion.p {...fadeUp} className="mt-6 text-[17px] text-slate-600 leading-relaxed max-w-lg">
                            Tell us what you're building. Let's explore how TonAer can connect the hardware, network,
                            software and intelligence behind it.
                        </motion.p>
                        <motion.ul {...fadeUp} className="mt-9 space-y-4">
                            {['Connected hardware', 'Centralized visibility', 'Intelligent analytics'].map((b) => (
                                <li key={b} className="flex items-center gap-3 text-[15px] font-medium text-slate-700">
                                    <span className="w-6 h-6 rounded-full bg-[#E6FBF3] border border-[#00D084]/30 flex items-center justify-center">
                                        <Check size={13} className="text-[#00905F]" />
                                    </span>
                                    {b}
                                </li>
                            ))}
                        </motion.ul>
                    </div>
                    <motion.div {...fadeUp} className="rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/8 p-7 sm:p-10">
                        <RequestDemoForm />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
