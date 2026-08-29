import { motion } from 'framer-motion';

const CLIENTS = [
    { name: 'EARTHLINK', note: 'US NATIONAL ISP' },
    { name: 'ORANGEBURG IQ', note: 'REGIONAL FIBER' },
    { name: 'HITRON', note: 'CPE / OEM PARTNER' },
    { name: 'STC', note: 'MENA CARRIER' },
];

export function TrustedBy({ dark = false }) {
    return (
        <section
            className={`relative z-10 py-20 px-6 sm:px-12 md:px-24 ${dark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900'}`}
            data-testid="trusted-by"
        >
            <div className="max-w-6xl mx-auto">
                <div className={`font-mono-xu text-[11px] tracking-[0.35em] mb-10 flex items-center gap-3 ${dark ? 'text-sky-400' : 'text-[#0066FF]'}`}>
                    <span className="w-8 h-px bg-current" />
                    TRUSTED BY OPERATORS WORLDWIDE
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
                    {CLIENTS.map((c, i) => (
                        <motion.div
                            key={c.name}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            className="group"
                            data-testid={`client-${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                            <div className={`font-display font-bold text-xl sm:text-2xl tracking-wide transition-colors duration-300 ${
                                dark ? 'text-white/50 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'
                            }`}>
                                {c.name}
                            </div>
                            <div className={`font-mono-xu text-[9px] tracking-[0.3em] mt-2 ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
                                {c.note}
                            </div>
                        </motion.div>
                    ))}
                </div>
                <p className={`mt-12 text-sm leading-relaxed max-w-2xl ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Every Xunison gateway is built to the operator's demand — shaped by deployment size,
                    regional demography and market requirements, and delivered with their firmware, bands and branding.
                </p>
            </div>
        </section>
    );
}
