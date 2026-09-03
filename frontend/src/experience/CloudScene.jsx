import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { scrollStore, local, smooth, quality } from './store';
import { useSceneFader } from './sceneUtils';
import { getDotTexture } from './Particles';

let s = 99;
const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
};

// TonAer Cloud: scattered telemetry converges into a swirling abstract compute sphere.
export function CloudScene() {
    const { group, register } = useSceneFader(0.575, 0.70, 0.03);
    const core = useRef();

    const COUNT = Math.floor(2200 * quality.scale) + 300;

    const seeds = useMemo(
        () =>
            Array.from({ length: COUNT }, () => ({
                theta: rand() * Math.PI * 2,
                phi: Math.acos(2 * rand() - 1),
                r0: 6.5 + rand() * 4,
                r1: 1.6 + rand() * 1.6,
                speed: 0.15 + rand() * 0.45,
            })),
        [COUNT]
    );

    const geo = useMemo(() => {
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
        return g;
    }, [COUNT]);

    useFrame(({ clock }) => {
        if (!group.current?.visible) return;
        const t = clock.elapsedTime;
        const k = smooth(local(scrollStore.progress, 0.575, 0.69));
        const attr = geo.attributes.position;
        for (let i = 0; i < COUNT; i++) {
            const sd = seeds[i];
            const r = sd.r0 + (sd.r1 - sd.r0) * k + Math.sin(t * 1.3 + i) * 0.12;
            const th = sd.theta + t * sd.speed;
            attr.setXYZ(
                i,
                r * Math.sin(sd.phi) * Math.cos(th),
                r * Math.cos(sd.phi) * 0.72,
                r * Math.sin(sd.phi) * Math.sin(th)
            );
        }
        attr.needsUpdate = true;
        if (core.current) {
            const pulse = 1 + Math.sin(t * 2) * 0.08;
            core.current.scale.setScalar(pulse * (0.4 + k * 0.8));
        }
    });

    return (
        <group ref={group} position={[0, 1.2, 0]}>
            <points geometry={geo} frustumCulled={false}>
                <pointsMaterial
                    ref={register}
                    color="#818cf8"
                    size={0.06}
                    sizeAttenuation
                    transparent
                    opacity={0.8}
                    map={getDotTexture()}
                    alphaTest={0.01}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
            <mesh ref={core}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial ref={register} color="#00D084" transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
        </group>
    );
}
