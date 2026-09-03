import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { MaskedLine } from '../components/Chapter';
import { Marquee } from '../components/Marquee';

const CHAPTERS = [
    {
        id: 'wifi',
        n: '01',
        t: 'Wi-Fi Technology',
        d: 'Wi-Fi 7 across the flagship line: Multi-Link Operation aggregates bands in real time, 320 MHz channels open multi-gigabit lanes in 6 GHz, and 4096-QAM squeezes twenty percent more from every transmission.',
        tags: ['WI-FI 7', 'MLO', '320 MHZ', '4096-QAM'],
    },
    {
        id: 'mesh',
        n: '02',
        t: 'Mesh Networking',
        d: 'EasyMesh-certified nodes self-organize into one seamless network with band and client steering — whole-home coverage that operators can deploy and expand without site surveys.',
        tags: ['EASYMESH', 'CLIENT STEERING', 'SELF-ORGANIZING'],
    },
    {
        id: 'cloud',
        n: '03',
        t: 'Cloud Architecture',
        d: 'Every device streams rich, privacy-safe telemetry over TR-369 / USP into the TonAer Cloud — provisioning, configuration, monitoring and analytics at fleet scale, from one console.',
        tags: ['TR-369 / USP', 'ZERO-TOUCH', 'FLEET SCALE'],
    },
    {
        id: 'ai',
        n: '04',
        t: 'AI Network Intelligence',
        d: 'Pattern recognition across millions of networks learns what normal looks like — then isolates anomalies, predicts failures and applies optimizations before subscribers notice.',
        tags: ['OBSERVE', 'UNDERSTAND', 'ACT'],
    },
    {
        id: 'iot',
        n: '05',
        t: 'IoT Connectivity',
        d: 'Matter and Thread ready options bring every device class — sensors, locks, lighting, appliances — onto one managed network with unified visibility.',
        tags: ['MATTER', 'THREAD', 'UNIFIED MANAGEMENT'],
    },
    {
        id: 'security',
        n: '06',
        t: 'Network Security',
        d: 'WPA3, hardened firmware, network-level threat protection and granular parental controls — enterprise-grade security that ships switched on.',
        tags: ['WPA3', 'THREAT PROTECTION', 'PARENTAL CONTROLS'],
    },
];

export default function TechnologyPage() {
    return (
        <div className="bg-[#020617] text-white" data-testid="technology-page">
            <section className="pt-36 pb-16 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
                <div className="font-mono-xu text-[11px] tracking-[0.35em] text-brand mb-6 flex items-center gap-3">
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
                        key={c.id}
                        id={c.id}
                        data-testid={`tech-${c.id}`}
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={`scroll-mt-28 grid md:grid-cols-12 gap-8 items-start ${i % 2 ? 'md:text-right' : ''}`}
                    >
                        <div className={`md:col-span-3 font-display font-bold text-6xl text-white/10 ${i % 2 ? 'md:order-2' : ''}`}>
                            {c.n}
                        </div>
                        <div className="md:col-span-9">
                            <h2 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight">{c.t}</h2>
                            <p className="text-slate-400 leading-relaxed mt-4 max-w-xl inline-block">{c.d}</p>
                            <div className={`mt-5 flex flex-wrap gap-2 ${i % 2 ? 'md:justify-end' : ''}`}>
                                {c.tags.map((tag) => (
                                    <span key={tag} className="font-mono-xu text-[10px] tracking-[0.25em] border border-brand/30 text-brand-soft rounded-full px-3 py-1">
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
