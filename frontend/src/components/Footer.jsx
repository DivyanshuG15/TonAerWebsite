import { Link } from 'react-router-dom';

const COLS = [
    {
        h: 'PRODUCTS',
        links: [
            ['All Products', '/product', 'footer-product-link'],
            ['Compare Gateways', '/products/compare', 'footer-compare-link'],
            ['Look & Feel', '/product?tab=look', null],
        ],
    },
    {
        h: 'TECHNOLOGY',
        links: [
            ['Platform', '/technology#platform', null],
            ['Intelligence', '/technology#intelligence', null],
            ['Hardware', '/technology#hardware', null],
        ],
    },
    {
        h: 'COMPANY',
        links: [
            ['About', '/about', 'footer-about-link'],
            ['Careers', '/careers', 'footer-careers-link'],
            ['Contact', '/#contact', 'footer-demo-link'],
        ],
    },
    {
        h: 'RESOURCES',
        links: [
            ['Insights', '/resources/blog', 'footer-insights-link'],
            ['Support', '/support', 'footer-support-link'],
            ['Documentation', '/support#documentation', null],
        ],
    },
];

export function Footer() {
    return (
        <footer className="relative z-10 bg-[#020617] text-slate-400 border-t border-white/10" data-testid="site-footer">
            <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-14 grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10">
                <div className="col-span-2 md:col-span-1">
                    <div className="font-display font-bold tracking-[0.22em] text-white flex items-center gap-2 mb-4">
                        TONAER
                        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    </div>
                    <p className="text-xs leading-relaxed max-w-[240px]">
                        Hardware that connects. Software that understands — from gateway to cloud intelligence.
                    </p>
                </div>
                {COLS.map((c) => (
                    <div key={c.h}>
                        <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500 mb-4">{c.h}</div>
                        <ul className="space-y-2 text-sm">
                            {c.links.map(([label, to, tid]) => (
                                <li key={label}>
                                    <Link to={to} className="hover:text-white transition-colors" data-testid={tid || undefined}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="border-t border-white/5 py-5 text-center font-mono-xu text-[10px] tracking-[0.3em] text-slate-600">
                TONAER © 2026 — CONNECTIVITY, REIMAGINED.
            </div>
        </footer>
    );
}
