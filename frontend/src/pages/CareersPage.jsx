import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ChevronDown, ArrowRight, GraduationCap } from 'lucide-react';
import { Footer } from '../components/Footer';
import { MaskedLine } from '../components/Chapter';
import { JobCard } from '../components/careers/JobCard';
import { ApplicationForm } from '../components/careers/ApplicationForm';
import { CAREER_AREAS, TECH_AREAS, RD_AREAS, CAREERS_FAQS } from '../data/careersConfig';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const WHY = [
    { t: 'Engineering', d: 'Build advanced networking hardware, firmware, software, and cloud systems.' },
    { t: 'Research & Development', d: 'Explore new connectivity technologies and develop solutions for evolving customer requirements.' },
    { t: 'Product Innovation', d: 'Turn customer and market requirements into scalable technology products.' },
    { t: 'AI & Intelligence', d: 'Develop intelligent tools for network monitoring, troubleshooting, optimization, and automation.' },
    { t: 'Global Connectivity', d: 'Work on solutions designed for ISPs, telecom operators, network providers, and connected businesses.' },
];

const selectCls =
    'rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-slate-300 outline-none focus:border-brand cursor-pointer';

function SectionHead({ kicker, title, desc, center = false }) {
    return (
        <div className={center ? 'text-center' : ''}>
            <motion.div {...fadeUp} className={`font-mono-xu text-[11px] tracking-[0.35em] text-brand mb-5 flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
                <span className="w-8 h-px bg-current" />
                {kicker}
                {center && <span className="w-8 h-px bg-current" />}
            </motion.div>
            <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-3xl sm:text-4xl leading-tight text-white">
                {title}
            </motion.h2>
            {desc && <motion.p {...fadeUp} className={`mt-4 max-w-2xl text-slate-400 leading-relaxed ${center ? 'mx-auto' : ''}`}>{desc}</motion.p>}
        </div>
    );
}

export default function CareersPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({ department: '', category: '', location: '', employment_type: '', experience_level: '', work_mode: '', skill: '' });
    const [visible, setVisible] = useState(9);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [generalOpen, setGeneralOpen] = useState(false);

    useEffect(() => {
        document.title = 'Careers — TonAer';
        axios
            .get(`${API}/jobs`)
            .then((r) => setJobs(r.data))
            .catch(() => setJobs([]))
            .finally(() => setLoading(false));
    }, []);

    const options = useMemo(() => {
        const uniq = (k) => [...new Set(jobs.map((j) => j[k]).filter(Boolean))];
        return {
            department: uniq('department'),
            category: uniq('category'),
            location: uniq('location'),
            employment_type: uniq('employment_type'),
            experience_level: uniq('experience_level'),
            work_mode: uniq('work_mode'),
            skill: [...new Set(jobs.flatMap((j) => j.skills))],
        };
    }, [jobs]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return jobs.filter(
            (j) =>
                (!q || `${j.title} ${j.department} ${j.category} ${j.skills.join(' ')} ${j.location}`.toLowerCase().includes(q)) &&
                (!filters.department || j.department === filters.department) &&
                (!filters.category || j.category === filters.category) &&
                (!filters.location || j.location === filters.location) &&
                (!filters.employment_type || j.employment_type === filters.employment_type) &&
                (!filters.experience_level || j.experience_level === filters.experience_level) &&
                (!filters.work_mode || j.work_mode === filters.work_mode) &&
                (!filters.skill || j.skills.includes(filters.skill))
        );
    }, [jobs, query, filters]);

    const activeAreas = useMemo(
        () => CAREER_AREAS.filter((a) => jobs.some((j) => j.department === a)),
        [jobs]
    );
    const hasInternship = jobs.some((j) => j.employment_type === 'Internship');
    const internshipJob = jobs.find((j) => j.employment_type === 'Internship');

    const setFilter = (k, v) => {
        setFilters((f) => ({ ...f, [k]: v }));
        setVisible(9);
    };

    const pickArea = (area) => {
        setFilters({ department: area, category: '', location: '', employment_type: '', experience_level: '', work_mode: '', skill: '' });
        setQuery('');
        setVisible(9);
        document.querySelector('#positions')?.scrollIntoView({ behavior: 'smooth' });
    };

    const shown = filtered.slice(0, visible);

    return (
        <div className="bg-[#020617] text-white" data-testid="careers-page">
            <section className="relative pt-40 pb-24 px-6 sm:px-12 md:px-24 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 w-[560px] h-[560px] rounded-full bg-[#00D084]/10 blur-[120px]" />
                    <svg className="absolute inset-0 w-full h-full opacity-[0.06]" aria-hidden="true">
                        <defs>
                            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#00D084" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                        className="font-mono-xu text-[11px] tracking-[0.4em] text-brand flex items-center justify-center gap-4">
                        <span className="w-8 h-px bg-current opacity-60" />
                        CAREERS
                        <span className="w-8 h-px bg-current opacity-60" />
                    </motion.div>
                    <h1 className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mt-8">
                        <MaskedLine>Build What Connects</MaskedLine>
                        <MaskedLine delay={0.12}>the <span className="text-brand">World.</span></MaskedLine>
                    </h1>
                    <motion.p {...fadeUp} className="mt-7 max-w-2xl mx-auto text-base md:text-lg text-slate-400 leading-relaxed">
                        Join a team working across connectivity hardware, cloud platforms, mobile experiences,
                        networking, AI, and next-generation technology.
                    </motion.p>
                    <motion.div {...fadeUp} className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => document.querySelector('#positions')?.scrollIntoView({ behavior: 'smooth' })}
                            data-testid="careers-cta-positions"
                            className="rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold tracking-wide px-9 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#00D084]/40"
                        >
                            View Open Positions
                        </button>
                        <button
                            onClick={() => document.querySelector('#why')?.scrollIntoView({ behavior: 'smooth' })}
                            data-testid="careers-cta-life"
                            className="rounded-full border border-white/20 hover:border-brand/60 text-slate-300 hover:text-white text-sm font-semibold tracking-wide px-9 py-4 transition-all duration-300"
                        >
                            Explore Life at TonAer
                        </button>
                    </motion.div>
                </div>
            </section>

            <section id="why" className="scroll-mt-24 py-20 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
                <SectionHead
                    kicker="WHY BUILD YOUR CAREER WITH US"
                    title="Work on Technology That Connects People."
                    desc="Our teams work across hardware, software, cloud, networking, mobile applications, and intelligent connectivity solutions to build technology for the next generation of connected experiences."
                />
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {WHY.map((w, i) => (
                        <motion.div key={w.t} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-brand/40 transition-colors duration-300">
                            <div className="font-mono-xu text-[10px] tracking-[0.25em] text-brand">{w.t.toUpperCase()}</div>
                            <p className="text-xs text-slate-400 mt-3 leading-relaxed">{w.d}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-20 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
                <SectionHead kicker="EXPLORE CAREER AREAS" title="Find Where You Can Make an Impact." />
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {activeAreas.map((area, i) => {
                        const count = jobs.filter((j) => j.department === area).length;
                        return (
                            <motion.button
                                key={area}
                                {...fadeUp}
                                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                                onClick={() => pickArea(area)}
                                data-testid={`area-${area.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                className={`text-left rounded-2xl border p-5 transition-all duration-300 ${
                                    filters.department === area
                                        ? 'border-brand bg-brand/10'
                                        : 'border-white/10 bg-white/5 hover:border-brand/40'
                                }`}
                            >
                                <div className="font-display font-semibold text-sm">{area}</div>
                                <div className="font-mono-xu text-[9px] tracking-[0.2em] text-slate-500 mt-2">
                                    {count} OPEN ROLE{count > 1 ? 'S' : ''}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </section>

            <section id="positions" className="scroll-mt-24 py-20 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
                <SectionHead
                    kicker="OPEN POSITIONS"
                    title={loading ? 'Open Positions' : `${filtered.length} Open Position${filtered.length === 1 ? '' : 's'}`}
                    desc="Explore current opportunities and find the role that matches your skills and experience."
                />
                <div className="relative max-w-xl mt-10">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setVisible(9); }}
                        placeholder="Search jobs by title, skill, or keyword…"
                        data-testid="job-search"
                        className="w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-300"
                    />
                </div>
                <button
                    className="md:hidden mt-4 flex items-center gap-2 text-xs text-slate-400"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    data-testid="filters-toggle"
                >
                    Filters <ChevronDown size={14} className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`${filtersOpen ? 'flex' : 'hidden'} md:flex flex-wrap gap-2.5 mt-5`} data-testid="job-filters">
                    {[
                        ['department', 'Department'],
                        ['category', 'Category'],
                        ['location', 'Location'],
                        ['employment_type', 'Employment Type'],
                        ['experience_level', 'Experience Level'],
                        ['work_mode', 'Work Mode'],
                        ['skill', 'Technology / Skill'],
                    ].map(([key, label]) => (
                        <select key={key} value={filters[key]} onChange={(e) => setFilter(key, e.target.value)} className={selectCls} data-testid={`filter-${key}`}>
                            <option value="" className="bg-slate-950">{label}</option>
                            {options[key].map((o) => (
                                <option key={o} value={o} className="bg-slate-950">{o}</option>
                            ))}
                        </select>
                    ))}
                    {(Object.values(filters).some(Boolean) || query) && (
                        <button
                            onClick={() => { setFilters({ department: '', category: '', location: '', employment_type: '', experience_level: '', work_mode: '', skill: '' }); setQuery(''); setVisible(9); }}
                            className="text-xs text-slate-500 hover:text-white transition-colors px-2"
                            data-testid="clear-job-filters"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="mt-12 font-mono-xu text-xs tracking-[0.3em] text-slate-500">LOADING POSITIONS…</div>
                ) : filtered.length === 0 ? (
                    <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-10 text-center" data-testid="no-jobs">
                        {jobs.length === 0 ? (
                            <>
                                <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500">NO CURRENT OPENINGS</div>
                                <p className="text-sm text-slate-400 mt-4 max-w-md mx-auto leading-relaxed">
                                    We don't have any current openings, but we're always interested in connecting with talented professionals.
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="font-display font-semibold text-xl">No positions match your search</div>
                                <p className="text-sm text-slate-400 mt-3 max-w-md mx-auto">
                                    Try removing a filter — or submit your profile and we'll keep you in mind.
                                </p>
                            </>
                        )}
                        <button
                            onClick={() => { setGeneralOpen(true); document.querySelector('#general')?.scrollIntoView({ behavior: 'smooth' }); }}
                            className="mt-6 rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold px-8 py-3.5 transition-colors"
                            data-testid="no-jobs-submit-profile"
                        >
                            Submit Your Profile
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {shown.map((job, i) => (
                                <JobCard key={job.job_id} job={job} index={i} />
                            ))}
                        </div>
                        {filtered.length > visible && (
                            <div className="mt-10 text-center">
                                <button
                                    onClick={() => setVisible((v) => v + 9)}
                                    data-testid="load-more-jobs"
                                    className="rounded-full border border-white/20 hover:border-brand/60 text-slate-300 hover:text-white text-sm font-semibold px-8 py-3.5 transition-all duration-300"
                                >
                                    Load More ({filtered.length - visible} remaining)
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            <section className="py-20 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto border-t border-white/5">
                <SectionHead kicker="OUR TECHNOLOGY AREAS" title="Technology at the Heart of What We Build." />
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {TECH_AREAS.map((t, i) => (
                        <motion.div key={t.t} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 4) * 0.05 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <div className="font-display font-semibold text-sm">{t.t}</div>
                            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{t.d}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-20 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <SectionHead kicker="ENGINEERING & R&D" title="Where Engineering Meets Innovation." desc="Our engineering and R&D teams work across hardware, firmware, networking, cloud software, mobile applications, and intelligent connectivity technologies." />
                        <Link
                            to="/company#rnd"
                            data-testid="explore-rnd"
                            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-brand hover:text-brand-soft transition-colors"
                        >
                            Explore R&D <ArrowRight size={15} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {RD_AREAS.map((a, i) => (
                            <motion.div key={a} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                                className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-mono-xu text-[10px] tracking-[0.2em] text-slate-300">
                                {a.toUpperCase()}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {hasInternship && internshipJob && (
                <section className="py-20 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto border-t border-white/5" data-testid="early-career">
                    <div className="rounded-3xl border border-brand/20 bg-brand/5 p-10 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <div>
                            <div className="font-mono-xu text-[10px] tracking-[0.3em] text-brand flex items-center gap-2">
                                <GraduationCap size={14} /> EARLY CAREER
                            </div>
                            <h2 className="font-display font-bold text-3xl tracking-tight mt-3">Start Your Career With Us.</h2>
                            <p className="text-slate-400 text-sm mt-3 max-w-lg leading-relaxed">
                                Internships and entry-level roles appear in Open Positions whenever they are available.
                                Currently open: {internshipJob.title} — {internshipJob.location}.
                            </p>
                        </div>
                        <Link
                            to={`/careers/${internshipJob.slug}`}
                            data-testid="early-career-cta"
                            className="rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold tracking-wide px-8 py-4 transition-all duration-300 shrink-0"
                        >
                            Explore Early Career Opportunities
                        </Link>
                    </div>
                </section>
            )}

            <section id="general" className="scroll-mt-24 py-20 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto border-t border-white/5">
                <SectionHead
                    center
                    kicker="SPONTANEOUS APPLICATION"
                    title="Don't See the Right Role?"
                    desc="We're always interested in connecting with talented professionals whose skills align with our technology and business."
                />
                <div className="mt-10 text-center">
                    {!generalOpen ? (
                        <button
                            onClick={() => setGeneralOpen(true)}
                            data-testid="submit-profile-open"
                            className="rounded-full border border-brand/50 text-brand-soft hover:bg-brand/10 text-sm font-semibold tracking-wide px-9 py-4 transition-all duration-300"
                        >
                            Submit Your Profile
                        </button>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-left rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
                            <div className="font-mono-xu text-[10px] tracking-[0.3em] text-brand mb-6">GENERAL APPLICATION</div>
                            <ApplicationForm general />
                        </motion.div>
                    )}
                </div>
            </section>

            <section className="py-20 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto border-t border-white/5">
                <SectionHead kicker="CAREERS FAQ" title="Common Questions." />
                <div className="mt-10 space-y-3">
                    {CAREERS_FAQS.map((f, i) => (
                        <motion.details
                            key={i}
                            {...fadeUp}
                            transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                            className="group rounded-2xl border border-white/10 bg-white/5 px-6 py-5 open:border-brand/40 transition-colors duration-300"
                            data-testid={`careers-faq-${i}`}
                        >
                            <summary className="cursor-pointer list-none flex items-center justify-between font-display font-medium text-base">
                                {f.q}
                                <span className="ml-4 font-mono-xu text-brand transition-transform duration-300 group-open:rotate-45">+</span>
                            </summary>
                            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-3xl">{f.a}</p>
                        </motion.details>
                    ))}
                </div>
            </section>

            <section className="py-24 px-6 sm:px-12 md:px-24 border-t border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h2 {...fadeUp} className="font-display font-bold tracking-tight text-3xl sm:text-5xl leading-tight">
                        Ready to Build What's Next?
                    </motion.h2>
                    <motion.p {...fadeUp} className="mt-5 text-slate-400 leading-relaxed">
                        Explore open positions and find your opportunity to work on advanced connectivity technology.
                    </motion.p>
                    <motion.div {...fadeUp} className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => document.querySelector('#positions')?.scrollIntoView({ behavior: 'smooth' })}
                            data-testid="final-cta-positions"
                            className="rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold tracking-wide px-9 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#00D084]/40"
                        >
                            View Open Positions
                        </button>
                        <button
                            onClick={() => { setGeneralOpen(true); setTimeout(() => document.querySelector('#general')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                            data-testid="final-cta-profile"
                            className="rounded-full border border-white/20 hover:border-brand/60 text-slate-300 hover:text-white text-sm font-semibold tracking-wide px-9 py-4 transition-all duration-300"
                        >
                            Submit Your Profile
                        </button>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
