import { motion } from 'framer-motion';
import { Cpu, Wifi, Cloud, Database, BrainCircuit, Home, Zap } from 'lucide-react';
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
                        <div className="relative z-10 w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                            <n.icon size={17} className="text-[#00905F]" />
                        </div>
                        <div className="font-mono-xu text-[10px] tracking-[0.2em] text-slate-400 mt-5">0{i + 1}</div>
                        <div className="font-display font-semibold text-slate-900 mt-1.5">{n.label}</div>
                        <p className="text-sm text-slate-500 mt-2 leading-relaxed">{n.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* CH 04 — Connectivity bridge: hardware is not isolated */
export function ConnectivityBridge() {
    return (
        <div className="mt-16 rounded-3xl bg-[#020617] p-8 sm:p-14 overflow-hidden relative" data-testid="connectivity-bridge">
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#5CE8B4 1px, transparent 1px), linear-gradient(90deg, #5CE8B4 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-8 md:gap-6">
                {[
                    { icon: Cpu, label: 'TONAER GATEWAY', desc: 'Captures the connection' },
                    { icon: Wifi, label: 'NETWORK', desc: 'Carries the experience' },
                    { icon: Cloud, label: 'TONAER CLOUD', desc: 'Understands the fleet' },
                ].map((n, i) => (
                    <motion.div key={n.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.15 }} className="contents">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <n.icon size={24} className="text-[#00D084]" />
                            </div>
                            <div className="font-mono-xu text-[11px] tracking-[0.2em] text-white mt-5">{n.label}</div>
                            <p className="text-sm text-slate-500 mt-2">{n.desc}</p>
                        </div>
                        {i < 2 && (
                            <div className="hidden md:block relative h-px w-full min-w-[60px] bg-white/15">
                                <span className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00D084] flow-x" style={{ animationDelay: `${i * 0.7}s` }} />
                            </div>
                        )}
                    </motion.div>
                ))}
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
