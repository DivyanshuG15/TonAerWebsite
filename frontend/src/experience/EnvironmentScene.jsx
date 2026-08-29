import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { quality } from './store';
import { useSceneFader } from './sceneUtils';
import { Particles } from './Particles';
import { D71 } from './D71';

let s = 1234;
const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
};

// Xunison R&D: a 3D room where the D71's wireless field visibly reacts to presence.
export function EnvironmentScene() {
    const { group, register } = useSceneFader(0.75, 0.87, 0.028);
    const silhouette = useRef();
    const ring = useRef();
    const silPos = useRef(new THREE.Vector3());

    const COUNT = Math.floor(1500 * quality.scale) + 200;

    const base = useMemo(() => {
        const arr = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
            arr[i * 3] = (rand() - 0.5) * 10;
            arr[i * 3 + 1] = 0.15 + rand() * 2.7;
            arr[i * 3 + 2] = (rand() - 0.5) * 7 - 0.5;
        }
        return arr;
    }, [COUNT]);

    useFrame(({ clock }) => {
        if (!group.current?.visible) return;
        const t = clock.elapsedTime;
        const sx = Math.sin(t * 0.22) * 2.6;
        const sz = -0.6 + Math.cos(t * 0.15) * 0.7;
        silPos.current.set(sx, 0, sz);
        if (silhouette.current) {
            silhouette.current.position.x = sx;
            silhouette.current.position.z = sz;
            silhouette.current.rotation.y = Math.cos(t * 0.22) > 0 ? 0.4 : -0.4;
        }
        if (ring.current) {
            const f = (t % 2.6) / 2.6;
            ring.current.scale.setScalar(0.3 + f * 5.5);
            ring.current.material.opacity = (1 - f) * 0.35;
        }
    });

    const fieldTick = (attr, t) => {
        const { x: sx, z: sz } = silPos.current;
        for (let i = 0; i < COUNT; i++) {
            const bx = base[i * 3];
            const by = base[i * 3 + 1];
            const bz = base[i * 3 + 2];
            const dx = bx - sx;
            const dz = bz - sz;
            const d = Math.sqrt(dx * dx + dz * dz);
            const ripple = Math.sin(d * 3.2 - t * 4.5) * 0.16 * Math.exp(-d * 0.5);
            attr.setXYZ(i, bx, by + ripple + Math.sin(t * 0.8 + i) * 0.03, bz);
        }
    };

    return (
        <group ref={group}>
            <ambientLight intensity={0.22} />
            <directionalLight position={[4, 6, 3]} intensity={1.4} color="#dbeafe" />
            <pointLight position={[2, 3, 2]} intensity={10} distance={16} color="#93c5fd" />
            <pointLight position={[-3, 2, -2]} intensity={5} distance={12} color="#22c55e" />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[12, 9]} />
                <meshStandardMaterial ref={register} color="#16202f" roughness={0.85} />
            </mesh>
            <mesh position={[0, 1.7, -4.5]}>
                <planeGeometry args={[12, 3.4]} />
                <meshStandardMaterial ref={register} color="#0e1622" roughness={0.9} />
            </mesh>
            <mesh position={[-6, 1.7, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[9, 3.4]} />
                <meshStandardMaterial ref={register} color="#0c1320" roughness={0.9} />
            </mesh>

            <group position={[-2.0, 0, -2.4]}>
                <mesh position={[0, 0.3, 0]}>
                    <boxGeometry args={[2.6, 0.6, 1.1]} />
                    <meshStandardMaterial ref={register} color="#4a678f" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.85, -0.4]}>
                    <boxGeometry args={[2.6, 0.7, 0.3]} />
                    <meshStandardMaterial ref={register} color="#415c80" roughness={0.8} />
                </mesh>
            </group>

            <mesh position={[1.7, 0.45, -1.6]}>
                <boxGeometry args={[1.4, 0.9, 0.7]} />
                <meshStandardMaterial ref={register} color="#54719c" roughness={0.7} />
            </mesh>
            <D71 scale={0.3} position={[1.7, 1.0, -1.6]} onMaterial={register} ledColor="#22c55e" />

            <mesh position={[0.2, 1.9, -4.42]}>
                <boxGeometry args={[2.4, 1.3, 0.08]} />
                <meshStandardMaterial ref={register} color="#0b1220" emissive="#0ea5e9" emissiveIntensity={0.4} roughness={0.4} />
            </mesh>

            <mesh ref={silhouette} position={[0, 0.98, -0.6]}>
                <capsuleGeometry args={[0.27, 1.15, 6, 14]} />
                <meshStandardMaterial ref={register} color="#4d6f9e" emissive="#16294a" emissiveIntensity={0.35} roughness={0.5} transparent opacity={0.9} />
            </mesh>

            <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[1.7, 0.03, -1.6]}>
                <ringGeometry args={[0.92, 1, 48]} />
                <meshBasicMaterial ref={register} color="#22c55e" transparent opacity={0.3} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>

            <Particles
                count={COUNT}
                color="#4ade80"
                size={0.045}
                materialRef={register}
                fill={(i, v) => v.set(base[i * 3], base[i * 3 + 1], base[i * 3 + 2])}
                tick={fieldTick}
            />
        </group>
    );
}
