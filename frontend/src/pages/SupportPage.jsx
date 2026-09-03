import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { MaskedLine } from '../components/Chapter';

const FAQS = [
    {
        q: 'How do I set up my D71 gateway?',
        a: 'Connect the D71 to your fibre ONT or modem via the 2.5G WAN port, power on, and wait for the LED strip to turn solid cyan. The TonAer app walks you through the rest in under two minutes — or your provider can zero-touch provision it before it ships.',
    },
    {
        q: 'What do the LED colors mean?',
        a: 'Pulsing cyan: connecting. Solid cyan: online and healthy. Amber: a band is degraded — the AI engine is usually already rebalancing. Rose: no upstream connection; check your WAN cable or contact your provider.',
    },
    {
        q: 'How do firmware updates work?',
        a: 'Updates are delivered automatically from the TonAer Cloud during low-usage windows. There is nothing to download or install, and your network stays online throughout.',
    },
    {
        q: 'Can I extend coverage with mesh?',
        a: 'Yes. The D71 is EasyMesh certified — add any EasyMesh node or additional D71 units and they self-organize into one seamless network with client steering.',
    },
    {
        q: 'I am a service provider. Where is the ISP portal?',
        a: 'Fleet management, telemetry, remote diagnostics and AI optimization controls live in the TonAer Cloud portal. Request access via the demo form and our team will provision your operator account.',
    },
];

export default function SupportPage() {
    return (
        <div className="bg-[#F8FAFC] text-slate-900" data-testid="support-page">
            <section className="pt-36 pb-16 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto">
                <div className="font-mono-xu text-[11px] tracking-[0.35em] text-[#00905F] mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-current" />
                    SUPPORT // HELP CENTER
                </div>
                <h1 className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">
                    <MaskedLine>ANSWERS,</MaskedLine>
                    <MaskedLine delay={0.12}>INSTANTLY.</MaskedLine>
                </h1>
            </section>
            <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto pb-6 grid sm:grid-cols-3 gap-4">
                {[
                    {
                        id: 'documentation',
                        t: 'Documentation',
                        d: 'Integration guides, TR-369 data models and API references live in the TonAer operator portal.',
                    },
                    {
                        id: 'downloads',
                        t: 'Downloads',
                        d: 'Firmware release notes and product datasheets for the D, M, Q and O series — via the portal.',
                    },
                    {
                        id: 'insights',
                        t: 'Insights / Blog',
                        d: 'Field notes on Wi-Fi 7 deployments, fleet telemetry and operator playbooks — published quarterly.',
                    },
                ].map((c, i) => (
                    <motion.div
                        key={c.id}
                        id={c.id}
                        data-testid={`resource-${c.id}`}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.06 }}
                        className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl p-6"
                    >
                        <div className="font-mono-xu text-[10px] tracking-[0.3em] text-[#00905F]">{c.t.toUpperCase()}</div>
                        <p className="text-sm text-slate-600 leading-relaxed mt-3">{c.d}</p>
                        <Link to="/#contact" className="inline-block mt-4 text-xs font-semibold text-[#00905F] hover:text-brand-strong transition-colors">
                            Request portal access →
                        </Link>
                    </motion.div>
                ))}
            </section>
            <section id="faqs" className="scroll-mt-28 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto py-16 space-y-4">
                {FAQS.map((f, i) => (
                    <motion.details
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                        className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl px-6 py-5 open:border-[#00905F]/40 open:shadow-lg open:shadow-[#00905F]/5 transition-all duration-300"
                        data-testid={`faq-item-${i}`}
                    >
                        <summary className="cursor-pointer list-none flex items-center justify-between font-display font-medium text-base sm:text-lg">
                            {f.q}
                            <span className="ml-4 font-mono-xu text-[#00905F] transition-transform duration-300 group-open:rotate-45">+</span>
                        </summary>
                        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">{f.a}</p>
                    </motion.details>
                ))}
                <div className="pt-10 text-center">
                    <p className="text-slate-500 text-sm mb-5">Still stuck? Our team responds within one business day.</p>
                    <Link
                        to="/#contact"
                        data-testid="support-contact-cta"
                        className="inline-block rounded-full bg-[#00905F] hover:bg-brand-strong text-[#04150E] text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#00905F]/25"
                    >
                        Contact TonAer
                    </Link>
                </div>
            </section>
            <Footer />
        </div>
    );
}
