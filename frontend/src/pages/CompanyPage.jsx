import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { MaskedLine } from '../components/Chapter';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const SECTIONS = [
    {
        id: 'about',
        kicker: 'ABOUT US',
        title: 'The company behind the platform.',
        body: [
            'TonAer is a B2B connectivity technology company. We design and manufacture white-label Wi-Fi routers, gateways and CPE — and pair them with the cloud platform, device management and mobile applications operators need to run modern connectivity services.',
            'Our customers are internet service providers, telecom operators and network solution companies — including Earthlink, Orangeburg IQ, Hitron and STC — who ship our technology under their own brand.',
        ],
    },
    {
        id: 'rnd',
        kicker: 'RESEARCH & DEVELOPMENT',
        title: 'Researching what wireless can reveal.',
        body: [
            'Our R&D programs explore the next frontier of connectivity: Wi-Fi sensing and environmental intelligence, next-generation Wi-Fi standards, and applied machine learning for network operations.',
            'These programs are exploratory by design — we investigate what is possible today so our partners can ship it tomorrow.',
        ],
    },
    {
        id: 'engineering',
        kicker: 'ENGINEERING & INNOVATION',
        title: 'Hardware, cloud and apps — under one roof.',
        body: [
            'Radio engineering, industrial design, firmware, cloud services and mobile applications are all built by TonAer teams. Owning the full stack means faster customization, tighter integration and one accountable partner.',
            'Every product is shaped around a business case: operator demand, regional demography and market size.',
        ],
    },
    {
        id: 'careers',
        kicker: 'CAREERS',
        title: 'Build the future of connectivity.',
        body: [
            'We are always interested in engineers and designers who want to work on real hardware, real networks and real scale — across RF, embedded systems, cloud platforms and applied AI.',
            'Introduce yourself at careers@tonaer.example and tell us what you want to build.',
        ],
    },
    {
        id: 'news',
        kicker: 'NEWS & UPDATES',
        title: 'What is shipping next.',
        body: [
            'Product announcements, firmware release notes and platform updates are published through the TonAer operator portal first.',
            'Request access via the demo form and our team will provision your account.',
        ],
    },
    {
        id: 'reports',
        kicker: 'ANNUAL REPORTS',
        title: 'For partners and investors.',
        body: [
            'Annual reports and company filings are available to partners and investors on request.',
            'Contact our team through the demo form and we will follow up with the latest materials.',
        ],
    },
];

export default function CompanyPage() {
    return (
        <div className="bg-[#020617] text-white" data-testid="company-page">
            <section className="pt-36 pb-16 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto">
                <div className="font-mono-xu text-[11px] tracking-[0.35em] text-brand mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-current" />
                    COMPANY // TONAER
                </div>
                <h1 className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">
                    <MaskedLine>YOUR BRAND.</MaskedLine>
                    <MaskedLine delay={0.12}>OUR COMPLETE TECHNOLOGY.</MaskedLine>
                </h1>
            </section>
            <div className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto pb-24 space-y-20">
                {SECTIONS.map((s, i) => (
                    <motion.section key={s.id} id={s.id} {...fadeUp} className="scroll-mt-28 border-t border-white/10 pt-12" data-testid={`company-${s.id}`}>
                        <div className="grid md:grid-cols-12 gap-6">
                            <div className="md:col-span-4">
                                <div className="font-mono-xu text-[10px] tracking-[0.3em] text-brand">{s.kicker}</div>
                                <h2 className="font-display font-semibold text-2xl mt-3 tracking-tight">{s.title}</h2>
                            </div>
                            <div className="md:col-span-8 space-y-4">
                                {s.body.map((p, j) => (
                                    <p key={j} className="text-slate-400 leading-relaxed text-sm sm:text-base max-w-2xl">{p}</p>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                ))}
                <motion.div {...fadeUp} className="rounded-3xl border border-brand/20 bg-brand/5 p-10 text-center">
                    <div className="font-display font-bold text-2xl">Partner with TonAer</div>
                    <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
                        Hardware, cloud, device management, mobile apps and network intelligence — one complete ecosystem under your brand.
                    </p>
                    <Link
                        to="/#contact"
                        data-testid="company-cta"
                        className="inline-block mt-6 rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Request a Demo
                    </Link>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
