import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollRig } from '../experience/ScrollRig';
import { scrollStore } from '../experience/store';
import { SeriesVisual } from '../components/SeriesVisual';
import { HomeSections } from '../components/HomeSections';
import { Footer } from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

function HeroChip({ label, value, className, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            className={`absolute rounded-xl border border-slate-200 bg-white/90 backdrop-blur px-4 py-2.5 shadow-lg shadow-slate-900/5 ${className}`}
        >
            <div className="font-mono-xu text-[8px] tracking-[0.2em] text-slate-400">{label}</div>
            <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
                <span className="font-display font-semibold text-xs text-slate-900">{value}</span>
            </div>
        </motion.div>
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
                {/* 01 — HERO */}
                <section className="px-6 sm:px-12 md:px-24 pt-32 pb-16 md:pb-24 max-w-7xl mx-auto" data-testid="hero-section">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-block font-mono-xu text-[10px] tracking-[0.25em] text-[#00905F] bg-[#E6FBF3] border border-[#00D084]/25 rounded-full px-4 py-1.5"
                            >
                                CONNECTED INTELLIGENCE
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-slate-900 mt-6"
                                data-testid="hero-headline"
                            >
                                Every Device.
                                <br />
                                One Intelligent <span className="text-[#00B874]">Platform.</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.22 }}
                                className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-slate-600"
                            >
                                Connect your devices, centralize your data, and gain meaningful insights through one
                                intelligent platform.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.34 }}
                                className="mt-9 flex flex-col sm:flex-row gap-4"
                            >
                                <button
                                    onClick={explorePlatform}
                                    data-testid="hero-cta-primary"
                                    className="rounded-full bg-[#00D084] hover:bg-[#00B874] text-[#04150E] text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#00D084]/25"
                                >
                                    Explore Platform
                                </button>
                                <Link
                                    to="/product"
                                    data-testid="hero-cta-secondary"
                                    className="rounded-full border border-slate-300 hover:border-[#00D084] text-slate-700 hover:text-slate-900 text-sm font-semibold tracking-wide px-8 py-4 text-center transition-all duration-300"
                                >
                                    Explore Products
                                </Link>
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                            data-testid="hero-visual"
                        >
                            <SeriesVisual variant={{}} label="D71 // TONAER GATEWAY" />
                            <HeroChip label="GATEWAY STATUS" value="Healthy" className="top-5 -left-2 sm:left-5" delay={0.7} />
                            <HeroChip label="CLOUD SYNC" value="Connected" className="bottom-16 -right-2 sm:right-5" delay={0.85} />
                        </motion.div>
                    </div>
                </section>
            </main>
            <HomeSections />
            <Footer />
        </div>
    );
}
