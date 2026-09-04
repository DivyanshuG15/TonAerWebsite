import { motion } from 'framer-motion';
import { Cpu, Cloud, Database, BrainCircuit, Home, ArrowRight } from 'lucide-react';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

/* 02 — Ecosystem: one connected flow from hardware to experience */
const ECO_NODES = [
    { icon: Cpu, label: 'Gateway', desc: 'D / M / Q / O Series hardware' },
    { icon: Cloud, label: 'TonAer Cloud', desc: 'Centralized management platform' },
    { icon: Database, label: 'Network Data', desc: 'Continuous fleet telemetry' },
    { icon: BrainCircuit, label: 'Intelligence', desc: 'Analytics & automation' },
    { icon: Home, label: 'Connected Experience', desc: 'Better service for customers' },
];

export function EcosystemFlow() {
    return (
        <div className="mt-14" data-testid="ecosystem-flow">
            <div className="grid md:grid-cols-5 gap-4 md:gap-0 md:items-stretch">
                {ECO_NODES.map((n, i) => (
                    <motion.div key={n.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="relative flex md:block">
                        <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-[#E6FBF3] border border-[#00D084]/20 flex items-center justify-center">
                                <n.icon size={18} className="text-[#00905F]" />
                            </div>
                            <div className="font-display font-semibold text-slate-900 mt-4">{n.label}</div>
                            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{n.desc}</p>
                        </div>
                        {i < ECO_NODES.length - 1 && (
                            <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-8 justify-center">
                                <ArrowRight size={15} className="text-[#00D084]" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* 04 — Hardware to software pipeline */
const PIPELINE = ['TonAer Gateway', 'Network Connection', 'TonAer Cloud', 'Device Management', 'Analytics', 'Intelligent Insights'];

export function HardwareSoftwareFlow() {
    return (
        <div className="mt-14" data-testid="hw-sw-flow">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    {PIPELINE.map((step, i) => (
                        <motion.div key={step} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }} className="flex lg:flex-1 items-center gap-3">
                            <div className={`flex items-center gap-3 rounded-full border px-5 py-3 whitespace-nowrap ${
                                i === 0 || i === PIPELINE.length - 1
                                    ? 'border-[#00D084]/40 bg-[#E6FBF3] text-slate-900'
                                    : 'border-slate-200 bg-slate-50 text-slate-600'
                            }`}>
                                <span className="font-mono-xu text-[10px] text-[#00905F]">0{i + 1}</span>
                                <span className="text-sm font-medium">{step}</span>
                            </div>
                            {i < PIPELINE.length - 1 && <ArrowRight size={14} className="text-slate-300 shrink-0 rotate-90 lg:rotate-0 ml-4 lg:ml-0" />}
                        </motion.div>
                    ))}
                </div>
                <p className="mt-8 text-sm text-slate-500 leading-relaxed max-w-2xl">
                    TonAer is not just a hardware company. The hardware and software work together as one ecosystem —
                    every gateway ships cloud-ready, and every deployment feeds the intelligence layer.
                </p>
            </div>
        </div>
    );
}

/* 05 — Illustrative platform dashboard (clearly marked demo data) */
export function PlatformDashboard() {
    return (
        <motion.div {...fadeUp} className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden" data-testid="platform-dashboard">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 bg-slate-50">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D084]/60" />
                <span className="ml-4 font-mono-xu text-[10px] tracking-[0.2em] text-slate-500">TONAER CLOUD — FLEET CONSOLE</span>
                <span className="ml-auto font-mono-xu text-[8px] tracking-[0.15em] text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">ILLUSTRATIVE PREVIEW</span>
            </div>
            <div className="grid lg:grid-cols-[220px_1fr]">
                <div className="hidden lg:block border-r border-slate-100 p-5 space-y-4">
                    {['Fleet Overview', 'Gateways', 'Configuration', 'Analytics', 'Alerts', 'Firmware'].map((m, i) => (
                        <div key={m} className={`text-sm px-3 py-2 rounded-lg ${i === 0 ? 'bg-[#E6FBF3] text-[#00905F] font-semibold' : 'text-slate-500'}`}>{m}</div>
                    ))}
                </div>
                <div className="p-5 sm:p-7">
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { k: 'GATEWAYS ONLINE', v: '1,284', ok: true },
                            { k: 'FLEET HEALTH', v: 'Healthy', ok: true },
                            { k: 'OPEN ALERTS', v: '3', ok: false },
                        ].map((s) => (
                            <div key={s.k} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                                <div className="font-mono-xu text-[8px] tracking-[0.18em] text-slate-400">{s.k}</div>
                                <div className={`font-display font-bold text-xl mt-1.5 flex items-center gap-2 ${s.ok ? 'text-slate-900' : 'text-amber-600'}`}>
                                    {s.ok && <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />}
                                    {s.v}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 rounded-xl border border-slate-100 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-mono-xu text-[8px] tracking-[0.18em] text-slate-400">NETWORK THROUGHPUT — LIVE</span>
                            <span className="font-mono-xu text-[8px] tracking-[0.15em] text-[#00905F]">DEMO DATA</span>
                        </div>
                        <svg viewBox="0 0 400 80" className="w-full" aria-hidden="true">
                            <path d="M0 60 Q 30 55 50 48 T 100 40 T 150 46 T 200 30 T 250 36 T 300 22 T 350 28 T 400 18" fill="none" stroke="#00D084" strokeWidth="2" />
                            <path d="M0 60 Q 30 55 50 48 T 100 40 T 150 46 T 200 30 T 250 36 T 300 22 T 350 28 T 400 18 L 400 80 L 0 80 Z" fill="#00D084" fillOpacity="0.07" />
                        </svg>
                    </div>
                    <div className="mt-4 rounded-xl border border-slate-100 divide-y divide-slate-100">
                        {[
                            ['D71 — Flagship Gateway', 'Online', true],
                            ['M40 — Wi-Fi 6E Gateway', 'Online', true],
                            ['Q20 — 5G CPE', 'Attention', false],
                        ].map(([name, st, ok]) => (
                            <div key={name} className="flex items-center gap-3 px-4 py-3">
                                <span className={`w-2 h-2 rounded-full ${ok ? 'bg-[#00D084]' : 'bg-amber-400'}`} />
                                <span className="text-sm text-slate-700 flex-1">{name}</span>
                                <span className={`font-mono-xu text-[9px] tracking-[0.15em] ${ok ? 'text-[#00905F]' : 'text-amber-600'}`}>{st.toUpperCase()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
