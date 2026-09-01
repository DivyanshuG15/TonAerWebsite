import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExperienceCanvas } from '../experience/ExperienceCanvas';
import { ScrollRig } from '../experience/ScrollRig';
import { scrollStore } from '../experience/store';
import { LoadingScreen } from '../components/LoadingScreen';
import { Chapter, MaskedLine } from '../components/Chapter';
import { Marquee } from '../components/Marquee';
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
                <Marquee />

                <Chapter
                    num="02"
                    kicker="SMART WI-FI 7"
                    lines={['THREE BANDS.', 'ONE INTELLIGENT FIELD.']}
                    copy="2.4, 5 and 6 GHz operating as one coordinated system. Multi-Link Operation shifts every device to the right path in real time — from 5 devices to 50, the field stays composed."
                    dark={false}
                    height="190vh"
                    accent="#0284C7"
                    labels={[
                        { text: 'TRI-BAND // 2.4 + 5 + 6 GHZ', style: { right: '8%', top: '22%' } },
                        { text: 'MLO // ACTIVE', style: { right: '14%', bottom: '18%' } },
                        { text: 'DENSITY // 5 → 20 → 50 NODES', style: { left: '6%', bottom: '12%' } },
                    ]}
                />

                <Chapter
                    num="03"
                    kicker="THE NETWORK COMES ALIVE"
                    lines={['EVERY DEVICE.', 'EVERY PATH.', 'ALIVE.']}
                    copy="Clients, gateways, edge and cloud — one elegant topology. Watch data physically travel from device to D71 to network to cloud, routed and re-routed in real time."
                    height="180vh"
                    labels={[
                        { text: 'TOPOLOGY // MESH COHERENT', style: { right: '10%', top: '20%' } },
                        { text: 'ROUTING // DEVICE → D71 → CLOUD', style: { right: '6%', bottom: '22%' } },
                    ]}
                />

                <Chapter
                    num="04"
                    kicker="TELEMETRY"
                    lines={['EVERY CONNECTION', 'CREATES DATA.']}
                    copy="Raw signals become telemetry; telemetry becomes pattern. Signal intensity, device activity, connection state and network health — read continuously, at Bloomberg density with Apple calm."
                    height="140vh"
                    align="right"
                    labels={[
                        { text: 'TELEMETRY STREAM // LIVE', style: { left: '8%', top: '24%' } },
                        { text: 'NETWORK HEALTH // 99.98%', style: { left: '12%', bottom: '20%' } },
                    ]}
                />

                <Chapter
                    num="05"
                    kicker="XUNISON CLOUD"
                    lines={['ONE CLOUD.', 'EVERY NETWORK.']}
                    copy="Millions of data points converge, are processed and return as intelligence. The Xunison Cloud is the quiet brain behind every managed network — no dashboards required."
                    height="120vh"
                    accent="#818CF8"
                    labels={[
                        { text: 'INGEST // DISTRIBUTED FLEET', style: { right: '10%', top: '22%' } },
                        { text: 'PROCESSING // PATTERN EXTRACTION', style: { left: '8%', bottom: '16%' } },
                    ]}
                />

                <Chapter
                    num="06"
                    kicker="AI NETWORK INTELLIGENCE"
                    lines={['OBSERVE.', 'UNDERSTAND. ACT.']}
                    copy="One node behaves differently. The system highlights the pattern, analyzes its neighbours, identifies the likely issue — and applies an optimization before anyone notices."
                    height="130vh"
                    accent="#F43F5E"
                    labels={[
                        { text: 'AI ENGINE // PATTERN RECOGNITION', style: { right: '8%', top: '20%' } },
                        { text: 'ANOMALY // ISOLATED', style: { right: '12%', bottom: '26%' } },
                        { text: 'OPTIMIZATION // APPLIED', style: { left: '8%', bottom: '14%' } },
                    ]}
                />

                <Chapter
                    num="07"
                    kicker="XUNISON R&D — EXPLORING ENVIRONMENTAL INTELLIGENCE"
                    lines={['WHAT IF THE NETWORK', 'COULD SENSE ITS SURROUNDINGS?']}
                    copy="Wireless signals interact with the spaces they move through. Our research explores how those subtle changes could reveal presence, movement and spatial patterns — no cameras, no wearables, no identification. Ever."
                    height="130vh"
                    align="right"
                    accent="#22C55E"
                    labels={[
                        { text: 'R&D // SPATIAL SENSING ACTIVE', style: { left: '8%', top: '22%' } },
                        { text: 'ENVIRONMENTAL PATTERN // DETECTED', style: { left: '10%', bottom: '18%' } },
                    ]}
                />

                <section id="story" className="relative text-slate-900" style={{ height: '130vh' }} data-testid="chapter-08">
                    <div className="sticky top-0 min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-24 py-24">
                        <div className="max-w-3xl">
                            <div className="font-mono-xu text-[11px] tracking-[0.35em] mb-7 flex items-center gap-3 text-[#0066FF] opacity-80">
                                <span className="w-8 h-px bg-current" />
                                08 // THE INTELLIGENT ECOSYSTEM
                            </div>
                            <h2 className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">
                                <MaskedLine>ONE DEVICE.</MaskedLine>
                                <MaskedLine delay={0.12}>AN INTELLIGENT WORLD.</MaskedLine>
                            </h2>
                            <div className="mt-10 space-y-3 font-mono-xu text-[11px] sm:text-xs tracking-[0.2em] text-slate-500">
                                <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                                    <span className="text-[#0066FF]">TODAY</span> — XUNISON CONNECTS DEVICES.
                                </motion.p>
                                <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
                                    <span className="text-[#0066FF]">NOW</span> — XUNISON HELPS PROVIDERS UNDERSTAND NETWORKS.
                                </motion.p>
                                <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}>
                                    <span className="text-[#0066FF]">NEXT</span> — NETWORKS THAT UNDERSTAND THEIR SURROUNDINGS.
                                </motion.p>
                            </div>
                            <div className="mt-12 flex flex-col sm:flex-row gap-4 pointer-events-auto">
                                <button
                                    onClick={() => scrollStore.lenis?.scrollTo('#contact', { duration: 1.6 })}
                                    data-testid="finale-cta-demo"
                                    className="rounded-full bg-[#0066FF] hover:bg-sky-500 text-white text-sm font-semibold tracking-wide px-9 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#0066FF]/30"
                                >
                                    Request a Demo
                                </button>
                                <button
                                    onClick={() => scrollStore.lenis?.scrollTo('#ecosystem', { duration: 1.6 })}
                                    data-testid="finale-cta-explore"
                                    className="rounded-full border border-slate-300 hover:border-[#0066FF] text-slate-600 hover:text-[#0066FF] text-sm font-semibold tracking-wide px-9 py-4 transition-all duration-300"
                                >
                                    Explore the Ecosystem
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <HomeSections />
            <Footer />
        </div>
    );
}
