import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollStore, clamp01, quality } from './store';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') window.__xu = scrollStore;

export function ScrollRig() {
    useEffect(() => {
        if (quality.reduced) {
            const onScroll = () => {
                const el = document.getElementById('scroll-track');
                if (!el) return;
                const max = el.offsetHeight - window.innerHeight;
                scrollStore.progress = clamp01(window.scrollY / Math.max(max, 1));
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
            return () => window.removeEventListener('scroll', onScroll);
        }

        const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
        scrollStore.lenis = lenis;
        lenis.on('scroll', ScrollTrigger.update);
        const tick = (t) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        const st = ScrollTrigger.create({
            trigger: '#scroll-track',
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                scrollStore.progress = self.progress;
            },
        });
        ScrollTrigger.refresh();

        return () => {
            st.kill();
            gsap.ticker.remove(tick);
            lenis.destroy();
            scrollStore.lenis = null;
            scrollStore.progress = 0;
        };
    }, []);

    return null;
}
