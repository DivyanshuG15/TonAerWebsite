import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Footer } from '../components/Footer';
import { CompareSection } from '../components/catalog/CompareSection';
import { productById } from '../data/catalog';

export default function ComparePage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Deep links: /products/compare?product=D71 or ?products=D71,M40
    const raw = searchParams.get('products') || searchParams.get('product') || '';
    const initial = raw
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter((id) => id && productById(id))
        .slice(0, 4);

    const viewProduct = (p) => navigate(`/product?series=${p.series}&model=${p.id}`);

    return (
        <div className="bg-[#020617] text-white" data-testid="compare-page">
            <section className="pt-32 pb-8 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="font-mono-xu text-[11px] tracking-[0.35em] text-brand mb-5 flex items-center gap-3"
                >
                    <span className="w-8 h-px bg-current" />
                    PRODUCTS // COMPARISON
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-bold tracking-tight text-4xl sm:text-5xl leading-tight"
                >
                    Compare Gateways
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-4 max-w-2xl text-slate-400 leading-relaxed"
                >
                    Compare TonAer gateways across wireless performance, connectivity, network capabilities, management,
                    security, and advanced technologies. Select up to 4 gateways to compare.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mt-5"
                >
                    <Link
                        to="/product"
                        data-testid="browse-gateways"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-soft transition-colors"
                    >
                        Browse the full catalog <ArrowRight size={13} />
                    </Link>
                </motion.div>
            </section>

            <section className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto pb-24">
                <CompareSection key={initial.join(',')} initialSelected={initial} onSelect={viewProduct} />
            </section>

            <Footer />
        </div>
    );
}
