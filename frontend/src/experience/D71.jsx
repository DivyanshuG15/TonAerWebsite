import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, useGLTF } from '@react-three/drei';

function GLBModel({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

// Procedural premium stand-in for the Xunison D71.
// Drop in an official GLB later by passing modelUrl — no scene rebuild needed.
// onMaterial lets parent scenes register materials for scroll crossfades.
export function D71({ modelUrl, ledColor = '#38BDF8', onMaterial, ...props }) {
    const led = useRef();
    useFrame(({ clock }) => {
        if (led.current) {
            led.current.material.emissiveIntensity = 1.5 + Math.sin(clock.elapsedTime * 2.2) * 0.5;
        }
    });

    if (modelUrl) return <GLBModel url={modelUrl} {...props} />;

    const mat = onMaterial || undefined;

    return (
        <group {...props}>
            <RoundedBox args={[3.4, 0.42, 2.2]} radius={0.14} smoothness={6} castShadow receiveShadow>
                <meshPhysicalMaterial
                    ref={mat}
                    color="#f2f5f8"
                    roughness={0.3}
                    metalness={0.08}
                    clearcoat={0.7}
                    clearcoatRoughness={0.22}
                />
            </RoundedBox>
            <RoundedBox args={[2.9, 0.06, 1.66]} radius={0.03} position={[0, 0.22, 0]}>
                <meshStandardMaterial ref={mat} color="#e6ecf2" roughness={0.5} metalness={0.05} />
            </RoundedBox>
            {Array.from({ length: 9 }).map((_, i) => (
                <mesh key={`vent-${i}`} position={[-1.2 + i * 0.3, 0.245, -0.5]}>
                    <boxGeometry args={[0.15, 0.02, 0.52]} />
                    <meshStandardMaterial ref={mat} color="#1e293b" roughness={0.6} metalness={0.3} />
                </mesh>
            ))}
            <mesh ref={led} position={[0, -0.03, 1.115]}>
                <boxGeometry args={[1.7, 0.035, 0.02]} />
                <meshStandardMaterial ref={mat} color="#0ea5e9" emissive={ledColor} emissiveIntensity={1.6} toneMapped={false} />
            </mesh>
            {Array.from({ length: 4 }).map((_, i) => (
                <mesh key={`port-${i}`} position={[-0.95 + i * 0.63, -0.03, -1.11]}>
                    <boxGeometry args={[0.36, 0.17, 0.04]} />
                    <meshStandardMaterial ref={mat} color="#0b1220" roughness={0.35} metalness={0.55} />
                </mesh>
            ))}
            <mesh position={[-1.35, -0.03, -1.11]}>
                <boxGeometry args={[0.22, 0.22, 0.04]} />
                <meshStandardMaterial ref={mat} color="#0b1220" roughness={0.35} metalness={0.55} />
            </mesh>
            <mesh position={[0, 0.253, 0.45]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.085, 32]} />
                <meshStandardMaterial ref={mat} color="#0066FF" emissive="#0066FF" emissiveIntensity={0.7} toneMapped={false} />
            </mesh>
        </group>
    );
}
