import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { MaskedLine } from '../components/Chapter';
import { SeriesVisual } from '../components/SeriesVisual';
import { scrollStore } from '../experience/store';
import { useNavigate } from 'react-router-dom';

const SERIES = {
    d: {
        letter: 'D',
        code: 'D71',
        kicker: 'D SERIES // FLAGSHIP — LATEST GENERATION',
        lines: ['THE FLAGSHIP.', 'WI-FI 7, PERFECTED.'],
        copy: 'The D71 leads the D Series — a premium unibody tri-band Wi-Fi 7 gateway engineered for service providers who want the most advanced radio at the edge, managed entirely from the Xunison Cloud.',
        specs: [
            { k: 'STANDARD', v: 'Wi-Fi 7 (802.11be)' },
            { k: 'BANDS', v: '2.4 / 5 / 6 GHz Tri-Band' },
            { k: 'CHANNELS', v: 'Up to 320 MHz' },
            { k: 'MODULATION', v: '4096-QAM' },
            { k: 'LINK OPERATION', v: 'Multi-Link Operation (MLO)' },
            { k: 'WAN', v: '10G SFP+ / 2.5G Ethernet' },
            { k: 'MESH', v: 'EasyMesh certified' },
            { k: 'CELLULAR', v: 'e-SIM + physical SIM options' },
            { k: 'VOICE', v: 'FXS telephone port' },
            { k: 'MANAGEMENT', v: 'TR-369 / USP + Xunison Cloud' },
        ],
        features: [
            { n: '01', t: 'Tri-Band Wi-Fi 7', d: 'Three coordinated radios with Multi-Link Operation keep dense homes fast and predictable.' },
            { n: '02', t: 'AI-Optimized', d: 'Anomaly detection and self-healing optimization run continuously via the Xunison Cloud.' },
            { n: '03', t: 'Voice + Cellular Ready', d: 'Optional e-SIM / physical SIM cellular backup and FXS telephone port in the same unibody.' },
        ],
        variant: {},
    },
    m: {
        letter: 'M',
        code: 'M SERIES',
        kicker: 'M SERIES // MASS-MARKET FIBER',
        lines: ['BUILT FOR', 'VOLUME.'],
        copy: 'The M Series is engineered for high-volume fiber rollouts — dependable Wi-Fi 6E performance, cloud-managed at fleet scale, and value-engineered for operators shipping hundreds of thousands of units.',
        specs: [
            { k: 'STANDARD', v: 'Wi-Fi 6E (802.11ax)' },
            { k: 'BANDS', v: 'Dual-band 2.4 / 5 GHz (6 GHz option)' },
            { k: 'CHANNELS', v: 'Up to 160 MHz' },
            { k: 'MODULATION', v: '1024-QAM' },
            { k: 'WAN', v: '2.5G Ethernet' },
            { k: 'LAN', v: '4× Gigabit Ethernet' },
            { k: 'MESH', v: 'EasyMesh certified' },
            { k: 'VOICE', v: 'FXS telephone port (option)' },
            { k: 'CELLULAR', v: 'e-SIM option' },
            { k: 'MANAGEMENT', v: 'TR-369 / USP + Xunison Cloud' },
        ],
        features: [
            { n: '01', t: 'Fleet Economics', d: 'Value-engineered BOM for operators deploying at six-figure scale without sacrificing experience.' },
            { n: '02', t: 'Zero-Touch Rollout', d: 'Pre-provisioned firmware and cloud onboarding — plug in and the network configures itself.' },
            { n: '03', t: 'Mesh at Scale', d: 'EasyMesh-certified nodes self-organize into one seamless network with client steering.' },
        ],
        variant: { bodyColor: '#e6ebf1', panelColor: '#d6dee7', ledColor: '#0066FF', logoColor: '#0066FF', vents: 6 },
    },
    q: {
        letter: 'Q',
        code: 'Q SERIES',
        kicker: 'Q SERIES // CELLULAR CPE',
        lines: ['CELLULAR.', 'ALWAYS ON.'],
        copy: 'The Q Series brings carrier-grade 5G and LTE to homes and businesses where fiber cannot reach — with e-SIM and dual physical SIM failover, Wi-Fi 6 inside, and voice built in.',
        specs: [
            { k: 'CELLULAR WAN', v: '5G Sub-6 + LTE fallback' },
            { k: 'SIM', v: 'e-SIM + 2× nano-SIM failover' },
            { k: 'WI-FI', v: 'Wi-Fi 6 (802.11ax) dual-band' },
            { k: 'CHANNELS', v: 'Up to 160 MHz' },
            { k: 'WAN', v: '2.5G Ethernet (hybrid mode)' },
            { k: 'LAN', v: '3× Gigabit Ethernet' },
            { k: 'VOICE', v: 'FXS telephone port (RJ11)' },
            { k: 'FAILOVER', v: 'Automatic SIM + WAN switchover' },
            { k: 'PROVISIONING', v: 'Remote e-SIM profile management' },
            { k: 'MANAGEMENT', v: 'TR-369 / USP + Xunison Cloud' },
        ],
        features: [
            { n: '01', t: 'Dual-SIM Failover', d: 'e-SIM plus two physical SIM slots keep subscribers online when a carrier drops.' },
            { n: '02', t: 'Remote e-SIM Provisioning', d: 'Switch carrier profiles over the air — no truck rolls, no SIM swaps.' },
            { n: '03', t: 'Voice + Data in One', d: 'FXS telephone port replaces the landline while the CPE runs the household network.' },
        ],
        variant: { bodyColor: '#dde5ee', panelColor: '#ccd6e2', ledColor: '#22C55E', logoColor: '#16a34a', vents: 6, simTray: true },
    },
    o: {
        letter: 'O',
        code: 'O SERIES',
        kicker: 'O SERIES // OUTDOOR + RUGGEDIZED',
        lines: ['OUTDOOR.', 'UNSTOPPABLE.'],
        copy: 'The O Series extends Xunison networks beyond the walls — hardened outdoor units for campuses, hospitality, rural broadband and hard-to-reach markets, monitored from the same cloud.',
        specs: [
            { k: 'ENCLOSURE', v: 'IP67 weather-sealed' },
            { k: 'TEMPERATURE', v: '-40°C to +65°C operating' },
            { k: 'POWER', v: 'PoE 802.3at powered' },
            { k: 'WI-FI', v: 'Wi-Fi 6 (802.11ax) dual-band' },
            { k: 'ANTENNAS', v: 'High-gain directional options' },
            { k: 'MOUNTING', v: 'Pole / wall mount kit' },
            { k: 'PROTECTION', v: 'Integrated surge protection' },
            { k: 'BACKHAUL', v: 'PoE / fiber media option' },
            { k: 'LOCATION', v: 'GNSS option for asset tracking' },
            { k: 'MANAGEMENT', v: 'TR-369 / USP + Xunison Cloud' },
        ],
        features: [
            { n: '01', t: 'Hardened by Design', d: 'IP67 sealing, surge protection and an extended temperature envelope for any climate.' },
            { n: '02', t: 'Deploy Anywhere', d: 'PoE power and flexible backhaul mean one cable run per unit — pole, wall or rooftop.' },
            { n: '03', t: 'Same Cloud Brain', d: 'Outdoor fleets report into the same telemetry and AI optimization loop as indoor gateways.' },
        ],
        variant: { bodyColor: '#93a6bb', panelColor: '#7e93aa', ledColor: '#F59E0B', logoColor: '#F59E0B', vents: 4, ports: 2 },
    },
};

export default function SeriesPage() {
    const { seriesId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const data = SERIES[seriesId];
    if (!data) return <Navigate to="/product" replace />;

    const goDemo = () => {
        navigate('/');
        setTimeout(() => scrollStore.lenis?.scrollTo('#contact', { duration: 1.6 }), 700);
    };

    return (
        <div className="bg-[#F8FAFC] text-slate-900" data-testid={`series-page-${seriesId}`}>
            <section className="pt-36 pb-20 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
                <Link
                    to="/product"
                    className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-400 hover:text-[#0066FF] transition-colors"
                    data-testid="series-back-link"
                >
                    ← ALL SERIES
                </Link>
                <div className="font-mono-xu text-[11px] tracking-[0.35em] text-[#0066FF] mt-8 mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-current" />
                    {data.kicker}
                </div>
                <h1 className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">
                    <MaskedLine>{data.lines[0]}</MaskedLine>
                    <MaskedLine delay={0.12}>{data.lines[1]}</MaskedLine>
                </h1>

                <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <SeriesVisual variant={data.variant} label={data.code} />
                    </motion.div>
                    <div>
                        <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-lg">{data.copy}</p>
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                            {data.specs.map((s, i) => (
                                <motion.div
                                    key={s.k}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.04 }}
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
                    <div className="font-mono-xu text-[11px] tracking-[0.35em] text-sky-400 mb-12">
                        WHY OPERATORS CHOOSE {data.letter} SERIES
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {data.features.map((c, i) => (
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
                    <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-t border-white/10 pt-10">
                        <div>
                            <div className="font-display font-semibold text-2xl">Built to your market.</div>
                            <p className="text-slate-400 text-sm mt-2 max-w-md">
                                Bands, firmware, casing and branding — configured per operator, per demography, per market size.
                            </p>
                        </div>
                        <button
                            onClick={goDemo}
                            data-testid="series-demo-cta"
                            className="rounded-full bg-[#0066FF] hover:bg-sky-500 text-white text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#0066FF]/25"
                        >
                            Request a Demo
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-16 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
                <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-400 mb-6">EXPLORE THE LINEUP</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(SERIES).map(([id, s]) => (
                        <Link
                            key={id}
                            to={`/series/${id}`}
                            data-testid={`series-nav-${id}`}
                            className={`rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                                id === seriesId
                                    ? 'border-[#0066FF] bg-[#0066FF]/5'
                                    : 'border-slate-200 bg-white hover:border-[#0066FF]/40'
                            }`}
                        >
                            <div className="font-display font-bold text-3xl">{s.letter}</div>
                            <div className="font-mono-xu text-[10px] tracking-[0.25em] text-slate-400 mt-2">{s.code}</div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
