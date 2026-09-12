import { motion } from 'framer-motion';
import { Cpu, Wifi, Cloud, Database, BrainCircuit, Home, Zap } from 'lucide-react';
import { SeriesVisual } from '../SeriesVisual';
import { fadeUp } from './Chapter';

/* CH 02 — The Ecosystem: one coherent aligned architecture */
const ECO_NODES = [
    { icon: Cpu, label: 'Hardware', desc: 'D / M / Q / O Series gateways engineered for the field' },
    { icon: Wifi, label: 'Connectivity', desc: 'Wi-Fi 7, cellular and mesh — wherever deployment demands' },
    { icon: Cloud, label: 'Cloud', desc: 'Centralized platform managing the entire fleet' },
    { icon: Database, label: 'Data', desc: 'Continuous telemetry from every connected device' },
    { icon: BrainCircuit, label: 'Intelligence', desc: 'Analytics and automation on live network behavior' },
    { icon: Home, label: 'Experience', desc: 'Better connected experiences for end customers' },
];

export function EcosystemArchitecture() {
    return (
        <div className="mt-16" data-testid="ecosystem-architecture">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-y-10">
                {ECO_NODES.map((n, i) => (
                    <motion.div
                        key={n.label}
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: i * 0.07 }}
                        className="relative lg:px-5 first:lg:pl-0 last:lg:pr-0"
                        data-testid={`eco-node-${i}`}
                    >
                        {/* connection line */}
                        {i < ECO_NODES.length - 1 && (
                            <span className="hidden lg:block absolute top-5 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-slate-200">
                                <span className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00D084] flow-x" style={{ animationDelay: `${i * 0.45}s`, position: 'absolute' }} />
                            </span>
                        )}
                        <n.icon size={20} className="text-[#00905F]" />
                        <div className="font-display font-semibold text-slate-900 mt-4">{n.label}</div>
                        <p className="text-sm text-slate-500 mt-2 leading-relaxed">{n.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* CH 04 — Connectivity bridge: real product, not abstract decoration */
export function ConnectivityBridge() {
    return (
        <div className="mt-16 rounded-3xl bg-[#020617] p-8 sm:p-14 overflow-hidden relative" data-testid="connectivity-bridge">
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#5CE8B4 1px, transparent 1px), linear-gradient(90deg, #5CE8B4 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
            <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_auto_1fr_auto_1fr] items-center gap-8 lg:gap-6">
                <motion.div {...fadeUp} className="text-center">
                    <SeriesVisual variant={{}} bare className="max-w-[300px] mx-auto" />
                    <div className="font-mono-xu text-[11px] tracking-[0.2em] text-white mt-2">TONAER GATEWAY</div>
                    <p className="text-sm text-slate-500 mt-2">Captures the connection</p>
                </motion.div>
                <div className="hidden lg:block relative h-px w-full min-w-[50px] bg-white/15">
                    <span className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00D084] flow-x" />
                </div>
                <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="text-center">
                    <Wifi size={30} className="mx-auto text-[#00D084]" />
                    <div className="font-mono-xu text-[11px] tracking-[0.2em] text-white mt-4">NETWORK</div>
                    <p className="text-sm text-slate-500 mt-2">Carries the experience</p>
                </motion.div>
                <div className="hidden lg:block relative h-px w-full min-w-[50px] bg-white/15">
                    <span className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00D084] flow-x" style={{ animationDelay: '0.7s' }} />
                </div>
                <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }} className="text-center">
                    <Cloud size={30} className="mx-auto text-[#00D084]" />
                    <div className="font-mono-xu text-[11px] tracking-[0.2em] text-white mt-4">TONAER CLOUD</div>
                    <p className="text-sm text-slate-500 mt-2">Understands the fleet</p>
                </motion.div>
            </div>
        </div>
    );
}

/* CH 06 — Signature flow: From Hardware to Intelligence */
const FLOW_STAGES = [
    { label: 'TonAer Hardware', desc: 'The gateway in the field' },
    { label: 'Network Data', desc: 'Live telemetry, continuously' },
    { label: 'TonAer Cloud', desc: 'One platform, every device' },
    { label: 'Analytics', desc: 'Patterns become meaning' },
    { label: 'Insights', desc: 'Issues explained, not just seen' },
    { label: 'Action', desc: 'Optimize before customers notice' },
];

export function SignatureFlow() {
    return (
        <div className="mt-16" data-testid="signature-flow">
            <div className="relative">
                {/* spine */}
                <span className="hidden lg:block absolute top-[7px] left-0 right-0 h-[2px] bg-slate-200">
                    <span className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#00D084] flow-x" />
                </span>
                <span className="lg:hidden absolute top-0 bottom-0 left-[7px] w-[2px] bg-slate-200" />
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-10">
                    {FLOW_STAGES.map((s, i) => (
                        <motion.div key={s.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="relative pl-8 lg:pl-0" data-testid={`flow-stage-${i}`}>
                            <span className={`block w-4 h-4 rounded-full border-[3px] ${i === FLOW_STAGES.length - 1 ? 'border-[#00D084] bg-[#00D084]/20' : 'border-slate-300 bg-white'} lg:mt-0 absolute lg:static left-0 top-1`} />
                            <div className="lg:mt-7">
                                <div className="font-mono-xu text-[10px] tracking-[0.2em] text-[#00905F]">0{i + 1}</div>
                                <div className="font-display font-semibold text-slate-900 mt-1">{s.label}</div>
                                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{s.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* CH 05 — The platform: large, realistic, clearly illustrative */
export function PlatformDashboard() {
    return (
        <motion.div {...fadeUp} className="mt-14 rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/8 overflow-hidden" data-testid="platform-dashboard">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 bg-slate-50">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D084]/60" />
                <span className="ml-4 font-mono-xu text-[10px] tracking-[0.2em] text-slate-500">TONAER CLOUD — FLEET CONSOLE</span>
                <span className="ml-auto font-mono-xu text-[8px] tracking-[0.15em] text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">ILLUSTRATIVE PREVIEW</span>
            </div>
            <div className="grid lg:grid-cols-[220px_1fr]">
                <div className="hidden lg:block border-r border-slate-100 p-5 space-y-1.5">
                    {['Fleet Overview', 'Gateways', 'Configuration', 'Analytics', 'Alerts', 'Firmware'].map((m, i) => (
                        <div key={m} className={`text-sm px-3 py-2.5 rounded-lg ${i === 0 ? 'bg-[#E6FBF3] text-[#00905F] font-semibold' : 'text-slate-500'}`}>{m}</div>
                    ))}
                </div>
                <div className="p-5 sm:p-8">
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { k: 'GATEWAYS ONLINE', v: '1,284', ok: true },
                            { k: 'FLEET HEALTH', v: 'Healthy', ok: true },
                            { k: 'OPEN ALERTS', v: '3', ok: false },
                        ].map((s) => (
                            <div key={s.k} className="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
                                <div className="font-mono-xu text-[9px] tracking-[0.18em] text-slate-400">{s.k}</div>
                                <div className={`font-display font-bold text-2xl mt-2 flex items-center gap-2 ${s.ok ? 'text-slate-900' : 'text-amber-600'}`}>
                                    {s.ok && <span className="w-2 h-2 rounded-full bg-[#00D084]" />}
                                    {s.v}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 rounded-xl border border-slate-100 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-mono-xu text-[9px] tracking-[0.18em] text-slate-400">NETWORK THROUGHPUT — LIVE</span>
                            <span className="font-mono-xu text-[8px] tracking-[0.15em] text-[#00905F]">DEMO DATA</span>
                        </div>
                        <svg viewBox="0 0 400 80" className="w-full" aria-hidden="true">
                            <path d="M0 60 Q 30 55 50 48 T 100 40 T 150 46 T 200 30 T 250 36 T 300 22 T 350 28 T 400 18" fill="none" stroke="#00D084" strokeWidth="2" />
                            <path d="M0 60 Q 30 55 50 48 T 100 40 T 150 46 T 200 30 T 250 36 T 300 22 T 350 28 T 400 18 L 400 80 L 0 80 Z" fill="#00D084" fillOpacity="0.07" />
                        </svg>
                    </div>
                    <div className="mt-5 rounded-xl border border-slate-100 divide-y divide-slate-100">
                        {[
                            ['D71 — Flagship Gateway', 'Online', true],
                            ['M40 — Wi-Fi 6E Gateway', 'Online', true],
                            ['Q20 — 5G CPE', 'Attention', false],
                        ].map(([name, st, ok]) => (
                            <div key={name} className="flex items-center gap-3 px-5 py-3.5">
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

export { Zap };

/* CH 07 — One unified dark technology moment: data → action */
const INTEL_STAGES = [
    {
        label: 'Network Data',
        desc: 'Live telemetry from every gateway',
        viz: (
            <svg viewBox="0 0 120 44" className="w-full h-11" aria-hidden="true">
                <path d="M0 26 Q 12 24 20 26 T 40 22 T 60 28 T 80 18 T 100 24 T 120 20" fill="none" stroke="#475569" strokeWidth="1.5" />
                <circle cx="80" cy="18" r="2.5" fill="#00D084" />
                <circle cx="40" cy="22" r="2" fill="#64748B" />
            </svg>
        ),
    },
    {
        label: 'Analytics',
        desc: 'Patterns separated from noise',
        viz: (
            <svg viewBox="0 0 120 44" className="w-full h-11" aria-hidden="true">
                {[10, 26, 42, 58, 74, 90, 106].map((x, i) => (
                    <rect key={x} x={x} y={36 - [8, 14, 10, 20, 16, 28, 22][i]} width="8" rx="2" fill={i === 5 ? '#00D084' : '#475569'} />
                ))}
            </svg>
        ),
    },
    {
        label: 'Insights',
        desc: 'Anomalies surfaced with context',
        viz: (
            <svg viewBox="0 0 120 44" className="w-full h-11" aria-hidden="true">
                <path d="M0 30 L100 30" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 5" />
                <circle cx="60" cy="16" r="5" fill="none" stroke="#00D084" strokeWidth="1.5" />
                <circle cx="60" cy="16" r="1.8" fill="#00D084" />
                <text x="60" y="42" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="1">ANOMALY DETECTED</text>
            </svg>
        ),
    },
    {
        label: 'Intelligence',
        desc: 'Behavior understood across the fleet',
        viz: (
            <svg viewBox="0 0 120 44" className="w-full h-11" aria-hidden="true">
                {[18, 12, 6].map((r, i) => (
                    <circle key={r} cx="60" cy="22" r={r} fill="none" stroke={i === 2 ? '#00D084' : '#334155'} strokeWidth="1.5" strokeDasharray={i === 1 ? '4 4' : undefined} />
                ))}
                <circle cx="60" cy="22" r="2" fill="#00D084" />
            </svg>
        ),
    },
    {
        label: 'Action',
        desc: 'Networks optimized before customers notice',
        viz: (
            <div className="h-11 flex items-center justify-center">
                <span className="font-mono-xu text-[9px] tracking-[0.15em] text-[#04150E] bg-[#00D084] rounded-full px-3.5 py-1.5">OPTIMIZED</span>
            </div>
        ),
    },
];

export function IntelligenceMoment() {
    return (
        <div className="mt-16" data-testid="intelligence-moment">
            <div className="relative">
                {/* continuous spine */}
                <span className="hidden lg:block absolute top-[22px] left-0 right-0 h-px bg-white/10">
                    <span className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00D084] flow-x" />
                    <span className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00D084] flow-x" style={{ animationDelay: '1.4s' }} />
                </span>
                <span className="lg:hidden absolute top-0 bottom-0 left-[22px] w-px bg-white/10" />
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-12 lg:gap-x-8">
                    {INTEL_STAGES.map((s, i) => (
                        <motion.div key={s.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="relative pl-16 lg:pl-0" data-testid={`intel-stage-${i}`}>
                            <span className={`absolute lg:relative left-0 top-1 lg:top-0 lg:mx-auto block w-11 h-11 rounded-full border flex items-center justify-center ${i === INTEL_STAGES.length - 1 ? 'border-[#00D084] bg-[#00D084]/10' : 'border-white/15 bg-[#020617]'}`}>
                                <span className={`w-2 h-2 rounded-full ${i === INTEL_STAGES.length - 1 ? 'bg-[#00D084]' : 'bg-slate-500'}`} />
                            </span>
                            <div className="lg:mt-6 lg:text-center">
                                {s.viz}
                                <div className="font-display font-semibold text-white mt-4">{s.label}</div>
                                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{s.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <motion.p {...fadeUp} className="mt-16 text-center text-slate-400 text-[15px] max-w-2xl mx-auto leading-relaxed">
                AI-powered diagnostics analyze gateway behavior in real time — detecting issues, recommending actions and
                optimizing networks before subscribers notice.
            </motion.p>
        </div>
    );
}
