import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { fadeUp } from './Chapter';

// Video-first testimonials. No real customer videos exist yet — these are
// polished placeholders. Data model is ready for real videos (videoUrl/poster).
const VIDEO_STORIES = [
    { id: 'featured', title: 'Customer Story', subtitle: 'Coming Soon', videoUrl: null, poster: null, name: null, designation: null, company: null, industry: 'Internet Service Provider', featured: true, isDemo: true },
    { id: 'story-2', title: 'Customer Story', subtitle: 'Coming Soon', videoUrl: null, poster: null, name: null, designation: null, company: null, industry: 'Telecom Operator', featured: false, isDemo: true },
    { id: 'story-3', title: 'Customer Story', subtitle: 'Coming Soon', videoUrl: null, poster: null, name: null, designation: null, company: null, industry: 'Network Service Provider', featured: false, isDemo: true },
];

function VideoCard({ story, large }) {
    return (
        <motion.div
            {...fadeUp}
            className={`group relative rounded-2xl overflow-hidden bg-[#020617] border border-slate-800 ${large ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}
            data-testid={`video-testimonial-${story.id}`}
        >
            {/* subtle tech texture */}
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#5CE8B4 1px, transparent 1px), linear-gradient(90deg, #5CE8B4 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            {/* play */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={`${large ? 'w-20 h-20' : 'w-14 h-14'} rounded-full border-2 border-[#00D084]/70 bg-[#00D084]/10 backdrop-blur flex items-center justify-center transition-all duration-300 group-hover:bg-[#00D084]/25 group-hover:scale-105`}>
                    <Play size={large ? 26 : 18} className="text-[#00D084] ml-1" fill="currentColor" />
                </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                <div>
                    <div className="font-mono-xu text-[9px] tracking-[0.25em] text-[#00D084]">{story.industry.toUpperCase()}</div>
                    <div className={`font-display font-semibold text-white mt-1.5 ${large ? 'text-xl' : 'text-base'}`}>{story.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{story.subtitle}</div>
                </div>
                <span className="font-mono-xu text-[8px] tracking-[0.18em] text-slate-500 border border-white/10 rounded-full px-2.5 py-1 shrink-0">VIDEO</span>
            </div>
        </motion.div>
    );
}

export function Testimonials() {
    const [featured, ...rest] = VIDEO_STORIES;
    return (
        <div className="mt-14" data-testid="testimonials">
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5">
                <VideoCard story={featured} large />
                <div className="grid gap-5">
                    {rest.map((s) => (
                        <VideoCard key={s.id} story={s} />
                    ))}
                </div>
            </div>
            <p className="mt-6 font-mono-xu text-[9px] tracking-[0.15em] text-slate-400" data-testid="testimonials-demo-note">
                CUSTOMER STORY VIDEOS ARE IN PRODUCTION — SLOTS ARE READY FOR REAL TESTIMONIALS.
            </p>
        </div>
    );
}
