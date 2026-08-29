import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { scrollStore, band } from './store';

// Fades a whole scene group in/out by global scroll progress.
// Returns { group, register, weight } — attach register to any material ref.
export function useSceneFader(start, end, fade = 0.03) {
    const group = useRef();
    const materials = useRef([]);
    const weight = useRef(0);

    const register = (m) => {
        if (m && !materials.current.includes(m)) {
            m.userData.baseOpacity = m.opacity === 0 ? 1 : m.opacity;
            m.transparent = true;
            materials.current.push(m);
        }
    };

    useFrame(() => {
        const w = band(scrollStore.progress, start, end, fade);
        weight.current = w;
        const g = group.current;
        if (!g) return;
        g.visible = w > 0.004;
        if (g.visible) {
            for (const m of materials.current) {
                m.opacity = (m.userData.baseOpacity ?? 1) * w;
            }
        }
    });

    return { group, register, weight };
}
