import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Cpu, Cloud, Smartphone, Activity, BrainCircuit, Tag, Code2, CloudCog, Layers,
    MonitorCheck, Settings, BarChart3, Wrench, TrendingUp, ShieldCheck, Wifi,
    Share2, Radio, Lock, ArrowLeftRight, HardDrive, ArrowRight,
} from 'lucide-react';
import { SeriesVisual } from './SeriesVisual';
import { TrustedBy } from './TrustedBy';
import { LeadForm } from './LeadForm';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

function Section({ id, kicker, title, desc, children, className = '' }) {
    return (
        <section id={id} className={`relative z-10 py-24 sm:py-28 px-6 sm:px-12 md:px-24 ${className}`}>
            <div className="max-w-7xl mx-auto">
                <motion.div {...fadeUp} className="font-mono-xu text-[11px] tracking-[0.35em] text-sky-400 mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-current" />
                    {kicker}
                </motion.div>
                <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight text-white max-w-3xl">
                    {title}
                </motion.h2>
                {desc && (
                    <motion.p {...fadeUp} className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-slate-400">
                        {desc}
                    </motion.p>
                )}
                {children}
            </div>
        </section>
    );
}

const ECOSYSTEM = [
    { icon: Cpu, t: 'Advanced Hardware', d: 'White-label Wi-Fi gateways, routers and CPE — engineered per market.' },
    { icon: Cloud, t: 'Cloud Management', d: 'One scalable platform for provisioning, configuration and fleet control.' },
    { icon: Smartphone, t: 'Mobile Experience', d: 'Branded subscriber apps for setup, control and support.' },
    { icon: Activity, t: 'Network Intelligence', d: 'Telemetry and analytics across every device you deploy.' },
    { icon: BrainCircuit, t: 'AI-Powered Operations', d: 'Anomaly detection, prediction and self-optimization built in.' },
];

const WHITELABEL = [
    { icon: Tag, t: 'White-Label Hardware', d: 'Your casing, your colorway, your logo — our engineering.' },
    { icon: Smartphone, t: 'Branded Applications', d: 'Subscriber apps shipped under your brand on iOS and Android.' },
    { icon: CloudCog, t: 'Centralized Cloud Platform', d: 'Your operators manage everything from one branded console.' },
    { icon: Code2, t: 'Custom Development', d: 'Firmware, features and integrations built to your roadmap.' },
];

const CLOUD_FEATURES = [
    { icon: MonitorCheck, t: 'Real-Time Device Monitoring', d: 'Live health and status across the entire fleet.' },
    { icon: Settings, t: 'Remote Configuration', d: 'Push settings and firmware without a truck roll.' },
    { icon: BarChart3, t: 'Network Analytics', d: 'Usage, performance and experience trends per customer.' },
    { icon: Wrench, t: 'Remote Troubleshooting', d: 'Diagnose and resolve issues from the operations console.' },
    { icon: Layers, t: 'Fleet Management', d: 'Group, segment and operate millions of devices at once.' },
    { icon: TrendingUp, t: 'Scalable Operations', d: 'Infrastructure that grows with your subscriber base.' },
];

const AI_FEATURES = [
    { t: 'AI-Powered Troubleshooting', d: 'Likely root causes surfaced before the support call ends.' },
    { t: 'Intelligent Gateway Placement', d: 'Signal analysis guides installers to the optimal location.' },
    { t: 'Network Behavior Insights', d: 'Understand how households actually use the network.' },
    { t: 'Proactive Issue Detection', d: 'Anomalies flagged and often resolved before customers notice.' },
];

const INDUSTRIES = [
    {
        t: 'Internet Service Providers',
        d: 'Deploy and manage branded customer devices at scale with centralized operations and remote management.',
    },
    {
        t: 'Telecom Operators',
        d: 'Build scalable connectivity ecosystems with advanced gateways, cloud management, and intelligent network operations.',
    },
    {
        t: 'Network Solution Providers',
        d: 'Deliver flexible and customized networking solutions using advanced hardware and scalable software.',
    },
];

const CAPABILITIES = [
    { icon: Wifi, t: 'Advanced Wi-Fi', d: 'Wi-Fi 7, MLO, 320 MHz' },
    { icon: Share2, t: 'Mesh Networking', d: 'EasyMesh self-organizing coverage' },
    { icon: Radio, t: 'IoT Connectivity', d: 'Matter and Thread ready' },
    { icon: Cloud, t: 'Cloud Management', d: 'TR-369 / USP fleet control' },
    { icon: BrainCircuit, t: 'AI Intelligence', d: 'Detect, predict, optimize' },
    { icon: ShieldCheck, t: 'Enterprise Security', d: 'WPA3, hardened firmware' },
    { icon: Lock, t: 'Cybersecurity', d: 'Network-level threat protection' },
    { icon: ArrowLeftRight, t: 'SIM Backup', d: 'e-SIM / SIM failover' },
    { icon: Smartphone, t: 'Mobile App Control', d: 'Branded subscriber apps' },
    { icon: HardDrive, t: 'Local Management', d: 'On-device administration' },
];

const WHY = [
    { k: '10+', v: 'Years of Experience', d: 'A decade building carrier-grade connectivity.' },
    { k: 'ENG', v: 'Engineering Teams', d: 'Hardware, firmware, cloud and apps in-house.' },
    { k: 'R&D', v: 'Research & Development', d: 'Active programs in next-generation wireless.' },
    { k: 'OEM', v: 'Custom Development', d: 'Hardware and software shaped to each market.' },
    { k: 'E2E', v: 'Complete Ecosystem', d: 'Hardware, cloud, apps and intelligence — one partner.' },
];

function CloudVisual() {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6" data-testid="cloud-visual">
            <div className="flex items-center gap-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-sky-400/60" />
                <div className="ml-4 flex gap-4 font-mono-xu text-[9px] tracking-[0.25em] text-slate-500">
                    <span className="text-sky-400">FLEET</span>
                    <span>CONFIG</span>
                    <span>ANALYTICS</span>
                </div>
            </div>
            <svg viewBox="0 0 400 160" className="w-full" aria-hidden="true">
                <g stroke="#38BDF8" strokeOpacity="0.25" strokeWidth="1">
                    <line x1="200" y1="30" x2="60" y2="120" />
                    <line x1="200" y1="30" x2="130" y2="120" />
                    <line x1="200" y1="30" x2="200" y2="120" />
                    <line x1="200" y1="30" x2="270" y2="120" />
                    <line x1="200" y1="30" x2="340" y2="120" />
                </g>
                <circle cx="200" cy="30" r="10" fill="#0066FF" fillOpacity="0.9" />
                <circle cx="200" cy="30" r="16" fill="none" stroke="#38BDF8" strokeOpacity="0.4" />
                {[60, 130, 200, 340].map((x) => (
                    <circle key={x} cx={x} cy="120" r="6" fill="#7DD3FC" fillOpacity="0.8" />
                ))}
                <circle cx="270" cy="120" r="6" fill="#F59E0B" fillOpacity="0.9" />
                <circle cx="270" cy="120" r="11" fill="none" stroke="#F59E0B" strokeOpacity="0.5" strokeDasharray="3 3" />
                <text x="270" y="148" fill="#F59E0B" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="2">FLAGGED</text>
                <text x="200" y="14" fill="#7DD3FC" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="2">FLEET HUB</text>
            </svg>
        </div>
    );
}

function IntelVisual() {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6" data-testid="intel-visual">
            <div className="font-mono-xu text-[9px] tracking-[0.25em] text-slate-500 mb-4 flex justify-between">
                <span>NETWORK OBSERVATION</span>
                <span className="text-emerald-400">OPTIMIZED</span>
            </div>
            <svg viewBox="0 0 400 170" className="w-full" aria-hidden="true">
                <g stroke="#38BDF8" strokeOpacity="0.2" strokeWidth="1">
                    <line x1="70" y1="85" x2="150" y2="40" /><line x1="70" y1="85" x2="150" y2="130" />
                    <line x1="150" y1="40" x2="240" y2="60" /><line x1="150" y1="130" x2="240" y2="110" />
                    <line x1="240" y1="60" x2="330" y2="85" /><line x1="240" y1="110" x2="330" y2="85" />
                    <line x1="150" y1="40" x2="240" y2="110" /><line x1="150" y1="130" x2="240" y2="60" />
                </g>
                <path d="M 70 85 L 150 40 L 240 60 L 330 85" fill="none" stroke="#22C55E" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="70" cy="85" r="6" fill="#7DD3FC" />
                <circle cx="150" cy="40" r="6" fill="#7DD3FC" />
                <circle cx="150" cy="130" r="6" fill="#F43F5E" />
                <circle cx="150" cy="130" r="12" fill="none" stroke="#F43F5E" strokeOpacity="0.6" />
                <circle cx="240" cy="60" r="6" fill="#7DD3FC" />
                <circle cx="240" cy="110" r="6" fill="#7DD3FC" />
                <circle cx="330" cy="85" r="8" fill="#0066FF" />
                <text x="150" y="160" fill="#F43F5E" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="2">ANOMALY ISOLATED</text>
                <text x="250" y="18" fill="#22C55E" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="2">OPTIMIZATION PATH</text>
            </svg>
        </div>
    );
}

export function HomeSections() {
    return (
        <div className="relative z-10 text-white bg-[#020617]">
            <Section
                id="ecosystem"
                kicker="WHAT WE PROVIDE"
                title="One Complete Connectivity Ecosystem."
                desc="From advanced hardware to cloud intelligence, we provide the technology infrastructure needed to build, manage, and scale modern connectivity services."
                className="border-t border-white/5"
            >
                <div className="mt-10 flex flex-wrap items-center gap-2 font-mono-xu text-[10px] tracking-[0.25em] text-slate-500">
                    {['DEVICES', 'GATEWAY', 'CLOUD', 'MOBILE', 'INTELLIGENCE'].map((s, i) => (
                        <span key={s} className="flex items-center gap-2">
                            <span className="text-sky-400 border border-sky-400/30 rounded-full px-3 py-1.5">{s}</span>
                            {i < 4 && <ArrowRight size={12} className="text-slate-600" />}
                        </span>
                    ))}
                </div>
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {ECOSYSTEM.map((c, i) => (
                        <motion.div key={c.t} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-sky-400/40 transition-colors duration-300">
                            <c.icon size={20} className="text-sky-400" />
                            <div className="font-display font-semibold mt-4 text-sm">{c.t}</div>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{c.d}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section
                id="whitelabel"
                kicker="THE WHITE-LABEL ADVANTAGE"
                title="Your Brand. Our Technology."
                desc="Launch and scale your own branded connectivity ecosystem without building the entire technology stack from scratch."
            >
                <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
                    <div className="grid sm:grid-cols-2 gap-4">
                        {WHITELABEL.map((c, i) => (
                            <motion.div key={c.t} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <c.icon size={20} className="text-sky-400" />
                                <div className="font-display font-semibold mt-4 text-sm">{c.t}</div>
                                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{c.d}</p>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div {...fadeUp} className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-10 text-center" data-testid="whitelabel-visual">
                        <div className="rounded-2xl border-2 border-dashed border-sky-400/40 py-14 px-8">
                            <div className="font-mono-xu text-[10px] tracking-[0.4em] text-sky-400">YOUR BRAND HERE</div>
                            <div className="font-display font-bold text-3xl mt-4 text-white/80">Your Logo</div>
                            <div className="flex justify-center gap-2 mt-6">
                                {['#0066FF', '#22C55E', '#F59E0B', '#F43F5E'].map((c) => (
                                    <span key={c} className="w-5 h-5 rounded-full border border-white/20" style={{ background: c }} />
                                ))}
                            </div>
                        </div>
                        <p className="font-mono-xu text-[10px] tracking-[0.25em] text-slate-500 mt-6">
                            CASING · FIRMWARE · APP · CLOUD — ALL YOURS
                        </p>
                    </motion.div>
                </div>
            </Section>

            <Section
                id="portfolio"
                kicker="PRODUCT PORTFOLIO"
                title="Advanced Hardware. Built for What's Next."
                desc="Four series of gateways and CPE covering flagship Wi-Fi 7, mass-market fiber, cellular and outdoor deployments — all managed from the same cloud."
            >
                <div className="mt-12 grid lg:grid-cols-2 gap-8 items-stretch">
                    <motion.div {...fadeUp} className="rounded-3xl overflow-hidden border border-white/10 bg-slate-100">
                        <SeriesVisual label="D71 — FLAGSHIP" />
                    </motion.div>
                    <div className="grid gap-4">
                        {[
                            { id: 'd', n: 'D Series', d: 'Flagship Wi-Fi 7 tri-band gateway — the D71 leads the line.' },
                            { id: 'm', n: 'M Series', d: 'High-volume gateways for mass-market fiber rollouts.' },
                            { id: 'q', n: 'Q Series', d: '5G / LTE CPE with e-SIM and dual-SIM failover.' },
                            { id: 'o', n: 'O Series', d: 'Ruggedized outdoor units for hard-to-reach markets.' },
                        ].map((s, i) => (
                            <motion.div key={s.id} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
                                <Link to={`/series/${s.id}`} data-testid={`portfolio-${s.id}`}
                                    className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 hover:border-sky-400/40 p-5 transition-all duration-300 group">
                                    <span className="font-display font-bold text-2xl text-sky-400 w-8">{s.id.toUpperCase()}</span>
                                    <span className="flex-1">
                                        <span className="block font-display font-semibold text-sm text-white">{s.n}</span>
                                        <span className="block text-xs text-slate-400 mt-1">{s.d}</span>
                                    </span>
                                    <ArrowRight size={16} className="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all duration-300" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <motion.div {...fadeUp} className="mt-10">
                    <Link to="/product" data-testid="portfolio-cta"
                        className="inline-block rounded-full border border-sky-400/40 text-sky-300 hover:bg-sky-400/10 text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300">
                        Explore Product Portfolio
                    </Link>
                </motion.div>
            </Section>

            <Section
                id="cloud"
                kicker="CLOUD MANAGEMENT PLATFORM"
                title="Complete Visibility. Total Control."
                desc="Manage devices, configurations, customers, and network operations through one highly scalable cloud platform."
            >
                <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
                    <CloudVisual />
                    <div className="grid sm:grid-cols-2 gap-4">
                        {CLOUD_FEATURES.map((c, i) => (
                            <motion.div key={c.t} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                                className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <c.icon size={18} className="text-sky-400" />
                                <div className="font-display font-semibold mt-3 text-sm">{c.t}</div>
                                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{c.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section
                id="intelligence"
                kicker="INTELLIGENT NETWORK OPERATIONS"
                title="Turn Network Data Into Action."
                desc="Transform device and network data into meaningful insights that help teams detect issues, optimize performance, and improve customer experience."
            >
                <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
                    <div className="grid gap-4 order-2 lg:order-1">
                        {AI_FEATURES.map((c, i) => (
                            <motion.div key={c.t} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                                <BrainCircuit size={18} className="text-sky-400 shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-display font-semibold text-sm">{c.t}</div>
                                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{c.d}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="order-1 lg:order-2">
                        <IntelVisual />
                    </div>
                </div>
            </Section>

            <Section
                id="industries"
                kicker="BUILT FOR YOUR INDUSTRY"
                title="Built for the Businesses That Build Connectivity."
            >
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    {INDUSTRIES.map((g, i) => (
                        <motion.div key={g.t} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-8">
                            <div className="font-mono-xu text-[10px] tracking-[0.3em] text-sky-400">0{i + 1}</div>
                            <div className="font-display font-semibold text-lg mt-3">{g.t}</div>
                            <p className="mt-4 text-sm text-slate-400 leading-relaxed">{g.d}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <TrustedBy dark />

            <Section
                id="capabilities"
                kicker="TECHNOLOGY CAPABILITIES"
                title="Technology That Keeps Moving Forward."
            >
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {CAPABILITIES.map((c, i) => (
                        <motion.div key={c.t} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 4) * 0.05 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-sky-400/40 transition-colors duration-300">
                            <c.icon size={18} className="text-sky-400" />
                            <div className="font-display font-semibold mt-3 text-sm">{c.t}</div>
                            <p className="text-[11px] text-slate-500 mt-1.5">{c.d}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section
                id="why"
                kicker="WHY PARTNER WITH US"
                title="Built on Experience. Driven by Innovation."
            >
                <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
                    {WHY.map((w, i) => (
                        <motion.div key={w.v} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                            <div className="font-display font-bold text-2xl text-sky-400">{w.k}</div>
                            <div className="font-display font-semibold text-sm mt-2">{w.v}</div>
                            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{w.d}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <section id="contact" className="relative z-10 py-28 px-6 sm:px-12 md:px-24 border-t border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div {...fadeUp} className="font-mono-xu text-[11px] tracking-[0.35em] text-sky-400 mb-6 flex items-center justify-center gap-3">
                        <span className="w-8 h-px bg-current" />
                        GET STARTED
                        <span className="w-8 h-px bg-current" />
                    </motion.div>
                    <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight">
                        Ready to Build Your Connectivity Ecosystem?
                    </motion.h2>
                    <motion.p {...fadeUp} className="mt-6 text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto">
                        Partner with us to create advanced, scalable, and fully branded connectivity solutions for your customers.
                    </motion.p>
                    <motion.div {...fadeUp} className="mt-10 max-w-xl mx-auto text-left">
                        <LeadForm />
                    </motion.div>
                    <motion.div {...fadeUp} className="mt-6">
                        <Link to="/support" data-testid="cta-talk-to-team" className="text-sm text-slate-400 hover:text-sky-400 transition-colors underline underline-offset-4 decoration-slate-600">
                            Talk to Our Team
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
