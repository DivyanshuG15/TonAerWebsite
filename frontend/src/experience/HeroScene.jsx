import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { quality } from './store';
import { useSceneFader } from './sceneUtils';
import { Particles, getDotTexture } from './Particles';

// Scene 01: a calm intelligence hub — one glowing core, a few quiet connections.
export function HeroScene() {
    const { group, register } = useSceneFader(0.0, 0.135, 0.02);
    const core = useRef();
    const ringA = useRef();
    const ringB = useRef();
    const orbit = useRef();

    const { nodeGeo, linkGeo } = useMemo(() => {
        const pts = [];
        for (let i = 0; i < 9; i++) {
            const a = (i / 9) * Math.PI * 2 + (i % 3) * 0.12;
            const r = 2.4 + (i % 3) * 0.55;
            pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(i * 1.7) * 0.35, Math.sin(a) * r * 0.7));
        }
        const nodeGeo = new THREE.BufferGeometry();
        const np = new Float32Array(pts.length * 3);
        pts.forEach((p, i) => np.set([p.x, p.y, p.z], i * 3));
        nodeGeo.setAttribute('position', new THREE.BufferAttribute(np, 3));
        const linkGeo = new THREE.BufferGeometry();
        const lp = new Float32Array(pts.length * 6);
        pts.forEach((p, i) => lp.set([p.x, p.y, p.z, 0, 0, 0], i * 6));
        linkGeo.setAttribute('position', new THREE.BufferAttribute(lp, 3));
        return { nodeGeo, linkGeo };
    }, []);

    useFrame(({ clock }, dt) => {
        if (!group.current?.visible) return;
        const t = clock.elapsedTime;
        const d = Math.min(dt, 0.05);
        if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 0.7) * 0.07);
        if (ringA.current) ringA.current.rotation.z += d * 0.12;
        if (ringB.current) ringB.current.rotation.z -= d * 0.08;
        if (orbit.current) orbit.current.rotation.y += d * 0.05;
    });

    const dustCount = Math.floor(260 * quality.scale) + 60;

    return (
        <group ref={group} position={[0, -1.05, 0]}>
            <pointLight color="#38bdf8" intensity={5} distance={10} position={[0, 0.6, 0]} />
            <mesh ref={core}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial ref={register} color="#0e7490" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh>
                <sphereGeometry args={[0.2, 24, 24]} />
                <meshBasicMaterial ref={register} color="#7dd3fc" transparent opacity={0.75} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh ref={ringA} rotation={[Math.PI / 2.15, 0.2, 0]}>
                <torusGeometry args={[1.15, 0.008, 8, 96]} />
                <meshBasicMaterial ref={register} color="#38bdf8" transparent opacity={0.4} />
            </mesh>
            <mesh ref={ringB} rotation={[Math.PI / 1.9, -0.3, 0]}>
                <torusGeometry args={[1.8, 0.006, 8, 96]} />
                <meshBasicMaterial ref={register} color="#38bdf8" transparent opacity={0.2} />
            </mesh>
            <group ref={orbit}>
                <points geometry={nodeGeo} frustumCulled={false}>
                    <pointsMaterial ref={register} color="#bae6fd" size={0.09} sizeAttenuation transparent opacity={0.9} map={getDotTexture()} alphaTest={0.01} blending={THREE.AdditiveBlending} depthWrite={false} />
                </points>
                <lineSegments geometry={linkGeo} frustumCulled={false}>
                    <lineBasicMaterial ref={register} color="#38bdf8" transparent opacity={0.14} />
                </lineSegments>
                <Particles
                    count={dustCount}
                    color="#38bdf8"
                    size={0.035}
                    materialRef={register}
                    fill={(i, v) => {
                        const a = Math.random() * Math.PI * 2;
                        const r = 2.2 + Math.random() * 3.2;
                        v.set(Math.cos(a) * r, (Math.random() - 0.5) * 1.6, Math.sin(a) * r * 0.75);
                    }}
                />
            </group>
        </group>
    );
}

