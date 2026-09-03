import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function JobCard({ job, index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % 9) * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 hover:border-brand/40 p-6 transition-all duration-300 group flex flex-col"
            data-testid={`job-card-${job.slug}`}
        >
            <div className="flex items-center justify-between">
                <span className="font-mono-xu text-[9px] tracking-[0.25em] text-brand">{job.department.toUpperCase()}</span>
                {job.isDemo ? (
                    <span className="font-mono-xu text-[8px] tracking-[0.2em] border border-white/20 text-slate-400 rounded-full px-2 py-0.5" data-testid="demo-badge">
                        SAMPLE OPENING
                    </span>
                ) : (
                    <span className="font-mono-xu text-[9px] tracking-[0.2em] text-slate-600">{job.ref_id}</span>
                )}
            </div>
            <div className="font-display font-semibold text-lg mt-3 group-hover:text-brand transition-colors">{job.title}</div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed flex-1">{job.short_description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
                {[job.location, job.employment_type, job.work_mode, job.experience || job.experience_level].filter(Boolean).map((m) => (
                    <span key={m} className="font-mono-xu text-[8px] tracking-[0.12em] border border-white/15 text-slate-400 rounded-full px-2 py-0.5">
                        {m.toUpperCase()}
                    </span>
                ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
                {job.skills.slice(0, 4).map((s) => (
                    <span key={s} className="text-[10px] text-brand-soft/80">{s}</span>
                ))}
            </div>
            <Link
                to={`/careers/${job.slug}`}
                data-testid={`job-view-${job.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-soft transition-colors"
            >
                View Position <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    );
}
