import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExperienceCanvas } from '../experience/ExperienceCanvas';
import { ScrollRig } from '../experience/ScrollRig';
import { scrollStore } from '../experience/store';
import { LoadingScreen } from '../components/LoadingScreen';
import { HomeSections } from '../components/HomeSections';
import { Footer } from '../components/Footer';

function HeroLine({ ready, delay, className = '', children }) {
    return (
        <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span
                className={`block ${className}`}
                initial={{ y: '115%' }}
                animate={ready ? { y: 0 } : {}}
                transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.span>
        </span>
    );
}

function HeroOverlay({ ready }) {
    const explore = () => {
        if (scrollStore.lenis) scrollStore.lenis.scrollTo('#ecosystem', { duration: 1.8 });
        else document.querySelector('#ecosystem')?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <section className="relative text-white" style={{ height: '140vh' }} data-testid="hero-section">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={ready ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="font-mono-xu text-[11px] tracking-[0.4em] text-sky-400 flex items-center gap-4"
                >
                    <span className="w-8 h-px bg-current opacity-60" />
                    WHITE-LABEL CONNECTIVITY PLATFORM
                    <span className="w-8 h-px bg-current opacity-60" />
                </motion.div>
                <h1
                    className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.14] mt-9"
                    data-testid="hero-headline"
                >
                    <HeroLine ready={ready} delay={0.15}>
                        Build Your Network.
                    </HeroLine>
                    <HeroLine ready={ready} delay={0.3}>
                        Own Your <span className="text-sky-400">Brand.</span>
                    </HeroLine>
                </h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={ready ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.65, duration: 0.8 }}
                    className="mt-9 max-w-xl text-base md:text-lg leading-relaxed text-slate-400"
                >
                    Advanced white-label Wi-Fi devices, intelligent gateways, cloud management, and
                    mobile applications — built for ISPs, telecom operators, and connectivity businesses.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={ready ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 pointer-events-auto"
                >
                    <button
                        onClick={explore}
                        data-testid="hero-cta-primary"
                        className="rounded-full bg-[#0066FF] hover:bg-sky-500 text-white text-sm font-semibold tracking-wide px-9 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#0066FF]/40"
                    >
                        Explore Solutions
                    </button>
                    <Link
                        to="/product"
                        data-testid="hero-cta-secondary"
                        className="rounded-full border border-white/20 hover:border-sky-400/60 text-slate-300 hover:text-white text-sm font-semibold tracking-wide px-9 py-4 transition-all duration-300"
                    >
                        View Products
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={ready ? { opacity: 1 } : {}}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                    data-testid="scroll-cue"
                >
                    <span className="font-mono-xu text-[9px] tracking-[0.4em] text-slate-500">SCROLL</span>
                    <span className="w-px h-10 bg-white/15 overflow-hidden relative">
                        <motion.span
                            className="absolute inset-x-0 top-0 h-4 bg-sky-400"
                            animate={{ y: [-16, 40] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </span>
                </motion.div>
            </div>
        </section>
    );
}

export default function HomePage() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div data-testid="home-page">
            <AnimatePresence>
                {!ready && <LoadingScreen onDone={() => setReady(true)} />}
            </AnimatePresence>
            <ScrollRig />
            <ExperienceCanvas />

            <main id="scroll-track" className="relative z-10">
                <HeroOverlay ready={ready} />
            </main>
            <HomeSections />
            <Footer />
        </div>
    );
}
