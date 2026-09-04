import { motion } from 'framer-motion';

// SAMPLE / DEMO testimonials — layout preview only.
// Replace with verified customer quotes when available (see data flags below).
const TESTIMONIALS = [
    {
        quote: 'Having hardware, cloud management and network intelligence from one partner removed the gaps between our operations teams. Deployment visibility changed how we support subscribers.',
        name: 'Network Operations Lead',
        designation: 'VP Network Operations',
        company: 'Regional ISP',
        industry: 'Internet Service Provider',
        logo: null,
        featured: true,
        isDemo: true,
    },
    {
        quote: 'The white-label approach let us launch a fully branded connectivity service without building the technology stack ourselves — hardware, apps and cloud under our name.',
        name: 'Head of Product',
        designation: 'Product Director',
        company: 'Telecom Operator',
        industry: 'Telecommunications',
        logo: null,
        featured: false,
        isDemo: true,
    },
    {
        quote: 'Centralized device management turned thousands of deployed gateways from a support burden into a managed fleet. Remote diagnostics alone changed our response times.',
        name: 'Technical Director',
        designation: 'CTO Office',
        company: 'Network Service Provider',
        industry: 'Managed Network Services',
        logo: null,
        featured: false,
        isDemo: true,
    },
];

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export function Testimonials() {
    return (
        <div className="mt-14" data-testid="testimonials">
            <div className="grid md:grid-cols-3 gap-5">
                {TESTIMONIALS.map((t, i) => (
                    <motion.figure
                        key={t.company}
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                        className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col"
                        data-testid={`testimonial-${i}`}
                    >
                        <blockquote className="text-sm text-slate-600 leading-relaxed flex-1">"{t.quote}"</blockquote>
                        <figcaption className="mt-6 pt-5 border-t border-slate-100">
                            <div className="font-display font-semibold text-sm text-slate-900">{t.name}</div>
                            <div className="text-xs text-slate-500 mt-1">
                                {t.designation} · {t.company}
                            </div>
                            {t.isDemo && (
                                <span className="inline-block mt-3 font-mono-xu text-[8px] tracking-[0.18em] text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">
                                    SAMPLE TESTIMONIAL
                                </span>
                            )}
                        </figcaption>
                    </motion.figure>
                ))}
            </div>
            <p className="mt-5 font-mono-xu text-[9px] tracking-[0.15em] text-slate-400" data-testid="testimonials-demo-note">
                SAMPLE TESTIMONIALS FOR LAYOUT PREVIEW — REPLACED WITH VERIFIED CUSTOMER QUOTES WHEN AVAILABLE.
            </p>
        </div>
    );
}
