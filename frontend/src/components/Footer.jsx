import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="relative z-10 bg-[#020617] text-slate-400 border-t border-white/10" data-testid="site-footer">
            <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
                <div className="col-span-2 md:col-span-1">
                    <div className="font-display font-bold tracking-[0.22em] text-white flex items-center gap-2 mb-4">
                        XUNISON
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    </div>
                    <p className="text-xs leading-relaxed">
                        Connectivity, reimagined — from the D71 gateway to cloud intelligence and the connected environments of tomorrow.
                    </p>
                </div>
                <div>
                    <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500 mb-4">PRODUCT</div>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/product" className="hover:text-white transition-colors" data-testid="footer-product-link">D71 Gateway</Link></li>
                        <li><Link to="/technology" className="hover:text-white transition-colors" data-testid="footer-technology-link">Technology</Link></li>
                        <li><Link to="/#contact" className="hover:text-white transition-colors" data-testid="footer-demo-link">Request Demo</Link></li>
                    </ul>
                </div>
                <div>
                    <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500 mb-4">COMPANY</div>
                    <ul className="space-y-2 text-sm">
                        <li><span className="hover:text-white transition-colors cursor-pointer">About</span></li>
                        <li><span className="hover:text-white transition-colors cursor-pointer">R&D Intelligence</span></li>
                        <li><span className="hover:text-white transition-colors cursor-pointer">Careers</span></li>
                    </ul>
                </div>
                <div>
                    <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500 mb-4">SUPPORT</div>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/support" className="hover:text-white transition-colors" data-testid="footer-support-link">Help Center</Link></li>
                        <li><Link to="/support" className="hover:text-white transition-colors">Firmware</Link></li>
                        <li><Link to="/support" className="hover:text-white transition-colors">ISP Portal</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/5 py-6 text-center font-mono-xu text-[10px] tracking-[0.3em] text-slate-600">
                XUNISON © 2026 — CONNECTIVITY, REIMAGINED.
            </div>
        </footer>
    );
}
