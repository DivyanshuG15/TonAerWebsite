import { motion } from 'framer-motion';

export const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

// Consistent chapter kicker: small green line + uppercase label. No numbers.
export function Kicker({ label, center = false, dark = false }) {
    return (
        <motion.div
            {...fadeUp}
            className={`flex items-center gap-4 mb-6 ${center ? 'justify-center' : ''}`}
            data-testid={`kicker-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
        >
            <span className="w-8 h-[2px] bg-[#00D084]" />
            <span className={`text-[13px] max-sm:text-[12px] font-semibold tracking-[0.16em] uppercase ${dark ? 'text-[#00D084]' : 'text-[#00905F]'}`}>
                {label}
            </span>
        </motion.div>
    );
}

// Shared chapter shell: single alignment grid (max 1240px), consistent rhythm.
export function Chapter({ id, kicker, title, desc, children, tone = 'white', dark = false, center = false, testId, pad = 'py-24 md:py-32' }) {
    return (
        <section
            id={id}
            className={`relative z-10 ${pad} px-6 sm:px-10 ${
                dark ? 'bg-[#020617] text-white' : tone === 'alt' ? 'bg-[#F6F8FA] text-slate-900' : 'bg-white text-slate-900'
            }`}
            data-testid={testId || `chapter-${id}`}
        >
            <div className={`max-w-[1240px] mx-auto ${center ? 'text-center' : ''}`}>
                <Kicker label={kicker} center={center} dark={dark} />
                <motion.h2
                    {...fadeUp}
                    className={`font-display font-bold tracking-tight text-[clamp(2.1rem,4.2vw,3.75rem)] leading-[1.08] max-w-3xl ${center ? 'mx-auto' : ''} ${dark ? 'text-white' : 'text-slate-900'}`}
                >
                    {title}
                </motion.h2>
                {desc && (
                    <motion.p
                        {...fadeUp}
                        className={`mt-6 max-w-2xl text-[17px] leading-relaxed ${center ? 'mx-auto' : ''} ${dark ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                        {desc}
                    </motion.p>
                )}
                {children}
            </div>
        </section>
    );
}
