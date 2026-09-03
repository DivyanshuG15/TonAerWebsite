import { useEffect } from 'react';

function setMeta(attr, key, content) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

// Lightweight SEO: title, description, canonical + Open Graph per page.
export function useSEO({ title, description, canonical, ogType = 'website', jsonLd = null }) {
    const jsonLdStr = jsonLd ? JSON.stringify(jsonLd) : null;
    useEffect(() => {
        document.title = title;
        if (description) {
            setMeta('name', 'description', description);
            setMeta('property', 'og:description', description);
        }
        setMeta('property', 'og:title', title);
        setMeta('property', 'og:type', ogType);
        if (canonical) {
            setMeta('property', 'og:url', canonical);
            let link = document.head.querySelector('link[rel="canonical"]');
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'canonical');
                document.head.appendChild(link);
            }
            link.setAttribute('href', canonical);
        }
        let script;
        if (jsonLdStr) {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            script.dataset.seoJsonld = 'true';
            script.textContent = jsonLdStr;
            document.head.appendChild(script);
        }
        return () => {
            if (script) script.remove();
        };
    }, [title, description, canonical, ogType, jsonLdStr]);
}
