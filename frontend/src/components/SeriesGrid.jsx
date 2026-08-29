import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SERIES = [
    {
        letter: 'D',
        name: 'D Series',
        tag: 'Flagship Wi-Fi 7 tri-band gateway — the latest generation, led by the D71.',
        tags: ['WI-FI 7', 'TRI-BAND', 'MLO', '10G WAN'],
        latest: true,
    },
    {
        letter: 'M',
        name: 'M Series',
        tag: 'High-volume gateways engineered for mass-market fiber rollouts.',
        tags: ['WI-FI 6E', 'EASYMESH', 'TR-369'],
    },
    {
        letter: 'Q',
        name: 'Q Series',
        tag: 'Cellular CPE with e-SIM and physical SIM failover for mobile-first markets.',
        tags: ['5G / LTE', 'E-SIM', 'SIM FAILOVER'],
    },
    {
        letter: 'O',
        name: 'O Series',
        tag: 'Ruggedized units for outdoor and hard-to-reach deployments.',
        tags: ['OUTDOOR', 'HARDENED', 'POE'],
    },
];

export function SeriesGrid({ dark = true }) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="series-grid">
            {SERIES.map((s, i) => (
                <Link key={s.letter} to={`/series/${s.letter.toLowerCase()}`} data-testid={`series-link-${s.letter.toLowerCase()}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className={`relative rounded-2xl border p-8 overflow-hidden group transition-all duration-500 hover:-translate-y-1 h-full ${
                            s.latest
                                ? 'border-[#0066FF]/60 bg-[#0066FF]/10 shadow-xl shadow-[#0066FF]/10'
                                : dark
                                  ? 'border-white/10 bg-white/5 hover:border-white/25'
                                  : 'border-slate-200 bg-white hover:border-[#0066FF]/40'
                        }`}
                        data-testid={`series-card-${s.letter.toLowerCase()}`}
                    >
                    <div className={`absolute -top-6 -right-2 font-display font-bold text-[7rem] leading-none select-none ${
                        s.latest ? 'text-[#0066FF]/15' : dark ? 'text-white/5' : 'text-slate-900/5'
                    }`}>
                        {s.letter}
                    </div>
                    {s.latest && (
                        <div className="inline-block font-mono-xu text-[9px] tracking-[0.3em] text-white bg-[#0066FF] rounded-full px-3 py-1 mb-4">
                            LATEST // NOW SHIPPING
                        </div>
                    )}
                    <div className={`font-display font-semibold text-xl ${dark || s.latest ? 'text-white' : 'text-slate-900'}`}>
                        {s.name}
                    </div>
                    <p className={`text-sm leading-relaxed mt-3 ${dark || s.latest ? 'text-slate-300' : 'text-slate-500'}`}>
                        {s.tag}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                            <span
                                key={t}
                                className={`font-mono-xu text-[9px] tracking-[0.2em] rounded-full px-2.5 py-1 border ${
                                    s.latest
                                        ? 'border-sky-400/40 text-sky-300'
                                        : dark
                                          ? 'border-white/15 text-slate-400'
                                          : 'border-slate-300 text-slate-500'
                                }`}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className={`mt-6 font-mono-xu text-[10px] tracking-[0.3em] transition-colors duration-300 ${
                        s.latest ? 'text-sky-400' : dark ? 'text-slate-500 group-hover:text-white' : 'text-slate-400 group-hover:text-[#0066FF]'
                    }`}>
                        EXPLORE {s.letter} SERIES →
                    </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}
