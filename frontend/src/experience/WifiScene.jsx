import * as THREE from 'three';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { scrollStore, local, quality } from './store';
import { useSceneFader } from './sceneUtils';
import { Particles } from './Particles';
import { D71 } from './D71';

const BANDS = [
    { r: 2.4, color: '#D97706', speed: 0.07 },
    { r: 3.1, color: '#0369A1', speed: -0.05 },
    { r: 3.9, color: '#7C3AED', speed: 0.035 },
];

const rand = (() => {
    let s = 42;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
})();

export function WifiScene() {
    const { group, register } = useSceneFader(0.125, 0.325, 0.03);
    const bandRefs = useRef([]);
    const devicesRef = useRef();
    const linksRef = useRef();

    const devicePts = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 50; i++) {
            const b = BANDS[i % 3];
            const th = rand() * Math.PI * 2;
            const ph = Math.acos(2 * rand() - 1);
            const r = b.r + (rand() - 0.5) * 0.6;
            arr.push(
                new THREE.Vector3(
                    r * Math.sin(ph) * Math.cos(th),
                    Math.abs(r * Math.cos(ph)) * 0.45 + 0.5,
                    r * Math.sin(ph) * Math.sin(th)
                )
            );
        }
        return arr;
    }, []);

    const linkGeo = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const pos = new Float32Array(50 * 2 * 3);
        devicePts.forEach((v, i) => {
            pos.set([v.x, v.y, v.z, 0, 0.85, 0], i * 6);
        });
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return g;
    }, [devicePts]);

    useLayoutEffect(() => {
        const m = devicesRef.current;
        if (!m) return;
        const dummy = new THREE.Object3D();
        devicePts.forEach((v, i) => {
            dummy.position.copy(v);
            dummy.updateMatrix();
            m.setMatrixAt(i, dummy.matrix);
        });
        m.instanceMatrix.needsUpdate = true;
    }, [devicePts]);

    useFrame(({ clock }, dt) => {
        if (!group.current?.visible) return;
        const t = clock.elapsedTime;
        bandRefs.current.forEach((b, i) => {
            if (b) b.rotation.y += BANDS[i].speed * Math.min(dt, 0.05) * 10;
        });
        const k = local(scrollStore.progress, 0.135, 0.315);
        const n = k < 0.35 ? 5 : k < 0.7 ? 20 : 50;
        if (devicesRef.current) {
            devicesRef.current.count = n;
            devicesRef.current.rotation.y = Math.sin(t * 0.1) * 0.15;
        }
        if (linksRef.current) {
            linksRef.current.geometry.setDrawRange(0, k > 0.55 ? n * 2 : 0);
        }
    });

    const shellCount = Math.floor(650 * quality.scale);

    return (
        <group ref={group}>
            <ambientLight intensity={0.85} />
            <directionalLight position={[5, 8, 6]} intensity={1.5} />
            <directionalLight position={[-6, 4, -5]} intensity={0.5} color="#7dd3fc" />
            <D71 scale={0.55} position={[0, 0.5, 0]} onMaterial={register} />
            <ContactShadows position={[0, 0.04, 0]} opacity={0.4} scale={8} blur={2.4} far={2.5} resolution={256} color="#1e3a5f" />
            {BANDS.map((b, i) => (
                <group key={b.color} ref={(el) => (bandRefs.current[i] = el)}>
                    <Particles
                        count={shellCount}
                        color={b.color}
                        size={0.05}
                        blending={THREE.NormalBlending}
                        materialRef={register}
                        fill={(j, v) => {
                            const th = rand() * Math.PI * 2;
                            const ph = Math.acos(2 * rand() - 1);
                            const r = b.r + (rand() - 0.5) * 0.55;
                            v.set(r * Math.sin(ph) * Math.cos(th), Math.abs(r * Math.cos(ph)) * 0.45 + 0.5, r * Math.sin(ph) * Math.sin(th));
                        }}
                    />
                </group>
            ))}
            <instancedMesh ref={devicesRef} args={[undefined, undefined, 50]} frustumCulled={false}>
                <icosahedronGeometry args={[0.055, 1]} />
                <meshBasicMaterial ref={register} color="#1e3a5f" transparent opacity={0.95} />
            </instancedMesh>
            <lineSegments ref={linksRef} geometry={linkGeo} frustumCulled={false}>
                <lineBasicMaterial ref={register} color="#0284C7" transparent opacity={0.3} />
            </lineSegments>
        </group>
    );
}
