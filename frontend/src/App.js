import { useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Nav } from '@/components/Nav';
import HomePage from '@/pages/HomePage';
import ProductPage from '@/pages/ProductPage';
import TechnologyPage from '@/pages/TechnologyPage';
import SupportPage from '@/pages/SupportPage';
import CompanyPage from '@/pages/CompanyPage';
import CareersPage from '@/pages/CareersPage';
import JobDetailPage from '@/pages/JobDetailPage';
import ComparePage from '@/pages/ComparePage';
import AboutPage from '@/pages/AboutPage';
import BlogPage from '@/pages/BlogPage';
import ArticlePage from '@/pages/ArticlePage';

function SeriesRedirect() {
    const { seriesId } = useParams();
    const valid = ['d', 'm', 'q', 'o'].includes(seriesId);
    return <Navigate to={valid ? `/product?series=${seriesId}` : '/product'} replace />;
}
import { initQuality, scrollStore } from '@/experience/store';

initQuality();

function ScrollManager() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (hash) {
            const t = setTimeout(() => {
                const el = document.querySelector(hash);
                if (!el) return;
                if (scrollStore.lenis) scrollStore.lenis.scrollTo(el, { duration: 1.4 });
                else el.scrollIntoView({ behavior: 'smooth' });
            }, 600);
            return () => clearTimeout(t);
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);
    return null;
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <ScrollManager />
                <Nav />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/products/compare" element={<ComparePage />} />
                    <Route path="/technology" element={<TechnologyPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/series/:seriesId" element={<SeriesRedirect />} />
                    <Route path="/company" element={<CompanyPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/resources/blog" element={<BlogPage />} />
                    <Route path="/resources/blog/:slug" element={<ArticlePage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/careers/:slug" element={<JobDetailPage />} />
                </Routes>
            </BrowserRouter>
            <Toaster position="bottom-right" richColors />
        </div>
    );
}

export default App;
