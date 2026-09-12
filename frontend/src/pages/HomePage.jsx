import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollRig } from '../experience/ScrollRig';
import { scrollStore } from '../experience/store';
import { SeriesVisual } from '../components/SeriesVisual';
import { HomeSections } from '../components/HomeSections';
import { Footer } from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

// Video-ready: set HERO_VIDEO_URL to a real TonAer product video to replace the
// composed render — layout and copy remain unchanged.
const HERO_VIDEO_URL = null;

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

// Hardware → network → cloud → data → intelligence: the hero composition.
function HeroComposition() {
    if (HERO_VIDEO_URL) {
        return (
            <video
                src={HERO_VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                className="w-full rounded-2xl border border-slate-200 aspect-[4/3] object-cover"
                data-testid="hero-video"
            />
        );
    }
    return (
        <div className="relative" data-testid="hero-visual">
            {/* data-flow overlay: device → cloud → intelligence */}
            <svg viewBox="0 0 600 460" className="absolute -top-10 -right-4 w-[70%] z-10 pointer-events-none" aria-hidden="true">
                <path d="M 180 330 C 300 260 340 160 470 90" fill="none" stroke="#00D084" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="5 7" className="xu-dash" />
                <path d="M 200 350 C 340 330 420 280 520 230" fill="none" stroke="#00D084" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="5 7" className="xu-dash" style={{ animationDelay: '0.5s' }} />
                <circle cx="470" cy="90" r="5" fill="none" stroke="#00D084" strokeWidth="1.5" />
                <circle cx="470" cy="90" r="2" fill="#00D084" />
                <text x="470" y="70" fill="#64748B" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="2">CLOUD</text>
                <circle cx="520" cy="230" r="5" fill="none" stroke="#00D084" strokeWidth="1.5" />
                <circle cx="520" cy="230" r="2" fill="#00D084" />
                <text x="520" y="212" fill="#64748B" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="2">DATA</text>
            </svg>
            <SeriesVisual variant={{}} label="D71 // TONAER GATEWAY" />
            <HeroChip label="GATEWAY STATUS" value="Healthy" className="top-4 -left-2 sm:left-4" delay={0.7} />
            <HeroChip label="CLOUD SYNC" value="Connected" className="bottom-14 right-2 sm:right-6" delay={0.85} />
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
                {/* CH 01 — HERO: CONNECTED INTELLIGENCE */}
                <section className="px-6 sm:px-10 pt-36 pb-20 md:pt-44 md:pb-28" data-testid="hero-section">
                    <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="flex items-center gap-4"
                            >
                                <span className="w-10 h-[2px] bg-[#00D084]" />
                                <span className="font-mono-xu text-[13px] max-sm:text-[11px] font-semibold tracking-[0.18em] text-[#00905F] uppercase">
                                    01 / Connected Intelligence
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
                                One <span className="text-[#00B874]">Intelligent</span>
                                <br />
                                Platform.
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.22 }}
                                className="mt-7 max-w-lg text-[17px] md:text-lg leading-relaxed text-slate-600"
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
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <HeroComposition />
                        </motion.div>
                    </div>
                </section>
            </main>
            <HomeSections />
            <Footer />
        </div>
    );
}
