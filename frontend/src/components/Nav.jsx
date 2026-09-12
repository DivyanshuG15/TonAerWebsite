import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { scrollStore } from '../experience/store';

const MENUS = [
    {
        id: 'solutions',
        label: 'Solutions',
        roots: ['/'],
        items: [
            { t: 'White-Label Connectivity', d: 'Your brand on carrier-grade hardware', to: '/#whitelabel' },
            { t: 'Cloud Device Management', d: 'Provision, configure and update fleets remotely', to: '/#cloud' },
            { t: 'Network Management Platform', d: 'One console for customers, devices and operations', to: '/#cloud' },
            { t: 'Mobile Applications', d: 'Branded subscriber apps, ready to ship', to: '/#ecosystem' },
            { t: 'AI Network Intelligence', d: 'Detect, predict and resolve automatically', to: '/#intelligence' },
            { t: 'Remote Monitoring & Troubleshooting', d: 'See issues before customers do', to: '/#cloud' },
        ],
    },
    {
        id: 'products',
        label: 'Products',
        roots: ['/product', '/products', '/series'],
        mega: true,
        items: [],
    },
    {
        id: 'technology',
        label: 'Technology',
        roots: ['/technology'],
        items: [
            { t: 'Wi-Fi Technology', d: 'Wi-Fi 7, MLO, 320 MHz, 4096-QAM', to: '/technology#wifi' },
            { t: 'Mesh Networking', d: 'Self-organizing whole-home coverage', to: '/technology#mesh' },
            { t: 'Cloud Architecture', d: 'Fleet-scale telemetry and control', to: '/technology#cloud' },
            { t: 'AI Network Intelligence', d: 'Anomaly detection and self-optimization', to: '/technology#ai' },
            { t: 'IoT Connectivity', d: 'Every device class, one network', to: '/technology#iot' },
            { t: 'Network Security', d: 'Enterprise-grade protection built in', to: '/technology#security' },
        ],
    },
    {
        id: 'company',
        label: 'Company',
        roots: ['/company', '/about'],
        items: [
            { t: 'About Us', d: 'The team behind the platform', to: '/about' },
            { t: 'Research & Development', d: 'What wireless can reveal next', to: '/company#rnd' },
            { t: 'Engineering & Innovation', d: 'Hardware, cloud and apps in-house', to: '/company#engineering' },
            { t: 'Careers', d: 'Build the future of connectivity', to: '/careers' },
            { t: 'News & Updates', d: 'Product news and release notes', to: '/company#news' },
            { t: 'Annual Reports', d: 'For partners and investors', to: '/company#reports' },
        ],
    },
    {
        id: 'resources',
        label: 'Resources',
        roots: ['/support', '/resources'],
        items: [
            { t: 'Documentation', d: 'Guides, data models and API references', to: '/support#documentation' },
            { t: 'Downloads', d: 'Firmware notes and datasheets', to: '/support#downloads' },
            { t: 'Support', d: 'Help center and troubleshooting', to: '/support' },
            { t: 'FAQs', d: 'Answers, instantly', to: '/support#faqs' },
            { t: 'Insights / Blog', d: 'Field notes from real deployments', to: '/resources/blog' },
            { t: 'Contact Us', d: 'Talk to our team', to: '/#contact' },
        ],
    },
];

const SERIES_MENU = [
    { id: 'd', name: 'D Series', d: 'Flagship Wi-Fi 7 — D71' },
    { id: 'm', name: 'M Series', d: 'Mass-market fiber' },
    { id: 'q', name: 'Q Series', d: '5G / LTE cellular CPE' },
    { id: 'o', name: 'O Series', d: 'Outdoor & ruggedized' },
];

function isGroupActive(menu, pathname) {
    return menu.roots.some((r) => (r === '/' ? pathname === '/' : pathname.startsWith(r)));
}

function ProductsMega({ light }) {
    const card = light
        ? 'border-slate-200 bg-slate-50 hover:border-[#00D084]/50'
        : 'border-white/10 bg-white/5 hover:border-brand/40';
    return (
        <div className="grid grid-cols-[1fr_1.2fr] gap-6 w-[560px] max-w-[85vw]">
            <div>
                <Link
                    to="/product"
                    data-testid="mega-all-products"
                    className={`block rounded-xl border p-5 transition-colors duration-300 ${card}`}
                >
                    <div className={`font-display font-semibold ${light ? 'text-slate-900' : 'text-white'}`}>All Products</div>
                    <p className={`text-xs mt-2 leading-relaxed ${light ? 'text-slate-500' : 'text-slate-400'}`}>
                        The complete TonAer hardware portfolio — one platform, four series.
                    </p>
                </Link>
                <Link
                    to="/products/compare"
                    data-testid="mega-compare-gateways"
                    className={`mt-3 block rounded-xl border p-5 transition-colors duration-300 ${card}`}
                >
                    <div className={`font-display font-semibold ${light ? 'text-slate-900' : 'text-white'}`}>Compare Gateways</div>
                    <p className={`text-xs mt-2 leading-relaxed ${light ? 'text-slate-500' : 'text-slate-400'}`}>
                        Side-by-side specifications across all series — filter by the technologies you need.
                    </p>
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {SERIES_MENU.map((s) => (
                    <Link
                        key={s.id}
                        to={`/series/${s.id}`}
                        data-testid={`mega-series-${s.id}`}
                        className={`rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
                            light ? 'border-slate-200 hover:border-[#00D084]/50 bg-slate-50' : 'border-white/10 hover:border-brand/50 bg-white/5'
                        }`}
                    >
                        <div className="font-display font-bold text-2xl text-brand">{s.id.toUpperCase()}</div>
                        <div className={`text-sm mt-1 ${light ? 'text-slate-900' : 'text-white'}`}>{s.name}</div>
                        <div className={`font-mono-xu text-[9px] tracking-[0.15em] mt-1 ${light ? 'text-slate-400' : 'text-slate-500'}`}>{s.d}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export function Nav() {
    const barRef = useRef();
    const [open, setOpen] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const rootRef = useRef();
    const light = location.pathname === '/' || location.pathname.startsWith('/support');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        let raf;
        const loop = () => {
            if (barRef.current) {
                const p = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
                barRef.current.style.transform = `scaleX(${Math.min(1, p)})`;
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, []);

    useEffect(() => {
        const close = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(null);
        };
        document.addEventListener('pointerdown', close);
        return () => document.removeEventListener('pointerdown', close);
    }, []);

    useEffect(() => {
        setOpen(null);
        setMobileOpen(false);
    }, [location.pathname, location.hash]);

    const goDemo = () => {
        setMobileOpen(false);
        if (location.pathname !== '/') {
            navigate('/#contact');
        } else if (scrollStore.lenis) {
            scrollStore.lenis.scrollTo('#contact', { duration: 1.6 });
        } else {
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4" data-testid="main-nav" ref={rootRef}>
            <nav className={`relative flex items-center gap-1.5 rounded-full backdrop-blur-xl border pl-6 pr-2.5 shadow-2xl transition-all duration-300 ${
                scrolled ? 'py-2.5' : 'py-3.5'
            } ${
                light ? 'bg-white/85 border-slate-200/80 text-slate-900 shadow-slate-900/5' : 'bg-slate-950/70 border-white/10 text-white shadow-slate-950/30'
            }`}>
                <Link to="/" className="font-display font-bold tracking-[0.22em] text-base mr-4 flex items-center gap-2" data-testid="nav-logo">
                    TONAER
                    <span className="w-1.5 h-1.5 rounded-full bg-brand led-blink" />
                </Link>

                <div className="hidden lg:flex items-center">
                    {MENUS.map((menu) => (
                        <div
                            key={menu.id}
                            className="relative"
                            onMouseEnter={() => setOpen(menu.id)}
                            onMouseLeave={() => setOpen(null)}
                        >
                            <button
                                onClick={() => setOpen(open === menu.id ? null : menu.id)}
                                data-testid={`nav-menu-${menu.id}`}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-colors duration-300 ${
                                    isGroupActive(menu, location.pathname)
                                        ? light ? 'text-slate-900 bg-slate-900/5' : 'text-white bg-white/10'
                                        : light ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {menu.label}
                                <ChevronDown size={12} className={`transition-transform duration-300 ${open === menu.id ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {open === menu.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4"
                                    >
                                        <div className={`rounded-2xl backdrop-blur-xl border shadow-2xl p-4 ${
                                            light ? 'bg-white/95 border-slate-200 shadow-slate-900/10' : 'bg-slate-950/95 border-white/10 shadow-slate-950/60'
                                        }`} data-testid={`dropdown-${menu.id}`}>
                                            {menu.mega ? (
                                                <ProductsMega light={light} />
                                            ) : (
                                                <div className="w-[320px]">
                                                    {menu.items.map((item) => (
                                                        <Link
                                                            key={item.t}
                                                            to={item.to}
                                                            data-testid={`nav-item-${item.t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                                            className={`block rounded-xl px-4 py-3 transition-colors duration-200 group ${light ? 'hover:bg-slate-100' : 'hover:bg-white/5'}`}
                                                        >
                                                            <div className={`text-sm ${light ? 'text-slate-700 group-hover:text-slate-900' : 'text-slate-200 group-hover:text-white'}`}>{item.t}</div>
                                                            <div className={`text-[11px] mt-0.5 ${light ? 'text-slate-400' : 'text-slate-500'}`}>{item.d}</div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <button
                    onClick={goDemo}
                    data-testid="nav-cta-demo"
                    className="ml-2 rounded-full bg-[#00D084] hover:bg-brand-strong transition-colors duration-300 text-[#04150E] text-sm font-semibold tracking-wide px-6 py-2.5"
                >
                    Request Demo
                </button>
                <button
                    className={`lg:hidden ml-1 p-2 transition-colors ${light ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`}
                    onClick={() => setMobileOpen(true)}
                    data-testid="nav-hamburger"
                    aria-label="Open menu"
                >
                    <Menu size={18} />
                </button>
                <span className={`absolute -bottom-px left-6 right-6 h-px overflow-hidden rounded-full ${light ? 'bg-slate-200' : 'bg-white/10'}`}>
                    <span ref={barRef} className="block h-full w-full bg-brand origin-left" style={{ transform: 'scaleX(0)' }} />
                </span>
            </nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`lg:hidden fixed inset-0 z-[60] overflow-y-auto ${light ? 'bg-white' : 'bg-[#020617]'}`}
                        data-testid="mobile-menu"
                    >
                        <div className={`flex items-center justify-between px-6 py-5 border-b ${light ? 'border-slate-200' : 'border-white/10'}`}>
                            <span className={`font-display font-bold tracking-[0.22em] ${light ? 'text-slate-900' : 'text-white'}`}>TONAER</span>
                            <button onClick={() => setMobileOpen(false)} className={`p-2 ${light ? 'text-slate-500' : 'text-slate-300'}`} data-testid="mobile-menu-close" aria-label="Close menu">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="px-6 py-6 space-y-2">
                            {MENUS.map((menu) => (
                                <div key={menu.id} className={`border-b ${light ? 'border-slate-100' : 'border-white/5'}`}>
                                    <button
                                        onClick={() => setMobileExpanded(mobileExpanded === menu.id ? null : menu.id)}
                                        className="w-full flex items-center justify-between py-4 text-left"
                                        data-testid={`mobile-accordion-${menu.id}`}
                                    >
                                        <span className={`font-display font-medium ${light ? 'text-slate-900' : 'text-white'}`}>{menu.label}</span>
                                        <ChevronDown size={16} className={`text-brand transition-transform duration-300 ${mobileExpanded === menu.id ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {mobileExpanded === menu.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-4 space-y-1">
                                                    {menu.mega ? (
                                                        <>
                                                            <Link to="/product" className={`block py-2.5 text-sm ${light ? 'text-slate-600' : 'text-slate-300'}`}>All Products</Link>
                                                            {SERIES_MENU.map((s) => (
                                                                <Link key={s.id} to={`/series/${s.id}`} className={`flex items-center gap-3 py-2.5 text-sm ${light ? 'text-slate-600' : 'text-slate-300'}`}>
                                                                    <span className="font-display font-bold text-brand">{s.id.toUpperCase()}</span>
                                                                    {s.name}
                                                                </Link>
                                                            ))}
                                                            <Link to="/products/compare" className="block py-2.5 text-sm text-brand">Compare Gateways</Link>
                                                        </>
                                                    ) : (
                                                        menu.items.map((item) => (
                                                            <Link key={item.t} to={item.to} className="block py-2.5">
                                                                <div className={`text-sm ${light ? 'text-slate-600' : 'text-slate-300'}`}>{item.t}</div>
                                                                <div className={`text-[11px] ${light ? 'text-slate-400' : 'text-slate-600'}`}>{item.d}</div>
                                                            </Link>
                                                        ))
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                            <button
                                onClick={goDemo}
                                data-testid="mobile-cta-demo"
                                className="w-full mt-6 rounded-full bg-[#00D084] text-[#04150E] text-sm font-semibold tracking-wide py-4"
                            >
                                Request Demo
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

