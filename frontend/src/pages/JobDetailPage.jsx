import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { ApplicationForm } from '../components/careers/ApplicationForm';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

function ListBlock({ title, items }) {
    if (!items?.length) return null;
    return (
        <motion.section {...fadeUp} className="border-t border-white/10 pt-10">
            <h2 className="font-mono-xu text-[11px] tracking-[0.3em] text-brand">{title}</h2>
            <ul className="mt-5 space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </motion.section>
    );
}

export default function JobDetailPage() {
    const { slug } = useParams();
    const [job, setJob] = useState(null);
    const [state, setState] = useState('loading');

    useEffect(() => {
        setState('loading');
        axios
            .get(`${API}/jobs/${slug}`)
            .then((r) => {
                setJob(r.data);
                setState('ok');
            })
            .catch(() => setState('notfound'));
    }, [slug]);

    useEffect(() => {
        if (!job) return;
        document.title = `${job.title} — Careers at TonAer`;
        let meta = document.querySelector('meta[name="description"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'description';
            document.head.appendChild(meta);
        }
        meta.content = `${job.title} at TonAer — ${job.department}, ${job.location}. ${job.short_description}`;
        const ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.id = 'job-jsonld';
        ld.text = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'JobPosting',
            title: job.title,
            description: job.short_description,
            identifier: { '@type': 'PropertyValue', name: 'TonAer', value: job.ref_id },
            hiringOrganization: { '@type': 'Organization', name: 'TonAer' },
            jobLocation: { '@type': 'Place', address: job.location },
            employmentType: job.employment_type,
            datePosted: job.posted_date,
            ...(job.deadline ? { validThrough: job.deadline } : {}),
        });
        document.head.appendChild(ld);
        return () => document.getElementById('job-jsonld')?.remove();
    }, [job]);

    if (state === 'loading') {
        return (
            <div className="bg-[#020617] text-white min-h-screen flex items-center justify-center">
                <span className="font-mono-xu text-xs tracking-[0.3em] text-slate-500">LOADING POSITION…</span>
            </div>
        );
    }

    if (state === 'notfound') {
        return (
            <div className="bg-[#020617] text-white min-h-screen flex flex-col items-center justify-center text-center px-6">
                <div className="font-display font-bold text-3xl">Position not found</div>
                <p className="text-slate-400 mt-3">This role may have been filled or removed.</p>
                <Link to="/careers" className="mt-6 text-brand hover:text-brand-soft text-sm font-semibold" data-testid="job-notfound-back">
                    ← Browse open positions
                </Link>
            </div>
        );
    }

    const closed = job.status === 'CLOSED';

    return (
        <div className="bg-[#020617] text-white" data-testid="job-detail-page">
            <section className="pt-32 pb-14 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto">
                <Link to="/careers" className="inline-flex items-center gap-2 font-mono-xu text-[10px] tracking-[0.3em] text-slate-400 hover:text-brand transition-colors" data-testid="job-back">
                    <ArrowLeft size={13} /> ALL POSITIONS
                </Link>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="mt-8 flex flex-wrap items-center gap-2">
                        <span className="font-mono-xu text-[10px] tracking-[0.25em] text-brand border border-brand/30 rounded-full px-3 py-1">
                            {job.department.toUpperCase()}
                        </span>
                        {closed && (
                            <span className="font-mono-xu text-[10px] tracking-[0.25em] text-amber-300 border border-amber-400/40 rounded-full px-3 py-1" data-testid="job-closed-badge">
                                POSITION CLOSED
                            </span>
                        )}
                        {job.isDemo && (
                            <span className="font-mono-xu text-[10px] tracking-[0.25em] text-slate-400 border border-white/20 rounded-full px-3 py-1" data-testid="job-demo-badge">
                                SAMPLE / DEMO POSITION
                            </span>
                        )}
                    </div>
                    <h1 className="font-display font-bold tracking-tight text-4xl sm:text-5xl leading-tight mt-5" data-testid="job-title">
                        {job.title}
                    </h1>
                    <p className="mt-4 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">{job.short_description}</p>
                    <div className="mt-7 flex flex-wrap gap-2">
                        {[
                            job.location,
                            job.employment_type,
                            job.work_mode,
                            job.experience || job.experience_level,
                            `Posted ${job.posted_date}`,
                            job.deadline ? `Apply by ${job.deadline}` : null,
                            `Ref ${job.ref_id}`,
                        ]
                            .filter(Boolean)
                            .map((m) => (
                                <span key={m} className="font-mono-xu text-[9px] tracking-[0.15em] border border-white/15 text-slate-400 rounded-full px-3 py-1.5">
                                    {m.toUpperCase()}
                                </span>
                            ))}
                    </div>
                </motion.div>
            </section>

            <div className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto pb-10 space-y-12">
                <motion.section {...fadeUp} className="border-t border-white/10 pt-10">
                    <h2 className="font-mono-xu text-[11px] tracking-[0.3em] text-brand">ABOUT THE ROLE</h2>
                    <p className="mt-5 text-slate-300 leading-relaxed text-sm sm:text-base max-w-3xl">{job.about_role}</p>
                </motion.section>
                <ListBlock title="WHAT YOU'LL DO" items={job.responsibilities} />
                <ListBlock title="REQUIRED QUALIFICATIONS" items={job.required} />
                <ListBlock title="PREFERRED QUALIFICATIONS" items={job.preferred} />
                <motion.section {...fadeUp} className="border-t border-white/10 pt-10">
                    <h2 className="font-mono-xu text-[11px] tracking-[0.3em] text-brand">TECHNOLOGY / SKILLS</h2>
                    <div className="mt-5 flex flex-wrap gap-2" data-testid="job-skills">
                        {job.skills.map((s) => (
                            <span key={s} className="font-mono-xu text-[10px] tracking-[0.15em] border border-brand/30 text-brand-soft rounded-full px-3 py-1.5">
                                {s}
                            </span>
                        ))}
                    </div>
                </motion.section>
                <ListBlock title="WHAT WE OFFER" items={job.benefits} />
                <motion.section {...fadeUp} className="border-t border-white/10 pt-10">
                    <h2 className="font-mono-xu text-[11px] tracking-[0.3em] text-brand">APPLICATION PROCESS</h2>
                    <div className="mt-6 grid sm:grid-cols-4 gap-3">
                        {['Application Review', 'Intro Conversation', 'Technical Interviews', 'Decision & Offer'].map((s, i) => (
                            <div key={s} className="rounded-xl border border-white/10 bg-white/5 p-4">
                                <div className="font-mono-xu text-[9px] tracking-[0.25em] text-brand">STEP {i + 1}</div>
                                <div className="text-sm font-medium mt-2">{s}</div>
                            </div>
                        ))}
                    </div>
                </motion.section>
            </div>

            <section className="px-6 sm:px-12 md:px-24 max-w-5xl mx-auto pb-24">
                {closed ? (
                    <div className="rounded-3xl border border-amber-400/30 bg-amber-400/5 p-10 text-center" data-testid="job-closed-panel">
                        <div className="font-display font-bold text-2xl">Position Closed</div>
                        <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
                            This role is no longer accepting applications. Browse other open positions or submit your profile for future opportunities.
                        </p>
                        <Link to="/careers" className="inline-block mt-6 rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold px-8 py-3.5 transition-colors" data-testid="job-closed-browse">
                            View Open Positions
                        </Link>
                    </div>
                ) : (
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10" data-testid="apply-section">
                        <h2 className="font-display font-bold text-2xl tracking-tight mb-8">Apply Now</h2>
                        <ApplicationForm job={job} demo={!!job.isDemo} />
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
}
