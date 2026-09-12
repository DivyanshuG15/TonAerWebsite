import { motion } from 'framer-motion';

export const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

// Shared chapter shell: single alignment grid (max 1240px), tight consistent rhythm.
// Sections open directly with a strong heading — no kicker labels.
export function Chapter({ id, title, desc, children, tone = 'white', dark = false, center = false, testId, pad = 'py-14 md:py-20' }) {
    return (
        <section
            id={id}
            className={`relative z-10 ${pad} px-6 sm:px-10 ${
                dark ? 'bg-[#020617] text-white' : tone === 'alt' ? 'bg-[#F6F8FA] text-slate-900' : 'bg-white text-slate-900'
            }`}
            data-testid={testId || `chapter-${id}`}
        >
            <div className={`max-w-[1240px] mx-auto ${center ? 'text-center' : ''}`}>
                <motion.h2
                    {...fadeUp}
                    className={`font-display font-bold tracking-tight text-[clamp(2.1rem,4.2vw,3.75rem)] leading-[1.08] max-w-3xl ${center ? 'mx-auto' : ''} ${dark ? 'text-white' : 'text-slate-900'}`}
                >
                    {title}
                </motion.h2>
                {desc && (
                    <motion.p
                        {...fadeUp}
                        className={`mt-5 max-w-2xl text-[17px] leading-relaxed ${center ? 'mx-auto' : ''} ${dark ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                        {desc}
                    </motion.p>
                )}
                {children}
            </div>
        </section>
    );
}
