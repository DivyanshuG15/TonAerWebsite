import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { MaskedLine } from '../components/Chapter';
import { ProductVisual } from '../components/ProductVisual';

const SPECS = [
    { k: 'STANDARD', v: 'Wi-Fi 7 (802.11be)' },
    { k: 'BANDS', v: '2.4 / 5 / 6 GHz Tri-Band' },
    { k: 'CHANNELS', v: 'Up to 320 MHz' },
    { k: 'MODULATION', v: '4096-QAM' },
    { k: 'LINK OPERATION', v: 'Multi-Link Operation (MLO)' },
    { k: 'WAN', v: '10G SFP+ / 2.5G Ethernet' },
    { k: 'MESH', v: 'EasyMesh certified' },
    { k: 'MANAGEMENT', v: 'TR-369 / USP + Xunison Cloud' },
];

export default function ProductPage() {
    return (
        <div className="bg-[#F8FAFC] text-slate-900" data-testid="product-page">
            <section className="pt-36 pb-24 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
                <div className="font-mono-xu text-[11px] tracking-[0.35em] text-[#0066FF] mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-current" />
                    PRODUCT // D71 GATEWAY
                </div>
                <h1 className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">
                    <MaskedLine>THE GATEWAY,</MaskedLine>
                    <MaskedLine delay={0.12}>ELEVATED.</MaskedLine>
                </h1>
                <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <ProductVisual />
                    </motion.div>
                    <div>
                        <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-lg">
                            A premium unibody Wi-Fi 7 gateway engineered for service providers — designed to disappear
                            into the home while quietly running one of the most advanced radios ever deployed at the edge.
                        </p>
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                            {SPECS.map((s, i) => (
                                <motion.div
                                    key={s.k}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.05 }}
                                    className="border-l-2 border-[#0066FF]/30 pl-4"
                                >
                                    <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-400">{s.k}</div>
                                    <div className="font-display font-medium mt-1 text-sm sm:text-base">{s.v}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#020617] text-white py-24 px-6 sm:px-12 md:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="font-mono-xu text-[11px] tracking-[0.35em] text-sky-400 mb-6">ARCHITECTURE // BUILT FOR OPERATORS</div>
                    <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl max-w-2xl leading-tight">
                        Consumer-simple. Carrier-grade.
                    </h2>
                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        {[
                            { n: '01', t: 'Tri-Band Radio', d: 'Three coordinated radios with dynamic band steering keep dense homes fast and predictable.' },
                            { n: '02', t: 'Xunison Cloud', d: 'Fleet-wide telemetry, remote management and zero-touch provisioning through TR-369 / USP.' },
                            { n: '03', t: 'AI Optimization', d: 'Anomaly detection and self-healing optimization run continuously — before subscribers notice.' },
                        ].map((c, i) => (
                            <motion.div
                                key={c.n}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
                            >
                                <div className="font-mono-xu text-xs text-sky-400 tracking-[0.3em]">{c.n}</div>
                                <div className="font-display font-semibold text-xl mt-3">{c.t}</div>
                                <p className="text-sm text-slate-400 mt-3 leading-relaxed">{c.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
