import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { quality } from '../experience/store';

export function LoadingScreen({ onDone }) {
    const [pct, setPct] = useState(0);

    useEffect(() => {
        const start = performance.now();
        const dur = quality.reduced ? 400 : 1700;
        let raf;
        const step = (now) => {
            const k = Math.min(1, (now - start) / dur);
            setPct(Math.floor(k * 100));
            if (k < 1) raf = requestAnimationFrame(step);
            else setTimeout(() => onDone?.(), 300);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [onDone]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center"
            data-testid="loading-screen"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
            <div className="relative flex items-center justify-center mb-10">
                <span className="absolute w-16 h-16 rounded-full border border-sky-400/50 signal-ring" />
                <span className="absolute w-16 h-16 rounded-full border border-sky-400/30 signal-ring" style={{ animationDelay: '0.6s' }} />
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 led-blink" />
            </div>
            <div className="overflow-hidden">
                <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-bold tracking-[0.3em] text-white text-2xl"
                >
                    XUNISON
                </motion.div>
            </div>
            <div className="font-mono-xu text-[10px] tracking-[0.4em] text-sky-400/70 mt-4">
                CONNECTING EXPERIENCE...
            </div>
            <div className="font-mono-xu text-xs text-slate-500 mt-8 tabular-nums" data-testid="loading-counter">
                {String(pct).padStart(3, '0')}%
            </div>
        </motion.div>
    );
}
