import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { scrollStore, quality } from './store';
import { useSceneFader } from './sceneUtils';
import { Particles, getDotTexture } from './Particles';
import { D71 } from './D71';

let s = 7;
const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
};

export function NetworkScene() {
    const { group, register } = useSceneFader(0.295, 0.47, 0.035);
    const pulsesMeta = useRef([]);

    const { nodes, edges } = useMemo(() => {
        const nodes = [new THREE.Vector3(0, 0.85, 0)];
        const ring1 = [];
        for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            ring1.push(new THREE.Vector3(Math.cos(a) * 2.7, 0.9 + (rand() - 0.5) * 0.5, Math.sin(a) * 2.7));
        }
        const ring2 = [];
        for (let i = 0; i < 14; i++) {
            const a = (i / 14) * Math.PI * 2 + rand() * 0.3;
            const r = 4.8 + rand() * 1.4;
            ring2.push(new THREE.Vector3(Math.cos(a) * r, 0.6 + rand() * 1.8, Math.sin(a) * r));
        }
        const cloud = new THREE.Vector3(0, 4.6, -1.5);
        nodes.push(...ring1, ...ring2, cloud);

        const edges = [];
        ring1.forEach((v) => edges.push([nodes[0], v]));
        ring2.forEach((v, i) => edges.push([ring1[i % 6], v]));
        [0, 2, 4].forEach((i) => edges.push([ring1[i], cloud]));
        edges.push([nodes[0], cloud]);
        return { nodes, edges };
    }, []);

    const edgeGeo = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const pos = new Float32Array(edges.length * 6);
        edges.forEach(([a, b], i) => pos.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6));
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return g;
    }, [edges]);

    const nodeGeo = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const pos = new Float32Array(nodes.length * 3);
        nodes.forEach((v, i) => pos.set([v.x, v.y, v.z], i * 3));
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return g;
    }, [nodes]);

    const pulseCount = Math.floor(42 * quality.scale) + 6;
    if (pulsesMeta.current.length !== pulseCount) {
        pulsesMeta.current = Array.from({ length: pulseCount }, () => ({
            edge: Math.floor(rand() * edges.length),
            t: rand(),
            speed: 0.25 + rand() * 0.5,
        }));
    }

    const tmp = useMemo(() => new THREE.Vector3(), []);

    return (
        <group ref={group}>
            <pointLight position={[0, 3, 0]} intensity={6} distance={14} color="#38bdf8" />
            <ambientLight intensity={0.35} />
            <D71 scale={0.42} position={[0, 0.62, 0]} onMaterial={register} />
            <lineSegments geometry={edgeGeo} frustumCulled={false}>
                <lineBasicMaterial ref={register} color="#38bdf8" transparent opacity={0.3} />
            </lineSegments>
            <points geometry={nodeGeo} frustumCulled={false}>
                <pointsMaterial ref={register} color="#bae6fd" size={0.14} sizeAttenuation transparent opacity={0.95} map={getDotTexture()} alphaTest={0.01} blending={THREE.AdditiveBlending} depthWrite={false} />
            </points>
            <Particles
                count={pulseCount}
                color="#7dd3fc"
                size={0.09}
                materialRef={register}
                fill={(i, v) => v.copy(edges[pulsesMeta.current[i].edge][0])}
                tick={(attr, time, dt) => {
                    pulsesMeta.current.forEach((m, i) => {
                        m.t += dt * m.speed;
                        if (m.t >= 1) {
                            m.t = 0;
                            m.edge = Math.floor(Math.random() * edges.length);
                        }
                        const [a, b] = edges[m.edge];
                        tmp.lerpVectors(a, b, m.t);
                        attr.setXYZ(i, tmp.x, tmp.y, tmp.z);
                    });
                }}
            />
        </group>
    );
}
