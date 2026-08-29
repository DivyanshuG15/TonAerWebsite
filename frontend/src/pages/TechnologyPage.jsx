import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { MaskedLine } from '../components/Chapter';
import { Marquee } from '../components/Marquee';

const CHAPTERS = [
    {
        n: '01',
        t: 'Multi-Link Operation',
        d: 'Devices connect across multiple bands simultaneously — aggregating throughput and slashing latency by avoiding congested links in real time.',
        tags: ['MLO', 'STR / NSTR', 'LOW LATENCY'],
    },
    {
        n: '02',
        t: '320 MHz Channels',
        d: 'Wi-Fi 7 doubles channel width in the 6 GHz spectrum, opening clean multi-gigabit lanes even in crowded apartment buildings.',
        tags: ['6 GHZ', 'MULTI-GIG', 'CLEAN SPECTRUM'],
    },
    {
        n: '03',
        t: '4096-QAM Modulation',
        d: 'Twenty percent more data in every transmission. Dense modulation squeezes more from every hertz of licensed-free spectrum.',
        tags: ['4096-QAM', '+20% THROUGHPUT'],
    },
    {
        n: '04',
        t: 'Telemetry Pipeline',
        d: 'Every D71 streams rich, privacy-safe telemetry into the Xunison Cloud — signal, health, events and performance at fleet scale.',
        tags: ['TR-369 / USP', 'REAL-TIME', 'FLEET SCALE'],
    },
    {
        n: '05',
        t: 'AI Anomaly Engine',
        d: 'Pattern recognition across millions of networks learns what normal looks like — then isolates anomalies and applies optimizations automatically.',
        tags: ['OBSERVE', 'UNDERSTAND', 'ACT'],
    },
];

export default function TechnologyPage() {
    return (
        <div className="bg-[#020617] text-white" data-testid="technology-page">
            <section className="pt-36 pb-16 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
                <div className="font-mono-xu text-[11px] tracking-[0.35em] text-sky-400 mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-current" />
                    TECHNOLOGY // UNDER THE SURFACE
                </div>
                <h1 className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">
                    <MaskedLine>ENGINEERED FOR</MaskedLine>
                    <MaskedLine delay={0.12}>THE NEXT DECADE.</MaskedLine>
                </h1>
            </section>
            <Marquee dark />
            <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto py-20 space-y-20">
                {CHAPTERS.map((c, i) => (
                    <motion.div
                        key={c.n}
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={`grid md:grid-cols-12 gap-8 items-start ${i % 2 ? 'md:text-right' : ''}`}
                    >
                        <div className={`md:col-span-3 font-display font-bold text-6xl text-white/10 ${i % 2 ? 'md:order-2' : ''}`}>
                            {c.n}
                        </div>
                        <div className="md:col-span-9">
                            <h2 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight">{c.t}</h2>
                            <p className="text-slate-400 leading-relaxed mt-4 max-w-xl inline-block">{c.d}</p>
                            <div className={`mt-5 flex flex-wrap gap-2 ${i % 2 ? 'md:justify-end' : ''}`}>
                                {c.tags.map((tag) => (
                                    <span key={tag} className="font-mono-xu text-[10px] tracking-[0.25em] border border-sky-400/30 text-sky-300 rounded-full px-3 py-1">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </section>
            <Footer />
        </div>
    );
}
