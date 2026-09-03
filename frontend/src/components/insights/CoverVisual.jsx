// Generative technology cover visuals per article category.
// No stock photography — abstract connectivity / engineering graphics in TonAer palette.
const MOTIFS = {
    'Wi-Fi': (b) => (
        <>
            {[26, 42, 58].map((w, i) => (
                <path key={w} d={`M ${60 - w} 78 Q 60 ${78 - w} ${60 + w} 78`} fill="none" stroke={b(i)} strokeWidth="2" strokeLinecap="round" />
            ))}
            <circle cx="60" cy="82" r="4" fill="#00D084" />
        </>
    ),
    'Connectivity': (b) => (
        <>
            <path d="M14 70 L44 46 L74 62 L106 34" fill="none" stroke={b(0)} strokeWidth="2" />
            {[[14, 70], [44, 46], [74, 62], [106, 34]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i === 3 ? 5 : 3.5} fill={i === 3 ? '#00D084' : 'none'} stroke={b(i)} strokeWidth="2" />
            ))}
        </>
    ),
    'Networking': (b) => (
        <>
            {[[22, 34], [60, 22], [98, 34], [34, 68], [86, 68], [60, 46]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3.5" fill="none" stroke={b(i)} strokeWidth="1.6" />
            ))}
            <path d="M22 34 L60 22 L98 34 L86 68 L34 68 Z M22 34 L60 46 L98 34 M60 22 L60 46 M34 68 L60 46 L86 68" fill="none" stroke={b(1)} strokeWidth="1" opacity="0.6" />
        </>
    ),
    'Network Intelligence': (b) => (
        <>
            <path d="M10 60 Q 25 60 30 60 T 45 60 T 58 30 T 72 78 T 84 60 T 110 60" fill="none" stroke={b(0)} strokeWidth="2" />
            <circle cx="58" cy="30" r="4" fill="none" stroke="#00D084" strokeWidth="1.6" />
            <circle cx="72" cy="78" r="3" fill="none" stroke={b(2)} strokeWidth="1.4" />
        </>
    ),
    'Cloud & SaaS': (b) => (
        <>
            <path d="M34 62 a14 14 0 0 1 4 -27 a18 18 0 0 1 34 -6 a13 13 0 0 1 16 13 a12 12 0 0 1 -6 20 Z" fill="none" stroke={b(0)} strokeWidth="2" />
            {[46, 60, 74].map((x, i) => (
                <g key={x}>
                    <line x1={x} y1="66" x2={x} y2="78" stroke={b(i)} strokeWidth="1.4" />
                    <circle cx={x} cy="82" r="2.6" fill="none" stroke={b(i)} strokeWidth="1.4" />
                </g>
            ))}
        </>
    ),
    'AI & Intelligence': (b) => (
        <>
            <path d="M12 68 L34 62 L50 64 L66 38 L82 58 L108 30" fill="none" stroke={b(0)} strokeWidth="2" />
            <path d="M12 74 L108 74" stroke={b(2)} strokeWidth="1" strokeDasharray="3 5" />
            <circle cx="66" cy="38" r="6" fill="none" stroke="#00D084" strokeWidth="1.6" />
            <circle cx="66" cy="38" r="2" fill="#00D084" />
        </>
    ),
    'IoT': (b) => (
        <>
            <circle cx="60" cy="48" r="7" fill="none" stroke="#00D084" strokeWidth="2" />
            {[[24, 26], [96, 24], [20, 70], [100, 68], [42, 82], [80, 82]].map(([x, y], i) => (
                <g key={i}>
                    <line x1="60" y1="48" x2={x} y2={y} stroke={b(i)} strokeWidth="1" opacity="0.55" />
                    <circle cx={x} cy={y} r="3" fill="none" stroke={b(i)} strokeWidth="1.4" />
                </g>
            ))}
        </>
    ),
    'Product & Engineering': (b) => (
        <>
            <rect x="26" y="30" width="68" height="42" rx="7" fill="none" stroke={b(0)} strokeWidth="2" />
            <rect x="34" y="38" width="24" height="4" rx="2" fill={b(1)} opacity="0.5" />
            <line x1="60" y1="66" x2="60" y2="72" stroke="#00D084" strokeWidth="3" strokeLinecap="round" />
            {[18, 102].map((x) => (
                <g key={x} stroke={b(2)} strokeWidth="1" opacity="0.55">
                    <line x1={x} y1="26" x2={x} y2="34" />
                    <line x1={x - 4} y1="30" x2={x + 4} y2="30" />
                </g>
            ))}
        </>
    ),
    'Industry': (b) => (
        <>
            {[20, 40, 60, 80, 100].map((x, i) => (
                <rect key={x} x={x - 5} y={72 - i * 9} width="10" height={i * 9 + 6} rx="2" fill="none" stroke={i === 4 ? '#00D084' : b(i)} strokeWidth="1.6" />
            ))}
        </>
    ),
    'Company': (b) => (
        <>
            {[12, 22, 32].map((r, i) => (
                <circle key={r} cx="60" cy="52" r={r} fill="none" stroke={b(i)} strokeWidth="1.4" opacity={0.9 - i * 0.22} />
            ))}
            <circle cx="60" cy="52" r="3.5" fill="#00D084" />
        </>
    ),
};

const STROKES = ['#5CE8B4', '#94A3B8', '#475569'];

export function CoverVisual({ category, className = '' }) {
    const motif = MOTIFS[category] || MOTIFS['Connectivity'];
    const stroke = (i) => STROKES[i % STROKES.length];
    return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900 ${className}`} aria-hidden="true">
            <svg viewBox="0 0 120 96" className="w-full h-full transition-transform duration-700 group-hover:scale-105" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <pattern id={`grid-${category}`} width="12" height="12" patternUnits="userSpaceOnUse">
                        <path d="M12 0 H0 V12" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="120" height="96" fill={`url(#grid-${category})`} />
                {motif(stroke)}
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
        </div>
    );
}
