import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { scrollStore } from '../experience/store';

const LINKS = [
    { to: '/', label: 'Experience', testId: 'nav-experience-link' },
    { to: '/product', label: 'Products', testId: 'nav-product-link' },
    { to: '/technology', label: 'Technology', testId: 'nav-technology-link' },
    { to: '/support', label: 'Support', testId: 'nav-support-link' },
];

export function Nav() {
    const barRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let raf;
        const loop = () => {
            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${scrollStore.progress})`;
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, []);

    const goDemo = () => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => scrollStore.lenis?.scrollTo('#contact', { duration: 1.6 }), 600);
        } else {
            scrollStore.lenis?.scrollTo('#contact', { duration: 1.6 });
        }
    };

    return (
        <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4" data-testid="main-nav">
            <nav className="relative flex items-center gap-1 sm:gap-2 rounded-full bg-slate-950/70 backdrop-blur-xl border border-white/10 text-white pl-5 pr-2 py-2 shadow-2xl shadow-slate-950/30">
                <Link to="/" className="font-display font-bold tracking-[0.22em] text-sm mr-2 flex items-center gap-2" data-testid="nav-logo">
                    XUNISON
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 led-blink" />
                </Link>
                <span className="hidden sm:block w-px h-4 bg-white/15 mr-1" />
                <div className="hidden md:flex items-center gap-1">
                    {LINKS.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            data-testid={l.testId}
                            className={({ isActive }) =>
                                `px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-300 ${
                                    isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                                }`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </div>
                <button
                    onClick={goDemo}
                    data-testid="nav-cta-demo"
                    className="ml-2 rounded-full bg-[#0066FF] hover:bg-sky-500 transition-colors duration-300 text-white text-xs font-semibold tracking-wide px-4 py-2"
                >
                    Request Demo
                </button>
                <span className="absolute -bottom-px left-6 right-6 h-px bg-white/10 overflow-hidden rounded-full">
                    <span ref={barRef} className="block h-full w-full bg-sky-400 origin-left" style={{ transform: 'scaleX(0)' }} />
                </span>
            </nav>
        </header>
    );
}
