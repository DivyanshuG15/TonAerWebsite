import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function MaskedLine({ children, delay = 0, className = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.4 });
    return (
        <span ref={ref} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span
                className={`block ${className}`}
                initial={{ y: '115%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.span>
        </span>
    );
}

export function HudLabel({ text, style }) {
    return (
        <motion.div
            className="absolute font-mono-xu text-[10px] tracking-[0.28em] flex items-center gap-2 opacity-70"
            style={style}
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span className="w-10 h-px bg-current opacity-50" />
            <span>{text}</span>
        </motion.div>
    );
}

export function Chapter({ num, kicker, lines, copy, dark = true, height = '150vh', align = 'left', labels = [], accent = '#38BDF8', children }) {
    return (
        <section
            className={`relative ${dark ? 'text-white' : 'text-slate-900'}`}
            style={{ height }}
            data-testid={`chapter-${num}`}
        >
            <div className="sticky top-0 h-screen flex flex-col justify-center px-6 sm:px-12 md:px-24 pointer-events-none overflow-hidden">
                <div className={align === 'right' ? 'ml-auto text-right max-w-2xl' : 'max-w-2xl'}>
                    <motion.div
                        initial={{ opacity: 0, x: align === 'right' ? 24 : -24 }}
                        whileInView={{ opacity: 0.65, x: 0 }}
                        viewport={{ once: false, amount: 0.8 }}
                        transition={{ duration: 0.8 }}
                        className="font-mono-xu text-[11px] tracking-[0.35em] mb-7 flex items-center gap-3"
                        style={{ justifyContent: align === 'right' ? 'flex-end' : 'flex-start', color: accent }}
                    >
                        <span className="w-8 h-px bg-current" />
                        {num} // {kicker}
                    </motion.div>
                    <h2 className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">
                        {lines.map((l, i) => (
                            <MaskedLine key={i} delay={i * 0.12}>
                                {l}
                            </MaskedLine>
                        ))}
                    </h2>
                    {copy && (
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 0.75, y: 0 }}
                            viewport={{ once: false, amount: 0.8 }}
                            transition={{ duration: 0.8, delay: 0.35 }}
                            className={`mt-7 text-base md:text-lg leading-relaxed max-w-xl ${align === 'right' ? 'ml-auto' : ''}`}
                        >
                            {copy}
                        </motion.p>
                    )}
                    {children}
                </div>
                {labels.map((l) => (
                    <HudLabel key={l.text} text={l.text} style={l.style} />
                ))}
            </div>
        </section>
    );
}
