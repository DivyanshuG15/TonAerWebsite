import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { scrollStore, local, smooth, quality } from './store';
import { useSceneFader } from './sceneUtils';
import { getDotTexture } from './Particles';

// Telemetry: a field of points that reorganizes from raw noise into clean waveforms.
export function TelemetryScene() {
    const { group, register } = useSceneFader(0.45, 0.60, 0.03);
    const ptsRef = useRef();

    const COLS = quality.mobile ? 46 : 92;
    const ROWS = quality.mobile ? 18 : 34;

    const geo = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const pos = new Float32Array(COLS * ROWS * 3);
        let i = 0;
        for (let x = 0; x < COLS; x++) {
            for (let z = 0; z < ROWS; z++) {
                pos[i * 3] = (x / (COLS - 1) - 0.5) * 14;
                pos[i * 3 + 1] = 0;
                pos[i * 3 + 2] = (z / (ROWS - 1) - 0.5) * 7;
                i++;
            }
        }
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return g;
    }, [COLS, ROWS]);

    useFrame(({ clock }) => {
        if (!group.current?.visible) return;
        const t = clock.elapsedTime;
        const k = local(scrollStore.progress, 0.45, 0.60);
        const order = smooth(Math.min(1, Math.max(0, (k - 0.35) / 0.35)));
        const attr = geo.attributes.position;
        let i = 0;
        for (let x = 0; x < COLS; x++) {
            for (let z = 0; z < ROWS; z++) {
                const px = attr.array[i * 3];
                const pz = attr.array[i * 3 + 2];
                const noise =
                    Math.sin(px * 1.3 + t * 2.1) * 0.35 +
                    Math.sin(pz * 2.2 - t * 1.4) * 0.3 +
                    Math.sin((px + pz) * 0.8 + t * 3.1) * 0.25;
                const band = Math.floor(((pz / 7) + 0.5) * 3);
                const wave = Math.sin(px * 0.9 + t * (1.2 + band * 0.5)) * (0.5 - band * 0.12) + (band - 1) * 1.15;
                attr.array[i * 3 + 1] = noise * (1 - order) + wave * order;
                i++;
            }
        }
        attr.needsUpdate = true;
    });

    return (
        <group ref={group}>
            <points ref={ptsRef} geometry={geo} frustumCulled={false}>
                <pointsMaterial
                    ref={register}
                    color="#38bdf8"
                    size={0.06}
                    sizeAttenuation
                    transparent
                    opacity={0.85}
                    map={getDotTexture()}
                    alphaTest={0.01}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
        </group>
    );
}
