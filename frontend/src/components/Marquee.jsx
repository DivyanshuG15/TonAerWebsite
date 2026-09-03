const ITEMS = [
    'WI-FI 7',
    'TRI-BAND',
    'MLO',
    '320 MHZ CHANNELS',
    '4096-QAM',
    'SMART WI-FI',
    'TONAER CLOUD',
    'AI OPTIMIZED',
    'EASYMESH',
    'TR-369 / USP',
];

export function Marquee({ dark = false }) {
    const row = [...ITEMS, ...ITEMS];
    return (
        <div
            className={`relative overflow-hidden border-y py-5 select-none ${
                dark ? 'border-white/10 text-slate-500' : 'border-slate-900/10 text-slate-400'
            }`}
            data-testid="marquee-strip"
            aria-hidden="true"
        >
            <div className="flex whitespace-nowrap animate-marquee w-max">
                {row.map((item, i) => (
                    <span key={i} className="font-mono-xu text-xs tracking-[0.35em] flex items-center">
                        <span className="px-8">{item}</span>
                        <span className={`w-1 h-1 rounded-full ${dark ? 'bg-brand/60' : 'bg-[#00D084]/50'}`} />
                    </span>
                ))}
            </div>
        </div>
    );
}
