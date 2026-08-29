import { useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Nav } from '@/components/Nav';
import HomePage from '@/pages/HomePage';
import ProductPage from '@/pages/ProductPage';
import TechnologyPage from '@/pages/TechnologyPage';
import SupportPage from '@/pages/SupportPage';
import SeriesPage from '@/pages/SeriesPage';
import { initQuality } from '@/experience/store';

initQuality();

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <ScrollToTop />
                <Nav />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/technology" element={<TechnologyPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/series/:seriesId" element={<SeriesPage />} />
                </Routes>
            </BrowserRouter>
            <Toaster position="bottom-right" richColors />
        </div>
    );
}

export default App;
