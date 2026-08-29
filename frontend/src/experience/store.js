import * as THREE from 'three';

export const scrollStore = { progress: 0, lenis: null };

export const quality = { scale: 1, reduced: false, mobile: false, dpr: [1, 2] };

export function initQuality() {
    if (typeof window === 'undefined') return;
    quality.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    quality.mobile = window.innerWidth < 768;
    quality.scale = quality.reduced ? 0.25 : quality.mobile ? 0.35 : 1;
    quality.dpr = quality.mobile ? [1, 1.5] : [1, 2];
}

export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const smooth = (t) => t * t * (3 - 2 * t);

// Smooth in/out weight of a scene across [start, end] of global progress
export function band(p, start, end, fade = 0.03) {
    const inW = start <= 0 ? 1 : smooth(clamp01((p - start) / fade));
    const outW = end >= 1 ? 1 : 1 - smooth(clamp01((p - (end - fade)) / fade));
    return inW * outW;
}

// Local 0..1 progress inside a scene's range
export function local(p, start, end) {
    return clamp01((p - start) / (end - start));
}

export const BG_STOPS = [
    [0.0, '#F8FAFC'],
    [0.1, '#EFF6FF'],
    [0.26, '#0F172A'],
    [0.42, '#020617'],
    [0.55, '#090D16'],
    [0.66, '#0F172A'],
    [0.77, '#111C2E'],
    [0.87, '#0B1526'],
    [0.95, '#F8FAFC'],
    [1.0, '#F8FAFC'],
];

const cA = new THREE.Color();
const cB = new THREE.Color();

export function bgColorAt(p, out) {
    const stops = BG_STOPS;
    for (let i = 0; i < stops.length - 1; i++) {
        const [p0, h0] = stops[i];
        const [p1, h1] = stops[i + 1];
        if (p >= p0 && p <= p1) {
            cA.set(h0);
            cB.set(h1);
            out.copy(cA).lerp(cB, smooth(clamp01((p - p0) / (p1 - p0))));
            return out;
        }
    }
    out.set(stops[stops.length - 1][1]);
    return out;
}
