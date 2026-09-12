import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wifi, Cloud, BrainCircuit } from 'lucide-react';
import { ScrollRig } from '../experience/ScrollRig';
import { scrollStore } from '../experience/store';
import { SeriesVisual } from '../components/SeriesVisual';
import { HomeSections } from '../components/HomeSections';
import { Footer } from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

// Video-ready: set HERO_VIDEO_URL to a real TonAer product video to replace the
// composed stage — layout and copy remain unchanged.
const HERO_VIDEO_URL = null;

const FLOW_NODES = [
    { icon: Wifi, label: 'NETWORK', desc: 'The connection' },
    { icon: Cloud, label: 'TONAER CLOUD', desc: 'The platform' },
    { icon: BrainCircuit, label: 'INTELLIGENCE', desc: 'The insight' },
];

// The cinematic hardware → network → cloud → intelligence stage.
function HeroStage() {
    if (HERO_VIDEO_URL) {
        return (
            <video
                src={HERO_VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                className="w-full rounded-3xl border border-slate-200 aspect-[16/8] object-cover"
                data-testid="hero-video"
            />
        );
    }
    return (
        <div
            className="relative rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
            data-testid="hero-visual"
        >
            {/* faint technical grid + horizon */}
            <div
                className="absolute inset-0 opacity-[0.5]"
                style={{ backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '56px 56px' }}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] items-center gap-6 px-6 sm:px-12 py-10 lg:py-0 lg:h-[520px]">
                {/* large gateway render */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                >
                    <SeriesVisual variant={{}} bare close className="max-w-[560px] mx-auto" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono-xu text-[10px] tracking-[0.3em] text-slate-400 whitespace-nowrap">
                        D71 // TONAER GATEWAY — LIVE RENDER
                    </div>
                </motion.div>

                {/* the journey: network → cloud → intelligence */}
                <div className="relative lg:pr-6 pb-8 lg:pb-0">
                    <div className="hidden lg:block absolute left-0 top-8 bottom-8 w-px bg-slate-200">
                        <span className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00D084] flow-y" />
                    </div>
                    <div className="space-y-2 lg:pl-10">
                        {FLOW_NODES.map((n, i) => (
                            <motion.div
                                key={n.label}
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 + i * 0.18 }}
                                className="flex items-center gap-4 py-4"
                                data-testid={`hero-node-${i}`}
                            >
                                <span className="relative w-11 h-11 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                                    <n.icon size={18} className="text-[#00905F]" />
                                    {i === FLOW_NODES.length - 1 && (
                                        <span className="absolute inset-0 rounded-full border border-[#00D084]/50 signal-ring" />
                                    )}
                                </span>
                                <div>
                                    <div className="font-mono-xu text-[11px] tracking-[0.2em] text-slate-800">{n.label}</div>
                                    <div className="text-[13px] text-slate-500 mt-0.5">{n.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                            className="lg:pl-10 lg:-ml-10 mt-2 lg:ml-0"
                        >
                            <div className="lg:pl-10 flex items-center gap-2.5 font-mono-xu text-[10px] tracking-[0.2em] text-[#00905F]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
                                TELEMETRY · LIVE
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HomePage() {
    useSEO({
        title: 'TonAer | Every Device. One Intelligent Platform.',
        description:
            'TonAer brings together connectivity hardware, cloud management and network intelligence — one platform for ISPs, telecom operators and connectivity businesses.',
        canonical: window.location.origin,
    });

    const explorePlatform = () => {
        if (scrollStore.lenis) scrollStore.lenis.scrollTo('#platform', { duration: 1.6 });
        else document.querySelector('#platform')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div data-testid="home-page" className="bg-white">
            <ScrollRig />
            <main id="scroll-track" className="relative z-10">
                {/* HERO — CONNECTED INTELLIGENCE */}
                <section className="px-6 sm:px-10 pt-32 md:pt-40 pb-20 md:pb-28" data-testid="hero-section">
                    <div className="max-w-[1240px] mx-auto">
                        <div className="max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="flex items-center gap-4"
                            >
                                <span className="w-8 h-[2px] bg-[#00D084]" />
                                <span className="text-[13px] max-sm:text-[12px] font-semibold tracking-[0.16em] text-[#00905F] uppercase">
                                    Connected Intelligence
                                </span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="font-display font-bold tracking-tight text-[clamp(2.2rem,9vw,5.25rem)] leading-[1.05] text-slate-900 mt-7"
                                data-testid="hero-headline"
                            >
                                Every Device.
                                <br />
                                One Intelligent
                                <br />
                                <span className="text-[#00B874]">Platform.</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.22 }}
                                className="mt-7 max-w-xl text-[17px] md:text-lg leading-relaxed text-slate-600"
                            >
                                Connect hardware, networks and data through one intelligent ecosystem built for the
                                connected world.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.34 }}
                                className="mt-10 flex flex-col sm:flex-row gap-4"
                            >
                                <button
                                    onClick={explorePlatform}
                                    data-testid="hero-cta-primary"
                                    className="rounded-full bg-[#00D084] hover:bg-[#00B874] text-[#04150E] text-[15px] font-semibold tracking-wide px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#00D084]/25"
                                >
                                    Explore Platform
                                </button>
                                <Link
                                    to="/product"
                                    data-testid="hero-cta-secondary"
                                    className="rounded-full border border-slate-300 hover:border-[#00D084] text-slate-700 hover:text-slate-900 text-[15px] font-semibold tracking-wide px-8 py-4 text-center transition-all duration-300"
                                >
                                    Explore Products
                                </Link>
                            </motion.div>
                        </div>

                        {/* the cinematic stage */}
                        <motion.div
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-14 md:mt-20"
                        >
                            <HeroStage />
                        </motion.div>
                    </div>
                </section>
            </main>
            <HomeSections />
            <Footer />
        </div>
    );
}
