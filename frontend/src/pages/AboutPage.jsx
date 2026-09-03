import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Footer } from '../components/Footer';
import { MaskedLine } from '../components/Chapter';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

function SectionHead({ kicker, title, desc, testId }) {
    return (
        <div data-testid={testId}>
            <motion.div {...fadeUp} className="font-mono-xu text-[11px] tracking-[0.35em] text-brand mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-current" />
                {kicker}
            </motion.div>
            <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-3xl sm:text-4xl leading-tight text-white">
                {title}
            </motion.h2>
            {desc && <motion.p {...fadeUp} className="mt-4 max-w-2xl text-slate-400 leading-relaxed">{desc}</motion.p>}
        </div>
    );
}

// Abstract evolution-of-connectivity visual: layered signal rings around a core.
function HeroVisual() {
    return (
        <div className="relative aspect-square max-w-md mx-auto w-full" data-testid="about-hero-visual" aria-hidden="true">
            <div className="absolute inset-0 rounded-full border border-white/5" />
            <div className="absolute inset-[12%] rounded-full border border-white/10" />
            <div className="absolute inset-[24%] rounded-full border border-brand/20" />
            <div className="absolute inset-[36%] rounded-full border border-brand/30" />
            {/* orbiting nodes */}
            <div className="absolute inset-[12%] spin-slow">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand/80" />
                <span className="absolute bottom-[14%] right-[14%] w-1.5 h-1.5 rounded-full bg-slate-400/70" />
            </div>
            <div className="absolute inset-[24%] spin-slow" style={{ animationDirection: 'reverse', animationDuration: '36s' }}>
                <span className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand/60" />
            </div>
            {/* core with expanding rings */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="absolute w-16 h-16 rounded-full border border-brand/50 signal-ring" />
                <span className="absolute w-16 h-16 rounded-full border border-brand/40 signal-ring" style={{ animationDelay: '0.6s' }} />
                <span className="absolute w-16 h-16 rounded-full border border-brand/30 signal-ring" style={{ animationDelay: '1.2s' }} />
                <span className="relative w-3.5 h-3.5 rounded-full bg-brand shadow-lg shadow-brand/40" />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono-xu text-[9px] tracking-[0.35em] text-slate-500 whitespace-nowrap">
                SIGNAL / NETWORK / INTELLIGENCE
            </div>
        </div>
    );
}

const EVOLUTION = [
    { id: 'foundation', label: 'FOUNDATION', desc: 'Connectivity hardware and engineering' },
    { id: 'expansion', label: 'EXPANSION', desc: 'Advanced gateways and connected devices' },
    { id: 'integration', label: 'INTEGRATION', desc: 'Hardware, firmware, cloud and applications' },
    { id: 'intelligence', label: 'INTELLIGENCE', desc: 'Analytics, automation and intelligent network capabilities' },
    { id: 'next', label: 'NEXT', desc: 'A more adaptive and intelligent connected world' },
];

const VALUES = [
    { t: 'Engineering with Purpose', d: "We solve real problems, not problems created for technology's sake. Every decision should improve performance, reliability, usability or business value." },
    { t: 'Customer-Centric Thinking', d: 'We start by understanding the business behind the technology. Different markets, networks and customers require different approaches. We listen first, then build.' },
    { t: 'Own the Outcome', d: 'We believe responsibility does not stop when a product leaves the engineering team. Hardware, software, performance and experience are connected — and so is our responsibility for the outcome.' },
    { t: 'Continuous Evolution', d: 'Connectivity never stands still. Neither should we. We continuously learn, experiment and improve as technologies, standards and customer expectations evolve.' },
    { t: 'Build for Trust', d: 'Connectivity is infrastructure people depend on. Reliability, security, consistency and transparency are therefore not optional features. They are fundamental to how we build.' },
    { t: 'Think Long Term', d: "We are building technology that grows with our customers. The goal is not simply to solve today's requirement, but to create foundations that can adapt to tomorrow's opportunities." },
];

const DISCIPLINES = ['HARDWARE', 'WIRELESS CONNECTIVITY', 'EMBEDDED SYSTEMS', 'NETWORKING', 'SOFTWARE', 'CLOUD', 'INTELLIGENT TECHNOLOGIES'];

const SYSTEM_LAYERS = ['DEVICE', 'NETWORK', 'PLATFORM', 'DATA', 'INTELLIGENCE', 'EXPERIENCE'];

const PARTNERSHIP_LINES = [
    'A partner that understands requirements.',
    'A partner that can engineer around challenges.',
    'A partner that can adapt as technology changes.',
    'A partner that stays focused on the long-term outcome.',
];

const DIFFERENCE = [
    { t: 'Hardware Experience', d: 'We understand connectivity from the physical device upward.' },
    { t: 'Engineering Depth', d: 'Our capabilities span multiple technology disciplines, allowing teams to solve problems from different perspectives.' },
    { t: 'Connected Thinking', d: 'We consider hardware, software, networks and experiences as parts of one system.' },
    { t: 'Customer-Driven Development', d: 'Technology should adapt to real business requirements, not force businesses into a predefined model.' },
    { t: 'Innovation with Purpose', d: 'We explore emerging technologies with a focus on solving meaningful connectivity challenges.' },
    { t: 'Long-Term Partnership', d: 'We build relationships and technology with the expectation that both should evolve over time.' },
];

const CULTURE_TRAITS = ['CURIOSITY', 'DISCIPLINE', 'COLLABORATION', 'CONTINUOUS IMPROVEMENT'];

const WAY_FORWARD = ['Understand the problem', 'Challenge the obvious', 'Engineer the solution', 'Learn from the result', 'Build what comes next'];

export default function AboutPage() {
    const goStory = () => document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' });

    return (
        <div className="bg-[#020617] text-white" data-testid="about-page">
            {/* 1 — HERO */}
            <section className="pt-36 pb-20 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto" data-testid="about-hero">
                <div className="grid lg:grid-cols-2 gap-14 items-center">
                    <div>
                        <div className="font-mono-xu text-[11px] tracking-[0.35em] text-brand mb-7 flex items-center gap-3">
                            <span className="w-8 h-px bg-current" />
                            ABOUT TONAER
                        </div>
                        <h1 className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                            <MaskedLine>WE BUILD THE</MaskedLine>
                            <MaskedLine delay={0.12}>TECHNOLOGY BEHIND</MaskedLine>
                            <MaskedLine delay={0.24}>
                                CONNECTED <span className="text-brand">EXPERIENCES.</span>
                            </MaskedLine>
                        </h1>
                        <motion.p {...fadeUp} className="mt-7 text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
                            TonAer is a connectivity technology company built around one simple belief: great connectivity
                            should be intelligent, dependable and designed to evolve. We bring together deep engineering,
                            product thinking and technology innovation to create the foundation behind modern connected
                            experiences.
                        </motion.p>
                        <motion.div {...fadeUp} className="mt-9 font-mono-xu text-[10px] tracking-[0.35em] text-slate-500">
                            INTELLIGENT CONNECTIVITY. <span className="text-brand">BUILT TO EVOLVE.</span>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <HeroVisual />
                    </motion.div>
                </div>
            </section>

            {/* 2 — OUR STORY */}
            <section id="story" className="scroll-mt-28 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto py-20 border-t border-white/5" data-testid="about-story">
                <SectionHead kicker="OUR STORY" title="From Connectivity Hardware to a Complete Technology Vision." />
                <div className="mt-10 space-y-5 max-w-3xl">
                    <motion.blockquote {...fadeUp} className="border-l-2 border-brand pl-6 text-lg md:text-xl text-slate-200 font-medium leading-relaxed">
                        How can connectivity technology become simpler to deploy, easier to manage and better for the
                        people who depend on it?
                    </motion.blockquote>
                    <motion.p {...fadeUp} className="text-slate-400 leading-relaxed">
                        TonAer's journey has been shaped by a constant focus on that challenge. What began with a focus on
                        connectivity devices has evolved into a broader technology vision — bringing together hardware,
                        engineering, software and intelligence around the needs of modern connectivity businesses.
                    </motion.p>
                    <motion.p {...fadeUp} className="text-slate-400 leading-relaxed">
                        Over time, our thinking has expanded beyond the device itself. We look at the complete experience:
                        how the device performs, how the network behaves, how it is managed, how problems are identified,
                        how data becomes insight — and ultimately, how technology creates a better experience for the
                        customer.
                    </motion.p>
                    <motion.p {...fadeUp} className="text-slate-400 leading-relaxed">
                        That perspective continues to shape TonAer today.
                    </motion.p>
                </div>
            </section>

            {/* 3 — OUR EVOLUTION */}
            <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto py-20 border-t border-white/5" data-testid="about-evolution">
                <SectionHead
                    kicker="OUR EVOLUTION"
                    title="We've Grown by Solving Harder Problems."
                    desc="Growth, for us, is not simply about becoming bigger. It is about becoming more capable."
                />
                <div className="mt-8 space-y-5 max-w-3xl">
                    <motion.p {...fadeUp} className="text-slate-400 leading-relaxed">
                        As connectivity technology has evolved, so have we — expanding our engineering capabilities,
                        deepening our technology expertise and broadening the problems we can solve. From connected
                        hardware to software platforms. From individual devices to complete ecosystems. From connectivity
                        management to intelligent network experiences.
                    </motion.p>
                    <motion.p {...fadeUp} className="text-slate-400 leading-relaxed">
                        Each stage of our journey has added another layer to what TonAer can build. The result is a
                        company designed to think beyond the device and understand the technology ecosystem around it.
                    </motion.p>
                </div>
                <div className="mt-14 relative max-w-2xl">
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-brand/60 via-white/15 to-white/5" />
                    <div className="space-y-10">
                        {EVOLUTION.map((s, i) => (
                            <motion.div
                                key={s.id}
                                {...fadeUp}
                                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className="relative pl-10"
                                data-testid={`timeline-stage-${s.id}`}
                            >
                                <span className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${i === EVOLUTION.length - 1 ? 'border-brand bg-brand/20' : 'border-white/25 bg-[#020617]'}`}>
                                    {i === EVOLUTION.length - 1 && <span className="absolute inset-0 rounded-full bg-brand/40 signal-ring" />}
                                </span>
                                <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500">0{i + 1}</div>
                                <div className={`font-display font-semibold text-lg mt-1 ${i === EVOLUTION.length - 1 ? 'text-brand' : 'text-white'}`}>{s.label}</div>
                                <p className="text-sm text-slate-400 mt-1">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4 — VALUES */}
            <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto py-20 border-t border-white/5" data-testid="about-values">
                <SectionHead
                    kicker="OUR VALUES"
                    title="The Way We Build Matters."
                    desc="Technology is only as strong as the thinking, discipline and people behind it. Our values influence how we design, engineer, collaborate and grow."
                />
                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {VALUES.map((v, i) => (
                        <motion.div
                            key={v.t}
                            {...fadeUp}
                            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-2xl border border-white/10 bg-white/5 hover:border-brand/40 p-7 transition-colors duration-300"
                            data-testid={`value-${i + 1}`}
                        >
                            <div className="font-mono-xu text-[10px] tracking-[0.3em] text-brand">VALUE 0{i + 1}</div>
                            <div className="font-display font-semibold text-lg mt-3 tracking-tight">{v.t}</div>
                            <p className="text-sm text-slate-400 mt-3 leading-relaxed">{v.d}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5 — ENGINEERING MINDSET */}
            <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto py-20 border-t border-white/5" data-testid="about-engineering">
                <SectionHead kicker="BUILT BY ENGINEERS" title="We Don't Just Follow Technology. We Build With It." />
                <div className="mt-10 space-y-5 max-w-3xl">
                    <motion.p {...fadeUp} className="text-slate-400 leading-relaxed">
                        At TonAer, engineering is not a department that sits behind the product. It is part of the
                        company's identity. Our teams think across disciplines — and that breadth allows us to see the
                        relationship between the components that make a connected experience work.
                    </motion.p>
                </div>
                <motion.div {...fadeUp} className="mt-8 flex flex-wrap gap-2 max-w-3xl">
                    {DISCIPLINES.map((d) => (
                        <span key={d} className="font-mono-xu text-[10px] tracking-[0.18em] border border-white/15 text-slate-300 rounded-full px-4 py-2">
                            {d}
                        </span>
                    ))}
                </motion.div>
                <div className="mt-12 space-y-3 max-w-3xl">
                    {['A gateway is not just hardware.', 'A network is not just connectivity.', 'Data is not just information.'].map((l, i) => (
                        <motion.div key={l} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display font-semibold text-xl sm:text-2xl tracking-tight text-slate-200">
                            {l}
                        </motion.div>
                    ))}
                    <motion.p {...fadeUp} className="text-slate-400 leading-relaxed pt-4">
                        When these elements work together, they become a platform for better experiences. That is the way
                        we think at TonAer.
                    </motion.p>
                </div>
            </section>

            {/* 6 — ONE COMPANY, ONE WAY OF THINKING */}
            <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto py-20 border-t border-white/5" data-testid="about-mindset">
                <SectionHead
                    kicker="OUR MINDSET"
                    title="One Company. One Way of Thinking: See the Whole System."
                    desc="The most meaningful technology improvements rarely come from looking at one component in isolation. They come from understanding how everything connects."
                />
                <div className="mt-12 grid lg:grid-cols-2 gap-12 items-start">
                    <div className="max-w-sm mx-auto w-full" data-testid="system-stack">
                        {SYSTEM_LAYERS.map((layer, i) => (
                            <div key={layer}>
                                <motion.div
                                    {...fadeUp}
                                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                    className={`rounded-xl border px-6 py-4 text-center font-mono-xu text-xs tracking-[0.3em] transition-colors duration-300 ${
                                        i === SYSTEM_LAYERS.length - 1
                                            ? 'border-brand/60 bg-brand/10 text-brand'
                                            : 'border-white/10 bg-white/5 text-slate-300'
                                    }`}
                                >
                                    {layer}
                                </motion.div>
                                {i < SYSTEM_LAYERS.length - 1 && (
                                    <div className="relative h-8 w-px mx-auto bg-white/10 overflow-hidden">
                                        <span className="absolute left-0 top-0 w-px h-2.5 bg-brand flow-y" style={{ animationDelay: `${i * 0.35}s` }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <motion.p {...fadeUp} className="text-slate-400 leading-relaxed lg:pt-4">
                        At TonAer, we look at the complete system. This allows us to identify opportunities others may see
                        as separate problems — and approach them as connected parts of the same challenge.
                    </motion.p>
                </div>
            </section>

            {/* 7 — CUSTOMER PARTNERSHIP */}
            <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto py-20 border-t border-white/5" data-testid="about-partnership">
                <SectionHead kicker="BUILT TO PARTNER" title="We Grow When Our Customers Grow." />
                <div className="mt-10 space-y-5 max-w-3xl">
                    <motion.p {...fadeUp} className="text-slate-400 leading-relaxed">
                        Our customers operate in a world where connectivity is mission-critical. They need technology that
                        performs today, scales with demand and can evolve as their business changes. That is why we see
                        our role differently. We don't want to be simply a technology supplier. We want to be a
                        technology partner.
                    </motion.p>
                </div>
                <div className="mt-8 space-y-3 max-w-3xl">
                    {PARTNERSHIP_LINES.map((l, i) => (
                        <motion.div key={l} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center gap-4 text-slate-200 font-medium">
                            <span className="w-6 h-px bg-brand shrink-0" />
                            {l}
                        </motion.div>
                    ))}
                </div>
                <motion.p {...fadeUp} className="mt-8 text-slate-400 leading-relaxed max-w-3xl">
                    Our success is measured not only by what we build, but by the value it creates for the businesses that
                    depend on it.
                </motion.p>
            </section>

            {/* 8 — THE TONAER DIFFERENCE */}
            <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto py-20 border-t border-white/5" data-testid="about-difference">
                <SectionHead kicker="WHY TONAER" title="Depth That Connects." desc="Our strength comes from bringing different capabilities together." />
                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {DIFFERENCE.map((d, i) => (
                        <motion.div key={d.t} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="border-t border-white/10 pt-5" data-testid={`difference-${i + 1}`}>
                            <div className="font-mono-xu text-[10px] tracking-[0.3em] text-brand">0{i + 1}</div>
                            <div className="font-display font-semibold text-lg mt-2 tracking-tight">{d.t}</div>
                            <p className="text-sm text-slate-400 mt-2 leading-relaxed">{d.d}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 9 — CULTURE */}
            <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto py-20 border-t border-white/5" data-testid="about-culture">
                <SectionHead kicker="THE PEOPLE BEHIND TONAER" title="Curious Minds. Practical Builders." />
                <div className="mt-10 space-y-5 max-w-3xl">
                    <motion.p {...fadeUp} className="text-slate-400 leading-relaxed">
                        Technology moves quickly. Building technology that people can depend on requires something more
                        than technical knowledge. That mindset defines the people behind TonAer. We value people who
                        challenge assumptions, learn continuously and turn complex problems into practical solutions.
                    </motion.p>
                </div>
                <motion.div {...fadeUp} className="mt-8 flex flex-wrap gap-2">
                    {CULTURE_TRAITS.map((t) => (
                        <span key={t} className="font-mono-xu text-[10px] tracking-[0.18em] border border-brand/30 text-brand-soft rounded-full px-4 py-2">
                            {t}
                        </span>
                    ))}
                </motion.div>
            </section>

            {/* 10 — VISION */}
            <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto py-20 border-t border-white/5" data-testid="about-vision">
                <SectionHead kicker="LOOKING AHEAD" title="The Future of Connectivity Should Be More Intelligent." />
                <div className="mt-10 space-y-5 max-w-3xl">
                    <motion.p {...fadeUp} className="text-slate-400 leading-relaxed">
                        The next generation of connectivity will not be defined only by speed. It will be defined by how
                        intelligently networks understand, respond and adapt. We see a future where connected devices
                        become more aware, networks become more observable, operations become more intelligent and
                        experiences become increasingly seamless.
                    </motion.p>
                    <motion.p {...fadeUp} className="text-slate-400 leading-relaxed">
                        TonAer is building toward that future. Our ambition is to bring hardware, software, connectivity
                        and intelligence closer together — creating technology that helps businesses deliver better
                        connected experiences at scale.
                    </motion.p>
                </div>
                <motion.div {...fadeUp} className="mt-14" data-testid="vision-statement">
                    <div className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-slate-500">
                        FROM CONNECTED DEVICES
                    </div>
                    <div className="font-mono-xu text-[10px] tracking-[0.4em] text-slate-600 my-3">TO</div>
                    <div className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-white">
                        INTELLIGENT <span className="text-brand">EXPERIENCES.</span>
                    </div>
                </motion.div>
            </section>

            {/* 11 — THE ROAD AHEAD */}
            <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto py-20 border-t border-white/5" data-testid="about-next">
                <SectionHead
                    kicker="WHAT'S NEXT"
                    title="We're Still Building."
                    desc="There is no final version of connectivity. Every new standard, device, network and customer expectation creates another opportunity to improve."
                />
                <div className="mt-10 flex flex-wrap items-center gap-3 max-w-4xl">
                    {WAY_FORWARD.map((s, i) => (
                        <motion.div key={s} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center gap-3">
                            <span className={`rounded-full border px-5 py-2.5 text-sm font-medium ${
                                i === WAY_FORWARD.length - 1 ? 'border-brand/60 text-brand bg-brand/10' : 'border-white/15 text-slate-300'
                            }`}>
                                {s}
                            </span>
                            {i < WAY_FORWARD.length - 1 && <ArrowRight size={14} className="text-slate-600" />}
                        </motion.div>
                    ))}
                </div>
                <motion.p {...fadeUp} className="mt-10 text-slate-400 leading-relaxed max-w-3xl">
                    Our journey continues with the same mindset that brought us here. That's the TonAer way forward.
                </motion.p>
            </section>

            {/* 12 — FINAL BRAND STATEMENT */}
            <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto py-24" data-testid="about-final">
                <motion.div {...fadeUp} className="rounded-3xl border border-brand/20 bg-gradient-to-b from-slate-900 to-slate-950 p-10 sm:p-16 text-center relative overflow-hidden grain">
                    <div className="font-mono-xu text-[10px] tracking-[0.4em] text-slate-500 mb-6">TONAER IS BUILDING WHAT CONNECTIVITY BECOMES NEXT</div>
                    <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
                        <MaskedLine>CONNECTED BY TECHNOLOGY.</MaskedLine>
                        <MaskedLine delay={0.12}>
                            DRIVEN BY <span className="text-brand">POSSIBILITY.</span>
                        </MaskedLine>
                    </h2>
                    <p className="mt-6 text-slate-400 max-w-xl mx-auto leading-relaxed">
                        TonAer is building the technology that helps connectivity businesses move forward — with greater
                        intelligence, stronger foundations and a clearer view of what comes next.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/#contact"
                            data-testid="about-cta-primary"
                            className="rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#00D084]/25"
                        >
                            Talk to TonAer
                        </Link>
                        <button
                            onClick={goStory}
                            data-testid="about-cta-secondary"
                            className="rounded-full border border-white/20 hover:border-brand/60 text-slate-300 hover:text-white text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300"
                        >
                            Explore Our Story
                        </button>
                    </div>
                </motion.div>
            </section>
            <Footer />
        </div>
    );
}
