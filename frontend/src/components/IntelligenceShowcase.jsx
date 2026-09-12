import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrainCircuit, Crosshair, BarChart3, Radar } from 'lucide-react';

const FEATURES = [
    {
        icon: BrainCircuit,
        t: 'AI-Powered Troubleshooting',
        d: 'Identify likely root causes and guide support teams toward faster resolution.',
    },
    {
        icon: Crosshair,
        t: 'Intelligent Gateway Placement',
        d: 'Analyze signal conditions and help identify the optimal gateway location.',
    },
    {
        icon: BarChart3,
        t: 'Network Behavior Insights',
        d: 'Understand usage patterns, device activity, and network performance over time.',
    },
    {
        icon: Radar,
        t: 'Proactive Issue Detection',
        d: 'Detect unusual network behavior and potential issues before they impact customers.',
    },
];

function usePhase(count, ms) {
    const [phase, setPhase] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setPhase((p) => (p + 1) % count), ms);
        return () => clearInterval(id);
    }, [count, ms]);
    return phase;
}

function Caption({ text, tone }) {
    const tones = {
        amber: 'border-amber-400/40 text-amber-300',
        sky: 'border-brand/40 text-brand-soft',
        emerald: 'border-emerald-400/40 text-emerald-300',
        slate: 'border-white/15 text-slate-400',
    };
    return (
        <div className={`mt-4 inline-block font-mono-xu text-[10px] tracking-[0.25em] border rounded-full px-4 py-2 transition-colors duration-500 ${tones[tone]}`}>
            {text}
        </div>
    );
}

function TroubleshootDemo() {
    const phase = usePhase(4, 2600);
    const solved = phase === 3;
    const issueColor = solved ? '#22C55E' : '#F59E0B';
    const captions = [
        ['ISSUE DETECTED — NODE 12 DEGRADED', 'amber'],
        ['ANALYZING SIGNAL · LATENCY · DEVICES · BEHAVIOR', 'sky'],
        ['ROOT CAUSE IDENTIFIED — UPLINK CONGESTION', 'amber'],
        ['ACTION APPLIED — CHANNEL OPTIMIZED', 'emerald'],
    ];
    return (
        <div className="text-center">
            <svg viewBox="0 0 420 190" className="w-full" aria-hidden="true">
                <g stroke="#00D084" strokeOpacity="0.25" strokeWidth="1">
                    <line x1="40" y1="60" x2="95" y2="95" />
                    <line x1="40" y1="140" x2="95" y2="105" />
                    <line x1="95" y1="100" x2="190" y2="100" />
                </g>
                <line x1="190" y1="100" x2="300" y2="100" stroke={solved ? '#22C55E' : '#00D084'} strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="6 6" className="xu-dash" />
                <circle cx="40" cy="60" r="6" fill="#5CE8B4" />
                <circle cx="40" cy="140" r="6" fill="#5CE8B4" />
                <circle cx="95" cy="100" r="8" fill={issueColor} className="xu-color" />
                {phase < 3 && <circle cx="95" cy="100" r="8" fill="none" stroke={issueColor} className="xu-pulse" />}
                <rect x="183" y="88" width="26" height="24" rx="5" fill="#0F172A" stroke="#00D084" strokeOpacity="0.6" />
                <circle cx="196" cy="100" r="3" fill={solved ? '#22C55E' : '#00D084'} className="led-blink" />
                <circle cx="312" cy="100" r="16" fill="none" stroke="#00D084" strokeOpacity="0.5" strokeDasharray="4 5" className="xu-dash" />
                <circle cx="312" cy="100" r="8" fill="#00D084" fillOpacity="0.9" />
                <text x="312" y="138" fill="#5CE8B4" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="2">AI ENGINE</text>
                <text x="95" y="72" fill={issueColor} fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="2" className="xu-color">
                    {solved ? 'NODE 12 · HEALTHY' : 'NODE 12 · ISSUE'}
                </text>
                {phase >= 2 && !solved && (
                    <g>
                        <rect x="230" y="150" width="150" height="20" rx="10" fill="#F59E0B" fillOpacity="0.12" stroke="#F59E0B" strokeOpacity="0.5" />
                        <text x="305" y="163" fill="#F59E0B" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="1">CAUSE: UPLINK CONGESTION</text>
                    </g>
                )}
                {solved && (
                    <g>
                        <rect x="230" y="150" width="150" height="20" rx="10" fill="#22C55E" fillOpacity="0.12" stroke="#22C55E" strokeOpacity="0.5" />
                        <text x="305" y="163" fill="#22C55E" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="1">PERFORMANCE RESTORED</text>
                    </g>
                )}
            </svg>
            <Caption text={captions[phase][0]} tone={captions[phase][1]} />
        </div>
    );
}

function PlacementDemo() {
    const phase = usePhase(3, 3200);
    const poor = phase === 0;
    const analyzing = phase === 1;
    const captions = [
        ['POOR PLACEMENT — CORNER OF HOME', 'amber'],
        ['ANALYZING SIGNAL CONDITIONS…', 'sky'],
        ['RECOMMENDED LOCATION APPLIED — COVERAGE IMPROVED', 'emerald'],
    ];
    return (
        <div className="text-center">
            <svg viewBox="0 0 420 190" className="w-full" aria-hidden="true">
                <rect x="40" y="25" width="340" height="140" rx="8" fill="none" stroke="#00D084" strokeOpacity="0.3" />
                <line x1="180" y1="25" x2="180" y2="95" stroke="#00D084" strokeOpacity="0.18" />
                <line x1="180" y1="95" x2="260" y2="95" stroke="#00D084" strokeOpacity="0.18" />
                <rect x="280" y="120" width="70" height="26" rx="4" fill="#00D084" fillOpacity="0.08" stroke="#00D084" strokeOpacity="0.2" />
                <rect x="70" y="45" width="46" height="10" rx="2" fill="#00D084" fillOpacity="0.08" stroke="#00D084" strokeOpacity="0.2" />
                {analyzing && <rect x="40" y="25" width="3" height="140" fill="#00D084" fillOpacity="0.7" className="xu-scan" />}
                <text x="330" y="60" fill="#F59E0B" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="2" opacity={poor ? 1 : 0} style={{ transition: 'opacity 0.8s' }}>
                    WEAK COVERAGE
                </text>
                <text x="330" y="60" fill="#22C55E" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="2" opacity={phase === 2 ? 1 : 0} style={{ transition: 'opacity 0.8s' }}>
                    COVERAGE IMPROVED
                </text>
                <g
                    style={{
                        transform: poor ? 'translate(0px, 0px)' : 'translate(130px, -30px)',
                        transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <circle cx="90" cy="135" r={poor ? 30 : 52} fill="none" stroke={poor ? '#F59E0B' : '#22C55E'} strokeOpacity="0.35" style={{ transition: 'all 1.2s' }} />
                    <circle cx="90" cy="135" r={poor ? 16 : 30} fill="none" stroke={poor ? '#F59E0B' : '#22C55E'} strokeOpacity="0.5" style={{ transition: 'all 1.2s' }} />
                    <circle cx="90" cy="135" r="6" fill="#00D084" />
                </g>
                <text x="90" y="175" fill="#5CE8B4" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="2" opacity={poor ? 1 : 0} style={{ transition: 'opacity 0.8s' }}>
                    GATEWAY
                </text>
            </svg>
            <Caption text={captions[phase][0]} tone={captions[phase][1]} />
        </div>
    );
}

const BARS = [16, 24, 34, 48, 62, 88, 112, 72];
const TIMES = ['06:00', '09:00', '12:00', '15:00', '18:00', '20:00', '22:00', '00:00'];

function InsightsDemo() {
    const [mounted, setMounted] = useState(false);
    const phase = usePhase(3, 2800);
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(t);
    }, []);
    const captions = [
        ['MORNING — LOW ACTIVITY', 'slate'],
        ['AFTERNOON — DEVICES CONNECTING', 'sky'],
        ['EVENING — PEAK STREAMING DEMAND', 'emerald'],
    ];
    return (
        <div className="text-center">
            <svg viewBox="0 0 420 190" className="w-full" aria-hidden="true">
                <line x1="30" y1="150" x2="400" y2="150" stroke="#00D084" strokeOpacity="0.25" />
                {BARS.map((h, i) => (
                    <rect
                        key={i}
                        x={44 + i * 44}
                        y={150 - h}
                        width="24"
                        height={mounted ? h : 0}
                        rx="3"
                        fill={i === 6 ? '#00D084' : '#00D084'}
                        fillOpacity={i === 6 ? 0.9 : 0.35 + (h / 112) * 0.4}
                        style={{ transition: `height 0.9s ${i * 0.08}s cubic-bezier(0.16, 1, 0.3, 1), y 0.9s ${i * 0.08}s cubic-bezier(0.16, 1, 0.3, 1)`, y: mounted ? 150 - h : 150 }}
                    />
                ))}
                {TIMES.map((t, i) => (
                    <text key={t} x={56 + i * 44} y="166" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">{t}</text>
                ))}
                <g opacity={phase === 2 ? 1 : 0} style={{ transition: 'opacity 0.6s' }}>
                    <rect x={44 + 6 * 44 - 8} y={150 - 112 - 26} width="118" height="18" rx="9" fill="#22C55E" fillOpacity="0.12" stroke="#22C55E" strokeOpacity="0.5" />
                    <text x={44 + 6 * 44 + 51} y={150 - 112 - 14} fill="#22C55E" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="1">PEAK — 3 STREAMING</text>
                </g>
                <rect x="30" y="20" width="2.5" height="130" fill="#00D084" fillOpacity="0.55" className="xu-scan-wide" />
            </svg>
            <Caption text={captions[phase][0]} tone={captions[phase][1]} />
        </div>
    );
}

function ProactiveDemo() {
    const phase = usePhase(4, 2400);
    const captions = [
        ['NORMAL OPERATION', 'slate'],
        ['UNUSUAL BEHAVIOR DETECTED — LATENCY RISING', 'amber'],
        ['ALERT GENERATED — POTENTIAL ISSUE IDENTIFIED', 'amber'],
        ['RECOMMENDED ACTION — TRAFFIC RE-OPTIMIZED', 'emerald'],
    ];
    return (
        <div className="text-center">
            <svg viewBox="0 0 420 190" className="w-full" aria-hidden="true">
                <line x1="30" y1="150" x2="400" y2="150" stroke="#00D084" strokeOpacity="0.2" />
                <line x1="30" y1="70" x2="400" y2="70" stroke="#F59E0B" strokeOpacity="0.45" strokeDasharray="4 5" />
                <text x="396" y="64" fill="#F59E0B" fontSize="7" fontFamily="monospace" textAnchor="end" letterSpacing="1">THRESHOLD</text>
                <path
                    d="M 35 128 L 110 124 L 160 118 L 195 78 L 225 52 L 255 60 L 290 105 L 340 122 L 395 124"
                    fill="none"
                    stroke="#00D084"
                    strokeWidth="2"
                    className="xu-draw"
                />
                <circle cx="225" cy="52" r="5" fill="#F59E0B" className="xu-pulse" />
                <g className="xu-alert">
                    <rect x="150" y="14" width="150" height="20" rx="10" fill="#F59E0B" fillOpacity="0.14" stroke="#F59E0B" strokeOpacity="0.6" />
                    <text x="225" y="27" fill="#F59E0B" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="1">ALERT — LATENCY ANOMALY</text>
                </g>
                <g className="xu-settle">
                    <rect x="255" y="14" width="140" height="20" rx="10" fill="#22C55E" fillOpacity="0.14" stroke="#22C55E" strokeOpacity="0.6" />
                    <text x="325" y="27" fill="#22C55E" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="1">AUTO-OPTIMIZED</text>
                </g>
                <text x="35" y="166" fill="#64748B" fontSize="7" fontFamily="monospace" letterSpacing="1">LATENCY / 24H</text>
            </svg>
            <Caption text={captions[phase][0]} tone={captions[phase][1]} />
        </div>
    );
}

const DEMOS = [TroubleshootDemo, PlacementDemo, InsightsDemo, ProactiveDemo];

export function IntelligenceShowcase() {
    const [active, setActive] = useState(0);
    const Demo = DEMOS[active];

    return (
        <div data-testid="intelligence-showcase">
            {/* data → action strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-10" data-testid="intelligence-flow">
                {['NETWORK DATA', 'ANALYTICS', 'INSIGHTS', 'INTELLIGENCE', 'ACTION'].map((s, i, arr) => (
                    <span key={s} className="flex items-center gap-4">
                        <span className={`font-mono-xu text-[10px] tracking-[0.25em] ${i === arr.length - 1 ? 'text-brand' : 'text-slate-500'}`}>{s}</span>
                        {i < arr.length - 1 && <span className="w-6 h-px bg-brand/40" />}
                    </span>
                ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
                <div className="font-mono-xu text-[9px] tracking-[0.3em] text-slate-500 mb-4">SELECT A CAPABILITY TO EXPLORE</div>
                <div className="divide-y divide-white/10 border-y border-white/10">
                    {FEATURES.map((c, i) => (
                        <button
                            key={c.t}
                            onClick={() => setActive(i)}
                            data-testid={`capability-card-${i}`}
                            className={`w-full text-left flex gap-5 py-5 pl-5 border-l-2 transition-all duration-300 ${
                                active === i
                                    ? 'border-brand bg-white/5'
                                    : 'border-transparent hover:border-white/25'
                            }`}
                        >
                            <c.icon size={18} className={`shrink-0 mt-0.5 transition-colors duration-300 ${active === i ? 'text-brand' : 'text-slate-500'}`} />
                            <div>
                                <div className={`font-display font-semibold text-sm transition-colors duration-300 ${active === i ? 'text-white' : 'text-slate-300'}`}>
                                    {c.t}
                                </div>
                                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{c.d}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col" data-testid="capability-demo">
                <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-xu text-[9px] tracking-[0.3em] text-slate-500">LIVE CAPABILITY DEMO</span>
                    <span className="font-mono-xu text-[9px] tracking-[0.3em] text-brand" data-testid="demo-counter">
                        0{active + 1} / 04
                    </span>
                </div>
                <div className="flex-1 flex items-center justify-center min-h-[260px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full"
                        >
                            <Demo />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            </div>
        </div>
    );
}
